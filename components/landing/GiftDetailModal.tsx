'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { GiftRecommendation } from '@/types';
import { GiftPurchaseFormModal } from './GiftPurchaseFormModal';

interface Props {
  gift: GiftRecommendation;
  onClose: () => void;
  onPurchaseSuccess: () => void;
}

export function GiftDetailModal({ gift, onClose, onPurchaseSuccess }: Props) {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const remaining = Math.max(0, gift.total_needed - gift.total_bought);

  const handleBuyClick = () => {
    if (gift.purchase_link) {
      window.open(gift.purchase_link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <AnimatePresence>
        {!showPurchaseForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ghibli-dark/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden relative shadow-xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6 border-b border-ghibli-dark/10 pb-4">
                  <h3 className="font-serif text-2xl text-ghibli-blue uppercase tracking-widest text-shadow-sm">
                    GIFT DETAIL
                  </h3>
                  <button onClick={onClose} className="text-ghibli-dark/60 hover:text-ghibli-dark p-1">
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-ghibli-blue text-lg mb-1">Shipping Address</h4>
                  <p className="text-ghibli-dark text-sm">
                    Jakarta Selatan, Jalan Kenangan, Jaksel, Jakarta, DKI Jakarta 10269
                  </p>
                </div>

                <div className="w-full h-48 bg-ghibli-sand/20 rounded-xl mb-6 overflow-hidden">
                  {gift.image_url ? (
                    <img src={gift.image_url} alt={gift.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ghibli-dark/30">
                      No Image
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-bold text-ghibli-blue text-xl">{gift.name}</h4>
                    {gift.description && <p className="text-ghibli-blue text-md">{gift.description}</p>}
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-ghibli-dark/10 pb-2">
                    <span className="font-bold text-ghibli-blue">Price</span>
                    <span className="font-bold text-ghibli-blue">Rp {gift.price.toLocaleString('id-ID')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-ghibli-dark/10 pb-2">
                    <span className="font-bold text-ghibli-blue">Total Product</span>
                    <span className="font-bold text-ghibli-blue">{gift.total_needed} Products</span>
                  </div>

                  <p className="text-ghibli-blue text-sm">
                    {gift.total_bought} product has been bought
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleBuyClick}
                    className="w-full py-3 bg-ghibli-green text-white font-bold rounded-xl hover:bg-ghibli-green/90 transition-colors"
                  >
                    Buy Gift
                  </button>
                  <button 
                    onClick={() => setShowPurchaseForm(true)}
                    className="w-full py-3 bg-ghibli-green text-white font-bold rounded-xl hover:bg-ghibli-green/90 transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {showPurchaseForm && (
        <GiftPurchaseFormModal 
          gift={gift} 
          onClose={() => setShowPurchaseForm(false)} 
          onSuccess={onPurchaseSuccess}
        />
      )}
    </>
  );
}
