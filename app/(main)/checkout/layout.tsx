import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase at Lasvela. Secure checkout for your premium furniture and lighting orders.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Checkout",
    description: "Complete your purchase at Lasvela.",
    url: "https://lasvela.sg/checkout",
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

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
