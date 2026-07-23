import React, { useState } from 'react';
import { Shield, Radio, Users, Package, WifiOff, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { ReadinessCalculator } from './ReadinessCalculator';
import { soundEngine } from '../utils/audio';

export const PlatformWorkflows: React.FC = () => {
  const [detailsOpen, setDetailsOpen] = useState<boolean>(true);

  // Interactive state for Workflow 2 (Status reporting simulation)
  const [userStatus, setUserStatus] = useState<'safe' | 'help' | null>('safe');
  const [needPriority, setNeedPriority] = useState<string>('Standard');

  // Interactive state for Workflow 4 (Inventory tracker)
  const [inventory, setInventory] = useState({
    water: 120,
    food: 85,
    medical: 40,
    blankets: 65,
  });

  const handleRequestItem = (key: keyof typeof inventory) => {
    soundEngine.playClick();
    setInventory((prev) => ({ ...prev, [key]: prev[key] + 10 }));
  };

  return (
    <section className="py-20 bg-[#F3F8F5] dark:bg-slate-950 border-y border-[rgba(48,88,84,0.14)] dark:border-slate-800 transition-colors" id="platform">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="eyebrow">Platform Workflows</span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-3">
            Prepare. Report. Coordinate. Recover.
          </h2>
          <p className="lead text-neutral-800 dark:text-slate-300 mt-3 max-w-2xl">
            AERA supports a continuous operating cycle — from readiness through active emergency response and long-term recovery.
          </p>
        </div>

        {/* Interactive Readiness Score Assessment */}
        <ReadinessCalculator />

        {/* Core 4 Stages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 mt-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[rgba(48,88,84,0.18)] dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <span className="kicker text-[#305854] dark:text-emerald-400">01 / STAGE</span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">Prepare</h3>
            <p className="text-sm text-neutral-800 dark:text-slate-300 mt-2">
              Organize household members, contact lists, essential supplies, and readiness gaps.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[rgba(48,88,84,0.18)] dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <span className="kicker text-[#305854] dark:text-emerald-400">02 / STAGE</span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">Report</h3>
            <p className="text-sm text-neutral-800 dark:text-slate-300 mt-2">
              Share immediate safety status, precise location, priority level, and urgent help requests.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[rgba(48,88,84,0.18)] dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <span className="kicker text-[#305854] dark:text-emerald-400">03 / STAGE</span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">Coordinate</h3>
            <p className="text-sm text-neutral-800 dark:text-slate-300 mt-2">
              Align community broadcasts, team assignments, shelters, and resource distribution.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[rgba(48,88,84,0.18)] dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <span className="kicker text-[#305854] dark:text-emerald-400">04 / STAGE</span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">Recover</h3>
            <p className="text-sm text-neutral-800 dark:text-slate-300 mt-2">
              Support long-term assistance, supply tracking, follow-through, and continuing restoration.
            </p>
          </div>
        </div>

        {/* Detailed Product Capability Expander */}
        <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-[rgba(48,88,84,0.18)] dark:border-slate-800 shadow-md overflow-hidden">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setDetailsOpen(!detailsOpen);
            }}
            className="w-full p-6 text-left flex items-center justify-between gap-4 bg-white dark:bg-slate-900 hover:bg-[#F3F8F5] dark:hover:bg-slate-800/80 transition-colors"
          >
            <div>
              <span className="kicker text-xs text-[#305854] dark:text-emerald-400">PRODUCT DEEP DIVE</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                Explore AERA's Core Feature Capabilities
              </h3>
            </div>
            <span className="w-10 h-10 rounded-full bg-[#F3F8F5] dark:bg-slate-800 text-[#305854] dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
              {detailsOpen ? '−' : '+'}
            </span>
          </button>

          {detailsOpen && (
            <div className="p-6 sm:p-10 border-t border-[rgba(48,88,84,0.14)] dark:border-slate-800 flex flex-col gap-10">
              {/* Capability 1: Prepare Households */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b dark:border-slate-800 pb-8">
                <div className="lg:col-span-6 flex flex-col gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#305854] dark:bg-emerald-600 text-white flex items-center justify-center text-xs font-mono font-bold">
                    01
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Prepare Households</h3>
                  <p className="text-neutral-800 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    Organize family members, emergency contact lists, supply inventories, medical needs, and readiness checklists before disaster strikes.
                  </p>
                  <ul className="text-xs sm:text-sm font-bold text-[#305854] dark:text-emerald-400 space-y-1.5 mt-2">
                    <li className="flex items-center gap-2"><Check size={16} className="text-[#8CBB5D] dark:text-emerald-400" /> Shared household profile &amp; contacts</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-[#8CBB5D] dark:text-emerald-400" /> Water, food, medical, &amp; power inventory</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-[#8CBB5D] dark:text-emerald-400" /> Automated readiness gap alerts</li>
                  </ul>
                </div>

                <div className="lg:col-span-6 bg-[#FAFBFA] dark:bg-slate-950 p-6 rounded-2xl border border-[rgba(48,88,84,0.18)] dark:border-slate-800">
                  <strong className="text-xs font-bold text-[#305854] dark:text-emerald-400 uppercase tracking-wider block mb-3">
                    Household Readiness Card
                  </strong>
                  <div className="flex flex-col gap-2.5 text-xs text-slate-900 dark:text-slate-100 font-semibold">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 flex items-center justify-between">
                      <span>Household Members</span>
                      <strong className="text-[#305854] dark:text-emerald-400">4 Connected</strong>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 flex items-center justify-between">
                      <span>Emergency Water &amp; Food</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ 14 Days Ready</span>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 flex items-center justify-between">
                      <span>Backup Power &amp; Medical Kit</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">Needs Review</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Capability 2: Report Status and Needs (Interactive Toggle Simulation) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b dark:border-slate-800 pb-8">
                <div className="lg:col-span-6 flex flex-col gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#467857] dark:bg-emerald-600 text-white flex items-center justify-center text-xs font-mono font-bold">
                    02
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Report Status and Needs</h3>
                  <p className="text-neutral-800 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    One-tap reporting allows individuals to confirm they are safe or submit prioritized help requests with GPS or manually selected location details.
                  </p>
                  <ul className="text-xs sm:text-sm font-bold text-[#305854] dark:text-emerald-400 space-y-1.5 mt-2">
                    <li className="flex items-center gap-2"><Check size={16} className="text-[#8CBB5D] dark:text-emerald-400" /> One-click Safe / Need Help status</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-[#8CBB5D] dark:text-emerald-400" /> Priority request categorization</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-[#8CBB5D] dark:text-emerald-400" /> Works seamlessly online or offline</li>
                  </ul>
                </div>

                <div className="lg:col-span-6 bg-[#FAFBFA] dark:bg-slate-950 p-6 rounded-2xl border border-[rgba(48,88,84,0.18)] dark:border-slate-800">
                  <strong className="text-xs font-bold text-[#305854] dark:text-emerald-400 uppercase tracking-wider block mb-3">
                    Try Status Reporter Simulation
                  </strong>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setUserStatus('safe');
                      }}
                      className={`p-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                        userStatus === 'safe'
                          ? 'bg-emerald-700 dark:bg-emerald-600 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border dark:border-slate-800 text-neutral-800 dark:text-slate-200 hover:border-emerald-600'
                      }`}
                    >
                      <Check size={16} /> I AM SAFE
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setUserStatus('help');
                      }}
                      className={`p-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                        userStatus === 'help'
                          ? 'bg-rose-700 dark:bg-rose-600 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border dark:border-slate-800 text-neutral-800 dark:text-slate-200 hover:border-rose-600'
                      }`}
                    >
                      <AlertCircle size={16} /> NEED HELP
                    </button>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 text-xs text-neutral-800 dark:text-slate-200">
                    {userStatus === 'safe' ? (
                      <p className="text-emerald-800 dark:text-emerald-400 font-bold">
                        ✓ Status logged as "SAFE". Synced to family and organization hub.
                      </p>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <span className="text-rose-800 dark:text-rose-400 font-bold">Help Request Active</span>
                        <select
                          value={needPriority}
                          onChange={(e) => setNeedPriority(e.target.value)}
                          className="p-2 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 text-xs font-semibold dark:text-white"
                        >
                          <option value="Urgent Medical">Urgent Medical Assistance</option>
                          <option value="Evacuation">Evacuation Needed</option>
                          <option value="Supplies Only">Water &amp; Food Supplies</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Capability 3: Connect Community Hubs */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b dark:border-slate-800 pb-8">
                <div className="lg:col-span-6 flex flex-col gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#5F9461] dark:bg-emerald-600 text-white flex items-center justify-center text-xs font-mono font-bold">
                    03
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Connect Community Hubs</h3>
                  <p className="text-neutral-800 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    Unite schools, places of worship, neighborhood associations, and local organizations with authorized broadcasts and safety check roll calls.
                  </p>
                  <ul className="text-xs sm:text-sm font-bold text-[#305854] dark:text-emerald-400 space-y-1.5 mt-2">
                    <li className="flex items-center gap-2"><Check size={16} className="text-[#8CBB5D] dark:text-emerald-400" /> Group &amp; community hub codes</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-[#8CBB5D] dark:text-emerald-400" /> Authorized emergency broadcasts</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-[#8CBB5D] dark:text-emerald-400" /> Member response dashboards</li>
                  </ul>
                </div>

                <div className="lg:col-span-6 bg-[#FAFBFA] dark:bg-slate-950 p-6 rounded-2xl border border-[rgba(48,88,84,0.18)] dark:border-slate-800">
                  <strong className="text-xs font-bold text-[#305854] dark:text-emerald-400 uppercase tracking-wider block mb-3">
                    Community Safety Roll Call
                  </strong>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 rounded-xl">
                      <span className="text-lg font-black block">142</span>
                      Safe
                    </div>
                    <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-300 rounded-xl">
                      <span className="text-lg font-black block">5</span>
                      Need Help
                    </div>
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 rounded-xl">
                      <span className="text-lg font-black block">18</span>
                      Pending
                    </div>
                  </div>
                </div>
              </div>

              {/* Capability 4: Coordinate Resources and Recovery (Interactive Inventory) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b dark:border-slate-800 pb-8">
                <div className="lg:col-span-6 flex flex-col gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#8CBB5D] dark:bg-emerald-500 text-black flex items-center justify-center text-xs font-mono font-bold">
                    04
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Coordinate Resources and Recovery</h3>
                  <p className="text-neutral-800 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    Track emergency supply stockpiles, request replenishment, map nearby shelters, and manage volunteer assignments.
                  </p>
                </div>

                <div className="lg:col-span-6 bg-[#FAFBFA] dark:bg-slate-950 p-6 rounded-2xl border border-[rgba(48,88,84,0.18)] dark:border-slate-800">
                  <strong className="text-xs font-bold text-[#305854] dark:text-emerald-400 uppercase tracking-wider block mb-3">
                    Live Inventory &amp; Replenishment Tracker
                  </strong>
                  <div className="grid grid-cols-2 gap-3 text-xs font-bold text-slate-900 dark:text-slate-100 mb-3">
                    <div className="p-3 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl flex items-center justify-between">
                      <span>Water (Gal): {inventory.water}</span>
                      <button
                        type="button"
                        onClick={() => handleRequestItem('water')}
                        className="px-2 py-1 bg-[#305854] dark:bg-emerald-600 text-white rounded text-[10px]"
                      >
                        +10
                      </button>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl flex items-center justify-between">
                      <span>Food (Meals): {inventory.food}</span>
                      <button
                        type="button"
                        onClick={() => handleRequestItem('food')}
                        className="px-2 py-1 bg-[#305854] dark:bg-emerald-600 text-white rounded text-[10px]"
                      >
                        +10
                      </button>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl flex items-center justify-between">
                      <span>Medical Kits: {inventory.medical}</span>
                      <button
                        type="button"
                        onClick={() => handleRequestItem('medical')}
                        className="px-2 py-1 bg-[#305854] dark:bg-emerald-600 text-white rounded text-[10px]"
                      >
                        +10
                      </button>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl flex items-center justify-between">
                      <span>Blankets: {inventory.blankets}</span>
                      <button
                        type="button"
                        onClick={() => handleRequestItem('blankets')}
                        className="px-2 py-1 bg-[#305854] dark:bg-emerald-600 text-white rounded text-[10px]"
                      >
                        +10
                      </button>
                    </div>
                  </div>
                  <span className="text-[11px] text-neutral-600 dark:text-slate-400 block text-center">
                    Click +10 to simulate resource allocation to the local hub.
                  </span>
                </div>
              </div>

              {/* Capability 5: Continue Through Outages */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 flex flex-col gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#305854] dark:bg-emerald-600 text-white flex items-center justify-center text-xs font-mono font-bold">
                    05
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Continue Through Outages</h3>
                  <p className="text-neutral-800 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    Designed for cell network congestion or power failures. Data remains safely stored on the user's phone and automatically syncs when signal returns.
                  </p>
                </div>

                <div className="lg:col-span-6 bg-[#305854] dark:bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
                  <WifiOff size={32} className="text-[#8CBB5D] dark:text-emerald-400 shrink-0" />
                  <div>
                    <strong className="text-base font-bold text-white block">Offline Store &amp; Auto-Sync</strong>
                    <p className="text-xs text-white/80 dark:text-slate-300 mt-1 leading-normal">
                      Zero lost updates. Local indexed database buffers all safety reports, notes, and resource requests during outages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

