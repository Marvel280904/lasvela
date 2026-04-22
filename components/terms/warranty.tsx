export function Warranty() {
  return (
    <div className="max-w-none font-be-vietnam text-[#2c3e50]/80">
      <h2 className="font-michroma text-2xl font-bold mb-6 uppercase text-[#2c3e50] tracking-tight">Warranty Policy</h2>
      <p className="font-be-vietnam text-lg mb-8 leading-relaxed">
        At LASVELA, we stand behind the quality of our products. Our warranty policy is designed to give you peace of
        mind with your purchase.
      </p>

      <div className="overflow-x-auto mb-8 rounded-xl border border-gray-100 shadow-sm">
        <table className="min-w-full border-collapse text-sm md:text-base font-be-vietnam">
          <thead>
            <tr className="bg-[#2c3e50] text-white">
              <th className="p-4 text-left font-michroma text-xs uppercase tracking-widest">Type</th>
              <th className="p-4 text-left font-michroma text-xs uppercase tracking-widest">Warranty Coverage</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="p-4 align-top font-bold text-[#2c3e50]">Sofas</td>
              <td className="p-4 space-y-2">
                <p>Frame structure: <span className="font-semibold">3 Year Limited Warranty</span></p>
                <p>Genuine leather: <span className="font-semibold">3 Year Limited Warranty</span></p>
                <p>Soft furnishings: <span className="font-semibold">1 Year Limited Warranty</span></p>
                <p className="text-xs text-[#2c3e50]/60">(Foam, fibre fillings, feathers, fabric covers, stitching, faux leather)</p>
                <p>Other components: <span className="font-semibold">1 Year Limited Warranty</span></p>
                <p className="text-xs text-[#2c3e50]/60">(zips, fasteners, springs, suspension, legs, mechanisms)</p>
              </td>
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <td className="p-4 align-top font-bold text-[#2c3e50]">Dining & Casegoods</td>
              <td className="p-4">
                <p className="font-semibold">2 Year Limited Warranty</p>
                <p className="text-xs text-[#2c3e50]/60 mt-1">Dining Tables, Chairs, Benches, Cabinets, Coffee Tables</p>
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="p-4 align-top font-bold text-[#2c3e50]">Bed Frames</td>
              <td className="p-4 space-y-2">
                <p>Frame structure: <span className="font-semibold">3 Year Limited Warranty</span></p>
                <p>Genuine leather: <span className="font-semibold">3 Year Limited Warranty</span></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="font-michroma text-lg font-bold mt-12 mb-6 text-[#2c3e50] uppercase tracking-wider">Not covered under the warranty:</h3>
      <ul className="list-none p-0 mb-12 space-y-4">
        {[
          "Damage caused by using detergents, abrasives, or harsh cleaning agents.",
          "Damage due to negligence, abuse, accidents, or normal wear and tear (burns, cuts, scratches, etc).",
          "Wear and tear over time.",
          "Products used outdoors when not designed for outdoor use.",
          "Any unauthorized modifications made to the product by the customer will void the warranty.",
          "Incorrect self-assembly.",
          "Items purchased as 'Clearance Pieces' or 'Display Pieces.'",
          "Repaired or replaced items are only covered for the remainder of the original warranty period.",
          "Manufacturing defects detected within the warranty period will cover the cost of materials, replacement parts, labor, and transportation.",
          "If an item is deemed defective due to misuse, the customer covers the costs.",
          "Manufacturing defects detected after the warranty period are borne by the customer.",
          "Products not used for domestic purposes.",
          "Products shipped or transferred to a different location/country."
        ].map((item, idx) => (
          <li key={idx} className="flex gap-4 items-start font-be-vietnam text-[#2c3e50]/80">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2c3e50]/30 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h3 className="font-michroma text-lg font-bold mt-12 mb-6 text-[#2c3e50] uppercase tracking-wider">How to Make a Warranty Claim</h3>
      <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
        <p className="font-be-vietnam mb-6 leading-relaxed">If you believe your product has a defect covered by our warranty, please contact our customer service team:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-[#2c3e50]/40 font-michroma font-bold">Email</p>
            <a href="mailto:hello@lasvela.sg" target="_blank" rel="noopener noreferrer" className="text-[#2c3e50] font-bold font-be-vietnam hover:underline">hello@lasvela.sg</a>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-[#2c3e50]/40 font-michroma font-bold">WhatsApp</p>
            <a href="https://wa.me/6560190775" target="_blank" rel="noopener noreferrer" className="text-[#2c3e50] font-bold font-be-vietnam hover:underline">+65 6019 0775</a>
          </div>
        </div>
        <p className="mt-8 pt-8 border-t border-gray-200 text-sm font-be-vietnam text-[#2c3e50]/60 italic">
          Our team will guide you through the warranty claim process, which may include providing photographs or arranging for an inspection.
        </p>
      </div>
    </div>
  )
}
