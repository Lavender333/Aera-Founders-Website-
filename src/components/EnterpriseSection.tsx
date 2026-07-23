import React, { useState } from 'react';
import { BuyingOption } from '../types';
import { Check, ShieldAlert, ArrowRight, Calculator, FileCheck } from 'lucide-react';

interface EnterpriseSectionProps {
  onOpenConsultation: (interest?: string) => void;
}

export const EnterpriseSection: React.FC<EnterpriseSectionProps> = ({ onOpenConsultation }) => {
  const [buyingDetailsOpen, setBuyingDetailsOpen] = useState<boolean>(true);

  // Calculator State
  const [scope, setScope] = useState<'assessment' | 'pilot' | 'enterprise' | 'mission'>('pilot');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [integration, setIntegration] = useState<'standard' | 'advanced'>('standard');
  const [support, setSupport] = useState<'business' | 'priority' | 'critical'>('business');

  const buyingOptions: Record<string, BuyingOption> = {
    assessment: {
      key: 'assessment',
      name: 'Readiness Assessment',
      low: 15,
      high: 35,
      unit: 'one-time',
      explanation: 'Evaluate organizational fit, workflow risks, integration points, and return on investment.',
    },
    pilot: {
      key: 'pilot',
      name: 'Pilot Deployment',
      low: 45,
      high: 120,
      unit: 'first year',
      explanation: 'Test one department, region, or controlled institution before full organizational rollout.',
    },
    enterprise: {
      key: 'enterprise',
      name: 'Enterprise Program',
      low: 150,
      high: 450,
      unit: 'annual + implementation',
      explanation: 'Deploy across departments, campuses, or distributed operations with full SLAs.',
    },
    mission: {
      key: 'mission',
      name: 'Multi-Agency or Dedicated Program',
      low: 500,
      high: 1500,
      unit: 'first year',
      explanation: 'Custom architecture, dedicated governance, and high-assurance multi-agency coordination.',
    },
  };

  const calculateRange = () => {
    const base = buyingOptions[scope];
    let mult = 1.0;
    if (size === 'medium') mult *= 1.1;
    if (size === 'large') mult *= 1.25;
    if (integration === 'advanced') mult *= 1.18;
    if (support === 'priority') mult *= 1.12;
    if (support === 'critical') mult *= 1.25;

    const lowVal = Math.round(base.low * mult);
    const highVal = Math.round(base.high * mult);

    const fmt = (v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}M` : `$${v}K`);

    return {
      name: base.name,
      estimate: `Planning range: ${fmt(lowVal)}–${fmt(highVal)} ${base.unit}`,
      explanation: base.explanation,
    };
  };

  const result = calculateRange();

  return (
    <section className="py-20 bg-white" id="enterprise">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow">Enterprise &amp; Institutional</span>
            <h2 className="text-3xl sm:text-5xl font-black text-black mt-3">
              Move from evaluation to deployment.
            </h2>
            <p className="lead text-neutral-800 mt-3 max-w-xl">
              Begin with evidence, prove value through controlled pilots, then scale with clear governance.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F3F8F5] border border-[rgba(48,88,84,0.18)] max-w-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-[#305854] uppercase tracking-wider mb-1">
              <ShieldAlert size={16} /> Planning Ranges Only
            </div>
            <p className="text-xs text-neutral-800 leading-snug">
              Final pricing depends on scope, user volume, system integrations, support level, and assurance requirements.
            </p>
          </div>
        </div>

        {/* 4 Buying Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Level 01 */}
          <div className="bg-[#FAFBFA] p-6 rounded-[24px] border border-[rgba(48,88,84,0.18)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <span className="kicker text-xs text-[#305854]">Level 01 / Evaluate</span>
              <h3 className="text-2xl font-black text-black mt-2">Readiness Assessment</h3>
              <p className="text-xs text-neutral-800 mt-2 min-h-[40px]">
                Define the use case, risk profile, scope, and technical roadmap.
              </p>
              <div className="my-4 pt-4 border-t border-neutral-200">
                <span className="text-2xl font-black text-[#305854] block">$15K–$35K</span>
                <span className="text-[11px] text-neutral-600 uppercase font-bold block mt-0.5">
                  One-time planning range
                </span>
              </div>
              <ul className="text-xs text-neutral-800 space-y-2 mb-6">
                <li className="flex items-center gap-2"><Check size={14} className="text-[#8CBB5D]" /> Executive &amp; stakeholder discovery</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#8CBB5D]" /> Communication-risk mapping</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#8CBB5D]" /> Integration &amp; budget roadmap</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onOpenConsultation('Readiness Assessment ($15K-$35K)')}
              className="btn btn-secondary text-xs py-2.5 w-full"
            >
              Explore Assessment
            </button>
          </div>

          {/* Level 02 - Recommended */}
          <div className="bg-[#305854] text-white p-6 rounded-[24px] border-2 border-[#8CBB5D] flex flex-col justify-between shadow-xl relative overflow-hidden">
            <span className="absolute top-0 right-0 bg-[#8CBB5D] text-black text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
              Most Popular
            </span>
            <div>
              <span className="kicker text-xs text-[#8CBB5D]">Level 02 / Prove</span>
              <h3 className="text-2xl font-black text-white mt-2">Pilot Deployment</h3>
              <p className="text-xs text-white/80 mt-2 min-h-[40px]">
                Test one department, campus, region, or controlled operational scope.
              </p>
              <div className="my-4 pt-4 border-t border-white/20">
                <span className="text-2xl font-black text-white block">$45K–$120K</span>
                <span className="text-[11px] text-white/70 uppercase font-bold block mt-0.5">
                  First-year planning range
                </span>
              </div>
              <ul className="text-xs text-white/90 space-y-2 mb-6">
                <li className="flex items-center gap-2"><Check size={14} className="text-[#8CBB5D]" /> Fixed pilot scope &amp; success metrics</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#8CBB5D]" /> Onboarding &amp; administrator training</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#8CBB5D]" /> Evaluation report for expansion</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onOpenConsultation('Pilot Deployment ($45K-$120K)')}
              className="btn bg-white text-[#305854] hover:bg-[#F3F8F5] text-xs py-2.5 w-full font-black"
            >
              Plan a Pilot
            </button>
          </div>

          {/* Level 03 */}
          <div className="bg-[#FAFBFA] p-6 rounded-[24px] border border-[rgba(48,88,84,0.18)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <span className="kicker text-xs text-[#305854]">Level 03 / Scale</span>
              <h3 className="text-2xl font-black text-black mt-2">Enterprise Program</h3>
              <p className="text-xs text-neutral-800 mt-2 min-h-[40px]">
                Scale across departments, institutions, or distributed operations.
              </p>
              <div className="my-4 pt-4 border-t border-neutral-200">
                <span className="text-2xl font-black text-[#305854] block">$150K–$450K</span>
                <span className="text-[11px] text-neutral-600 uppercase font-bold block mt-0.5">
                  Annual + implementation
                </span>
              </div>
              <ul className="text-xs text-neutral-800 space-y-2 mb-6">
                <li className="flex items-center gap-2"><Check size={14} className="text-[#8CBB5D]" /> Full enterprise license</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#8CBB5D]" /> Custom role &amp; data integration</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#8CBB5D]" /> Priority SLA &amp; dedicated support</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onOpenConsultation('Enterprise Program ($150K-$450K)')}
              className="btn btn-secondary text-xs py-2.5 w-full"
            >
              Explore Enterprise
            </button>
          </div>

          {/* Level 04 */}
          <div className="bg-[#FAFBFA] p-6 rounded-[24px] border border-[rgba(48,88,84,0.18)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <span className="kicker text-xs text-[#305854]">Level 04 / Dedicated</span>
              <h3 className="text-2xl font-black text-black mt-2">Multi-Agency Program</h3>
              <p className="text-xs text-neutral-800 mt-2 min-h-[40px]">
                For highly regulated, multi-jurisdiction, or mission-critical agencies.
              </p>
              <div className="my-4 pt-4 border-t border-neutral-200">
                <span className="text-2xl font-black text-[#305854] block">$500K–$1.5M+</span>
                <span className="text-[11px] text-neutral-600 uppercase font-bold block mt-0.5">
                  First-year program range
                </span>
              </div>
              <ul className="text-xs text-neutral-800 space-y-2 mb-6">
                <li className="flex items-center gap-2"><Check size={14} className="text-[#8CBB5D]" /> Dedicated high-assurance infrastructure</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#8CBB5D]" /> Multi-agency governance review</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#8CBB5D]" /> 24/7 mission-critical response SLA</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onOpenConsultation('Multi-Agency Program ($500K-$1.5M+)')}
              className="btn btn-secondary text-xs py-2.5 w-full"
            >
              Dedicated Program
            </button>
          </div>
        </div>

        {/* Expandable Calculator & 6 Decision Gates */}
        <div className="bg-[#FAFBFA] rounded-[28px] border border-[rgba(48,88,84,0.18)] overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => setBuyingDetailsOpen(!buyingDetailsOpen)}
            className="w-full p-6 text-left flex items-center justify-between gap-4 bg-white hover:bg-[#F3F8F5] transition-colors"
          >
            <div>
              <span className="kicker text-xs text-[#305854]">PROCUREMENT &amp; BUDGET PLANNING</span>
              <h3 className="text-xl sm:text-2xl font-black text-black mt-1">
                Interactive Planning Calculator &amp; Decision Gates
              </h3>
            </div>
            <span className="w-10 h-10 rounded-full bg-[#F3F8F5] text-[#305854] flex items-center justify-center font-bold text-lg">
              {buyingDetailsOpen ? '−' : '+'}
            </span>
          </button>

          {buyingDetailsOpen && (
            <div className="p-6 sm:p-10 border-t border-[rgba(48,88,84,0.14)] grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Planning Tool */}
              <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[rgba(48,88,84,0.18)]">
                <div className="flex items-center gap-2 mb-4 text-[#305854]">
                  <Calculator size={20} />
                  <strong className="text-lg font-black text-black">Planning Range Calculator</strong>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-black">
                  <div>
                    <label className="block mb-1 text-neutral-700">Buying Objective</label>
                    <select
                      value={scope}
                      onChange={(e) => setScope(e.target.value as any)}
                      className="w-full p-3 border rounded-xl bg-[#FAFBFA]"
                    >
                      <option value="assessment">Evaluate fit (Assessment)</option>
                      <option value="pilot">Run a pilot deployment</option>
                      <option value="enterprise">Scale enterprise-wide</option>
                      <option value="mission">Mission-critical program</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-neutral-700">Organization Scale</label>
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value as any)}
                      className="w-full p-3 border rounded-xl bg-[#FAFBFA]"
                    >
                      <option value="small">Under 500 participants</option>
                      <option value="medium">500 – 5,000 participants</option>
                      <option value="large">5,000+ participants</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-neutral-700">Integrations Needed</label>
                    <select
                      value={integration}
                      onChange={(e) => setIntegration(e.target.value as any)}
                      className="w-full p-3 border rounded-xl bg-[#FAFBFA]"
                    >
                      <option value="standard">Standard / Standalone</option>
                      <option value="advanced">Advanced custom APIs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-neutral-700">Support &amp; SLA Level</label>
                    <select
                      value={support}
                      onChange={(e) => setSupport(e.target.value as any)}
                      className="w-full p-3 border rounded-xl bg-[#FAFBFA]"
                    >
                      <option value="business">Business hours</option>
                      <option value="priority">Priority extended</option>
                      <option value="critical">24/7 mission-critical</option>
                    </select>
                  </div>
                </div>

                {/* Calculator Result Box */}
                <div className="mt-6 p-5 rounded-2xl bg-[#305854] text-white">
                  <span className="text-[10px] uppercase font-bold text-[#8CBB5D] tracking-widest block">
                    Calculated Starting Recommendation
                  </span>
                  <strong className="text-xl font-black block mt-1 text-white">{result.name}</strong>
                  <span className="text-base font-extrabold text-[#8CBB5D] block mt-1">{result.estimate}</span>
                  <p className="text-xs text-white/80 mt-2 leading-relaxed">{result.explanation}</p>
                  <button
                    type="button"
                    onClick={() => onOpenConsultation(`${result.name} (${result.estimate})`)}
                    className="btn bg-[#8CBB5D] text-black hover:bg-white text-xs font-black w-full mt-4 py-2.5"
                  >
                    Request Custom Quote for This Scope
                  </button>
                </div>
              </div>

              {/* Right Decision Process */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#305854]">
                    <FileCheck size={20} />
                    <strong className="text-lg font-black text-black">Six Decision Gates to Scale</strong>
                  </div>
                  <p className="text-xs text-neutral-700 mb-4 leading-relaxed">
                    AERA ensures complete security, operational alignment, and legal compliance before expanding footprint.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white border rounded-xl">
                      <strong className="text-[#305854] block">01 / Align</strong>
                      <span className="text-black font-semibold">Executive fit call &amp; objectives</span>
                    </div>
                    <div className="p-3 bg-white border rounded-xl">
                      <strong className="text-[#305854] block">02 / Define</strong>
                      <span className="text-black font-semibold">Discovery &amp; risk mapping</span>
                    </div>
                    <div className="p-3 bg-white border rounded-xl">
                      <strong className="text-[#305854] block">03 / Prove</strong>
                      <span className="text-black font-semibold">Controlled pilot execution</span>
                    </div>
                    <div className="p-3 bg-white border rounded-xl">
                      <strong className="text-[#305854] block">04 / Review</strong>
                      <span className="text-black font-semibold">Security &amp; procurement audit</span>
                    </div>
                    <div className="p-3 bg-white border rounded-xl">
                      <strong className="text-[#305854] block">05 / Deploy</strong>
                      <span className="text-black font-semibold">Full rollout &amp; onboarding</span>
                    </div>
                    <div className="p-3 bg-white border rounded-xl">
                      <strong className="text-[#305854] block">06 / Govern</strong>
                      <span className="text-black font-semibold">Annual performance review</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#EEF6F0] border border-[#467857]/30 text-xs text-[#305854]">
                  <strong className="font-bold block mb-1">Pricing Best Practice:</strong>
                  Separate clear platform fees, setup services, and ongoing support so your procurement team has complete transparency.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
