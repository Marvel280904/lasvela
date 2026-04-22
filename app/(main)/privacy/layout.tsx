import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Lasvela Privacy Policy to understand how we collect, use, and safeguard your personal information in compliance with PDPA.",
  openGraph: {
    title: "Privacy Policy",
    description: "Read the Lasvela Privacy Policy to understand how we collect, use, and safeguard your personal information.",
    url: "https://lasvela.sg/privacy",
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

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
