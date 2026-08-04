import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Gift,
  HeartHandshake,
  PackageCheck,
  Recycle,
  Route,
  ShieldCheck,
  Users,
} from 'lucide-react';

const discoveries = [
  'Coordination breaks down when support organizations operate without one shared view.',
  'Impacted families are too often treated as recipients instead of participants in recovery.',
  'Relief workers, volunteers, and first responders need stronger connection and accountability.',
  'Preparedness must begin before an event, not after systems are already overwhelmed.',
  'Post-event recovery requires rapid workflows and a dependable emergency supply chain.',
];

const initiatives = [
  {
    eyebrow: 'Family Recovery',
    title: 'G.I.F.T.',
    subtitle: 'Giving Inspires Families Today',
    metric: '20,000+',
    metricLabel: 'impacted children supported',
    icon: Gift,
    description:
      'A family-centered relief initiative created to bring toys, stability, hope, and practical support to children and households affected by disaster.',
    outcomes: ['Food assistance', 'Housing stability', 'Health and medical support', 'Early education', 'Hope and inspiration'],
  },
  {
    eyebrow: 'Community Presence',
    title: 'Three Kings Day Puerto Rico',
    subtitle: 'Relief rooted in culture, dignity, and direct connection',
    metric: 'Field',
    metricLabel: 'community engagement',
    icon: HeartHandshake,
    description:
      'Direct neighborhood engagement in Puerto Rico connected recovery work with cultural celebration, household visits, listening, and relationship-building.',
    outcomes: ['Household visits', 'Community listening', 'Cultural inclusion', 'Direct support', 'Local trust'],
  },
  {
    eyebrow: 'Recovery Infrastructure',
    title: 'Pallets of Pride',
    subtitle: 'Turning damaged logistics assets into community value',
    metric: 'Reuse',
    metricLabel: 'before disposal',
    icon: Recycle,
    description:
      'A recovery concept focused on removing damaged pallets from disaster supply flows and creating safer, more useful second-life pathways for communities.',
    outcomes: ['Rebuild pallets', 'Repurpose materials', 'Recycle into mulch', 'Support safer storage', 'Create local jobs'],
  },
];

