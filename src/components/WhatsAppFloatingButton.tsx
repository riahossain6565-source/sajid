import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhatsAppFloatingButton: React.FC = () => {
  const { whatsappNumber, generateWhatsAppUrl } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [quickQuestion, setQuickQuestion] = useState('');

  const handleSendQuickQuery = (e: React.FormEvent) => {
    e.preventDefault();
    const query = quickQuestion.trim() || 'Hello! I would like to consult about the best KeshAura hair pack for my hair.';
    const text = `🌿 *KeshAura Ayurvedic Consultation* 🌿\n\n${query}`;
    const url = generateWhatsAppUrl(text);
    window.open(url, '_blank');
    setIsOpen(false);
    setQuickQuestion('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-[#c2c8c2] overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          <div className="bg-[#173124] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#2d4739] flex items-center justify-center text-[#f0debd]">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm">Ayurvedic Concierge</h4>
                <p className="text-[10px] text-[#f0debd] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online for custom orders & advice
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#b0cdbb] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-[#fbf9f5] text-xs text-[#424844] space-y-3">
            <div className="bg-white p-3 rounded-2xl border border-[#eae8e4] text-[#173124] shadow-xs">
              <p className="font-medium">
                🙏 Namaste! Need guidance on dosage, mixing rituals, or placing a customized WhatsApp order?
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setQuickQuestion('I have severe hair fall. Which formulation should I pick?')}
                className="text-[11px] bg-white border border-[#c2c8c2]/70 rounded-full px-2.5 py-1 text-[#173124] hover:bg-[#f0debd]/40 transition-colors"
              >
                💇‍♀️ Severe Hair Fall
              </button>
              <button
                type="button"
                onClick={() => setQuickQuestion('How do I mix the pack with curd or aloe vera?')}
                className="text-[11px] bg-white border border-[#c2c8c2]/70 rounded-full px-2.5 py-1 text-[#173124] hover:bg-[#f0debd]/40 transition-colors"
              >
                🥣 Mixing Rituals
              </button>
              <button
                type="button"
                onClick={() => setQuickQuestion('I want to place an order via UPI / Cash on Delivery on WhatsApp.')}
                className="text-[11px] bg-white border border-[#c2c8c2]/70 rounded-full px-2.5 py-1 text-[#173124] hover:bg-[#f0debd]/40 transition-colors"
              >
                📦 Quick Order
              </button>
            </div>

            <form onSubmit={handleSendQuickQuery} className="pt-1">
              <div className="flex rounded-full overflow-hidden border border-[#c2c8c2] bg-white p-1">
                <input
                  type="text"
                  value={quickQuestion}
                  onChange={(e) => setQuickQuestion(e.target.value)}
                  placeholder="Type hair concern..."
                  className="w-full text-xs px-3 py-1.5 focus:outline-none text-[#173124]"
                />
                <button
                  type="submit"
                  className="bg-[#173124] text-white p-1.5 rounded-full hover:bg-[#2d4739] transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        id="floating-whatsapp-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-[#173124] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#2d4739] hover:scale-105 transition-all duration-200 border border-[#f0debd]/40 group"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 text-[#f0debd] group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#173124] animate-pulse"></span>
        </div>
        <span className="text-xs font-bold tracking-wide pr-1">WhatsApp Order</span>
      </button>
    </div>
  );
};
