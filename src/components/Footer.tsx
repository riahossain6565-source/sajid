import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, MessageCircle, Heart, ArrowRight, Shield, Award, Droplets, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, showToast, isAdminAuthenticated } = useStore();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    showToast('Namaste! You are now subscribed to sacred hair wisdom rituals.');
    setEmailInput('');
  };

  return (
    <footer className="bg-[#173124] text-[#fbf9f5] pt-16 pb-12 border-t border-[#2d4739] relative overflow-hidden">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2d4739]/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Value Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#2d4739] mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2d4739] flex items-center justify-center text-[#f0debd] shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-sm text-[#fbf9f5]">100% Certified Raw</h5>
              <p className="text-xs text-[#b0cdbb]">Solar-dried pure whole herbs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2d4739] flex items-center justify-center text-[#f0debd] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-sm text-[#fbf9f5]">Ayurvedic Formulations</h5>
              <p className="text-xs text-[#b0cdbb]">Crafted by Kerala Vaidyas</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2d4739] flex items-center justify-center text-[#f0debd] shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-sm text-[#fbf9f5]">Zero Synthetics</h5>
              <p className="text-xs text-[#b0cdbb]">No sulfates, silicones or perfume</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2d4739] flex items-center justify-center text-[#f0debd] shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-sm text-[#fbf9f5]">WhatsApp Orders</h5>
              <p className="text-xs text-[#b0cdbb]">Direct concierge assistance</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="cursor-pointer inline-block" onClick={() => navigateTo('home')}>
              <h3 className="font-serif text-3xl font-bold tracking-tight text-[#fbf9f5]">
                KeshAura
              </h3>
              <p className="text-xs uppercase tracking-[0.2em] text-[#f0debd] font-medium mt-0.5">
                Sacred Ayurvedic Hair Apothecary
              </p>
            </div>
            <p className="text-sm text-[#b0cdbb] leading-relaxed max-w-sm">
              We revive ancestral Vedic hair care traditions. Each powder is hand-ground using traditional stone mills to preserve volatile botanic oils, awakening your scalp and infusing life into every strand.
            </p>
            
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/8801618567449"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2d4739] text-[#f0debd] text-xs font-semibold hover:bg-[#3d5d4b] transition-all border border-[#b0cdbb]/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp: 01618567449</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-[#f0debd]">
              Sacred Care
            </h4>
            <ul className="space-y-2 text-sm text-[#b0cdbb]">
              <li>
                <button onClick={() => navigateTo('products')} className="hover:text-white transition-colors">
                  All Formulations
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('product-detail', 'keshaura-organic-hair-pack')} className="hover:text-white transition-colors">
                  Nourishing Hair Pack
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('product-detail', 'calming-scalp-treatment')} className="hover:text-white transition-colors">
                  Anti-Dandruff Detox
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('product-detail', 'gentle-cleansing-powder')} className="hover:text-white transition-colors">
                  Shikakai Wash (No-Poo)
                </button>
              </li>
            </ul>
          </div>

          {/* Wisdom & Sanctuary */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-[#f0debd]">
              The Sanctuary
            </h4>
            <ul className="space-y-2 text-sm text-[#b0cdbb]">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  Our Origin Story
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Consult Ayurvedic Vaidya
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Studio Dispensary
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors">
                  Member Portal (লগ ইন / অ্যাকাউন্ট)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo(isAdminAuthenticated ? 'admin-dashboard' : 'admin-login')}
                  className="hover:text-white transition-colors text-amber-200/80 font-medium"
                >
                  Admin Portal {isAdminAuthenticated ? '✓' : '🔒'}
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-[#f0debd]">
              Ayurvedic Dispatch
            </h4>
            <p className="text-xs text-[#b0cdbb]">
              Receive moon cycle hair oiling rituals, herbal decoction recipes, and private harvest drops.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex rounded-full overflow-hidden border border-[#b0cdbb]/40 bg-[#2d4739]/60 p-1">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email..."
                  className="px-3 py-1.5 text-xs text-white bg-transparent w-full focus:outline-none placeholder:text-[#b0cdbb]/60"
                />
                <button
                  type="submit"
                  className="bg-[#f0debd] text-[#173124] px-3.5 py-1.5 rounded-full text-xs font-bold hover:bg-white transition-colors flex items-center gap-1 shrink-0"
                >
                  Join
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#2d4739] flex flex-col sm:flex-row items-center justify-between text-xs text-[#b0cdbb]/80 gap-4">
          <p>© {new Date().getFullYear()} KeshAura Organic Hair Pack. Handcrafted in Kerala with ancestral reverence.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Ayurvedic Compliance</span>
            <span>•</span>
            <span>Ethical Harvest Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
