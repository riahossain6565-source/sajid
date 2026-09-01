import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, X, Check, ArrowRight, RotateCcw, MessageCircle } from 'lucide-react';

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HairQuizModal: React.FC<QuizProps> = ({ isOpen, onClose }) => {
  const { products, addToCart, navigateTo, orderViaWhatsApp } = useStore();
  const [step, setStep] = useState(1);
  const [scalpType, setScalpType] = useState<'dry' | 'oily' | 'sensitive' | 'normal'>('dry');
  const [concern, setConcern] = useState<'hairfall' | 'dandruff' | 'frizz' | 'thinning'>('hairfall');
  const [hairTexture, setHairTexture] = useState<'curly' | 'straight' | 'wavy' | 'coarse'>('wavy');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setScalpType('dry');
    setConcern('hairfall');
    setHairTexture('wavy');
  };

  // Determine recommended product based on answers
  let recommendedProduct = products[0]; // default nourishing
  let doshaRecommendation = 'Vata-Pitta Balance';
  let recommendedRitual = 'Mix with fresh yogurt and 1 tsp of almond or virgin coconut oil for deeply hydrated roots.';

  if (concern === 'dandruff' || scalpType === 'oily') {
    recommendedProduct = products.find(p => p.id === 'calming-scalp-treatment') || products[0];
    doshaRecommendation = 'Kapha Soothing Scalp Clarifier';
    recommendedRitual = 'Mix with warm water and 1 spoon of aloe vera gel. Apply directly to scalp for 25 minutes.';
  } else if (concern === 'frizz' || hairTexture === 'curly') {
    recommendedProduct = products.find(p => p.id === 'revitalizing-scalp-mask') || products[0];
    doshaRecommendation = 'Pitta Cooling & Moisture Infusion';
    recommendedRitual = 'Mix with fresh coconut milk. Coat lengths and ends for silky bounce and shine.';
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-[#fbf9f5] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#c2c8c2] z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#eae8e4]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#f0debd] text-[#173124]">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-serif text-lg font-bold text-[#173124]">
              Ayurvedic Dosha & Hair Diagnosis
            </h3>
          </div>
          <button onClick={onClose} className="text-[#727973] hover:text-[#173124] p-1 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step indicator */}
        {step <= 3 && (
          <div className="py-4">
            <div className="flex items-center justify-between text-xs text-[#6a5d43] font-medium mb-1.5">
              <span>Step {step} of 3</span>
              <span>
                {step === 1 && 'Scalp State'}
                {step === 2 && 'Primary Hair Concern'}
                {step === 3 && 'Hair Texture'}
              </span>
            </div>
            <div className="w-full bg-[#eae8e4] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#173124] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Scalp Type */}
        {step === 1 && (
          <div className="space-y-4 py-2">
            <h4 className="font-serif text-base font-bold text-[#173124]">
              How does your scalp feel 24 hours after washing?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'dry', label: 'Dry & Tight', desc: 'Prone to itching, flaky dry skin (Vata)' },
                { id: 'oily', label: 'Greasy or Sticky', desc: 'Needs frequent washing (Kapha)' },
                { id: 'sensitive', label: 'Warm & Red / Irritated', desc: 'Sensitive to heat or chemicals (Pitta)' },
                { id: 'normal', label: 'Balanced', desc: 'Neither excessively dry nor oily' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setScalpType(opt.id as any)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    scalpType === opt.id
                      ? 'border-[#173124] bg-[#2d4739]/10 text-[#173124] ring-1 ring-[#173124]'
                      : 'border-[#c2c8c2]/60 bg-white hover:border-[#173124]/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-xs text-[#173124]">{opt.label}</span>
                    {scalpType === opt.id && <Check className="w-3.5 h-3.5 text-[#173124]" />}
                  </div>
                  <p className="text-[11px] text-[#424844] mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
            
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-full bg-[#173124] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#2d4739]"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Concern */}
        {step === 2 && (
          <div className="space-y-4 py-2">
            <h4 className="font-serif text-base font-bold text-[#173124]">
              What is your primary hair concern right now?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'hairfall', label: 'Excessive Hair Fall / Thinning', desc: 'Noticeable shedding on pillows & shower' },
                { id: 'dandruff', label: 'Dandruff & Scalp Buildup', desc: 'Stubborn flakes and persistent scalp itch' },
                { id: 'frizz', label: 'Frizz, Breakage & Dry Cuticles', desc: 'Rough ends lacking natural gloss' },
                { id: 'thinning', label: 'Receding Hairline & Slow Growth', desc: 'Seeking dormant follicle awakening' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setConcern(opt.id as any)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    concern === opt.id
                      ? 'border-[#173124] bg-[#2d4739]/10 text-[#173124] ring-1 ring-[#173124]'
                      : 'border-[#c2c8c2]/60 bg-white hover:border-[#173124]/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-xs text-[#173124]">{opt.label}</span>
                    {concern === opt.id && <Check className="w-3.5 h-3.5 text-[#173124]" />}
                  </div>
                  <p className="text-[11px] text-[#424844] mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
            
            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-[#727973] hover:text-[#173124]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-full bg-[#173124] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#2d4739]"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Texture */}
        {step === 3 && (
          <div className="space-y-4 py-2">
            <h4 className="font-serif text-base font-bold text-[#173124]">
              What is your natural hair strand structure?
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'curly', label: 'Curly / Coily' },
                { id: 'wavy', label: 'Wavy / Textured' },
                { id: 'straight', label: 'Fine / Straight' },
                { id: 'coarse', label: 'Thick / Coarse' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setHairTexture(opt.id as any)}
                  className={`p-3 rounded-2xl text-center border transition-all ${
                    hairTexture === opt.id
                      ? 'border-[#173124] bg-[#2d4739]/10 text-[#173124] ring-1 ring-[#173124]'
                      : 'border-[#c2c8c2]/60 bg-white hover:border-[#173124]/50'
                  }`}
                >
                  <span className="font-semibold text-xs text-[#173124]">{opt.label}</span>
                </button>
              ))}
            </div>
            
            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-[#727973] hover:text-[#173124]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 rounded-full bg-[#173124] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#2d4739]"
              >
                <span>Analyze My Ayurvedic Formula</span>
                <Sparkles className="w-3.5 h-3.5 text-[#f0debd]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Result Diagnosis */}
        {step === 4 && (
          <div className="space-y-5 py-2 animate-in fade-in">
            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-[#f0debd] text-[#173124] text-[11px] font-bold tracking-wider uppercase mb-2">
                {doshaRecommendation}
              </span>
              <h4 className="font-serif text-xl font-bold text-[#173124]">
                Your Ideal Formulation
              </h4>
            </div>

            {/* Recommended product card */}
            <div className="bg-white p-4 rounded-2xl border border-[#eae8e4] shadow-sm flex items-center gap-4">
              <img
                src={recommendedProduct.image}
                alt={recommendedProduct.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-xl object-cover bg-[#f5f3ef] shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h5 className="font-serif font-bold text-sm text-[#173124] truncate">
                  {recommendedProduct.name}
                </h5>
                <p className="text-xs text-[#6a5d43] line-clamp-1">{recommendedProduct.subtitle}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-bold text-sm text-[#173124]">₹{recommendedProduct.price}</span>
                  <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                    98% Match
                  </span>
                </div>
              </div>
            </div>

            {/* Custom Mixing Ritual Advice */}
            <div className="bg-[#f5f3ef] p-3.5 rounded-2xl border border-[#c2c8c2]/50 text-xs text-[#424844] space-y-1">
              <p className="font-bold text-[#173124] flex items-center gap-1.5">
                🥣 Customized Ayurvedic Mixing Ritual:
              </p>
              <p className="text-xs leading-relaxed">{recommendedRitual}</p>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  addToCart(recommendedProduct, recommendedProduct.sizes[0].weight, 1);
                  onClose();
                }}
                className="w-full py-3 rounded-full bg-[#173124] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#2d4739] shadow-sm transition-all"
              >
                <span>Add Recommended Pack to Basket</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  orderViaWhatsApp(recommendedProduct, recommendedProduct.sizes[0].weight, 1);
                  onClose();
                }}
                className="w-full py-2.5 rounded-full bg-[#f0debd]/80 border border-[#d6c4a5] text-[#173124] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#f0debd] transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Order on WhatsApp with Custom Ritual</span>
              </button>

              <div className="flex justify-center pt-2">
                <button
                  onClick={handleReset}
                  className="text-xs text-[#727973] hover:text-[#173124] flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Retake Hair Diagnosis</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
