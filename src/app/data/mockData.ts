// Mock data for Kenyan supermarkets and products

export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number;
}

export interface SupermarketOffer {
  supermarketId: string;
  supermarketName: string;
  logo: string;
  region: string[];
  productId: string;
  price: number;
  tax: number;
  hasDelivery: boolean;
  hasLiquor: boolean;
  deliveryFee?: number;
  checkoutUrl?: string;
  rating: number;
}

export const kenyanRegions = [
  'Nairobi',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Eldoret',
  'Thika',
  'Malindi',
  'Kitale',
  'Garissa',
  'Kakamega',
  'Nyeri',
  'Meru'
];

export const products: Product[] = [
  { id: 'p1', name: 'Rice (1kg)', category: 'Grains', basePrice: 150 },
  { id: 'p2', name: 'Maize Flour (2kg)', category: 'Grains', basePrice: 180 },
  { id: 'p3', name: 'Cooking Oil (1L)', category: 'Cooking', basePrice: 320 },
  { id: 'p4', name: 'Sugar (1kg)', category: 'Pantry', basePrice: 140 },
  { id: 'p5', name: 'Milk (1L)', category: 'Dairy', basePrice: 120 },
  { id: 'p6', name: 'Bread', category: 'Bakery', basePrice: 60 },
  { id: 'p7', name: 'Eggs (Tray)', category: 'Dairy', basePrice: 350 },
  { id: 'p8', name: 'Chicken (1kg)', category: 'Meat', basePrice: 450 },
  { id: 'p9', name: 'Tomatoes (1kg)', category: 'Vegetables', basePrice: 80 },
  { id: 'p10', name: 'Onions (1kg)', category: 'Vegetables', basePrice: 70 },
  { id: 'p11', name: 'Potatoes (2kg)', category: 'Vegetables', basePrice: 120 },
  { id: 'p12', name: 'Tea Leaves (250g)', category: 'Beverages', basePrice: 180 },
  { id: 'p13', name: 'Salt (500g)', category: 'Pantry', basePrice: 40 },
  { id: 'p14', name: 'Wheat Flour (2kg)', category: 'Grains', basePrice: 200 },
  { id: 'p15', name: 'Beef (1kg)', category: 'Meat', basePrice: 600 },
  { id: 'p16', name: 'Fish (1kg)', category: 'Seafood', basePrice: 550 },
  { id: 'p17', name: 'Pasta (500g)', category: 'Grains', basePrice: 120 },
  { id: 'p18', name: 'Yogurt (500ml)', category: 'Dairy', basePrice: 90 },
  { id: 'p19', name: 'Cabbage (1 head)', category: 'Vegetables', basePrice: 50 },
  { id: 'p20', name: 'Carrots (1kg)', category: 'Vegetables', basePrice: 90 },
  { id: 'p21', name: 'Tusker Beer (6-pack)', category: 'Liquor', basePrice: 780 },
  { id: 'p22', name: 'Wine (750ml)', category: 'Liquor', basePrice: 1200 },
];

export const supermarkets = [
  {
    id: 's1',
    name: 'Carrefour Kenya',
    logo: '🛒',
    regions: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Thika'],
    hasDelivery: true,
    hasLiquor: true,
    checkoutUrl: 'https://www.carrefour.ke',
    color: '#0066FF'
  },
  {
    id: 's2',
    name: 'Naivas Supermarket',
    logo: '🏪',
    regions: ['Nairobi', 'Nakuru', 'Eldoret', 'Thika', 'Nyeri', 'Kisumu'],
    hasDelivery: true,
    hasLiquor: true,
    checkoutUrl: 'https://www.naivas.online',
    color: '#FF3366'
  },
  {
    id: 's3',
    name: 'Quickmart',
    logo: '⚡',
    regions: ['Nairobi', 'Mombasa', 'Nakuru', 'Eldoret', 'Kitale', 'Kakamega'],
    hasDelivery: true,
    hasLiquor: false,
    checkoutUrl: 'https://www.quickmart.co.ke',
    color: '#00CC88'
  },
  {
    id: 's4',
    name: 'Chandarana Foodplus',
    logo: '🍎',
    regions: ['Nairobi', 'Thika', 'Nyeri'],
    hasDelivery: false,
    hasLiquor: true,
    color: '#FF9900'
  },
  {
    id: 's5',
    name: 'Cleanshelf Supermarket',
    logo: '✨',
    regions: ['Nairobi', 'Mombasa', 'Kisumu'],
    hasDelivery: true,
    hasLiquor: false,
    checkoutUrl: 'https://www.cleanshelf.co.ke',
    color: '#9933FF'
  }
];

// Generate offers with price variations
export const generateOffers = (region: string, selectedProducts: string[]): SupermarketOffer[] => {
  const offers: SupermarketOffer[] = [];
  
  supermarkets.forEach(supermarket => {
    if (!supermarket.regions.includes(region)) return;
    
    selectedProducts.forEach(productId => {
      const product = products.find(p => p.id === productId);
      if (!product) return;
      
      // Skip liquor products if supermarket doesn't sell liquor
      if (product.category === 'Liquor' && !supermarket.hasLiquor) return;
      
      // Generate price variation (±15% from base price)
      const variation = 0.85 + Math.random() * 0.3;
      const price = Math.round(product.basePrice * variation);
      
      // Tax is typically 16% VAT in Kenya on most items
      const tax = Math.round(price * 0.16);
      
      offers.push({
        supermarketId: supermarket.id,
        supermarketName: supermarket.name,
        logo: supermarket.logo,
        region: supermarket.regions,
        productId: product.id,
        price,
        tax,
        hasDelivery: supermarket.hasDelivery,
        hasLiquor: supermarket.hasLiquor,
        deliveryFee: supermarket.hasDelivery ? Math.round(100 + Math.random() * 200) : undefined,
        checkoutUrl: supermarket.checkoutUrl,
        rating: 3.5 + Math.random() * 1.5
      });
    });
  });
  
  return offers;
};

export const getProductsByCategory = () => {
  const categories: Record<string, Product[]> = {};
  
  products.forEach(product => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  });
  
  return categories;
};