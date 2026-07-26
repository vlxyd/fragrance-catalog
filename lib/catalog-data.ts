export type Brand = {
  id: string;
  name: string;
  description: string;
  logo: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  brandId: string;
  categoryId: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  gender: string;
  concentration: string;
  size: string;
  price: number;
  availability: "In stock" | "Pre-order" | "Limited";
  featured: boolean;
  isNew: boolean;
  image: string;
  gallery: string[];
};

export const brands: Brand[] = [
  {
    id: "maison-eclat",
    name: "Maison Éclat",
    description: "Modern perfumery rooted in velvet florals and golden warmth.",
    logo: "✦",
  },
  {
    id: "atelier-soleil",
    name: "Atelier Soleil",
    description: "Solar compositions with radiant citrus and amber woods.",
    logo: "☼",
  },
  {
    id: "noir-atelier",
    name: "Noir Atelier",
    description: "Rich and shadowed blends shaped for evening rituals.",
    logo: "◌",
  },
  {
    id: "lune-bloom",
    name: "Lune Bloom",
    description: "Soft, luminous scents that balance freshness and depth.",
    logo: "☾",
  },
];

export const categories: Category[] = [
  { id: "eau-de-parfum", name: "Eau de Parfum", description: "Concentrated luxury" },
  { id: "eau-de-toilette", name: "Eau de Toilette", description: "Bright and versatile" },
  { id: "parfum", name: "Parfum", description: "Intense and lasting" },
  { id: "home-fragrance", name: "Home Fragrance", description: "Atmospheric blends" },
];

export const products: Product[] = [
  {
    id: "velvet-noir",
    slug: "velvet-noir",
    name: "Velvet Noir",
    description: "A deep, velvet-tinged blend of black tea, rose absolute, and warm cedar.",
    brandId: "maison-eclat",
    categoryId: "eau-de-parfum",
    notes: {
      top: ["Black Tea", "Bergamot"],
      middle: ["Rose Absolute", "Jasmine Sambac"],
      base: ["Cedarwood", "Amber Resin", "Musk"],
    },
    gender: "Women",
    concentration: "EDP",
    size: "100 ml",
    price: 192,
    availability: "In stock",
    featured: true,
    isNew: true,
    image: "/product-velvet.svg",
    gallery: ["/product-velvet.svg", "/product-amber.svg"],
  },
  {
    id: "golden-iris",
    slug: "golden-iris",
    name: "Golden Iris",
    description: "Luminous iris, saffron, and suede create a polished signature scent.",
    brandId: "atelier-soleil",
    categoryId: "parfum",
    notes: {
      top: ["Saffron", "Pear"],
      middle: ["Iris Butter", "Geranium"],
      base: ["Suede", "Amber", "Vetiver"],
    },
    gender: "Unisex",
    concentration: "Parfum",
    size: "75 ml",
    price: 238,
    availability: "Limited",
    featured: true,
    isNew: false,
    image: "/product-iris.svg",
    gallery: ["/product-iris.svg", "/product-noir.svg"],
  },
  {
    id: "amber-echo",
    slug: "amber-echo",
    name: "Amber Echo",
    description: "Golden amber wrapped in neroli and soft woods for lingering warmth.",
    brandId: "lune-bloom",
    categoryId: "eau-de-toilette",
    notes: {
      top: ["Neroli", "Mandarin"],
      middle: ["Orange Blossom", "Cistus"],
      base: ["Amber", "Tonka Bean", "Cashmere Wood"],
    },
    gender: "Women",
    concentration: "EDT",
    size: "50 ml",
    price: 128,
    availability: "In stock",
    featured: false,
    isNew: true,
    image: "/product-amber.svg",
    gallery: ["/product-amber.svg", "/product-velvet.svg"],
  },
  {
    id: "nocturne-silk",
    slug: "nocturne-silk",
    name: "Nocturne Silk",
    description: "A moody composition of plum, incense, and smoked vanilla.",
    brandId: "noir-atelier",
    categoryId: "eau-de-parfum",
    notes: {
      top: ["Blackcurrant", "Pink Pepper"],
      middle: ["Jasmine", "Plum Accord"],
      base: ["Incense", "Smoked Vanilla", "Patchouli"],
    },
    gender: "Men",
    concentration: "EDP",
    size: "100 ml",
    price: 172,
    availability: "Pre-order",
    featured: true,
    isNew: false,
    image: "/product-noir.svg",
    gallery: ["/product-noir.svg", "/product-iris.svg"],
  },
  {
    id: "citrine-glow",
    slug: "citrine-glow",
    name: "Citrine Glow",
    description: "Fresh citrus, white tea, and soft musk for polished daytime elegance.",
    brandId: "atelier-soleil",
    categoryId: "eau-de-toilette",
    notes: {
      top: ["Citrus Spark", "Lemon Zest"],
      middle: ["White Tea", "Neroli"],
      base: ["Soft Musk", "Pearl Woods"],
    },
    gender: "Unisex",
    concentration: "EDT",
    size: "100 ml",
    price: 118,
    availability: "In stock",
    featured: false,
    isNew: false,
    image: "/product-amber.svg",
    gallery: ["/product-amber.svg", "/product-velvet.svg"],
  },
  {
    id: "lune-capture",
    slug: "lune-capture",
    name: "Lune Capture",
    description: "An airy floral veil of pear blossom, white woods, and sheer musk.",
    brandId: "lune-bloom",
    categoryId: "eau-de-parfum",
    notes: {
      top: ["Pear Blossom", "Aldehyde"],
      middle: ["White Peony", "Muguet"],
      base: ["White Woods", "Sheer Musk"],
    },
    gender: "Women",
    concentration: "EDP",
    size: "75 ml",
    price: 158,
    availability: "In stock",
    featured: false,
    isNew: true,
    image: "/product-iris.svg",
    gallery: ["/product-iris.svg", "/product-noir.svg"],
  },
];

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug);

export const getRelatedProducts = (slug: string) => {
  const current = getProductBySlug(slug);
  if (!current) return [];
  return products.filter((product) => product.id !== current.id && product.brandId === current.brandId).slice(0, 3);
};

export const featuredProducts = products.filter((product) => product.featured);
export const newArrivals = products.filter((product) => product.isNew);
export const bestSellers = [...products].sort((a, b) => b.price - a.price).slice(0, 3);
