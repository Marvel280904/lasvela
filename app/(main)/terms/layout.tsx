import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Review the Terms and Conditions of Lasvela. Learn about our policies regarding orders, delivery, warranty, and more.",
  openGraph: {
    title: "Terms & Conditions",
    description: "Review the Terms and Conditions of Lasvela. Policies regarding orders, delivery, and warranty.",
    url: "https://lasvela.sg/terms",
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

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
