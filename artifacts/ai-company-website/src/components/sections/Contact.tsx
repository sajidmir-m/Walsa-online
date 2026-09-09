import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Send } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { usePageSection } from '@/lib/pageContent';

const defaultContact = {
  heading: "Let's Build Something",
  heading_highlight: 'Amazing',
  body: 'Ready to transform your business? Drop us a line and our engineering team will get back to you within 24 hours.',
  email: 'hello@kasshit.in',
  phone: '+91 88250 56728',
  whatsapp_number: '91495593939',
  address_line1: 'Khanyar',
  address_line2: 'Srinagar, Jammu and Kashmir',
};

export default function Contact() {
  const { data: info } = usePageSection('contact', 'info', defaultContact);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    service_interest: '',
    message: '',
    phone: '',
  });

  const waHref = `https://wa.me/${info.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(
    "Hi Kasshit, I'd like to discuss a project.",
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!isSupabaseConfigured || !supabase) {
        // Fallback: open WhatsApp with the message so leads still reach you
        const text = encodeURIComponent(
          `New query from ${form.name}\nEmail: ${form.email}\nService: ${form.service_interest || 'General'}\n\n${form.message}`,
        );
        window.open(`https://wa.me/${info.whatsapp_number.replace(/\D/g, '')}?text=${text}`, '_blank');
        setSubmitted(true);
        return;
      }

      const { data, error: fnError } = await supabase.functions.invoke('submit-query', {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          service_interest: form.service_interest || undefined,
          message: form.message.trim(),
          source_page: 'home',
        },
      });

      if (fnError) {
        throw new Error(fnError.message || 'Failed to submit');
      }
      if (data?.error) {
        throw new Error(data.error);
      }

      setSubmitted(true);
      setForm({ name: '', email: '', service_interest: '', message: '', phone: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32 bg-[#08111F] relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="w-full lg:w-5/12">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-white">
              {info.heading} <span className="text-primary">{info.heading_highlight}</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12">{info.body}</p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Email Us</div>
                  <a
                    href={`mailto:${info.email}`}
                    className="text-lg text-white font-medium hover:text-primary transition-colors"
                  >
                    {info.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Call Us</div>
                  <a
                    href={`tel:${info.phone.replace(/[^\d+]/g, '')}`}
                    className="text-lg text-white font-medium hover:text-primary transition-colors"
                  >
                    {info.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">HQ</div>
                  <div className="text-lg text-white font-medium">
                    {info.address_line1}
                    <br />
                    {info.address_line2}
                  </div>
                </div>
              </div>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors font-medium"
            >
              Message on WhatsApp
            </a>
          </div>

          <div className="w-full lg:w-7/12">
            <div className="bg-[#050816] rounded-3xl p-5 sm:p-8 md:p-10 border border-white/10">
              {submitted ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <Send className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400">
                    We&apos;ll be in touch shortly — you should also get a WhatsApp confirmation on our side.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-primary hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-slate-400">Full Name</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full bg-[#08111F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-slate-400">Email Address</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full bg-[#08111F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Phone (optional)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full bg-[#08111F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Service Interest</label>
                    <select
                      value={form.service_interest}
                      onChange={(e) => setForm((f) => ({ ...f, service_interest: e.target.value }))}
                      className="w-full bg-[#08111F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                    >
                      <option value="">Select a service...</option>
                      <option value="Custom AI Solutions">Custom AI Solutions</option>
                      <option value="Software Development">Software Development</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Corporate Training">Corporate Training</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Project Details</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full bg-[#08111F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                      placeholder="Tell us about your goals..."
                    />
                  </div>

                  {error && (
                    <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
                      {error}
                    </div>
                  )}

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm mb-4">Or bypass the form and talk to us now</p>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors"
              >
                <Calendar className="w-4 h-4" /> Book a Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
