import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Lasvela. Have questions about our products or services? Reach out to our team for assistance with your interior needs.",
  openGraph: {
    title: "Contact Lasvela - Get in Touch",
    description: "Get in touch with Lasvela. Reach out to our team for assistance with your interior needs.",
    url: "https://lasvela.sg/contact",
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

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
