import CheckoutForm from "./components/CheckoutForm";

import Stripe from "stripe";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ totalPrice: string; products: string }>;
}) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const totalprice = (await searchParams).totalPrice;

  const products = (await searchParams).products;

  const paymentIntents = stripe.paymentIntents.create({
    amount: Number(totalprice),
    currency: "usd",
    metadata: { products },
  });
  if ((await paymentIntents).client_secret == null) {
    throw Error("error in payment Intent");
  }

  return (
    <CheckoutForm
      clientSecret={(await paymentIntents).client_secret as string}
    />
  );
};

export default page;
