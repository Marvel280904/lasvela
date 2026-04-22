import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Shopping Cart",
  description: "Review the items in your Lasvela shopping cart. Prepare your order for premium furniture and lighting solutions.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Shopping Cart",
    description: "Review the items in your Lasvela shopping cart.",
    url: "https://lasvela.sg/cart",
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

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
