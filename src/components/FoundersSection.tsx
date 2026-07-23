import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { FounderSlide } from '../types';
import { ChevronLeft, ChevronRight, CheckCircle, Pause, Play } from 'lucide-react';

export const FoundersSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const founders: FounderSlide[] = [
    {
      id: 'ken',
      name: 'Ken',
      role: 'Co-Founder · Originator of the AERA Vision',
      monogram: 'K',
      portraitClass: 'bg-[#305854]',
      intro: 'Ken focused on the confusion that follows an emergency when critical answers are scattered across disjointed channels.',
      bullets: [
        'He saw the gap: safety checks, locations, needs, and resources were scattered.',
        'He changed the question: the goal was not another alert, but a shared picture for action.',
        'He defined the vision: one system for readiness, status, resources, response, and recovery.',
      ],
      quote: 'How can people stay prepared, connected, and coordinated when communication fails?',
    },
    {
      id: 'antoinette',
      name: 'Antoinette Williams',
      role: 'Co-Founder · Platform Architect and Lead Developer',
      monogram: 'A',
      portraitClass: 'bg-[#467857]',
      bullets: [
        'Defined product requirements, user experience, and core workflows.',
        'Built the full-stack architecture, offline capabilities, and working software.',
        'Co-created the name and visual identity for AERA.',
        'Leads technology, platform growth, and ongoing system engineering.',
      ],
      quote: 'Building for emergency readiness means designing for clarity under stress and performance through outages.',
    },
    {
      id: 'mission',
      name: 'Ken + Antoinette',
      role: 'Shared Mission',
      monogram: 'K + A',
      portraitClass: 'bg-[#8CBB5D] text-black',
      bullets: [
        'Original Vision: Rooted in human safety and community resilience.',
        'Product & Brand Execution: Engineering precision with refined civic design.',
        'Continued Platform Growth: Expanding institutional capabilities and trust.',
      ],
      quote: 'One vision. One working platform. Built to serve communities when it matters most.',
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % founders.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + founders.length) % founders.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeSlide]);

  const current = founders[activeSlide];

  return (
    <section ref={sectionRef} className="py-20 bg-white" id="founders">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow">The Founders</span>
            <h2 className="text-3xl sm:text-5xl font-black text-black mt-3">
              Distinct roles. Shared mission.
            </h2>
          </div>
          <p className="lead text-neutral-800 max-w-xl">
            Ken defined the need and vision. Antoinette built the product, architecture, and brand identity.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative bg-[#FAFBFA] rounded-[32px] border border-[rgba(48,88,84,0.18)] p-6 sm:p-10 shadow-xl overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[440px]">
            {/* Left Monogram / Portrait Badge */}
            <motion.div style={{ y: portraitY }} className="lg:col-span-4 flex flex-col items-center justify-center">
              <div
                className={`w-40 h-40 sm:w-56 sm:h-56 rounded-3xl flex items-center justify-center text-white font-black text-5xl sm:text-7xl shadow-lg transition-all duration-500 ${current.portraitClass}`}
              >
                {current.monogram}
              </div>
              <span className="text-xs font-bold text-[#305854] tracking-widest uppercase mt-4">
                {current.name}
              </span>
            </motion.div>

            {/* Right Copy Content */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <span className="kicker text-xs text-[#305854] font-bold tracking-widest uppercase">
                {current.role}
              </span>

              <h3 className="text-2xl sm:text-4xl font-black text-black">
                {current.name}
              </h3>

              {current.intro && (
                <p className="lead text-base sm:text-lg text-neutral-800">
                  {current.intro}
                </p>
              )}

              {/* Bullet Points */}
              <div className="flex flex-col gap-3 my-2">
                {current.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm sm:text-base text-neutral-900 font-semibold">
                    <CheckCircle className="text-[#305854] shrink-0 mt-0.5" size={20} />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Founder Quote */}
              {current.quote && (
                <blockquote className="p-4 rounded-xl bg-[#F3F8F5] border-l-4 border-[#305854] text-sm sm:text-base font-bold text-[#305854] italic">
                  "{current.quote}"
                </blockquote>
              )}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[rgba(48,88,84,0.18)]">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {founders.map((f, idx) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeSlide === idx ? 'bg-[#305854] w-8' : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="ml-3 text-neutral-500 hover:text-black p-1 text-xs font-mono font-bold flex items-center gap-1"
                title={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
              >
                {isPaused ? <Play size={14} /> : <Pause size={14} />}
                <span>{isPaused ? 'PLAY' : 'PAUSE'}</span>
              </button>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prevSlide}
                className="round-btn"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="round-btn"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
