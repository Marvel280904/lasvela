export function UseTerms() {
  return (
    <div className="max-w-none font-be-vietnam text-[#2c3e50]/80">
      <h2 className="font-michroma text-2xl font-bold mb-6 uppercase text-[#2c3e50] tracking-tight">Terms of Use</h2>
      <p className="mb-8 leading-relaxed text-lg">
        Welcome to <span className="font-bold text-[#2c3e50]">LASVELA</span>. By accessing or using our website, you agree to be bound by the following terms and
        conditions. All content, products, and services provided on this site are for informational purposes only
        and subject to change without notice. 
      </p>

      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-12">
        <p className="text-sm leading-relaxed">
          We strive to ensure the accuracy of the information provided, but we
          do not guarantee its completeness or reliability. By using this site, you acknowledge that it is your
          responsibility to verify any information before making a purchase. Unauthorized use of this website may
          result in legal action. Please review our privacy policy for details on how we handle your personal
          information.
        </p>
      </div>

      <h2 className="font-michroma text-xl font-bold mt-12 mb-6 text-[#2c3e50] uppercase tracking-wider">Product Specifications Disclosure</h2>
      <p className="mb-8 leading-relaxed">
        Certain products may have unfinished or partially finished surfaces, including but not limited to the
        undersides of table tops, legs, the backs of chests, tops of wardrobes, the bottoms of drawers, and bed
        slats. These are not considered defects, under conditions including but not limited to the following:
      </p>

      <ul className="list-none p-0 my-8 space-y-6">
        {[
          "Fiberglass and polished stainless steel items may exhibit minor scratches and undulations, which are not classified as defects.",
          "Leathers and fabrics commonly used, such as wool, viscose, nylon, and genuine cow or buffalo hide leather, may cause allergic reactions. Customers are responsible for ensuring they are not allergic to these materials before purchasing.",
          "The packaging for most products includes cardboard and other materials, which may occasionally cause minor 'micro-scratches' on the product's surface. These are typically touched up by the delivery or service team.",
          "Variations in color, grain, and texture are natural characteristics of the product materials, and changes due to aging and use do not constitute defects.",
          "Newly assembled or installed items may not rest perfectly flush with the floor immediately but will settle over approximately 3 to 7 days of use.",
          "Sofas may have crumples, indentations, or depressions when first unpacked, which will diminish over time. This is not considered a defect.",
          "Items purchased at different times, even if similar models or materials, may show variations in color and texture that do not constitute defects."
        ].map((item, idx) => (
          <li key={idx} className="flex gap-4 items-start">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2c3e50]/30 shrink-0" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>

      <h2 className="font-michroma text-xl font-bold mt-12 mb-6 text-[#2c3e50] uppercase tracking-wider">Goods Sold As-Is</h2>
      <p className="mb-6 leading-relaxed">
        Products sold during promotional events, marked "As-Is," as floor samples, or surplus display items may have
        cosmetic imperfections and may not appear brand new. The Customer acknowledges these defects upon purchase,
        and the discounted price reflects this understanding.
      </p>
    </div>
  )
}