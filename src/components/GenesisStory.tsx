import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { GenesisChapter } from '../types';
import { AeraLogo } from './AeraLogo';
import { AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';

export const GenesisStory: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const diagramY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const chapters: GenesisChapter[] = [
    {
      index: '01',
      number: '01',
      kicker: 'WHAT KENNETH BREWER NOTICED',
      title: 'An emergency creates a second crisis: fragmented information.',
      lead: 'Calls, texts, locations, needs, and updates scatter across channels. The result is delay, duplication, and dangerous uncertainty.',
      label: 'WHAT KENNETH BREWER NOTICED',
      beat: {
        tag: 'The Gap',
        text: 'Alerts say something happened. People still need to know what to do next.',
      },
    },
    {
      index: '02',
      number: '02',
      kicker: 'THE FOUNDING VISION',
      title: 'Kenneth Brewer defined the missing link.',
      lead: 'He saw the gap between awareness and coordinated action: no shared picture of safety, needs, and next steps.',
      label: 'THE FOUNDING VISION',
      question: 'How can people stay prepared, connected, and coordinated when communication fails?',
      principles: ['Shared Picture', 'Clear Status', 'Coordinated Action'],
    },
    {
      index: '03',
      number: '03',
      kicker: 'FROM VISION TO PLATFORM',
      title: 'Antoinette Williams turned the vision into a system.',
      lead: 'Antoinette defined the requirements, architecture, workflows, user experience, and working software. She also co-created AERA’s name and visual identity.',
      label: 'FROM VISION TO PLATFORM',
      founderLine: 'Kenneth Brewer founded the vision. Antoinette Williams led the architecture that helped bring it to life.',
    },
    {
      index: '04',
      number: '04',
      kicker: 'THE ANSWER',
      title: 'The answer became AERA.',
      lead: 'AERA unites readiness, status reporting, community coordination, resources, and recovery in one connected experience.',
      label: 'THE ANSWER',
      founderLine: 'Clarity before disruption. Coordinated action through recovery.',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-[#F3F8F5] border-y border-[rgba(48,88,84,0.14)]" id="genesis">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow">Kenneth Brewer’s Founding Vision</span>
            <h2 className="text-3xl sm:text-5xl font-black text-black mt-3">
              He saw the problem after the alert.
            </h2>
            <p className="lead text-neutral-800 mt-3 max-w-2xl">
              Critical information could exist everywhere and still leave families, leaders, and responders without one dependable picture.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-full border border-[rgba(48,88,84,0.18)] shadow-sm w-fit">
            <span className="text-xs font-mono font-bold text-neutral-500">
              <strong className="text-[#305854] text-base">0{activeChapter + 1}</strong> / 04
            </span>
            <span className="text-xs font-bold text-[#305854] tracking-wider uppercase">
              {chapters[activeChapter].kicker}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.number}
              type="button"
              onClick={() => setActiveChapter(index)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                activeChapter === index
                  ? 'bg-[#305854] text-white border-[#305854] shadow-md'
                  : 'bg-white text-black border-neutral-200 hover:border-[#467857]'
              }`}
            >
              <span className={`text-xs font-mono font-black ${activeChapter === index ? 'text-[#8CBB5D]' : 'text-[#305854]'}`}>
                {chapter.number}
              </span>
              <strong className="block text-sm font-bold mt-1 leading-snug">{chapter.kicker}</strong>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[28px] border border-[rgba(48,88,84,0.18)] p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-[#305854] text-white flex items-center justify-center font-mono font-bold text-sm">
                {chapters[activeChapter].number}
              </span>
              <span className="kicker">{chapters[activeChapter].kicker}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-black leading-tight">
              {chapters[activeChapter].title}
            </h3>

            <p className="lead text-base sm:text-lg text-neutral-800">
              {chapters[activeChapter].lead}
            </p>

            {chapters[activeChapter].beat && (
              <div className="p-4 rounded-xl bg-[#F3F8F5] border border-[rgba(48,88,84,0.18)] flex items-start gap-3 mt-2">
                <AlertCircle className="text-[#305854] shrink-0 mt-0.5" size={20} />
                <div className="text-sm">
                  <strong className="text-[#305854] font-bold block">{chapters[activeChapter].beat?.tag}</strong>
                  <span className="text-black">{chapters[activeChapter].beat?.text}</span>
                </div>
              </div>
            )}

            {chapters[activeChapter].question && (
              <div className="p-5 rounded-2xl bg-[#305854] text-white border-l-4 border-[#8CBB5D] shadow-sm mt-2">
                <p className="text-lg font-bold italic leading-snug">
                  “{chapters[activeChapter].question}”
                </p>
                {chapters[activeChapter].principles && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {chapters[activeChapter].principles?.map((principle) => (
                      <span key={principle} className="px-3 py-1 rounded-full bg-white text-[#305854] text-xs font-bold">
                        ✓ {principle}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {chapters[activeChapter].founderLine && (
              <p className="text-sm sm:text-base font-bold text-[#305854] p-4 rounded-xl bg-[#F3F8F5] border-l-4 border-[#305854] mt-2">
                {chapters[activeChapter].founderLine}
              </p>
            )}

            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => setActiveChapter((previous) => (previous > 0 ? previous - 1 : chapters.length - 1))}
                className="round-btn"
                aria-label="Previous chapter"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => setActiveChapter((previous) => (previous < chapters.length - 1 ? previous + 1 : 0))}
                className="round-btn"
                aria-label="Next chapter"
              >
                <ChevronRight size={20} />
              </button>
              <span className="text-xs text-neutral-600 font-semibold ml-2">
                Chapter {activeChapter + 1} of {chapters.length}
              </span>
            </div>
          </div>

          <motion.div style={{ y: diagramY }} className="lg:col-span-6 bg-[#F3F8F5] rounded-2xl p-6 border border-[rgba(48,88,84,0.18)] min-h-[320px] flex items-center justify-center">
            {activeChapter === 0 && (
              <div className="w-full flex flex-col gap-3 text-sm">
                <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
                  <span className="font-bold text-black">Scattered Calls &amp; Texts</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-extrabold rounded">No Sync</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
                  <span className="font-bold text-black">Unknown Locations</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-extrabold rounded">Unclear</span>
                </div>
                <div className="p-3 bg-[#305854] text-white rounded-xl shadow-md text-center font-bold">
                  Fragmented Information Gap
                </div>
              </div>
            )}

            {activeChapter === 1 && (
              <div className="w-full text-center flex flex-col items-center gap-4">
                <AeraLogo size={64} bgWhite />
                <strong className="text-xl font-black text-[#305854]">Kenneth Brewer’s Original Vision</strong>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold w-full">
                  <div className="p-3 bg-white rounded-xl border">Continuity</div>
                  <div className="p-3 bg-white rounded-xl border">Preparedness</div>
                  <div className="p-3 bg-white rounded-xl border">Coordination</div>
                  <div className="p-3 bg-white rounded-xl border">Clarity</div>
                </div>
              </div>
            )}

            {activeChapter === 2 && (
              <div className="w-full grid grid-cols-3 gap-2 text-center text-xs font-bold">
                <div className="p-3 bg-white rounded-xl border">Human Needs</div>
                <div className="p-3 bg-white rounded-xl border">Requirements</div>
                <div className="p-3 bg-white rounded-xl border">Info Flow</div>
                <div className="col-span-3 p-4 bg-[#305854] text-white rounded-xl font-black text-sm my-1">
                  AERA Architecture · Built by Antoinette Williams
                </div>
                <div className="p-3 bg-white rounded-xl border">UI &amp; UX</div>
                <div className="p-3 bg-white rounded-xl border">Working App</div>
                <div className="p-3 bg-white rounded-xl border">Governance</div>
              </div>
            )}

            {activeChapter === 3 && (
              <div className="w-full flex flex-col items-center gap-3">
                <div className="px-5 py-2.5 rounded-full bg-[#305854] text-white font-black text-lg tracking-widest shadow-md">
                  AERA
                </div>
                <p className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  One Connected Operating System
                </p>
                <div className="grid grid-cols-2 gap-2 w-full text-xs font-bold text-black text-center">
                  <div className="p-2.5 bg-white rounded-xl border border-neutral-200">1. Prepare</div>
                  <div className="p-2.5 bg-white rounded-xl border border-neutral-200">2. Report</div>
                  <div className="p-2.5 bg-white rounded-xl border border-neutral-200">3. Coordinate</div>
                  <div className="p-2.5 bg-white rounded-xl border border-neutral-200">4. Recover</div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
