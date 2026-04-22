import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Showroom",
  description: "Visit the Lasvela showroom to experience our premium furniture and lighting collections in person. Get inspired by our curated interior displays.",
  openGraph: {
    title: "Visit Lasvela Showroom - Experience Luxury",
    description: "Visit the Lasvela showroom to experience our premium furniture and lighting collections in person.",
    url: "https://lasvela.sg/showroom",
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

export default function ShowroomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
