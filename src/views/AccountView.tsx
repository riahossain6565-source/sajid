import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  User,
  LogOut,
  Package,
  MapPin,
  Sparkles,
  Phone,
  Mail,
  Edit2,
  Save,
  CheckCircle,
  Clock,
  ChevronRight,
  ShoppingBag,
  ExternalLink,
  HeartHandshake
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const {
    userProfile,
    updateUserProfileData,
    logoutUser,
    orders,
    navigateTo,
    setIsAuthModalOpen,
    setAuthModalTab,
    generateWhatsAppUrl
  } = useStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'dosha'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [name, setName] = useState(userProfile?.displayName || '');
  const [phone, setPhone] = useState(userProfile?.phoneNumber || '');
  const [address, setAddress] = useState(userProfile?.address || '');
  const [city, setCity] = useState(userProfile?.city || '');
  const [postalCode, setPostalCode] = useState(userProfile?.postalCode || '');
  const [dosha, setDosha] = useState(userProfile?.dosha || 'Tridoshic');

  // If user is not logged in
  if (!userProfile) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#f0debd]/40 border border-[#d6c4a5] flex items-center justify-center mx-auto text-[#173124]">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-[#173124]">Ayurvedic Member Portal</h2>
          <p className="text-sm text-[#424844] max-w-md mx-auto">
            Sign in to access your sacred order history, track dispatch status, save delivery details, and get custom herbal rituals.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
          <button
            id="account-login-trigger"
            onClick={() => {
              setAuthModalTab('login');
              setIsAuthModalOpen(true);
            }}
            className="px-8 py-3 bg-[#173124] text-white rounded-full font-bold text-sm hover:bg-[#2d4739] shadow-md transition-all"
          >
            Log In (লগ ইন করুন)
          </button>
          <button
            id="account-register-trigger"
            onClick={() => {
              setAuthModalTab('register');
              setIsAuthModalOpen(true);
            }}
            className="px-8 py-3 bg-white border border-[#173124] text-[#173124] rounded-full font-bold text-sm hover:bg-[#f5f3ef] transition-all"
          >
            Create New Account
          </button>
        </div>
      </div>
    );
  }

  // Filter orders for this user if available
  const userOrders = orders.filter(
    o => (userProfile.email && o.email && o.email.toLowerCase() === userProfile.email.toLowerCase()) ||
         (userProfile.phoneNumber && o.phone && o.phone.replace(/[^0-9]/g, '') === userProfile.phoneNumber.replace(/[^0-9]/g, '')) ||
         (userProfile.displayName && o.customerName.toLowerCase().includes(userProfile.displayName.toLowerCase().split(' ')[0]))
  );

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfileData({
      displayName: name,
      phoneNumber: phone,
      address,
      city,
      postalCode,
      dosha
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Account Hero Bar */}
      <div className="bg-gradient-to-r from-[#173124] to-[#254634] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#f0debd]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center gap-4 sm:gap-6 z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f0debd] text-[#173124] flex items-center justify-center font-serif text-2xl font-bold border-2 border-white/40 shadow-inner overflow-hidden">
            {userProfile.photoURL ? (
              <img src={userProfile.photoURL} alt={userProfile.displayName || 'Avatar'} className="w-full h-full object-cover" />
            ) : (
              userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'K'
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                {userProfile.displayName || 'Sacred Seeker'}
              </h1>
              <span className="text-[11px] bg-[#f0debd] text-[#173124] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{userProfile.dosha || 'Ayurvedic Member'}</span>
              </span>
            </div>
            <p className="text-xs text-[#fbf9f5]/80 mt-1 flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-[#f0debd]" /> {userProfile.email || 'No email attached'}</span>
              {userProfile.phoneNumber && (
                <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-[#f0debd]" /> {userProfile.phoneNumber}</span>
              )}
            </p>
          </div>
        </div>

        {/* Action Controls & Logout Button */}
        <div className="flex items-center gap-3 z-10 w-full md:w-auto justify-end">
          <button
            id="account-logout-btn"
            onClick={logoutUser}
            className="px-5 py-2.5 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md"
            title="Log Out of your KeshAura Account"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out (লগ আউট)</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#eae8e4] gap-2 sm:gap-6">
        <button
          id="tab-profile-btn"
          onClick={() => setActiveTab('profile')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 transition-all border-b-2 ${
            activeTab === 'profile'
              ? 'border-[#173124] text-[#173124]'
              : 'border-transparent text-[#727973] hover:text-[#173124]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>My Profile & Address</span>
        </button>

        <button
          id="tab-orders-btn"
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 transition-all border-b-2 ${
            activeTab === 'orders'
              ? 'border-[#173124] text-[#173124]'
              : 'border-transparent text-[#727973] hover:text-[#173124]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Sacred Orders ({userOrders.length > 0 ? userOrders.length : orders.length})</span>
        </button>

        <button
          id="tab-dosha-btn"
          onClick={() => setActiveTab('dosha')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 transition-all border-b-2 ${
            activeTab === 'dosha'
              ? 'border-[#173124] text-[#173124]'
              : 'border-transparent text-[#727973] hover:text-[#173124]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Dosha & Hair Wisdom</span>
        </button>
      </div>

      {/* Tab 1: Profile & Delivery Details */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-[#eae8e4] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#173124]">Personal & Shipping Details</h3>
                <p className="text-xs text-[#727973]">These details will automatically prefill during WhatsApp and express checkouts.</p>
              </div>
              {!isEditing ? (
                <button
                  id="edit-profile-btn"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-full bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#173124] font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-[#727973] hover:underline"
                >
                  Cancel
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#173124] font-bold mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#c2c8c2] bg-[#fbf9f5] text-[#173124] font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#173124] font-bold mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#c2c8c2] bg-[#fbf9f5] text-[#173124] font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#173124] font-bold mb-1">Delivery Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Flat No, Street, Landmark"
                    className="w-full px-3 py-2.5 rounded-xl border border-[#c2c8c2] bg-[#fbf9f5] text-[#173124] font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#173124] font-bold mb-1">City / State</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Bengaluru"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#c2c8c2] bg-[#fbf9f5] text-[#173124] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[#173124] font-bold mb-1">PIN / Postal Code</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="e.g. 560001"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#c2c8c2] bg-[#fbf9f5] text-[#173124] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[#173124] font-bold mb-1">Primary Dosha</label>
                    <select
                      value={dosha}
                      onChange={(e) => setDosha(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#c2c8c2] bg-[#fbf9f5] text-[#173124] font-medium"
                    >
                      <option value="Tridoshic">Tridoshic (Balanced)</option>
                      <option value="Vata">Vata (Dryness / Frizz)</option>
                      <option value="Pitta">Pitta (Scalp Heat / Thinning)</option>
                      <option value="Kapha">Kapha (Excess Oil / Dandruff)</option>
                      <option value="Vata-Pitta">Vata-Pitta Blend</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    id="save-profile-btn"
                    type="submit"
                    className="px-6 py-2.5 bg-[#173124] text-white hover:bg-[#2d4739] font-bold rounded-full flex items-center gap-1.5 shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-[#eae8e4] space-y-1">
                  <span className="text-[10px] text-[#727973] uppercase tracking-wider font-bold">Contact Details</span>
                  <p className="font-bold text-[#173124] text-sm">{userProfile.displayName || 'No Name Set'}</p>
                  <p className="text-[#424844]">{userProfile.email || 'No email'}</p>
                  <p className="text-[#424844]">{userProfile.phoneNumber || 'No phone number provided'}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-[#eae8e4] space-y-1">
                  <span className="text-[10px] text-[#727973] uppercase tracking-wider font-bold">Default Delivery Address</span>
                  {userProfile.address ? (
                    <>
                      <p className="font-semibold text-[#173124]">{userProfile.address}</p>
                      <p className="text-[#424844]">{userProfile.city} {userProfile.postalCode && `- ${userProfile.postalCode}`}</p>
                    </>
                  ) : (
                    <p className="text-[#727973] italic">No default address saved yet. Click "Edit Profile" to add your address.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Ayurvedic Stats Box */}
          <div className="bg-[#f0debd]/30 p-6 rounded-3xl border border-[#d6c4a5]/60 space-y-5">
            <div className="flex items-center gap-2 text-[#173124]">
              <Sparkles className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base">Ayurvedic Member Benefits</h4>
            </div>
            <ul className="space-y-3 text-xs text-[#424844]">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#173124] shrink-0 mt-0.5" />
                <span><b>Priority Dispatch:</b> Express batch preparation for authentic bio-active potency.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#173124] shrink-0 mt-0.5" />
                <span><b>Direct Vaidya Access:</b> Free Ayurvedic hair diagnosis on WhatsApp.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#173124] shrink-0 mt-0.5" />
                <span><b>Member Discounts:</b> Automatic ₹150 OFF on orders above ₹1,500.</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => {
                  const msg = `Hello KeshAura Vaidya, my name is ${userProfile.displayName || 'Member'} and I would like a consultation for my ${userProfile.dosha || 'hair'} profile.`;
                  window.open(generateWhatsAppUrl(msg), '_blank');
                }}
                className="w-full py-2.5 bg-[#173124] text-white hover:bg-[#2d4739] text-xs font-bold rounded-full transition-all flex items-center justify-center gap-2"
              >
                <span>Ask Vaidya on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#173124]">Order History & Dispatches</h3>
              <p className="text-xs text-[#727973]">Track your herbal batches and view receipt summaries.</p>
            </div>
            <button
              onClick={() => navigateTo('products')}
              className="px-4 py-2 bg-[#173124] text-white hover:bg-[#2d4739] text-xs font-bold rounded-full flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Browse Formulations</span>
            </button>
          </div>

          {(userOrders.length > 0 ? userOrders : orders).length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-[#eae8e4] text-center space-y-3">
              <Package className="w-12 h-12 text-[#727973] mx-auto stroke-[1.5]" />
              <h4 className="font-serif text-lg font-bold text-[#173124]">No Orders Found Yet</h4>
              <p className="text-xs text-[#727973] max-w-sm mx-auto">
                Explore our raw organic hair packs and complete your first Ayurvedic order to see it here!
              </p>
              <button
                onClick={() => navigateTo('products')}
                className="mt-2 px-6 py-2.5 bg-[#173124] text-white text-xs font-bold rounded-full hover:bg-[#2d4739]"
              >
                Shop Hair Packs
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {(userOrders.length > 0 ? userOrders : orders).map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-5 rounded-2xl border border-[#eae8e4] hover:border-[#173124]/30 shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#173124] text-sm">Order #{order.id}</span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status}
                      </span>
                      <span className="text-[11px] text-[#727973] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {order.date}
                      </span>
                    </div>

                    <p className="text-xs text-[#424844]">
                      {order.items.map(i => `${i.productName} (${i.size}) x${i.quantity}`).join(' • ')}
                    </p>
                    <p className="text-[11px] text-[#727973]">
                      Deliver to: {order.address}, {order.city}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 sm:flex-col sm:items-end w-full sm:w-auto justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-[#eae8e4]">
                    <div className="text-right">
                      <span className="text-[10px] text-[#727973] uppercase tracking-wider block">Total Amount</span>
                      <span className="font-serif font-bold text-base text-[#173124]">₹{order.total}</span>
                    </div>
                    <button
                      onClick={() => {
                        const text = `Hello KeshAura, I am inquiring about my Order #${order.id}. Could you please share the current dispatch status?`;
                        window.open(generateWhatsAppUrl(text), '_blank');
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#f0debd]/50 hover:bg-[#f0debd] text-[#173124] text-[11px] font-bold transition-colors"
                    >
                      Track on WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Dosha & Hair Wisdom */}
      {activeTab === 'dosha' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#eae8e4] shadow-sm space-y-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#173124]">Your Ayurvedic Hair Profile</h3>
            <p className="text-xs text-[#727973]">Customized daily & weekly hair rituals tailored for your dosha balance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#fbf9f5] border border-[#d6c4a5]/40 space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#6a5d43] tracking-wider">Dosha Constitution</span>
              <h4 className="font-serif font-bold text-lg text-[#173124]">{userProfile.dosha || 'Tridoshic Balance'}</h4>
              <p className="text-xs text-[#424844] leading-relaxed">
                Balanced between root moisture and scalp micro-circulation. Recommended application: 2 times weekly before sunrise.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fbf9f5] border border-[#d6c4a5]/40 space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#6a5d43] tracking-wider">Ideal Preparation Ritual</span>
              <h4 className="font-serif font-bold text-lg text-[#173124]">Warm Yogurt / Rosewater Blend</h4>
              <p className="text-xs text-[#424844] leading-relaxed">
                Mix 2-3 tablespoons of KeshAura Organic Hair Pack with lukewarm fresh yogurt or pure rose water to activate herbal bio-actives.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fbf9f5] border border-[#d6c4a5]/40 space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#6a5d43] tracking-wider">Recommended Complement</span>
              <h4 className="font-serif font-bold text-lg text-[#173124]">Warm Bhringraj Scalp Oil</h4>
              <p className="text-xs text-[#424844] leading-relaxed">
                Massage roots gently the night prior to applying the hair pack to stimulate micro-follicular blood flow.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
