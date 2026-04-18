import { motion } from 'motion/react';
import { Truck, Wine, ExternalLink, Star, TrendingDown, TrendingUp } from 'lucide-react';

interface StoreCardProps {
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
  isLowestPrice?: boolean;
  index: number;
}

export function StoreCard({
  supermarketName,
  logo,
  totalPrice,
  totalTax,
  itemCount,
  hasDelivery,
  hasLiquor,
  deliveryFee,
  checkoutUrl,
  rating,
  isLowestPrice,
  index
}: StoreCardProps) {
  const grandTotal = totalPrice + totalTax + (deliveryFee || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative rounded-3xl overflow-hidden backdrop-blur-sm transition-all ${
        isLowestPrice
          ? 'bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-blue-500/20 border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.3)]'
          : 'bg-slate-800/50 border-2 border-slate-700/50 hover:border-emerald-500/30'
      }`}
    >
      {/* Best price badge */}
      {isLowestPrice && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.3 }}
          className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black text-sm font-bold flex items-center gap-1.5 shadow-lg"
        >
          <TrendingDown className="w-4 h-4" />
          BEST PRICE
        </motion.div>
      )}

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-emerald-500/10 group-hover:via-cyan-500/5 group-hover:to-blue-500/10 transition-all duration-500" />

      <div className="relative p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-4xl shadow-lg border border-slate-600/50">
              {logo}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{supermarketName}</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-slate-300">{rating.toFixed(1)}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="text-sm text-slate-400">{itemCount} items</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {hasDelivery && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm">
              <Truck className="w-4 h-4" />
              <span>Delivery</span>
            </div>
          )}
          {hasLiquor && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm">
              <Wine className="w-4 h-4" />
              <span>Liquor</span>
            </div>
          )}
        </div>

        {/* Price breakdown */}
        <div className="space-y-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-700/50">
          <div className="flex justify-between items-center text-slate-300">
            <span>Subtotal ({itemCount} items)</span>
            <span className="font-mono">KES {totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>Tax (16% VAT)</span>
            <span className="font-mono">KES {totalTax.toLocaleString()}</span>
          </div>
          {deliveryFee !== undefined && (
            <div className="flex justify-between items-center text-slate-300">
              <span>Delivery Fee</span>
              <span className="font-mono">KES {deliveryFee.toLocaleString()}</span>
            </div>
          )}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-white">Total</span>
            <span className={`text-2xl font-bold font-mono ${
              isLowestPrice ? 'text-emerald-400' : 'text-white'
            }`}>
              KES {grandTotal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action button */}
        {hasDelivery && checkoutUrl ? (
          <motion.a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`block w-full py-4 rounded-xl font-semibold text-center transition-all ${
              isLowestPrice
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                : 'bg-slate-700 text-white hover:bg-slate-600'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              Checkout
              <ExternalLink className="w-4 h-4" />
            </span>
          </motion.a>
        ) : (
          <div className="w-full py-4 rounded-xl font-semibold text-center bg-slate-700/50 text-slate-500 cursor-not-allowed border border-slate-600/50">
            In-Store Only
          </div>
        )}
      </div>

      {/* Animated gradient border */}
      {isLowestPrice && (
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)',
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </motion.div>
  );
}
