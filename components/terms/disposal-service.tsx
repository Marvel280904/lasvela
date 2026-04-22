export function DisposalService() {
  return (
    <div className="max-w-none font-be-vietnam text-[#2c3e50]/80">
      <h2 className="font-michroma text-2xl font-bold mb-6 uppercase text-[#2c3e50] tracking-tight">Disposal Service</h2>
      <p className="text-lg mb-12 leading-relaxed">
        We provide disposal services upon request, subject to an additional fee. 
        This service must be requested prior to delivery, and the applicable fee will be added to the final invoice.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {[
          {
            title: "Medium-sized Items",
            price: "$30",
            items: ["Dining tables", "Pairs of dining chairs", "Coffee tables", "Side tables"]
          },
          {
            title: "Larger Items",
            price: "$50",
            items: ["2-3 seater sofas", "L-shaped sofas", "Bed frames", "Mattresses"]
          }
        ].map((tier, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-michroma text-sm font-bold text-[#2c3e50] uppercase tracking-widest">{tier.title}</h3>
              <span className="bg-[#2c3e50] text-white px-3 py-1 rounded-full text-xs font-bold font-michroma">{tier.price}</span>
            </div>
            <ul className="space-y-3">
              {tier.items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-1 h-1 rounded-full bg-[#2c3e50]/30" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="p-6 bg-[#2c3e50] text-white rounded-xl flex items-center gap-4">
        <div className="p-2 bg-white/10 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm font-michroma text-xs uppercase tracking-widest font-bold">
          Important: Disposal service must be requested prior to delivery.
        </p>
      </div>
    </div>
  )
}