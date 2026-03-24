import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CareerForm } from './components/CareerForm';
import { CareerCard } from './components/CareerCard';
import { Roadmap } from './components/Roadmap';
import { ChatMentor } from './components/ChatMentor';
import { TechNews } from './components/TechNews';
import { getCareerSuggestions, getRoadmap } from './services/aiService';
import { CareerSuggestion, Roadmap as RoadmapType } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowDown } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRoadmapLoading, setIsRoadmapLoading] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<CareerSuggestion[]>([]);
  const [roadmap, setRoadmap] = React.useState<RoadmapType | null>(null);
  const [selectedCareer, setSelectedCareer] = React.useState<string | null>(null);
  const [userProfile, setUserProfile] = React.useState<{ skills: string; interests: string; education: string } | null>(null);

  const handleExplore = async (data: { skills: string; interests: string; education: string }) => {
    setIsLoading(true);
    setUserProfile(data);
    setRoadmap(null);
    setSelectedCareer(null);
    
    try {
      const results = await getCareerSuggestions(data.skills, data.interests, data.education);
      setSuggestions(results);
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewRoadmap = async (career: string) => {
    if (!userProfile) return;
    setIsRoadmapLoading(true);
    setSelectedCareer(career);
    
    try {
      const result = await getRoadmap(career, userProfile.skills);
      setRoadmap(result);
      // Scroll to roadmap
      setTimeout(() => {
        document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error fetching roadmap:', error);
    } finally {
      setIsRoadmapLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0510] text-white selection:bg-cyan-500/30 selection:text-white">
      <Header />
      
      <main>
        <Hero />
        
        <CareerForm onSubmit={handleExplore} isLoading={isLoading} />

        <AnimatePresence>
          {suggestions.length > 0 && (
            <section id="results" className="py-24 px-4 bg-white/[0.02]">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] border border-cyan-500/20 mb-6"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Recommendations
                  </motion.div>
                  <h2 className="text-5xl font-bold text-white mb-6">Your Potential Paths</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Based on your unique profile, we've identified these high-impact career paths.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {suggestions.map((career, i) => (
                    <CareerCard 
                      key={i} 
                      career={career} 
                      onViewRoadmap={handleViewRoadmap}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {suggestions.length > 0 && !roadmap && !isRoadmapLoading && (
            <div id="roadmap" className="py-12 text-center text-gray-500 text-sm italic tracking-wide">
              Select a career above to generate your personalized roadmap
            </div>
          )}
          
          {isRoadmapLoading && (
            <div id="roadmap" className="py-32 flex flex-col items-center justify-center gap-6">
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(0,210,255,0.2)]" />
              <p className="text-cyan-400 font-bold text-lg animate-pulse tracking-widest uppercase">Synthesizing Roadmap...</p>
            </div>
          )}
          
          {roadmap && selectedCareer && !isRoadmapLoading && (
            <Roadmap roadmap={roadmap} career={selectedCareer} />
          )}
        </AnimatePresence>

        <TechNews />
      </main>

      <footer className="bg-black/40 backdrop-blur-xl border-t border-white/5 py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00d2ff] to-[#9d50bb] rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold tracking-tight">Pathfinder AI</span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed text-lg">
              Empowering the next generation of professionals with AI-driven career navigation 
              and mentorship. Your future is written in code.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-500">Platform</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#explore" className="hover:text-white transition-colors">Explore Careers</a></li>
              <li><a href="#roadmap" className="hover:text-white transition-colors">Roadmaps</a></li>
              <li><a href="#mentor" className="hover:text-white transition-colors">AI Mentor</a></li>
              <li><a href="#news" className="hover:text-white transition-colors">Tech News</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-500">Connect</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
          © 2026 Pathfinder AI. Built with intelligence and care.
        </div>
      </footer>

      <ChatMentor />
    </div>
  );
}
