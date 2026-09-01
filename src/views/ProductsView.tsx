import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, MessageCircle, ShoppingBag, Filter, ArrowRight, Check, Search, Sparkles } from 'lucide-react';

export const ProductsView: React.FC = () => {
  const {
    products,
    addToCart,
    navigateTo,
    orderViaWhatsApp,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedConcern,
    setSelectedConcern
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'All Formulations' },
    { id: 'hair-pack', label: 'Hair Packs & Masks' },
    { id: 'cleanser', label: 'Herbal Washes (No-Poo)' },
    { id: 'scalp-care', label: 'Scalp & Root Detox' }
  ];

  const concerns = [
    'all',
    'Hair Fall',
    'Dandruff',
    'Frizz',
    'Thinning',
    'Premature Greying',
    'Oily Scalp'
  ];

  // Filtering & Sorting logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Concern filter
      if (selectedConcern !== 'all' && !p.hairConcerns.includes(selectedConcern)) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesSub = p.subtitle.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesHerb = p.ingredients.some(i => i.name.toLowerCase().includes(query) || i.botanical.toLowerCase().includes(query));
        if (!matchesName && !matchesSub && !matchesDesc && !matchesHerb) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedCategory, selectedConcern, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-[#f0debd] text-[#173124] text-xs font-bold uppercase tracking-widest">
          The Pure Herbal Apothecary
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#173124]">
          Sacred Ayurvedic Formulations
        </h1>
        <p className="text-sm sm:text-base text-[#424844] leading-relaxed">
          Crafted from 100% natural, sun-cured whole herbs with zero chemicals, preservatives, or artificial fragrances. Order directly via WhatsApp or standard checkout.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#eae8e4] shadow-sm space-y-5">
        
        {/* Top Row: Categories & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#173124] text-white shadow-sm'
                    : 'bg-[#f5f3ef] text-[#424844] hover:bg-[#eae8e4]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box & Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#727973] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search herbs or benefits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-[#fbf9f5] border border-[#c2c8c2]/60 text-xs text-[#173124] focus:outline-none focus:border-[#173124]"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-3 rounded-full bg-[#fbf9f5] border border-[#c2c8c2]/60 text-xs text-[#173124] focus:outline-none focus:border-[#173124] font-medium"
            >
              <option value="featured">Featured</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Concern Pill Tags */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#f5f3ef]">
          <span className="text-xs font-bold text-[#173124] flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-[#6a5d43]" /> Concern:
          </span>
          {concerns.map((con) => (
            <button
              key={con}
              onClick={() => setSelectedConcern(con)}
              className={`text-[11px] px-3 py-1 rounded-full border transition-colors ${
                selectedConcern === con
                  ? 'border-[#173124] bg-[#173124] text-white font-medium'
                  : 'border-[#c2c8c2]/60 bg-white text-[#424844] hover:bg-[#fbf9f5]'
              }`}
            >
              {con === 'all' ? 'All Concerns' : con}
            </button>
          ))}
          {(selectedCategory !== 'all' || selectedConcern !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedConcern('all');
                setSearchQuery('');
              }}
              className="text-[11px] text-amber-900 underline ml-2 font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#eae8e4] p-8">
          <Sparkles className="w-10 h-10 text-[#d6c4a5] mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-[#173124]">No Formulations Found</h3>
          <p className="text-xs text-[#424844] mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or explore our complete hair ritual collection.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedConcern('all');
              setSearchQuery('');
            }}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#173124] text-white text-xs font-semibold"
          >
            Show All Formulations
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigateTo('product-detail', product.id)}
              className="group cursor-pointer bg-white rounded-3xl border border-[#eae8e4] p-5 flex flex-col justify-between hover:shadow-xl hover:border-[#c2c8c2] transition-all duration-300"
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
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#173124] flex items-center justify-center hover:bg-[#f0debd] transition-colors shadow-md"
                    title="Order on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>

                {/* Rating & Dosha */}
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1 text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-[#173124]">{product.rating}</span>
                    <span className="text-[#727973]">({product.reviewCount})</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#6a5d43] bg-[#f5f3ef] px-2 py-0.5 rounded-full">
                    {product.dosha.join(', ')}
                  </span>
                </div>

                {/* Name & Subtitle */}
                <h3 className="font-serif font-bold text-lg text-[#173124] group-hover:text-[#2d4739] transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-[#6a5d43] mt-0.5 font-medium">
                  {product.subtitle}
                </p>
                <p className="text-xs text-[#424844] mt-2.5 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Key Herbs Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {product.ingredients.slice(0, 3).map((ing) => (
                    <span
                      key={ing.name}
                      className="text-[10px] bg-[#f5f3ef] text-[#173124] px-2 py-0.5 rounded-md font-medium"
                    >
                      🌿 {ing.name}
                    </span>
                  ))}
                  {product.ingredients.length > 3 && (
                    <span className="text-[10px] text-[#727973] self-center">
                      +{product.ingredients.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="pt-4 mt-5 border-t border-[#eae8e4] flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif font-bold text-lg text-[#173124]">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#727973] line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#727973] block -mt-0.5">
                    {product.sizes[0].weight.split('(')[0]}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      orderViaWhatsApp(product, product.sizes[0].weight, 1);
                    }}
                    className="p-2.5 rounded-full bg-[#f0debd]/80 text-[#173124] hover:bg-[#f0debd] transition-colors border border-[#d6c4a5]"
                    title="Order via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, product.sizes[0].weight, 1);
                    }}
                    className="px-4 py-2.5 rounded-full bg-[#173124] text-white text-xs font-semibold hover:bg-[#2d4739] transition-colors"
                  >
                    Add to Basket
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Ayurvedic Custom Batch Consultation Strip */}
      <div className="bg-[#f0debd]/40 rounded-3xl p-8 border border-[#d6c4a5]/60 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1">
          <h4 className="font-serif font-bold text-lg text-[#173124]">
            Require a Custom Formulation for Specific Scalp Conditions?
          </h4>
          <p className="text-xs text-[#424844] max-w-xl">
            Our Kerala Vaidyas formulate bespoke single-herb adjustments (e.g. extra Methi for elasticity, extra Neem for psoriasis, or Jatamansi for stress shedding).
          </p>
        </div>
        <a
          href="https://wa.me/8801618567449?text=Hello%20KeshAura!%20I%20would%20like%20to%20request%20a%20customized%20hair%20pack%20blend."
          target="_blank"
          rel="noreferrer"
          className="shrink-0 px-6 py-3 rounded-full bg-[#173124] text-white text-xs font-bold hover:bg-[#2d4739] transition-all flex items-center gap-2 shadow-sm"
        >
          <MessageCircle className="w-4 h-4 text-[#f0debd]" />
          <span>Request Custom Batch on WhatsApp</span>
        </a>
      </div>

    </div>
  );
};
