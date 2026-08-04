import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Boxes, Building2, MonitorPlay, Network } from 'lucide-react';
import { podModelImage } from '../assets/podModelImage';

interface PodModelSectionProps {
  onOpenPresentation: () => void;
}

const modelPoints = [
  {
    icon: Network,
    title: 'AERA',
    text: 'Tracks household data, food demand, inventory, vulnerability, and POD activity.',
  },
  {
    icon: Boxes,
    title: 'Warehouse',
    text: 'Serves as the central logistics hub for inventory and replenishment.',
  },
  {
    icon: Building2,
    title: 'Church Network',
    text: 'Connects main-hub oversight with local campuses operating as POD sites.',
  },
];

export const PodModelSection: React.FC<PodModelSectionProps> = ({ onOpenPresentation }) => {
  return (
    <section id="pod-model" className="relative overflow-hidden bg-[#F4F2EC] py-20 text-[#16233B]">
      <div className="pointer-events-none absolute -right-28 top-12 h-80 w-80 rounded-full bg-[#8CBB5D]/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-[#305854]/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#305854]/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#305854] shadow-sm">
                <Network size={16} />
                AERA Operating Model
              </span>
              <h2 className="mt-5 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">
                One connected model from household need to coordinated fulfillment.
              </h2>
              <p className="mt-5 max-w-3xl text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
                The AERA POD Model shows how the platform links household information, central logistics, church-hub oversight, and local distribution sites through one shared operating picture.
              </p>
            </div>

            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <button
                type="button"
                onClick={onOpenPresentation}
                className="group inline-flex min-h-[48px] items-center justify-center gap-3 rounded-xl bg-[#305854] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#234542]"
              >
                <MonitorPlay size={19} />
                View Presentation
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 overflow-hidden rounded-[34px] border border-[#305854]/15 bg-white p-3 shadow-[0_28px_80px_rgba(22,35,59,0.14)] sm:p-5"
          >
            <div className="overflow-hidden rounded-[25px] bg-white">
              <img
                src={podModelImage}
                alt="AERA POD Model connecting AERA, a warehouse central logistics hub, a main church hub, and church campuses operating as POD sites."
                className="block h-auto w-full"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="flex flex-col gap-2 px-3 pb-2 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div>
                <strong className="block text-sm font-black uppercase tracking-[0.14em] text-[#305854]">AERA POD Model</strong>
                <span className="mt-1 block text-sm font-medium text-slate-600">The exact operating-model visual supplied for the AERA presentation.</span>
              </div>
              <span className="w-fit rounded-full bg-[#EAF4E7] px-3 py-1 text-xs font-black text-[#305854]">Shared operating picture</span>
            </figcaption>
          </motion.figure>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {modelPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.article
                  key={point.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[24px] border border-[#305854]/15 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#305854] text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-black">{point.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">{point.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
