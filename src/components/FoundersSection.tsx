import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CheckCircle, ArrowRight, Cpu, Compass, Users } from 'lucide-react';

export const FoundersSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section ref={sectionRef} className="py-20 bg-white" id="founders">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow">Founder Leadership</span>
            <h2 className="text-3xl sm:text-5xl font-black text-black mt-3 max-w-3xl">
              One founding vision. A platform built to make it real.
            </h2>
          </div>
          <p className="lead text-neutral-800 max-w-xl">
            Kenneth Brewer originated AERA’s founding insight and response model. Antoinette Williams transformed that vision into product architecture and working technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <article className="lg:col-span-8 relative overflow-hidden rounded-[36px] bg-[#305854] text-white p-7 sm:p-10 lg:p-12 shadow-2xl">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#8CBB5D]/20 blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <motion.div style={{ y: portraitY }} className="md:col-span-4 flex flex-col items-center md:items-start">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-[32px] bg-white text-[#305854] flex items-center justify-center font-black text-6xl sm:text-7xl shadow-xl border-4 border-white/30">
                  KB
                </div>
                <span className="text-xs font-bold text-[#8CBB5D] tracking-[0.2em] uppercase mt-5">
                  Founder &amp; Visionary
                </span>
              </motion.div>

              <div className="md:col-span-8 flex flex-col gap-5">
                <span className="text-xs text-[#8CBB5D] font-bold tracking-[0.18em] uppercase">
                  Kenneth Brewer · Founder and Chief Executive
                </span>
                <h3 className="text-3xl sm:text-5xl font-black leading-tight">
                  The driving vision behind AERA.
                </h3>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed font-medium">
                  Kenneth Brewer recognized that emergency systems often alert people to danger without giving families, organizations, and leaders one dependable path toward coordinated action.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                    <Compass className="text-[#8CBB5D] mb-3" size={24} />
                    <strong className="block text-sm">Originated the Vision</strong>
                    <span className="text-xs text-white/75 block mt-1">Defined the missing link between alerts and action.</span>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                    <Users className="text-[#8CBB5D] mb-3" size={24} />
                    <strong className="block text-sm">Leads the Mission</strong>
                    <span className="text-xs text-white/75 block mt-1">Guides partnerships, strategy, and institutional growth.</span>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                    <ArrowRight className="text-[#8CBB5D] mb-3" size={24} />
                    <strong className="block text-sm">Shapes the Future</strong>
                    <span className="text-xs text-white/75 block mt-1">Advances a connected model for readiness and recovery.</span>
                  </div>
                </div>

                <blockquote className="p-5 rounded-2xl bg-white text-[#305854] border-l-4 border-[#8CBB5D] text-base sm:text-lg font-black italic leading-relaxed shadow-lg">
                  “How can people stay prepared, connected, and coordinated when communication fails?”
                </blockquote>
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4 rounded-[32px] bg-[#F3F8F5] border border-[rgba(48,88,84,0.18)] p-7 sm:p-9 shadow-xl flex flex-col justify-between gap-8">
            <div>
              <div className="w-24 h-24 rounded-3xl bg-[#467857] text-white flex items-center justify-center font-black text-4xl shadow-lg mb-6">
                AW
              </div>
              <span className="text-xs text-[#305854] font-bold tracking-[0.16em] uppercase">
                Antoinette Williams
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-black mt-2">
                Co-Founder and Chief Product &amp; Systems Architect
              </h3>
              <p className="text-neutral-800 font-medium leading-relaxed mt-4">
                Antoinette helped bring Kenneth Brewer’s founding vision to life by defining the product requirements, architecture, workflows, user experience, and working software behind AERA.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                'Led platform architecture and full-stack product development.',
                'Designed core user roles, workflows, and system experiences.',
                'Co-created AERA’s name and visual identity.',
                'Leads ongoing technology and platform engineering.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-neutral-900 font-semibold">
                  <CheckCircle className="text-[#305854] shrink-0 mt-0.5" size={19} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[rgba(48,88,84,0.18)]">
              <div className="flex items-center gap-2 text-[#305854] mb-2">
                <Cpu size={19} />
                <strong className="text-xs uppercase tracking-wider">Platform Leadership</strong>
              </div>
              <p className="text-sm text-neutral-800 font-semibold leading-relaxed">
                Technical clarity, resilient systems, and execution under real-world emergency conditions.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-8 p-6 sm:p-8 rounded-[28px] border border-[rgba(48,88,84,0.18)] bg-[#FAFBFA] text-center">
          <span className="eyebrow">The AERA Team</span>
          <p className="text-xl sm:text-2xl font-black text-[#305854] mt-3">
            Kenneth Brewer founded the vision. Antoinette Williams led the architecture that helped bring it to life.
          </p>
        </div>
      </div>
    </section>
  );
};
