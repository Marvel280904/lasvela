"use client";

import Image from "next/image";
import Link from "next/link";

const footerData = {
  showroom: {
    address: "36 Jalan Kilang Barat, Singapore 159366",
    hours: "11am - 7pm",
  },
  newsletter: {
    placeholder: "Enter Email Address",
  },
  connect: [
    { name: "Instagram", href: "https://www.instagram.com/lasvela.sg" },
    { name: "Facebook", href: "https://www.facebook.com/lasvelasg" },
    { name: "TikTok", href: "https://www.tiktok.com/@lasvela.sg" },
  ],
  contact: {
    whatsapp: "+65 6019 0775",
    whatsappHref: "https://wa.me/6560190775?text=Hi%20Las%20Vela!%20I%20would%20like%20to%20know%20is%20there%20any%20promos?",
    email: "enquiry@essen.sg",
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#1a252f] text-white pt-24 pb-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-8xl mx-auto">
        {/* Desktop View: Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-12 mb-24">
          {/* Logo Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative w-40 h-10 grayscale brightness-200">
                <Image
                  src="/logo/logo.png"
                  alt="Lasvela Logo"
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Showroom Column */}
          <div className="space-y-6">
            <h4 className="text-lg font-michroma font-bold tracking-wider">Showroom</h4>
            <div className="space-y-4 font-be-vietnam text-sm leading-relaxed text-gray-400">
              <p>{footerData.showroom.address}</p>
              <p>{footerData.showroom.hours}</p>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-6">
            <h4 className="text-lg font-michroma font-bold tracking-wider">Newsletter</h4>
            <div className="relative">
              <input
                type="email"
                placeholder={footerData.newsletter.placeholder}
                className="bg-transparent border-b border-gray-600 w-full py-2 font-be-vietnam text-sm outline-none focus:border-white transition-colors"
              />
            </div>
          </div>

          {/* Connect Column */}
          <div className="space-y-6">
            <h4 className="text-lg font-michroma font-bold tracking-wider">Connect</h4>
            <ul className="space-y-4 font-be-vietnam text-sm text-gray-400">
              {footerData.connect.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-lg font-michroma font-bold tracking-wider">Contact</h4>
            <div className="space-y-4 font-be-vietnam text-sm text-gray-400">
              <Link href={footerData.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                WhatsApp: {footerData.contact.whatsapp}
              </Link>
              <Link href={`mailto:${footerData.contact.email}`} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                {footerData.contact.email}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile View: Stacked Layout with Dividers */}
        <div className="lg:hidden mb-20 text-center">
          {/* Mobile Logo */}
          <div className="flex justify-center py-10 border-b border-white/50">
            <Link href="/" className="inline-block">
              <div className="relative w-40 h-10 grayscale brightness-200">
                <Image
                  src="/logo/logo.png"
                  alt="Lasvela Logo"
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Mobile Showroom */}
          <div className="grid grid-cols-2 lg:grid-cols-1 items-start gap-4 py-8 border-b border-white/50">
            <h4 className="text-[10px] font-michroma font-bold tracking-widest uppercase text-left opacity-80">Showroom</h4>
            <div className="space-y-2 font-be-vietnam text-[11px] leading-relaxed text-gray-400 text-right">
              <p>{footerData.showroom.address}</p>
              <p>{footerData.showroom.hours}</p>
            </div>
          </div>

          {/* Mobile Newsletter */}
          <div className="grid grid-cols-2 items-center gap-4 py-8 border-b border-white/50">
            <h4 className="text-[10px] font-michroma font-bold tracking-widest uppercase text-left opacity-80">Newsletter</h4>
            <div className="relative text-right">
              <input
                type="email"
                placeholder={footerData.newsletter.placeholder}
                className="bg-transparent border-b border-gray-600 w-full py-1 font-be-vietnam text-[11px] outline-none focus:border-white transition-colors text-right"
              />
            </div>
          </div>

          {/* Mobile Connect */}
          <div className="grid grid-cols-2 items-start gap-4 py-8 border-b border-white/50">
            <h4 className="text-[10px] font-michroma font-bold tracking-widest uppercase text-left opacity-80">Connect</h4>
            <ul className="space-y-2 font-be-vietnam text-[11px] text-gray-400 text-right">
              {footerData.connect.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Contact */}
          <div className="grid grid-cols-2 items-start gap-4 py-8 border-b border-white/50">
            <h4 className="text-[10px] font-michroma font-bold tracking-widest uppercase text-left opacity-80">Contact</h4>
            <div className="space-y-2 font-be-vietnam text-[11px] text-gray-400 text-right">
              <Link href={footerData.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                WhatsApp: {footerData.contact.whatsapp}
              </Link>
              <Link href={`mailto:${footerData.contact.email}`} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                {footerData.contact.email}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center space-y-6 text-[10px] md:text-xs font-be-vietnam text-gray-500 text-center">
            <p>© Copyright {currentYear}. Essen. All Rights Reserved.</p>
            <div className="flex space-x-8 tracking-widest">
                <Link href="/terms" className="hover:text-white transition-colors">Terms of service</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
