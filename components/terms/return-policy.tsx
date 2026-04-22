export function ReturnPolicy() {
  return (
    <div className="max-w-none font-be-vietnam text-[#2c3e50]/80">
      <h2 className="font-michroma text-2xl font-bold mb-6 uppercase text-[#2c3e50] tracking-tight">Return Policy</h2>
      <p className="text-lg mb-8 leading-relaxed">
        If you wish to return an item, you may do so within <span className="font-bold text-[#2c3e50]">14 days</span> of delivery. 
        Please note that a restocking fee starting at <span className="font-bold text-[#2c3e50]">25%</span> will apply.
      </p>

      <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 mb-12">
        <h3 className="font-michroma text-sm font-bold mb-6 text-[#2c3e50] uppercase tracking-widest">Policy Details</h3>
        <ul className="space-y-6">
          {[
            {
              title: "Restocking Fee",
              desc: "Starts at 25% of the invoice amount. The final fee depends on the item's condition at collection."
            },
            {
              title: "Delivery Fee",
              desc: "The original delivery fee is non-refundable."
            },
            {
              title: "Condition Requirements",
              desc: "Returns are not accepted if the item is no longer in acceptable condition due to wear and tear or misuse."
            }
          ].map((item, idx) => (
            <li key={idx} className="flex gap-4 items-start">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2c3e50]/30 shrink-0" />
              <div>
                <p className="font-bold text-[#2c3e50] mb-1">{item.title}</p>
                <p className="text-sm leading-relaxed">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="font-michroma text-lg font-bold mt-12 mb-6 text-[#2c3e50] uppercase tracking-wider">Non-Returnable Items</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {["Customized Orders", "Clearance/Sale Items", "Display Items"].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 text-center text-sm font-medium shadow-sm">
            {item}
          </div>
        ))}
      </div>

      <p className="mb-6 leading-relaxed">
        Refunds will be processed within <span className="font-bold text-[#2c3e50]">14 days</span> from the collection date and credited via the original payment method. 
        LASVELA reserves the right to change the refund method if necessary.
      </p>

      <div className="p-6 bg-red-50 border border-red-100 rounded-xl text-red-900/70 text-sm italic">
        Returns will not be accepted after 14 days from the delivery date.
      </div>
    </div>
  )
}