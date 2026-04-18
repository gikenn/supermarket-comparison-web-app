import { motion } from 'motion/react';
import { ShoppingCart, MapPin, Package } from 'lucide-react';

interface EmptyStateProps {
  type: 'region' | 'products' | 'results';
  onAction?: () => void;
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const config = {
    region: {
      icon: MapPin,
      title: 'Select Your Region',
      description: 'Choose your city to see available supermarkets and start comparing prices',
      action: 'Choose Region',
      gradient: 'from-cyan-500 to-blue-500'
    },
    products: {
      icon: Package,
      title: 'Add Items to Compare',
      description: 'Select products from the catalog to see price comparisons across supermarkets',
      action: 'Browse Products',
      gradient: 'from-blue-500 to-purple-500'
    },
    results: {
      icon: ShoppingCart,
      title: 'No Results Found',
      description: 'No supermarkets in your region carry these items. Try selecting a different region or products.',
      action: 'Try Again',
      gradient: 'from-purple-500 to-pink-500'
    }
  };

  const { icon: Icon, title, description, action, gradient } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-20 px-6 text-center"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${gradient} opacity-20 flex items-center justify-center`}
      >
        <Icon className="w-12 h-12 text-white" />
      </motion.div>

      <h3 className="text-3xl font-bold text-white mb-3">{title}</h3>
      <p className="text-lg text-slate-400 max-w-md mx-auto mb-8">{description}</p>

      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className={`px-8 py-3 rounded-full bg-gradient-to-r ${gradient} text-white font-semibold shadow-lg hover:shadow-xl transition-all`}
        >
          {action}
        </motion.button>
      )}
    </motion.div>
  );
}
