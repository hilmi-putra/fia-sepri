'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { submitGiftPurchase } from '@/services/gifts';
import type { GiftRecommendation } from '@/types';

interface Props {
  gift: GiftRecommendation;
  onClose: () => void;
  onSuccess: () => void;
}

export function GiftPurchaseFormModal({ gift, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    buyer_name: '',
    whatsapp_number: '',
    email: '',
    quantity: 1
  });

  const remaining = Math.max(0, gift.total_needed - gift.total_bought);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (formData.quantity < 1 || formData.quantity > remaining) {
        throw new Error(`Quantity must be between 1 and ${remaining}`);
      }
      
      await submitGiftPurchase(supabase, {
        gift_id: gift.id,
        buyer_name: formData.buyer_name,
        whatsapp_number: formData.whatsapp_number,
        email: formData.email || null,
        quantity: formData.quantity
      }, gift.total_bought);
      
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to submit purchase. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ghibli-dark/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto relative shadow-xl"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-2xl text-ghibli-blue uppercase tracking-widest text-shadow-sm mx-auto">
              WEDDING GIFT FORM
            </h3>
            <button onClick={onClose} className="text-ghibli-dark/60 hover:text-ghibli-dark absolute top-6 right-6">
              <X size={24} />
            </button>
          </div>

          <div className="w-full h-32 bg-ghibli-sand/20 rounded-xl mb-4 overflow-hidden">
            {gift.image_url ? (
              <img src={gift.image_url} alt={gift.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-ghibli-dark/30">
                No Image
              </div>
            )}
          </div>
          
          <h4 className="font-bold text-ghibli-blue text-xl mb-6 pb-2 border-b border-ghibli-dark/10">
            {gift.name}
          </h4>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-ghibli-dark mb-1">Buyer Name *</label>
              <input
                type="text"
                required
                value={formData.buyer_name}
                onChange={e => setFormData(p => ({ ...p, buyer_name: e.target.value }))}
                placeholder="Your Name"
                className="w-full px-4 py-2 border-b border-ghibli-dark/20 focus:border-ghibli-blue outline-none transition-colors bg-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-ghibli-dark mb-1">WhatsApp Number *</label>
              <input
                type="tel"
                required
                value={formData.whatsapp_number}
                onChange={e => setFormData(p => ({ ...p, whatsapp_number: e.target.value }))}
                placeholder="e.g. 08123456789"
                className="w-full px-4 py-2 border-b border-ghibli-dark/20 focus:border-ghibli-blue outline-none transition-colors bg-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-ghibli-dark mb-1">Email (Optional)</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                placeholder="Your Email Address"
                className="w-full px-4 py-2 border-b border-ghibli-dark/20 focus:border-ghibli-blue outline-none transition-colors bg-transparent text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm text-ghibli-dark mb-1">Number of Products Bought *</label>
              <input
                type="number"
                required
                min="1"
                max={remaining}
                value={formData.quantity}
                onChange={e => setFormData(p => ({ ...p, quantity: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-2 border-b border-ghibli-dark/20 focus:border-ghibli-blue outline-none transition-colors bg-transparent text-sm"
              />
              <p className="text-xs text-ghibli-dark/50 mt-1">Maximum available: {remaining}</p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-ghibli-green text-white font-bold rounded-xl hover:bg-ghibli-green/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Confirm Purchase'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
