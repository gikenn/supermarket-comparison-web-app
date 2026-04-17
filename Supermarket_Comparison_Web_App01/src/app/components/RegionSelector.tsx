import { motion } from 'motion/react';
import { MapPin, ChevronRight } from 'lucide-react';
import { kenyanRegions } from '../data/mockData';

interface RegionSelectorProps {
  selectedRegion: string | null;
  onSelectRegion: (region: string) => void;
}

export function RegionSelector({ selectedRegion, onSelectRegion }: RegionSelectorProps) {
  return (
    <div id="region-selector" className="min-h-screen bg-slate-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 backdrop-blur-sm">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm tracking-wide">STEP 1</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Choose Your Region
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Select your city to see available supermarkets and local pricing
          </p>
        </motion.div>

        {/* Region grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {kenyanRegions.map((region, index) => {
            const isSelected = selectedRegion === region;
            
            return (
              <motion.button
                key={region}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectRegion(region)}
                className={`group relative p-6 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                    : 'bg-slate-800/50 border-slate-700/50 hover:border-emerald-500/30 backdrop-blur-sm'
                }`}
              >
                {/* Glow effect */}
                {isSelected && (
                  <motion.div
                    layoutId="region-glow"
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div className="relative z-10 flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-2xl mb-2">📍</div>
                    <div className={`font-semibold text-lg ${
                      isSelected ? 'text-emerald-400' : 'text-white group-hover:text-emerald-400'
                    } transition-colors`}>
                      {region}
                    </div>
                  </div>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                    >
                      <ChevronRight className="w-5 h-5 text-emerald-400" />
                    </motion.div>
                  )}
                </div>

                {/* Animated border */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.5), transparent)',
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Selected region info */}
        {selectedRegion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Shopping in</div>
                <div className="text-xl font-semibold text-white">{selectedRegion}</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
