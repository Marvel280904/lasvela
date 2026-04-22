export function FreeStorage() {
  return (
    <div className="max-w-none font-be-vietnam text-[#2c3e50]/80">
      <h2 className="font-michroma text-2xl font-bold mb-6 uppercase text-[#2c3e50] tracking-tight">Free Storage</h2>
      <p className="text-lg mb-8 leading-relaxed">
        LASVELA offers complimentary storage for up to <span className="font-bold text-[#2c3e50]">2 months</span> from the estimated delivery date. 
      </p>

      <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 mb-12">
        <h3 className="font-michroma text-sm font-bold mb-8 text-[#2c3e50] uppercase tracking-widest">Storage Policy Details</h3>
        <div className="space-y-8">
          {[
            {
              label: "Free Period",
              value: "2 months from estimated delivery date",
              icon: "01"
            },
            {
              label: "Extended Fee",
              value: "5% of item value per month after free period",
              icon: "02"
            },
            {
              label: "How to Request",
              value: "Email hello@lasvela.sg",
              icon: "03"
            }
          ].map((step, idx) => (
            <div key={idx} className="flex gap-6 items-start">
              <span className="font-michroma text-xs font-bold text-[#2c3e50]/70 mt-1">{step.icon}</span>
              <div>
                <p className="font-michroma text-[10px] font-bold text-[#2c3e50]/70 uppercase tracking-widest mb-1">{step.label}</p>
                <p className="text-[#2c3e50] font-medium">{step.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-100 rounded-xl flex items-center gap-4 shadow-sm">
        <div className="w-2 h-2 rounded-full bg-[#2c3e50]" />
        <p className="text-sm italic">
          Note: Please request storage service as early as possible to ensure availability.
        </p>
      </div>
    </div>
  )
}
