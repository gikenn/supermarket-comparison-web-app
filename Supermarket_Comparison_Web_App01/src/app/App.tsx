import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { RegionSelector } from './components/RegionSelector';
import { ProductSelector } from './components/ProductSelector';
import { ComparisonView } from './components/ComparisonView';
import { Footer } from './components/Footer';
import { FloatingNav } from './components/FloatingNav';
import { generateOffers, SupermarketOffer } from './data/mockData';

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [offers, setOffers] = useState<SupermarketOffer[]>([]);

  // Generate offers when region and products change
  useEffect(() => {
    if (selectedRegion && selectedProducts.length > 0) {
      const newOffers = generateOffers(selectedRegion, selectedProducts);
      setOffers(newOffers);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('comparison-view')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      setOffers([]);
    }
  }, [selectedRegion, selectedProducts]);

  const handleToggleProduct = (productId: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleReset = () => {
    setSelectedRegion(null);
    setSelectedProducts([]);
    setOffers([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black">
      <Hero />
      
      <RegionSelector
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
      />
      
      {selectedRegion && (
        <ProductSelector
          selectedProducts={selectedProducts}
          onToggleProduct={handleToggleProduct}
          disabled={false}
        />
      )}
      
      {offers.length > 0 && (
        <div id="comparison-view">
          <ComparisonView
            offers={offers}
            selectedProducts={selectedProducts}
          />
        </div>
      )}
      
      <Footer />
      
      <FloatingNav onReset={handleReset} />
    </div>
  );
}