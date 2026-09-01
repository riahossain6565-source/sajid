import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Tag, ShoppingBag, Truck } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { cart, cartSubtotal, createOrder, navigateTo, showToast, generateWhatsAppUrl, userProfile, setIsAuthModalOpen, setAuthModalTab } = useStore();

  const [name, setName] = useState(userProfile?.displayName || '');
  const [phone, setPhone] = useState(userProfile?.phoneNumber || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [address, setAddress] = useState(userProfile?.address || '');
  const [city, setCity] = useState(userProfile?.city || '');
  const [postalCode, setPostalCode] = useState(userProfile?.postalCode || '');
  const [hairConcerns, setHairConcerns] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'cod' | 'online'>('whatsapp');
  
  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-[#d6c4a5] mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-[#173124]">Your Basket is Empty</h2>
        <p className="text-xs text-[#424844]">Please add sacred hair packs before proceeding to checkout.</p>
        <button
          onClick={() => navigateTo('products')}
          className="px-6 py-2.5 rounded-full bg-[#173124] text-white text-xs font-semibold"
        >
          Explore Formulations
        </button>
      </div>
    );
  }

  const shipping = cartSubtotal >= 999 ? 0 : 70;
  const finalTotal = Math.max(0, cartSubtotal - appliedDiscount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VEDIC10' || promoCode.trim().toUpperCase() === 'FIRST10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setAppliedDiscount(discount);
      showToast(`Promo applied! Saved ₹${discount}`);
    } else {
      showToast('Invalid promo code. Try VEDIC10 for 10% off', 'error');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      showToast('Please fill all mandatory shipping fields', 'error');
      return;
    }

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      size: item.selectedSize,
      quantity: item.quantity,
      price: item.unitPrice * item.quantity
    }));

    const newOrder = createOrder({
      customerName: name,
      phone,
      email,
      address,
      city,
      postalCode,
      hairConcerns,
      items: orderItems,
      subtotal: cartSubtotal,
      shipping,
      discount: appliedDiscount,
      total: finalTotal,
      paymentMethod,
      status: paymentMethod === 'whatsapp' ? 'Pending WhatsApp' : 'Processing',
      notes: hairConcerns
    });

    if (paymentMethod === 'whatsapp') {
      const itemsList = orderItems.map((it, idx) => `${idx + 1}. ${it.productName} (${it.size}) x${it.quantity} = ₹${it.price}`).join('\n');
      const text = `🌿 *KeshAura Order Confirmation (#${newOrder.id})* 🌿\n\n` +
        `*Customer Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        `*Delivery Address:* ${address}, ${city} - ${postalCode}\n` +
        (hairConcerns ? `*Hair Concern / Customization:* ${hairConcerns}\n` : '') +
        `\n*Items Ordered:*\n${itemsList}\n\n` +
        `• Subtotal: ₹${cartSubtotal}\n` +
        (appliedDiscount > 0 ? `• Discount: -₹${appliedDiscount}\n` : '') +
        `• Shipping: ${shipping === 0 ? 'FREE' : `₹${shipping}`}\n` +
        `• *Total Payable:* ₹${finalTotal}\n\n` +
        `Please confirm my order and send payment QR / UPI instructions. Thank you!`;
      
      const url = generateWhatsAppUrl(text);
      navigateTo('order-success');
      window.open(url, '_blank');
    } else {
      navigateTo('order-success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => navigateTo('products')}
          className="text-xs text-[#727973] hover:text-[#173124] flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Apothecary
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Shipping & Payment Form */}
        <form onSubmit={handleCompleteOrder} className="lg:col-span-7 space-y-8">
          
          {/* Member Login Notice / Greeting */}
          {!userProfile ? (
            <div className="bg-[#f0debd]/30 border border-[#d6c4a5] p-4 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#173124]">Have a KeshAura Member Account?</p>
                <p className="text-[11px] text-[#6a5d43]">Log in to auto-fill address and save this order to your history.</p>
              </div>
              <button
                type="button"
                id="checkout-login-trigger-btn"
                onClick={() => {
                  setAuthModalTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-2 bg-[#173124] text-white hover:bg-[#2d4739] rounded-full text-xs font-bold shrink-0 transition-colors shadow-2xs"
              >
                Log In (লগ ইন)
              </button>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-emerald-900">Signed in as {userProfile.displayName || userProfile.email}</p>
                <p className="text-[11px] text-emerald-700">Your address and contact details have been pre-filled from your profile.</p>
              </div>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                Ayurvedic Member ✓
              </span>
            </div>
          )}

          {/* Section 1: Customer Details */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#eae8e4] shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#173124] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#173124] text-white text-xs flex items-center justify-center font-sans">
                1
              </span>
              <span>Delivery & Contact Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#173124] font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ananya Nair"
                  className="w-full p-3 rounded-xl bg-[#fbf9f5] border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                />
              </div>

              <div>
                <label className="block text-[#173124] font-bold mb-1">WhatsApp Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98450 12345"
                  className="w-full p-3 rounded-xl bg-[#fbf9f5] border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-[#173124] font-bold mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ananya@gmail.com (for order tracking receipt)"
                className="w-full p-3 rounded-xl bg-[#fbf9f5] border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
              />
            </div>

            <div className="text-xs">
              <label className="block text-[#173124] font-bold mb-1">Street Address / House No. *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Flat 302, Palm Grove Apts, MG Road"
                className="w-full p-3 rounded-xl bg-[#fbf9f5] border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#173124] font-bold mb-1">City / Town *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Bengaluru"
                  className="w-full p-3 rounded-xl bg-[#fbf9f5] border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                />
              </div>
              <div>
                <label className="block text-[#173124] font-bold mb-1">PIN / Postal Code *</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="560001"
                  className="w-full p-3 rounded-xl bg-[#fbf9f5] border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                />
              </div>
            </div>

            <div className="text-xs pt-2">
              <label className="block text-[#173124] font-bold mb-1">
                Custom Hair Notes / Specific Scalp Irritations (Optional)
              </label>
              <textarea
                rows={2}
                value={hairConcerns}
                onChange={(e) => setHairConcerns(e.target.value)}
                placeholder="e.g. High hair shedding, oily scalp, prefer mild scent..."
                className="w-full p-3 rounded-xl bg-[#fbf9f5] border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
              />
            </div>
          </div>

          {/* Section 2: Payment Option */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#eae8e4] shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#173124] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#173124] text-white text-xs flex items-center justify-center font-sans">
                2
              </span>
              <span>Payment & Order Method</span>
            </h3>

            <div className="space-y-3">
              {/* WhatsApp Express Option */}
              <label
                onClick={() => setPaymentMethod('whatsapp')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'whatsapp'
                    ? 'border-[#173124] bg-[#2d4739]/5 ring-1 ring-[#173124]'
                    : 'border-[#eae8e4] bg-white hover:border-[#c2c8c2]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f0debd] flex items-center justify-center text-[#173124]">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-sm text-[#173124]">
                        WhatsApp 1-Click Order & UPI Confirmation
                      </h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-[#424844] mt-0.5">
                      Fastest option. Our concierge verifies dispatch address and shares direct UPI / QR link on WhatsApp.
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'whatsapp'}
                  onChange={() => setPaymentMethod('whatsapp')}
                  className="accent-[#173124] w-4 h-4"
                />
              </label>

              {/* COD Option */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#173124] bg-[#2d4739]/5 ring-1 ring-[#173124]'
                    : 'border-[#eae8e4] bg-white hover:border-[#c2c8c2]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#eae8e4] flex items-center justify-center text-[#173124]">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#173124]">
                      Cash on Delivery (COD)
                    </h4>
                    <p className="text-xs text-[#424844] mt-0.5">
                      Pay cash or UPI upon delivery to courier partner.
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="accent-[#173124] w-4 h-4"
                />
              </label>

              {/* Online Pre-pay Option */}
              <label
                onClick={() => setPaymentMethod('online')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'online'
                    ? 'border-[#173124] bg-[#2d4739]/5 ring-1 ring-[#173124]'
                    : 'border-[#eae8e4] bg-white hover:border-[#c2c8c2]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#eae8e4] flex items-center justify-center text-[#173124]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#173124]">
                      Online Payment (UPI, Cards, NetBanking)
                    </h4>
                    <p className="text-xs text-[#424844] mt-0.5">
                      Secure encrypted payment gateway.
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                  className="accent-[#173124] w-4 h-4"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-[#173124] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#2d4739] shadow-lg transition-all"
          >
            {paymentMethod === 'whatsapp' ? (
              <>
                <MessageCircle className="w-5 h-5 text-[#f0debd]" />
                <span>Place Order & Open WhatsApp (₹{finalTotal})</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Confirm Sacred Order (₹{finalTotal})</span>
              </>
            )}
          </button>

        </form>

        {/* Right Order Summary Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#eae8e4] shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#173124]">
              Order Summary ({cart.length} items)
            </h3>

            {/* Cart item list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex items-center gap-3 pb-3 border-b border-[#f5f3ef]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover bg-[#f5f3ef] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif font-bold text-xs text-[#173124] truncate">
                      {item.product.name}
                    </h5>
                    <p className="text-[11px] text-[#6a5d43]">{item.selectedSize}</p>
                    <p className="text-[11px] text-[#424844]">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-xs text-[#173124]">
                    ₹{item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Box */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-[#727973] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Promo Code (try VEDIC10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#fbf9f5] border border-[#c2c8c2] text-xs uppercase text-[#173124] focus:outline-none focus:border-[#173124]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#173124] text-white text-xs font-semibold rounded-xl hover:bg-[#2d4739]"
              >
                Apply
              </button>
            </form>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-[#424844] pt-2 border-t border-[#eae8e4]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#173124]">₹{cartSubtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Special Ritual Discount</span>
                  <span>-₹{appliedDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Sacred Express Shipping</span>
                <span className="font-semibold text-emerald-800">
                  {shipping === 0 ? 'FREE' : '₹70'}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#173124] pt-3 border-t border-[#eae8e4]">
                <span>Total Amount</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <div className="p-3 bg-[#f5f3ef] rounded-2xl text-[11px] text-[#424844] space-y-1">
              <p className="font-bold text-[#173124]">🌿 Freshness Guarantee:</p>
              <p>Every KeshAura pack is stone-milled in fresh micro-batches to guarantee live antioxidant activity.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