export const MissionLegacy: React.FC = () => {
  return (
    <section id="legacy" className="relative overflow-hidden bg-[#0F2F2C] py-20 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#8CBB5D]/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#8CBB5D]/40 bg-[#8CBB5D]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#B9E58B]">
              <ShieldCheck size={15} />
              Mission &amp; Field Legacy
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">
              Kenneth Brewer’s vision was shaped in the field—not in a boardroom.
            </h2>

            <p className="mt-5 text-base font-medium leading-relaxed text-white/80 sm:text-lg">
              In 2005, while working during the Hurricane Katrina response, Kenneth witnessed both the human devastation and the limits of fragmented corporate relief efforts. That experience became a personal commitment to build something more coordinated, measurable, and centered on families.
            </p>

            <div className="mt-7 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#B9E58B]">The Long View</span>
              <div className="mt-5 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#8CBB5D] font-black text-[#173D38]">05</div>
                  <div>
                    <strong className="block text-lg">Hurricane Katrina changed the mission.</strong>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">Kenneth saw how weak structure, coordination, and shared situational awareness prolonged suffering.</p>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 font-black text-[#B9E58B]">24</div>
                  <div>
                    <strong className="block text-lg">Years of study became a response model.</strong>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">From emergency protocols and FEMA procedures to family-focused recovery and supply-chain continuity, the research kept returning to the same missing link: coordinated action.</p>
                  </div>
                </div>
              </div>
            </div>

            <blockquote className="mt-7 border-l-4 border-[#8CBB5D] pl-5 text-xl font-black italic leading-relaxed text-white">
              “I made a personal commitment to do something meaningful about it.”
            </blockquote>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-white/50">Kenneth M. Brewer · Founder, President &amp; CEO</p>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[32px] bg-white p-6 text-[#132321] shadow-2xl sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#467857]">What the research revealed</span>
                  <h3 className="mt-2 text-2xl font-black sm:text-3xl">The system gaps AERA was built to address</h3>
                </div>
                <Route className="text-[#305854]" size={34} />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {discoveries.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="flex items-start gap-3 rounded-2xl border border-[#305854]/10 bg-[#F3F8F5] p-4"
                  >
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[#305854]" size={20} />
                    <span className="text-sm font-semibold leading-relaxed text-neutral-800">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-[#305854] p-5 text-white">
                <div className="flex items-center gap-3">
                  <Users className="text-[#8CBB5D]" size={24} />
                  <div>
                    <span className="block text-xs font-black uppercase tracking-[0.16em] text-[#B9E58B]">Core Principle</span>
                    <strong className="mt-1 block text-lg">Recovery should be done with communities—not merely delivered to them.</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#B9E58B]">Mission in Practice</span>
              <h3 className="mt-2 text-3xl font-black sm:text-4xl">Before AERA was software, the mission was already moving.</h3>
            </div>
            <p className="max-w-xl text-sm font-medium leading-relaxed text-white/65 sm:text-base">
              These initiatives demonstrate the same values now carried into AERA: family dignity, practical coordination, local resilience, and follow-through after the immediate emergency ends.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {initiatives.map((initiative) => {
              const Icon = initiative.icon;
              return (
                <article key={initiative.title} className="group flex h-full flex-col rounded-[30px] border border-white/10 bg-white p-6 text-[#132321] shadow-xl transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF4E7] text-[#305854] transition-transform duration-300 group-hover:scale-105">
                      <Icon size={28} />
                    </div>
                    <div className="text-right">
                      <strong className="block text-2xl font-black text-[#305854]">{initiative.metric}</strong>
                      <span className="block max-w-28 text-[10px] font-bold uppercase tracking-wider text-neutral-500">{initiative.metricLabel}</span>
                    </div>
                  </div>

                  <span className="mt-6 text-[11px] font-black uppercase tracking-[0.16em] text-[#467857]">{initiative.eyebrow}</span>
                  <h4 className="mt-2 text-2xl font-black">{initiative.title}</h4>
                  <p className="mt-1 text-sm font-bold text-[#305854]">{initiative.subtitle}</p>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-neutral-700">{initiative.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {initiative.outcomes.map((outcome) => (
                      <span key={outcome} className="rounded-full border border-[#305854]/10 bg-[#F3F8F5] px-3 py-1 text-xs font-bold text-[#305854]">
                        {outcome}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[32px] border border-[#8CBB5D]/30 bg-[#8CBB5D] text-[#173D38] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="p-7 sm:p-9 lg:col-span-8">
              <span className="text-xs font-black uppercase tracking-[0.18em]">The bridge to AERA</span>
              <h3 className="mt-3 text-2xl font-black leading-tight sm:text-4xl">
                Field experience revealed the problem. Years of study clarified the model. AERA became the operating system for the mission.
              </h3>
              <p className="mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-[#173D38]/80 sm:text-base">
                The platform carries forward Kenneth Brewer’s central belief: communities need more than alerts. They need a shared picture of who is safe, what is needed, who is responsible, and what happens next.
              </p>
            </div>

            <div className="flex items-center justify-center bg-[#234F49] p-7 text-white lg:col-span-4">
              <div className="grid grid-cols-2 gap-3 text-center">
                {[
                  { icon: PackageCheck, label: 'Resources' },
                  { icon: Users, label: 'People' },
                  { icon: Boxes, label: 'Logistics' },
                  { icon: ArrowRight, label: 'Next Steps' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <Icon className="mx-auto text-[#B9E58B]" size={22} />
                      <strong className="mt-2 block text-xs uppercase tracking-wider">{item.label}</strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
