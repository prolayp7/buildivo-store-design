import { ComparisonBar } from "@/components/commerce/comparison-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function StorefrontLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="min-h-[calc(100vh-156px)] flex-1 pt-[68px] sm:pt-[112px] lg:pt-[156px]">
        {children}
      </main>
      <SiteFooter />
      <ComparisonBar />
    </>
  );
}
