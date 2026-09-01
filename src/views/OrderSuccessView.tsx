import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, MessageCircle, ArrowRight, Package, Home, Printer, Sparkles } from 'lucide-react';

export const OrderSuccessView: React.FC = () => {
  const { lastOrder, navigateTo, generateWhatsAppUrl } = useStore();

  if (!lastOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#173124]">No Recent Order Found</h2>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-2.5 rounded-full bg-[#173124] text-white text-xs font-semibold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handleOpenWhatsAppTracking = () => {
    const text = `🌿 *KeshAura Order Inquiry (#${lastOrder.id})* 🌿\n\n` +
      `Namaste, I would like to check the dispatch & tracking status of my order (#${lastOrder.id}) placed for ${lastOrder.customerName}. Thank you!`;
    const url = generateWhatsAppUrl(text);
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Success Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#eae8e4] shadow-ambient-2 text-center space-y-6">
        
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-[#f0debd] text-[#173124] text-xs font-bold uppercase tracking-wider">
            Order Confirmed • #{lastOrder.id}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#173124]">
            Your Sacred Hair Ritual is on its Way
          </h1>
          <p className="text-xs sm:text-sm text-[#424844] max-w-md mx-auto">
            Thank you, <b>{lastOrder.customerName}</b>. Our Kerala dispensary has received your formulation request.
          </p>
        </div>

        {/* Order Details Box */}
        <div className="p-6 bg-[#fbf9f5] rounded-2xl border border-[#eae8e4] text-left text-xs text-[#424844] space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#eae8e4]">
            <div>
              <span className="text-[11px] text-[#727973] block">Order Date</span>
              <span className="font-semibold text-[#173124]">{lastOrder.date}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#727973] block">Payment Method</span>
              <span className="font-semibold text-[#173124] uppercase">{lastOrder.paymentMethod}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#727973] block">Total Amount</span>
              <span className="font-bold text-sm text-[#173124]">₹{lastOrder.total}</span>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-[#173124] mb-2">Items Ordered:</h5>
            <div className="space-y-2">
              {lastOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span>• {it.productName} ({it.size}) x {it.quantity}</span>
                  <span className="font-semibold text-[#173124]">₹{it.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#eae8e4] text-[11px]">
            <span className="font-bold text-[#173124] block">Delivery Address:</span>
            <p>{lastOrder.address}, {lastOrder.city} {lastOrder.postalCode ? `- ${lastOrder.postalCode}` : ''}</p>
            <p className="text-[#6a5d43] mt-0.5">Phone: {lastOrder.phone}</p>
          </div>
        </div>

        {/* WhatsApp Tracking CTA */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleOpenWhatsAppTracking}
            className="w-full py-4 rounded-full bg-[#173124] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#2d4739] shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#f0debd]" />
            <span>Open WhatsApp for Real-time Dispatch Tracking</span>
          </button>

          <button
            onClick={() => navigateTo('products')}
            className="w-full py-3 rounded-full bg-white border border-[#c2c8c2] text-[#173124] font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#f5f3ef] transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Continue Exploring Apothecary</span>
          </button>
        </div>

      </div>

    </div>
  );
};
