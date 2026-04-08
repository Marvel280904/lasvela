export interface Product {
  id: string
  name: string
  slug: string
  category: string
  categoryId: string
  price: number
  rating?: number
  reviewCount?: number
  description: string
  features: string[]
  colors: string[]
  images: string[]
  thumbnailImage: string
  dimensions?: {
    width: number
    depth: number
    height: number
  }
  materials?: string[]
  careInstructions?: string[]
  deliveryTime?: string
  returnPolicy?: string
  warranty?: string
  inStock: boolean
  attributes?: Record<string, string[]>
  variants?: {
    id: string
    combinations: {
      id: string
      price: number
      inStock: boolean
    }[]
  }[]
  createdAt?: Date
  updatedAt?: Date
}

export const dummyProducts: Product[] = [
  // --- DINING (1-6) ---
  {
    id: "1",
    name: "Modern Dining Table",
    slug: "modern-dining-table",
    category: "Dining Tables",
    categoryId: "Dining",
    price: 1200,
    rating: 4.5,
    reviewCount: 24,
    description: "A sleek modern dining table with premium wood finish. Perfect for contemporary dining rooms.",
    features: ["Durable construction", "Easy to clean", "Modern design"],
    colors: ["Walnut", "Oak", "Black"],
    images: [
      "/images/product.jpg", 
      "/images/showroom_bg.jpg", 
      "/images/img_news1.jpg",
      "/images/img_news2.jpg", 
      "/images/img_news3.jpg",  
      "/images/img_news3.jpg", 
      "/images/product.jpg"
    ],
    thumbnailImage: "/images/product.jpg",
    dimensions: { width: 180, depth: 90, height: 75 },
    materials: ["Solid Wood", "Metal"],
    careInstructions: ["Wipe clean with damp cloth", "Avoid harsh chemicals"],
    deliveryTime: "5-7 business days",
    returnPolicy: "30-day return policy",
    warranty: "2-year warranty",
    inStock: true,
    attributes: { material: ["Wood"], type: ["6-Seater"], color: ["Walnut"] },
    variants: [{ id: "v1", combinations: [{ id: "c1", price: 1200, inStock: true }] }],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "2",
    name: "Extendable Dining Table",
    slug: "extendable-dining-table",
    category: "Dining Tables",
    categoryId: "Dining",
    price: 1500,
    rating: 4.2,
    reviewCount: 18,
    description: "Extendable dining table perfect for family gatherings. Extends from 6 to 10 seats.",
    features: ["Extendable design", "Sturdy construction", "Family friendly"],
    colors: ["Oak", "White"],
    images: [
      "/images/product.jpg", 
      "/images/product.jpg", 
      "/images/product.jpg",
      "/images/product.jpg", 
      "/images/product.jpg",  
      "/images/product.jpg"
    ],
    thumbnailImage: "/images/product.jpg",
    dimensions: { width: 200, depth: 100, height: 75 },
    materials: ["Solid Wood", "Metal mechanisms"],
    careInstructions: ["Wipe clean with damp cloth", "Use wood polish monthly"],
    deliveryTime: "7-10 business days",
    returnPolicy: "30-day return policy",
    warranty: "3-year warranty",
    inStock: true,
    attributes: { material: ["Wood", "Metal"], type: ["8-Seater"], color: ["Oak"] },
    variants: [{ id: "v1", combinations: [{ id: "c1", price: 1500, inStock: true }] }],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10")
  },
  {
    id: "3",
    name: "Glass Top Dining Table",
    slug: "glass-top-dining-table",
    category: "Dining Tables",
    categoryId: "Dining",
    price: 1800,
    rating: 4.8,
    reviewCount: 32,
    description: "Elegant glass top dining table with chrome legs. Perfect for modern interiors.",
    features: ["Tempered glass top", "Chrome legs", "Easy to clean"],
    colors: ["Clear Glass", "Smoked Glass"],
    images: [
      "/images/product.jpg", 
      "/images/product.jpg", 
      "/images/product.jpg",
      "/images/product.jpg", 
      "/images/product.jpg",  
      "/images/product.jpg"
    ],
    thumbnailImage: "/images/product.jpg",
    dimensions: { width: 160, depth: 90, height: 75 },
    materials: ["Tempered Glass", "Chrome"],
    careInstructions: ["Use glass cleaner", "Avoid abrasive materials"],
    deliveryTime: "10-14 business days",
    returnPolicy: "30-day return policy",
    warranty: "5-year warranty",
    inStock: true,
    attributes: { material: ["Glass", "Metal"], type: ["4-Seater"], color: ["Clear"] },
    variants: [{ id: "v1", combinations: [{ id: "c1", price: 1800, inStock: true }] }],
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05")
  },
  {
    id: "4",
    name: "Rustic Farmhouse Table",
    slug: "rustic-farmhouse-table",
    category: "Dining Tables",
    categoryId: "Dining",
    price: 950,
    rating: 4.3,
    reviewCount: 15,
    description: "Charming rustic farmhouse table with distressed finish. Adds character to any dining room.",
    features: ["Distressed finish", "Rustic charm", "Solid construction"],
    colors: ["Natural Wood", "Weathered Gray"],
    images: [
      "/images/product.jpg", 
      "/images/product.jpg", 
      "/images/product.jpg",
      "/images/product.jpg", 
      "/images/product.jpg",  
      "/images/product.jpg"
    ],
    thumbnailImage: "/images/product.jpg",
    dimensions: { width: 200, depth: 100, height: 75 },
    materials: ["Reclaimed Wood", "Iron"],
    careInstructions: ["Dust regularly", "Use wood conditioner"],
    deliveryTime: "7-10 business days",
    returnPolicy: "30-day return policy",
    warranty: "1-year warranty",
    inStock: true,
    attributes: { material: ["Wood"], type: ["8-Seater"], color: ["Natural Wood"] },
    variants: [{ id: "v1", combinations: [{ id: "c1", price: 950, inStock: true }] }],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "5",
    name: "Minimalist Dining Table",
    slug: "minimalist-dining-table",
    category: "Dining Tables",
    categoryId: "Dining",
    price: 1100,
    rating: 4.6,
    reviewCount: 28,
    description: "Clean lines and simple design characterize this minimalist dining table.",
    features: ["Minimalist design", "Easy to assemble", "Space saving"],
    colors: ["White", "Black", "Natural"],
    images: [
      "/images/product.jpg", 
      "/images/product.jpg", 
      "/images/product.jpg",
      "/images/product.jpg", 
      "/images/product.jpg",  
      "/images/product.jpg"
    ],
    thumbnailImage: "/images/product.jpg",
    dimensions: { width: 150, depth: 85, height: 72 },
    materials: ["MDF", "Metal"],
    careInstructions: ["Wipe clean with damp cloth", "Avoid direct sunlight"],
    deliveryTime: "5-7 business days",
    returnPolicy: "30-day return policy",
    warranty: "2-year warranty",
    inStock: true,
    attributes: { material: ["Wood", "Metal"], type: ["4-Seater"], color: ["White"] },
    variants: [{ id: "v1", combinations: [{ id: "c1", price: 1100, inStock: true }] }],
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12")
  },
  {
    id: "6",
    name: "Round Pedestal Table",
    slug: "round-pedestal-table",
    category: "Dining Tables",
    categoryId: "Dining",
    price: 1350,
    rating: 4.4,
    reviewCount: 21,
    description: "Elegant round pedestal table perfect for intimate dining experiences.",
    features: ["Round design", "Pedestal base", "Space efficient"],
    colors: ["Cherry", "Mahogany"],
    images: [
      "/images/product.jpg", 
      "/images/product.jpg", 
      "/images/product.jpg",
      "/images/product.jpg", 
      "/images/product.jpg",  
      "/images/product.jpg"
    ],
    thumbnailImage: "/images/product.jpg",
    dimensions: { width: 140, depth: 140, height: 75 },
    materials: ["Solid Wood", "Metal base"],
    careInstructions: ["Polish with wood polish", "Avoid water rings"],
    deliveryTime: "10-12 business days",
    returnPolicy: "30-day return policy",
    warranty: "3-year warranty",
    inStock: true,
    attributes: { material: ["Wood"], type: ["6-Seater"], color: ["Cherry"] },
    variants: [{ id: "v1", combinations: [{ id: "c1", price: 1350, inStock: true }] }],
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08")
  },

  // --- LIVING (7-9) ---
  {
    id: "7",
    name: "Luxury Leather Sofa",
    slug: "luxury-leather-sofa",
    category: "Living Room Sofas",
    categoryId: "Living",
    price: 2500,
    rating: 4.9,
    reviewCount: 45,
    description: "Premium Italian leather sofa with deep seating for ultimate comfort.",
    features: ["Genuine Leather", "High-density foam", "Solid wood frame"],
    colors: ["Cognac", "Black"],
    images: [
      "/images/product.jpg", 
      "/images/product.jpg", 
      "/images/product.jpg",
      "/images/product.jpg", 
      "/images/product.jpg",  
      "/images/product.jpg"
    ],
    thumbnailImage: "/images/product.jpg",
    materials: ["Leather", "Solid Wood"],
    careInstructions: ["Use leather conditioner"],
    deliveryTime: "10-15 business days",
    returnPolicy: "30-day return policy",
    warranty: "10-year warranty",
    inStock: true,
    attributes: { material: ["Leather"], type: ["3-Seater"] },
    variants: [{ id: "v1", combinations: [{ id: "c1", price: 2500, inStock: true }] }],
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01")
  },
  {
    id: "8",
    name: "Velvet Accent Chair",
    slug: "velvet-accent-chair",
    category: "Living Room Chairs",
    categoryId: "Living",
    price: 650,
    rating: 4.7,
    reviewCount: 30,
    description: "Stylish velvet armchair with gold metal legs, adding a touch of luxury to your living space.",
    features: ["Soft Velvet", "Gold finish legs", "Ergonomic back"],
    colors: ["Emerald Green", "Navy Blue", "Pink"],
    images: [
      "/images/product.jpg", 
      "/images/product.jpg", 
      "/images/product.jpg",
      "/images/product.jpg", 
      "/images/product.jpg",  
      "/images/product.jpg"
    ],
    thumbnailImage: "/images/product.jpg",
    materials: ["Fabric", "Metal"],
    careInstructions: ["Vacuum regularly"],
    deliveryTime: "5-7 business days",
    returnPolicy: "30-day return policy",
    warranty: "2-year warranty",
    inStock: true,
    attributes: { material: ["Fabric"], type: ["Armchair"] },
    variants: [{ id: "v1", combinations: [{ id: "c1", price: 650, inStock: true }] }],
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-05")
  },
  {
    id: "9",
    name: "Industrial Coffee Table",
    slug: "industrial-coffee-table",
    category: "Living Room Tables",
    categoryId: "Living",
    price: 450,
    rating: 4.3,
    reviewCount: 15,
    description: "Rugged industrial coffee table featuring reclaimed wood and black iron frame.",
    features: ["Reclaimed wood", "Sturdy iron frame", "Lower shelf for storage"],
    colors: ["Natural", "Dark Wood"],
    images: [
      "/images/product.jpg", 
      "/images/product.jpg", 
      "/images/product.jpg",
      "/images/product.jpg", 
      "/images/product.jpg",  
      "/images/product.jpg"
    ],
    thumbnailImage: "/images/product.jpg",
    materials: ["Reclaimed Wood", "Iron"],
    careInstructions: ["Wipe clean"],
    deliveryTime: "3-5 business days",
    returnPolicy: "30-day return policy",
    warranty: "1-year warranty",
    inStock: true,
    attributes: { material: ["Wood", "Metal"], type: ["Coffee Table"] },
    variants: [{ id: "v1", combinations: [{ id: "c1", price: 450, inStock: true }] }],
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10")
  },

  // --- BEDROOM (10-12) ---
  {
    id: "10",
    name: "Oak King Bed Frame",
    slug: "oak-king-bed-frame",
    category: "Bedroom Furniture",
    categoryId: "Bedroom",
    price: 1800,
    rating: 4.8,
    reviewCount: 50,
    description: "Solid oak bed frame with a timeless design. Built to last for generations.",
    features: ["Solid Oak", "Slat support system", "Easy assembly"],
    colors: ["Natural Oak"],
    images: [
      "/images/product.jpg", 
      "/images/product.jpg", 
      "/images/product.jpg",
      "/images/product.jpg", 
      "/images/product.jpg",  
      "/images/product.jpg"
    ],
    thumbnailImage: "/images/product.jpg",
    materials: ["Solid Wood"],
    careInstructions: ["Avoid direct sunlight"],
    deliveryTime: "7-10 business days",
    returnPolicy: "30-day return policy",
    warranty: "5-year warranty",
    inStock: true,
    attributes: { material: ["Wood"], type: ["Bed Frame"] },
    variants: [{ id: "v1", combinations: [{ id: "c1", price: 1800, inStock: true }] }],
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25")
  },
  {
    id: "11",
    name: "Modern Nightstand",
    slug: "modern-nightstand",
    category: "Bedroom Furniture",
    categoryId: "Bedroom",
    price: 250,
    rating: 4.5,
    reviewCount: 12,
    description: "Minimalist nightstand with soft-close drawers.",
    features: ["Soft-close", "Matte finish", "Compact"],
    colors: ["White", "Grey"],
    images: [
      "/images/product.jpg", 
      "/images/product.jpg", 
      "/images/product.jpg",
      "/images/product.jpg", 
      "/images/product.jpg",  
      "/images/product.jpg"
    ],
    thumbnailImage: "/images/product.jpg",
    materials: ["MDF", "Metal"],
    careInstructions: ["Wipe clean"],
    deliveryTime: "3-5 business days",
    returnPolicy: "30-day return policy",
    warranty: "1-year warranty",
    inStock: true,
    attributes: { material: ["MDF"], type: ["Storage"] },
    variants: [{ id: "v1", combinations: [{ id: "c1", price: 250, inStock: true }] }],
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-01-28")
  },
  {
    id: "12",
    name: "Sliding Door Wardrobe",
    slug: "sliding-door-wardrobe",
    category: "Bedroom Furniture",
    categoryId: "Bedroom",
    price: 1200,
    rating: 4.4,
    reviewCount: 20,
    description: "Spacious wardrobe with sliding doors and full-length mirror.",
    features: ["Sliding doors", "Mirror front", "Adjustable shelves"],
    colors: ["Walnut", "White"],
    images: [
      "/images/product.jpg", 
      "/images/product.jpg", 
      "/images/product.jpg",
      "/images/product.jpg", 
      "/images/product.jpg",  
      "/images/product.jpg"
    ],
    thumbnailImage: "/images/product.jpg",
    materials: ["MDF", "Glass"],
    careInstructions: ["Glass cleaner for mirror"],
    deliveryTime: "10-14 business days",
    returnPolicy: "30-day return policy",
    warranty: "3-year warranty",
    inStock: true,
    attributes: { material: ["Wood", "Glass"], type: ["Storage"] },
    variants: [{ id: "v1", combinations: [{ id: "c1", price: 1200, inStock: true }] }],
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01")
  },

  // --- KITCHEN & BATHROOM (13-14) ---
  {
    id: "13",
    name: "Marble Kitchen Island",
    slug: "marble-kitchen-island",
    category: "Kitchen Furniture",
    categoryId: "Kitchen",
    price: 3200,
    rating: 5.0,
    reviewCount: 5,
    description: "Luxurious kitchen island with genuine marble top and plenty of storage.",
    features: ["Genuine Marble", "Solid wood base", "Wine rack"],
    colors: ["White/Grey"],
    images: [
      "/images/product.jpg", 
      "/images/product.jpg", 
      "/images/product.jpg",
      "/images/product.jpg", 
      "/images/product.jpg",  
      "/images/product.jpg"
    ],
    thumbnailImage: "/images/product.jpg",
    materials: ["Marble", "Solid Wood"],
    careInstructions: ["Seal marble regularly"],
    deliveryTime: "14-21 business days",
    returnPolicy: "No return on custom items",
    warranty: "5-year warranty",
    inStock: true,
    attributes: { material: ["Marble"], type: ["Island"] },
    variants: [{ id: "v1", combinations: [{ id: "c1", price: 3200, inStock: true }] }],
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15")
  },
  {
    id: "14",
    name: "Teak Bathroom Vanity",
    slug: "teak-bathroom-vanity",
    category: "Bathroom Furniture",
    categoryId: "Bathroom",
    price: 980,
    rating: 4.6,
    reviewCount: 18,
    description: "Water-resistant teak vanity unit with ceramic basin.",
    features: ["Water resistant", "Ceramic basin", "Soft-close doors"],
    colors: ["Teak"],
    images: [
      "/images/product.jpg", 
      "/images/product.jpg", 
      "/images/product.jpg",
      "/images/product.jpg", 
      "/images/product.jpg",  
      "/images/product.jpg"
    ],
    thumbnailImage: "/images/product.jpg",
    materials: ["Solid Wood", "Ceramic"],
    careInstructions: ["Wipe dry after use"],
    deliveryTime: "7-10 business days",
    returnPolicy: "30-day return policy",
    warranty: "2-year warranty",
    inStock: true,
    attributes: { material: ["Wood", "Ceramic"], type: ["Vanity"] },
    variants: [{ id: "v1", combinations: [{ id: "c1", price: 980, inStock: true }] }],
    createdAt: new Date("2024-02-12"),
    updatedAt: new Date("2024-02-12")
  },

  // --- LIGHTING (15) ---
  {
    id: "15",
    name: "Crystal Chandelier",
    slug: "crystal-chandelier",
    category: "Lighting",
    categoryId: "Lighting",
    price: 2100,
    rating: 4.9,
    reviewCount: 8,
    description: "Statement crystal chandelier perfect for dining rooms or grand entryways.",
    features: ["K9 Crystals", "Dimmable", "Gold finish"],
    colors: ["Gold", "Silver"],
    images: [
      "/images/product.jpg", 
      "/images/product.jpg", 
      "/images/product.jpg",
      "/images/product.jpg", 
      "/images/product.jpg",  
      "/images/product.jpg"
    ],
    thumbnailImage: "/images/product.jpg",
    materials: ["Glass", "Metal"],
    careInstructions: ["Dust carefully"],
    deliveryTime: "7-10 business days",
    returnPolicy: "30-day return policy",
    warranty: "2-year warranty",
    inStock: true,
    attributes: { material: ["Glass", "Metal"], type: ["Ceiling"] },
    variants: [{ id: "v1", combinations: [{ id: "c1", price: 2100, inStock: true }] }],
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-02-20")
  }
]

