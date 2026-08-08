import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2, Building, Stethoscope, Utensils, Hotel, GraduationCap,
  BookOpen, ShoppingCart, ShoppingBag, Home, Factory, Truck,
  Landmark, HeartHandshake, Briefcase
} from 'lucide-react';

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=480&q=55`;

const industries = [
  { icon: Building2, name: "Startups", image: img('photo-1522071820081-009f0129c71c') },
  { icon: Building, name: "Enterprises", image: img('photo-1486406146926-c627a92ad1ab') },
  { icon: Stethoscope, name: "Hospitals", image: img('photo-1586773860418-d37222d8fce3') },
  { icon: Utensils, name: "Restaurants", image: img('photo-1517248135467-4c7edcad34c4') },
  { icon: Hotel, name: "Hotels", image: img('photo-1566073771259-6a8506099945') },
  { icon: GraduationCap, name: "Schools", image: img('photo-1580582932707-520aed937b7b') },
  { icon: BookOpen, name: "Colleges", image: img('photo-1541339907198-e08756dedf3f') },
  { icon: ShoppingCart, name: "E-Commerce", image: img('photo-1563013544-824ae1b704d3') },
  { icon: ShoppingBag, name: "Retail", image: img('photo-1441986300917-64674bd600d8') },
  { icon: Home, name: "Real Estate", image: img('photo-1568605114967-8130f3a36994') },
  { icon: Factory, name: "Manufacturing", image: img('photo-1581091226825-a6a2a5aee158') },
  { icon: Truck, name: "Logistics", image: img('photo-1586528116311-ad8dd3c8310d') },
  { icon: Landmark, name: "Government", image: img('photo-1555848962-6e79363ec58f') },
  { icon: HeartHandshake, name: "NGOs", image: img('photo-1559027615-cd4628902d4a') },
  { icon: Briefcase, name: "Financial", image: img('photo-1611974789855-9c2a0a7236a3') }
];

export default function Industries() {
  return (
    <section className="py-16 md:py-32 bg-background relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-white">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#00FFA3]">Every Industry</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Our AI and software solutions are tailored to the unique regulatory, scale, and operational demands of your sector.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(108, 99, 255, 0.3)"
              }}
              className="group relative bg-[#08111F] border border-white/5 rounded-2xl p-6 min-h-[130px] flex flex-col items-center justify-center text-center gap-4 cursor-pointer overflow-hidden"
            >
              {/* Background photo with dark overlay so text stays readable */}
              <img
                src={item.image}
                alt=""
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/95 via-[#050816]/60 to-[#050816]/30" />

              <item.icon className="relative z-10 w-8 h-8 text-primary drop-shadow-lg" />
              <span className="relative z-10 font-semibold text-white drop-shadow">{item.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
