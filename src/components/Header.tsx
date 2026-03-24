import React from 'react';
import { Compass, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d2ff] to-[#9d50bb] flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Pathfinder <span className="text-[#00d2ff]">AI</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            <a href="#explore" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Explore</a>
            <a href="#roadmap" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Roadmap</a>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-mentor-chat'))}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              AI Mentor
            </button>
            <a href="#news" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Tech News</a>
            <button 
              onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2.5 bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] text-white rounded-full text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
            >
              Get Started
            </button>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-4"
        >
          <a href="#explore" onClick={() => setIsOpen(false)} className="block text-base font-medium text-gray-600">Explore</a>
          <a href="#roadmap" onClick={() => setIsOpen(false)} className="block text-base font-medium text-gray-600">Roadmap</a>
          <button 
            onClick={() => {
              setIsOpen(false);
              window.dispatchEvent(new CustomEvent('open-mentor-chat'));
            }}
            className="block text-base font-medium text-gray-600 text-left w-full"
          >
            AI Mentor
          </button>
          <a href="#news" onClick={() => setIsOpen(false)} className="block text-base font-medium text-gray-600">Tech News</a>
          <button 
            onClick={() => {
              setIsOpen(false);
              document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold"
          >
            Get Started
          </button>
        </motion.div>
      )}
    </header>
  );
};
