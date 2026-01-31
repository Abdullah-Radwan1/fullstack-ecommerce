"use client";

import { FormEvent, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { DropdownMenuRadioGroupDemo } from "@/components/ui/Phonedropdown";
import useCartStore from "@/zustand/store";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  CreditCard,
  Package,
  ShoppingBag,
  Lock,
  Sparkles,
} from "lucide-react";

import { useUser } from "@clerk/nextjs";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

export default function CheckoutForm({
  clientSecret,
  ar,
}: {
  clientSecret: string;
  ar?: boolean;
}) {
  return (
    <Elements
      options={{
        clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#ffd700", // Gold color from your theme
            colorText: "#f9f9f9",
            colorBackground: "#1c1c1c",
            fontFamily: "Inter, sans-serif",
          },
          labels: "floating",
        },
      }}
      stripe={stripePromise}
    >
      <Form ar={ar} />
    </Elements>
  );
}

function Form({ ar }: { ar?: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [email, setEmail] = useState<string>("");
  const [country_code, setCountryCode] = useState<string>("+20");
  const [phone, setPhone] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();

  const lang = ar ? "ar" : "en";
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const quantity = useCartStore((state) => state.getQuantity());
  const clearCart = useCartStore((state) => state.clearCart);
  const products = useCartStore((state) => state.items);
  const total = totalPrice;
  const allPhone = country_code + phone;

  if (!products || products.length === 0 || !user) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe not initialized.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      // 1️⃣ Confirm payment FIRST
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          payment_method_data: {
            billing_details: {
              email: user.emailAddresses[0].emailAddress,
              phone: allPhone,
              address: { line1: streetAddress },
            },
          },
        },
      });

      if (error) {
        setErrorMessage(error.message ?? "Payment failed.");
        return;
      }

      if (!paymentIntent || paymentIntent.status !== "succeeded") {
        setErrorMessage("Payment not completed.");
        return;
      }

      // 2️⃣ ONLY NOW create the order
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total,
          streetAddress,
          phone: allPhone,
          email: user.emailAddresses[0].emailAddress,
          products,
          quantity,
          paymentIntentId: paymentIntent.id,
        }),
      });

      if (!res.ok) {
        throw new Error("Order creation failed after payment.");
      }

      // 3️⃣ Clear cart
      clearCart();

      // 4️⃣ Redirect
      window.location.href = `/${lang}/checkout/checkout-success`;
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 p-1">
      {/* Left Column: Order Summary */}
      <div className="lg:col-span-1 ">
        <div className="h-1 w-full bg-gradient-to-r mb-4 from-my-main via-my-secondary to-my-main" />
        <div className="space-y-6">
          {/* Secure Checkout Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-my-main/20 to-my-secondary/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-my-main" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {ar ? "الدفع الآمن" : "Secure Checkout"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {ar ? "أكمل طلبك بأمان" : "Complete your order securely"}
                </p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-my-main/10 to-my-secondary/10 text-foreground border-my-main/30">
              <Shield className="w-3 h-3 mr-2" />
              {ar ? "آمن" : "Secure"}
            </Badge>
          </div>

          {/* Payment Form Card */}
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-my-main" />
                {ar ? "معلومات الدفع" : "Payment Information"}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {ar ? "استخدم" : "Use"}{" "}
                  <span className="font-mono text-my-main bg-my-main/10 px-2 py-0.5 rounded">
                    4242 4242 4242 4242
                  </span>{" "}
                  {ar ? "كرقم بطاقة تجريبي" : "as a test card number"}
                </span>
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Error Message */}
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                    {errorMessage}
                  </div>
                )}

                {/* Stripe Payment Element */}
                <div className="space-y-4">
                  <PaymentElement />
                  <LinkAuthenticationElement
                    onChange={(e) =>
                      setEmail(
                        e.value?.email ?? user.emailAddresses[0].emailAddress,
                      )
                    }
                  />
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Package className="w-4 h-4 text-my-main" />
                    {ar ? "معلومات الشحن" : "Shipping Information"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        {ar ? "رقم الهاتف" : "Phone Number"}
                      </label>
                      <div className="flex gap-2">
                        <DropdownMenuRadioGroupDemo
                          setCountryCode={setCountryCode}
                          country_code={country_code}
                        />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={ar ? "رقم الهاتف" : "Phone Number"}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        {ar ? "العنوان" : "Street Address"}
                      </label>
                      <Input
                        type="text"
                        placeholder={
                          ar ? "العنوان الكامل" : "Full Street Address"
                        }
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-my-main to-my-secondary text-background hover:shadow-xl hover:scale-[1.02] transition-all py-6 text-lg font-semibold"
                  disabled={!stripe || !elements || isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      {ar ? <>جاري الدفع</> : <>Processing</>}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      {ar ? "أكمل الدفع" : "Complete Payment"}
                      <span className="ml-2 bg-background/20 px-2 py-1 rounded text-sm">
                        ${totalPrice}
                      </span>
                    </span>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div className="lg:col-span-1">
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm sticky top-8">
          <div className="h-1 w-full bg-gradient-to-r from-my-main via-my-secondary to-my-main" />

          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-my-main" />
              {ar ? "ملخص الطلب" : "Order Summary"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Products List */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {products.map((item, idx) => (
                <div key={item.id} className="space-y-3">
                  <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="relative w-16 h-16 rounded-lg border border-border/40 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={ar ? item.name_ar : item.name_en}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {ar ? item.name_ar : item.name_en}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-muted-foreground">
                          ${item.basePrice} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          ${(item.basePrice * item.quantity!).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {idx !== products.length - 1 && <Separator />}
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="space-y-3 pt-4 border-t border-border/40">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {ar ? "العدد" : "Quantity"}
                </span>
                <span className="font-medium">
                  {quantity} {ar ? "عنصر" : "items"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {ar ? "الشحن" : "Shipping"}
                </span>
                <Badge variant="outline" className="border-my-main/30">
                  {ar ? "مجاني" : "FREE"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {ar ? "الضريبة" : "Tax"}
                </span>
                <span className="font-medium">
                  ${(total * 0.15).toFixed(2)}
                </span>
              </div>
            </div>

            <Separator />

            {/* Total Amount */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold">
                {ar ? "الإجمالي الكلي" : "Total Amount"}
              </span>
              <div className="text-right">
                <p className="text-2xl font-bold bg-gradient-to-r from-my-main to-my-secondary bg-clip-text text-transparent">
                  ${totalPrice.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {ar ? "شامل الضريبة" : "Tax included"}
                </p>
              </div>
            </div>
          </CardContent>

          {/* Secure Payment Info */}
          <CardFooter className="pt-4">
            <div className="w-full text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-3 h-3" />
                {ar ? "دفع آمن ومشفر" : "Secure & encrypted payment"}
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Product Count Badge */}
        <Badge className="w-full mt-4 justify-center bg-gradient-to-r from-my-main/10 to-my-secondary/10 text-foreground border-my-main/30 py-2">
          <Package className="w-4 h-4 mr-2" />
          {ar ? `${quantity} منتجات في السلة` : `${quantity} items in cart`}
        </Badge>
      </div>
    </div>
  );
}
