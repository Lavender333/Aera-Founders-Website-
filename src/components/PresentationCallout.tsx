import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock3, MonitorPlay, ShieldCheck } from 'lucide-react';

interface PresentationCalloutProps {
  onOpenPresentation: () => void;
}

export const PresentationCallout: React.FC<PresentationCalloutProps> = ({ onOpenPresentation }) => {
  return (
    <section id="presentation" className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[34px] bg-[#173D38] px-6 py-8 text-white shadow-2xl sm:px-9 sm:py-10 lg:px-12 lg:py-12"
        >
          <div className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full bg-[#8CBB5D]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#8CBB5D]/35 bg-[#8CBB5D]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#B9E58B]">
                  <MonitorPlay size={15} /> Executive Presentation
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-white/65">
                  <Clock3 size={15} /> 12-minute guided walkthrough
                </span>
              </div>

              <h2 className="mt-5 max-w-4xl font-serif text-3xl font-bold leading-tight sm:text-5xl">
                See Kenneth Brewer’s founding vision, field legacy, and AERA operating model as one connected story.
              </h2>

              <p className="mt-5 max-w-3xl text-sm font-medium leading-relaxed text-white/72 sm:text-lg">
                The presentation follows a clear executive sequence: the problem, the field experience, the response model, the platform, the leadership, and the next conversation.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-white/75">
                {['Founding vision', 'Mission proof', 'Platform model', 'Leadership', 'Partnership path'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                    <ShieldCheck size={14} className="text-[#B9E58B]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <button
                type="button"
                onClick={onOpenPresentation}
                className="group flex min-h-[58px] w-full items-center justify-center gap-3 rounded-2xl bg-[#8CBB5D] px-6 py-4 text-sm font-black text-[#173D38] shadow-xl transition-all hover:-translate-y-1 hover:bg-[#9DCC70] lg:max-w-xs"
              >
                Start Presentation
                <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
