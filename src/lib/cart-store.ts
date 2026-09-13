"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/types";
import { getProductBySlug, products } from "@/data/products";

interface LastOrder {
  orderNumber: string;
  lines: CartLine[];
  subtotal: number;
}

interface CartState {
  lines: CartLine[];
  wishlist: string[];
  compare: string[];
  lastOrder: LastOrder | null;
  addItem: (productId: string, qty?: number, variantId?: string) => void;
  removeItem: (productId: string, variantId?: string) => void;
  setQty: (productId: string, qty: number, variantId?: string) => void;
  toggleSaveForLater: (productId: string, variantId?: string) => void;
  clear: () => void;
  commitOrder: (orderNumber: string, total: number) => void;
  toggleWishlist: (productId: string) => void;
  toggleCompare: (productId: string) => void;
}

function sameLine(a: CartLine, productId: string, variantId?: string) {
  return a.productId === productId && a.variantId === variantId;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      wishlist: [],
      compare: [],
      lastOrder: null,
      addItem: (productId, qty = 1, variantId) =>
        set((state) => {
          const existing = state.lines.find((l) => sameLine(l, productId, variantId));
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                sameLine(l, productId, variantId) ? { ...l, qty: l.qty + qty, savedForLater: false } : l,
              ),
            };
          }
          return { lines: [...state.lines, { productId, variantId, qty }] };
        }),
      removeItem: (productId, variantId) =>
        set((state) => ({ lines: state.lines.filter((l) => !sameLine(l, productId, variantId)) })),
      setQty: (productId, qty, variantId) =>
        set((state) => ({
          lines: state.lines
            .map((l) => (sameLine(l, productId, variantId) ? { ...l, qty: Math.max(1, qty) } : l))
            .filter((l) => l.qty > 0),
        })),
      toggleSaveForLater: (productId, variantId) =>
        set((state) => ({
          lines: state.lines.map((l) =>
            sameLine(l, productId, variantId) ? { ...l, savedForLater: !l.savedForLater } : l,
          ),
        })),
      clear: () => set({ lines: [] }),
      commitOrder: (orderNumber, total) =>
        set((state) => {
          const activeLines = state.lines.filter((l) => !l.savedForLater);
          return {
            lastOrder: { orderNumber, lines: activeLines, subtotal: total },
            lines: state.lines.filter((l) => l.savedForLater),
          };
        }),
      toggleWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        })),
      toggleCompare: (productId) =>
        set((state) => ({
          compare: state.compare.includes(productId)
            ? state.compare.filter((id) => id !== productId)
            : state.compare.length < 4
              ? [...state.compare, productId]
              : state.compare,
        })),
    }),
    { name: "buildivo-cart-v1", skipHydration: true },
  ),
);

export function lineProduct(line: CartLine) {
  return products.find((p) => p.id === line.productId);
}

export function lineUnitPrice(line: CartLine) {
  const product = lineProduct(line);
  if (!product) return 0;
  if (line.variantId) {
    const variant = product.variants?.find((v) => v.id === line.variantId);
    if (variant) return variant.priceIncVat;
  }
  return product.priceIncVat;
}

export function useCartTotals() {
  const lines = useCartStore((s) => s.lines);
  const activeLines = lines.filter((l) => !l.savedForLater);
  const subtotal = activeLines.reduce((sum, l) => sum + lineUnitPrice(l) * l.qty, 0);
  const count = activeLines.reduce((sum, l) => sum + l.qty, 0);
  const multiBuySavings = activeLines.reduce((sum, l) => sum + lineMultiBuySaving(l), 0);
  return { subtotal, count, activeLines, savedLines: lines.filter((l) => l.savedForLater), multiBuySavings };
}

/** Savings (inc. VAT) from a product's own quantity-tier pricing at the line's current qty — not a fabricated discount. */
export function lineMultiBuySaving(line: CartLine): number {
  const product = lineProduct(line);
  const tiers = product?.quantityTiers;
  if (!product || !tiers?.length) return 0;
  const baseTier = tiers.find((t) => t.minQty === 1);
  const bestTier = [...tiers].filter((t) => t.minQty <= line.qty).sort((a, b) => b.minQty - a.minQty)[0];
  if (!baseTier || !bestTier || bestTier === baseTier) return 0;
  const perUnitSavingExVat = baseTier.unitPriceExVat - bestTier.unitPriceExVat;
  return Math.max(0, perUnitSavingExVat * (1 + product.vatRate) * line.qty);
}

export function bySlugSeed() {
  // Convenience for demo pages that want a starting slug reference.
  return getProductBySlug("dewalt-dcd996p2-18v-xr-brushless-combi-drill");
}
