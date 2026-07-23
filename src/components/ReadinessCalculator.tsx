import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Droplet, 
  BatteryCharging, 
  Radio, 
  HeartPulse, 
  FileText, 
  Share2, 
  Download, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface ChecklistItem {
  id: string;
  category: 'water' | 'power' | 'medical' | 'comms' | 'docs';
  label: string;
  weight: number;
  description: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: 'water_72h', category: 'water', label: '72-Hour Clean Water Supply (1 gal/person/day)', weight: 20, description: 'Minimum 3 gallons per household member stored in sealed food-grade containers.' },
  { id: 'food_nonperish', category: 'water', label: '3-5 Days Non-Perishable Food & Opener', weight: 15, description: 'High-calorie, low-sodium canned items, protein bars, manual can opener.' },
  { id: 'power_bank', category: 'power', label: 'Backup Solar/Battery Station & Cables', weight: 15, description: 'At least 20,000mAh portable power bank or portable power station for phones & radios.' },
  { id: 'comms_radio', category: 'comms', label: 'Hand-Crank NOAA Weather Radio & Flashlight', weight: 15, description: 'Emergency radio operating without cell towers or power grid.' },
  { id: 'med_kit', category: 'medical', label: 'Tactical Trauma Kit & 14-Day Medications', weight: 20, description: 'Hemostatic gauze, tourniquet, antiseptics, and essential prescription refills.' },
  { id: 'docs_digital', category: 'docs', label: 'Encrypted Digital Vault of ID & Insurance', weight: 15, description: 'Offline secure digital copies of passports, deeds, medical records, and emergency contacts.' },
];

export function ReadinessCalculator() {
  const [peopleCount, setPeopleCount] = useState<number>(3);
  const [selectedItems, setSelectedItems] = useState<string[]>([
    'water_72h',
    'power_bank',
    'med_kit'
  ]);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const toggleItem = (id: string) => {
    soundEngine.playClick();
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const totalPossible = CHECKLIST_ITEMS.reduce((sum, item) => sum + item.weight, 0);
  const earnedPoints = CHECKLIST_ITEMS
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.weight, 0);

  const readinessScore = Math.round((earnedPoints / totalPossible) * 100);

  const getScoreStatus = (score: number) => {
    if (score >= 85) return { level: 'Elite Resilience', color: 'text-emerald-600 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400', badgeBg: 'bg-emerald-500', note: 'Your household is thoroughly prepared for grid outages & rapid response.' };
    if (score >= 60) return { level: 'Moderate Readiness', color: 'text-amber-600 border-amber-500 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400', badgeBg: 'bg-amber-500', note: 'Good baseline! Addressing 1 or 2 missing critical supplies will elevate your protection.' };
    return { level: 'Vulnerable Baseline', color: 'text-rose-600 border-rose-500 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400', badgeBg: 'bg-rose-500', note: 'Immediate action recommended. Grid or network outages could severely limit emergency response.' };
  };

  const status = getScoreStatus(readinessScore);

  const handleShare = () => {
    soundEngine.playBeep(900, 0.1);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:to-slate-900 p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Interactive Readiness Assessment
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight font-display text-white">
              Household Emergency Readiness Index
            </h3>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Calculate your household’s readiness score in real time. AERA integrates with your stored emergency profile to sync family alerts when crisis strikes.
            </p>
          </div>

          {/* Household Size Selector */}
          <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-xl p-4 flex flex-col gap-2 min-w-[220px]">
            <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-400" /> Family Members</span>
              <span className="text-emerald-400 font-bold text-sm">{peopleCount} People</span>
            </label>
            <input 
              type="range" 
              min={1} 
              max={10} 
              value={peopleCount}
              onChange={(e) => {
                setPeopleCount(Number(e.target.value));
                soundEngine.playClick();
              }}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1 Person</span>
              <span>5 Members</span>
              <span>10+ Members</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8">
        
        {/* Left Column: Interactive Checklist */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Select Household Readiness Assets
            </h4>
            <span className="text-xs text-slate-500 font-mono">
              {selectedItems.length} of {CHECKLIST_ITEMS.length} Checked
            </span>
          </div>

          <div className="space-y-3">
            {CHECKLIST_ITEMS.map((item) => {
              const isChecked = selectedItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`group p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isChecked 
                      ? 'bg-slate-50 dark:bg-slate-800/60 border-emerald-500/50 dark:border-emerald-500/40 shadow-sm' 
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                    isChecked ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 dark:border-slate-600 group-hover:border-emerald-500'
                  }`}>
                    {isChecked && <CheckCircle2 className="w-4 h-4" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-semibold text-sm ${isChecked ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'}`}>
                        {item.label}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                        +{item.weight}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Score Gauge & Custom Recommendations */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <div>
            <div className="text-center pb-6 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono">
                Current Readiness Meter
              </span>

              {/* Big Circular / Radial Gauge */}
              <div className="relative w-44 h-44 mx-auto my-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-slate-200 dark:text-slate-800 stroke-current"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-emerald-500 stroke-current"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * readinessScore) / 100 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">
                    {readinessScore}%
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {peopleCount * 3} Gal Water Needed
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${status.color}`}>
                <span className={`w-2 h-2 rounded-full ${status.badgeBg} animate-pulse`} />
                {status.level}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                {status.note}
              </p>
            </div>

            {/* Action Item Alerts */}
            <div className="mt-6 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Key Missing Safeguards ({CHECKLIST_ITEMS.length - selectedItems.length})
              </h5>

              {CHECKLIST_ITEMS.filter(i => !selectedItems.includes(i.id)).length === 0 ? (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-lg text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Outstanding job! All standard primary baseline safeguards are satisfied.</span>
                </div>
              ) : (
                CHECKLIST_ITEMS.filter(i => !selectedItems.includes(i.id)).slice(0, 3).map(item => (
                  <div key={item.id} className="p-3 bg-white dark:bg-slate-800/80 border border-amber-200/80 dark:border-amber-900/30 rounded-lg text-slate-700 dark:text-slate-300 text-xs flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{item.label}</span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleShare}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-medium text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-white" />
                  Assessment Link Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Sync Plan to Household Devices
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-slate-400 dark:text-slate-500">
              AERA encryption ensures your personal preparedness data never leaves your device unencrypted.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
