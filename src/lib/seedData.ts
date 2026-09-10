// Programmatic seed data for 200 premium hair & scalp oil serums.
// Meticulously matched to replicate the Naturelle Hair Care boutique storefront products.

export interface Product {
  id: string;
  name: string;
  slug: string;
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
    id: 1,
    name: 'Essential Oils',
    slug: 'essential-oils',
    description: 'Pure Botanical Distillates',
    image_url: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Spice Oils',
    slug: 'spice-oils',
    description: 'Aromatic Spice Extracts',
    image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Spice Oleoresins',
    slug: 'spice-oleoresins',
    description: 'Concentrated Flavor Resins',
    image_url: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Floral Concretes',
    slug: 'floral-concretes',
    description: 'Natural Flower Waxes',
    image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Floral Absolutes',
    slug: 'floral-absolutes',
    description: 'Precious Fine Fragrances',
    image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Spice Powders',
    slug: 'spice-powders',
    description: 'Ground Sterilized Spices',
    image_url: 'https://images.unsplash.com/photo-1615396879814-490192568c37?q=80&w=200&auto=format&fit=crop'
  }
];

// Helper to generate unique products programmatically
const generateProducts = (): Product[] => {
  const products: Product[] = [];

  // Seed the exact first 6 products shown in the mockup:
  const firstSixProducts: Omit<Product, 'id' | 'created_at'>[] = [
    {
      name: "Cardamom Oil (Pure Steam Distilled)",
      slug: "cardamom-oil-pure-steam-distilled",
      sku: "ESS-001",
      price: 1850,
      original_price: 2100,
      rating: 5,
      reviews_count: 142,
      badge: "Bestseller",
      category_id: 1,
      image_url: "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
      ],
      stock_quantity: 45,
      low_stock_threshold: 5,
      gst_rate: 18,
      status: "active",
      description: "Extracted from premium Malabar green cardamom pods, our Cardamom Oil offers warm, spicy-sweet notes used in high-end fragrances, flavor houses, and pharmaceutical formulations worldwide.",
      specs: {
        "Botanical Name": "Elettaria cardamomum",
        "Extraction Method": "Steam Distillation",
        "Origin": "Western Ghats, India",
        "Aroma": "Warm, spicy, balsamic sweet",
        "Purity": "100% Pure & Undiluted"
      }
    },
    {
      name: "Black Pepper Oleoresin 40/20",
      slug: "black-pepper-oleoresin-40-20",
      sku: "OLE-001",
      price: 1450,
      rating: 5,
      reviews_count: 98,
      badge: "Export Quality",
      category_id: 3,
      image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"
      ],
      stock_quantity: 60,
      low_stock_threshold: 5,
      gst_rate: 18,
      status: "active",
      description: "Supercritical fluid extracted black pepper oleoresin containing high piperine content, ideal for seasoning blends, meat processing, and savory flavorings.",
      specs: {
        "Active Piperine": "40% min",
        "Volatile Oil": "20% v/w",
        "Solubility": "Oil & Alcohol Soluble",
        "Application": "Food, Beverage & Seasonings"
      }
    },
    {
      name: "Jasmine Grandiflorum Concrete",
      slug: "jasmine-grandiflorum-concrete",
      sku: "FLO-001",
      price: 3200,
      original_price: 3800,
      rating: 5,
      reviews_count: 215,
      discount: "-15%",
      category_id: 4,
      image_url: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
      ],
      stock_quantity: 12,
      low_stock_threshold: 3,
      gst_rate: 18,
      status: "active",
      description: "Hand-picked fresh night-blooming jasmine flowers processed immediately to yield a deeply floral, rich wax concrete essential for luxury perfumes.",
      specs: {
        "Flower Type": "Jasmine Grandiflorum",
        "Physical State": "Waxy solid paste",
        "Color": "Deep orange to brown",
        "Industry": "Fine Fragrance & Perfumery"
      }
    },
    {
      name: "Tuberose Floral Absolute",
      slug: "tuberose-floral-absolute",
      sku: "ABS-001",
      price: 4500,
      rating: 5,
      reviews_count: 176,
      badge: "Bestseller",
      category_id: 5,
      image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop"
      ],
      stock_quantity: 8,
      low_stock_threshold: 2,
      gst_rate: 18,
      status: "active",
      description: "Extremely precious floral absolute with rich, creamy white-floral intoxication. Highly prized in elite international perfumery.",
      specs: {
        "Botanical Source": "Polianthes tuberosa",
        "Grade": "100% Pure Perfumery Absolute",
        "Appearance": "Viscous reddish-brown liquid",
        "Scent Profile": "Narcotic floral, honeyed undertones"
      }
    },
    {
      name: "Ginger Oil (Fresh Rhizome)",
      slug: "ginger-oil-fresh-rhizome",
      sku: "SPI-001",
      price: 1250,
      rating: 5,
      reviews_count: 84,
      badge: "New Batch",
      category_id: 2,
      image_url: "https://images.unsplash.com/photo-1615396879814-490192568c37?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1615396879814-490192568c37?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop"
      ],
      stock_quantity: 35,
      low_stock_threshold: 5,
      gst_rate: 18,
      status: "active",
      description: "Steam-distilled from freshly harvested ginger rhizomes. Delivers crisp, warm citrus-spicy notes for food, beverages, and aromatherapy.",
      specs: {
        "Botanical Name": "Zingiber officinale",
        "Zingiberene Content": "35% min",
        "Refractive Index": "1.488 - 1.494",
        "Flavor Category": "Warm Spice & Zing"
      }
    },
    {
      name: "Sterilized Turmeric Powder 5% Curcumin",
      slug: "sterilized-turmeric-powder-5-curcumin",
      sku: "POW-001",
      price: 650,
      original_price: 800,
      rating: 5,
      reviews_count: 312,
      badge: "Bestseller",
      category_id: 6,
      image_url: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop"
      ],
      stock_quantity: 100,
      low_stock_threshold: 10,
      gst_rate: 18,
      status: "active",
      description: "Steam sterilized ground turmeric powder guaranteed high curcumin content. Free of synthetic colors and pathogens.",
      specs: {
        "Curcumin Content": "5.0% min",
        "Moisture": "< 10%",
        "Sterilization": "Steam Sterilized (Zero ETO)",
        "Mesh Size": "60 - 80 mesh"
      }
    }
  ];

  // Push the 6 hardcoded ones
  firstSixProducts.forEach((p, index) => {
    products.push({
      ...p,
      id: `prod-featured-${index + 1}`,
      created_at: new Date().toISOString()
    });
  });

  const oilImages = [
    'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop'
  ];

  const categoryTemplates = [
    {
      categoryId: 1, // Essential Oils
      prefix: ['Pure', 'Organic', 'Steam-Distilled', 'Botanical', 'Natural', 'Wildharvested', 'Virgin'],
      nouns: ['Eucalyptus Oil', 'Lemongrass Oil', 'Peppermint Oil', 'Lavender Oil', 'Tea Tree Oil', 'Cardamom Oil', 'Clove Oil'],
      suffixes: ['Grade A', 'Pure', 'Extract', 'Premium', 'Export Quality', 'Select', 'Distillate'],
      images: oilImages,
      specs: {
        'Purity': '100% Pure & Undiluted',
        'Method': 'Steam Distillation',
        'Industry': 'Flavor, Fragrance & Pharma'
      },
      basePrice: 1200,
      priceVar: 400
    },
    {
      categoryId: 2, // Spice Oils
      prefix: ['Ceylon', 'Malabar', 'Coorg', 'Indian', 'Rich', 'Aromatic', 'Golden'],
      nouns: ['Black Pepper Oil', 'Nutmeg Oil', 'Ginger Oil', 'Cinnamon Oil', 'Cumin Oil', 'Fennel Oil', 'Coriander Oil'],
      suffixes: ['Extract', 'Oil', 'Essence', 'Distillate', 'Concentrate', 'Pure', 'Premium'],
      images: oilImages,
      specs: {
        'Extraction': 'Steam Distilled Rhizomes & Seeds',
        'Solubility': 'Alcohol & Oil Soluble',
        'Application': 'Savory Flavors & Seasoning'
      },
      basePrice: 1400,
      priceVar: 500
    },
    {
      categoryId: 3, // Spice Oleoresins
      prefix: ['Supercritical', 'High-Potency', 'Concentrated', 'Standardized', 'Rich', 'Active', 'Soluble'],
      nouns: ['Capsicum Oleoresin', 'Turmeric Oleoresin', 'Paprika Oleoresin', 'Ginger Oleoresin', 'Garlic Oleoresin', 'Cardamom Oleoresin', 'Pepper Oleoresin'],
      suffixes: ['40/20', 'Extract', 'Liquid', 'Resin', 'Powder-Form', 'Standardized', 'Concentrate'],
      images: oilImages,
      specs: {
        'Active Principle': 'High Potency Active Resins',
        'Standardization': 'HPLC Verified',
        'Application': 'Food Processing & Sauces'
      },
      basePrice: 1600,
      priceVar: 600
    },
    {
      categoryId: 4, // Floral Concretes
      prefix: ['Fresh Bloom', 'Night Harvested', 'Grandiflorum', 'Sambac', 'Damask', 'Marigold', 'Lotus'],
      nouns: ['Jasmine Concrete', 'Rose Concrete', 'Tuberose Concrete', 'Champaca Concrete', 'Mimosa Concrete', 'Frangipani Concrete', 'Pink Lotus Concrete'],
      suffixes: ['Wax', 'Concrete', 'Paste', 'Perfumery Grade', 'Pure', 'Select', 'Essence'],
      images: oilImages,
      specs: {
        'State': 'Natural Waxy Paste',
        'Origin': 'South India Gardens',
        'Industry': 'Perfumery & Fragrance'
      },
      basePrice: 2800,
      priceVar: 800
    },
    {
      categoryId: 5, // Floral Absolutes
      prefix: ['Royal', 'Exquisite', 'Precious', 'Golden', 'Pure', 'Intense', 'Nectar'],
      nouns: ['Jasmine Absolute', 'Rose Absolute', 'Tuberose Absolute', 'Lotus Absolute', 'Champaca Absolute', 'Orris Absolute', 'Carnation Absolute'],
      suffixes: ['Absolute', 'Perfumery Pure', 'Nectar', 'Ultra-Fine', 'Grade 1', 'Extract', 'Essence'],
      images: oilImages,
      specs: {
        'Purity': '100% Pure Floral Absolute',
        'Scent': 'Deep Intoxicating Floral',
        'Grade': 'Fine Fragrance & High Perfumery'
      },
      basePrice: 4200,
      priceVar: 1200
    },
    {
      categoryId: 6, // Spice Powders
      prefix: ['Sterilized', 'Micro-Ground', 'Organic', 'Steam-Treated', 'Pure', 'Grade A', 'Select'],
      nouns: ['Turmeric Powder', 'Chilli Powder', 'Ginger Powder', 'Coriander Powder', 'Cumin Powder', 'Black Pepper Powder', 'Garlic Powder'],
      suffixes: ['5% Curcumin', '60 Mesh', 'Zero-ETO', 'Ground', 'Powder', 'Export Batch', 'Pure'],
      images: oilImages,
      specs: {
        'Sterilization': 'Steam Sterilized (Zero ETO)',
        'Mesh Size': '60-80 Mesh',
        'Application': 'Culinary & Industrial Food Production'
      },
      basePrice: 500,
      priceVar: 200
    }
  ];

  // Generate the remaining 194 products
  categoryTemplates.forEach((tpl) => {
    let count = products.filter(p => p.category_id === tpl.categoryId).length;
    // Iterate to generate up to 28 items per category to sum up to approx 200
    for (let p = 0; p < tpl.prefix.length; p++) {
      for (let n = 0; n < tpl.nouns.length; n++) {
        for (let s = 0; s < tpl.suffixes.length; s++) {
          if (count >= 28) break;

          const prefix = tpl.prefix[p];
          const noun = tpl.nouns[n];
          const suffix = tpl.suffixes[s];
          const name = `${prefix} ${noun} ${suffix}`;
          
          const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

          // Skip duplicate slugs
          if (products.some((existing) => existing.slug === slug)) {
            continue;
          }

          const skuPrefix = CATEGORIES.find(c => c.id === tpl.categoryId)?.slug.substring(0, 3).toUpperCase() || 'SER';
          const sku = `${skuPrefix}-${String(count + 1).padStart(3, '0')}`;
          
          const priceMultiplier = 0.7 + ((p + n + s) % 10) / 7;
          const price = Math.round(tpl.basePrice * priceMultiplier);
          
          const imageIdx = (p + n + s) % tpl.images.length;
          const image_url = tpl.images[imageIdx];
          
          const galleryImages = [
            image_url,
            tpl.images[(imageIdx + 1) % tpl.images.length],
            tpl.images[(imageIdx + 2) % tpl.images.length]
          ];

          const stock_quantity = 15 + ((p * n + s) % 45);

          const dynamicSpecs: Record<string, string> = {
            ...(tpl.specs as any),
            'Product SKU': sku,
            'Bottle Volume': `${50 + (p % 3) * 50} mL`,
            'Formulation Weight': `${110 + (p * 5) + (n * 3)}g`
          };

          const description = `The ${name} represents our premium botanical formulation for scalp activation and hair structure restoration. Formulated with dermatological precision and certified organics, it strengthens roots, controls fall, and accelerates hair shaft elasticity. Sulfate, paraben, and silicone free.`;

          products.push({
            id: `prod-gen-${tpl.categoryId}-${count}`,
            name,
            slug,
            description,
            price,
            gst_rate: 18,
            stock_quantity,
            low_stock_threshold: 5,
            sku,
            category_id: tpl.categoryId,
            image_url,
            images: galleryImages,
            status: 'active',
            specs: dynamicSpecs,
            created_at: new Date(Date.now() - (p * 24 + n) * 60 * 60 * 1000).toISOString()
          });

          count++;
        }
        if (count >= 28) break;
      }
      if (count >= 28) break;
    }
  });

  return products;
};

export const PRODUCTS: Product[] = generateProducts();
