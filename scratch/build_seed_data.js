const fs = require('fs');

const CATEGORIES = [
  {
    id: 1,
    name: 'Essential Oils',
    slug: 'essential-oils',
    description: 'Pure Botanical Distillates',
    image_url: '/images/botanical-hero.jpg'
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
    image_url: '/images/spice-powders.jpg'
  }
];

const BOTANICAL_IMAGES = [
  'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop',
  '/images/botanical-hero.jpg',
  'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop',
  '/images/spice-powders.jpg',
  'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1608248597481-8b2b7a97491d?q=80&w=600&auto=format&fit=crop'
];

const CATEGORY_ITEMS = require('./validate_dataset').CATEGORY_ITEMS || {
  1: [
    { name: "Bulgarian Lavender Essential Oil", price: 1450, badge: "Export Grade", bot: "Lavandula angustifolia", method: "Steam Distilled", aroma: "Floral, herbaceous, calming" },
    { name: "Australian Tea Tree Essential Oil", price: 980, badge: "Pure Therapeutic", bot: "Melaleuca alternifolia", method: "Steam Distilled", aroma: "Crisp, medicinal, fresh" },
    { name: "Peppermint Arvensis Pure Oil", price: 820, badge: "High Menthol", bot: "Mentha arvensis", method: "Steam Distilled", aroma: "Cool, minty, invigorating" },
    { name: "Blue Eucalyptus Globulus 80/85", price: 750, badge: "Pharma Grade", bot: "Eucalyptus globulus", method: "Steam Distilled", aroma: "Fresh, camphoraceous" },
    { name: "French Rosemary Verbenone Oil", price: 1150, badge: "Aromatherapy", bot: "Rosmarinus officinalis", method: "Steam Distilled", aroma: "Clean, herbaceous, woody" },
    { name: "Italian Bergamot Calabrian Oil", price: 1650, badge: "Bergapten Free", bot: "Citrus bergamia", method: "Cold Pressed", aroma: "Bright citrus, spicy floral" },
    { name: "Spanish Sweet Orange Cold-Pressed", price: 680, badge: "100% Pure", bot: "Citrus sinensis", method: "Cold Pressed", aroma: "Sweet, radiant, citrusy" },
    { name: "Lemongrass Cochin Pure Oil", price: 720, badge: "High Citral", bot: "Cymbopogon flexuosus", method: "Steam Distilled", aroma: "Lemony, earthy, sharp" },
    { name: "Madagascar Clove Bud Distillate", price: 1280, badge: "High Eugenol", bot: "Syzygium aromaticum", method: "Steam Distilled", aroma: "Warm, spicy, pungent" },
    { name: "Frankincense Serrata Sacred Oil", price: 2100, badge: "Wild Harvested", bot: "Boswellia serrata", method: "Hydro Distilled", aroma: "Resinous, woody, meditative" },
    { name: "Atlas Cedarwood Virginiana Oil", price: 890, badge: "Aged Wood", bot: "Cedrus atlantica", method: "Steam Distilled", aroma: "Deep, woody, rich balsamic" },
    { name: "Geranium Bourbon Floral Oil", price: 1750, badge: "Perfumery Grade", bot: "Pelargonium graveolens", method: "Steam Distilled", aroma: "Rosy, sweet, uplifting" },
    { name: "Vetiver Bourbon Roots Oil", price: 2250, badge: "Aged Vintage", bot: "Chrysopogon zizanioides", method: "Steam Distilled", aroma: "Deep, earthy, smoky wood" },
    { name: "Ylang Ylang Extra First Press", price: 1950, badge: "Fine Fragrance", bot: "Cananga odorata", method: "Fractional Distillation", aroma: "Intense, exotic, floral sweet" },
    { name: "Sweet Basil Linalool Grade Oil", price: 920, badge: "Organic", bot: "Ocimum basilicum", method: "Steam Distilled", aroma: "Sweet, herbal, spicy anise" },
    { name: "French Clary Sage Pure Oil", price: 1580, badge: "Therapeutic", bot: "Salvia sclarea", method: "Steam Distilled", aroma: "Earthy, sweet, herbaceous" },
    { name: "Patchouli Dark Aged Botanical Oil", price: 1850, badge: "Triple Distilled", bot: "Pogostemon cablin", method: "Steam Distilled", aroma: "Rich, earthy, musky sweet" },
    { name: "Roman Chamomile Fine Distillate", price: 2400, badge: "Rare Batch", bot: "Anthemis nobilis", method: "Steam Distilled", aroma: "Sweet, apple-like, soothing" },
    { name: "Evergreen Italian Cypress Oil", price: 1050, badge: "Pure Botanical", bot: "Cupressus sempervirens", method: "Steam Distilled", aroma: "Fresh, woody, evergreen" },
    { name: "Wild Juniper Berry Alpine Oil", price: 1420, badge: "Wild Forest", bot: "Juniperus communis", method: "Steam Distilled", aroma: "Crisp, piney, peppered wood" },
    { name: "Palmarosa Motia Pure Extract", price: 880, badge: "High Geraniol", bot: "Cymbopogon martinii", method: "Steam Distilled", aroma: "Rose-like, grassy, sweet" },
    { name: "Red Thyme Thymol Active Oil", price: 1120, badge: "Potent Bioactive", bot: "Thymus vulgaris", method: "Steam Distilled", aroma: "Intense, medicinal, warm herb" },
    { name: "Somalian Myrrh Resin Distillate", price: 2150, badge: "Sacred Grade", bot: "Commiphora myrrha", method: "Steam Distilled", aroma: "Warm balsamic, smoky, bitter-sweet" },
    { name: "Corsican Helichrysum Italicum", price: 2480, badge: "Everlasting", bot: "Helichrysum italicum", method: "Steam Distilled", aroma: "Honeyed, tea-like, herbaceous" },
    { name: "Black Spruce Wild Forest Needle", price: 1320, badge: "Nordic Harvest", bot: "Picea mariana", method: "Steam Distilled", aroma: "Crisp coniferous, balsamic" },
    { name: "Madagascar Ravintsara Cineole", price: 1180, badge: "1,8-Cineole 60%", bot: "Cinnamomum camphora", method: "Steam Distilled", aroma: "Fresh, clear eucalyptus tone" },
    { name: "Ruby Pink Grapefruit Cold-Pressed", price: 780, badge: "Fresh Harvest", bot: "Citrus paradisi", method: "Cold Pressed", aroma: "Tangy, sparkling citrus" }
  ],
  2: [
    { name: "Malabar Black Pepper Steam Distilled", price: 1650, badge: "Bestseller", bot: "Piper nigrum", method: "Steam Distilled", aroma: "Dry, spicy, woody warm" },
    { name: "Ceylon Cinnamon Bark Grade 1", price: 2350, badge: "True Cinnamon", bot: "Cinnamomum verum", method: "Steam Distilled", aroma: "Rich, warm spicy, sweet" },
    { name: "Myristica Nutmeg Kernel Oil", price: 1520, badge: "Export Grade", bot: "Myristica fragrans", method: "Steam Distilled", aroma: "Nutty, spicy, warm balsamic" },
    { name: "Golden Mace Blade Steam Distillate", price: 1880, badge: "Rare Extract", bot: "Myristica fragrans", method: "Steam Distilled", aroma: "Refined spicy, elegant, warm" },
    { name: "Rajasthan Cumin Seed Pure Oil", price: 1420, badge: "Pure Spice", bot: "Cuminum cyminum", method: "Steam Distilled", aroma: "Warm, earthy, pungent" },
    { name: "Green Coriander Seed Essential Oil", price: 1150, badge: "High Linalool", bot: "Coriandrum sativum", method: "Steam Distilled", aroma: "Sweet, woody, spicy citrus" },
    { name: "Sweet Fennel Seed Anethole Oil", price: 980, badge: "Pharma Grade", bot: "Foeniculum vulgare", method: "Steam Distilled", aroma: "Anise-like, sweet, licorice" },
    { name: "Star Anise Seed Terpene Oil", price: 1250, badge: "85% Anethole", bot: "Illicium verum", method: "Steam Distilled", aroma: "Sweet licorice, pungent" },
    { name: "Carom Ajwain Thymol Seed Oil", price: 1100, badge: "High Bioactive", bot: "Trachyspermum ammi", method: "Steam Distilled", aroma: "Thyme-like, hot pungent" },
    { name: "Fenugreek Seed Hydro-Distillate", price: 1380, badge: "Pure Extract", bot: "Trigonella foenum-graecum", method: "Hydro Distilled", aroma: "Celery-like, warm maple" },
    { name: "Caraway Seed Pure Carvone Oil", price: 1220, badge: "Culinary Grade", bot: "Carum carvi", method: "Steam Distilled", aroma: "Sweet spicy, rye-like" },
    { name: "Indian Anethum Dill Seed Oil", price: 940, badge: "Pure Herb", bot: "Anethum graveolens", method: "Steam Distilled", aroma: "Herbaceous, warm, slight spicy" },
    { name: "Black Mustard Seed Volatile Oil", price: 1050, badge: "High Allyl", bot: "Brassica nigra", method: "Steam Distilled", aroma: "Sharp, pungent, penetrating" },
    { name: "Celery Seed High Phthalide Oil", price: 1480, badge: "Flavor Grade", bot: "Apium graveolens", method: "Steam Distilled", aroma: "Warm, herbal, celery soup" },
    { name: "Asafoetida Gum Purified Oil", price: 2450, badge: "Ultra Concentrated", bot: "Ferula assa-foetida", method: "Steam Distilled", aroma: "Sulfurous, garlicky pungent" },
    { name: "Tejpat Indian Bay Leaf Oil", price: 1120, badge: "Wild Harvest", bot: "Cinnamomum tamala", method: "Steam Distilled", aroma: "Cinnamon-clove, sweet leaf" },
    { name: "Alleppey Green Cardamom Pod Oil", price: 2100, badge: "Gold Standard", bot: "Elettaria cardamomum", method: "Steam Distilled", aroma: "Sweet spicy, eucalyptus note" },
    { name: "Pimento Allspice Berry Oil", price: 1750, badge: "Authentic", bot: "Pimenta dioica", method: "Steam Distilled", aroma: "Clove, cinnamon, nutmeg blend" },
    { name: "Decorticated White Pepper Oil", price: 1820, badge: "Export Grade", bot: "Piper nigrum", method: "Steam Distilled", aroma: "Sharp, peppery, fermented warmth" },
    { name: "Curcuma Turmeric Rhizome Oil", price: 1350, badge: "High Turmerone", bot: "Curcuma longa", method: "Steam Distilled", aroma: "Woody, spicy, earthy root" },
    { name: "Zanzibar Clove Stem Distillate", price: 1180, badge: "Industrial Grade", bot: "Syzygium aromaticum", method: "Steam Distilled", aroma: "Deep clove, spicy, woody" },
    { name: "Fresh Murraya Curry Leaf Oil", price: 1550, badge: "Rare Botanical", bot: "Murraya koenigii", method: "Steam Distilled", aroma: "Curry spice, herbal, sulfurous" },
    { name: "Long Pepper Pippali Superfine", price: 1950, badge: "Ayurvedic Grade", bot: "Piper retrofractum", method: "Steam Distilled", aroma: "Sweet, pungent, complex pepper" },
    { name: "Cassia Cinnamomum Bark Oil", price: 1400, badge: "High Cinnamaldehyde", bot: "Cinnamomum cassia", method: "Steam Distilled", aroma: "Strong, warm spicy, sweet" },
    { name: "Indonesian Cubeb Tail Pepper Oil", price: 1680, badge: "Fine Distillate", bot: "Piper cubeba", method: "Steam Distilled", aroma: "Camphoraceous, peppery, clean" },
    { name: "Kashmiri Saffron Infused Extract", price: 2480, badge: "Precious Batch", bot: "Crocus sativus", method: "Supercritical CO2", aroma: "Floral honey, hay-like, golden" },
    { name: "Allium Sativum Hydro-Distillate", price: 1280, badge: "Garlic Extract", bot: "Allium sativum", method: "Hydro Distilled", aroma: "True garlic, allicin rich" }
  ],
  3: [
    { name: "Capsicum Oleoresin 1 Million SHU", price: 1750, badge: "Standardized", bot: "Capsicum annuum", method: "Solvent Extracted", aroma: "Intensely pungent, fiery heat" },
    { name: "Paprika Oleoresin 100,000 CU", price: 1250, badge: "Natural Colorant", bot: "Capsicum annuum", method: "Solvent Extracted", aroma: "Sweet red pepper, mild warm" },
    { name: "Ginger Supercritical CO2 Oleoresin", price: 1850, badge: "Solvent Free", bot: "Zingiber officinale", method: "Supercritical CO2", aroma: "Sharp, pungent ginger zesty" },
    { name: "Green Cardamom Flavor Oleoresin", price: 2400, badge: "High Volatile", bot: "Elettaria cardamomum", method: "Supercritical CO2", aroma: "Sweet spicy, fresh crushed pod" },
    { name: "Turmeric 95% Curcuminoid Resin", price: 1650, badge: "Pharma Grade", bot: "Curcuma longa", method: "Ethanol Extraction", aroma: "Rich earthy, bitter tonic" },
    { name: "Clove Bud 85% Eugenol Oleoresin", price: 1920, badge: "Export Batch", bot: "Syzygium aromaticum", method: "Solvent Extracted", aroma: "Strong clove, numbing spice" },
    { name: "Nutmeg Volatile High-Yield Resin", price: 1580, badge: "Flavor House", bot: "Myristica fragrans", method: "Solvent Extracted", aroma: "Warm nutmeg, sweet woody" },
    { name: "Celery Seed Aromatic Food Resin", price: 1450, badge: "Savory Blends", bot: "Apium graveolens", method: "Solvent Extracted", aroma: "Concentrated celery, herbal" },
    { name: "Coriander Seed Rich Culinary Resin", price: 1320, badge: "Seasoning Grade", bot: "Coriandrum sativum", method: "Solvent Extracted", aroma: "Warm citrus spice, woody" },
    { name: "Cumin High Cuminaldehyde Resin", price: 1550, badge: "Curry Formulations", bot: "Cuminum cyminum", method: "Solvent Extracted", aroma: "Deep toasted cumin, roasted" },
    { name: "Fennel Sweet Anethole Oleoresin", price: 1380, badge: "Pure Flavor", bot: "Foeniculum vulgare", method: "Solvent Extracted", aroma: "Sweet licorice anise" },
    { name: "Fenugreek Maple-Note Bio-Resin", price: 1480, badge: "Sotolon Rich", bot: "Trigonella foenum-graecum", method: "Solvent Extracted", aroma: "Roasted maple, savory herbal" },
    { name: "Pure Garlic Concentrated Bio-Resin", price: 1620, badge: "Food Processing", bot: "Allium sativum", method: "Supercritical CO2", aroma: "Fresh garlic clove punch" },
    { name: "Dehydrated Onion Flavor Oleoresin", price: 1280, badge: "Savory Snack", bot: "Allium cepa", method: "Solvent Extracted", aroma: "Caramelized onion, savory" },
    { name: "Cinnamon Bark Cinnamaldehyde Resin", price: 2150, badge: "Sweet Spice", bot: "Cinnamomum verum", method: "Supercritical CO2", aroma: "Intense sweet cinnamon" },
    { name: "Chinese Cassia Dark Viscous Resin", price: 1420, badge: "Industrial Seasoning", bot: "Cinnamomum cassia", method: "Solvent Extracted", aroma: "Heavy spicy, woody bark" },
    { name: "Rosemary Carnosic Acid Antioxidant", price: 1980, badge: "Natural Preservative", bot: "Rosmarinus officinalis", method: "Supercritical CO2", aroma: "Clean herbal, woody" },
    { name: "Mustard Allyl Isothiocyanate Resin", price: 1350, badge: "Hot Condiment", bot: "Brassica juncea", method: "Solvent Extracted", aroma: "Wasabi-like, nasal pungency" },
    { name: "Golden Mace Blade Superfine Resin", price: 1890, badge: "Meat Seasoning", bot: "Myristica fragrans", method: "Solvent Extracted", aroma: "Delicate warm spice" },
    { name: "White Pepper Piperine Bio-Resin", price: 1720, badge: "Light Sauces", bot: "Piper nigrum", method: "Supercritical CO2", aroma: "Clean heat, fermented pepper" },
    { name: "Star Anise Shikimic Acid Resin", price: 1680, badge: "Beverage Grade", bot: "Illicium verum", method: "Supercritical CO2", aroma: "Rich licorice, sweet spice" },
    { name: "Laurel Bay Leaf Culinary Oleoresin", price: 1440, badge: "Canned Foods", bot: "Laurus nobilis", method: "Solvent Extracted", aroma: "Aromatic herbal, sweet bay" },
    { name: "Organic Tamarind Concentrate Resin", price: 980, badge: "Tart Sweet", bot: "Tamarindus indica", method: "Aqueous Extraction", aroma: "Tangy tart, fruity sour" },
    { name: "Ferula Asafoetida Compounded Resin", price: 2300, badge: "Traditional", bot: "Ferula assa-foetida", method: "Gum Resin Extract", aroma: "Intense savory, umami note" },
    { name: "Jamaican Pimento Allspice Oleoresin", price: 1820, badge: "Multi-Spice", bot: "Pimenta dioica", method: "Solvent Extracted", aroma: "Clove and nutmeg fusion" },
    { name: "Dill Weed Soluble Emulsion Resin", price: 1260, badge: "Pickle Seasoning", bot: "Anethum graveolens", method: "Supercritical CO2", aroma: "Fresh dill herb, caraway" },
    { name: "Curry Leaf Bioactive Flavor Resin", price: 1590, badge: "South Indian", bot: "Murraya koenigii", method: "Supercritical CO2", aroma: "Tempered curry leaves" }
  ],
  4: [
    { name: "Jasmine Sambac Heavy Waxy Concrete", price: 3400, badge: "Mogra Pure", bot: "Jasminum sambac", method: "Hexane Extraction", aroma: "Intoxicating, green floral, sensual" },
    { name: "Bulgarian Damask Rose Concrete", price: 4200, badge: "Rose Valley", bot: "Rosa damascena", method: "Hydrocarbon Extracted", aroma: "Deep rich honey rose, waxy" },
    { name: "Polianthes Tuberose Waxy Concrete", price: 3850, badge: "Night Bloom", bot: "Polianthes tuberosa", method: "Solvent Extraction", aroma: "Creamy white floral, narcotic" },
    { name: "Royal Champaca Golden Concrete", price: 4500, badge: "Temple Flower", bot: "Michelia champaca", method: "Solvent Extraction", aroma: "Warm floral, fruity tea note" },
    { name: "Grasse Mimosa Dealbata Concrete", price: 3600, badge: "Spring Bloom", bot: "Acacia dealbata", method: "Solvent Extraction", aroma: "Powdery sweet, honey violet" },
    { name: "Sacred Blue Lotus Nymphaea Concrete", price: 4600, badge: "Rare Sacred", bot: "Nymphaea caerulea", method: "Solvent Extraction", aroma: "Ethereal, sweet aqueous floral" },
    { name: "Pink Water Lotus Nelumbo Concrete", price: 4400, badge: "South India", bot: "Nelumbo nucifera", method: "Solvent Extraction", aroma: "Delicate powdery lotus, aquatic" },
    { name: "Plumeria Frangipani Temple Concrete", price: 3900, badge: "Tropical Floral", bot: "Plumeria rubra", method: "Solvent Extraction", aroma: "Lush tropical, creamy almond" },
    { name: "Tunisian Orange Blossom Neroli", price: 4100, badge: "Pure Orange", bot: "Citrus aurantium", method: "Solvent Extraction", aroma: "Crisp white floral, citrusy" },
    { name: "Cape Jasmine Gardenia Concrete", price: 3750, badge: "White Flower", bot: "Gardenia jasminoides", method: "Solvent Extraction", aroma: "Lush, green white floral" },
    { name: "French Carnation Dianthus Concrete", price: 3500, badge: "Spicy Floral", bot: "Dianthus caryophyllus", method: "Solvent Extraction", aroma: "Clove-like, rich spicy floral" },
    { name: "Osmanthus Fragrans Golden Concrete", price: 4350, badge: "Apricot Floral", bot: "Osmanthus fragrans", method: "Solvent Extraction", aroma: "Ripe peach, leathery apricot" },
    { name: "Indian Marigold Tagetes Concrete", price: 2650, badge: "Festive Gold", bot: "Tagetes erecta", method: "Solvent Extraction", aroma: "Herbaceous, fruity green, tangy" },
    { name: "Night Blooming Jasmine Cestrum", price: 3300, badge: "Queen of Night", bot: "Cestrum nocturnum", method: "Solvent Extraction", aroma: "Deep, intense evening floral" },
    { name: "White Narcissus Poeticus Concrete", price: 4150, badge: "Wild Narcissus", bot: "Narcissus poeticus", method: "Solvent Extraction", aroma: "Green floral, hay-like, animalic" },
    { name: "Provence Jonquil Flower Concrete", price: 3950, badge: "French Grasse", bot: "Narcissus jonquilla", method: "Solvent Extraction", aroma: "Honey, floral sweet, rich" },
    { name: "Kewra Pandanus Floral Concrete", price: 3100, badge: "Orissa Heritage", bot: "Pandanus fascicularis", method: "Hydrocarbon Extracted", aroma: "Hyacinth sweet, honey floral" },
    { name: "White Rose Alba Botanical Concrete", price: 4450, badge: "Ancient Rose", bot: "Rosa alba", method: "Solvent Extraction", aroma: "Soft, crystalline rose petal" },
    { name: "Wild Honeysuckle Lonicera Concrete", price: 3650, badge: "Sweet Nectar", bot: "Lonicera caprifolium", method: "Solvent Extraction", aroma: "Fresh honey, sweet floral" },
    { name: "Egyptian Violet Leaf Floral Concrete", price: 3800, badge: "Green Ozone", bot: "Viola odorata", method: "Solvent Extraction", aroma: "Green cucumber, fresh grass" },
    { name: "White Magnolia Grandiflora Concrete", price: 4250, badge: "Cream Petal", bot: "Magnolia grandiflora", method: "Solvent Extraction", aroma: "Creamy citrus, opulent floral" },
    { name: "Spring Hyacinth Orientalis Concrete", price: 3700, badge: "Green Spring", bot: "Hyacinthus orientalis", method: "Solvent Extraction", aroma: "Crisp green, heady floral" },
    { name: "Haute-Provence Lavender Concrete", price: 2950, badge: "Herbaceous Rose", bot: "Lavandula angustifolia", method: "Solvent Extraction", aroma: "Sweet herbal, coumarin note" },
    { name: "Madagascan Ylang Ylang Concrete", price: 3250, badge: "Exotic Island", bot: "Cananga odorata", method: "Solvent Extraction", aroma: "Balsamic, heady tropical" },
    { name: "Sweet Marjoram Blossom Concrete", price: 2850, badge: "Subtle Herbal", bot: "Origanum majorana", method: "Solvent Extraction", aroma: "Aromatic spicy, sweet herbal" },
    { name: "Corsican Everlasting Immortelle", price: 4100, badge: "Golden Sun", bot: "Helichrysum italicum", method: "Solvent Extraction", aroma: "Curry, maple syrup, hay" },
    { name: "Spanish Golden Broom Genista", price: 3550, badge: "Honey Floral", bot: "Spartium junceum", method: "Solvent Extraction", aroma: "Sweet hay, dried fruit honey" }
  ],
  5: [
    { name: "Jasmine Sambac Superfine Absolute", price: 5200, badge: "Grade A", bot: "Jasminum sambac", method: "Alcohol Extraction of Concrete", aroma: "Deep, sensual, narcotic white floral" },
    { name: "Jasmine Grandiflorum Pure Absolute", price: 4900, badge: "Perfumery Classic", bot: "Jasminum grandiflorum", method: "Alcohol Extraction of Concrete", aroma: "Rich, velvety sweet jasmine" },
    { name: "Centifolia Rose de Mai Pure Absolute", price: 6800, badge: "Grasse Vintage", bot: "Rosa centifolia", method: "Alcohol Extraction of Concrete", aroma: "Rich honeyed floral, warm spicy" },
    { name: "Bulgarian Damask Rose Otto Absolute", price: 7400, badge: "Royal Perfume", bot: "Rosa damascena", method: "Alcohol Extraction of Concrete", aroma: "Intense classic rose, deep honey" },
    { name: "Royal Golden Champaca Absolute", price: 6200, badge: "Precious Fragrance", bot: "Michelia champaca", method: "Alcohol Extraction of Concrete", aroma: "Opulent tropical floral, dried apricot" },
    { name: "Sacred Egyptian Blue Lotus Absolute", price: 7100, badge: "Fine Nectar", bot: "Nymphaea caerulea", method: "Alcohol Extraction of Concrete", aroma: "Deep aquatic floral, transcendental" },
    { name: "White Water Lotus Pure Absolute", price: 6600, badge: "Sacred Lotus", bot: "Nelumbo nucifera", method: "Alcohol Extraction of Concrete", aroma: "Clean, sweet powdered floral" },
    { name: "Neroli Bigarade Blossom Absolute", price: 5800, badge: "Tunisian Heritage", bot: "Citrus aurantium", method: "Alcohol Extraction of Concrete", aroma: "Rich orange flower, honeyed citrus" },
    { name: "Grasse Golden Mimosa Absolute", price: 4600, badge: "Haute Parfumerie", bot: "Acacia dealbata", method: "Alcohol Extraction of Concrete", aroma: "Powdery floral, sweet honeyed violet" },
    { name: "Temple Frangipani Pure Absolute", price: 5400, badge: "Plumeria Blossom", bot: "Plumeria alba", method: "Alcohol Extraction of Concrete", aroma: "Velvety tropical floral, almond peach" },
    { name: "Osmanthus Sweet Apricot Absolute", price: 6900, badge: "High Perfumery", bot: "Osmanthus fragrans", method: "Alcohol Extraction of Concrete", aroma: "Jammy apricot, soft sueded leather" },
    { name: "French Spicy Carnation Absolute", price: 4800, badge: "Vintage Floral", bot: "Dianthus caryophyllus", method: "Alcohol Extraction of Concrete", aroma: "Warm clove spice, rich floral" },
    { name: "Gardenia Tahitensis Tiare Absolute", price: 5100, badge: "Tiare Flower", bot: "Gardenia taitensis", method: "Alcohol Extraction of Concrete", aroma: "Exotic, heady monoi white floral" },
    { name: "Florentine Orris Butter 15% Absolute", price: 7740, badge: "Priceless Essence", bot: "Iris pallida", method: "Three Year Aged Root Distillate", aroma: "Powdery, violet-like, aristocratic woody" },
    { name: "Orange Blossom Hydro-Absolute", price: 5300, badge: "Fleurs d'Oranger", bot: "Citrus aurantium", method: "Alcohol Extraction of Concrete", aroma: "Sweet, intoxicating white blossom" },
    { name: "Emerald Violet Leaf Green Absolute", price: 5600, badge: "Green Foundation", bot: "Viola odorata", method: "Alcohol Extraction of Concrete", aroma: "Intensely green, earthy cucumber" },
    { name: "French Narcissus Narcotique Absolute", price: 6100, badge: "Rare Flora", bot: "Narcissus poeticus", method: "Alcohol Extraction of Concrete", aroma: "Rich hay, deep hypnotic floral" },
    { name: "Kewra Attar Triple-Distilled", price: 4400, badge: "Indian Heritage", bot: "Pandanus fascicularis", method: "Traditional Deg & Bhapka", aroma: "Sweet fruity honey, exotic green" },
    { name: "Linden Blossom Honeyed Absolute", price: 4950, badge: "Tilia Cordata", bot: "Tilia cordata", method: "Alcohol Extraction of Concrete", aroma: "Sun-drenched honey, sweet floral" },
    { name: "French Jonquil Perfumery Absolute", price: 5750, badge: "Spring Classic", bot: "Narcissus jonquilla", method: "Alcohol Extraction of Concrete", aroma: "Deep floral, honeyed animalic" },
    { name: "Rockrose Cistus Labdanum Absolute", price: 4700, badge: "Amber Base", bot: "Cistus ladanifer", method: "Alcohol Extraction of Concrete", aroma: "Warm ambery, leather, dried fruit" },
    { name: "Corsican Immortelle Nectar Absolute", price: 6400, badge: "Everlasting Flower", bot: "Helichrysum italicum", method: "Alcohol Extraction of Concrete", aroma: "Curry honey, caramelized hay" },
    { name: "European Elderflower Fine Absolute", price: 4850, badge: "Delicate Flora", bot: "Sambucus nigra", method: "Alcohol Extraction of Concrete", aroma: "Muscatel grape, fresh floral sweet" },
    { name: "Sacred Davana Artemisia Absolute", price: 4300, badge: "Ayurvedic Jewel", bot: "Artemisia pallens", method: "Alcohol Extraction of Concrete", aroma: "Intensely fruity, warm strawberry plum" },
    { name: "Ylang Ylang Complete Perfumer Absolute", price: 4650, badge: "Elite Floral", bot: "Cananga odorata", method: "Alcohol Extraction of Concrete", aroma: "Deep sweet floral, creamy woody" },
    { name: "Blue Hyacinth Intoxicating Absolute", price: 5900, badge: "Rare Nectar", bot: "Hyacinthus orientalis", method: "Alcohol Extraction of Concrete", aroma: "Vibrant green, rich spring floral" },
    { name: "Spanish Golden Broom Absolute", price: 5150, badge: "Sun Nectar", bot: "Spartium junceum", method: "Alcohol Extraction of Concrete", aroma: "Honeyed blossom, dry golden hay" }
  ],
  6: [
    { name: "Malabar Black Pepper Coarse Powder", price: 580, badge: "50 Mesh", bot: "Piper nigrum", method: "Cryo Milled", aroma: "Pungent, woody, sharp peppery" },
    { name: "Ceylon Cinnamon Micro-Fine Powder", price: 720, badge: "Zero Coumarin", bot: "Cinnamomum verum", method: "Fine Milled", aroma: "Sweet fragrant, refined spice" },
    { name: "Alleppey Green Cardamom Pod Powder", price: 890, badge: "100% Pure Pod", bot: "Elettaria cardamomum", method: "Cryo Milled", aroma: "Sweet, highly aromatic camphoraceous" },
    { name: "Sun-Dried Ginger Zingiber Powder", price: 540, badge: "Sonth Pure", bot: "Zingiber officinale", method: "Air Dried & Milled", aroma: "Warm, spicy, pungent" },
    { name: "Kashmiri Red Chilli Stemless Powder", price: 620, badge: "Natural Color", bot: "Capsicum annuum", method: "Stone Ground", aroma: "Fruity, mild heat, intense crimson" },
    { name: "Roasted Indian Cumin Seed Powder", price: 510, badge: "Bhuna Jeera", bot: "Cuminum cyminum", method: "Slow Roasted & Ground", aroma: "Smoky, earthy, warm toasted" },
    { name: "High-Aroma Coriander Seed Powder", price: 460, badge: "Green Seed", bot: "Coriandrum sativum", method: "Cold Milled", aroma: "Citrusy, woody, fragrant" },
    { name: "Sweet Fennel Seed Ground Powder", price: 480, badge: "Digestive Spice", bot: "Foeniculum vulgare", method: "Micro Milled", aroma: "Sweet licorice, refreshing anise" },
    { name: "Micro-Ground Fenugreek Powder", price: 420, badge: "Methi Pure", bot: "Trigonella foenum-graecum", method: "Cryo Milled", aroma: "Maple-like, pleasant bitter warmth" },
    { name: "Myristica Nutmeg Fine Baking Powder", price: 780, badge: "Pure Kernel", bot: "Myristica fragrans", method: "Fine Milled", aroma: "Nutty, warm sweet, aromatic" },
    { name: "Golden Mace Blade Micro Powder", price: 920, badge: "Javitri Grade A", bot: "Myristica fragrans", method: "Cryo Milled", aroma: "Refined sweet spice, fragrant" },
    { name: "Yellow Mustard Seed Flour Powder", price: 390, badge: "Cold Milled", bot: "Sinapis alba", method: "Milled & Sifted", aroma: "Pungent when wet, warm savory" },
    { name: "Whole Madagascar Cloves Powder", price: 840, badge: "High Eugenol", bot: "Syzygium aromaticum", method: "Cryo Milled", aroma: "Intense, warm spicy, numbing" },
    { name: "Finely Milled Star Anise Powder", price: 660, badge: "Chakri Phool", bot: "Illicium verum", method: "Micro Milled", aroma: "Sweet, licorice, five-spice note" },
    { name: "Spray-Dried Garlic Flake Powder", price: 480, badge: "Zero Moisture", bot: "Allium sativum", method: "Dehydrated & Powdered", aroma: "True roasted garlic, savory" },
    { name: "White Onion Dehydrated Powder", price: 440, badge: "Pure Allium", bot: "Allium cepa", method: "Dehydrated & Powdered", aroma: "Sweet onion, rich umami" },
    { name: "Compounded Asafoetida Hing Powder", price: 760, badge: "Traditional", bot: "Ferula assa-foetida", method: "Compounded with Gum Arabic", aroma: "Pungent, savory garlic-onion" },
    { name: "Fresh Shade-Dried Curry Leaf Powder", price: 490, badge: "High Chlorophyll", bot: "Murraya koenigii", method: "Shade Dried & Ground", aroma: "Tempered curry, herbal citrus" },
    { name: "Sun-Dried Raw Mango Amchur Powder", price: 430, badge: "Tart Acidic", bot: "Mangifera indica", method: "Sun Dried Slices Milled", aroma: "Tangy, fruity sour, clean tart" },
    { name: "Himalayan Black Salt Kala Namak", price: 350, badge: "Mineral Rich", bot: "Mineral Rock Salt", method: "Fine Ground", aroma: "Pungent, umami sulfurous" },
    { name: "Dried Garden Spearmint Herb Powder", price: 410, badge: "Pudina Pure", bot: "Mentha spicata", method: "Cold Milled", aroma: "Refreshing, sweet herbal mint" },
    { name: "Celery Seed Seasoning Powder", price: 520, badge: "Culinary Salt Free", bot: "Apium graveolens", method: "Micro Milled", aroma: "Herbaceous celery, warm bitter" },
    { name: "Carom Ajwain Digestive Powder", price: 470, badge: "High Thymol", bot: "Trachyspermum ammi", method: "Fine Ground", aroma: "Thyme-like, hot pungent" },
    { name: "Decorticated White Pepper Powder", price: 790, badge: "Safed Mirch", bot: "Piper nigrum", method: "Outer Husk Removed & Ground", aroma: "Sharp heat, mild fermented warmth" },
    { name: "Sweet Hungarian Smoked Paprika", price: 560, badge: "Oak Smoked", bot: "Capsicum annuum", method: "Oak Wood Smoked & Ground", aroma: "Smoky sweet, rich red pepper" },
    { name: "Pulverized Indian Bay Leaf Powder", price: 440, badge: "Tejpatta Ground", bot: "Cinnamomum tamala", method: "Micro Milled", aroma: "Cinnamon herbal, aromatic leaf" },
    { name: "Spray-Dried Pure Tamarind Powder", price: 420, badge: "Natural Tartaric", bot: "Tamarindus indica", method: "Spray Dried Pulp", aroma: "Tangy, fruity sour tamarind" }
  ]
};

