import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Send } from 'lucide-react';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-[#08111F] relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-5/12">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-white">
              Let's Build Something <span className="text-primary">Amazing</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12">
              Ready to transform your business? Drop us a line and our engineering team will get back to you within 24 hours.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Email Us</div>
                  <a href="mailto:hello@walsaonline.com" className="text-lg text-white font-medium hover:text-primary transition-colors">hello@walsaonline.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Call Us</div>
                  <a href="tel:+18005550199" className="text-lg text-white font-medium hover:text-primary transition-colors">+1 (800) 555-0199</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">HQ</div>
                  <div className="text-lg text-white font-medium">100 AI Avenue, Tech District<br/>San Francisco, CA 94105</div>
                </div>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors font-medium">
              Message on WhatsApp
            </button>
          </div>

          <div className="w-full lg:w-7/12">
            <div className="bg-[#050816] rounded-3xl p-8 md:p-10 border border-white/10">
              {submitted ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <Send className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400">We'll be in touch shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-primary hover:text-white transition-colors"
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
                        className="w-full bg-[#08111F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-slate-400">Email Address</label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-[#08111F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Service Interest</label>
                    <select className="w-full bg-[#08111F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none">
                      <option value="">Select a service...</option>
                      <option value="ai">Custom AI Solutions</option>
                      <option value="dev">Software Development</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="training">Corporate Training</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Project Details</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-[#08111F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                      placeholder="Tell us about your goals..."
                    ></textarea>
                  </div>

                  <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm mb-4">Or bypass the form and talk to us now</p>
              <button className="flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors">
                <Calendar className="w-4 h-4" /> Book a Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
