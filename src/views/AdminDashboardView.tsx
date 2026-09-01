import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import {
  Package,
  Plus,
  Trash2,
  Edit2,
  LogOut,
  Search,
  Eye,
  ShieldCheck,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

const PRESET_IMAGES = [
  {
    label: 'Organic Hair Pack Powder',
    url: 'https://images.unsplash.com/photo-1608248597359-577d46c76483?auto=format&fit=crop&q=80&w=800'
  },
  {
    label: 'Herbal Clay & Botanical Blend',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800'
  },
  {
    label: 'Natural Hair Treatment',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
  },
  {
    label: 'Ayurvedic Raw Ingredients',
    url: 'https://images.unsplash.com/photo-1512290900672-1f486ecba784?auto=format&fit=crop&q=80&w=800'
  }
];

export const AdminDashboardView: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    adminLogout,
    navigateTo,
    showToast
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // New Product Form State
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [price, setPrice] = useState<number | ''>(850);
  const [originalPrice, setOriginalPrice] = useState<number | ''>(1050);
  const [stock, setStock] = useState<number | ''>(50);
  const [category, setCategory] = useState<Product['category']>('hair-pack');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [description, setDescription] = useState('');
  const [benefitsText, setBenefitsText] = useState('Helps reduce hair fall\nPromotes strong & shiny roots\n100% natural Ayurvedic herbs');

  const filteredProducts = products.filter((prod) => {
    if (categoryFilter !== 'all' && prod.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        prod.name.toLowerCase().includes(q) ||
        prod.subtitle.toLowerCase().includes(q) ||
        prod.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please enter a product name');
      return;
    }

    const benefits = benefitsText
      .split('\n')
      .map((b) => b.trim())
      .filter(Boolean);

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      subtitle: subtitle.trim() || 'Pure Ayurvedic Botanical Formulation',
      tagline: 'Handcrafted raw organic hair therapy.',
      price: Number(price) || 0,
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      rating: 5.0,
      reviewCount: 1,
      image: imageUrl.trim() || PRESET_IMAGES[0].url,
      gallery: [imageUrl.trim() || PRESET_IMAGES[0].url],
      category,
      badge: 'New Item',
      stock: Number(stock) || 0,
      sizes: [
        { weight: '100g (Regular Pack)', priceMultiplier: 1 },
        { weight: '250g (Family Pack)', priceMultiplier: 2.2 }
      ],
      description: description.trim() || 'Authentic herbal hair pack enriched with natural botanicals.',
      benefits: benefits.length > 0 ? benefits : ['Nourishes hair roots', 'Promotes healthy growth', 'Pure organic formula'],
      ingredients: [
        { name: 'Bhringraj', botanical: 'Eclipta Alba', benefit: 'Root strength' },
        { name: 'Amla', botanical: 'Phyllanthus Emblica', benefit: 'Antioxidant & shine' },
        { name: 'Brahmi', botanical: 'Bacopa Monnieri', benefit: 'Scalp calmness' }
      ],
      usageSteps: [
        { step: 1, title: 'Mix Paste', desc: 'Mix with warm water or yogurt to form a smooth paste.' },
        { step: 2, title: 'Apply on Scalp', desc: 'Apply evenly from roots to hair tips.' },
        { step: 3, title: 'Wash & Rinse', desc: 'Leave on for 30 minutes, then rinse thoroughly.' }
      ],
      dosha: ['Tridoshic'],
      hairConcerns: ['Hair Fall', 'Dandruff', 'Dryness'],
      scentProfile: 'Fresh crushed organic herbs'
    };

    addProduct(newProduct);
    showToast(`"${name}" product successfully added!`);
    
    // Reset Form
    setName('');
    setSubtitle('');
    setPrice(850);
    setOriginalPrice(1050);
    setStock(50);
    setDescription('');
    setIsAddModalOpen(false);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct);
    showToast(`"${editingProduct.name}" updated successfully.`);
    setEditingProduct(null);
  };

  const confirmDelete = () => {
    if (!productToDelete) return;
    deleteProduct(productToDelete.id);
    showToast(`"${productToDelete.name}" removed from catalog.`);
    setProductToDelete(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#eae8e4] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#173124] text-[#f0debd] flex items-center justify-center font-bold shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#173124]">
              Product Management Panel
            </h1>
            <p className="text-xs text-[#6a5d43] mt-0.5">
              Manage items: Add new products or remove existing products ({products.length} total active products)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            id="admin-add-new-prod-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-[#173124] text-white hover:bg-[#2d4739] text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Product (নতুন প্রোডাক্ট যোগ করুন)</span>
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="px-4 py-2.5 rounded-full bg-[#f5f3ef] text-[#173124] text-xs font-semibold hover:bg-[#eae8e4] transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </button>
          
          <button
            onClick={adminLogout}
            className="px-4 py-2.5 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold hover:bg-rose-100 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#eae8e4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#727973] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search product by title, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#fbf9f5] border border-[#c2c8c2]/60 rounded-xl focus:outline-none focus:border-[#173124]"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6a5d43] font-medium">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs p-2 bg-[#fbf9f5] border border-[#c2c8c2]/60 rounded-xl focus:outline-none text-[#173124]"
          >
            <option value="all">All Categories ({products.length})</option>
            <option value="hair-pack">Hair Pack & Mask</option>
            <option value="cleanser">Herbal Cleanser</option>
            <option value="scalp-care">Scalp Care</option>
            <option value="oil">Herbal Oil</option>
            <option value="combos">Combos & Bundles</option>
          </select>
        </div>
      </div>

      {/* Product List Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#eae8e4] text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#f5f3ef] flex items-center justify-center text-[#727973]">
            <Package className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-[#173124]">No products found</p>
          <p className="text-xs text-[#727973]">Try a different search query or add a new product.</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mt-2 px-5 py-2 rounded-full bg-[#173124] text-white text-xs font-bold"
          >
            + Add Product Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl border border-[#eae8e4] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Product Image Header */}
                <div className="relative aspect-4/3 bg-[#f5f3ef] overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    <span className="bg-[#173124]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                      Stock: {prod.stock}
                    </span>
                    <span className="bg-white/90 text-[#173124] text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs capitalize">
                      {prod.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-bold text-base text-[#173124] line-clamp-1">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#6a5d43] line-clamp-1">{prod.subtitle}</p>
                  <p className="text-xs text-[#727973] line-clamp-2 mt-1">
                    {prod.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-[#eae8e4]/60">
                    <div>
                      <span className="text-xs text-[#727973] block">Price:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif text-lg font-bold text-[#173124]">
                          ₹{prod.price}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-xs text-[#727973] line-through">
                            ₹{prod.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                      ★ {prod.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Edit & Remove */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setEditingProduct(prod)}
                  className="flex-1 py-2.5 rounded-xl bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#173124] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>

                <button
                  onClick={() => setProductToDelete(prod)}
                  className="py-2.5 px-3.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  title="Remove product"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove (রিমুভ)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL 1: ADD NEW PRODUCT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="relative bg-[#fbf9f5] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#c2c8c2] z-10 animate-in zoom-in-95 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#eae8e4]">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#173124]">
                  Add New Product (নতুন প্রোডাক্ট যোগ করুন)
                </h3>
                <p className="text-xs text-[#6a5d43]">Fill in product details to publish to the store catalog.</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1.5 rounded-full"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 pt-4 text-xs">
              {/* Name */}
              <div>
                <label className="block text-[#173124] font-bold mb-1">Product Title / Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayurvedic Hair Pack with 21 Herbs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-[#c2c8c2] focus:outline-none focus:border-[#173124] text-sm"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-[#173124] font-bold mb-1">Subtitle / Short Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. 100% Raw Botanical Scalp & Hair Therapy"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                />
              </div>

              {/* Price, Original Price, Stock */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#173124] font-bold mb-1">Price (₹ / ৳) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                  />
                </div>
                <div>
                  <label className="block text-[#173124] font-bold mb-1">Regular / Original (₹)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                  />
                </div>
                <div>
                  <label className="block text-[#173124] font-bold mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-[#173124] font-bold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                >
                  <option value="hair-pack">Hair Pack & Powder Mask</option>
                  <option value="cleanser">Herbal Wash & Cleanser</option>
                  <option value="scalp-care">Scalp Care & Detox</option>
                  <option value="oil">Herbal Oil & Infusion</option>
                  <option value="combos">Combos & Gift Packs</option>
                </select>
              </div>

              {/* Image Selection & URL */}
              <div>
                <label className="block text-[#173124] font-bold mb-1">Product Image URL</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                />
                
                {/* Preset Image Quick Selector */}
                <div className="mt-2">
                  <span className="text-[11px] text-[#727973] block mb-1.5">Or choose an Ayurvedic sample photo:</span>
                  <div className="grid grid-cols-4 gap-2">
                    {PRESET_IMAGES.map((img, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setImageUrl(img.url)}
                        className={`aspect-square rounded-xl overflow-hidden border-2 relative transition-all ${
                          imageUrl === img.url ? 'border-[#173124] scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#173124] font-bold mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell customers about the formulation, benefits, and results..."
                  className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                />
              </div>

              {/* Benefits (One per line) */}
              <div>
                <label className="block text-[#173124] font-bold mb-1">Key Benefits (One line each)</label>
                <textarea
                  rows={2}
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  placeholder="Stops hair fall&#10;Strengthens roots"
                  className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2] focus:outline-none focus:border-[#173124]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#eae8e4] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#727973] hover:bg-[#eae8e4] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#173124] text-white text-xs font-bold hover:bg-[#2d4739] shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product (প্রোডাক্ট যুক্ত করুন)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setEditingProduct(null)}
          />
          <div className="relative bg-[#fbf9f5] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#c2c8c2] z-10 animate-in zoom-in-95 my-8">
            <h3 className="font-serif text-xl font-bold text-[#173124] mb-4">
              Edit Product: {editingProduct.name}
            </h3>

            <form onSubmit={handleUpdateProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#173124] font-bold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2]"
                />
              </div>

              <div>
                <label className="block text-[#173124] font-bold mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingProduct.subtitle}
                  onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#173124] font-bold mb-1">Base Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2]"
                  />
                </div>
                <div>
                  <label className="block text-[#173124] font-bold mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#173124] font-bold mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2]"
                />
              </div>

              <div>
                <label className="block text-[#173124] font-bold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#c2c8c2]"
                />
              </div>

              <div className="pt-4 border-t border-[#eae8e4] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-full text-xs text-[#727973] hover:bg-[#eae8e4]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#173124] text-white font-bold hover:bg-[#2d4739]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CONFIRM DELETE MODAL */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setProductToDelete(null)}
          />
          <div className="relative bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-rose-100 z-10 animate-in zoom-in-95 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-[#173124]">
                Remove Product?
              </h3>
              <p className="text-xs text-[#727973] mt-1">
                Are you sure you want to remove <b>"{productToDelete.name}"</b> from your store catalog?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-2.5 rounded-full border border-[#eae8e4] text-xs font-semibold text-[#424844] hover:bg-[#f5f3ef]"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-full bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-sm"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
