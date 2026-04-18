import { motion } from 'motion/react';
import { BarChart3, TrendingDown, Filter, ShoppingBag } from 'lucide-react';
import { StoreCard } from './StoreCard';
import { SupermarketOffer, products } from '../data/mockData';
import { useState } from 'react';

interface ComparisonViewProps {
  offers: SupermarketOffer[];
  selectedProducts: string[];
}

interface AggregatedOffer {
  supermarketId: string;
  supermarketName: string;
  logo: string;
  totalPrice: number;
  totalTax: number;
  itemCount: number;
  hasDelivery: boolean;
  hasLiquor: boolean;
  deliveryFee?: number;
  checkoutUrl?: string;
  rating: number;
}

export function ComparisonView({ offers, selectedProducts }: ComparisonViewProps) {
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('price');

  if (offers.length === 0) {
    return null;
  }

  // Aggregate offers by supermarket
  const aggregatedOffers: AggregatedOffer[] = [];
  const supermarketMap = new Map<string, SupermarketOffer[]>();

  offers.forEach(offer => {
    if (!supermarketMap.has(offer.supermarketId)) {
      supermarketMap.set(offer.supermarketId, []);
    }
    supermarketMap.get(offer.supermarketId)!.push(offer);
  });

  supermarketMap.forEach((supermarketOffers, supermarketId) => {
    const totalPrice = supermarketOffers.reduce((sum, o) => sum + o.price, 0);
    const totalTax = supermarketOffers.reduce((sum, o) => sum + o.tax, 0);
    const avgRating = supermarketOffers.reduce((sum, o) => sum + o.rating, 0) / supermarketOffers.length;
    const firstOffer = supermarketOffers[0];

    aggregatedOffers.push({
      supermarketId,
      supermarketName: firstOffer.supermarketName,
      logo: firstOffer.logo,
      totalPrice,
      totalTax,
      itemCount: supermarketOffers.length,
      hasDelivery: firstOffer.hasDelivery,
      hasLiquor: firstOffer.hasLiquor,
      deliveryFee: firstOffer.deliveryFee,
      checkoutUrl: firstOffer.checkoutUrl,
      rating: avgRating
    });
  });

  // Sort offers
  const sortedOffers = [...aggregatedOffers].sort((a, b) => {
    if (sortBy === 'price') {
      const totalA = a.totalPrice + a.totalTax + (a.deliveryFee || 0);
      const totalB = b.totalPrice + b.totalTax + (b.deliveryFee || 0);
      return totalA - totalB;
    } else {
      return b.rating - a.rating;
    }
  });

  const lowestPriceId = sortedOffers[0].supermarketId;

  // Calculate savings
  const lowestTotal = sortedOffers[0].totalPrice + sortedOffers[0].totalTax + (sortedOffers[0].deliveryFee || 0);
  const highestTotal = sortedOffers[sortedOffers.length - 1].totalPrice + sortedOffers[sortedOffers.length - 1].totalTax + (sortedOffers[sortedOffers.length - 1].deliveryFee || 0);
  const potentialSavings = highestTotal - lowestTotal;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-sm">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm tracking-wide">RESULTS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Compare & Save
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {sortedOffers.length} supermarkets compared • {selectedProducts.length} items
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingDown className="w-6 h-6 text-emerald-400" />
              <span className="text-sm text-slate-400">Best Price</span>
            </div>
            <div className="text-3xl font-bold text-white font-mono">
              KES {lowestTotal.toLocaleString()}
            </div>
            <div className="text-sm text-emerald-400 mt-1">
              {sortedOffers[0].supermarketName}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="w-6 h-6 text-blue-400" />
              <span className="text-sm text-slate-400">Potential Savings</span>
            </div>
            <div className="text-3xl font-bold text-white font-mono">
              KES {potentialSavings.toLocaleString()}
            </div>
            <div className="text-sm text-blue-400 mt-1">
              vs highest price
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <Filter className="w-6 h-6 text-purple-400" />
              <span className="text-sm text-slate-400">Sort By</span>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setSortBy('price')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  sortBy === 'price'
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                Price
              </button>
              <button
                onClick={() => setSortBy('rating')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  sortBy === 'rating'
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                Rating
              </button>
            </div>
          </motion.div>
        </div>

        {/* Store cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedOffers.map((offer, index) => (
            <StoreCard
              key={offer.supermarketId}
              supermarketName={offer.supermarketName}
              logo={offer.logo}
              totalPrice={offer.totalPrice}
              totalTax={offer.totalTax}
              itemCount={offer.itemCount}
              hasDelivery={offer.hasDelivery}
              hasLiquor={offer.hasLiquor}
              deliveryFee={offer.deliveryFee}
              checkoutUrl={offer.checkoutUrl}
              rating={offer.rating}
              isLowestPrice={offer.supermarketId === lowestPriceId && sortBy === 'price'}
              index={index}
            />
          ))}
        </div>

        {/* Detailed comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-700/50">
            <h3 className="text-2xl font-bold text-white">Detailed Price Breakdown</h3>
            <p className="text-slate-400 mt-1">Item-by-item comparison across supermarkets</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left p-4 text-slate-400 font-medium sticky left-0 bg-slate-800/90 backdrop-blur-sm">Product</th>
                  {sortedOffers.map(offer => (
                    <th key={offer.supermarketId} className="text-center p-4 text-slate-400 font-medium min-w-[120px]">
                      <div className="text-2xl mb-1">{offer.logo}</div>
                      <div className="text-sm">{offer.supermarketName}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((productId, idx) => {
                  const product = products.find(p => p.id === productId);
                  if (!product) return null;

                  const productOffers = offers.filter(o => o.productId === productId);
                  const prices = productOffers.map(o => o.price);
                  const lowestPrice = Math.min(...prices);

                  return (
                    <motion.tr
                      key={productId}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                    >
                      <td className="p-4 sticky left-0 bg-slate-800/90 backdrop-blur-sm">
                        <div className="font-medium text-white">{product.name}</div>
                        <div className="text-sm text-slate-400">{product.category}</div>
                      </td>
                      {sortedOffers.map(offer => {
                        const productOffer = productOffers.find(o => o.supermarketId === offer.supermarketId);
                        
                        if (!productOffer) {
                          return (
                            <td key={offer.supermarketId} className="text-center p-4">
                              <span className="text-slate-600">—</span>
                            </td>
                          );
                        }

                        const isLowest = productOffer.price === lowestPrice;

                        return (
                          <td key={offer.supermarketId} className="text-center p-4">
                            <div className={`inline-block px-3 py-1.5 rounded-lg font-mono font-medium ${
                              isLowest
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'text-slate-300'
                            }`}>
                              {productOffer.price}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              +{productOffer.tax} tax
                            </div>
                          </td>
                        );
                      })}
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
