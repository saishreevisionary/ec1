// Programmatic seed data for 168 pure botanical extracts, essential oils, spice oleoresins, floral concretes & absolutes.
// Meticulously matched for Venuss Herbo Aromatics catalog.

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  price: number;
  original_price?: number;
  rating?: number;
  reviews_count?: number;
  badge?: string;
  discount?: string;
  gst_rate: number;
  stock_quantity: number;
  low_stock_threshold: number;
  sku: string;
  category_id: number;
  image_url: string;
  images: string[];
  status: 'active' | 'draft';
  specs: Record<string, string>;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}

export const CATEGORIES: Category[] = [
  {
    "id": 1,
    "name": "Essential Oils",
    "slug": "essential-oils",
    "description": "Pure Botanical Distillates",
    "image_url": "/images/botanical-hero.jpg"
  },
  {
    "id": 2,
    "name": "Spice Oils",
    "slug": "spice-oils",
    "description": "Aromatic Spice Extracts",
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop"
  },
  {
    "id": 3,
    "name": "Spice Oleoresins",
    "slug": "spice-oleoresins",
    "description": "Concentrated Flavor Resins",
    "image_url": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=200&auto=format&fit=crop"
  },
  {
    "id": 4,
    "name": "Floral Concretes",
    "slug": "floral-concretes",
    "description": "Natural Flower Waxes",
    "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=200&auto=format&fit=crop"
  },
  {
    "id": 5,
    "name": "Floral Absolutes",
    "slug": "floral-absolutes",
    "description": "Precious Fine Fragrances",
    "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=200&auto=format&fit=crop"
  },
  {
    "id": 6,
    "name": "Spice Powders",
    "slug": "spice-powders",
    "description": "Ground Sterilized Spices",
    "image_url": "/images/spice-powders.jpg"
  }
];

