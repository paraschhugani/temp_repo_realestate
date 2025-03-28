"use client"; // For Next.js App Router (if needed)

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "@clerk/nextjs";
const stripePromise = loadStripe("pk_test_51McNXmSC9YCe2JrN9gFEctmwqzzx7lUivh3KkmBdGM4q0wagJocDvDERTlrOIqWS3DbgsY6HqfUlSlFCoW1T29jI00ujRlhXxm");
import axios from "axios";
interface StripeCheckoutProps {
  amount: number; // Amount in USD (e.g., 50 for $50)
}

export default function StripeCheckout({ amount }: StripeCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const { getToken , userId } = useAuth();
  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe failed to initialize.");
      setLoading(false);
      return;
    }

    // Create a Stripe Checkout Session
    const token = await getToken()
    const response = await axios.post("http://localhost:5000/wallet-topup-create-checkout-session", {
      amount: amount * 100,
      token: token,
            user_id: userId
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
    const session = response.data;

    if (session.error) {
      console.error("Error creating checkout session:", session.error);
      setLoading(false);
      return;
    }

    // Open Stripe Checkout Dialog
    const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

    if (error) console.error("Stripe Checkout error:", error);

    setLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
    >
      {loading ? "Processing..." : "Pay $" + amount}
    </button>
  );
}
