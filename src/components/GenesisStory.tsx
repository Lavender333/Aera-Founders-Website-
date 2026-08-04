import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AeraLogo } from './AeraLogo';
import { AlertCircle, ChevronLeft, ChevronRight, Compass, Cpu, CheckCircle2 } from 'lucide-react';

interface StoryChapter {
  number: string;
  kicker: string;
  title: string;
  lead: string;
  emphasis: string;
  points: string[];
  mode: 'problem' | 'vision' | 'build' | 'answer';
}

export const GenesisStory: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const diagramY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const chapters: StoryChapter[] = [
    {
      number: '01',
      kicker: 'WHAT KENNETH BREWER NOTICED',
      title: 'An emergency creates a second crisis: fragmented information.',
      lead: 'Kenneth Brewer saw that calls, texts, locations, needs, and updates could exist everywhere while families, leaders, and responders still lacked one dependable picture.',
      emphasis: 'Alerts say something happened. People still need to know what to do next.',
      points: ['Scattered safety updates', 'Unknown locations and needs', 'Delayed and duplicated response'],
      mode: 'problem',
    },
    {
      number: '02',
      kicker: 'THE FOUNDING VISION',
      title: 'Kenneth defined the missing link between awareness and action.',
      lead: 'He envisioned one connected response model that could align people, needs, resources, organizations, and next steps before, during, and after disruption.',
      emphasis: 'How can people stay prepared, connected, and coordinated when communication fails?',
      points: ['Shared operating picture', 'Clear status and accountability', 'Coordinated action through recovery'],
      mode: 'vision',
    },
    {
      number: '03',
      kicker: 'FROM VISION TO PLATFORM',
      title: 'Antoinette Williams helped turn the vision into a working system.',
      lead: 'As co-founder and chief product and systems architect, Antoinette defined the product requirements, architecture, workflows, user experience, and software that brought Kenneth’s response model to life.',
      emphasis: 'Kenneth Brewer founded the vision. Antoinette Williams led the architecture that helped make it real.',
      points: ['Product and systems architecture', 'Core workflows and user experience', 'Working platform and ongoing engineering'],
      mode: 'build',
    },
    {
      number: '04',
      kicker: 'THE ANSWER BECAME AERA',
      title: 'One platform for readiness, response, coordination, and recovery.',
      lead: 'AERA carries Kenneth Brewer’s founding vision into a mobile-first platform designed to give households, community hubs, and institutions a clearer path from disruption to coordinated action.',
      emphasis: 'Clarity before disruption. Coordinated action through recovery.',
      points: ['Prepare', 'Report', 'Coordinate', 'Recover'],
      mode: 'answer',
    },
  ];

  const current = chapters[activeChapter];

  return (
    <section ref={sectionRef} className="py-20 bg-[#F3F8F5] border-y border-[rgba(48,88,84,0.14)]" id="genesis">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow">Kenneth Brewer’s Founding Vision</span>
            <h2 className="text-3xl sm:text-5xl font-black text-black mt-3 max-w-3xl">
              He saw the problem after the alert.
            </h2>
            <p className="lead text-neutral-800 mt-3 max-w-2xl">
              Kenneth Brewer recognized that information alone is not coordination. AERA began with his vision for one dependable path from awareness to action.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-full border border-[rgba(48,88,84,0.18)] shadow-sm w-fit">
            <span className="text-xs font-mono font-bold text-neutral-500">
              <strong className="text-[#305854] text-base">0{activeChapter + 1}</strong> / 04
            </span>
            <span className="text-xs font-bold text-[#305854] tracking-wider uppercase">
              {current.kicker}
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
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#305854] text-white flex items-center justify-center font-mono font-bold text-sm">
                {current.number}
              </span>
              <span className="kicker">{current.kicker}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-black leading-tight">
              {current.title}
            </h3>

            <p className="lead text-base sm:text-lg text-neutral-800">
              {current.lead}
            </p>

            <div className="p-5 rounded-2xl bg-[#305854] text-white border-l-4 border-[#8CBB5D] shadow-sm">
              <p className="text-base sm:text-lg font-bold italic leading-snug">
                “{current.emphasis}”
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {current.points.map((point) => (
                <div key={point} className="flex items-start gap-2 p-3 rounded-xl bg-[#F3F8F5] border border-[rgba(48,88,84,0.15)] text-sm font-bold text-neutral-900">
                  <CheckCircle2 className="text-[#305854] shrink-0 mt-0.5" size={18} />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
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

          <motion.div style={{ y: diagramY }} className="lg:col-span-5 bg-[#F3F8F5] rounded-3xl p-6 border border-[rgba(48,88,84,0.18)] min-h-[360px] flex items-center justify-center">
            {current.mode === 'problem' && (
              <div className="w-full flex flex-col gap-3">
                {['Scattered calls and texts', 'Unknown household status', 'Disconnected organizations'].map((label) => (
                  <div key={label} className="p-4 bg-white rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
                    <span className="font-bold text-black">{label}</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-extrabold rounded">No shared view</span>
                  </div>
                ))}
                <div className="p-4 bg-[#305854] text-white rounded-xl shadow-md text-center font-black">
                  The Fragmented Information Gap
                </div>
              </div>
            )}

            {current.mode === 'vision' && (
              <div className="w-full text-center flex flex-col items-center gap-5">
                <Compass size={58} className="text-[#305854]" />
                <strong className="text-2xl font-black text-[#305854]">Kenneth Brewer’s Response Model</strong>
                <div className="grid grid-cols-2 gap-3 text-sm font-bold w-full">
                  {['Continuity', 'Preparedness', 'Coordination', 'Clarity'].map((item) => (
                    <div key={item} className="p-4 bg-white rounded-xl border">{item}</div>
                  ))}
                </div>
              </div>
            )}

            {current.mode === 'build' && (
              <div className="w-full flex flex-col items-center gap-4 text-center">
                <Cpu size={58} className="text-[#305854]" />
                <strong className="text-2xl font-black text-[#305854]">Vision translated into architecture</strong>
                <div className="w-full grid grid-cols-2 gap-3 text-sm font-bold">
                  {['Requirements', 'Workflows', 'User Experience', 'Working Software'].map((item) => (
                    <div key={item} className="p-4 bg-white rounded-xl border">{item}</div>
                  ))}
                </div>
                <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Led by Antoinette Williams</span>
              </div>
            )}

            {current.mode === 'answer' && (
              <div className="w-full flex flex-col items-center gap-4 text-center">
                <AeraLogo size={74} bgWhite />
                <strong className="text-2xl font-black text-[#305854]">AERA</strong>
                <p className="text-xs font-bold text-neutral-700 uppercase tracking-wider">The founding vision in action</p>
                <div className="grid grid-cols-2 gap-3 w-full text-sm font-bold text-black">
                  {current.points.map((item, index) => (
                    <div key={item} className="p-4 bg-white rounded-xl border border-neutral-200">{index + 1}. {item}</div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
