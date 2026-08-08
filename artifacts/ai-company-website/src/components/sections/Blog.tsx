import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

const posts = [
  {
    title: "The Future of RAG Systems in Enterprise Software",
    category: "Engineering",
    excerpt: "Why standard vector databases are no longer enough, and how graph-based RAG is changing the retrieval landscape.",
    time: "5 min read",
    date: "Oct 12, 2023",
    img: "/images/blog-1.jpg"
  },
  {
    title: "Migrating Legacy Monoliths with AI Assist",
    category: "Cloud",
    excerpt: "A case study on using custom LLMs to refactor 10-year-old Python codebases into modern microservices.",
    time: "8 min read",
    date: "Oct 05, 2023",
    img: "/images/blog-2.jpg"
  },
  {
    title: "Securing AI Agents: A Red Teaming Guide",
    category: "Security",
    excerpt: "How to prevent prompt injection, data exfiltration, and unexpected behavior in autonomous agents.",
    time: "6 min read",
    date: "Sep 28, 2023",
    img: "/images/blog-3.jpg"
  }
];

export default function Blog() {
  return (
    <section className="py-16 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-white">Latest Insights</h2>
            <p className="text-slate-400 text-lg">Thoughts, tutorials, and engineering deep dives.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-primary font-medium hover:text-white transition-colors group">
            View All Posts <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer bg-card border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-colors"
            >
              <div className="h-48 overflow-hidden relative">
                {/* Image Placeholder until generated image is available */}
                <div className="absolute inset-0 bg-[#1A1A2E] z-0" />
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback to gradient if image not generated yet
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                </div>
                <h3 className="text-xl font-bold font-display text-white mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-400 mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="text-primary text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
        <button className="md:hidden mt-8 w-full py-4 rounded-xl border border-white/10 text-white font-medium flex justify-center items-center gap-2">
          View All Posts <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
