import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Check, X, Package } from 'lucide-react';
import { products, getProductsByCategory } from '../data/mockData';
import { useState } from 'react';

interface ProductSelectorProps {
  selectedProducts: string[];
  onToggleProduct: (productId: string) => void;
  disabled?: boolean;
}

export function ProductSelector({ selectedProducts, onToggleProduct, disabled }: ProductSelectorProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Grains', 'Cooking']);
  const productsByCategory = getProductsByCategory();

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-sm">
            <ShoppingCart className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm tracking-wide">STEP 2</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Build Your Shopping List
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Select the items you want to compare across supermarkets
          </p>
        </motion.div>

        {/* Selection summary */}
        {selectedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Selected Items</div>
                  <div className="text-xl font-semibold text-white">{selectedProducts.length} products</div>
                </div>
              </div>
              <button
                onClick={() => selectedProducts.forEach(onToggleProduct)}
                className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-sm font-medium transition-all flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </motion.div>
        )}

        {/* Categories */}
        <div className="space-y-4">
          {Object.entries(productsByCategory).map(([category, categoryProducts], categoryIndex) => {
            const isExpanded = expandedCategories.includes(category);
            const selectedInCategory = categoryProducts.filter(p => selectedProducts.includes(p.id)).length;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.05 }}
                className="rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm overflow-hidden"
              >
                {/* Category header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full p-6 flex items-center justify-between hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{getCategoryEmoji(category)}</div>
                    <div className="text-left">
                      <div className="text-xl font-semibold text-white">{category}</div>
                      <div className="text-sm text-slate-400">{categoryProducts.length} items</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {selectedInCategory > 0 && (
                      <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                        {selectedInCategory} selected
                      </div>
                    )}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    </motion.div>
                  </div>
                </button>

                {/* Products grid */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-700/50"
                    >
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {categoryProducts.map((product, productIndex) => {
                          const isSelected = selectedProducts.includes(product.id);

                          return (
                            <motion.button
                              key={product.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: productIndex * 0.03 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => !disabled && onToggleProduct(product.id)}
                              disabled={disabled}
                              className={`group relative p-4 rounded-xl border-2 text-left transition-all ${
                                isSelected
                                  ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-emerald-500/50'
                                  : 'bg-slate-700/30 border-slate-600/50 hover:border-emerald-500/30'
                              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <div className="font-medium text-white mb-1">{product.name}</div>
                                  <div className="text-sm text-slate-400">KES {product.basePrice}</div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'bg-emerald-500 border-emerald-500'
                                    : 'border-slate-500 group-hover:border-emerald-500'
                                }`}>
                                  {isSelected && <Check className="w-4 h-4 text-black" />}
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    'Grains': '🌾',
    'Cooking': '🍳',
    'Pantry': '🧂',
    'Dairy': '🥛',
    'Bakery': '🍞',
    'Meat': '🥩',
    'Vegetables': '🥬',
    'Beverages': '☕',
    'Seafood': '🐟',
    'Liquor': '🍺',
  };
  return emojiMap[category] || '📦';
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
