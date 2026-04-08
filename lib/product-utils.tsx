import { 
  Trees,       
  Anvil,       
  Gem,         
  Feather,     
  Briefcase,   
  GlassWater,  
  Layers,      
  Hexagon,     
  BoxSelect,
  Star    
} from "lucide-react"
import { productEmptyState } from "@/lib/dummy-data"

/** Format angka menjadi mata uang SGD (Singapore Dollar) **/
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 0,
  }).format(price);
}

/** Render Bintang Rating **/
export const renderStars = (rating: number) => {
  return [1, 2, 3, 4, 5].map((star) => (
    <Star
      key={star}
      size={16}
      className={star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}
      fill={star <= Math.round(rating) ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
    />
  ));
};

/** Mendapatkan Icon Lucide berdasarkan string nama material **/
export const getMaterialIcon = (name: string) => {
  const n = name.toLowerCase()

  if (n.includes("wood") || n.includes("oak") || n.includes("walnut") || n.includes("teak") || n.includes("ash")) return <Trees className="w-5 h-5" />
  if (n.includes("mdf") || n.includes("plywood")) return <Layers className="w-5 h-5" />
  if (n.includes("metal") || n.includes("iron") || n.includes("steel") || n.includes("gold") || n.includes("silver") || n.includes("chrome")) return <Anvil className="w-5 h-5" />
  if (n.includes("glass") || n.includes("crystal")) return <GlassWater className="w-5 h-5" />
  if (n.includes("marble") || n.includes("stone") || n.includes("granite")) return <Gem className="w-5 h-5" />
  if (n.includes("ceramic") || n.includes("porcelain")) return <Hexagon className="w-5 h-5" />
  if (n.includes("fabric") || n.includes("velvet") || n.includes("linen") || n.includes("cotton")) return <Feather className="w-5 h-5" />
  if (n.includes("leather")) return <Briefcase className="w-5 h-5" />
  
  return <BoxSelect className="w-5 h-5" />
}

/** Cari image icon category yang cocok dengan filter type **/
export const getCategoryIconSrc = (type: string | null) => {
  if (!type || type === "all" || type === "") {
    return "/icons/icon_living.png";
  }

  // cari category berdasarkan categoryId (case-insensitive)
  const matchedCategory = productEmptyState.find(
    (c) => c.categoryId.toLowerCase() === type.toLowerCase()
  );  
  return matchedCategory ? matchedCategory.imageSrc : "/icons/icon_living.png";
}