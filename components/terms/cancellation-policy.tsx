export function CancellationPolicy() {
  return (
    <div className="max-w-none font-be-vietnam text-[#2c3e50]/80">
      <h2 className="font-michroma text-2xl font-bold mb-6 uppercase text-[#2c3e50] tracking-tight">Cancellation Policy</h2>
      <p className="text-lg mb-8 leading-relaxed">
        If you change your mind and wish to cancel your order, please inform us within <span className="font-bold text-[#2c3e50]">48 hours</span> of purchase to avoid
        any fees. All cancellation requests must be sent via email to{" "}
        <a href="mailto:hello@lasvela.sg" target="_blank" rel="noopener noreferrer" className="text-[#2c3e50] font-bold hover:underline">
          hello@lasvela.sg
        </a>.
      </p>

      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
        <p className="mb-4 font-bold text-[#2c3e50]">
          Cancellation requests made after 48 hours will incur the following fees for regular-priced items:
        </p>
        <ul className="list-none p-0 space-y-3">
          {[
            "For products valued under SGD 500: SGD 50 per item.",
            "For products valued over SGD 500: 5% of the product value."
          ].map((item, idx) => (
            <li key={idx} className="flex gap-3 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2c3e50]/30 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="font-michroma text-lg font-bold mt-12 mb-6 text-[#2c3e50] uppercase tracking-wider">
        Non-Applicable Items
      </h3>
      <p className="mb-6 text-sm italic">The cancellation policy does not apply to the following non-regular priced items:</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {["Promotional/Discounted Products", "Display Pieces"].map((item, idx) => (
          <li key={idx} className="bg-white p-4 rounded-lg border border-gray-100 flex items-center gap-3">
            <div className="w-1 h-1 rounded-full bg-[#2c3e50]" />
            {item}
          </li>
        ))}
      </ul>

      <h3 className="font-michroma text-lg font-bold mt-12 mb-6 text-[#2c3e50] uppercase tracking-wider">No Changes Permitted</h3>
      <p className="mb-6 text-sm italic">Additionally, no changes can be made to the following items:</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          "Promotional/Discounted Products", 
          "Display Pieces", 
          "Customized/Made-to-order items"
        ].map((item, idx) => (
          <li key={idx} className="bg-white p-4 rounded-lg border border-gray-100 flex items-center gap-3">
            <div className="w-1 h-1 rounded-full bg-[#2c3e50]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}