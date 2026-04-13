import { Michroma, Be_Vietnam_Pro } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ModalCart } from "@/components/modal-cart";

const michroma = Michroma({
  weight: "400",
  variable: "--font-michroma",
  subsets: ["latin"],
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["100", "300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  subsets: ["latin"],
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${michroma.variable} ${beVietnamPro.variable} font-michroma flex flex-col min-h-screen`}>
      <Header />
      <main className="flex-1">
        <ModalCart />
        {children}
      </main>
      <Footer />
    </div>
  );
}
