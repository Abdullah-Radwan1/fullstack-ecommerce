"use client";

import { useEffect } from "react";
import useCartStore from "@/zustand/store";

export default function ClearCart() {
  useEffect(() => {
    // clear cart immediately
    useCartStore.getState().clearCart();

    // attempt to create order on the server using Stripe session_id from query
    try {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");
      if (!sessionId) return;

      // fire-and-forget POST to create order; server will verify session with Stripe
      (async () => {
        try {
          const res = await fetch("/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            console.error("Order API returned error:", err);
          } else {
            console.info("Order created from checkout session", sessionId);
          }
        } catch (e) {
          console.error("Failed to call order API:", e);
        }
      })();
    } catch (e) {
      console.error("ClearCart effect error:", e);
    }
  }, []);

  return null;
}
