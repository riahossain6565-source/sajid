import React from 'react';
import { useStore } from '../context/StoreContext';
import { Leaf, Award, ShieldCheck, Heart, Sparkles, ArrowRight, MessageCircle, Sun, Droplet } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      
      {/* 1. Hero Banner */}
      <section className="relative bg-[#f5f3ef] py-16 lg:py-24 border-b border-[#c2c8c2]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#f0debd] text-[#173124] text-xs font-bold uppercase tracking-widest">
                Our Sacred Lineage
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#173124] leading-tight">
                Rooted in Ancient Wisdom, <br />
                <span className="italic font-normal">Bottled for Modern Rituals</span>
              </h1>
              <p className="text-base text-[#424844] max-w-2xl leading-relaxed">
                KeshAura was born from a simple reverence: that your hair is a sacred extension of your nervous system. In an industry filled with synthetic chemicals, silicones, and micro-plastics, we craft pure, unadulterated whole-herb hair remedies using 5,000-year-old Ayurvedic methods.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => navigateTo('products')}
                  className="px-8 py-3.5 rounded-full bg-[#173124] text-white font-medium text-xs sm:text-sm hover:bg-[#2d4739] transition-all shadow-md flex items-center gap-2"
                >
                  <span>Explore Pure Formulations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://wa.me/8801618567449?text=Namaste!%20I%20would%20like%20to%20learn%20more%20about%20KeshAura's%20Ayurvedic%20sourcing."
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-full bg-white border border-[#c2c8c2] text-[#173124] font-medium text-xs sm:text-sm hover:bg-[#eae8e4] transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Sourcing Query</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border border-white">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3idMylJNuHEdN7NG0jfcQ4OLJcyClXp0GJcOru9_VQS0b5B4rhgYh0i1E2-xR9U7aBuFxejEsy55xwqkTDpkutyte6miDimgUPQk7isII9dvyDOnahcPJy4Vtv9QVMpgTG5w6jO6L8VbbBT92NAHnQSlV4DEY-RYwD25NAq49n-C5PMrw3ASixVhCI8OL6IskG1vrPH4hxg5RYZoeLZRycmvRsJaPCljRiyoeHXAt7MvisqN1lTtt_w"
                  alt="Ancient stone pedestal botanical ingredients"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#173124]/80 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white font-serif text-sm italic">
                    "When the soil is respected and herbs are hand-picked at dawn, true healing begins."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. The 4 Pillars of Vedic Purity */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6a5d43]">
            Uncompromising Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173124] mt-1">
            The 4 Pillars of Purity
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 bg-white rounded-3xl border border-[#eae8e4] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#f0debd]/60 flex items-center justify-center text-[#173124]">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#173124]">1. Solar-Dried Herbs</h3>
            <p className="text-xs text-[#424844] leading-relaxed">
              We never use industrial heat chambers. Whole botanical leaves and roots are dried naturally under the tropical Kerala sun to lock in phytonutrients and volatile terpene compounds.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#eae8e4] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#f0debd]/60 flex items-center justify-center text-[#173124]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#173124]">2. Cold-Stone Milled</h3>
            <p className="text-xs text-[#424844] leading-relaxed">
              High-speed steel blade pulverizers burn active enzymes. We crush our botanical blends on slow-speed granite stones to maintain the energetic vibration and microscopic fiber integrity.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#eae8e4] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#f0debd]/60 flex items-center justify-center text-[#173124]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#173124]">3. Zero Preservatives</h3>
            <p className="text-xs text-[#424844] leading-relaxed">
              No phenoxyethanol, parabens, synthetic fragrances, or fillers. What you receive in our amber glass jars is 100% whole raw botanical biomass.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#eae8e4] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#f0debd]/60 flex items-center justify-center text-[#173124]">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#173124]">4. Ethical Wild-Harvest</h3>
            <p className="text-xs text-[#424844] leading-relaxed">
              We partner directly with indigenous tribal foraging cooperatives in Wayanad and Nilgiri hills, ensuring fair living wages and sustainable rotational herb harvesting.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Powder Craftsmanship Image Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#173124] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 text-[#fbf9f5] items-center">
          
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f0debd]">
              Ancestral Artisanship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Why Powder Formulations are Superior to Bottled Liquids
            </h2>
            <p className="text-xs sm:text-sm text-[#b0cdbb] leading-relaxed">
              Liquid shampoos and hair creams are over 80% water. Because water breeds bacteria, brands must add synthetic parabens, formaldehydes, and chemical stabilizers.
            </p>
            <p className="text-xs sm:text-sm text-[#b0cdbb] leading-relaxed">
              By keeping KeshAura in raw, concentrated powder form, the botanicals remain naturally dormant and fresh indefinitely. You awaken the active enzymes yourself at the moment of ritual application by blending with pure water or curd.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('products')}
                className="px-6 py-3 rounded-full bg-[#f0debd] text-[#173124] font-bold text-xs hover:bg-white transition-all"
              >
                Experience the Difference
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 h-full min-h-[340px]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWAPI2qN6sSn9yMHJEqghefgUy6oIcBJuWq7iS9jmVG154SR27YTghChvmX0O0vxqfwTXNmsvQ1ykSFC00dwNIKUgLQUJAsNniIj05XFz0UJ5eA4LQwQzdowgllugwHsQCqIKnLoXF1PpilVyoshcxNRdeAX4Opl6vsieucuxGaeLD_4DFus8PZvqZOD1iHzBepNCglQq4NbD6WDP2gdaYefws8lc8bWF1ckOI5GeyX8qjvGztzXCB8A"
              alt="Handcrafting and sifting Ayurvedic herbal powder"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover min-h-[340px]"
            />
          </div>

        </div>
      </section>

      {/* 4. Sourcing Journey Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6a5d43]">
            Origin Geographies
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#173124] mt-1">
            Where Our Botanicals Grow
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#eae8e4]">
            <h4 className="font-serif font-bold text-base text-[#173124]">Wayanad Valleys, Kerala</h4>
            <p className="text-xs text-[#6a5d43] mt-1">Bhringraj, Brahmi, Hibiscus</p>
            <p className="text-xs text-[#424844] mt-2 leading-relaxed">
              Grown in nutrient-dense red laterite soil nourished by heavy monsoon showers and mist-laden microclimates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#eae8e4]">
            <h4 className="font-serif font-bold text-base text-[#173124]">Himalayan Foothills</h4>
            <p className="text-xs text-[#6a5d43] mt-1">Wild Amla, Jatamansi, Kapur Kachri</p>
            <p className="text-xs text-[#424844] mt-2 leading-relaxed">
              High-altitude wild trees producing dense, small amla fruits with 3x more vitamin C than commercial cultivars.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#eae8e4]">
            <h4 className="font-serif font-bold text-base text-[#173124]">Western Ghats Forests</h4>
            <p className="text-xs text-[#6a5d43] mt-1">Shikakai, Reetha, Vetiver Roots</p>
            <p className="text-xs text-[#424844] mt-2 leading-relaxed">
              Wild-harvested thorny fruit pods rich in natural soapnut saponins, carefully gathered without felling tree branches.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
