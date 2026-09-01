import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, MessageCircle, ShoppingBag, CheckCircle2, ShieldCheck, Heart, Sparkles, Plus, Minus, ArrowLeft, ArrowRight, Share2, Leaf, Droplets, Clock } from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    orderViaWhatsApp,
    navigateTo,
    reviews,
    addReview,
    products,
    showToast
  } = useStore();

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#173124]">Product Not Found</h2>
        <button
          onClick={() => navigateTo('products')}
          className="mt-4 px-6 py-2 rounded-full bg-[#173124] text-white text-xs font-semibold"
        >
          Return to Apothecary
        </button>
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState<string>(selectedProduct.gallery[0] || selectedProduct.image);
  const [selectedSize, setSelectedSize] = useState<string>(selectedProduct.sizes[0].weight);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'usage' | 'benefits' | 'dosha'>('ingredients');

  // Review Form State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewDosha, setReviewDosha] = useState('Vata-Pitta');

  const currentSizeObj = selectedProduct.sizes.find(s => s.weight === selectedSize) || selectedProduct.sizes[0];
  const unitPrice = Math.round(selectedProduct.price * currentSizeObj.priceMultiplier);
  const totalPrice = unitPrice * quantity;

  // Filter reviews for this product (or fallback)
  const productReviews = reviews.filter(r => r.productId === selectedProduct.id || r.productId === 'keshaura-organic-hair-pack');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    addReview({
      productId: selectedProduct.id,
      author: reviewAuthor,
      location: reviewLocation || 'India',
      rating: reviewRating,
      title: reviewTitle || 'Transformative hair ritual',
      comment: reviewComment,
      verified: true,
      doshaType: reviewDosha
    });

    setShowReviewModal(false);
    setReviewAuthor('');
    setReviewComment('');
    setReviewTitle('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  const relatedProducts = products.filter(p => p.id !== selectedProduct.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#727973]">
        <button onClick={() => navigateTo('home')} className="hover:text-[#173124]">Home</button>
        <span>/</span>
        <button onClick={() => navigateTo('products')} className="hover:text-[#173124]">Apothecary</button>
        <span>/</span>
        <span className="text-[#173124] font-medium truncate">{selectedProduct.name}</span>
      </div>

      {/* Main Product Layout (Screens 4 & 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Gallery Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-[#eae8e4] p-4 shadow-ambient-2 relative">
            <img
              src={activeImage}
              alt={selectedProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl transition-all duration-300"
            />
            {selectedProduct.badge && (
              <span className="absolute top-8 left-8 bg-[#173124] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                {selectedProduct.badge}
              </span>
            )}
            <button
              onClick={handleShare}
              className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-[#173124] flex items-center justify-center hover:bg-[#f0debd] transition-colors shadow-sm"
              title="Share Formulation"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails Row */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {selectedProduct.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-white p-1 ${
                  activeImage === img
                    ? 'border-[#173124] ring-2 ring-[#173124]/20'
                    : 'border-[#eae8e4] opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Details Column */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-amber-600">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-xs text-[#173124]">{selectedProduct.rating}</span>
              <span className="text-xs text-[#727973]">({selectedProduct.reviewCount} reviews)</span>
              <span className="text-xs text-[#b0cdbb]">•</span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                100% Organic Certified
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173124]">
              {selectedProduct.name}
            </h1>
            <p className="text-sm text-[#6a5d43] font-medium mt-1">
              {selectedProduct.subtitle}
            </p>
          </div>

          {/* Pricing & Savings */}
          <div className="p-4 bg-white rounded-2xl border border-[#eae8e4] flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#173124]">
                  ₹{unitPrice}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-[#727973] line-through">
                    ₹{Math.round(selectedProduct.originalPrice * currentSizeObj.priceMultiplier)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#424844] mt-0.5">
                Inclusive of all taxes • Fresh batch ground within 7 days
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 rounded-full bg-[#f0debd]/80 text-[#173124] text-xs font-bold">
                In Stock ({selectedProduct.stock} units)
              </span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#424844] leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Size / Weight Selector */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-[#173124]">
              <span>Select Ritual Volume:</span>
              <span className="text-[#6a5d43]">{selectedSize}</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {selectedProduct.sizes.map((s) => (
                <button
                  key={s.weight}
                  onClick={() => setSelectedSize(s.weight)}
                  className={`p-3 rounded-xl border text-left flex justify-between items-center transition-all ${
                    selectedSize === s.weight
                      ? 'border-[#173124] bg-[#2d4739]/5 ring-1 ring-[#173124]'
                      : 'border-[#c2c8c2]/50 bg-white hover:border-[#173124]/40'
                  }`}
                >
                  <span className="text-xs font-medium text-[#173124]">{s.weight}</span>
                  <span className="text-xs font-bold text-[#173124]">
                    ₹{Math.round(selectedProduct.price * s.priceMultiplier)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#c2c8c2] rounded-full bg-white px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-[#173124] hover:text-black transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold px-3 text-[#173124] min-w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-[#173124] hover:text-black transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                id="pdp-add-to-cart-btn"
                onClick={() => addToCart(selectedProduct, selectedSize, quantity)}
                className="flex-1 py-3.5 rounded-full bg-[#173124] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#2d4739] transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Basket • ₹{totalPrice}</span>
              </button>
            </div>

            {/* WhatsApp Direct 1-Click Order */}
            <button
              id="pdp-whatsapp-order-btn"
              onClick={() => orderViaWhatsApp(selectedProduct, selectedSize, quantity)}
              className="w-full py-3.5 rounded-full bg-[#f0debd] border border-[#d6c4a5] text-[#173124] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#f3e0c0] transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#173124]" />
              <span>Instant Order via WhatsApp (01618567449)</span>
            </button>
          </div>

          {/* Purity & Trust Strip */}
          <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-[#424844] border-t border-[#eae8e4]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>100% Raw Bio-Active Herbs</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>2-4 Business Day Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>No Added Preservatives</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>Solar Dried in Malabar</span>
            </div>
          </div>

        </div>

      </div>

      {/* Accordion / Tabs Section */}
      <div className="bg-white rounded-3xl border border-[#eae8e4] p-6 sm:p-10 shadow-ambient-1 space-y-8">
        
        {/* Tab Headers */}
        <div className="flex flex-wrap gap-2 sm:gap-4 border-b border-[#eae8e4] pb-4">
          {[
            { id: 'ingredients', label: 'Sacred Ingredients' },
            { id: 'usage', label: 'How to Use & Rituals' },
            { id: 'benefits', label: 'Clinical & Ayurvedic Benefits' },
            { id: 'dosha', label: 'Dosha & Scent Profile' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#173124] text-white shadow-xs'
                  : 'bg-[#f5f3ef] text-[#424844] hover:bg-[#eae8e4]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="pt-2">
          
          {/* 1. Ingredients Tab */}
          {activeTab === 'ingredients' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#173124]">
                  Whole Herbs in Every Jar
                </h3>
                <p className="text-xs text-[#424844] mt-1">
                  We never use extracted concentrates. Every botanical is harvested at sunrise in Kerala and stone-milled intact.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProduct.ingredients.map((ing) => (
                  <div key={ing.name} className="p-4 bg-[#fbf9f5] rounded-2xl border border-[#eae8e4]">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#173124]">{ing.name}</h4>
                        <span className="text-[11px] text-[#6a5d43] italic">{ing.botanical}</span>
                      </div>
                      {ing.percentage && (
                        <span className="text-xs font-bold text-[#173124] bg-[#f0debd]/80 px-2 py-0.5 rounded-full">
                          {ing.percentage}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#424844] mt-2 leading-relaxed">
                      {ing.benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Usage Rituals Tab */}
          {activeTab === 'usage' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#173124]">
                  The Ancestral Application Ritual
                </h3>
                <p className="text-xs text-[#424844] mt-1">
                  Follow this sacred ceremony once or twice a week for optimal scalp revitalisation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedProduct.usageSteps.map((step) => (
                  <div key={step.step} className="p-5 bg-[#fbf9f5] rounded-2xl border border-[#eae8e4] relative">
                    <span className="font-serif text-3xl font-bold text-[#d6c4a5] block mb-2">
                      0{step.step}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#173124] mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#424844] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mixing Matrix */}
              <div className="bg-[#f0debd]/30 p-5 rounded-2xl border border-[#d6c4a5]/40 text-xs text-[#424844] space-y-2">
                <h4 className="font-serif font-bold text-sm text-[#173124]">
                  🥣 Recommended Mixers by Scalp Need:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li><b>For Extreme Dryness / Frizz:</b> Mix with fresh yogurt/curd and 1 tsp almond oil.</li>
                  <li><b>For Dandruff & Flaking:</b> Mix with lukewarm water and 1 tablespoon pure aloe vera gel.</li>
                  <li><b>For Oily Roots:</b> Mix with pure rose water or cooled green tea infusion.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 3. Clinical & Ayurvedic Benefits Tab */}
          {activeTab === 'benefits' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#173124]">
                  Holistic & Clinical Benefits
                </h3>
                <p className="text-xs text-[#424844] mt-1">
                  Visible transformation backed by thousands of Ayurvedic records.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedProduct.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-[#fbf9f5] rounded-2xl border border-[#eae8e4]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                    <span className="text-xs text-[#173124] font-medium leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Dosha & Scent Profile Tab */}
          {activeTab === 'dosha' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#fbf9f5] rounded-2xl border border-[#eae8e4] space-y-3">
                  <h4 className="font-serif font-bold text-base text-[#173124]">
                    Dosha Balance
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.dosha.map((d) => (
                      <span key={d} className="px-3 py-1 bg-[#173124] text-white text-xs rounded-full font-medium">
                        {d} Compatible
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-[#424844] leading-relaxed">
                    Designed to pacify excess Vata dryness and soothe hyperactive Pitta heat in the scalp without aggravating Kapha greasiness.
                  </p>
                </div>

                <div className="p-6 bg-[#fbf9f5] rounded-2xl border border-[#eae8e4] space-y-3">
                  <h4 className="font-serif font-bold text-base text-[#173124]">
                    Aroma & Olfactory Notes
                  </h4>
                  <p className="text-xs font-semibold text-[#6a5d43]">
                    {selectedProduct.scentProfile}
                  </p>
                  <p className="text-xs text-[#424844] leading-relaxed">
                    Zero synthetic perfumes. What you smell is the raw, grounding aroma of sun-cured Bhringraj, whole amla fruit, and crushed hibiscus petals.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Customer Reviews Section */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#6a5d43]">
              Community Wisdom
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173124]">
              Sacred Customer Reviews ({productReviews.length})
            </h2>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="px-6 py-2.5 rounded-full bg-[#173124] text-white text-xs font-semibold hover:bg-[#2d4739] transition-all self-start sm:self-auto"
          >
            Write a Review
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productReviews.map((rev) => (
            <div key={rev.id} className="p-6 bg-white rounded-3xl border border-[#eae8e4] shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-600">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  {rev.doshaType && (
                    <span className="text-[10px] text-[#6a5d43] bg-[#f5f3ef] px-2 py-0.5 rounded-full font-medium">
                      {rev.doshaType}
                    </span>
                  )}
                </div>
                <h4 className="font-serif font-bold text-sm text-[#173124]">{rev.title}</h4>
                <p className="text-xs text-[#424844] leading-relaxed italic">"{rev.comment}"</p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#eae8e4]">
                {rev.avatarUrl ? (
                  <img src={rev.avatarUrl} alt={rev.author} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#173124] text-white flex items-center justify-center text-xs font-bold">
                    {rev.author.charAt(0)}
                  </div>
                )}
                <div>
                  <h5 className="font-serif font-bold text-xs text-[#173124] flex items-center gap-1">
                    {rev.author}
                    {rev.verified && <CheckCircle2 className="w-3 h-3 text-emerald-700" />}
                  </h5>
                  <p className="text-[10px] text-[#727973]">{rev.location} • {rev.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setShowReviewModal(false)} />
          <div className="relative bg-[#fbf9f5] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#c2c8c2] z-10 animate-in zoom-in-95">
            <h3 className="font-serif text-xl font-bold text-[#173124] mb-1">
              Share Your Hair Journey
            </h3>
            <p className="text-xs text-[#424844] mb-4">
              Your feedback guides other seekers to authentic Ayurvedic remedies.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#173124] font-medium mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                  placeholder="e.g. Meera Sharma"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#173124] font-medium mb-1">City / Region</label>
                  <input
                    type="text"
                    value={reviewLocation}
                    onChange={(e) => setReviewLocation(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                    placeholder="e.g. Chennai, India"
                  />
                </div>
                <div>
                  <label className="block text-[#173124] font-medium mb-1">Rating</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                    <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                    <option value={3}>⭐⭐⭐ 3 Stars</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#173124] font-medium mb-1">Review Headline</label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                  placeholder="e.g. Stopped hair shedding in 2 weeks!"
                />
              </div>

              <div>
                <label className="block text-[#173124] font-medium mb-1">Your Detailed Experience *</label>
                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                  placeholder="Describe the texture, hair growth results, aroma, and mixing ritual you used..."
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 rounded-full text-xs text-[#727973] hover:text-[#173124]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#173124] text-white font-semibold hover:bg-[#2d4739]"
                >
                  Submit Sacred Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Related Formulations Carousel */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-[#eae8e4] space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif font-bold text-2xl text-[#173124]">
              Complete Your Hair Sanctuary
            </h3>
            <button
              onClick={() => navigateTo('products')}
              className="text-xs font-bold text-[#173124] hover:underline"
            >
              View All Formulations →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rp) => (
              <div
                key={rp.id}
                onClick={() => navigateTo('product-detail', rp.id)}
                className="group cursor-pointer bg-white p-4 rounded-3xl border border-[#eae8e4] hover:border-[#c2c8c2] shadow-sm transition-all"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#f5f3ef] mb-3">
                  <img
                    src={rp.image}
                    alt={rp.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#173124] truncate">
                  {rp.name}
                </h4>
                <p className="text-xs text-[#6a5d43] truncate">{rp.subtitle}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold text-sm text-[#173124]">₹{rp.price}</span>
                  <span className="text-xs font-semibold text-emerald-800">Learn More →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
