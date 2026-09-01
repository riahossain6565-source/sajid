import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Mail, Lock, User, Phone, Sparkles, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    loginAsDemoCustomer,
    navigateTo,
    showToast
  } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (authModalTab === 'login') {
        if (!email || !password) {
          setErrorMsg('Please provide both email and password.');
          setIsLoading(false);
          return;
        }
        const success = await loginWithEmail(email, password);
        if (success) {
          setEmail('');
          setPassword('');
        }
      } else {
        if (!name || !email || !password) {
          setErrorMsg('Please fill in your name, email, and password.');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          setErrorMsg('Password must be at least 6 characters.');
          setIsLoading(false);
          return;
        }
        const success = await registerWithEmail(name, email, password, phone);
        if (success) {
          setName('');
          setEmail('');
          setPassword('');
          setPhone('');
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Authentication error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setErrorMsg('Google sign in encountered an issue.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setIsLoading(true);
    await loginAsDemoCustomer();
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#173124]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#fbf9f5] border border-[#d6c4a5]/60 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-[#173124] text-[#fbf9f5] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f0debd]/20 flex items-center justify-center border border-[#f0debd]/30">
              <Sparkles className="w-4 h-4 text-[#f0debd]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                {authModalTab === 'login' ? 'KeshAura Account Login' : 'Join Sacred Circle'}
              </h3>
              <p className="text-[11px] text-[#f0debd]/80">
                {authModalTab === 'login' ? 'Access your Ayurvedic orders & rituals' : 'Personalized hair remedies & order tracking'}
              </p>
            </div>
          </div>
          <button
            id="auth-modal-close-btn"
            onClick={() => setIsAuthModalOpen(false)}
            className="text-[#fbf9f5]/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#eae8e4] bg-[#f5f3ef]/50">
          <button
            id="auth-tab-login-btn"
            onClick={() => {
              setAuthModalTab('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-xs font-bold transition-all ${
              authModalTab === 'login'
                ? 'text-[#173124] border-b-2 border-[#173124] bg-white'
                : 'text-[#727973] hover:text-[#173124]'
            }`}
          >
            Sign In / Log In (লগ ইন)
          </button>
          <button
            id="auth-tab-register-btn"
            onClick={() => {
              setAuthModalTab('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-xs font-bold transition-all ${
              authModalTab === 'register'
                ? 'text-[#173124] border-b-2 border-[#173124] bg-white'
                : 'text-[#727973] hover:text-[#173124]'
            }`}
          >
            Create Account (রেজিস্টার)
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authModalTab === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#173124] mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#727973] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#c2c8c2] rounded-xl text-xs text-[#173124] focus:outline-none focus:border-[#173124]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173124] mb-1">WhatsApp / Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#727973] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#c2c8c2] rounded-xl text-xs text-[#173124] focus:outline-none focus:border-[#173124]"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-[#173124] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#727973] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#c2c8c2] rounded-xl text-xs text-[#173124] focus:outline-none focus:border-[#173124]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#173124] mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#727973] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#c2c8c2] rounded-xl text-xs text-[#173124] focus:outline-none focus:border-[#173124]"
                />
              </div>
            </div>

            <button
              id="auth-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#173124] text-white hover:bg-[#2d4739] font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>{authModalTab === 'login' ? 'Log In to Account' : 'Complete Registration'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#eae8e4]"></div>
            <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-[#727973] tracking-widest">or quick access</span>
            <div className="flex-grow border-t border-[#eae8e4]"></div>
          </div>

          {/* Social / 1-Click Buttons */}
          <div className="space-y-2">
            <button
              id="google-signin-btn"
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-white border border-[#c2c8c2] text-[#173124] hover:bg-[#f5f3ef] font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              id="demo-customer-btn"
              type="button"
              onClick={handleQuickDemo}
              disabled={isLoading}
              className="w-full py-2 px-4 bg-[#f0debd]/40 border border-[#d6c4a5] text-[#173124] hover:bg-[#f0debd]/70 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#173124]" />
              <span>Instant Demo Account (1-Click Preview)</span>
            </button>
          </div>

          {/* Admin Vault switch */}
          <div className="pt-2 text-center">
            <button
              id="auth-admin-vault-link"
              onClick={() => {
                setIsAuthModalOpen(false);
                navigateTo('admin-login');
              }}
              className="text-[11px] text-[#6a5d43] hover:text-[#173124] inline-flex items-center gap-1 font-medium underline"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Are you a dispensary administrator? Open Vault</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
