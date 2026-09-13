export interface HeroSlide {
  /** Stable identifier used as the animation key. */
  id: string;
  /** Real image path. Omit to render the honest placeholder panel (no photography asset yet). */
  image?: string;
  /** Required descriptive alt text for the image (or for the placeholder's accessible name). */
  imageAlt: string;
  /** `contain` for isolated product cutouts, `cover` for full-bleed photography. Defaults to `cover`. */
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  /** Category used to pick a placeholder icon when no real image is set yet. */
  categorySlug: string;
  badge: string;
  title: string;
  specification: string;
  reference: string;
  price: string;
  /** Optional destination — the slide becomes a link when set. */
  href?: string;
}

// High-resolution editorial photography from the Pexels CDN; not exact SKU pack shots.
export const heroSlides: HeroSlide[] = [
  {
    id: "combi-drill",
    imagePosition: "40% 35%",
    image: "https://images.pexels.com/photos/1249609/pexels-photo-1249609.jpeg?auto=compress&cs=tinysrgb&w=3840",
    imageAlt: "Close-up of a tradesperson driving a screw into wood with a cordless drill",
    categorySlug: "power-tools",
    badge: "Job Site Spotlight",
    title: "18V XR Brushless 3-Speed Combi",
    specification: "95Nm Torque · All-Metal Chuck",
    reference: "Ref: BLD-MK-8902",
    price: "£189.99 ex.VAT",
    href: "/p/dewalt-dcd996p2-18v-xr-brushless-combi-drill",
  },
  {
    id: "angle-grinder",
    imagePosition: "50% 35%",
    image: "https://images.pexels.com/photos/15628889/pexels-photo-15628889.jpeg?auto=compress&cs=tinysrgb&w=3840",
    imageAlt: "Angle grinder cutting metal with bright orange sparks",
    categorySlug: "power-tools",
    badge: "Trade Favourite",
    title: "115mm Cordless Angle Grinder",
    specification: "12,000 RPM · Kickback Brake",
    reference: "Ref: BLD-AG-4471",
    price: "£129.00 ex.VAT",
    href: "/c/power-tools",
  },
  {
    id: "fixings-case",
    imagePosition: "65% 35%",
    image: "https://images.pexels.com/photos/8447852/pexels-photo-8447852.jpeg?auto=compress&cs=tinysrgb&w=3840",
    imageAlt: "Metal screws, nuts and fasteners arranged in a workshop organizer",
    categorySlug: "hardware-fixings",
    badge: "Bulk Trade Pack",
    title: "Elite Torx Timber Screw Case",
    specification: "1,200 Piece · Zinc Yellow",
    reference: "Ref: BLD-FX-2290",
    price: "£64.50 ex.VAT",
    href: "/c/hardware-fixings",
  },
];
