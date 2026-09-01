import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, Sparkles, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartCount,
    navigateTo,
    checkoutCartViaWhatsApp
  } = useStore();

  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickAddress, setQuickAddress] = useState('');
  const [quickNote, setQuickNote] = useState('');
  const [showExpressCheckout, setShowExpressCheckout] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 999;
  const progressToFreeShip = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShip = freeShippingThreshold - cartSubtotal;

  const handleQuickWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim() || !quickPhone.trim()) {
      alert('Please enter your name and phone number for the WhatsApp order.');
      return;
    }
    checkoutCartViaWhatsApp({
      name: quickName,
      phone: quickPhone,
      address: quickAddress || 'Will share location pin on WhatsApp',
      notes: quickNote
    });
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbf9f5] shadow-2xl flex flex-col justify-between border-l border-[#c2c8c2]/40 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#eae8e4] bg-[#f5f3ef]/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#173124]" />
                <h2 className="font-serif text-xl font-bold text-[#173124]">Your Sacred Basket</h2>
                <span className="bg-[#173124] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  {cartCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#424844] hover:text-[#173124] hover:bg-[#eae8e4] rounded-full transition-colors"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping progress bar */}
            <div className="mt-4 pt-3 border-t border-[#c2c8c2]/30">
              <div className="flex justify-between text-xs text-[#424844] mb-1.5 font-medium">
                <span>
                  {cartSubtotal >= freeShippingThreshold ? (
                    <span className="text-emerald-800 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> You've unlocked FREE Sacred Shipping!
                    </span>
                  ) : (
                    <span>Add ₹{amountNeededForFreeShip} more for <b>FREE Delivery</b></span>
                  )}
                </span>
                <span>{progressToFreeShip}%</span>
              </div>
              <div className="w-full bg-[#eae8e4] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#173124] h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressToFreeShip}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#f0debd]/50 mx-auto flex items-center justify-center mb-4 text-[#173124]">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#173124] mb-1">Your Basket is Empty</h3>
                <p className="text-sm text-[#424844] mb-6 max-w-xs mx-auto">
                  Awaken your hair follicles with our handcrafted organic Ayurvedic powders.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('products');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#173124] text-white text-sm font-medium hover:bg-[#2d4739] transition-all shadow-sm"
                >
                  Explore Sacred Hair Packs
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-4 p-3.5 bg-white rounded-2xl border border-[#eae8e4] shadow-ambient-1 hover:border-[#c2c8c2] transition-all"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover rounded-xl bg-[#f5f3ef] shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-serif font-bold text-sm text-[#173124] truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                            className="text-[#727973] hover:text-red-600 p-1 transition-colors shrink-0"
                            title="Remove Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-[#6a5d43] font-medium mt-0.5 truncate">
                          {item.selectedSize}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#f5f3ef]">
                        <div className="flex items-center border border-[#c2c8c2] rounded-full bg-[#fbf9f5] px-1 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                            className="p-1 text-[#173124] hover:text-black hover:bg-[#eae8e4] rounded-full transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-2 text-[#173124]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                            className="p-1 text-[#173124] hover:text-black hover:bg-[#eae8e4] rounded-full transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-sm font-bold text-[#173124]">
                          ₹{item.unitPrice * item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer actions */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#eae8e4] bg-[#f5f3ef]/90 space-y-4">
              
              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#424844]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#173124]">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sacred Express Shipping</span>
                  <span className="font-semibold text-emerald-800">
                    {cartSubtotal >= freeShippingThreshold ? 'FREE' : '₹70'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#173124] pt-2 border-t border-[#c2c8c2]/40">
                  <span>Estimated Total</span>
                  <span>₹{cartSubtotal + (cartSubtotal >= freeShippingThreshold ? 0 : 70)}</span>
                </div>
              </div>

              {/* Express WhatsApp Checkout Accordion */}
              {!showExpressCheckout ? (
                <div className="space-y-2 pt-1">
                  <button
                    id="cart-express-whatsapp-btn"
                    onClick={() => setShowExpressCheckout(true)}
                    className="w-full py-3 px-4 rounded-full bg-[#173124] text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#2d4739] transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 text-[#f0debd]" />
                    <span>Instant Order via WhatsApp</span>
                  </button>

                  <button
                    id="cart-regular-checkout-btn"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('checkout');
                    }}
                    className="w-full py-2.5 px-4 rounded-full bg-white border border-[#c2c8c2] text-[#173124] font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-[#eae8e4] transition-all"
                  >
                    <span>Proceed to Standard Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickWhatsAppOrder} className="bg-white p-3.5 rounded-2xl border border-[#c2c8c2] space-y-2.5 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#173124] flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-700" /> WhatsApp Instant Dispatch
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowExpressCheckout(false)}
                      className="text-[11px] text-[#727973] hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                  
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg bg-[#fbf9f5] border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Phone Number *"
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg bg-[#fbf9f5] border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                  />
                  <input
                    type="text"
                    placeholder="City / Delivery Address"
                    value={quickAddress}
                    onChange={(e) => setQuickAddress(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg bg-[#fbf9f5] border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                  />

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-[#173124] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#2d4739] shadow-sm transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#f0debd]" />
                    <span>Send Order to WhatsApp Concierge</span>
                  </button>
                </form>
              )}

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#727973] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                <span>100% Authentic Herb Guarantee • Verified Ayurvedic Dispensary</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