export const PRODUCTS: Product[] = [
  {
    "name": "Jasmine Sambac Absolute",
    "slug": "jasmine-sambac-absolute",
    "tagline": "Pure. Intense. Timeless.",
    "sku": "ABS-001",
    "price": 3850,
    "original_price": 4200,
    "rating": 5,
    "reviews_count": 142,
    "badge": "BESTSELLER",
    "category_id": 5,
    "image_url": "/images/products/jasmine-sambac.jpg",
    "images": [
      "/images/products/jasmine-sambac.jpg"
    ],
    "stock_quantity": 40,
    "low_stock_threshold": 5,
    "gst_rate": 18,
    "status": "active",
    "description": "Pure steam-extracted Jasmine Sambac Absolute. Intensely floral, deep, and sensual with honeyed undertones for fine perfumery, aromatics, and luxury cosmetic formulations.",
    "specs": {
      "Botanical Name": "Jasminum sambac",
      "Extraction Method": "Solvent Extraction / Alcohol Wash",
      "Origin": "Madurai, Tamil Nadu, India",
      "Aroma Profile": "Intense floral, warm, sweet, narcotic honeyed",
      "Purity": "100% Pure & Undiluted"
    },
    "id": "prod-ref-1",
    "created_at": "2026-09-20T07:40:05.161Z"
  },
  {
    "name": "Lavender Essential Oil",
    "slug": "lavender-essential-oil",
    "tagline": "Calm. Balance. Restore.",
    "sku": "ESS-002",
    "price": 850,
    "original_price": 1050,
    "rating": 5,
    "reviews_count": 98,
    "badge": "NEW",
    "category_id": 1,
    "image_url": "/images/products/lavender-oil.jpg",
    "images": [
      "/images/products/lavender-oil.jpg"
    ],
    "stock_quantity": 65,
    "low_stock_threshold": 8,
    "gst_rate": 18,
    "status": "active",
    "description": "100% steam-distilled highland lavender blossoms. Soothing, floral, herbaceous aroma with natural linalool for calm, skincare formulations, and aromatherapy.",
    "specs": {
      "Botanical Name": "Lavandula angustifolia",
      "Extraction Method": "Steam Distillation",
      "Origin": "Kashmir Valley, India",
      "Aroma Profile": "Floral, herbaceous, sweet, soothing",
      "Purity": "100% Pure Therapeutic Grade"
    },
    "id": "prod-ref-2",
    "created_at": "2026-09-20T07:40:04.162Z"
  },
  {
    "name": "Peppermint Essential Oil",
    "slug": "peppermint-essential-oil",
    "tagline": "Fresh. Cooling. Uplifting.",
    "sku": "ESS-003",
    "price": 780,
    "rating": 5,
    "reviews_count": 76,
    "category_id": 1,
    "image_url": "/images/products/peppermint-oil.jpg",
    "images": [
      "/images/products/peppermint-oil.jpg"
    ],
    "stock_quantity": 50,
    "low_stock_threshold": 5,
    "gst_rate": 18,
    "status": "active",
    "description": "Pure Mentha piperita steam distillate. Crisp, invigorating menthol character providing an intense cooling sensation for personal care, balms, and flavoring.",
    "specs": {
      "Botanical Name": "Mentha piperita",
      "Extraction Method": "Steam Distillation",
      "Origin": "Uttar Pradesh, India",
      "Aroma Profile": "Crisp, cool menthol, penetrating, clean",
      "Purity": "100% Pure & Natural"
    },
    "id": "prod-ref-3",
    "created_at": "2026-09-20T07:40:03.162Z"
  },
  {
    "name": "Lemongrass Essential Oil",
    "slug": "lemongrass-essential-oil",
    "tagline": "Citrus. Fresh. Revitalizing.",
    "sku": "ESS-004",
    "price": 920,
    "original_price": 1150,
    "rating": 5,
    "reviews_count": 65,
    "category_id": 1,
    "image_url": "/images/products/lemongrass-oil.jpg",
    "images": [
      "/images/products/lemongrass-oil.jpg"
    ],
    "stock_quantity": 35,
    "low_stock_threshold": 5,
    "gst_rate": 18,
    "status": "active",
    "description": "Steam-distilled Cymbopogon flexuosus grass from Kerala. Bright citrus aroma rich in natural citral for uplifting diffuser blends and wellness products.",
    "specs": {
      "Botanical Name": "Cymbopogon flexuosus",
      "Extraction Method": "Steam Distillation",
      "Origin": "Kerala, India",
      "Aroma Profile": "Vibrant lemon, grassy, herbaceous, fresh",
      "Purity": "100% Pure Essential Oil"
    },
    "id": "prod-ref-4",
    "created_at": "2026-09-20T07:40:02.162Z"
  },
  {
    "name": "Sweet Orange Essential Oil",
    "slug": "sweet-orange-essential-oil",
    "tagline": "Bright. Cheerful. Uplifting.",
    "sku": "ESS-005",
    "price": 650,
    "original_price": 750,
    "rating": 5,
    "reviews_count": 54,
    "category_id": 1,
    "image_url": "/images/products/sweet-orange.jpg",
    "images": [
      "/images/products/sweet-orange.jpg"
    ],
    "stock_quantity": 80,
    "low_stock_threshold": 10,
    "gst_rate": 18,
    "status": "active",
    "description": "Cold-pressed Citrus sinensis peel oil. Vibrant, sunny citrus notes rich in natural d-limonene for radiant fragrances, home wellness, and flavor formulations.",
    "specs": {
      "Botanical Name": "Citrus sinensis",
      "Extraction Method": "Cold Expression",
      "Origin": "Nagpur, India",
      "Aroma Profile": "Sweet, zesty orange, radiant, warm fruity",
      "Purity": "100% Pure Cold Pressed"
    },
    "id": "prod-ref-5",
    "created_at": "2026-09-20T07:40:01.162Z"
  },
  {
    "name": "Ceylon Cinnamon Oil",
    "slug": "ceylon-cinnamon-oil",
    "tagline": "Warm. Rich. Exotic.",
    "sku": "SPI-002",
    "price": 1450,
    "rating": 5,
    "reviews_count": 68,
    "category_id": 2,
    "image_url": "/images/products/ceylon-cinnamon.jpg",
    "images": [
      "/images/products/ceylon-cinnamon.jpg"
    ],
    "stock_quantity": 30,
    "low_stock_threshold": 4,
    "gst_rate": 18,
    "status": "active",
    "description": "Pure steam distilled Ceylon cinnamon bark oil. Deeply warm, spicy-sweet profile with high cinnamaldehyde content for premium fragrances and confectionery.",
    "specs": {
      "Botanical Name": "Cinnamomum verum",
      "Extraction Method": "Steam Distillation",
      "Origin": "South India",
      "Aroma Profile": "Rich warm spicy, woody, sweet balsamic",
      "Purity": "100% Pure Bark Distillate"
    },
    "id": "prod-ref-6",
    "created_at": "2026-09-20T07:40:00.162Z"
  },
  {
    "name": "Rose Concrete",
    "slug": "rose-concrete",
    "tagline": "Classic. Elegant. Rare.",
    "sku": "CON-001",
    "price": 2850,
    "original_price": 3200,
    "rating": 5,
    "reviews_count": 41,
    "category_id": 4,
    "image_url": "/images/products/rose-concrete.jpg",
    "images": [
      "/images/products/rose-concrete.jpg"
    ],
    "stock_quantity": 25,
    "low_stock_threshold": 3,
    "gst_rate": 18,
    "status": "active",
    "description": "Solvent-extracted fresh Damask rose blossoms. A rich waxy concrete preserving the complete true floral bouquet of fresh roses for luxury perfumes and creams.",
    "specs": {
      "Botanical Name": "Rosa damascena",
      "Extraction Method": "Solvent Extraction",
      "Origin": "Hasayan, Uttar Pradesh, India",
      "Aroma Profile": "Opulent deep rose, honeyed, green velvety",
      "Purity": "100% Pure Floral Concrete"
    },
    "id": "prod-ref-7",
    "created_at": "2026-09-20T07:39:59.162Z"
  },
  {
    "name": "Green Cardamom Powder",
    "slug": "green-cardamom-powder",
    "tagline": "Pure. Aromatic. Authentic.",
    "sku": "POW-001",
    "price": 1120,
    "rating": 5,
    "reviews_count": 52,
    "category_id": 6,
    "image_url": "/images/products/green-cardamom.jpg",
    "images": [
      "/images/products/green-cardamom.jpg"
    ],
    "stock_quantity": 90,
    "low_stock_threshold": 10,
    "gst_rate": 18,
    "status": "active",
    "description": "Micro-pulverized whole green cardamom pods from the Western Ghats. Intense camphoraceous, sweet spice flavor sterilized for export-grade culinary and beverage applications.",
    "specs": {
      "Botanical Name": "Elettaria cardamomum",
      "Extraction Method": "Cryogenic Micro-Milling",
      "Origin": "Idukki, Kerala, India",
      "Aroma Profile": "Eucalyptus sweet, warm spicy, pungent",
      "Purity": "100% Pure Sterilized Powder"
    },
    "id": "prod-ref-8",
    "created_at": "2026-09-20T07:39:58.162Z"
  },
  {
    "name": "Cardamom Oil (Pure Steam Distilled)",
    "slug": "cardamom-oil-pure-steam-distilled",
    "sku": "ESS-001",
    "price": 1850,
    "original_price": 2100,
    "rating": 5,
    "reviews_count": 142,
    "badge": "Bestseller",
    "category_id": 1,
    "image_url": "/images/botanical-hero.jpg",
    "images": [
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
    ],
    "stock_quantity": 45,
    "low_stock_threshold": 5,
    "gst_rate": 18,
    "status": "active",
    "description": "Extracted from premium Malabar green cardamom pods, our Cardamom Oil offers warm, spicy-sweet notes used in high-end fragrances, flavor houses, and pharmaceutical formulations worldwide.",
    "specs": {
      "Botanical Name": "Elettaria cardamomum",
      "Extraction Method": "Steam Distillation",
      "Origin": "Western Ghats, India",
      "Aroma Profile": "Warm, spicy, balsamic sweet",
      "Purity": "100% Pure & Undiluted"
    },
    "id": "prod-featured-1",
    "created_at": "2026-09-18T10:23:11.299Z"
  },
  {
    "name": "Ginger Oil (Fresh Rhizome)",
    "slug": "ginger-oil-fresh-rhizome",
    "sku": "SPI-001",
    "price": 1250,
    "rating": 5,
    "reviews_count": 84,
    "badge": "New Batch",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
    ],
    "stock_quantity": 35,
    "low_stock_threshold": 5,
    "gst_rate": 18,
    "status": "active",
    "description": "Steam-distilled from freshly harvested ginger rhizomes. Delivers crisp, warm citrus-spicy notes for food, beverages, and aromatherapy.",
    "specs": {
      "Botanical Name": "Zingiber officinale",
      "Extraction Method": "Steam Distillation",
      "Origin": "Kerala, India",
      "Aroma Profile": "Warm, fresh spicy, citrus zesty",
      "Purity": "100% Pure & Undiluted"
    },
    "id": "prod-featured-2",
    "created_at": "2026-09-18T09:23:11.299Z"
  },
  {
    "name": "Black Pepper Oleoresin 40/20",
    "slug": "black-pepper-oleoresin-40-20",
    "sku": "OLE-001",
    "price": 1450,
    "rating": 5,
    "reviews_count": 98,
    "badge": "Export Quality",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"
    ],
    "stock_quantity": 60,
    "low_stock_threshold": 5,
    "gst_rate": 18,
    "status": "active",
    "description": "Supercritical fluid extracted black pepper oleoresin containing high piperine content, ideal for seasoning blends, meat processing, and savory flavorings.",
    "specs": {
      "Botanical Name": "Piper nigrum",
      "Extraction Method": "Supercritical CO2",
      "Origin": "Malabar Coast, India",
      "Aroma Profile": "Sharp pungent heat, dry peppery",
      "Purity": "Standardized 40% Piperine / 20% Volatile"
    },
    "id": "prod-featured-3",
    "created_at": "2026-09-18T08:23:11.299Z"
  },
  {
    "name": "Jasmine Grandiflorum Concrete",
    "slug": "jasmine-grandiflorum-concrete",
    "sku": "FLO-001",
    "price": 3200,
    "original_price": 3800,
    "rating": 5,
    "reviews_count": 215,
    "discount": "-15%",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
    ],
    "stock_quantity": 12,
    "low_stock_threshold": 3,
    "gst_rate": 18,
    "status": "active",
    "description": "Hand-picked fresh night-blooming jasmine flowers processed immediately to yield a deeply floral, rich wax concrete essential for luxury perfumes.",
    "specs": {
      "Botanical Name": "Jasminum grandiflorum",
      "Extraction Method": "Solvent Extraction",
      "Origin": "Madurai, India",
      "Aroma Profile": "Rich velvety sweet jasmine, waxy floral",
      "Purity": "100% Pure Floral Concrete"
    },
    "id": "prod-featured-4",
    "created_at": "2026-09-18T07:23:11.299Z"
  },
  {
    "name": "Tuberose Floral Absolute",
    "slug": "tuberose-floral-absolute",
    "sku": "ABS-001",
    "price": 4500,
    "rating": 5,
    "reviews_count": 176,
    "badge": "Bestseller",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop"
    ],
    "stock_quantity": 8,
    "low_stock_threshold": 2,
    "gst_rate": 18,
    "status": "active",
    "description": "Extremely precious floral absolute with rich, creamy white-floral intoxication. Highly prized in elite international perfumery.",
    "specs": {
      "Botanical Name": "Polianthes tuberosa",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Origin": "Tamil Nadu, India",
      "Aroma Profile": "Narcotic floral, honeyed undertones, creamy",
      "Purity": "100% Pure Perfumery Absolute"
    },
    "id": "prod-featured-5",
    "created_at": "2026-09-18T06:23:11.299Z"
  },
  {
    "name": "Sterilized Turmeric Powder 5% Curcumin",
    "slug": "sterilized-turmeric-powder-5-curcumin",
    "sku": "POW-001",
    "price": 650,
    "original_price": 800,
    "rating": 5,
    "reviews_count": 312,
    "badge": "Bestseller",
    "category_id": 6,
    "image_url": "/images/spice-powders.jpg",
    "images": [
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop"
    ],
    "stock_quantity": 100,
    "low_stock_threshold": 10,
    "gst_rate": 18,
    "status": "active",
    "description": "Steam sterilized ground turmeric powder guaranteed high curcumin content. Free of synthetic colors and pathogens.",
    "specs": {
      "Botanical Name": "Curcuma longa",
      "Extraction Method": "Steam Sterilized & Micro Milled",
      "Origin": "Erode, Tamil Nadu",
      "Aroma Profile": "Earthy, warm, characteristic curcuma",
      "Purity": "Min 5.0% Curcuminoids Guaranteed"
    },
    "id": "prod-featured-6",
    "created_at": "2026-09-18T05:23:11.299Z"
  },
  {
    "id": "prod-1-2",
    "name": "Bulgarian Lavender Essential Oil",
    "slug": "bulgarian-lavender-essential-oil",
    "description": "Meticulously prepared Bulgarian Lavender Essential Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1450,
    "original_price": 1667,
    "rating": 4.6,
    "reviews_count": 28,
    "badge": "Export Grade",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 12,
    "low_stock_threshold": 5,
    "sku": "ESS-002",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Lavandula angustifolia",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Floral, herbaceous, calming",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T15:23:11.299Z"
  },
  {
    "id": "prod-1-3",
    "name": "Australian Tea Tree Essential Oil",
    "slug": "australian-tea-tree-essential-oil",
    "description": "Meticulously prepared Australian Tea Tree Essential Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 980,
    "rating": 4.9,
    "reviews_count": 41,
    "badge": "Pure Therapeutic",
    "gst_rate": 18,
    "stock_quantity": 19,
    "low_stock_threshold": 5,
    "sku": "ESS-003",
    "category_id": 1,
    "image_url": "/images/botanical-hero.jpg",
    "images": [
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Melaleuca alternifolia",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Crisp, medicinal, fresh",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T13:23:11.299Z"
  },
  {
    "id": "prod-1-4",
    "name": "Peppermint Arvensis Pure Oil",
    "slug": "peppermint-arvensis-pure-oil",
    "description": "Meticulously prepared Peppermint Arvensis Pure Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 820,
    "rating": 4.7,
    "reviews_count": 54,
    "badge": "High Menthol",
    "gst_rate": 18,
    "stock_quantity": 26,
    "low_stock_threshold": 5,
    "sku": "ESS-004",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Mentha arvensis",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Cool, minty, invigorating",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T11:23:11.299Z"
  },
  {
    "id": "prod-1-5",
    "name": "Blue Eucalyptus Globulus 80/85",
    "slug": "blue-eucalyptus-globulus-80-85",
    "description": "Meticulously prepared Blue Eucalyptus Globulus 80/85 from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 750,
    "rating": 5,
    "reviews_count": 67,
    "badge": "Pharma Grade",
    "gst_rate": 18,
    "stock_quantity": 33,
    "low_stock_threshold": 5,
    "sku": "ESS-005",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Eucalyptus globulus",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Fresh, camphoraceous",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T09:23:11.300Z"
  },
  {
    "id": "prod-1-6",
    "name": "French Rosemary Verbenone Oil",
    "slug": "french-rosemary-verbenone-oil",
    "description": "Meticulously prepared French Rosemary Verbenone Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1150,
    "rating": 4.8,
    "reviews_count": 80,
    "badge": "Aromatherapy",
    "gst_rate": 18,
    "stock_quantity": 40,
    "low_stock_threshold": 5,
    "sku": "ESS-006",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Rosmarinus officinalis",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Clean, herbaceous, woody",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T07:23:11.300Z"
  },
  {
    "id": "prod-1-7",
    "name": "Italian Bergamot Calabrian Oil",
    "slug": "italian-bergamot-calabrian-oil",
    "description": "Meticulously prepared Italian Bergamot Calabrian Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1650,
    "original_price": 1897,
    "rating": 4.6,
    "reviews_count": 93,
    "badge": "Bergapten Free",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 47,
    "low_stock_threshold": 5,
    "sku": "ESS-007",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Citrus bergamia",
      "Extraction Method": "Cold Pressed",
      "Aroma Profile": "Bright citrus, spicy floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T05:23:11.300Z"
  },
  {
    "id": "prod-1-8",
    "name": "Spanish Sweet Orange Cold-Pressed",
    "slug": "spanish-sweet-orange-cold-pressed",
    "description": "Meticulously prepared Spanish Sweet Orange Cold-Pressed from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 680,
    "rating": 4.9,
    "reviews_count": 106,
    "badge": "100% Pure",
    "gst_rate": 18,
    "stock_quantity": 54,
    "low_stock_threshold": 5,
    "sku": "ESS-008",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Citrus sinensis",
      "Extraction Method": "Cold Pressed",
      "Aroma Profile": "Sweet, radiant, citrusy",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T03:23:11.300Z"
  },
  {
    "id": "prod-1-9",
    "name": "Lemongrass Cochin Pure Oil",
    "slug": "lemongrass-cochin-pure-oil",
    "description": "Meticulously prepared Lemongrass Cochin Pure Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 720,
    "rating": 4.7,
    "reviews_count": 119,
    "badge": "High Citral",
    "gst_rate": 18,
    "stock_quantity": 61,
    "low_stock_threshold": 5,
    "sku": "ESS-009",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cymbopogon flexuosus",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Lemony, earthy, sharp",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T01:23:11.300Z"
  },
  {
    "id": "prod-1-10",
    "name": "Madagascar Clove Bud Distillate",
    "slug": "madagascar-clove-bud-distillate",
    "description": "Meticulously prepared Madagascar Clove Bud Distillate from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1280,
    "rating": 5,
    "reviews_count": 132,
    "badge": "High Eugenol",
    "gst_rate": 18,
    "stock_quantity": 13,
    "low_stock_threshold": 5,
    "sku": "ESS-010",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Syzygium aromaticum",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Warm, spicy, pungent",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T23:23:11.300Z"
  },
  {
    "id": "prod-1-11",
    "name": "Frankincense Serrata Sacred Oil",
    "slug": "frankincense-serrata-sacred-oil",
    "description": "Meticulously prepared Frankincense Serrata Sacred Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 2100,
    "rating": 4.8,
    "reviews_count": 145,
    "badge": "Wild Harvested",
    "gst_rate": 18,
    "stock_quantity": 20,
    "low_stock_threshold": 5,
    "sku": "ESS-011",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Boswellia serrata",
      "Extraction Method": "Hydro Distilled",
      "Aroma Profile": "Resinous, woody, meditative",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T21:23:11.300Z"
  },
  {
    "id": "prod-1-12",
    "name": "Atlas Cedarwood Virginiana Oil",
    "slug": "atlas-cedarwood-virginiana-oil",
    "description": "Meticulously prepared Atlas Cedarwood Virginiana Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 890,
    "original_price": 1023,
    "rating": 4.6,
    "reviews_count": 158,
    "badge": "Aged Wood",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 27,
    "low_stock_threshold": 5,
    "sku": "ESS-012",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cedrus atlantica",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Deep, woody, rich balsamic",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T19:23:11.300Z"
  },
  {
    "id": "prod-1-13",
    "name": "Geranium Bourbon Floral Oil",
    "slug": "geranium-bourbon-floral-oil",
    "description": "Meticulously prepared Geranium Bourbon Floral Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1750,
    "rating": 4.9,
    "reviews_count": 171,
    "badge": "Perfumery Grade",
    "gst_rate": 18,
    "stock_quantity": 34,
    "low_stock_threshold": 5,
    "sku": "ESS-013",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Pelargonium graveolens",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Rosy, sweet, uplifting",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T17:23:11.300Z"
  },
  {
    "id": "prod-1-14",
    "name": "Vetiver Bourbon Roots Oil",
    "slug": "vetiver-bourbon-roots-oil",
    "description": "Meticulously prepared Vetiver Bourbon Roots Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 2250,
    "rating": 4.7,
    "reviews_count": 184,
    "badge": "Aged Vintage",
    "gst_rate": 18,
    "stock_quantity": 41,
    "low_stock_threshold": 5,
    "sku": "ESS-014",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Chrysopogon zizanioides",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Deep, earthy, smoky wood",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T15:23:11.300Z"
  },
  {
    "id": "prod-1-15",
    "name": "Ylang Ylang Extra First Press",
    "slug": "ylang-ylang-extra-first-press",
    "description": "Meticulously prepared Ylang Ylang Extra First Press from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1950,
    "rating": 5,
    "reviews_count": 197,
    "badge": "Fine Fragrance",
    "gst_rate": 18,
    "stock_quantity": 48,
    "low_stock_threshold": 5,
    "sku": "ESS-015",
    "category_id": 1,
    "image_url": "/images/spice-powders.jpg",
    "images": [
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cananga odorata",
      "Extraction Method": "Fractional Distillation",
      "Aroma Profile": "Intense, exotic, floral sweet",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T13:23:11.300Z"
  },
  {
    "id": "prod-1-16",
    "name": "Sweet Basil Linalool Grade Oil",
    "slug": "sweet-basil-linalool-grade-oil",
    "description": "Meticulously prepared Sweet Basil Linalool Grade Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 920,
    "rating": 4.8,
    "reviews_count": 210,
    "badge": "Organic",
    "gst_rate": 18,
    "stock_quantity": 55,
    "low_stock_threshold": 5,
    "sku": "ESS-016",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Ocimum basilicum",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Sweet, herbal, spicy anise",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T11:23:11.300Z"
  },
  {
    "id": "prod-1-17",
    "name": "French Clary Sage Pure Oil",
    "slug": "french-clary-sage-pure-oil",
    "description": "Meticulously prepared French Clary Sage Pure Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1580,
    "original_price": 1817,
    "rating": 4.6,
    "reviews_count": 223,
    "badge": "Therapeutic",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 62,
    "low_stock_threshold": 5,
    "sku": "ESS-017",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Salvia sclarea",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Earthy, sweet, herbaceous",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T09:23:11.300Z"
  },
  {
    "id": "prod-1-18",
    "name": "Patchouli Dark Aged Botanical Oil",
    "slug": "patchouli-dark-aged-botanical-oil",
    "description": "Meticulously prepared Patchouli Dark Aged Botanical Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1850,
    "rating": 4.9,
    "reviews_count": 236,
    "badge": "Triple Distilled",
    "gst_rate": 18,
    "stock_quantity": 14,
    "low_stock_threshold": 5,
    "sku": "ESS-018",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Pogostemon cablin",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Rich, earthy, musky sweet",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T07:23:11.300Z"
  },
  {
    "id": "prod-1-19",
    "name": "Roman Chamomile Fine Distillate",
    "slug": "roman-chamomile-fine-distillate",
    "description": "Meticulously prepared Roman Chamomile Fine Distillate from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 2400,
    "rating": 4.7,
    "reviews_count": 29,
    "badge": "Rare Batch",
    "gst_rate": 18,
    "stock_quantity": 21,
    "low_stock_threshold": 5,
    "sku": "ESS-019",
    "category_id": 1,
    "image_url": "/images/botanical-hero.jpg",
    "images": [
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Anthemis nobilis",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Sweet, apple-like, soothing",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T05:23:11.300Z"
  },
  {
    "id": "prod-1-20",
    "name": "Evergreen Italian Cypress Oil",
    "slug": "evergreen-italian-cypress-oil",
    "description": "Meticulously prepared Evergreen Italian Cypress Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1050,
    "rating": 5,
    "reviews_count": 42,
    "badge": "Pure Botanical",
    "gst_rate": 18,
    "stock_quantity": 28,
    "low_stock_threshold": 5,
    "sku": "ESS-020",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cupressus sempervirens",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Fresh, woody, evergreen",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T03:23:11.300Z"
  },
  {
    "id": "prod-1-21",
    "name": "Wild Juniper Berry Alpine Oil",
    "slug": "wild-juniper-berry-alpine-oil",
    "description": "Meticulously prepared Wild Juniper Berry Alpine Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1420,
    "rating": 4.8,
    "reviews_count": 55,
    "badge": "Wild Forest",
    "gst_rate": 18,
    "stock_quantity": 35,
    "low_stock_threshold": 5,
    "sku": "ESS-021",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Juniperus communis",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Crisp, piney, peppered wood",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T01:23:11.300Z"
  },
  {
    "id": "prod-1-22",
    "name": "Palmarosa Motia Pure Extract",
    "slug": "palmarosa-motia-pure-extract",
    "description": "Meticulously prepared Palmarosa Motia Pure Extract from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 880,
    "original_price": 1012,
    "rating": 4.6,
    "reviews_count": 68,
    "badge": "High Geraniol",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 42,
    "low_stock_threshold": 5,
    "sku": "ESS-022",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cymbopogon martinii",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Rose-like, grassy, sweet",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T23:23:11.300Z"
  },
  {
    "id": "prod-1-23",
    "name": "Red Thyme Thymol Active Oil",
    "slug": "red-thyme-thymol-active-oil",
    "description": "Meticulously prepared Red Thyme Thymol Active Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1120,
    "rating": 4.9,
    "reviews_count": 81,
    "badge": "Potent Bioactive",
    "gst_rate": 18,
    "stock_quantity": 49,
    "low_stock_threshold": 5,
    "sku": "ESS-023",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Thymus vulgaris",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Intense, medicinal, warm herb",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T21:23:11.300Z"
  },
  {
    "id": "prod-1-24",
    "name": "Somalian Myrrh Resin Distillate",
    "slug": "somalian-myrrh-resin-distillate",
    "description": "Meticulously prepared Somalian Myrrh Resin Distillate from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 2150,
    "rating": 4.7,
    "reviews_count": 94,
    "badge": "Sacred Grade",
    "gst_rate": 18,
    "stock_quantity": 56,
    "low_stock_threshold": 5,
    "sku": "ESS-024",
    "category_id": 1,
    "image_url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Commiphora myrrha",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Warm balsamic, smoky, bitter-sweet",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T19:23:11.300Z"
  },
  {
    "id": "prod-2-2",
    "name": "Malabar Black Pepper Steam Distilled",
    "slug": "malabar-black-pepper-steam-distilled",
    "description": "Meticulously prepared Malabar Black Pepper Steam Distilled from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1650,
    "original_price": 1897,
    "rating": 4.6,
    "reviews_count": 28,
    "badge": "Bestseller",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 12,
    "low_stock_threshold": 5,
    "sku": "SPI-002",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Piper nigrum",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Dry, spicy, woody warm",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T15:23:11.300Z"
  },
  {
    "id": "prod-2-3",
    "name": "Ceylon Cinnamon Bark Grade 1",
    "slug": "ceylon-cinnamon-bark-grade-1",
    "description": "Meticulously prepared Ceylon Cinnamon Bark Grade 1 from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 2350,
    "rating": 4.9,
    "reviews_count": 41,
    "badge": "True Cinnamon",
    "gst_rate": 18,
    "stock_quantity": 19,
    "low_stock_threshold": 5,
    "sku": "SPI-003",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cinnamomum verum",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Rich, warm spicy, sweet",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T13:23:11.300Z"
  },
  {
    "id": "prod-2-4",
    "name": "Myristica Nutmeg Kernel Oil",
    "slug": "myristica-nutmeg-kernel-oil",
    "description": "Meticulously prepared Myristica Nutmeg Kernel Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1520,
    "rating": 4.7,
    "reviews_count": 54,
    "badge": "Export Grade",
    "gst_rate": 18,
    "stock_quantity": 26,
    "low_stock_threshold": 5,
    "sku": "SPI-004",
    "category_id": 2,
    "image_url": "/images/spice-powders.jpg",
    "images": [
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Myristica fragrans",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Nutty, spicy, warm balsamic",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T11:23:11.300Z"
  },
  {
    "id": "prod-2-5",
    "name": "Golden Mace Blade Steam Distillate",
    "slug": "golden-mace-blade-steam-distillate",
    "description": "Meticulously prepared Golden Mace Blade Steam Distillate from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1880,
    "rating": 5,
    "reviews_count": 67,
    "badge": "Rare Extract",
    "gst_rate": 18,
    "stock_quantity": 33,
    "low_stock_threshold": 5,
    "sku": "SPI-005",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Myristica fragrans",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Refined spicy, elegant, warm",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T09:23:11.300Z"
  },
  {
    "id": "prod-2-6",
    "name": "Rajasthan Cumin Seed Pure Oil",
    "slug": "rajasthan-cumin-seed-pure-oil",
    "description": "Meticulously prepared Rajasthan Cumin Seed Pure Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1420,
    "rating": 4.8,
    "reviews_count": 80,
    "badge": "Pure Spice",
    "gst_rate": 18,
    "stock_quantity": 40,
    "low_stock_threshold": 5,
    "sku": "SPI-006",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cuminum cyminum",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Warm, earthy, pungent",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T07:23:11.300Z"
  },
  {
    "id": "prod-2-7",
    "name": "Green Coriander Seed Essential Oil",
    "slug": "green-coriander-seed-essential-oil",
    "description": "Meticulously prepared Green Coriander Seed Essential Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1150,
    "original_price": 1323,
    "rating": 4.6,
    "reviews_count": 93,
    "badge": "High Linalool",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 47,
    "low_stock_threshold": 5,
    "sku": "SPI-007",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Coriandrum sativum",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Sweet, woody, spicy citrus",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T05:23:11.300Z"
  },
  {
    "id": "prod-2-8",
    "name": "Sweet Fennel Seed Anethole Oil",
    "slug": "sweet-fennel-seed-anethole-oil",
    "description": "Meticulously prepared Sweet Fennel Seed Anethole Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 980,
    "rating": 4.9,
    "reviews_count": 106,
    "badge": "Pharma Grade",
    "gst_rate": 18,
    "stock_quantity": 54,
    "low_stock_threshold": 5,
    "sku": "SPI-008",
    "category_id": 2,
    "image_url": "/images/botanical-hero.jpg",
    "images": [
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Foeniculum vulgare",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Anise-like, sweet, licorice",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T03:23:11.300Z"
  },
  {
    "id": "prod-2-9",
    "name": "Star Anise Seed Terpene Oil",
    "slug": "star-anise-seed-terpene-oil",
    "description": "Meticulously prepared Star Anise Seed Terpene Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1250,
    "rating": 4.7,
    "reviews_count": 119,
    "badge": "85% Anethole",
    "gst_rate": 18,
    "stock_quantity": 61,
    "low_stock_threshold": 5,
    "sku": "SPI-009",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Illicium verum",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Sweet licorice, pungent",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T01:23:11.300Z"
  },
  {
    "id": "prod-2-10",
    "name": "Carom Ajwain Thymol Seed Oil",
    "slug": "carom-ajwain-thymol-seed-oil",
    "description": "Meticulously prepared Carom Ajwain Thymol Seed Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1100,
    "rating": 5,
    "reviews_count": 132,
    "badge": "High Bioactive",
    "gst_rate": 18,
    "stock_quantity": 13,
    "low_stock_threshold": 5,
    "sku": "SPI-010",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Trachyspermum ammi",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Thyme-like, hot pungent",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T23:23:11.300Z"
  },
  {
    "id": "prod-2-11",
    "name": "Fenugreek Seed Hydro-Distillate",
    "slug": "fenugreek-seed-hydro-distillate",
    "description": "Meticulously prepared Fenugreek Seed Hydro-Distillate from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1380,
    "rating": 4.8,
    "reviews_count": 145,
    "badge": "Pure Extract",
    "gst_rate": 18,
    "stock_quantity": 20,
    "low_stock_threshold": 5,
    "sku": "SPI-011",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Trigonella foenum-graecum",
      "Extraction Method": "Hydro Distilled",
      "Aroma Profile": "Celery-like, warm maple",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T21:23:11.300Z"
  },
  {
    "id": "prod-2-12",
    "name": "Caraway Seed Pure Carvone Oil",
    "slug": "caraway-seed-pure-carvone-oil",
    "description": "Meticulously prepared Caraway Seed Pure Carvone Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1220,
    "original_price": 1403,
    "rating": 4.6,
    "reviews_count": 158,
    "badge": "Culinary Grade",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 27,
    "low_stock_threshold": 5,
    "sku": "SPI-012",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Carum carvi",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Sweet spicy, rye-like",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T19:23:11.300Z"
  },
  {
    "id": "prod-2-13",
    "name": "Indian Anethum Dill Seed Oil",
    "slug": "indian-anethum-dill-seed-oil",
    "description": "Meticulously prepared Indian Anethum Dill Seed Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 940,
    "rating": 4.9,
    "reviews_count": 171,
    "badge": "Pure Herb",
    "gst_rate": 18,
    "stock_quantity": 34,
    "low_stock_threshold": 5,
    "sku": "SPI-013",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Anethum graveolens",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Herbaceous, warm, slight spicy",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T17:23:11.300Z"
  },
  {
    "id": "prod-2-14",
    "name": "Black Mustard Seed Volatile Oil",
    "slug": "black-mustard-seed-volatile-oil",
    "description": "Meticulously prepared Black Mustard Seed Volatile Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1050,
    "rating": 4.7,
    "reviews_count": 184,
    "badge": "High Allyl",
    "gst_rate": 18,
    "stock_quantity": 41,
    "low_stock_threshold": 5,
    "sku": "SPI-014",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Brassica nigra",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Sharp, pungent, penetrating",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T15:23:11.300Z"
  },
  {
    "id": "prod-2-15",
    "name": "Celery Seed High Phthalide Oil",
    "slug": "celery-seed-high-phthalide-oil",
    "description": "Meticulously prepared Celery Seed High Phthalide Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1480,
    "rating": 5,
    "reviews_count": 197,
    "badge": "Flavor Grade",
    "gst_rate": 18,
    "stock_quantity": 48,
    "low_stock_threshold": 5,
    "sku": "SPI-015",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Apium graveolens",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Warm, herbal, celery soup",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T13:23:11.300Z"
  },
  {
    "id": "prod-2-16",
    "name": "Asafoetida Gum Purified Oil",
    "slug": "asafoetida-gum-purified-oil",
    "description": "Meticulously prepared Asafoetida Gum Purified Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 2450,
    "rating": 4.8,
    "reviews_count": 210,
    "badge": "Ultra Concentrated",
    "gst_rate": 18,
    "stock_quantity": 55,
    "low_stock_threshold": 5,
    "sku": "SPI-016",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Ferula assa-foetida",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Sulfurous, garlicky pungent",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T11:23:11.300Z"
  },
  {
    "id": "prod-2-17",
    "name": "Tejpat Indian Bay Leaf Oil",
    "slug": "tejpat-indian-bay-leaf-oil",
    "description": "Meticulously prepared Tejpat Indian Bay Leaf Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1120,
    "original_price": 1288,
    "rating": 4.6,
    "reviews_count": 223,
    "badge": "Wild Harvest",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 62,
    "low_stock_threshold": 5,
    "sku": "SPI-017",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cinnamomum tamala",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Cinnamon-clove, sweet leaf",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T09:23:11.300Z"
  },
  {
    "id": "prod-2-18",
    "name": "Alleppey Green Cardamom Pod Oil",
    "slug": "alleppey-green-cardamom-pod-oil",
    "description": "Meticulously prepared Alleppey Green Cardamom Pod Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 2100,
    "rating": 4.9,
    "reviews_count": 236,
    "badge": "Gold Standard",
    "gst_rate": 18,
    "stock_quantity": 14,
    "low_stock_threshold": 5,
    "sku": "SPI-018",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Elettaria cardamomum",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Sweet spicy, eucalyptus note",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T07:23:11.300Z"
  },
  {
    "id": "prod-2-19",
    "name": "Pimento Allspice Berry Oil",
    "slug": "pimento-allspice-berry-oil",
    "description": "Meticulously prepared Pimento Allspice Berry Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1750,
    "rating": 4.7,
    "reviews_count": 29,
    "badge": "Authentic",
    "gst_rate": 18,
    "stock_quantity": 21,
    "low_stock_threshold": 5,
    "sku": "SPI-019",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Pimenta dioica",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Clove, cinnamon, nutmeg blend",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T05:23:11.300Z"
  },
  {
    "id": "prod-2-20",
    "name": "Decorticated White Pepper Oil",
    "slug": "decorticated-white-pepper-oil",
    "description": "Meticulously prepared Decorticated White Pepper Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1820,
    "rating": 5,
    "reviews_count": 42,
    "badge": "Export Grade",
    "gst_rate": 18,
    "stock_quantity": 28,
    "low_stock_threshold": 5,
    "sku": "SPI-020",
    "category_id": 2,
    "image_url": "/images/spice-powders.jpg",
    "images": [
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Piper nigrum",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Sharp, peppery, fermented warmth",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T03:23:11.300Z"
  },
  {
    "id": "prod-2-21",
    "name": "Curcuma Turmeric Rhizome Oil",
    "slug": "curcuma-turmeric-rhizome-oil",
    "description": "Meticulously prepared Curcuma Turmeric Rhizome Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1350,
    "rating": 4.8,
    "reviews_count": 55,
    "badge": "High Turmerone",
    "gst_rate": 18,
    "stock_quantity": 35,
    "low_stock_threshold": 5,
    "sku": "SPI-021",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Curcuma longa",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Woody, spicy, earthy root",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T01:23:11.300Z"
  },
  {
    "id": "prod-2-22",
    "name": "Zanzibar Clove Stem Distillate",
    "slug": "zanzibar-clove-stem-distillate",
    "description": "Meticulously prepared Zanzibar Clove Stem Distillate from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1180,
    "original_price": 1357,
    "rating": 4.6,
    "reviews_count": 68,
    "badge": "Industrial Grade",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 42,
    "low_stock_threshold": 5,
    "sku": "SPI-022",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Syzygium aromaticum",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Deep clove, spicy, woody",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T23:23:11.300Z"
  },
  {
    "id": "prod-2-23",
    "name": "Fresh Murraya Curry Leaf Oil",
    "slug": "fresh-murraya-curry-leaf-oil",
    "description": "Meticulously prepared Fresh Murraya Curry Leaf Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1550,
    "rating": 4.9,
    "reviews_count": 81,
    "badge": "Rare Botanical",
    "gst_rate": 18,
    "stock_quantity": 49,
    "low_stock_threshold": 5,
    "sku": "SPI-023",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Murraya koenigii",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Curry spice, herbal, sulfurous",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T21:23:11.300Z"
  },
  {
    "id": "prod-2-24",
    "name": "Long Pepper Pippali Superfine",
    "slug": "long-pepper-pippali-superfine",
    "description": "Meticulously prepared Long Pepper Pippali Superfine from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1950,
    "rating": 4.7,
    "reviews_count": 94,
    "badge": "Ayurvedic Grade",
    "gst_rate": 18,
    "stock_quantity": 56,
    "low_stock_threshold": 5,
    "sku": "SPI-024",
    "category_id": 2,
    "image_url": "/images/botanical-hero.jpg",
    "images": [
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Piper retrofractum",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Sweet, pungent, complex pepper",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T19:23:11.300Z"
  },
  {
    "id": "prod-2-25",
    "name": "Cassia Cinnamomum Bark Oil",
    "slug": "cassia-cinnamomum-bark-oil",
    "description": "Meticulously prepared Cassia Cinnamomum Bark Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1400,
    "rating": 5,
    "reviews_count": 107,
    "badge": "High Cinnamaldehyde",
    "gst_rate": 18,
    "stock_quantity": 63,
    "low_stock_threshold": 5,
    "sku": "SPI-025",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cinnamomum cassia",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Strong, warm spicy, sweet",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T17:23:11.300Z"
  },
  {
    "id": "prod-2-26",
    "name": "Indonesian Cubeb Tail Pepper Oil",
    "slug": "indonesian-cubeb-tail-pepper-oil",
    "description": "Meticulously prepared Indonesian Cubeb Tail Pepper Oil from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1680,
    "rating": 4.8,
    "reviews_count": 120,
    "badge": "Fine Distillate",
    "gst_rate": 18,
    "stock_quantity": 15,
    "low_stock_threshold": 5,
    "sku": "SPI-026",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Piper cubeba",
      "Extraction Method": "Steam Distilled",
      "Aroma Profile": "Camphoraceous, peppery, clean",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T15:23:11.300Z"
  },
  {
    "id": "prod-2-27",
    "name": "Kashmiri Saffron Infused Extract",
    "slug": "kashmiri-saffron-infused-extract",
    "description": "Meticulously prepared Kashmiri Saffron Infused Extract from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 2480,
    "original_price": 2852,
    "rating": 4.6,
    "reviews_count": 133,
    "badge": "Precious Batch",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 22,
    "low_stock_threshold": 5,
    "sku": "SPI-027",
    "category_id": 2,
    "image_url": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Crocus sativus",
      "Extraction Method": "Supercritical CO2",
      "Aroma Profile": "Floral honey, hay-like, golden",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T13:23:11.300Z"
  },
  {
    "id": "prod-3-2",
    "name": "Capsicum Oleoresin 1 Million SHU",
    "slug": "capsicum-oleoresin-1-million-shu",
    "description": "Meticulously prepared Capsicum Oleoresin 1 Million SHU from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1750,
    "original_price": 2012,
    "rating": 4.6,
    "reviews_count": 28,
    "badge": "Standardized",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 12,
    "low_stock_threshold": 5,
    "sku": "OLE-002",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Capsicum annuum",
      "Extraction Method": "Solvent Extracted",
      "Aroma Profile": "Intensely pungent, fiery heat",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T15:23:11.300Z"
  },
  {
    "id": "prod-3-3",
    "name": "Paprika Oleoresin 100,000 CU",
    "slug": "paprika-oleoresin-100-000-cu",
    "description": "Meticulously prepared Paprika Oleoresin 100,000 CU from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1250,
    "rating": 4.9,
    "reviews_count": 41,
    "badge": "Natural Colorant",
    "gst_rate": 18,
    "stock_quantity": 19,
    "low_stock_threshold": 5,
    "sku": "OLE-003",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Capsicum annuum",
      "Extraction Method": "Solvent Extracted",
      "Aroma Profile": "Sweet red pepper, mild warm",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T13:23:11.300Z"
  },
  {
    "id": "prod-3-4",
    "name": "Ginger Supercritical CO2 Oleoresin",
    "slug": "ginger-supercritical-co2-oleoresin",
    "description": "Meticulously prepared Ginger Supercritical CO2 Oleoresin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1850,
    "rating": 4.7,
    "reviews_count": 54,
    "badge": "Solvent Free",
    "gst_rate": 18,
    "stock_quantity": 26,
    "low_stock_threshold": 5,
    "sku": "OLE-004",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Zingiber officinale",
      "Extraction Method": "Supercritical CO2",
      "Aroma Profile": "Sharp, pungent ginger zesty",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T11:23:11.300Z"
  },
  {
    "id": "prod-3-5",
    "name": "Green Cardamom Flavor Oleoresin",
    "slug": "green-cardamom-flavor-oleoresin",
    "description": "Meticulously prepared Green Cardamom Flavor Oleoresin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 2400,
    "rating": 5,
    "reviews_count": 67,
    "badge": "High Volatile",
    "gst_rate": 18,
    "stock_quantity": 33,
    "low_stock_threshold": 5,
    "sku": "OLE-005",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Elettaria cardamomum",
      "Extraction Method": "Supercritical CO2",
      "Aroma Profile": "Sweet spicy, fresh crushed pod",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T09:23:11.300Z"
  },
  {
    "id": "prod-3-6",
    "name": "Turmeric 95% Curcuminoid Resin",
    "slug": "turmeric-95-curcuminoid-resin",
    "description": "Meticulously prepared Turmeric 95% Curcuminoid Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1650,
    "rating": 4.8,
    "reviews_count": 80,
    "badge": "Pharma Grade",
    "gst_rate": 18,
    "stock_quantity": 40,
    "low_stock_threshold": 5,
    "sku": "OLE-006",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Curcuma longa",
      "Extraction Method": "Ethanol Extraction",
      "Aroma Profile": "Rich earthy, bitter tonic",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T07:23:11.300Z"
  },
  {
    "id": "prod-3-7",
    "name": "Clove Bud 85% Eugenol Oleoresin",
    "slug": "clove-bud-85-eugenol-oleoresin",
    "description": "Meticulously prepared Clove Bud 85% Eugenol Oleoresin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1920,
    "original_price": 2208,
    "rating": 4.6,
    "reviews_count": 93,
    "badge": "Export Batch",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 47,
    "low_stock_threshold": 5,
    "sku": "OLE-007",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Syzygium aromaticum",
      "Extraction Method": "Solvent Extracted",
      "Aroma Profile": "Strong clove, numbing spice",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T05:23:11.300Z"
  },
  {
    "id": "prod-3-8",
    "name": "Nutmeg Volatile High-Yield Resin",
    "slug": "nutmeg-volatile-high-yield-resin",
    "description": "Meticulously prepared Nutmeg Volatile High-Yield Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1580,
    "rating": 4.9,
    "reviews_count": 106,
    "badge": "Flavor House",
    "gst_rate": 18,
    "stock_quantity": 54,
    "low_stock_threshold": 5,
    "sku": "OLE-008",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Myristica fragrans",
      "Extraction Method": "Solvent Extracted",
      "Aroma Profile": "Warm nutmeg, sweet woody",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T03:23:11.300Z"
  },
  {
    "id": "prod-3-9",
    "name": "Celery Seed Aromatic Food Resin",
    "slug": "celery-seed-aromatic-food-resin",
    "description": "Meticulously prepared Celery Seed Aromatic Food Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1450,
    "rating": 4.7,
    "reviews_count": 119,
    "badge": "Savory Blends",
    "gst_rate": 18,
    "stock_quantity": 61,
    "low_stock_threshold": 5,
    "sku": "OLE-009",
    "category_id": 3,
    "image_url": "/images/spice-powders.jpg",
    "images": [
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Apium graveolens",
      "Extraction Method": "Solvent Extracted",
      "Aroma Profile": "Concentrated celery, herbal",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T01:23:11.300Z"
  },
  {
    "id": "prod-3-10",
    "name": "Coriander Seed Rich Culinary Resin",
    "slug": "coriander-seed-rich-culinary-resin",
    "description": "Meticulously prepared Coriander Seed Rich Culinary Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1320,
    "rating": 5,
    "reviews_count": 132,
    "badge": "Seasoning Grade",
    "gst_rate": 18,
    "stock_quantity": 13,
    "low_stock_threshold": 5,
    "sku": "OLE-010",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Coriandrum sativum",
      "Extraction Method": "Solvent Extracted",
      "Aroma Profile": "Warm citrus spice, woody",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T23:23:11.300Z"
  },
  {
    "id": "prod-3-11",
    "name": "Cumin High Cuminaldehyde Resin",
    "slug": "cumin-high-cuminaldehyde-resin",
    "description": "Meticulously prepared Cumin High Cuminaldehyde Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1550,
    "rating": 4.8,
    "reviews_count": 145,
    "badge": "Curry Formulations",
    "gst_rate": 18,
    "stock_quantity": 20,
    "low_stock_threshold": 5,
    "sku": "OLE-011",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cuminum cyminum",
      "Extraction Method": "Solvent Extracted",
      "Aroma Profile": "Deep toasted cumin, roasted",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T21:23:11.300Z"
  },
  {
    "id": "prod-3-12",
    "name": "Fennel Sweet Anethole Oleoresin",
    "slug": "fennel-sweet-anethole-oleoresin",
    "description": "Meticulously prepared Fennel Sweet Anethole Oleoresin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1380,
    "original_price": 1587,
    "rating": 4.6,
    "reviews_count": 158,
    "badge": "Pure Flavor",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 27,
    "low_stock_threshold": 5,
    "sku": "OLE-012",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Foeniculum vulgare",
      "Extraction Method": "Solvent Extracted",
      "Aroma Profile": "Sweet licorice anise",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T19:23:11.300Z"
  },
  {
    "id": "prod-3-13",
    "name": "Fenugreek Maple-Note Bio-Resin",
    "slug": "fenugreek-maple-note-bio-resin",
    "description": "Meticulously prepared Fenugreek Maple-Note Bio-Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1480,
    "rating": 4.9,
    "reviews_count": 171,
    "badge": "Sotolon Rich",
    "gst_rate": 18,
    "stock_quantity": 34,
    "low_stock_threshold": 5,
    "sku": "OLE-013",
    "category_id": 3,
    "image_url": "/images/botanical-hero.jpg",
    "images": [
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Trigonella foenum-graecum",
      "Extraction Method": "Solvent Extracted",
      "Aroma Profile": "Roasted maple, savory herbal",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T17:23:11.300Z"
  },
  {
    "id": "prod-3-14",
    "name": "Pure Garlic Concentrated Bio-Resin",
    "slug": "pure-garlic-concentrated-bio-resin",
    "description": "Meticulously prepared Pure Garlic Concentrated Bio-Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1620,
    "rating": 4.7,
    "reviews_count": 184,
    "badge": "Food Processing",
    "gst_rate": 18,
    "stock_quantity": 41,
    "low_stock_threshold": 5,
    "sku": "OLE-014",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Allium sativum",
      "Extraction Method": "Supercritical CO2",
      "Aroma Profile": "Fresh garlic clove punch",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T15:23:11.300Z"
  },
  {
    "id": "prod-3-15",
    "name": "Dehydrated Onion Flavor Oleoresin",
    "slug": "dehydrated-onion-flavor-oleoresin",
    "description": "Meticulously prepared Dehydrated Onion Flavor Oleoresin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1280,
    "rating": 5,
    "reviews_count": 197,
    "badge": "Savory Snack",
    "gst_rate": 18,
    "stock_quantity": 48,
    "low_stock_threshold": 5,
    "sku": "OLE-015",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Allium cepa",
      "Extraction Method": "Solvent Extracted",
      "Aroma Profile": "Caramelized onion, savory",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T13:23:11.300Z"
  },
  {
    "id": "prod-3-16",
    "name": "Cinnamon Bark Cinnamaldehyde Resin",
    "slug": "cinnamon-bark-cinnamaldehyde-resin",
    "description": "Meticulously prepared Cinnamon Bark Cinnamaldehyde Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 2150,
    "rating": 4.8,
    "reviews_count": 210,
    "badge": "Sweet Spice",
    "gst_rate": 18,
    "stock_quantity": 55,
    "low_stock_threshold": 5,
    "sku": "OLE-016",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cinnamomum verum",
      "Extraction Method": "Supercritical CO2",
      "Aroma Profile": "Intense sweet cinnamon",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T11:23:11.300Z"
  },
  {
    "id": "prod-3-17",
    "name": "Chinese Cassia Dark Viscous Resin",
    "slug": "chinese-cassia-dark-viscous-resin",
    "description": "Meticulously prepared Chinese Cassia Dark Viscous Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1420,
    "original_price": 1633,
    "rating": 4.6,
    "reviews_count": 223,
    "badge": "Industrial Seasoning",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 62,
    "low_stock_threshold": 5,
    "sku": "OLE-017",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cinnamomum cassia",
      "Extraction Method": "Solvent Extracted",
      "Aroma Profile": "Heavy spicy, woody bark",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T09:23:11.300Z"
  },
  {
    "id": "prod-3-18",
    "name": "Rosemary Carnosic Acid Antioxidant",
    "slug": "rosemary-carnosic-acid-antioxidant",
    "description": "Meticulously prepared Rosemary Carnosic Acid Antioxidant from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1980,
    "rating": 4.9,
    "reviews_count": 236,
    "badge": "Natural Preservative",
    "gst_rate": 18,
    "stock_quantity": 14,
    "low_stock_threshold": 5,
    "sku": "OLE-018",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Rosmarinus officinalis",
      "Extraction Method": "Supercritical CO2",
      "Aroma Profile": "Clean herbal, woody",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T07:23:11.300Z"
  },
  {
    "id": "prod-3-19",
    "name": "Mustard Allyl Isothiocyanate Resin",
    "slug": "mustard-allyl-isothiocyanate-resin",
    "description": "Meticulously prepared Mustard Allyl Isothiocyanate Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1350,
    "rating": 4.7,
    "reviews_count": 29,
    "badge": "Hot Condiment",
    "gst_rate": 18,
    "stock_quantity": 21,
    "low_stock_threshold": 5,
    "sku": "OLE-019",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Brassica juncea",
      "Extraction Method": "Solvent Extracted",
      "Aroma Profile": "Wasabi-like, nasal pungency",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T05:23:11.300Z"
  },
  {
    "id": "prod-3-20",
    "name": "Golden Mace Blade Superfine Resin",
    "slug": "golden-mace-blade-superfine-resin",
    "description": "Meticulously prepared Golden Mace Blade Superfine Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1890,
    "rating": 5,
    "reviews_count": 42,
    "badge": "Meat Seasoning",
    "gst_rate": 18,
    "stock_quantity": 28,
    "low_stock_threshold": 5,
    "sku": "OLE-020",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Myristica fragrans",
      "Extraction Method": "Solvent Extracted",
      "Aroma Profile": "Delicate warm spice",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T03:23:11.300Z"
  },
  {
    "id": "prod-3-21",
    "name": "White Pepper Piperine Bio-Resin",
    "slug": "white-pepper-piperine-bio-resin",
    "description": "Meticulously prepared White Pepper Piperine Bio-Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1720,
    "rating": 4.8,
    "reviews_count": 55,
    "badge": "Light Sauces",
    "gst_rate": 18,
    "stock_quantity": 35,
    "low_stock_threshold": 5,
    "sku": "OLE-021",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Piper nigrum",
      "Extraction Method": "Supercritical CO2",
      "Aroma Profile": "Clean heat, fermented pepper",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T01:23:11.300Z"
  },
  {
    "id": "prod-3-22",
    "name": "Star Anise Shikimic Acid Resin",
    "slug": "star-anise-shikimic-acid-resin",
    "description": "Meticulously prepared Star Anise Shikimic Acid Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1680,
    "original_price": 1932,
    "rating": 4.6,
    "reviews_count": 68,
    "badge": "Beverage Grade",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 42,
    "low_stock_threshold": 5,
    "sku": "OLE-022",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Illicium verum",
      "Extraction Method": "Supercritical CO2",
      "Aroma Profile": "Rich licorice, sweet spice",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T23:23:11.300Z"
  },
  {
    "id": "prod-3-23",
    "name": "Laurel Bay Leaf Culinary Oleoresin",
    "slug": "laurel-bay-leaf-culinary-oleoresin",
    "description": "Meticulously prepared Laurel Bay Leaf Culinary Oleoresin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1440,
    "rating": 4.9,
    "reviews_count": 81,
    "badge": "Canned Foods",
    "gst_rate": 18,
    "stock_quantity": 49,
    "low_stock_threshold": 5,
    "sku": "OLE-023",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Laurus nobilis",
      "Extraction Method": "Solvent Extracted",
      "Aroma Profile": "Aromatic herbal, sweet bay",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T21:23:11.300Z"
  },
  {
    "id": "prod-3-24",
    "name": "Organic Tamarind Concentrate Resin",
    "slug": "organic-tamarind-concentrate-resin",
    "description": "Meticulously prepared Organic Tamarind Concentrate Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 980,
    "rating": 4.7,
    "reviews_count": 94,
    "badge": "Tart Sweet",
    "gst_rate": 18,
    "stock_quantity": 56,
    "low_stock_threshold": 5,
    "sku": "OLE-024",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Tamarindus indica",
      "Extraction Method": "Aqueous Extraction",
      "Aroma Profile": "Tangy tart, fruity sour",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T19:23:11.300Z"
  },
  {
    "id": "prod-3-25",
    "name": "Ferula Asafoetida Compounded Resin",
    "slug": "ferula-asafoetida-compounded-resin",
    "description": "Meticulously prepared Ferula Asafoetida Compounded Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 2300,
    "rating": 5,
    "reviews_count": 107,
    "badge": "Traditional",
    "gst_rate": 18,
    "stock_quantity": 63,
    "low_stock_threshold": 5,
    "sku": "OLE-025",
    "category_id": 3,
    "image_url": "/images/spice-powders.jpg",
    "images": [
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Ferula assa-foetida",
      "Extraction Method": "Gum Resin Extract",
      "Aroma Profile": "Intense savory, umami note",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T17:23:11.300Z"
  },
  {
    "id": "prod-3-26",
    "name": "Jamaican Pimento Allspice Oleoresin",
    "slug": "jamaican-pimento-allspice-oleoresin",
    "description": "Meticulously prepared Jamaican Pimento Allspice Oleoresin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1820,
    "rating": 4.8,
    "reviews_count": 120,
    "badge": "Multi-Spice",
    "gst_rate": 18,
    "stock_quantity": 15,
    "low_stock_threshold": 5,
    "sku": "OLE-026",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Pimenta dioica",
      "Extraction Method": "Solvent Extracted",
      "Aroma Profile": "Clove and nutmeg fusion",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T15:23:11.300Z"
  },
  {
    "id": "prod-3-27",
    "name": "Dill Weed Soluble Emulsion Resin",
    "slug": "dill-weed-soluble-emulsion-resin",
    "description": "Meticulously prepared Dill Weed Soluble Emulsion Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1260,
    "original_price": 1449,
    "rating": 4.6,
    "reviews_count": 133,
    "badge": "Pickle Seasoning",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 22,
    "low_stock_threshold": 5,
    "sku": "OLE-027",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Anethum graveolens",
      "Extraction Method": "Supercritical CO2",
      "Aroma Profile": "Fresh dill herb, caraway",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T13:23:11.300Z"
  },
  {
    "id": "prod-3-28",
    "name": "Curry Leaf Bioactive Flavor Resin",
    "slug": "curry-leaf-bioactive-flavor-resin",
    "description": "Meticulously prepared Curry Leaf Bioactive Flavor Resin from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 1590,
    "rating": 4.9,
    "reviews_count": 146,
    "badge": "South Indian",
    "gst_rate": 18,
    "stock_quantity": 29,
    "low_stock_threshold": 5,
    "sku": "OLE-028",
    "category_id": 3,
    "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Murraya koenigii",
      "Extraction Method": "Supercritical CO2",
      "Aroma Profile": "Tempered curry leaves",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T11:23:11.300Z"
  },
  {
    "id": "prod-4-2",
    "name": "Jasmine Sambac Heavy Waxy Concrete",
    "slug": "jasmine-sambac-heavy-waxy-concrete",
    "description": "Meticulously prepared Jasmine Sambac Heavy Waxy Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 3400,
    "original_price": 3910,
    "rating": 4.6,
    "reviews_count": 28,
    "badge": "Mogra Pure",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 12,
    "low_stock_threshold": 5,
    "sku": "CON-002",
    "category_id": 4,
    "image_url": "/images/botanical-hero.jpg",
    "images": [
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Jasminum sambac",
      "Extraction Method": "Hexane Extraction",
      "Aroma Profile": "Intoxicating, green floral, sensual",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T15:23:11.300Z"
  },
  {
    "id": "prod-4-3",
    "name": "Bulgarian Damask Rose Concrete",
    "slug": "bulgarian-damask-rose-concrete",
    "description": "Meticulously prepared Bulgarian Damask Rose Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4200,
    "rating": 4.9,
    "reviews_count": 41,
    "badge": "Rose Valley",
    "gst_rate": 18,
    "stock_quantity": 19,
    "low_stock_threshold": 5,
    "sku": "CON-003",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Rosa damascena",
      "Extraction Method": "Hydrocarbon Extracted",
      "Aroma Profile": "Deep rich honey rose, waxy",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T13:23:11.300Z"
  },
  {
    "id": "prod-4-4",
    "name": "Polianthes Tuberose Waxy Concrete",
    "slug": "polianthes-tuberose-waxy-concrete",
    "description": "Meticulously prepared Polianthes Tuberose Waxy Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 3850,
    "rating": 4.7,
    "reviews_count": 54,
    "badge": "Night Bloom",
    "gst_rate": 18,
    "stock_quantity": 26,
    "low_stock_threshold": 5,
    "sku": "CON-004",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Polianthes tuberosa",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Creamy white floral, narcotic",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T11:23:11.300Z"
  },
  {
    "id": "prod-4-5",
    "name": "Royal Champaca Golden Concrete",
    "slug": "royal-champaca-golden-concrete",
    "description": "Meticulously prepared Royal Champaca Golden Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4500,
    "rating": 5,
    "reviews_count": 67,
    "badge": "Temple Flower",
    "gst_rate": 18,
    "stock_quantity": 33,
    "low_stock_threshold": 5,
    "sku": "CON-005",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Michelia champaca",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Warm floral, fruity tea note",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T09:23:11.300Z"
  },
  {
    "id": "prod-4-6",
    "name": "Grasse Mimosa Dealbata Concrete",
    "slug": "grasse-mimosa-dealbata-concrete",
    "description": "Meticulously prepared Grasse Mimosa Dealbata Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 3600,
    "rating": 4.8,
    "reviews_count": 80,
    "badge": "Spring Bloom",
    "gst_rate": 18,
    "stock_quantity": 40,
    "low_stock_threshold": 5,
    "sku": "CON-006",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Acacia dealbata",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Powdery sweet, honey violet",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T07:23:11.300Z"
  },
  {
    "id": "prod-4-7",
    "name": "Sacred Blue Lotus Nymphaea Concrete",
    "slug": "sacred-blue-lotus-nymphaea-concrete",
    "description": "Meticulously prepared Sacred Blue Lotus Nymphaea Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4600,
    "original_price": 5290,
    "rating": 4.6,
    "reviews_count": 93,
    "badge": "Rare Sacred",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 47,
    "low_stock_threshold": 5,
    "sku": "CON-007",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Nymphaea caerulea",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Ethereal, sweet aqueous floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T05:23:11.300Z"
  },
  {
    "id": "prod-4-8",
    "name": "Pink Water Lotus Nelumbo Concrete",
    "slug": "pink-water-lotus-nelumbo-concrete",
    "description": "Meticulously prepared Pink Water Lotus Nelumbo Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4400,
    "rating": 4.9,
    "reviews_count": 106,
    "badge": "South India",
    "gst_rate": 18,
    "stock_quantity": 54,
    "low_stock_threshold": 5,
    "sku": "CON-008",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Nelumbo nucifera",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Delicate powdery lotus, aquatic",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T03:23:11.300Z"
  },
  {
    "id": "prod-4-9",
    "name": "Plumeria Frangipani Temple Concrete",
    "slug": "plumeria-frangipani-temple-concrete",
    "description": "Meticulously prepared Plumeria Frangipani Temple Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 3900,
    "rating": 4.7,
    "reviews_count": 119,
    "badge": "Tropical Floral",
    "gst_rate": 18,
    "stock_quantity": 61,
    "low_stock_threshold": 5,
    "sku": "CON-009",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Plumeria rubra",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Lush tropical, creamy almond",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T01:23:11.300Z"
  },
  {
    "id": "prod-4-10",
    "name": "Tunisian Orange Blossom Neroli",
    "slug": "tunisian-orange-blossom-neroli",
    "description": "Meticulously prepared Tunisian Orange Blossom Neroli from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4100,
    "rating": 5,
    "reviews_count": 132,
    "badge": "Pure Orange",
    "gst_rate": 18,
    "stock_quantity": 13,
    "low_stock_threshold": 5,
    "sku": "CON-010",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Citrus aurantium",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Crisp white floral, citrusy",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T23:23:11.300Z"
  },
  {
    "id": "prod-4-11",
    "name": "Cape Jasmine Gardenia Concrete",
    "slug": "cape-jasmine-gardenia-concrete",
    "description": "Meticulously prepared Cape Jasmine Gardenia Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 3750,
    "rating": 4.8,
    "reviews_count": 145,
    "badge": "White Flower",
    "gst_rate": 18,
    "stock_quantity": 20,
    "low_stock_threshold": 5,
    "sku": "CON-011",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Gardenia jasminoides",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Lush, green white floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T21:23:11.300Z"
  },
  {
    "id": "prod-4-12",
    "name": "French Carnation Dianthus Concrete",
    "slug": "french-carnation-dianthus-concrete",
    "description": "Meticulously prepared French Carnation Dianthus Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 3500,
    "original_price": 4025,
    "rating": 4.6,
    "reviews_count": 158,
    "badge": "Spicy Floral",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 27,
    "low_stock_threshold": 5,
    "sku": "CON-012",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Dianthus caryophyllus",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Clove-like, rich spicy floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T19:23:11.300Z"
  },
  {
    "id": "prod-4-13",
    "name": "Osmanthus Fragrans Golden Concrete",
    "slug": "osmanthus-fragrans-golden-concrete",
    "description": "Meticulously prepared Osmanthus Fragrans Golden Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4350,
    "rating": 4.9,
    "reviews_count": 171,
    "badge": "Apricot Floral",
    "gst_rate": 18,
    "stock_quantity": 34,
    "low_stock_threshold": 5,
    "sku": "CON-013",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Osmanthus fragrans",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Ripe peach, leathery apricot",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T17:23:11.300Z"
  },
  {
    "id": "prod-4-14",
    "name": "Indian Marigold Tagetes Concrete",
    "slug": "indian-marigold-tagetes-concrete",
    "description": "Meticulously prepared Indian Marigold Tagetes Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 2650,
    "rating": 4.7,
    "reviews_count": 184,
    "badge": "Festive Gold",
    "gst_rate": 18,
    "stock_quantity": 41,
    "low_stock_threshold": 5,
    "sku": "CON-014",
    "category_id": 4,
    "image_url": "/images/spice-powders.jpg",
    "images": [
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Tagetes erecta",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Herbaceous, fruity green, tangy",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T15:23:11.300Z"
  },
  {
    "id": "prod-4-15",
    "name": "Night Blooming Jasmine Cestrum",
    "slug": "night-blooming-jasmine-cestrum",
    "description": "Meticulously prepared Night Blooming Jasmine Cestrum from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 3300,
    "rating": 5,
    "reviews_count": 197,
    "badge": "Queen of Night",
    "gst_rate": 18,
    "stock_quantity": 48,
    "low_stock_threshold": 5,
    "sku": "CON-015",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cestrum nocturnum",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Deep, intense evening floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T13:23:11.300Z"
  },
  {
    "id": "prod-4-16",
    "name": "White Narcissus Poeticus Concrete",
    "slug": "white-narcissus-poeticus-concrete",
    "description": "Meticulously prepared White Narcissus Poeticus Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4150,
    "rating": 4.8,
    "reviews_count": 210,
    "badge": "Wild Narcissus",
    "gst_rate": 18,
    "stock_quantity": 55,
    "low_stock_threshold": 5,
    "sku": "CON-016",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Narcissus poeticus",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Green floral, hay-like, animalic",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T11:23:11.300Z"
  },
  {
    "id": "prod-4-17",
    "name": "Provence Jonquil Flower Concrete",
    "slug": "provence-jonquil-flower-concrete",
    "description": "Meticulously prepared Provence Jonquil Flower Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 3950,
    "original_price": 4543,
    "rating": 4.6,
    "reviews_count": 223,
    "badge": "French Grasse",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 62,
    "low_stock_threshold": 5,
    "sku": "CON-017",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Narcissus jonquilla",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Honey, floral sweet, rich",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T09:23:11.300Z"
  },
  {
    "id": "prod-4-18",
    "name": "Kewra Pandanus Floral Concrete",
    "slug": "kewra-pandanus-floral-concrete",
    "description": "Meticulously prepared Kewra Pandanus Floral Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 3100,
    "rating": 4.9,
    "reviews_count": 236,
    "badge": "Orissa Heritage",
    "gst_rate": 18,
    "stock_quantity": 14,
    "low_stock_threshold": 5,
    "sku": "CON-018",
    "category_id": 4,
    "image_url": "/images/botanical-hero.jpg",
    "images": [
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Pandanus fascicularis",
      "Extraction Method": "Hydrocarbon Extracted",
      "Aroma Profile": "Hyacinth sweet, honey floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T07:23:11.300Z"
  },
  {
    "id": "prod-4-19",
    "name": "White Rose Alba Botanical Concrete",
    "slug": "white-rose-alba-botanical-concrete",
    "description": "Meticulously prepared White Rose Alba Botanical Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4450,
    "rating": 4.7,
    "reviews_count": 29,
    "badge": "Ancient Rose",
    "gst_rate": 18,
    "stock_quantity": 21,
    "low_stock_threshold": 5,
    "sku": "CON-019",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Rosa alba",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Soft, crystalline rose petal",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T05:23:11.300Z"
  },
  {
    "id": "prod-4-20",
    "name": "Wild Honeysuckle Lonicera Concrete",
    "slug": "wild-honeysuckle-lonicera-concrete",
    "description": "Meticulously prepared Wild Honeysuckle Lonicera Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 3650,
    "rating": 5,
    "reviews_count": 42,
    "badge": "Sweet Nectar",
    "gst_rate": 18,
    "stock_quantity": 28,
    "low_stock_threshold": 5,
    "sku": "CON-020",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Lonicera caprifolium",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Fresh honey, sweet floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T03:23:11.300Z"
  },
  {
    "id": "prod-4-21",
    "name": "Egyptian Violet Leaf Floral Concrete",
    "slug": "egyptian-violet-leaf-floral-concrete",
    "description": "Meticulously prepared Egyptian Violet Leaf Floral Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 3800,
    "rating": 4.8,
    "reviews_count": 55,
    "badge": "Green Ozone",
    "gst_rate": 18,
    "stock_quantity": 35,
    "low_stock_threshold": 5,
    "sku": "CON-021",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Viola odorata",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Green cucumber, fresh grass",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T01:23:11.300Z"
  },
  {
    "id": "prod-4-22",
    "name": "White Magnolia Grandiflora Concrete",
    "slug": "white-magnolia-grandiflora-concrete",
    "description": "Meticulously prepared White Magnolia Grandiflora Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4250,
    "original_price": 4888,
    "rating": 4.6,
    "reviews_count": 68,
    "badge": "Cream Petal",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 42,
    "low_stock_threshold": 5,
    "sku": "CON-022",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Magnolia grandiflora",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Creamy citrus, opulent floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T23:23:11.300Z"
  },
  {
    "id": "prod-4-23",
    "name": "Spring Hyacinth Orientalis Concrete",
    "slug": "spring-hyacinth-orientalis-concrete",
    "description": "Meticulously prepared Spring Hyacinth Orientalis Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 3700,
    "rating": 4.9,
    "reviews_count": 81,
    "badge": "Green Spring",
    "gst_rate": 18,
    "stock_quantity": 49,
    "low_stock_threshold": 5,
    "sku": "CON-023",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Hyacinthus orientalis",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Crisp green, heady floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T21:23:11.300Z"
  },
  {
    "id": "prod-4-24",
    "name": "Haute-Provence Lavender Concrete",
    "slug": "haute-provence-lavender-concrete",
    "description": "Meticulously prepared Haute-Provence Lavender Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 2950,
    "rating": 4.7,
    "reviews_count": 94,
    "badge": "Herbaceous Rose",
    "gst_rate": 18,
    "stock_quantity": 56,
    "low_stock_threshold": 5,
    "sku": "CON-024",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Lavandula angustifolia",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Sweet herbal, coumarin note",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T19:23:11.300Z"
  },
  {
    "id": "prod-4-25",
    "name": "Madagascan Ylang Ylang Concrete",
    "slug": "madagascan-ylang-ylang-concrete",
    "description": "Meticulously prepared Madagascan Ylang Ylang Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 3250,
    "rating": 5,
    "reviews_count": 107,
    "badge": "Exotic Island",
    "gst_rate": 18,
    "stock_quantity": 63,
    "low_stock_threshold": 5,
    "sku": "CON-025",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cananga odorata",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Balsamic, heady tropical",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T17:23:11.300Z"
  },
  {
    "id": "prod-4-26",
    "name": "Sweet Marjoram Blossom Concrete",
    "slug": "sweet-marjoram-blossom-concrete",
    "description": "Meticulously prepared Sweet Marjoram Blossom Concrete from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 2850,
    "rating": 4.8,
    "reviews_count": 120,
    "badge": "Subtle Herbal",
    "gst_rate": 18,
    "stock_quantity": 15,
    "low_stock_threshold": 5,
    "sku": "CON-026",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Origanum majorana",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Aromatic spicy, sweet herbal",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T15:23:11.300Z"
  },
  {
    "id": "prod-4-27",
    "name": "Corsican Everlasting Immortelle",
    "slug": "corsican-everlasting-immortelle",
    "description": "Meticulously prepared Corsican Everlasting Immortelle from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4100,
    "original_price": 4715,
    "rating": 4.6,
    "reviews_count": 133,
    "badge": "Golden Sun",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 22,
    "low_stock_threshold": 5,
    "sku": "CON-027",
    "category_id": 4,
    "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Helichrysum italicum",
      "Extraction Method": "Solvent Extraction",
      "Aroma Profile": "Curry, maple syrup, hay",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T13:23:11.300Z"
  },
  {
    "id": "prod-5-2",
    "name": "Jasmine Sambac Superfine Absolute",
    "slug": "jasmine-sambac-superfine-absolute",
    "description": "Meticulously prepared Jasmine Sambac Superfine Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 5200,
    "original_price": 5980,
    "rating": 4.6,
    "reviews_count": 28,
    "badge": "Grade A",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 12,
    "low_stock_threshold": 5,
    "sku": "ABS-002",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Jasminum sambac",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Deep, sensual, narcotic white floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T15:23:11.300Z"
  },
  {
    "id": "prod-5-3",
    "name": "Jasmine Grandiflorum Pure Absolute",
    "slug": "jasmine-grandiflorum-pure-absolute",
    "description": "Meticulously prepared Jasmine Grandiflorum Pure Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4900,
    "rating": 4.9,
    "reviews_count": 41,
    "badge": "Perfumery Classic",
    "gst_rate": 18,
    "stock_quantity": 19,
    "low_stock_threshold": 5,
    "sku": "ABS-003",
    "category_id": 5,
    "image_url": "/images/spice-powders.jpg",
    "images": [
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Jasminum grandiflorum",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Rich, velvety sweet jasmine",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T13:23:11.300Z"
  },
  {
    "id": "prod-5-4",
    "name": "Centifolia Rose de Mai Pure Absolute",
    "slug": "centifolia-rose-de-mai-pure-absolute",
    "description": "Meticulously prepared Centifolia Rose de Mai Pure Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 6800,
    "rating": 4.7,
    "reviews_count": 54,
    "badge": "Grasse Vintage",
    "gst_rate": 18,
    "stock_quantity": 26,
    "low_stock_threshold": 5,
    "sku": "ABS-004",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Rosa centifolia",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Rich honeyed floral, warm spicy",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T11:23:11.300Z"
  },
  {
    "id": "prod-5-5",
    "name": "Bulgarian Damask Rose Otto Absolute",
    "slug": "bulgarian-damask-rose-otto-absolute",
    "description": "Meticulously prepared Bulgarian Damask Rose Otto Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 7400,
    "rating": 5,
    "reviews_count": 67,
    "badge": "Royal Perfume",
    "gst_rate": 18,
    "stock_quantity": 33,
    "low_stock_threshold": 5,
    "sku": "ABS-005",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Rosa damascena",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Intense classic rose, deep honey",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T09:23:11.300Z"
  },
  {
    "id": "prod-5-6",
    "name": "Royal Golden Champaca Absolute",
    "slug": "royal-golden-champaca-absolute",
    "description": "Meticulously prepared Royal Golden Champaca Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 6200,
    "rating": 4.8,
    "reviews_count": 80,
    "badge": "Precious Fragrance",
    "gst_rate": 18,
    "stock_quantity": 40,
    "low_stock_threshold": 5,
    "sku": "ABS-006",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Michelia champaca",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Opulent tropical floral, dried apricot",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T07:23:11.300Z"
  },
  {
    "id": "prod-5-7",
    "name": "Sacred Egyptian Blue Lotus Absolute",
    "slug": "sacred-egyptian-blue-lotus-absolute",
    "description": "Meticulously prepared Sacred Egyptian Blue Lotus Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 7100,
    "original_price": 8165,
    "rating": 4.6,
    "reviews_count": 93,
    "badge": "Fine Nectar",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 47,
    "low_stock_threshold": 5,
    "sku": "ABS-007",
    "category_id": 5,
    "image_url": "/images/botanical-hero.jpg",
    "images": [
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Nymphaea caerulea",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Deep aquatic floral, transcendental",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T05:23:11.300Z"
  },
  {
    "id": "prod-5-8",
    "name": "White Water Lotus Pure Absolute",
    "slug": "white-water-lotus-pure-absolute",
    "description": "Meticulously prepared White Water Lotus Pure Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 6600,
    "rating": 4.9,
    "reviews_count": 106,
    "badge": "Sacred Lotus",
    "gst_rate": 18,
    "stock_quantity": 54,
    "low_stock_threshold": 5,
    "sku": "ABS-008",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Nelumbo nucifera",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Clean, sweet powdered floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T03:23:11.300Z"
  },
  {
    "id": "prod-5-9",
    "name": "Neroli Bigarade Blossom Absolute",
    "slug": "neroli-bigarade-blossom-absolute",
    "description": "Meticulously prepared Neroli Bigarade Blossom Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 5800,
    "rating": 4.7,
    "reviews_count": 119,
    "badge": "Tunisian Heritage",
    "gst_rate": 18,
    "stock_quantity": 61,
    "low_stock_threshold": 5,
    "sku": "ABS-009",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Citrus aurantium",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Rich orange flower, honeyed citrus",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T01:23:11.300Z"
  },
  {
    "id": "prod-5-10",
    "name": "Grasse Golden Mimosa Absolute",
    "slug": "grasse-golden-mimosa-absolute",
    "description": "Meticulously prepared Grasse Golden Mimosa Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4600,
    "rating": 5,
    "reviews_count": 132,
    "badge": "Haute Parfumerie",
    "gst_rate": 18,
    "stock_quantity": 13,
    "low_stock_threshold": 5,
    "sku": "ABS-010",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Acacia dealbata",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Powdery floral, sweet honeyed violet",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T23:23:11.300Z"
  },
  {
    "id": "prod-5-11",
    "name": "Temple Frangipani Pure Absolute",
    "slug": "temple-frangipani-pure-absolute",
    "description": "Meticulously prepared Temple Frangipani Pure Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 5400,
    "rating": 4.8,
    "reviews_count": 145,
    "badge": "Plumeria Blossom",
    "gst_rate": 18,
    "stock_quantity": 20,
    "low_stock_threshold": 5,
    "sku": "ABS-011",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Plumeria alba",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Velvety tropical floral, almond peach",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T21:23:11.300Z"
  },
  {
    "id": "prod-5-12",
    "name": "Osmanthus Sweet Apricot Absolute",
    "slug": "osmanthus-sweet-apricot-absolute",
    "description": "Meticulously prepared Osmanthus Sweet Apricot Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 6900,
    "original_price": 7935,
    "rating": 4.6,
    "reviews_count": 158,
    "badge": "High Perfumery",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 27,
    "low_stock_threshold": 5,
    "sku": "ABS-012",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Osmanthus fragrans",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Jammy apricot, soft sueded leather",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T19:23:11.300Z"
  },
  {
    "id": "prod-5-13",
    "name": "French Spicy Carnation Absolute",
    "slug": "french-spicy-carnation-absolute",
    "description": "Meticulously prepared French Spicy Carnation Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4800,
    "rating": 4.9,
    "reviews_count": 171,
    "badge": "Vintage Floral",
    "gst_rate": 18,
    "stock_quantity": 34,
    "low_stock_threshold": 5,
    "sku": "ABS-013",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Dianthus caryophyllus",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Warm clove spice, rich floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T17:23:11.300Z"
  },
  {
    "id": "prod-5-14",
    "name": "Gardenia Tahitensis Tiare Absolute",
    "slug": "gardenia-tahitensis-tiare-absolute",
    "description": "Meticulously prepared Gardenia Tahitensis Tiare Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 5100,
    "rating": 4.7,
    "reviews_count": 184,
    "badge": "Tiare Flower",
    "gst_rate": 18,
    "stock_quantity": 41,
    "low_stock_threshold": 5,
    "sku": "ABS-014",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Gardenia taitensis",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Exotic, heady monoi white floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T15:23:11.300Z"
  },
  {
    "id": "prod-5-15",
    "name": "Florentine Orris Butter 15% Absolute",
    "slug": "florentine-orris-butter-15-absolute",
    "description": "Meticulously prepared Florentine Orris Butter 15% Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 7740,
    "rating": 5,
    "reviews_count": 197,
    "badge": "Priceless Essence",
    "gst_rate": 18,
    "stock_quantity": 48,
    "low_stock_threshold": 5,
    "sku": "ABS-015",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Iris pallida",
      "Extraction Method": "Three Year Aged Root Distillate",
      "Aroma Profile": "Powdery, violet-like, aristocratic woody",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T13:23:11.300Z"
  },
  {
    "id": "prod-5-16",
    "name": "Orange Blossom Hydro-Absolute",
    "slug": "orange-blossom-hydro-absolute",
    "description": "Meticulously prepared Orange Blossom Hydro-Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 5300,
    "rating": 4.8,
    "reviews_count": 210,
    "badge": "Fleurs d'Oranger",
    "gst_rate": 18,
    "stock_quantity": 55,
    "low_stock_threshold": 5,
    "sku": "ABS-016",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Citrus aurantium",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Sweet, intoxicating white blossom",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T11:23:11.300Z"
  },
  {
    "id": "prod-5-17",
    "name": "Emerald Violet Leaf Green Absolute",
    "slug": "emerald-violet-leaf-green-absolute",
    "description": "Meticulously prepared Emerald Violet Leaf Green Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 5600,
    "original_price": 6440,
    "rating": 4.6,
    "reviews_count": 223,
    "badge": "Green Foundation",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 62,
    "low_stock_threshold": 5,
    "sku": "ABS-017",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Viola odorata",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Intensely green, earthy cucumber",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T09:23:11.300Z"
  },
  {
    "id": "prod-5-18",
    "name": "French Narcissus Narcotique Absolute",
    "slug": "french-narcissus-narcotique-absolute",
    "description": "Meticulously prepared French Narcissus Narcotique Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 6100,
    "rating": 4.9,
    "reviews_count": 236,
    "badge": "Rare Flora",
    "gst_rate": 18,
    "stock_quantity": 14,
    "low_stock_threshold": 5,
    "sku": "ABS-018",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Narcissus poeticus",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Rich hay, deep hypnotic floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T07:23:11.300Z"
  },
  {
    "id": "prod-5-19",
    "name": "Kewra Attar Triple-Distilled",
    "slug": "kewra-attar-triple-distilled",
    "description": "Meticulously prepared Kewra Attar Triple-Distilled from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4400,
    "rating": 4.7,
    "reviews_count": 29,
    "badge": "Indian Heritage",
    "gst_rate": 18,
    "stock_quantity": 21,
    "low_stock_threshold": 5,
    "sku": "ABS-019",
    "category_id": 5,
    "image_url": "/images/spice-powders.jpg",
    "images": [
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Pandanus fascicularis",
      "Extraction Method": "Traditional Deg & Bhapka",
      "Aroma Profile": "Sweet fruity honey, exotic green",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T05:23:11.300Z"
  },
  {
    "id": "prod-5-20",
    "name": "Linden Blossom Honeyed Absolute",
    "slug": "linden-blossom-honeyed-absolute",
    "description": "Meticulously prepared Linden Blossom Honeyed Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4950,
    "rating": 5,
    "reviews_count": 42,
    "badge": "Tilia Cordata",
    "gst_rate": 18,
    "stock_quantity": 28,
    "low_stock_threshold": 5,
    "sku": "ABS-020",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Tilia cordata",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Sun-drenched honey, sweet floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T03:23:11.300Z"
  },
  {
    "id": "prod-5-21",
    "name": "French Jonquil Perfumery Absolute",
    "slug": "french-jonquil-perfumery-absolute",
    "description": "Meticulously prepared French Jonquil Perfumery Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 5750,
    "rating": 4.8,
    "reviews_count": 55,
    "badge": "Spring Classic",
    "gst_rate": 18,
    "stock_quantity": 35,
    "low_stock_threshold": 5,
    "sku": "ABS-021",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Narcissus jonquilla",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Deep floral, honeyed animalic",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T01:23:11.300Z"
  },
  {
    "id": "prod-5-22",
    "name": "Rockrose Cistus Labdanum Absolute",
    "slug": "rockrose-cistus-labdanum-absolute",
    "description": "Meticulously prepared Rockrose Cistus Labdanum Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4700,
    "original_price": 5405,
    "rating": 4.6,
    "reviews_count": 68,
    "badge": "Amber Base",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 42,
    "low_stock_threshold": 5,
    "sku": "ABS-022",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cistus ladanifer",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Warm ambery, leather, dried fruit",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T23:23:11.300Z"
  },
  {
    "id": "prod-5-23",
    "name": "Corsican Immortelle Nectar Absolute",
    "slug": "corsican-immortelle-nectar-absolute",
    "description": "Meticulously prepared Corsican Immortelle Nectar Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 6400,
    "rating": 4.9,
    "reviews_count": 81,
    "badge": "Everlasting Flower",
    "gst_rate": 18,
    "stock_quantity": 49,
    "low_stock_threshold": 5,
    "sku": "ABS-023",
    "category_id": 5,
    "image_url": "/images/botanical-hero.jpg",
    "images": [
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Helichrysum italicum",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Curry honey, caramelized hay",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T21:23:11.300Z"
  },
  {
    "id": "prod-5-24",
    "name": "European Elderflower Fine Absolute",
    "slug": "european-elderflower-fine-absolute",
    "description": "Meticulously prepared European Elderflower Fine Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4850,
    "rating": 4.7,
    "reviews_count": 94,
    "badge": "Delicate Flora",
    "gst_rate": 18,
    "stock_quantity": 56,
    "low_stock_threshold": 5,
    "sku": "ABS-024",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Sambucus nigra",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Muscatel grape, fresh floral sweet",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T19:23:11.300Z"
  },
  {
    "id": "prod-5-25",
    "name": "Sacred Davana Artemisia Absolute",
    "slug": "sacred-davana-artemisia-absolute",
    "description": "Meticulously prepared Sacred Davana Artemisia Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4300,
    "rating": 5,
    "reviews_count": 107,
    "badge": "Ayurvedic Jewel",
    "gst_rate": 18,
    "stock_quantity": 63,
    "low_stock_threshold": 5,
    "sku": "ABS-025",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Artemisia pallens",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Intensely fruity, warm strawberry plum",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T17:23:11.300Z"
  },
  {
    "id": "prod-5-26",
    "name": "Ylang Ylang Complete Perfumer Absolute",
    "slug": "ylang-ylang-complete-perfumer-absolute",
    "description": "Meticulously prepared Ylang Ylang Complete Perfumer Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 4650,
    "rating": 4.8,
    "reviews_count": 120,
    "badge": "Elite Floral",
    "gst_rate": 18,
    "stock_quantity": 15,
    "low_stock_threshold": 5,
    "sku": "ABS-026",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cananga odorata",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Deep sweet floral, creamy woody",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T15:23:11.300Z"
  },
  {
    "id": "prod-5-27",
    "name": "Blue Hyacinth Intoxicating Absolute",
    "slug": "blue-hyacinth-intoxicating-absolute",
    "description": "Meticulously prepared Blue Hyacinth Intoxicating Absolute from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 5900,
    "original_price": 6785,
    "rating": 4.6,
    "reviews_count": 133,
    "badge": "Rare Nectar",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 22,
    "low_stock_threshold": 5,
    "sku": "ABS-027",
    "category_id": 5,
    "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Hyacinthus orientalis",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Aroma Profile": "Vibrant green, rich spring floral",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T13:23:11.300Z"
  },
  {
    "id": "prod-6-2",
    "name": "Malabar Black Pepper Coarse Powder",
    "slug": "malabar-black-pepper-coarse-powder",
    "description": "Meticulously prepared Malabar Black Pepper Coarse Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 580,
    "original_price": 667,
    "rating": 4.6,
    "reviews_count": 28,
    "badge": "50 Mesh",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 12,
    "low_stock_threshold": 5,
    "sku": "POW-002",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Piper nigrum",
      "Extraction Method": "Cryo Milled",
      "Aroma Profile": "Pungent, woody, sharp peppery",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T15:23:11.300Z"
  },
  {
    "id": "prod-6-3",
    "name": "Ceylon Cinnamon Micro-Fine Powder",
    "slug": "ceylon-cinnamon-micro-fine-powder",
    "description": "Meticulously prepared Ceylon Cinnamon Micro-Fine Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 720,
    "rating": 4.9,
    "reviews_count": 41,
    "badge": "Zero Coumarin",
    "gst_rate": 18,
    "stock_quantity": 19,
    "low_stock_threshold": 5,
    "sku": "POW-003",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cinnamomum verum",
      "Extraction Method": "Fine Milled",
      "Aroma Profile": "Sweet fragrant, refined spice",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T13:23:11.300Z"
  },
  {
    "id": "prod-6-4",
    "name": "Alleppey Green Cardamom Pod Powder",
    "slug": "alleppey-green-cardamom-pod-powder",
    "description": "Meticulously prepared Alleppey Green Cardamom Pod Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 890,
    "rating": 4.7,
    "reviews_count": 54,
    "badge": "100% Pure Pod",
    "gst_rate": 18,
    "stock_quantity": 26,
    "low_stock_threshold": 5,
    "sku": "POW-004",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Elettaria cardamomum",
      "Extraction Method": "Cryo Milled",
      "Aroma Profile": "Sweet, highly aromatic camphoraceous",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T11:23:11.300Z"
  },
  {
    "id": "prod-6-5",
    "name": "Sun-Dried Ginger Zingiber Powder",
    "slug": "sun-dried-ginger-zingiber-powder",
    "description": "Meticulously prepared Sun-Dried Ginger Zingiber Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 540,
    "rating": 5,
    "reviews_count": 67,
    "badge": "Sonth Pure",
    "gst_rate": 18,
    "stock_quantity": 33,
    "low_stock_threshold": 5,
    "sku": "POW-005",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Zingiber officinale",
      "Extraction Method": "Air Dried & Milled",
      "Aroma Profile": "Warm, spicy, pungent",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T09:23:11.300Z"
  },
  {
    "id": "prod-6-6",
    "name": "Kashmiri Red Chilli Stemless Powder",
    "slug": "kashmiri-red-chilli-stemless-powder",
    "description": "Meticulously prepared Kashmiri Red Chilli Stemless Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 620,
    "rating": 4.8,
    "reviews_count": 80,
    "badge": "Natural Color",
    "gst_rate": 18,
    "stock_quantity": 40,
    "low_stock_threshold": 5,
    "sku": "POW-006",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Capsicum annuum",
      "Extraction Method": "Stone Ground",
      "Aroma Profile": "Fruity, mild heat, intense crimson",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T07:23:11.300Z"
  },
  {
    "id": "prod-6-7",
    "name": "Roasted Indian Cumin Seed Powder",
    "slug": "roasted-indian-cumin-seed-powder",
    "description": "Meticulously prepared Roasted Indian Cumin Seed Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 510,
    "original_price": 587,
    "rating": 4.6,
    "reviews_count": 93,
    "badge": "Bhuna Jeera",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 47,
    "low_stock_threshold": 5,
    "sku": "POW-007",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cuminum cyminum",
      "Extraction Method": "Slow Roasted & Ground",
      "Aroma Profile": "Smoky, earthy, warm toasted",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T05:23:11.300Z"
  },
  {
    "id": "prod-6-8",
    "name": "High-Aroma Coriander Seed Powder",
    "slug": "high-aroma-coriander-seed-powder",
    "description": "Meticulously prepared High-Aroma Coriander Seed Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 460,
    "rating": 4.9,
    "reviews_count": 106,
    "badge": "Green Seed",
    "gst_rate": 18,
    "stock_quantity": 54,
    "low_stock_threshold": 5,
    "sku": "POW-008",
    "category_id": 6,
    "image_url": "/images/spice-powders.jpg",
    "images": [
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Coriandrum sativum",
      "Extraction Method": "Cold Milled",
      "Aroma Profile": "Citrusy, woody, fragrant",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T03:23:11.300Z"
  },
  {
    "id": "prod-6-9",
    "name": "Sweet Fennel Seed Ground Powder",
    "slug": "sweet-fennel-seed-ground-powder",
    "description": "Meticulously prepared Sweet Fennel Seed Ground Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 480,
    "rating": 4.7,
    "reviews_count": 119,
    "badge": "Digestive Spice",
    "gst_rate": 18,
    "stock_quantity": 61,
    "low_stock_threshold": 5,
    "sku": "POW-009",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Foeniculum vulgare",
      "Extraction Method": "Micro Milled",
      "Aroma Profile": "Sweet licorice, refreshing anise",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-17T01:23:11.300Z"
  },
  {
    "id": "prod-6-10",
    "name": "Micro-Ground Fenugreek Powder",
    "slug": "micro-ground-fenugreek-powder",
    "description": "Meticulously prepared Micro-Ground Fenugreek Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 420,
    "rating": 5,
    "reviews_count": 132,
    "badge": "Methi Pure",
    "gst_rate": 18,
    "stock_quantity": 13,
    "low_stock_threshold": 5,
    "sku": "POW-010",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Trigonella foenum-graecum",
      "Extraction Method": "Cryo Milled",
      "Aroma Profile": "Maple-like, pleasant bitter warmth",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T23:23:11.300Z"
  },
  {
    "id": "prod-6-11",
    "name": "Myristica Nutmeg Fine Baking Powder",
    "slug": "myristica-nutmeg-fine-baking-powder",
    "description": "Meticulously prepared Myristica Nutmeg Fine Baking Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 780,
    "rating": 4.8,
    "reviews_count": 145,
    "badge": "Pure Kernel",
    "gst_rate": 18,
    "stock_quantity": 20,
    "low_stock_threshold": 5,
    "sku": "POW-011",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Myristica fragrans",
      "Extraction Method": "Fine Milled",
      "Aroma Profile": "Nutty, warm sweet, aromatic",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T21:23:11.300Z"
  },
  {
    "id": "prod-6-12",
    "name": "Golden Mace Blade Micro Powder",
    "slug": "golden-mace-blade-micro-powder",
    "description": "Meticulously prepared Golden Mace Blade Micro Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 920,
    "original_price": 1058,
    "rating": 4.6,
    "reviews_count": 158,
    "badge": "Javitri Grade A",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 27,
    "low_stock_threshold": 5,
    "sku": "POW-012",
    "category_id": 6,
    "image_url": "/images/botanical-hero.jpg",
    "images": [
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Myristica fragrans",
      "Extraction Method": "Cryo Milled",
      "Aroma Profile": "Refined sweet spice, fragrant",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T19:23:11.300Z"
  },
  {
    "id": "prod-6-13",
    "name": "Yellow Mustard Seed Flour Powder",
    "slug": "yellow-mustard-seed-flour-powder",
    "description": "Meticulously prepared Yellow Mustard Seed Flour Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 390,
    "rating": 4.9,
    "reviews_count": 171,
    "badge": "Cold Milled",
    "gst_rate": 18,
    "stock_quantity": 34,
    "low_stock_threshold": 5,
    "sku": "POW-013",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Sinapis alba",
      "Extraction Method": "Milled & Sifted",
      "Aroma Profile": "Pungent when wet, warm savory",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T17:23:11.300Z"
  },
  {
    "id": "prod-6-14",
    "name": "Whole Madagascar Cloves Powder",
    "slug": "whole-madagascar-cloves-powder",
    "description": "Meticulously prepared Whole Madagascar Cloves Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 840,
    "rating": 4.7,
    "reviews_count": 184,
    "badge": "High Eugenol",
    "gst_rate": 18,
    "stock_quantity": 41,
    "low_stock_threshold": 5,
    "sku": "POW-014",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Syzygium aromaticum",
      "Extraction Method": "Cryo Milled",
      "Aroma Profile": "Intense, warm spicy, numbing",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T15:23:11.300Z"
  },
  {
    "id": "prod-6-15",
    "name": "Finely Milled Star Anise Powder",
    "slug": "finely-milled-star-anise-powder",
    "description": "Meticulously prepared Finely Milled Star Anise Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 660,
    "rating": 5,
    "reviews_count": 197,
    "badge": "Chakri Phool",
    "gst_rate": 18,
    "stock_quantity": 48,
    "low_stock_threshold": 5,
    "sku": "POW-015",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Illicium verum",
      "Extraction Method": "Micro Milled",
      "Aroma Profile": "Sweet, licorice, five-spice note",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T13:23:11.300Z"
  },
  {
    "id": "prod-6-16",
    "name": "Spray-Dried Garlic Flake Powder",
    "slug": "spray-dried-garlic-flake-powder",
    "description": "Meticulously prepared Spray-Dried Garlic Flake Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 480,
    "rating": 4.8,
    "reviews_count": 210,
    "badge": "Zero Moisture",
    "gst_rate": 18,
    "stock_quantity": 55,
    "low_stock_threshold": 5,
    "sku": "POW-016",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Allium sativum",
      "Extraction Method": "Dehydrated & Powdered",
      "Aroma Profile": "True roasted garlic, savory",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T11:23:11.300Z"
  },
  {
    "id": "prod-6-17",
    "name": "White Onion Dehydrated Powder",
    "slug": "white-onion-dehydrated-powder",
    "description": "Meticulously prepared White Onion Dehydrated Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 440,
    "original_price": 506,
    "rating": 4.6,
    "reviews_count": 223,
    "badge": "Pure Allium",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 62,
    "low_stock_threshold": 5,
    "sku": "POW-017",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Allium cepa",
      "Extraction Method": "Dehydrated & Powdered",
      "Aroma Profile": "Sweet onion, rich umami",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T09:23:11.300Z"
  },
  {
    "id": "prod-6-18",
    "name": "Compounded Asafoetida Hing Powder",
    "slug": "compounded-asafoetida-hing-powder",
    "description": "Meticulously prepared Compounded Asafoetida Hing Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 760,
    "rating": 4.9,
    "reviews_count": 236,
    "badge": "Traditional",
    "gst_rate": 18,
    "stock_quantity": 14,
    "low_stock_threshold": 5,
    "sku": "POW-018",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Ferula assa-foetida",
      "Extraction Method": "Compounded with Gum Arabic",
      "Aroma Profile": "Pungent, savory garlic-onion",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T07:23:11.300Z"
  },
  {
    "id": "prod-6-19",
    "name": "Fresh Shade-Dried Curry Leaf Powder",
    "slug": "fresh-shade-dried-curry-leaf-powder",
    "description": "Meticulously prepared Fresh Shade-Dried Curry Leaf Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 490,
    "rating": 4.7,
    "reviews_count": 29,
    "badge": "High Chlorophyll",
    "gst_rate": 18,
    "stock_quantity": 21,
    "low_stock_threshold": 5,
    "sku": "POW-019",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Murraya koenigii",
      "Extraction Method": "Shade Dried & Ground",
      "Aroma Profile": "Tempered curry, herbal citrus",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T05:23:11.300Z"
  },
  {
    "id": "prod-6-20",
    "name": "Sun-Dried Raw Mango Amchur Powder",
    "slug": "sun-dried-raw-mango-amchur-powder",
    "description": "Meticulously prepared Sun-Dried Raw Mango Amchur Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 430,
    "rating": 5,
    "reviews_count": 42,
    "badge": "Tart Acidic",
    "gst_rate": 18,
    "stock_quantity": 28,
    "low_stock_threshold": 5,
    "sku": "POW-020",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Mangifera indica",
      "Extraction Method": "Sun Dried Slices Milled",
      "Aroma Profile": "Tangy, fruity sour, clean tart",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T03:23:11.300Z"
  },
  {
    "id": "prod-6-21",
    "name": "Himalayan Black Salt Kala Namak",
    "slug": "himalayan-black-salt-kala-namak",
    "description": "Meticulously prepared Himalayan Black Salt Kala Namak from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 350,
    "rating": 4.8,
    "reviews_count": 55,
    "badge": "Mineral Rich",
    "gst_rate": 18,
    "stock_quantity": 35,
    "low_stock_threshold": 5,
    "sku": "POW-021",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Mineral Rock Salt",
      "Extraction Method": "Fine Ground",
      "Aroma Profile": "Pungent, umami sulfurous",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-16T01:23:11.300Z"
  },
  {
    "id": "prod-6-22",
    "name": "Dried Garden Spearmint Herb Powder",
    "slug": "dried-garden-spearmint-herb-powder",
    "description": "Meticulously prepared Dried Garden Spearmint Herb Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 410,
    "original_price": 471,
    "rating": 4.6,
    "reviews_count": 68,
    "badge": "Pudina Pure",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 42,
    "low_stock_threshold": 5,
    "sku": "POW-022",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Mentha spicata",
      "Extraction Method": "Cold Milled",
      "Aroma Profile": "Refreshing, sweet herbal mint",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T23:23:11.300Z"
  },
  {
    "id": "prod-6-23",
    "name": "Celery Seed Seasoning Powder",
    "slug": "celery-seed-seasoning-powder",
    "description": "Meticulously prepared Celery Seed Seasoning Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 520,
    "rating": 4.9,
    "reviews_count": 81,
    "badge": "Culinary Salt Free",
    "gst_rate": 18,
    "stock_quantity": 49,
    "low_stock_threshold": 5,
    "sku": "POW-023",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Apium graveolens",
      "Extraction Method": "Micro Milled",
      "Aroma Profile": "Herbaceous celery, warm bitter",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T21:23:11.300Z"
  },
  {
    "id": "prod-6-24",
    "name": "Carom Ajwain Digestive Powder",
    "slug": "carom-ajwain-digestive-powder",
    "description": "Meticulously prepared Carom Ajwain Digestive Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 470,
    "rating": 4.7,
    "reviews_count": 94,
    "badge": "High Thymol",
    "gst_rate": 18,
    "stock_quantity": 56,
    "low_stock_threshold": 5,
    "sku": "POW-024",
    "category_id": 6,
    "image_url": "/images/spice-powders.jpg",
    "images": [
      "/images/spice-powders.jpg",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Trachyspermum ammi",
      "Extraction Method": "Fine Ground",
      "Aroma Profile": "Thyme-like, hot pungent",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T19:23:11.300Z"
  },
  {
    "id": "prod-6-25",
    "name": "Decorticated White Pepper Powder",
    "slug": "decorticated-white-pepper-powder",
    "description": "Meticulously prepared Decorticated White Pepper Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 790,
    "rating": 5,
    "reviews_count": 107,
    "badge": "Safed Mirch",
    "gst_rate": 18,
    "stock_quantity": 63,
    "low_stock_threshold": 5,
    "sku": "POW-025",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Piper nigrum",
      "Extraction Method": "Outer Husk Removed & Ground",
      "Aroma Profile": "Sharp heat, mild fermented warmth",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T17:23:11.300Z"
  },
  {
    "id": "prod-6-26",
    "name": "Sweet Hungarian Smoked Paprika",
    "slug": "sweet-hungarian-smoked-paprika",
    "description": "Meticulously prepared Sweet Hungarian Smoked Paprika from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 560,
    "rating": 4.8,
    "reviews_count": 120,
    "badge": "Oak Smoked",
    "gst_rate": 18,
    "stock_quantity": 15,
    "low_stock_threshold": 5,
    "sku": "POW-026",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Capsicum annuum",
      "Extraction Method": "Oak Wood Smoked & Ground",
      "Aroma Profile": "Smoky sweet, rich red pepper",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T15:23:11.300Z"
  },
  {
    "id": "prod-6-27",
    "name": "Pulverized Indian Bay Leaf Powder",
    "slug": "pulverized-indian-bay-leaf-powder",
    "description": "Meticulously prepared Pulverized Indian Bay Leaf Powder from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.",
    "price": 440,
    "original_price": 506,
    "rating": 4.6,
    "reviews_count": 133,
    "badge": "Tejpatta Ground",
    "discount": "-15%",
    "gst_rate": 18,
    "stock_quantity": 22,
    "low_stock_threshold": 5,
    "sku": "POW-027",
    "category_id": 6,
    "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    "images": [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      "/images/botanical-hero.jpg",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop"
    ],
    "status": "active",
    "specs": {
      "Botanical Name": "Cinnamomum tamala",
      "Extraction Method": "Micro Milled",
      "Aroma Profile": "Cinnamon herbal, aromatic leaf",
      "Purity": "100% Pure & Undiluted",
      "Grade": "Export Grade Certified"
    },
    "created_at": "2026-09-15T13:23:11.300Z"
  }
];
