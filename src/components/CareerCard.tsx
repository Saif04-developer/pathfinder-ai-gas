import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { CareerSuggestion } from '../types';

interface CareerCardProps {
  career: CareerSuggestion;
  onViewRoadmap: (career: string) => void;
}

export const CareerCard: React.FC<CareerCardProps> = ({ career, onViewRoadmap }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/10 p-8 shadow-2xl flex flex-col h-full group hover:bg-white/10 transition-all"
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{career.title}</h3>
        <div className="px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20">
          {career.matchPercentage}% Match
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mb-8 flex-grow leading-relaxed">{career.description}</p>
      
      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">Why it suits you</h4>
          <p className="text-sm text-gray-300 leading-relaxed">{career.whyItSuits}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-cyan-400" />
              Key Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {career.requiredSkills.slice(0, 3).map((skill, i) => (
                <span key={i} className="px-2 py-1 rounded-md bg-white/5 text-gray-300 text-[10px] font-medium border border-white/5">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <AlertCircle className="w-3 h-3 text-rose-400" />
              Skill Gaps
            </h4>
            <div className="flex flex-wrap gap-2">
              {career.missingSkills.slice(0, 3).map((skill, i) => (
                <span key={i} className="px-2 py-1 rounded-md bg-rose-500/5 text-rose-300 text-[10px] font-medium border border-rose-500/10">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => onViewRoadmap(career.title)}
        className="w-full py-4 bg-white text-black rounded-2xl font-bold text-sm hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 group/btn"
      >
        View Roadmap
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};
