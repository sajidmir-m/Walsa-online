import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  { name: "Sarah Jenkins", role: "CTO, TechFlow", text: "Kasshit completely transformed our data pipeline. What used to take days now happens in real-time." },
  { name: "Marcus Chen", role: "Founder, RetailPro", text: "Their predictive AI model increased our inventory efficiency by 40%. The ROI was visible in week one." },
  { name: "Elena Rodriguez", role: "VP Engineering, HealthSync", text: "The healthcare app they built is flawless. Secure, compliant, and beautifully designed. Highly recommend." },
  { name: "David Kim", role: "Director of Marketing, Elevate", text: "Our lead generation tripled after they implemented their automated marketing funnels. Incredible work." },
  { name: "Jessica Walsh", role: "CEO, Innovate Logistics", text: "The custom dashboard gives us insights we didn't even know we needed. It's changed how we do business." },
  { name: "Michael Chang", role: "Operations Head, FinServe", text: "Their team's grasp of both AI and our specific industry regulations was impressive." },
  { name: "Anita Patel", role: "Startup Founder", text: "From zero to launch in 8 weeks. The development speed and code quality were exceptional." },
  { name: "James Wilson", role: "E-Commerce Director", text: "The personalized recommendation engine increased our average order value by 22%." }
];

const TestimonialCard = ({ item }: { item: any }) => {
  const initials = item.name.split(' ').map((n: string) => n[0]).join('');
  return (
    <div className="w-[300px] sm:w-[400px] shrink-0 p-5 sm:p-6 bg-[#08111F] rounded-2xl border border-white/5 mx-3 sm:mx-4">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
      </div>
      <p className="text-slate-300 text-sm leading-relaxed mb-6">"{item.text}"</p>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-lg">
          {initials}
        </div>
        <div>
          <div className="text-white font-medium text-sm">{item.name}</div>
          <div className="text-slate-500 text-xs">{item.role}</div>
        </div>
      </div>
    </div>
  );
};

export default function Testimonials() {
  return (
    <section className="py-32 bg-[#050816] overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl mb-16 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-white">What Our Clients Say</h2>
        <p className="text-slate-400">Don't just take our word for it.</p>
      </div>

      <div className="flex flex-col gap-8 relative">
        <div className="flex overflow-hidden">
          <div className="testimonial-marquee-left flex w-max">
            {[...testimonials, ...testimonials].map((item, i) => (
              <TestimonialCard key={`row1-${i}`} item={item} />
            ))}
          </div>
        </div>

        <div className="flex overflow-hidden">
          <div className="testimonial-marquee-right flex w-max">
            {[...testimonials].reverse().concat([...testimonials].reverse()).map((item, i) => (
              <TestimonialCard key={`row2-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
