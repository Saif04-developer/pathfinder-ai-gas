import React from 'react';
import { motion } from 'motion/react';
import { Calendar, CheckCircle, MapPin, Clock } from 'lucide-react';
import { Roadmap as RoadmapType } from '../types';

interface RoadmapProps {
  roadmap: RoadmapType;
  career: string;
}

export const Roadmap: React.FC<RoadmapProps> = ({ roadmap, career }) => {
  const [activePlan, setActivePlan] = React.useState<'planA' | 'planB'>('planA');

  return (
    <section id="roadmap" className="py-24 px-4 bg-black/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Your Path to {career}</h2>
          <div className="inline-flex p-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActivePlan('planA')}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                activePlan === 'planA' ? 'bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] text-white shadow-lg shadow-cyan-500/20' : 'text-gray-400 hover:text-white'
              }`}
            >
              Plan A: Direct
            </button>
            <button
              onClick={() => setActivePlan('planB')}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                activePlan === 'planB' ? 'bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] text-white shadow-lg shadow-cyan-500/20' : 'text-gray-400 hover:text-white'
              }`}
            >
              Plan B: Alternative
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

          <div className="space-y-16">
            {roadmap[activePlan].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-12 ${
                  i % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Step Content */}
                <div className="flex-1 w-full">
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 shadow-2xl hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-4 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-cyan-500/20">
                        Phase {i + 1}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {step.timeline}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">{step.description}</p>
                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="p-2 bg-cyan-500/10 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1.5">Action Item</p>
                        <p className="text-sm text-gray-300 font-medium">{step.action}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-8 md:left-1/2 w-10 h-10 bg-[#0a0510] border-2 border-cyan-500/30 rounded-full -translate-x-1/2 z-10 hidden md:flex items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.2)]">
                  <div className="w-3 h-3 bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] rounded-full" />
                </div>

                {/* Spacer for Desktop */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
