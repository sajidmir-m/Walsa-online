import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Building, Stethoscope, Utensils, Hotel, GraduationCap, 
  BookOpen, ShoppingCart, ShoppingBag, Home, Factory, Truck, 
  Landmark, HeartHandshake, Briefcase 
} from 'lucide-react';

const industries = [
  { icon: Building2, name: "Startups" },
  { icon: Building, name: "Enterprises" },
  { icon: Stethoscope, name: "Hospitals" },
  { icon: Utensils, name: "Restaurants" },
  { icon: Hotel, name: "Hotels" },
  { icon: GraduationCap, name: "Schools" },
  { icon: BookOpen, name: "Colleges" },
  { icon: ShoppingCart, name: "E-Commerce" },
  { icon: ShoppingBag, name: "Retail" },
  { icon: Home, name: "Real Estate" },
  { icon: Factory, name: "Manufacturing" },
  { icon: Truck, name: "Logistics" },
  { icon: Landmark, name: "Government" },
  { icon: HeartHandshake, name: "NGOs" },
  { icon: Briefcase, name: "Financial" }
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
                rotateX: 10, 
                rotateY: 10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(108, 99, 255, 0.3)"
              }}
              style={{ perspective: 1000 }}
              className="bg-[#08111F] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 cursor-pointer transition-colors hover:bg-white/5"
            >
              <item.icon className="w-8 h-8 text-primary" />
              <span className="font-medium text-slate-300">{item.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
