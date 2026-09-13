"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/commerce/product-card";
import { useCartStore } from "@/lib/cart-store";
import { products } from "@/data/products";

export default function WishlistPage() {
  const wishlist = useCartStore((s) => s.wishlist);
  const saved = products.filter((p) => wishlist.includes(p.id));

  if (saved.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
        <span aria-hidden className="material-symbols-outlined text-[56px] text-graphite-200">favorite</span>
        <h1 className="text-headline-md font-headline-md font-bold text-graphite-900">Nothing saved yet</h1>
        <p className="text-body-md font-body-md text-text-secondary">
          Tap the heart icon on any product to save it here for later.
        </p>
        <Button asChild className="bg-orange-500 hover:bg-orange-600">
          <Link href="/">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-margin-desktop">
      <h1 className="mb-6 text-headline-lg-mobile font-headline-lg-mobile font-bold text-graphite-900 sm:text-headline-lg sm:font-headline-lg">
        Saved Items ({saved.length})
      </h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {saved.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
