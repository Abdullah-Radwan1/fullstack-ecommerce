"use client";

import React, { FormEvent, useState } from "react";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { DropdownMenuRadioGroupDemo } from "@/components/ui/Phonedropdown";
import useCartStore from "@/zustand/store";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function CheckoutForm({
  clientSecret,
  ar,
}: {
  clientSecret: string;
  ar?: boolean;
}) {
  return (
    <div className="flex-1">
      <Elements
        options={{
          clientSecret,
          appearance: {
            disableAnimations: false,
            theme: "night",
            labels: "floating",
          },
        }}
        stripe={stripePromise}
      >
        <Form />
      </Elements>
    </div>
  );
}

function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [email, setEmail] = useState<string>("");
  const [country_code, setCountryCode] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");

  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const lang = (params as any)?.lang as string | undefined;
  const ar = lang === "ar";

  // === Your preferred style (multiple selectors), but fixed:
  // Note: we return function references for actions (no parentheses)
  const totalPrice = useCartStore((state) => state.getTotalPrice()); // number
  const quantity = useCartStore((state) => state.getQuantity()); // number
  const clearCart = useCartStore((state) => state.clearCart); // function reference
  const products = useCartStore((state) => state.items); // array
  const total = totalPrice; // keep naming similar to your original

  const allPhone = country_code + phone;

  if (!products || products.length === 0) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setErrorMessage("Stripe not initialized.");
      return;
    }
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      // 1) Save the order on your backend first
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total,
          streetAddress,
          phone: allPhone,
          email,
          products,
          quantity,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Order API failed: ${text || res.status}`);
      }

      // Option A (attempt to clear cart client-side BEFORE redirect):
      // - Pros: immediate UX feedback
      // - Cons: if confirmPayment fails, cart is already cleared (you may restore from server)
      // Option B (recommended): clear cart on the checkout-success page or via webhook
      // I'll attempt to clear after successful confirm if possible (see below).

      // 2) Confirm payment with Stripe (Stripe will usually redirect to return_url)
      const redirectLang = lang ?? "en";
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${redirectLang}/checkout/checkout-success`,
          payment_method_data: {
            billing_details: {
              email,
              phone: allPhone,
              address: { line1: streetAddress },
            },
          },
        },
      });

      // If Stripe returns an error (validation/card/etc.), show it
      if (error) {
        if (error.type === "validation_error" || error.type === "card_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unexpected error occurred with payment.");
        }
        return;
      }

      // If there's no error, Stripe will handle redirecting to your return_url.
      // Code after confirmPayment may not run because of the redirect.
      // We still call clearCart() here as a best-effort:
      clearCart();
    } catch (err: any) {
      setErrorMessage(String(err.message ?? err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {ar ? "صفحه الدفع" : "payment"}{" "}
              <p className="text-sm p-2 text-slate-500">
                use <span className="font-mono">4242 4242 4242 4242</span> as a
                fake card number
              </p>
            </CardTitle>
            {errorMessage && (
              <CardDescription className="text-destructive">
                {errorMessage}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <PaymentElement />
            <div className="mt-4">
              <LinkAuthenticationElement
                onChange={(e: any) => setEmail(e.value?.email ?? "")}
              />
            </div>
            <section className="grid grid-cols-2 items-center gap-2 mt-3">
              <div className="flex gap-2">
                <Input
                  id="phone"
                  type="number"
                  placeholder={ar ? "رقم الهاتف" : "Phone"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  minLength={5}
                  maxLength={15}
                />
                <DropdownMenuRadioGroupDemo
                  setCountryCode={setCountryCode}
                  country_code={country_code}
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder={ar ? "العنوان" : "Street Address"}
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  required
                  minLength={5}
                  maxLength={50}
                />
              </div>
            </section>
          </CardContent>
          <CardFooter>
            <Button
              variant={"outline"}
              name="purchase"
              className="w-full"
              size="lg"
              disabled={!stripe || !elements || isLoading}
            >
              {isLoading
                ? ar
                  ? "يتم الشراء..."
                  : "Purchasing..."
                : `Purchase - ${totalPrice}$`}
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* sep */}
      <div className="flex-1 border mt-5 py-2 px-4 rounded-lg shadow-lg space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2 text-center">
          {ar ? "المنتجات" : "Products"}
        </h2>

        <div className="space-y-4 max-h-[250px] overflow-y-auto">
          {products.map((item, idx) => (
            <main key={item.id}>
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-muted-foreground text-base">
                    {item.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${item.basePrice}{" "}
                    <span className="text-xs text-orange-600">
                      {item.quantity}X
                    </span>
                  </p>
                </div>
              </div>
              {idx !== products.length - 1 && <Separator className="w-full" />}
            </main>
          ))}
        </div>

        <div className="border-t pt-3 flex gap-2 items-center font-semibold">
          <span>Total :</span>
          <span className="text-orange-600">${total}</span>
        </div>
      </div>
    </>
  );
}
