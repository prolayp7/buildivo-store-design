"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/commerce/product-image";
import { Price } from "@/components/commerce/price";
import { Rating } from "@/components/commerce/rating";
import { useCartStore } from "@/lib/cart-store";
import { products } from "@/data/products";

export default function ComparePage() {
  const compare = useCartStore((s) => s.compare);
  const toggleCompare = useCartStore((s) => s.toggleCompare);
  const compared = products.filter((p) => compare.includes(p.id));

  if (compared.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
        <span aria-hidden className="material-symbols-outlined text-[56px] text-graphite-200">compare_arrows</span>
        <h1 className="text-headline-md font-headline-md font-bold text-graphite-900">Nothing to compare yet</h1>
        <p className="text-body-md font-body-md text-text-secondary">
          Tick &quot;Compare&quot; on up to 4 products from a category page to see them side by side here.
        </p>
        <Button asChild className="bg-orange-500 hover:bg-orange-600">
          <Link href="/c/power-tools">Browse Power Tools</Link>
        </Button>
      </div>
    );
  }

  const specLabels = Array.from(new Set(compared.flatMap((p) => p.specs.map((s) => s.label))));

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-margin-desktop">
      <h1 className="mb-6 text-headline-lg-mobile font-headline-lg-mobile font-bold text-graphite-900 sm:text-headline-lg sm:font-headline-lg">
        Compare Products ({compared.length})
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="w-40 text-left text-label-sm font-label-sm text-text-disabled"> </th>
              {compared.map((p) => (
                <th key={p.id} className="border-b border-border-default p-3 text-left align-top">
                  <button
                    type="button"
                    onClick={() => toggleCompare(p.id)}
                    className="mb-2 flex items-center gap-1 text-label-sm font-label-sm text-error-500 hover:underline"
                  >
                    <span aria-hidden className="material-symbols-outlined text-[14px]">close</span>
                    Remove
                  </button>
                  <ProductImage categorySlug={p.categorySlug} className="mb-2 flex h-28 w-28 items-center justify-center rounded-lg" />
                  <Link href={`/p/${p.slug}`} className="mb-1 block text-body-sm font-body-sm font-bold hover:underline">
                    {p.name}
                  </Link>
                  <Rating value={p.rating} count={p.reviewCount} />
                  <Price priceIncVat={p.priceIncVat} compareAtIncVat={p.compareAtIncVat} vatRate={p.vatRate} size="sm" className="mt-2" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specLabels.map((label) => (
              <tr key={label}>
                <th scope="row" className="border-b border-border-default p-3 text-left text-label-sm font-label-sm font-semibold text-text-secondary">
                  {label}
                </th>
                {compared.map((p) => (
                  <td key={p.id} className="border-b border-border-default p-3 text-body-sm font-body-sm">
                    {p.specs.find((s) => s.label === label)?.value ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
