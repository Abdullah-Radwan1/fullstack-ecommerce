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
import { Input } from "@/components/ui/input"; // Add this import for the input fields
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
}: {
  clientSecret: string;
}) {
  return (
    <div className=" flex-1">
      <Elements
        options={{
          clientSecret,
          appearance: {
            disableAnimations: false,
            theme: "stripe",
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
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [country_code, setCountryCode] = useState<string>("");
  const [phone, setPhone] = useState<string>(""); // Change to string for phone input
  const [streetAddress, setStreetAddress] = useState<string>(""); // Add street address input
  const allPhone = country_code + phone;

  const stripe = useStripe();
  const elements = useElements();
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const quantity = useCartStore((state) => state.getQuantity());
  const params = useParams();
  const ar = params.lang === "ar";
  const products = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.getTotalPrice());

  if (products.length === 0) return null;
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (stripe == null || elements == null) {
      throw new Error("Error in Stripe");
    }
    setIsLoading(true);

    try {
      await fetch("/api/order", {
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
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/checkout-success`,
          payment_method_data: {
            billing_details: {
              email: email,
              phone: allPhone, // Pass phone number to Stripe
              address: {
                line1: streetAddress,
                // Pass street address to Stripe
              },
            },
          },
        },
      });

      if (error) {
        if (error.type === "validation_error" || error.type === "card_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      }
    } catch (error) {
      setErrorMessage(error as string);

      return error;
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
              <p className="text-sm p-2  text-slate-500">
                use 4242 4242 4242 4242 as a fake card number
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
                onChange={(e) => setEmail(e.value.email)}
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
                  placeholder="Street Address"
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
              name="purchase"
              className="w-full"
              size="lg"
              disabled={stripe == null || elements == null || isLoading}
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
      <div className="flex-1 border  py-2 px-4 rounded-lg shadow-lg  space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2 text-center">
          {ar ? "المنتجات" : "Products"}
        </h2>

        <div className="space-y-4 max-h-[250px] overflow-y-auto">
          {products.map((item) => (
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
                    <span className="text-xs  text-orange-600">
                      {item.quantity}X
                    </span>
                  </p>
                </div>
              </div>
              {item.id !== products[products.length - 1].id && (
                <Separator className="w-full" />
              )}
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
