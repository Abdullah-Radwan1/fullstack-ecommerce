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
import { useTranslations, useLocale } from "next-intl";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const locale = useLocale();

  return (
    <Elements
      options={{
        clientSecret,
        // Passing the locale to Stripe ensures its internal UI (card inputs)
        // matches the user's language
        locale: locale as "ar" | "en",
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#ffd700",
            colorText: "#f9f9f9",
            colorBackground: "#1c1c1c",
            fontFamily: "Inter, sans-serif",
          },
          labels: "floating",
        },
      }}
      stripe={stripePromise}
    >
      <Form />
    </Elements>
  );
}

function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [email, setEmail] = useState<string>("");
  const [country_code, setCountryCode] = useState<string>("+20");

  const [streetAddress, setStreetAddress] = useState<string>("");

  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("CheckoutPage");

  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();

  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const quantity = useCartStore((state) => state.getQuantity());
  const clearCart = useCartStore((state) => state.clearCart);
  const products = useCartStore((state) => state.items);
  const total = totalPrice;

  if (!products || products.length === 0 || !user) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !streetAddress) return;

    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/${locale}/checkout/checkout-success`,
          payment_method_data: {
            billing_details: {
              address: { line1: streetAddress },
            },
          },
        },
      });

      // If confirmPayment returns, it means there was an error (like card declined)
      // If it succeeds, Stripe redirects the user to the return_url automatically
      if (error) {
        setErrorMessage(error.message ?? t("paymentFailed"));
      }
    } catch (err) {
      setErrorMessage(t("genericError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="grid lg:grid-cols-2 gap-8 p-1"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Left Column: Form */}
      <div className="lg:col-span-1 ">
        <div className="h-1 w-full bg-gradient-to-r mb-4 from-my-main via-my-secondary to-my-main" />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-my-main/20 to-my-secondary/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-my-main" />
              </div>
              <div className={isArabic ? "text-right" : "text-left"}>
                <h1 className="text-2xl font-bold">{t("secureCheckout")}</h1>
                <p className="text-sm text-muted-foreground">
                  {t("completeOrderSecurely")}
                </p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-my-main/10 to-my-secondary/10 text-foreground border-my-main/30">
              <Shield className={`w-3 h-3 ${isArabic ? "ml-2" : "mr-2"}`} />
              {t("secure")}
            </Badge>
          </div>

          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader className={isArabic ? "text-right" : "text-left"}>
              <CardTitle className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-my-main" />
                {t("paymentInformation")}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {t("use")}{" "}
                  <span className="font-mono text-my-main bg-my-main/10 px-2 py-0.5 rounded">
                    4242 4242 4242 4242
                  </span>{" "}
                  {t("asTestCard")}
                </span>
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                    {errorMessage}
                  </div>
                )}

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

                <div className="space-y-4">
                  <h3
                    className={`font-medium flex items-center gap-2 ${isArabic ? "flex-row-reverse" : ""}`}
                  >
                    <Package className="w-4 h-4 text-my-main" />
                    {t("shippingInformation")}
                  </h3>

                  <div>
                    <div className="space-y-2">
                      <label
                        className={`block text-sm text-muted-foreground ${isArabic ? "text-right" : "text-left"}`}
                      >
                        {t("streetAddress")}
                      </label>
                      <Input
                        type="text"
                        placeholder={t("fullStreetAddress")}
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        required
                        className={isArabic ? "text-right" : "text-left"}
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
                      {t("processing")}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      {t("completePayment")}
                      <span
                        className={`${isArabic ? "mr-2" : "ml-2"} bg-background/20 px-2 py-1 rounded text-sm`}
                      >
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

          <CardHeader className={isArabic ? "text-right" : "text-left"}>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-my-main" />
              {t("orderSummary")}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div
              className={`space-y-4 max-h-[300px] overflow-y-auto ${isArabic ? "pl-2" : "pr-2"}`}
            >
              {products.map((item, idx) => (
                <div key={item.id} className="space-y-3">
                  <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="relative w-16 h-16 rounded-lg border border-border/40 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={isArabic ? item.name_ar : item.name_en}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div
                      className={`flex-1 ${isArabic ? "text-right" : "text-left"}`}
                    >
                      <p className="font-medium text-sm">
                        {isArabic ? item.name_ar : item.name_en}
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

            <div className="space-y-3 pt-4 border-t border-border/40">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("quantity")}</span>
                <span className="font-medium">
                  {quantity} {t("items")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("shipping")}</span>
                <Badge variant="outline" className="border-my-main/30">
                  {t("free")}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("tax")}</span>
                <span className="font-medium">
                  ${(total * 0.15).toFixed(2)}
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold">{t("totalAmount")}</span>
              <div className={isArabic ? "text-left" : "text-right"}>
                <p className="text-2xl font-bold bg-gradient-to-r from-my-main to-my-secondary bg-clip-text text-transparent">
                  ${totalPrice.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("taxIncluded")}
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-4">
            <div className="w-full text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-3 h-3" />
                {t("secureEncryptedPayment")}
              </div>
            </div>
          </CardFooter>
        </Card>

        <Badge className="w-full mt-4 justify-center bg-gradient-to-r from-my-main/10 to-my-secondary/10 text-foreground border-my-main/30 py-2">
          <Package className={`w-4 h-4 ${isArabic ? "ml-2" : "mr-2"}`} />
          {t("itemsInCart", { count: quantity })}
        </Badge>
      </div>
    </div>
  );
}
