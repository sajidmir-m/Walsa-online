import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, ArrowRight, Code2, Megaphone, Target, Users } from 'lucide-react';

const team = [
  {
    initials: 'AF',
    name: 'Ayaan Farooq',
    role: 'Founder & CEO',
    blurb: 'Sets the vision across technology and growth — making sure every engagement delivers measurable outcomes.',
    color: 'from-primary to-[#8B5CF6]',
    // Swap in a real photo later: image: '/images/team/ayaan.jpg',
  },
  {
    initials: 'SK',
    name: 'Sara Khan',
    role: 'Marketing Manager',
    blurb: 'Owns brand strategy, content calendars, and paid acquisition — turning campaigns into consistent pipeline.',
    color: 'from-purple-500 to-fuchsia-500',
  },
  {
    initials: 'RM',
    name: 'Rohan Mehta',
    role: 'Lead Engineer',
    blurb: 'Architects AI agents, cloud systems, and product backends that scale without drama.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    initials: 'NP',
    name: 'Nisha Patel',
    role: 'Creative Director',
    blurb: 'Shapes visual identity, reels concepts, and design systems that make brands feel premium.',
    color: 'from-pink-500 to-rose-500',
  },
];

const pillars = [
  {
    icon: Code2,
    title: 'Technology',
    desc: 'AI agents, software, mobile apps, cloud, and UX — engineered for production, not demos.',
  },
  {
    icon: Megaphone,
    title: 'Marketing',
    desc: 'Social, content, SEO, ads, and branding — managed end-to-end so you can focus on the business.',
  },
  {
    icon: Target,
    title: 'Outcomes',
    desc: 'Every engagement is measured. We optimize for ROI, rankings, and systems that keep working.',
  },
];

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#050816]/90 backdrop-blur-md border-b border-white/5 flex items-center px-5">
        <button
          onClick={() => setLocation('/')}
          className="flex items-center group cursor-pointer bg-transparent border-none p-0 mr-6"
          aria-label="WALSA ONLINE home"
        >
          <img
            src="/logo.jpg"
            alt="WALSA ONLINE"
            className="h-9 w-auto object-contain rounded-md transition-transform group-hover:scale-105 duration-300"
          />
        </button>
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="hidden sm:block">About Us</span>
        </div>
        <button
          onClick={() => setLocation('/')}
          className="ml-auto flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:block">Back to Home</span>
        </button>
      </header>

      <main className="pt-28 pb-20 px-5 sm:px-8 max-w-7xl mx-auto">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm text-slate-300">Who We Are</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            Builders &amp; Marketers,{' '}
            <span className="bg-gradient-to-r from-primary to-[#00FFA3] text-transparent bg-clip-text">
              Under One Roof
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            WALSA ONLINE is a digital transformation company with two clear strengths: technology that
            ships, and marketing that grows. Our engineers build AI agents and software. Our marketers
            make sure the right people find you — with content, SEO, and campaigns that compound.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl bg-[#08111F] border border-white/5 p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <pillar.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-white font-bold font-display text-lg mb-2">{pillar.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-white/5 p-8 sm:p-12 mb-24"
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-display mb-4 text-white">Our Mission</h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            Help ambitious businesses modernize how they operate and how they show up online — without
            juggling five agencies. From AI systems and cloud infrastructure to social media, reels,
            and paid ads, we take ownership end-to-end so you can focus on running the business.
          </p>
        </motion.div>

        {/* Team */}
        <div className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-3 text-white">The Team</h2>
          <p className="text-slate-400 mb-10 max-w-xl">
            Placeholder profiles for now — swap in real photos anytime by adding an image path to each card.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl bg-[#08111F] border border-white/5 p-6 flex flex-col items-center text-center"
              >
                {/* Avatar — replace with <img src={member.image} /> when ready */}
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <span className="text-white font-bold text-xl font-display tracking-tight">
                    {member.initials}
                  </span>
                </div>
                <h3 className="text-white font-semibold font-display mb-1">{member.name}</h3>
                <span className="text-primary text-xs font-medium uppercase tracking-wider mb-3">
                  {member.role}
                </span>
                <p className="text-slate-400 text-sm leading-relaxed">{member.blurb}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-indigo-500/10 to-transparent border border-primary/10 p-10 text-center">
          <h2 className="text-3xl font-bold font-display mb-4 text-white">Let’s Build Something Together</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Whether you need AI agents, a new product, or a full marketing engine — we’re ready.
          </p>
          <button
            onClick={() => setLocation('/#contact')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
