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
import { useParams, useSearchParams } from "next/navigation";
import { DropdownMenuRadioGroupDemo } from "@/components/ui/Phonedropdown";

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  );

  return (
    <div className="p-8 max-w-5xl w-full mx-auto">
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
  const totalPrice = useSearchParams().get("totalPrice");
  const params = useParams();
  const ar = params.lang === "ar";
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (stripe == null || elements == null) {
      throw new Error("Error in Stripe");
    }
    setIsLoading(true);

    try {
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
      setErrorMessage("An unexpected error occurred.");
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            {ar ? "عععات فلوووس" : "payment"}{" "}
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
              />
            </div>
          </section>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading ? "Purchasing..." : `Purchase - ${totalPrice}$`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
