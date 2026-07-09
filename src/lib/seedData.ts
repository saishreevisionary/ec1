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
    name: 'Hair Oils',
    slug: 'hair-oils',
    description: 'Nourish & Strengthen',
    image_url: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Hair Serums',
    slug: 'hair-serums',
    description: 'Smooth & Shine',
    image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Onion Range',
    slug: 'onion-range',
    description: 'Hair Fall Control',
    image_url: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Rosemary Range',
    slug: 'rosemary-range',
    description: 'Growth & Density',
    image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Amla Range',
    slug: 'amla-range',
    description: 'Nourishment',
    image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Bhringraj Range',
    slug: 'bhringraj-range',
    description: 'Repair & Restore',
    image_url: 'https://images.unsplash.com/photo-1615396879814-490192568c37?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 7,
    name: 'Combos',
    slug: 'combos',
    description: 'Best Value Deals',
    image_url: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=200&auto=format&fit=crop'
  }
];

// Helper to generate unique products programmatically
const generateProducts = (): Product[] => {
  const products: Product[] = [];

  // Seed the exact first 6 products shown in the mockup:
  const firstSixProducts: Omit<Product, 'id' | 'created_at'>[] = [
    {
      name: "Rosemary Hair Growth Oil",
      slug: "rosemary-hair-growth-oil",
      sku: "ROS-001",
      price: 549,
      original_price: 699,
      rating: 5,
      reviews_count: 125,
      badge: "Bestseller",
      category_id: 4,
      image_url: "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
      ],
      stock_quantity: 45,
      low_stock_threshold: 5,
      gst_rate: 18,
      status: "active",
      description: "Infused with pure cold-pressed rosemary leaf extracts, bhringraj, and amla, our Rosemary Hair Growth Oil actively nourishes the scalp ecosystem, strengthens roots, and triggers follicle density. A lightweight, non-sticky herbal formula suited for daily density boosting.",
      specs: {
        "Key Actives": "Rosemary Extract, Bhringraj, Amla",
        "Base Oils": "Cold-pressed Sesame & Argan lipids",
        "Texture": "Lightweight, quick-absorbing scalp oil",
        "Aromatic Profile": "Fresh herbal, rosemary leaf & mint",
        "Ideal For": "Hair thinning, follicle activation, scalp dry flaking",
        "Directions": "Massage 5 drops onto scalp pre-wash, or leave overnight."
      }
    },
    {
      name: "Hair Serum - Silk & Shine",
      slug: "hair-serum-silk-shine",
      sku: "SER-001",
      price: 599,
      rating: 5,
      reviews_count: 98,
      badge: "New",
      category_id: 2,
      image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"
      ],
      stock_quantity: 60,
      low_stock_threshold: 5,
      gst_rate: 18,
      status: "active",
      description: "A molecular-level bond-building smoothing fluid. Hair Serum Silk & Shine seals damaged cuticles, controls static frizz, and gives an instant glossy sheen. Formulated with hydrolyzed keratin proteins and wheat germ oils.",
      specs: {
        "Key Actives": "Hydrolyzed Keratin, Wheat Germ Lipids",
        "Texture": "Smooth fluid serum, zero weight",
        "Scent Family": "Fresh bergamot & white blossoms",
        "Benefits": "Thermal screen up to 230°C, instant anti-frizz shine",
        "Directions": "Apply 2 pumps to damp lengths before styling."
      }
    },
    {
      name: "Onion Hair Oil",
      slug: "onion-hair-oil-1",
      sku: "ONI-001",
      price: 509,
      original_price: 699,
      rating: 5,
      reviews_count: 215,
      discount: "-15%",
      category_id: 3,
      image_url: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
      ],
      stock_quantity: 8,
      low_stock_threshold: 5,
      gst_rate: 18,
      status: "active",
      description: "Rich in sulfur, potassium, and antioxidants, our Onion Hair Oil actively reduces breakage, anchors root fibers, and controls hair fall. Balanced with black seed oil and vitamin E for cuticle structural reinforcement.",
      specs: {
        "Key Actives": "Red Onion Extract, Black Seed Oil, Vitamin E",
        "Base Oils": "Pure cold-pressed coconut & sweet almond oil",
        "Texture": "Rich nourishing oil",
        "Scent Profile": "Deodorized sweet lavender & tea tree blend",
        "Key Benefit": "Breaks hair fall loops, boosts hair shaft elasticity",
        "Directions": "Apply to roots twice weekly pre-wash."
      }
    },
    {
      name: "Onion Hair Oil (Premium)",
      slug: "onion-hair-oil-premium",
      sku: "ONI-002",
      price: 499,
      rating: 5,
      reviews_count: 176,
      badge: "Bestseller",
      category_id: 3,
      image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop"
      ],
      stock_quantity: 2,
      low_stock_threshold: 3,
      gst_rate: 18,
      status: "active",
      description: "An advanced, high-potency edition of our signature red onion formulation. Enriched with botanical extracts of curry leaves and ginger root to stimulate follicle blood flow and accelerate density recovery.",
      specs: {
        "Key Actives": "Onion VPA, Ginger Extract, Curry Leaves",
        "Aromatic Profile": "Ginger & tea tree leaves",
        "Benefit": "Anti-hair fall and scalp clarify",
        "Volume": "200 mL"
      }
    },
    {
      name: "Bhringraj Hair Oil",
      slug: "bhringraj-hair-oil",
      sku: "BHR-001",
      price: 549,
      rating: 5,
      reviews_count: 84,
      badge: "New",
      category_id: 6,
      image_url: "https://images.unsplash.com/photo-1615396879814-490192568c37?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1615396879814-490192568c37?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop"
      ],
      stock_quantity: 35,
      low_stock_threshold: 5,
      gst_rate: 18,
      status: "active",
      description: "An ancient Ayurvedic preparation. Bhringraj Hair Oil, derived from the 'king of herbs', actively repairs damaged cuticles, restores split ends, and controls premature graying. It cools the scalp and delivers deep root nourishment.",
      specs: {
        "Key Actives": "Bhringraj (False Daisy), Amla, Centella",
        "Base Oils": "Cold-pressed black sesame oil",
        "Texture": "Rich, cooling herbal oil",
        "Scent Family": "Earthy botanical, cooling camphor",
        "Key Benefit": "Repairs lengths, cools scalp, prevents premature graying"
      }
    },
    {
      name: "Ultimate Hair Care Combo",
      slug: "ultimate-hair-care-combo",
      sku: "COM-001",
      price: 1299,
      original_price: 1699,
      rating: 5,
      reviews_count: 312,
      badge: "Bestseller",
      category_id: 7,
      image_url: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop"
      ],
      stock_quantity: 15,
      low_stock_threshold: 5,
      gst_rate: 18,
      status: "active",
      description: "Our complete 3-step root stimulation and lengths repair program in one set. Features the Rosemary Growth Oil (30ml) to activate follicles, the Silk & Shine Serum (50ml) for length styling, and the red onion root tonic.",
      specs: {
        "Set Inclusions": "Rosemary Growth Oil (30ml), Silk Serum (50ml), Onion Oil (100ml)",
        "Targets": "Complete root-to-tip styling, hair fall control & density recovery",
        "Duration": "Approx. 45 days routine supply",
        "Sustainability": "100% glass amber jars in recyclable kraft boxes"
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
      categoryId: 1, // Oils
      prefix: ['Aura', 'Nourishing', 'Restoring', 'Saddle', 'Satin', 'Botanical', 'Herbal'],
      nouns: ['Scalp Lipid', 'Renewal Oil', 'Hydrating Drops', 'Glossing Oil', 'Follicle Feed', 'Root Drop', 'Cuticle Elixir'],
      suffixes: ['No. 02', 'Organic', 'Select', 'Premium', 'Active', 'Reserve', 'Duo'],
      images: oilImages,
      specs: {
        'Main Infusion': 'Cold pressed herbal oils',
        'Texture': 'Light non-greasy lipid drops',
        'Aroma': 'Mandarin and Lavender extract'
      },
      basePrice: 399,
      priceVar: 150
    },
    {
      categoryId: 2, // Serums
      prefix: ['Peptide', 'Molecular', 'Cellular', 'Keratin', 'Silk', 'Restorative', 'Aero'],
      nouns: ['Bond Builder', 'Follicle Serum', 'Density Booster', 'Shine Serum', 'Protective Fluid', 'Anti-Frizz Drops', 'Repair Drop'],
      suffixes: ['Clinical', 'Max', 'Pro', 'Ultra', 'Duo', 'Formula', 'Fortified'],
      images: oilImages,
      specs: {
        'Key Actives': 'Multi-peptides, Keratin lipids',
        'pH Balance': '5.5 scalp friendly',
        'Scent': 'Bergamot & Citrus leaf'
      },
      basePrice: 499,
      priceVar: 200
    },
    {
      categoryId: 3, // Onion Range
      prefix: ['Red Onion', 'Sulfur-Active', 'Root-Anchor', 'Black Seed', 'Breakage Control'],
      nouns: ['Follicle Oil', 'Black Seed Tonic', 'Density Mist', 'Onion Hydrosol', 'Breakage Repair Fluid'],
      suffixes: ['Clinical', 'Active', 'Organics', 'VPA', 'Drops'],
      images: oilImages,
      specs: {
        'Active': 'Sulfur-rich red onion extract',
        'Key Benefit': 'Locks hair bulb, stops hair fall'
      },
      basePrice: 349,
      priceVar: 120
    },
    {
      categoryId: 4, // Rosemary Range
      prefix: ['Rosemary Leaf', 'Density Boost', 'Follicle Stimulating', 'Scalp Care', 'Herb-Active'],
      nouns: ['Growth Drops', 'Scalp Tonic', 'Follicle Fluid', 'Density Booster', 'Mint Rosemary Oil'],
      suffixes: ['Active', 'clinical', 'Max', 'Pro 5%', 'Organic'],
      images: oilImages,
      specs: {
        'Active': 'Rosemary extract, tea tree oil',
        'Benefit': 'Triggers bulb division, speeds growth'
      },
      basePrice: 449,
      priceVar: 180
    },
    {
      categoryId: 5, // Amla Range
      prefix: ['Amla Gold', 'Vitamin C', 'Nourishing', 'Herbal', 'Fortified'],
      nouns: ['Amla Oil', 'Nourish Elixir', 'Root Feed', 'Follicle Feed', 'Shine Drops'],
      suffixes: ['Pure', 'Classic', 'Organic', 'Absolute', 'Active'],
      images: oilImages,
      specs: {
        'Active': 'Pure gooseberry extracts (Amla)',
        'Benefit': 'Nourishes lengths, strengthens fibers'
      },
      basePrice: 299,
      priceVar: 100
    },
    {
      categoryId: 6, // Bhringraj Range
      prefix: ['Ayurvedic', 'Bhringraj Pure', 'False Daisy', 'Earthy', 'Root Renewal'],
      nouns: ['Scalp Tonic', 'Exfoliant Oil', 'Darkening Oil', 'Scalp Clay', 'Renewal Drops'],
      suffixes: ['Therapy', 'Tonic', 'Scrub', 'Toner', 'Extract'],
      images: oilImages,
      specs: {
        'Active': 'Bhringraj leaves extract',
        'Benefit': 'Restores damaged bonds, cools scalp'
      },
      basePrice: 429,
      priceVar: 150
    },
    {
      categoryId: 7, // Combos
      prefix: ['Complete Routine', 'Discovery Trial', 'Total Density', 'Scalp Therapy', 'Starter Set'],
      nouns: ['Bundle Routine', 'Trio Pack', 'Essentials Bag', 'Duo Pack', 'Restoration Kit'],
      suffixes: ['Set', 'Routine', 'Trio', 'Kit', 'Bundle'],
      images: oilImages,
      specs: {
        'Inclusions': 'Oils (50ml) + Serums (30ml)',
        'Benefit': 'Complete structural restoration program'
      },
      basePrice: 999,
      priceVar: 500
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