// Generate products
const products = [];

// Featured 6 (1 for each category)
const firstSixProducts = [
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
    image_url: "/images/botanical-hero.jpg",
    images: ["/images/botanical-hero.jpg", "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"],
    stock_quantity: 45,
    low_stock_threshold: 5,
    gst_rate: 18,
    status: "active",
    description: "Extracted from premium Malabar green cardamom pods, our Cardamom Oil offers warm, spicy-sweet notes used in high-end fragrances, flavor houses, and pharmaceutical formulations worldwide.",
    specs: {
      "Botanical Name": "Elettaria cardamomum",
      "Extraction Method": "Steam Distillation",
      "Origin": "Western Ghats, India",
      "Aroma Profile": "Warm, spicy, balsamic sweet",
      "Purity": "100% Pure & Undiluted"
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
    image_url: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop", "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"],
    stock_quantity: 35,
    low_stock_threshold: 5,
    gst_rate: 18,
    status: "active",
    description: "Steam-distilled from freshly harvested ginger rhizomes. Delivers crisp, warm citrus-spicy notes for food, beverages, and aromatherapy.",
    specs: {
      "Botanical Name": "Zingiber officinale",
      "Extraction Method": "Steam Distillation",
      "Origin": "Kerala, India",
      "Aroma Profile": "Warm, fresh spicy, citrus zesty",
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
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop", "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"],
    stock_quantity: 60,
    low_stock_threshold: 5,
    gst_rate: 18,
    status: "active",
    description: "Supercritical fluid extracted black pepper oleoresin containing high piperine content, ideal for seasoning blends, meat processing, and savory flavorings.",
    specs: {
      "Botanical Name": "Piper nigrum",
      "Extraction Method": "Supercritical CO2",
      "Origin": "Malabar Coast, India",
      "Aroma Profile": "Sharp pungent heat, dry peppery",
      "Purity": "Standardized 40% Piperine / 20% Volatile"
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
    images: ["https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop", "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"],
    stock_quantity: 12,
    low_stock_threshold: 3,
    gst_rate: 18,
    status: "active",
    description: "Hand-picked fresh night-blooming jasmine flowers processed immediately to yield a deeply floral, rich wax concrete essential for luxury perfumes.",
    specs: {
      "Botanical Name": "Jasminum grandiflorum",
      "Extraction Method": "Solvent Extraction",
      "Origin": "Madurai, India",
      "Aroma Profile": "Rich velvety sweet jasmine, waxy floral",
      "Purity": "100% Pure Floral Concrete"
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
    images: ["https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop", "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop"],
    stock_quantity: 8,
    low_stock_threshold: 2,
    gst_rate: 18,
    status: "active",
    description: "Extremely precious floral absolute with rich, creamy white-floral intoxication. Highly prized in elite international perfumery.",
    specs: {
      "Botanical Name": "Polianthes tuberosa",
      "Extraction Method": "Alcohol Extraction of Concrete",
      "Origin": "Tamil Nadu, India",
      "Aroma Profile": "Narcotic floral, honeyed undertones, creamy",
      "Purity": "100% Pure Perfumery Absolute"
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
    image_url: "/images/spice-powders.jpg",
    images: ["/images/spice-powders.jpg", "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop"],
    stock_quantity: 100,
    low_stock_threshold: 10,
    gst_rate: 18,
    status: "active",
    description: "Steam sterilized ground turmeric powder guaranteed high curcumin content. Free of synthetic colors and pathogens.",
    specs: {
      "Botanical Name": "Curcuma longa",
      "Extraction Method": "Steam Sterilized & Micro Milled",
      "Origin": "Erode, Tamil Nadu",
      "Aroma Profile": "Earthy, warm, characteristic curcuma",
      "Purity": "Min 5.0% Curcuminoids Guaranteed"
    }
  }
];

// Add featured 6 first
firstSixProducts.forEach((p, idx) => {
  products.push({
    ...p,
    id: `prod-featured-${idx + 1}`,
    created_at: new Date(Date.now() - (idx + 1) * 3600000).toISOString()
  });
});

const SKU_PREFIXES = {
  1: 'ESS',
  2: 'SPI',
  3: 'OLE',
  4: 'CON',
  5: 'ABS',
  6: 'POW'
};

// Add remaining 27 for each category
let imgCounter = 0;
for (const catId of [1, 2, 3, 4, 5, 6]) {
  const items = CATEGORY_ITEMS[catId];
  items.forEach((item, idx) => {
    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const sku = `${SKU_PREFIXES[catId]}-${String(idx + 2).padStart(3, '0')}`;
    const imgIndex = (imgCounter++) % BOTANICAL_IMAGES.length;
    const imgUrl = BOTANICAL_IMAGES[imgIndex];
    const nextImg1 = BOTANICAL_IMAGES[(imgIndex + 1) % BOTANICAL_IMAGES.length];
    const nextImg2 = BOTANICAL_IMAGES[(imgIndex + 2) % BOTANICAL_IMAGES.length];
    
    const rating = Math.round((4.6 + ((idx * 3) % 5) * 0.1) * 10) / 10;
    const reviews_count = 28 + ((idx * 13) % 220);
    const stock_quantity = 12 + ((idx * 7) % 55);
    const hasDiscount = idx % 5 === 0;
    const original_price = hasDiscount ? Math.round(item.price * 1.15) : undefined;
    const discount = hasDiscount ? '-15%' : undefined;

    products.push({
      id: `prod-${catId}-${idx + 2}`,
      name: item.name,
      slug,
      description: `Meticulously prepared ${item.name} from Venuss Herbo Aromatics. 100% pure botanical extract with verified analytical parameters for pharmaceutical, cosmetic, and flavor formulation applications.`,
      price: item.price,
      original_price,
      rating,
      reviews_count,
      badge: item.badge,
      discount,
      gst_rate: 18,
      stock_quantity,
      low_stock_threshold: 5,
      sku,
      category_id: catId,
      image_url: imgUrl,
      images: [imgUrl, nextImg1, nextImg2],
      status: 'active',
      specs: {
        "Botanical Name": item.bot,
        "Extraction Method": item.method,
        "Aroma Profile": item.aroma,
        "Purity": "100% Pure & Undiluted",
        "Grade": "Export Grade Certified"
      },
      created_at: new Date(Date.now() - (idx + 10) * 7200000).toISOString()
    });
  });
}

console.log("Total generated products:", products.length);
for (const catId of [1, 2, 3, 4, 5, 6]) {
  const catProds = products.filter(p => p.category_id === catId);
  console.log(`Category ${catId}: ${catProds.length} products`);
}

// Generate the TypeScript file content
const fileHeader = `// Programmatic seed data for 168 pure botanical extracts, essential oils, spice oleoresins, floral concretes & absolutes.
// Meticulously matched for Venuss Herbo Aromatics catalog.

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

export const CATEGORIES: Category[] = ${JSON.stringify(CATEGORIES, null, 2)};

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('src/lib/seedData.ts', fileHeader);
console.log("Successfully wrote src/lib/seedData.ts!");