export default dummyProducts

export interface CategoryItem {
  name: string
  href: string
}

export interface Category {
  title: string
  categoryId: string
  imageSrc: string
  items: CategoryItem[]
}

export const productCategories: Category[] = [
  {
    title: "LIVING",
    categoryId: "Living",
    imageSrc: "/icons/icon_living.png",
    items: [
      { name: "sofas", href: "/products?category=sofas" },
      { name: "coffee tables", href: "/products?category=coffee-tables" },
      { name: "tv consoles", href: "/products?category=tv-consoles" },
      { name: "ottomans", href: "/products?category=ottomans" },
      { name: "side tables", href: "/products?category=side-tables" }
    ]
  },
  {
    title: "BEDROOM", 
    categoryId: "Bedroom",
    imageSrc: "/icons/icon_bedroom.png",
    items: [
      { name: "mattresses", href: "/products?category=mattresses" },
      { name: "bed frames", href: "/products?category=bed-frames" },
      { name: "dressing tables", href: "/products?category=dressing-tables" },
      { name: "bedside tables", href: "/products?category=bedside-tables" }
    ]
  },
  {
    title: "KITCHEN",
    categoryId: "Kitchen",
    imageSrc: "/icons/icon_kitchen.png",
    items: [
      { name: "cooker hobs", href: "/products?category=cooker-hobs" },
      { name: "kitchen hoods", href: "/products?category=kitchen-hoods" },
      { name: "kitchen sinks", href: "/products?category=kitchen-sinks" },
      { name: "kitchen taps", href: "/products?category=kitchen-taps" }
    ]
  },
  {
    title: "BATHROOM",
    categoryId: "Bathroom",
    imageSrc: "/icons/icon_bathroom.png",
    items: [
      { name: "shower sets", href: "/products?category=shower-sets" },
      { name: "water closets", href: "/products?category=water-closets" },
      { name: "vanity cabinets", href: "/products?category=vanity-cabinets" },
      { name: "heaters", href: "/products?category=heaters" },
      { name: "mirrors", href: "/products?category=mirrors" }
    ]
  },
  {
    title: "DINING",
    categoryId: "Dining",
    imageSrc: "/icons/icon_dining.png",
    items: [
      { name: "dining tables", href: "/products?category=dining-tables" },
      { name: "dining chairs", href: "/products?category=dining-chairs" },
      { name: "benches", href: "/products?category=benches" }
    ]
  },
  {
    title: "LIGHTING & FAN",
    categoryId: "Lighting",
    imageSrc: "/icons/icon_lighting.png",
    items: [
      { name: "ceiling lighting", href: "/products?category=ceiling-lighting" },
      { name: "wall-mounted lighting", href: "/products?category=wall-mounted-lighting" },
      { name: "ceiling fans", href: "/products?category=ceiling-fans" },
      { name: "wall-mounted fans", href: "/products?category=wall-mounted-fans" }
    ]
  }
]

export interface emptyState {
  categoryId: string
  imageSrc: string
}

export const productEmptyState: emptyState[] = [
  {
    categoryId: "Living",
    imageSrc: "/icons/empty_living.png",
  },
  {
    categoryId: "Bedroom",
    imageSrc: "/icons/empty_bedroom.png",
  },
  {
    categoryId: "Kitchen",
    imageSrc: "/icons/empty_kitchen.png",
  },
  {
    categoryId: "Bathroom",
    imageSrc: "/icons/empty_bathroom.png",
  },
  {
    categoryId: "Dining",
    imageSrc: "/icons/empty_dining.png",
  },
  {
    categoryId: "Lighting",
    imageSrc: "/icons/empty_lighting.png",
  }
]