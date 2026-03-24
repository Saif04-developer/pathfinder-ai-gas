import React from 'react';
import { motion } from 'motion/react';
import { Search, BookOpen, Heart, GraduationCap } from 'lucide-react';

interface CareerFormProps {
  onSubmit: (data: { skills: string; interests: string; education: string }) => void;
  isLoading: boolean;
}

export const CareerForm: React.FC<CareerFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState({
    skills: '',
    interests: '',
    education: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section id="explore" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 p-8 md:p-16 shadow-2xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Start Your Journey</h2>
            <p className="text-gray-400">Tell us about yourself and let AI find your perfect path.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-300 uppercase tracking-widest">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Skills
              </label>
              <textarea
                required
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="Python, UI Design, Content Writing..."
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none min-h-[120px] resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-300 uppercase tracking-widest">
                <Heart className="w-4 h-4 text-rose-400" />
                Interests
              </label>
              <textarea
                required
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                placeholder="Artificial Intelligence, Space, Gaming..."
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none min-h-[120px] resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-300 uppercase tracking-widest">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                Education
              </label>
              <input
                required
                type="text"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                placeholder="B.Tech in CS, Self-taught, etc."
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] text-white rounded-2xl font-bold text-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-cyan-500/20"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-6 h-6" />
                  Explore Careers
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
