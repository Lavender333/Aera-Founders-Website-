import React from 'react';
import { motion } from 'motion/react';
import { X, ArrowRight, Shield, Radio, Users, WifiOff, Sparkles } from 'lucide-react';
import { AeraLogo } from './AeraLogo';

interface SplashScreenProps {
  onDismiss: () => void;
  registeredCount?: number;
}

const STATS = [
  { stat: '240M+', label: '911 Calls Overload Systems / Yr', icon: Radio },
  { stat: '72 HRS', label: 'Critical Window After Disaster', icon: Shield },
  { stat: '1 APP', label: 'Unites Every Org in Community', icon: Users },
  { stat: 'OFFLINE', label: 'Store & Forward Local Sync', icon: WifiOff },
];

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onDismiss,
  registeredCount = 14,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] bg-[#F4F2EC] dark:bg-slate-950 text-[#101216] dark:text-slate-100 flex flex-col items-center p-5 sm:p-8 select-none overflow-y-auto antialiased"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_15%,rgba(30,77,64,0.13),transparent_58%)] dark:bg-[radial-gradient(circle_at_50%_15%,rgba(16,185,129,0.16),transparent_68%)]" />
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#8CBB5D]/15 blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl flex justify-between items-center shrink-0 z-10 pt-1">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E4D40]/10 text-[#1E4D40] dark:bg-emerald-950/80 dark:text-emerald-300 text-xs font-bold border border-[#1E4D40]/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4BB055] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4BB055]" />
          </span>
          <span className="font-mono tracking-wider text-[11px] uppercase">AERA System Active</span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          onClick={onDismiss}
          className="p-2.5 rounded-full hover:bg-[#1E4D40]/10 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all active:scale-95"
          aria-label="Close splash screen"
        >
          <X size={20} />
        </motion.button>
      </div>

      <div className="relative z-10 w-full max-w-5xl flex-1 flex items-center py-8 sm:py-12">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <AeraLogo size={52} bgWhite />
              <div className="text-left">
                <span className="block text-xs font-black tracking-[0.22em] text-[#305854] dark:text-emerald-300 uppercase">AERA</span>
                <span className="block text-[10px] font-bold tracking-widest text-neutral-500 dark:text-slate-400 uppercase">Emergency Readiness Platform</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#305854] text-white border border-[#8CBB5D]/40 shadow-lg mb-5">
              <Sparkles size={16} className="text-[#8CBB5D]" />
              <span className="text-xs sm:text-sm font-black tracking-[0.16em] uppercase">Founder · Visionary · Chief Executive</span>
            </div>

            <p className="text-sm sm:text-base font-black tracking-[0.28em] text-[#B08D3E] dark:text-amber-400 uppercase mb-3">
              Kenneth Brewer
            </p>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#16233B] dark:text-white leading-[0.94] tracking-tight">
              The visionary
              <span className="block text-[#305854] dark:text-emerald-400">behind AERA.</span>
            </h1>

            <p className="mt-6 text-base sm:text-xl font-semibold leading-relaxed text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0">
              Kenneth Brewer envisioned one dependable system that could keep people prepared, connected, and coordinated when communication breaks down.
            </p>

            <blockquote className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#305854] text-white border-l-4 border-[#8CBB5D] shadow-xl max-w-2xl mx-auto lg:mx-0 text-left">
              <span className="block text-[10px] sm:text-xs font-black tracking-[0.2em] text-[#8CBB5D] uppercase mb-2">Kenneth Brewer’s Founding Insight</span>
              <p className="text-base sm:text-xl font-black italic leading-relaxed">
                “An emergency creates a second crisis: fragmented information. People still need to know what to do next.”
              </p>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="lg:col-span-5"
          >
            <div className="rounded-[32px] bg-white/95 dark:bg-slate-900/95 border border-[#305854]/20 dark:border-slate-700 shadow-2xl p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="block text-[10px] font-black tracking-[0.2em] text-[#B08D3E] dark:text-amber-400 uppercase">Vision in Action</span>
                  <h2 className="text-2xl font-black text-[#16233B] dark:text-white mt-1">One shared operating picture</h2>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#305854] text-white flex items-center justify-center text-xl font-black shadow-lg">KB</div>
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Who is safe. What is needed. What happens next.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-5">
                {['Prepare', 'Report', 'Coordinate', 'Recover'].map((step, index) => (
                  <div key={step} className="p-4 rounded-2xl bg-[#F3F8F5] dark:bg-slate-800 border border-[#305854]/15 dark:border-slate-700">
                    <span className="text-xs font-black text-[#305854] dark:text-emerald-400">0{index + 1}</span>
                    <strong className="block text-sm text-slate-900 dark:text-white mt-1">{step}</strong>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 mt-5">
                {STATS.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.label} className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#B08D3E]/45 dark:border-amber-500/30 bg-white dark:bg-slate-900">
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <IconComponent size={16} className="text-[#B08D3E] dark:text-amber-400 shrink-0" />
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-wide text-slate-600 dark:text-slate-300 uppercase truncate">{item.label}</span>
                      </div>
                      <strong className="text-base sm:text-lg text-[#16233B] dark:text-emerald-400 shrink-0">{item.stat}</strong>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between px-4 py-3 bg-[#1E4D40]/10 dark:bg-emerald-950/50 border border-[#1E4D40]/25 dark:border-emerald-700/60 rounded-xl">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#1E4D40] dark:text-emerald-300 uppercase">People registered in network</span>
                <strong className="text-lg text-[#1E4D40] dark:text-emerald-300">{registeredCount}</strong>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.5 }}
        className="relative z-10 w-full max-w-5xl pb-1"
      >
        <button
          onClick={onDismiss}
          className="group w-full py-4 px-6 bg-[#305854] dark:bg-emerald-700 hover:bg-[#234542] dark:hover:bg-emerald-600 active:scale-[0.99] text-[#F4F2EC] font-black text-xs sm:text-sm tracking-[0.18em] rounded-xl shadow-lg transition-all uppercase flex items-center justify-center gap-3"
        >
          <span>Enter Kenneth Brewer’s AERA Vision</span>
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </motion.div>
  );
};
