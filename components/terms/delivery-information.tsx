export function DeliveryInformation() {
  return (
    <div className="max-w-none font-be-vietnam text-[#2c3e50]/80">
      <h2 className="font-michroma text-2xl font-bold mb-6 uppercase text-[#2c3e50] tracking-tight">Delivery Policy</h2>
      <p className="text-lg mb-8 leading-relaxed">
        The delivery fee is waived for orders <span className="font-bold text-[#2c3e50]">over $500 SGD</span>, unless otherwise specified by LASVELA. 
        For orders below $500, a delivery fee applies based on the total value of the items.
      </p>

      <div className="bg-[#2c3e50]/5 p-8 rounded-2xl border border-[#2c3e50]/10 mb-12">
        <h3 className="font-michroma text-sm font-bold mb-6 text-[#2c3e50] uppercase tracking-widest text-center">What the delivery fee covers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Processing", desc: "Efficient order processing and documentation." },
            { title: "Handling", desc: "Careful product handling and secure packing." },
            { title: "Assembly", desc: "Professional assembly at your chosen location." }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <p className="font-michroma text-[10px] font-bold text-[#2c3e50] uppercase tracking-tighter mb-2">{item.title}</p>
              <p className="text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <h3 className="font-michroma text-xl font-bold mt-12 mb-6 text-[#2c3e50] uppercase tracking-wider">Additional Charges</h3>
      <div className="overflow-x-auto mb-8 rounded-xl border border-gray-100 shadow-sm">
        <table className="min-w-full border-collapse text-sm font-be-vietnam">
          <thead>
            <tr className="bg-gray-50 text-[#2c3e50]">
              <th className="p-4 text-left font-michroma text-xs uppercase tracking-widest border-b border-gray-100">Service / Condition</th>
              <th className="p-4 text-left font-michroma text-xs uppercase tracking-widest border-b border-gray-100">Charge</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-50">
              <td className="p-4">Non-lift Access (Weekdays)</td>
              <td className="p-4 font-bold">$60</td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="p-4">Non-lift Access (Weekends)</td>
              <td className="p-4 font-bold">$90</td>
            </tr>
            <tr>
              <td className="p-4">Staircase Carry (per item per storey)</td>
              <td className="p-4 font-bold">$15 <span className="font-normal text-xs text-[#2c3e50]/60">($50 for items &quot;over 50kg&quot;)</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="font-michroma text-xl font-bold mt-12 mb-6 text-[#2c3e50] uppercase tracking-wider">Scheduling & Rescheduling</h3>
      <p className="mb-6 leading-relaxed">
        At the time of purchase, the sales team will secure a delivery slot based on availability.
        Any rescheduling must be requested at least <span className="font-bold text-[#2c3e50]">3 working days</span> in advance, or a rescheduling fee will apply.
      </p>
      <div className="p-6 bg-yellow-50/50 border border-yellow-100 rounded-xl mb-12">
        <p className="text-sm leading-relaxed">
          <span className="font-bold">Note:</span> Our in-house deliveries are arranged into time slots (e.g., 9am – 12pm, 1pm – 5:30pm). 
          We cannot accommodate specific or fixed delivery times. The assigned slot will be confirmed 2-3 days before delivery.
        </p>
      </div>

      <h3 className="font-michroma text-xl font-bold mt-12 mb-6 text-[#2c3e50] uppercase tracking-wider">Delivery Delays</h3>
      <p className="mb-6 leading-relaxed">
        Delivery may sometimes be impacted by traffic, weather, or unforeseen circumstances. 
        While we strive for punctuality, LASVELA is not responsible for delays caused by external factors. 
        We appreciate your patience and understanding in such instances.
      </p>
    </div>
  )
}
