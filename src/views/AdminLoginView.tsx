import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, KeyRound } from 'lucide-react';

export const AdminLoginView: React.FC = () => {
  const { adminLogin, navigateTo } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin(email, password);
  };

  const handleFillDemo = () => {
    setEmail('admin@keshaura.com');
    setPassword('ayurveda2026');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* Split Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden border border-[#eae8e4] shadow-2xl grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
        
        {/* Left Macro Leaf Visual Column */}
        <div className="md:col-span-5 relative bg-[#173124] text-white p-8 flex flex-col justify-between overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 bg-cover bg-center pointer-events-none mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCf_0oac-x11HVsLswT9yMEjLyOEFwVEBT7AlbD3s7rNLzwQhpzlrsNnSCVXdAGN7oxPCCOxRalkeC5Gq_6AXzqiGyEy6pdcpRSEDjbfJR55IBFWO10cbqXhjWqZI23-q1bR_CpmnQp4Zo7OtJV9_8Er1P1yMSEo_d_llanNS4ljiJ0nGduO2f6etne6LJ3vBhs4EryLOfG-1nETA2aa6D0ylL0Yew5EuhjR--mDirEOxZAHOtH3JOQ1g')`
            }}
          />

          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2d4739] text-[#f0debd] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sacred Admin Portal</span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#fbf9f5]">
              KeshAura Vault
            </h2>
            <p className="text-xs text-[#b0cdbb]">
              Dispensary & Order Fulfillment Management
            </p>
          </div>

          <div className="relative z-10 pt-12 space-y-4">
            <div className="p-4 rounded-2xl bg-[#2d4739]/80 backdrop-blur-xs border border-[#b0cdbb]/20 text-xs text-[#fbf9f5] leading-relaxed">
              <p className="font-serif italic">
                "Management of sacred herbs requires precision, transparency, and reverence for every batch."
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#b0cdbb]">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Kerala Dispensary Online (v2.4)</span>
            </div>
          </div>
        </div>

        {/* Right Sign-in Form Column */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
          
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#6a5d43]">
              Authentication
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173124] mt-1">
              Store Master Sign-in
            </h3>
            <p className="text-xs text-[#424844] mt-1">
              Access order management, stock catalogs, and WhatsApp dispatch workflows.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <div>
              <label className="block text-[#173124] font-bold mb-1.5">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#727973] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@keshaura.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#fbf9f5] border border-[#c2c8c2] text-[#173124] focus:outline-none focus:border-[#173124]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[#173124] font-bold">Secret Passphrase</label>
                <span className="text-[11px] text-[#727973]">ayurveda2026</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#727973] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#fbf9f5] border border-[#c2c8c2] text-[#173124] focus:outline-none focus:border-[#173124]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#173124] rounded w-3.5 h-3.5"
                />
                <span className="text-xs text-[#424844]">Persist session locally</span>
              </label>

              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs font-semibold text-amber-900 hover:underline flex items-center gap-1"
              >
                <KeyRound className="w-3 h-3" /> Auto-fill Demo Access
              </button>
            </div>

            <button
              id="admin-login-submit-btn"
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#173124] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#2d4739] shadow-md transition-all"
            >
              <span>Unlock Admin Sanctuary</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          <div className="pt-4 border-t border-[#eae8e4] flex items-center justify-between text-[11px] text-[#727973]">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-[#173124] underline"
            >
              ← Return to Customer Storefront
            </button>
            <span>Secured with AI Studio State</span>
          </div>

        </div>

      </div>

    </div>
  );
};
