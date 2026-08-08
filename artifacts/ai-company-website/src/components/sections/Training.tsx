import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Award, Briefcase, BookOpen } from 'lucide-react';

const courses = [
  "AI & Machine Learning", "Python Data Science", "Full Stack MERN", 
  "React & Next.js", "Flutter Mobile Dev", "Node.js Backend", 
  "UI/UX Design", "AWS Cloud Architecture", "DevOps & Docker", 
  "Prompt Engineering", "LangChain & RAG", "AI Agents & n8n"
];

const programs = [
  {
    title: "Industrial Training",
    duration: "6 Months",
    desc: "Intensive hands-on training mirroring real corporate environments.",
    highlights: ["Live Projects", "Code Reviews", "System Design", "Agile Workflow"]
  },
  {
    title: "Summer/Winter Training",
    duration: "6-8 Weeks",
    desc: "Accelerated skill development during academic breaks.",
    highlights: ["Core Fundamentals", "Mini Project", "Certification", "Tech Stack Deep Dive"]
  },
  {
    title: "Internship Program",
    duration: "3-6 Months",
    desc: "Work directly on client projects with our senior engineering team.",
    highlights: ["Stipend Based", "Client Exposure", "Mentorship", "Pre-Placement Offer"]
  }
];

export default function Training() {
  const [tab, setTab] = useState<'courses' | 'programs'>('courses');

  return (
    <section id="training" className="py-16 md:py-32 bg-[#0F172A] relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-white">Level Up Your Skills</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Learn from the engineers building the future. Practical, project-based training designed for the modern tech landscape.
          </p>
          
          <div className="inline-flex items-center p-1 bg-background rounded-full border border-white/10">
            <button
              onClick={() => setTab('courses')}
              className={`px-4 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all ${tab === 'courses' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Trending Courses
            </button>
            <button
              onClick={() => setTab('programs')}
              className={`px-4 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all ${tab === 'programs' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Career Programs
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {tab === 'courses' ? (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {courses.map((course, i) => (
                <div key={i} className="bg-card border border-white/5 hover:border-primary/50 p-6 rounded-2xl transition-all hover:-translate-y-1 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="w-5 h-5 text-slate-300 group-hover:text-primary" />
                  </div>
                  <h3 className="text-white font-medium">{course}</h3>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="programs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {programs.map((prog, i) => (
                <div key={i} className="bg-card border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-slate-300">
                      {prog.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white mb-2 mt-4">{prog.title}</h3>
                  <p className="text-slate-400 text-sm mb-6">{prog.desc}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {prog.highlights.map((high, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {high}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-primary text-white font-medium transition-colors border border-white/10 group-hover:border-primary">
                    Apply Now
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Award className="w-5 h-5 text-accent" /> 100% Placement Assistance
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Briefcase className="w-5 h-5 text-accent" /> Resume & Interview Prep
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <CheckCircle2 className="w-5 h-5 text-accent" /> Industry Recognized Certificate
          </div>
        </div>
      </div>
    </section>
  );
}
