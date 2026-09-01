import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Search, ShieldCheck, Menu, X, Sparkles, MessageCircle, User, LogOut, Package, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    cartCount,
    setIsCartOpen,
    isAdminAuthenticated,
    searchQuery,
    setSearchQuery,
    userProfile,
    setIsAuthModalOpen,
    setAuthModalTab,
    logoutUser,
    generateWhatsAppUrl
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: any) => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    navigateTo(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f5]/90 backdrop-blur-md border-b border-[#c2c8c2]/30 transition-all duration-200">
      {/* Top sacred announcement bar */}
      <div className="bg-[#173124] text-[#fbf9f5] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f0debd] animate-pulse"></span>
        <span>Pure Hand-Harvested Herbs • Free Express Shipping on Orders Above ₹999 • Direct WhatsApp Consultation</span>
        <span className="hidden md:inline-flex items-center gap-1 text-[#f0debd] text-[11px] ml-2">
          <Sparkles className="w-3 h-3" /> 100% Raw Bio-Active
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#173124] hover:bg-[#f5f3ef] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left Navigation links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <button
              id="nav-link-shop"
              onClick={() => handleNavClick('products')}
              className={`transition-colors relative py-1 ${
                currentPage === 'products'
                  ? 'text-[#173124] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#173124]'
                  : 'text-[#424844] hover:text-[#173124]'
              }`}
            >
              Shop All
            </button>
            <button
              id="nav-link-formula"
              onClick={() => handleNavClick('products')}
              className="text-[#424844] hover:text-[#173124] transition-colors"
            >
              Hair Packs
            </button>
            <button
              id="nav-link-about"
              onClick={() => handleNavClick('about')}
              className={`transition-colors relative py-1 ${
                currentPage === 'about'
                  ? 'text-[#173124] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#173124]'
                  : 'text-[#424844] hover:text-[#173124]'
              }`}
            >
              The Ritual & Wisdom
            </button>
            <button
              id="nav-link-contact"
              onClick={() => handleNavClick('contact')}
              className={`transition-colors relative py-1 ${
                currentPage === 'contact'
                  ? 'text-[#173124] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#173124]'
                  : 'text-[#424844] hover:text-[#173124]'
              }`}
            >
              Consult Vaidya
            </button>
          </nav>

          {/* Brand Logo in Center */}
          <div className="flex-1 lg:flex-initial text-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="inline-flex flex-col items-center group">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#173124] group-hover:opacity-90 transition-opacity">
                KeshAura
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#6a5d43] font-medium -mt-1">
                Sacred Ayurvedic Hair Pack
              </span>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Search Input Toggle */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-white border border-[#c2c8c2] rounded-full px-3 py-1.5 shadow-sm">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (currentPage !== 'products') navigateTo('products');
                    }}
                    placeholder="Search herbs, concerns..."
                    className="w-36 sm:w-48 text-xs bg-transparent focus:outline-none text-[#173124]"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setShowSearchInput(false);
                      setSearchQuery('');
                    }}
                    className="text-[#727973] hover:text-[#173124]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  id="search-toggle-btn"
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 rounded-full text-[#173124] hover:bg-[#f5f3ef] transition-colors"
                  aria-label="Search"
                  title="Search hair remedies"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* User Account / Login Button */}
            <div className="relative" ref={dropdownRef}>
              {userProfile ? (
                <div>
                  <button
                    id="user-account-dropdown-btn"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-full bg-[#f0debd]/40 hover:bg-[#f0debd]/80 border border-[#d6c4a5] text-[#173124] transition-all"
                    title="Your Account"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#173124] text-white flex items-center justify-center text-xs font-bold overflow-hidden">
                      {userProfile.photoURL ? (
                        <img src={userProfile.photoURL} alt={userProfile.displayName || 'User'} className="w-full h-full object-cover" />
                      ) : (
                        userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'
                      )}
                    </div>
                    <span className="hidden sm:inline-block text-xs font-bold max-w-[90px] truncate">
                      {userProfile.displayName?.split(' ')[0] || 'Account'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#173124] hidden sm:inline-block" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#eae8e4] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-2 border-b border-[#eae8e4]">
                        <p className="text-xs font-bold text-[#173124] truncate">{userProfile.displayName || 'Member'}</p>
                        <p className="text-[11px] text-[#727973] truncate">{userProfile.email || 'Ayurvedic Member'}</p>
                      </div>

                      <div className="py-1 text-xs">
                        <button
                          id="nav-menu-my-account"
                          onClick={() => handleNavClick('account')}
                          className="w-full px-4 py-2 text-left hover:bg-[#fbf9f5] flex items-center gap-2 text-[#173124] font-medium"
                        >
                          <User className="w-4 h-4 text-[#727973]" />
                          <span>My Profile & Orders</span>
                        </button>
                        <button
                          id="nav-menu-orders"
                          onClick={() => handleNavClick('account')}
                          className="w-full px-4 py-2 text-left hover:bg-[#fbf9f5] flex items-center gap-2 text-[#173124] font-medium"
                        >
                          <Package className="w-4 h-4 text-[#727973]" />
                          <span>Order History</span>
                        </button>
                        <button
                          id="nav-menu-admin-link"
                          onClick={() => handleNavClick(isAdminAuthenticated ? 'admin-dashboard' : 'admin-login')}
                          className="w-full px-4 py-2 text-left hover:bg-[#fbf9f5] flex items-center gap-2 text-[#6a5d43] font-medium"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>Admin Portal</span>
                        </button>
                      </div>

                      <div className="border-t border-[#eae8e4] pt-1">
                        <button
                          id="nav-menu-logout"
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            logoutUser();
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-rose-50 flex items-center gap-2 text-rose-700 font-bold text-xs"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out (লগ আউট)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  id="nav-login-btn"
                  onClick={() => {
                    setAuthModalTab('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#c2c8c2] text-[#173124] hover:bg-[#f5f3ef] text-xs font-bold transition-all shadow-2xs"
                  title="Sign In / Log In"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Log In (লগ ইন)</span>
                  <span className="sm:hidden">Log In</span>
                </button>
              )}
            </div>

            {/* Direct WhatsApp Ordering Hotline */}
            <button
              id="header-whatsapp-btn"
              onClick={() => {
                const url = generateWhatsAppUrl('Hello KeshAura team, I want to consult about hair care packs.');
                window.open(url, '_blank');
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-[#f0debd]/70 text-[#173124] hover:bg-[#f0debd] transition-all border border-[#d6c4a5]/40"
              title="Chat with Ayurvedic Advisor on WhatsApp (01618567449)"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#173124]" />
              <span>WhatsApp</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              id="cart-drawer-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#173124] text-white hover:bg-[#2d4739] transition-all shadow-sm"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#f0debd] text-[#173124] font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#fbf9f5] shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#fbf9f5] border-b border-[#c2c8c2]/50 px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          {/* User Account mobile card */}
          {userProfile ? (
            <div className="p-3 bg-white border border-[#eae8e4] rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#173124] text-white flex items-center justify-center font-bold text-xs">
                  {userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#173124]">{userProfile.displayName}</p>
                  <p className="text-[11px] text-[#727973]">{userProfile.email || 'Member'}</p>
                </div>
              </div>
              <button
                id="mobile-logout-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logoutUser();
                }}
                className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-full text-xs font-bold flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="p-3 bg-[#f0debd]/30 border border-[#d6c4a5] rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#173124]">Ayurvedic Account</p>
                <p className="text-[11px] text-[#727973]">Log in to track orders</p>
              </div>
              <button
                id="mobile-login-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setAuthModalTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-2 bg-[#173124] text-white hover:bg-[#2d4739] rounded-full text-xs font-bold"
              >
                Log In (লগ ইন)
              </button>
            </div>
          )}

          <div className="flex flex-col space-y-3 font-medium text-base">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 border-b border-[#eae8e4] text-[#173124]"
            >
              Home & Rituals
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className="text-left py-2 border-b border-[#eae8e4] text-[#173124]"
            >
              Explore Formulations & Hair Packs
            </button>
            <button
              onClick={() => handleNavClick('account')}
              className="text-left py-2 border-b border-[#eae8e4] text-[#173124] flex items-center gap-2"
            >
              <User className="w-4 h-4 text-[#6a5d43]" />
              <span>My Account & Orders</span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 border-b border-[#eae8e4] text-[#173124]"
            >
              Ayurvedic Story & Purity Standards
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 border-b border-[#eae8e4] text-[#173124]"
            >
              Vaidya Consultation & Studio Contact
            </button>
            <button
              onClick={() => handleNavClick(isAdminAuthenticated ? 'admin-dashboard' : 'admin-login')}
              className="text-left py-2 text-[#6a5d43] flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAdminAuthenticated ? 'Admin Management Dashboard' : 'Store Admin Login'}</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                const url = generateWhatsAppUrl('Hello KeshAura, I want to order on WhatsApp.');
                window.open(url, '_blank');
              }}
              className="w-full py-3 bg-[#173124] text-white rounded-full flex items-center justify-center gap-2 font-medium shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#f0debd]" />
              <span>Order via WhatsApp (01618567449)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
