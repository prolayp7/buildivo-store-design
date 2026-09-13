"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/cart-store";

/** Rehydrates the persisted cart after mount so SSR and first client paint match. */
export function CartHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return null;
}
