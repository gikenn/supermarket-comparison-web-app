import { motion } from 'motion/react';
import { Info, Shield, Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-slate-800 py-16 px-6">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-white mb-2">Important Information</h4>
              <div className="text-sm text-slate-400 space-y-2">
                <p>
                  <strong className="text-slate-300">Pricing:</strong> All prices are indicative and may vary. Please verify current prices with the respective supermarket before purchase. Prices are updated periodically but may not reflect real-time changes.
                </p>
                <p>
                  <strong className="text-slate-300">Delivery:</strong> Delivery availability and fees depend on your location and the supermarket's delivery zones. Some areas may not be covered. Contact the supermarket directly for delivery confirmation.
                </p>
                <p>
                  <strong className="text-slate-300">Liquor:</strong> Alcohol sales are restricted to customers aged 18 and above in Kenya. Valid ID may be required at checkout. Some supermarkets may have limited liquor licenses.
                </p>
                <p>
                  <strong className="text-slate-300">Taxes:</strong> Tax rates shown are standard 16% VAT as per Kenyan tax law. Some items may be exempt or have different rates. Verify final tax amount at checkout.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white">Smart Shopping</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Compare prices across Kenya's top supermarkets instantly. Make informed decisions and save money on your grocery shopping.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Privacy First</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              No account required. No personal data collection. No tracking. Just simple, fast price comparison.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Coverage</h4>
            <div className="flex flex-wrap gap-2">
              {['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika'].map(city => (
                <span
                  key={city}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 text-sm border border-slate-700"
                >
                  {city}
                </span>
              ))}
            </div>
            <p className="text-slate-500 text-xs mt-3">
              +6 more cities
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <div className="text-2xl">🛒</div>
            <span className="text-lg font-bold text-white">Smart Shopping Kenya</span>
          </div>
          
          <div className="text-sm text-slate-500">
            © 2026 Smart Shopping Kenya. Price comparison service.
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-400">
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
