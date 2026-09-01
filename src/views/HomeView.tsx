import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AYURVEDIC_HERBS } from '../data/products';
import { HairQuizModal } from '../components/HairQuizModal';
import { Sparkles, ArrowRight, MessageCircle, Star, ShieldCheck, Leaf, Heart, CheckCircle2, Play } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { products, addToCart, navigateTo, orderViaWhatsApp, reviews } = useStore();
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedHerb, setSelectedHerb] = useState(AYURVEDIC_HERBS[0]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const mainHairPack = products[0];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      <HairQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center bg-[#f5f3ef] overflow-hidden pt-8 pb-16 lg:py-24 border-b border-[#c2c8c2]/30">
        
        {/* Background botanical texture */}
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxF9flL2PpM4N7zodMHaKujBGSR8r7FqBogfyiKwBJu-XVX0n0U3_OrOyzy2x7LGbtUWV8xo8GIXQbkiGgm9JOBJrh_yr7trhVpKqiPTbGsOPssDhgk-f1E9CDyolQWyFXSmbjBV8I4zcdWA1fGmK4cwZBMODBp2111OuwiUNtP_v4FPrdM820INHEKQNA03uijf-JbLFWMPVer49vRjc5pqbUM3I6j8gTJoAykMRuKoiW9Fh5KO9RQg')`
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0debd]/80 border border-[#d6c4a5] text-[#173124] text-xs font-semibold tracking-wide shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-[#173124]" />
                <span>Handcrafted in Small Sacred Batches • Kerala, India</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#173124] leading-[1.15]">
                Pure Ayurvedic Care for <span className="italic font-normal">Sacred Hair Rituals</span>
              </h1>

              <p className="text-base sm:text-lg text-[#424844] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Ancient cold-stone ground botanical hair packs made from 18 wild-harvested herbs. Formulated to stop hair fall, awaken dormant follicles, and restore radiant natural shine.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-medium text-[#173124]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                  <span>100% Certified Organic</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                  <span>Zero Preservatives & Chemicals</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                  <span>Stone-Ground Bio-Active</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  id="hero-explore-collection-btn"
                  onClick={() => navigateTo('products')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#173124] text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#2d4739] transition-all shadow-lg hover:shadow-xl group"
                >
                  <span>Explore Formulations</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-quiz-trigger-btn"
                  onClick={() => setIsQuizOpen(true)}
                  className="w-full sm:w-auto px-6 py-4 rounded-full bg-white border border-[#c2c8c2] text-[#173124] font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#eae8e4] transition-all shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Take Hair Dosha Quiz</span>
                </button>
              </div>

              {/* Social Proof Strip */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-[#424844]">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuClnX47ugvuqpgFT9u1NQCWSUsO3gw-UK70F-DFbnZliBAxdN3tlvNLaOIimrXkybEmBIeRS8BaTRE09WCjjbBtyziiugIkpxR2hYaFPfxMjkCjFWf88LIcx2cEwvFy3HsG0x5M4aebi2_fv2FpA8AxUS5ogay7HdjwTA2HNzq2aSrteO-_STVbt0P_kccJJX1u8_iJ1J3USSLrfcI6rD8R10zc2dDElPvTgIIGhrTdmC1_huEJ3GEmHg"
                    alt="Customer"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFpqc-BR5If8BISMIG9gRC_JInAPVCJMg8_GWNkavGTcehfFP7BdDQLiglp4W7LT_t_WyztqrcsMfe-ZJXPIIXRYwbFIBE94Zj79kc8uVt4P73g95UZO-JdVj7paPkHvwbA826sM3LigJRkGoNcBFKewDU8iTx0DWfhwtWNcyKwxIqjor3ttUzwo43Fym3CY8l0WOwR1dGg34o9Xwf-JcPRhk_Ecr3-WA0dnQo4GugD7BvlJfmC5H7rg"
                    alt="Customer"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7OC7RsFJagJ43NF6T8bvLsmk6RDwuNMJSLNRe_ubz-agPhpccqLcFSBz5EFB1RmsFFd7zkxmHibOItQUfNjbYPK14e-KZpvzE2Yq-7fK0V817w-1SSiZo1oJEOUAN3p6nqSyzrhpTccIpEXrVw3CPGktkhG1j2sZSq7EO7lzxwThEG4ubGm7BqbFcPOqXEMG_XmnsuAw85g-tv88Du27tCwe073PjaWEcmNO0JME_D5Y_Jt_k2bYvkQ"
                    alt="Customer"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex items-center text-amber-600">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="font-medium text-[#173124]">
                    4.9/5 from 3,400+ sacred hair rituals
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Product Showcase with Pedestal Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                
                {/* Decorative glow badge */}
                <div className="absolute -top-4 -right-4 z-20 bg-[#f0debd] text-[#173124] px-4 py-2 rounded-2xl font-serif font-bold text-xs shadow-lg border border-white rotate-6">
                  ✨ The 18-Herb Blend
                </div>

                {/* Hero Product Card Image */}
                <div 
                  onClick={() => navigateTo('product-detail', mainHairPack.id)}
                  className="group cursor-pointer relative bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-[#eae8e4] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="overflow-hidden rounded-2xl aspect-4/5 bg-[#fbf9f5] relative">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2-XBU6AzB_zNLcSj0-04RIenltxhR1rvtltkek7E7GkQQ_Xm7SLa2CP4QBmWytl4Dg5sUkBKvlXX13p6VFjjjWxaVzbmpgYFGrxuvhy0qeYvjIdffhwwnRICIu0A26QYdvk0Y4poq1ApilyOMX8doqnNAni25Na_aiX8PJLS2yxBsO6ghL5fOmUwBXLW_Kb_j7XoMmtZyfstNbu1HU2br0JKnMvCWmB9vY7woqBQOtFc4HhutgS0oQg"
                      alt="KeshAura Organic Hair Pack on Stone Pedestal"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#c2c8c2]/50 shadow-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-serif font-bold text-sm text-[#173124]">
                            {mainHairPack.name}
                          </h4>
                          <p className="text-[11px] text-[#6a5d43]">Starts at ₹{mainHairPack.price} • 100g Jar</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                          In Stock
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(mainHairPack, mainHairPack.sizes[0].weight, 1);
                      }}
                      className="flex-1 py-2.5 rounded-full bg-[#173124] text-white text-xs font-semibold hover:bg-[#2d4739] transition-colors text-center"
                    >
                      Add to Basket
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        orderViaWhatsApp(mainHairPack, mainHairPack.sizes[0].weight, 1);
                      }}
                      className="p-2.5 rounded-full bg-[#f0debd] text-[#173124] hover:bg-[#f3e0c0] transition-colors"
                      title="Quick Order on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE POTENT AYURVEDIC BLEND (Interactive Herb Circle) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6a5d43]">
            Sourced From Sacred Soils
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173124] mt-1">
            The Potent Botanical Blend
          </h2>
          <p className="text-sm text-[#424844] mt-2">
            No extracts. No diluted isolates. We use whole solar-dried Ayurvedic herbs cold stone-milled to retain maximum bio-potency.
          </p>
        </div>

        {/* Herb Selector Pills / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {AYURVEDIC_HERBS.map((herb) => (
            <button
              key={herb.name}
              onClick={() => setSelectedHerb(herb)}
              className={`p-4 rounded-2xl border text-center transition-all duration-200 ${
                selectedHerb.name === herb.name
                  ? 'bg-[#173124] text-white border-[#173124] shadow-md -translate-y-1'
                  : 'bg-white text-[#173124] border-[#eae8e4] hover:border-[#c2c8c2] hover:bg-[#fbf9f5]'
              }`}
            >
              <span className="text-xs font-bold font-serif block mb-0.5">{herb.name}</span>
              <span className={`text-[10px] block ${selectedHerb.name === herb.name ? 'text-[#f0debd]' : 'text-[#6a5d43]'}`}>
                {herb.hindi}
              </span>
            </button>
          ))}
        </div>

        {/* Detailed Selected Herb Spotlight Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eae8e4] shadow-ambient-2 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f0debd]/60 flex items-center justify-center text-[#173124] shrink-0">
            <Leaf className="w-10 h-10 text-[#173124]" />
          </div>
          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="inline-block px-3 py-1 rounded-full bg-[#f5f3ef] text-[#173124] text-xs font-bold uppercase tracking-wider">
              {selectedHerb.tag}
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#173124]">
              {selectedHerb.name} ({selectedHerb.hindi})
            </h3>
            <p className="text-sm text-[#424844] leading-relaxed max-w-3xl">
              {selectedHerb.description}
            </p>
          </div>
          <button
            onClick={() => navigateTo('products')}
            className="shrink-0 px-6 py-3 rounded-full bg-[#173124] text-white text-xs font-semibold hover:bg-[#2d4739] transition-all flex items-center gap-1.5"
          >
            <span>View Formulations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. CURATED HAIR FORMULATIONS (Product Grid with Screen 3 style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6a5d43]">
              Pure & Whole
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173124] mt-1">
              Curated Hair Formulations
            </h2>
          </div>
          <button
            onClick={() => navigateTo('products')}
            className="text-xs font-bold text-[#173124] hover:text-[#2d4739] flex items-center gap-1 self-start md:self-auto hover:underline"
          >
            <span>View Complete Apothecary ({products.length} Formulations)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigateTo('product-detail', product.id)}
              className="group cursor-pointer bg-white rounded-3xl border border-[#eae8e4] p-4 flex flex-col justify-between hover:shadow-xl hover:border-[#c2c8c2] transition-all duration-300"
            >
              <div>
                {/* Product Image Frame */}
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#f5f3ef] relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#173124] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      orderViaWhatsApp(product, product.sizes[0].weight, 1);
                    }}
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#173124] flex items-center justify-center hover:bg-[#f0debd] transition-colors shadow-md"
                    title="Order on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-600 text-xs mb-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-[#173124]">{product.rating}</span>
                  <span className="text-[#727973]">({product.reviewCount})</span>
                </div>

                {/* Product Title */}
                <h3 className="font-serif font-bold text-base text-[#173124] line-clamp-1 group-hover:text-[#2d4739] transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-[#6a5d43] mt-0.5 line-clamp-1">
                  {product.subtitle}
                </p>
                <p className="text-xs text-[#424844] mt-2 line-clamp-2 leading-relaxed">
                  {product.tagline}
                </p>
              </div>

              {/* Price & Add to Cart button */}
              <div className="pt-4 mt-4 border-t border-[#eae8e4] flex items-center justify-between">
                <div>
                  <span className="font-bold text-base text-[#173124]">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-[#727973] line-through ml-1.5">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, product.sizes[0].weight, 1);
                  }}
                  className="px-4 py-2 rounded-full bg-[#173124] text-white text-xs font-semibold hover:bg-[#2d4739] transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE 3-STEP SACRED HAIR RITUAL */}
      <section className="bg-[#f5f3ef] py-16 border-y border-[#c2c8c2]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6a5d43]">
              Mindful Application
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173124] mt-1">
              The 3-Step Ayurvedic Hair Ritual
            </h2>
            <p className="text-sm text-[#424844] mt-2">
              Transform a mundane hair wash into a deeply meditative Vedic restorative ceremony.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-3xl border border-[#eae8e4] shadow-ambient-1 relative">
              <span className="font-serif text-4xl font-bold text-[#d6c4a5] opacity-50 absolute top-6 right-6">
                01
              </span>
              <div className="w-12 h-12 rounded-2xl bg-[#f0debd]/60 flex items-center justify-center text-[#173124] mb-6">
                <span className="material-symbols-outlined text-2xl">science</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#173124] mb-2">
                Mix & Awaken
              </h3>
              <p className="text-xs text-[#424844] leading-relaxed">
                Take 2–3 tablespoons of KeshAura powder into a bowl. Blend with warm water, curd, or rose water to create a creamy herbal paste. Let it bloom for 10 minutes to release active phyto-nutrients.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-3xl border border-[#eae8e4] shadow-ambient-1 relative">
              <span className="font-serif text-4xl font-bold text-[#d6c4a5] opacity-50 absolute top-6 right-6">
                02
              </span>
              <div className="w-12 h-12 rounded-2xl bg-[#f0debd]/60 flex items-center justify-center text-[#173124] mb-6">
                <span className="material-symbols-outlined text-2xl">spa</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#173124] mb-2">
                Root-to-Tip Infusion
              </h3>
              <p className="text-xs text-[#424844] leading-relaxed">
                Part your hair in sections. Gently massage the soothing paste into your scalp using circular motions, then coat through hair strands to seal cuticles.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-3xl border border-[#eae8e4] shadow-ambient-1 relative">
              <span className="font-serif text-4xl font-bold text-[#d6c4a5] opacity-50 absolute top-6 right-6">
                03
              </span>
              <div className="w-12 h-12 rounded-2xl bg-[#f0debd]/60 flex items-center justify-center text-[#173124] mb-6">
                <span className="material-symbols-outlined text-2xl">water_drop</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#173124] mb-2">
                Rinse in Serenity
              </h3>
              <p className="text-xs text-[#424844] leading-relaxed">
                Rest for 30–45 minutes. Rinse thoroughly with lukewarm water. The herbal saponins cleanse scalp sebum effortlessly without needing synthetic shampoos.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setIsQuizOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#173124] text-white text-xs font-bold hover:bg-[#2d4739] shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#f0debd]" />
              <span>Find My Custom Mixing Ratio Quiz</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. SACRED TESTIMONIALS & RESULTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6a5d43]">
            Verified Journeys
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173124] mt-1">
            Sacred Hair Transformations
          </h2>
          <p className="text-sm text-[#424844] mt-2">
            Real experiences from seekers who replaced chemical shampoos with ancestral hair packs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-[#eae8e4] shadow-ambient-1 flex flex-col justify-between space-y-4 hover:border-[#c2c8c2] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-600">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  {rev.doshaType && (
                    <span className="text-[10px] font-bold text-[#173124] bg-[#f5f3ef] px-2 py-0.5 rounded-full">
                      Dosha: {rev.doshaType}
                    </span>
                  )}
                </div>
                
                <h4 className="font-serif font-bold text-sm text-[#173124]">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-[#424844] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#eae8e4]">
                {rev.avatarUrl ? (
                  <img
                    src={rev.avatarUrl}
                    alt={rev.author}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-[#c2c8c2]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#173124] text-white flex items-center justify-center font-bold text-xs">
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
      </section>

      {/* 6. WHATSAPP CONCIERGE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#173124] rounded-3xl p-8 sm:p-12 text-[#fbf9f5] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f0debd] flex items-center justify-center md:justify-start gap-1.5">
              <MessageCircle className="w-4 h-4" /> Personal Ayurvedic Guidance
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Unsure which hair formulation fits your scalp dosha?
            </h3>
            <p className="text-xs sm:text-sm text-[#b0cdbb] leading-relaxed">
              Connect with our resident Ayurvedic practitioner on WhatsApp for personalized herbal dosage, customized mixing recipes, or express checkout.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/8801618567449?text=Namaste!%20I%20would%20like%20a%20personal%20hair%20pack%20recommendation."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#f0debd] text-[#173124] font-bold text-xs flex items-center justify-center gap-2 hover:bg-white transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with Vaidya on WhatsApp</span>
            </a>

            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3.5 rounded-full bg-white/10 text-white font-medium text-xs flex items-center justify-center gap-2 hover:bg-white/20 transition-all border border-white/20"
            >
              <span>View Dispensary Info</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
