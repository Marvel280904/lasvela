import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Catalog",
  description: "Browse our curated collection of premium furniture at LASVELA Singapore. Discover sofas, dining tables, chairs, bedframes, and more for modern living spaces.",
  openGraph: {
    title: "Product Catalog",
    description: "Browse our curated collection of premium furniture at LASVELA Singapore. Discover sofas, dining tables, chairs, bedframes, and more for modern living spaces.",
    url: "https://lasvela.sg/product",
    images: [
      {
        url: "/favicon.ico",
        width: 32,
        height: 32,
        alt: "Lasvela Logo",
      },
    ],
  },
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
