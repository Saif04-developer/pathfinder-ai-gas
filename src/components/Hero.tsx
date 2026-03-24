import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-sm font-medium mb-12 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Career Navigation</span>
        </motion.div>
        
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl md:text-9xl font-extrabold tracking-tight mb-8"
        >
          <span className="bg-gradient-to-r from-[#00d2ff] via-[#9d50bb] to-[#ff00c1] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,210,255,0.3)]">
            Pathfinder AI
          </span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl md:text-2xl text-gray-300 font-light mb-12 tracking-wide"
        >
          Navigate Your Future with Artificial Intelligence
        </motion.p>

        {/* Divider Line */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] mx-auto mb-16 rounded-full"
        />

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button 
            onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] text-white rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,210,255,0.4)]"
          >
            Explore Now
          </button>
          
          <button 
            className="px-10 py-4 rounded-xl font-bold text-lg text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-md"
          >
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
};
