export function FAQ() {
  return (
    <div className="max-w-none font-be-vietnam text-[#2c3e50]/80">
      <h2 className="font-michroma text-2xl font-bold mb-6 uppercase text-[#2c3e50] tracking-tight">Frequently Asked Questions</h2>
      <p className="text-lg text-[#2c3e50]/60 mb-12 leading-relaxed">
        Find answers to our most commonly asked questions. If you can't find what you're looking for, please contact
        us directly.
      </p>

      <div className="space-y-12">
        {[
          { q: "What materials are your furniture pieces made from?", a: "We offer a variety of materials, including solid wood, leather, fabric, and eco-friendly options. Each product description provides detailed information about the materials used." },
          { q: "Do you offer customization options?", a: "Yes, many of our furniture pieces can be customized in terms of color, fabric, size, and finish. Contact us or visit our store to learn more about customization options." },
          { q: "How long does delivery take?", a: "For in-stock items, delivery typically takes 3-7 business days. Custom orders may take longer, and estimated delivery times will be provided at the time of purchase." },
          { q: "How much is the delivery fee?", a: "Delivery is free for orders over $500 SGD. For orders below $500 SGD, the delivery fee depends on their total value. Separate deliveries will incur additional fees. Note that we do not offer delivery services on Sundays or Public Holidays." },
          { q: "Do you offer assembly services?", a: "Yes, we provide professional assembly services for most of our furniture items. Please ask about our assembly options at checkout." },
          { q: "What is your return policy?", a: "We offer a 14-day return policy for most of our products. Items must be in their original condition and packaging. To arrange a return, please contact us at hello@lasvela.sg." },
          { q: "Is it possible to cancel or modify my order?", a: "If you change your mind, please inform us within 48 hours of purchase to avoid any fees. All cancellation requests must be sent via email to hello@lasvela.sg." },
          { q: "Do you have a warranty on your products?", a: "Most of our products come with a manufacturer's warranty that covers defects in materials or workmanship. Please refer to individual product listings for specific warranty details." },
          { q: "Can I see the furniture in person before purchasing?", a: "Visit our showroom to see and feel the furniture before making a decision. Our team will be happy to assist you." },
        ].map((item, i) => (
          <div key={i} className="group">
            <h3 className="font-michroma text-sm font-bold text-[#2c3e50] mb-3 uppercase tracking-widest flex gap-3">
              <span className="text-[#2c3e50]/70">{String(i + 1).padStart(2, '0')}</span>
              {item.q}
            </h3>
            <p className="leading-relaxed pl-8 border-l-2 border-gray-100 group-hover:border-[#2c3e50]/70 transition-colors">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
