import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FAQS } from '../data/products';
import { MessageCircle, Mail, MapPin, Phone, Clock, Send, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { showToast, generateWhatsAppUrl } = useStore();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hairConcern: 'Hair Fall & Thinning',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been received by our Ayurvedic Vaidya team.');
  };

  const handleWhatsAppConsult = () => {
    const text = `🌿 *KeshAura Consultation Request* 🌿\n\n` +
      `Name: ${formData.name || 'Hair Care Seeker'}\n` +
      `Concern: ${formData.hairConcern}\n` +
      (formData.message ? `Notes: ${formData.message}\n` : '') +
      `\nNamaste, I would like expert advice on selecting the right KeshAura hair pack.`;
    const url = generateWhatsAppUrl(text);
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-[#f0debd] text-[#173124] text-xs font-bold uppercase tracking-widest">
          Ayurvedic Sanctuary
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#173124]">
          Consult Our Vaidyas & Studio
        </h1>
        <p className="text-sm text-[#424844] leading-relaxed">
          Whether you need personalized hair pack advice, dosage recommendations, or assistance with a WhatsApp order, we are here to support your sacred hair ritual.
        </p>
      </div>

      {/* Grid: Studio Details & Consultation Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Studio Space Image & Info */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#eae8e4] bg-white">
            <div className="aspect-4/3 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzBbbfzuqFLVypa9oeM6eFO2D4jP2Mrcgyyd66VxAcHZbIVoLCZo4ucGCaNp8iNqSlPVOsiAlrfJPhaCScms0ZVrZatv_otWE-R_BnLSbTl6fVMAks3uY4GoVf3Qe3FhWadk_p2wFSsQUnr9yJ5CmmbFDCasVs7NNbdvc6CoevFRTaRc8BRIHyL8ANxeTYYlZJiP3zZwfJtyRR_5SG1RVKg2Fxc8gvMB2bb4vQzA-d018YRwNAbtyNOQ"
                alt="KeshAura Studio Dispensary and Formulation Space"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-[#173124]">
                📍 Formulation Apothecary
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs text-[#424844]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#173124] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#173124]">KeshAura Apothecary & Botanical Vault</h5>
                  <p>14 Vedic Grove, Kalpetta, Wayanad District, Kerala - 673121, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#173124] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#173124]">Consultation Hours</h5>
                  <p>Monday to Saturday: 9:00 AM – 7:30 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#173124] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#173124]">WhatsApp Direct Line</h5>
                  <p className="font-semibold text-[#173124]">01618567449 (+880 1618-567449)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#173124] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#173124]">Email Inquiries</h5>
                  <p>care@keshaura.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instant WhatsApp Card */}
          <div className="bg-[#173124] rounded-3xl p-6 text-white space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-[#f0debd]">
              <MessageCircle className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base text-white">Instant WhatsApp Concierge</h4>
            </div>
            <p className="text-xs text-[#b0cdbb] leading-relaxed">
              Get immediate answers regarding pack preparation, custom blends for severe scalp irritation, or order status.
            </p>
            <button
              onClick={handleWhatsAppConsult}
              className="w-full py-3 rounded-full bg-[#f0debd] text-[#173124] font-bold text-xs hover:bg-white transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open WhatsApp Consultation</span>
            </button>
          </div>

        </div>

        {/* Right Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#eae8e4] shadow-ambient-1">
          
          <div className="mb-6">
            <h3 className="font-serif text-2xl font-bold text-[#173124]">
              Send an Inquiry to our Ayurvedic Team
            </h3>
            <p className="text-xs text-[#424844] mt-1">
              Please share your hair history and any specific allergies or questions.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#173124]">
                Inquiry Received with Gratitude
              </h4>
              <p className="text-xs text-[#424844] max-w-sm mx-auto">
                One of our Ayurvedic practitioners will review your hair concern and respond within 24 hours via email or WhatsApp.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-[#173124] text-white text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#173124] font-bold mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Iyer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#fbf9f5] border border-[#c2c8c2] text-[#173124] focus:outline-none focus:border-[#173124]"
                  />
                </div>

                <div>
                  <label className="block text-[#173124] font-bold mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="radhika@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#fbf9f5] border border-[#c2c8c2] text-[#173124] focus:outline-none focus:border-[#173124]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#173124] font-bold mb-1.5">WhatsApp Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98450 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#fbf9f5] border border-[#c2c8c2] text-[#173124] focus:outline-none focus:border-[#173124]"
                  />
                </div>

                <div>
                  <label className="block text-[#173124] font-bold mb-1.5">Primary Hair Concern</label>
                  <select
                    value={formData.hairConcern}
                    onChange={(e) => setFormData({ ...formData, hairConcern: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#fbf9f5] border border-[#c2c8c2] text-[#173124] focus:outline-none focus:border-[#173124]"
                  >
                    <option value="Hair Fall & Thinning">Hair Fall & Thinning</option>
                    <option value="Chronic Dandruff / Scalp Itch">Chronic Dandruff / Scalp Itch</option>
                    <option value="Extreme Frizz & Split Ends">Extreme Frizz & Split Ends</option>
                    <option value="Premature Greying">Premature Greying</option>
                    <option value="Custom Batch Request">Custom Batch Request</option>
                    <option value="General Query">General Query</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#173124] font-bold mb-1.5">Message / Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your current scalp condition, previous treatments, or specific questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#fbf9f5] border border-[#c2c8c2] text-[#173124] focus:outline-none focus:border-[#173124]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#173124] text-white font-bold hover:bg-[#2d4739] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppConsult}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#f0debd]/80 border border-[#d6c4a5] text-[#173124] font-bold hover:bg-[#f0debd] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp Instead</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="space-y-6 pt-6 border-t border-[#eae8e4]">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6a5d43]">
            Clarity & Guidance
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#173124] mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#eae8e4] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-[#fbf9f5] transition-colors"
                >
                  <span className="font-serif font-bold text-sm text-[#173124]">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#173124] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#727973] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#424844] leading-relaxed border-t border-[#f5f3ef] pt-3 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
