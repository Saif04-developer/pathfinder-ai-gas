import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Calendar, Tag } from 'lucide-react';
import { TechNewsItem } from '../types';

const MOCK_NEWS: TechNewsItem[] = [
  {
    id: '1',
    title: 'The Rise of Generative AI in Software Engineering',
    description: 'How LLMs are changing the way developers write code and manage complex architectures.',
    imageUrl: 'https://picsum.photos/seed/ai-dev/800/600',
    date: 'Mar 24, 2026',
    category: 'AI & ML'
  },
  {
    id: '2',
    title: 'Quantum Computing: Breaking the 1000-Qubit Barrier',
    description: 'New breakthroughs in error correction bring practical quantum applications closer than ever.',
    imageUrl: 'https://picsum.photos/seed/quantum/800/600',
    date: 'Mar 22, 2026',
    category: 'Hardware'
  },
  {
    id: '3',
    title: 'Sustainable Tech: Green Data Centers of the Future',
    description: 'Major cloud providers are pivoting to renewable energy and innovative cooling systems.',
    imageUrl: 'https://picsum.photos/seed/green-tech/800/600',
    date: 'Mar 20, 2026',
    category: 'Sustainability'
  }
];

export const TechNews: React.FC = () => {
  return (
    <section id="news" className="py-24 px-4 bg-black/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-white mb-3">Industry Insights</h2>
            <p className="text-gray-400">Stay ahead with the latest trends and breakthroughs</p>
          </div>
          <button className="px-6 py-2 rounded-full border border-white/10 text-gray-300 font-bold text-sm flex items-center gap-2 hover:bg-white/5 transition-all">
            View All News <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {MOCK_NEWS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white/5 backdrop-blur-xl rounded-[32px] overflow-hidden border border-white/10 shadow-2xl hover:bg-white/10 transition-all"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md text-cyan-400 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-cyan-500/20 shadow-lg">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
