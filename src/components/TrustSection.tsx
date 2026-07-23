import React from 'react';
import { TrustResourceKey } from '../types';
import { ShieldCheck, Lock, RefreshCw, Accessibility, Building, ArrowRight } from 'lucide-react';

interface TrustSectionProps {
  onOpenResource: (key: TrustResourceKey) => void;
  onOpenConsultation: () => void;
}

export const TrustSection: React.FC<TrustSectionProps> = ({
  onOpenResource,
  onOpenConsultation,
}) => {
  return (
    <section className="py-20 bg-[#F3F8F5] border-y border-[rgba(48,88,84,0.14)]" id="trust">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
          {/* Left Headline */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="eyebrow">Trust and Readiness</span>
            <h2 className="text-3xl sm:text-5xl font-black text-black">
              Structured for responsible evaluation.
            </h2>
            <p className="lead text-neutral-800">
              AERA separates current platform capabilities, deployment requirements, and assurance protocols that must be verified for each institutional environment.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-bold text-[#305854] mt-2">
              <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center gap-2">
                <Lock size={16} /> Role-Based Access
              </div>
              <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center gap-2">
                <ShieldCheck size={16} /> Data Governance
              </div>
              <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center gap-2">
                <RefreshCw size={16} /> Offline Continuity
              </div>
              <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center gap-2">
                <Accessibility size={16} /> Accessible Design
              </div>
            </div>
          </div>

          {/* Right Trust Architecture Box */}
          <div className="lg:col-span-6 bg-white p-8 rounded-[32px] border border-[rgba(48,88,84,0.18)] shadow-lg flex flex-col items-center justify-center text-center gap-6 min-h-[340px]">
            <div className="w-20 h-20 rounded-3xl bg-[#305854] text-white flex items-center justify-center font-black text-3xl shadow-xl">
              TRUST
            </div>
            <strong className="text-2xl font-black text-black">AERA High-Assurance Core</strong>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full text-xs font-bold text-black">
              <div className="p-3 bg-[#F3F8F5] rounded-xl border border-neutral-200">Identity</div>
              <div className="p-3 bg-[#F3F8F5] rounded-xl border border-neutral-200">Data</div>
              <div className="p-3 bg-[#F3F8F5] rounded-xl border border-neutral-200">Continuity</div>
              <div className="p-3 bg-[#F3F8F5] rounded-xl border border-neutral-200">Governance</div>
            </div>
          </div>
        </div>

        {/* 4 Interactive Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[rgba(48,88,84,0.18)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <span className="kicker text-[10px] text-[#305854]">01 / SECURITY</span>
              <h4 className="text-xl font-bold text-black mt-2">Security &amp; Privacy</h4>
              <p className="text-xs text-neutral-700 mt-2 leading-relaxed">
                Access controls, data handling rules, monitoring, and incident escalation protocols.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenResource('security')}
              className="mt-6 text-xs font-bold text-[#305854] hover:text-black flex items-center gap-1.5"
            >
              Review Approach <ArrowRight size={14} />
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[rgba(48,88,84,0.18)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <span className="kicker text-[10px] text-[#305854]">02 / CONTINUITY</span>
              <h4 className="text-xl font-bold text-black mt-2">Reliable Operations</h4>
              <p className="text-xs text-neutral-700 mt-2 leading-relaxed">
                Local storage, service dependency management, and communication continuity plans.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenResource('recovery')}
              className="mt-6 text-xs font-bold text-[#305854] hover:text-black flex items-center gap-1.5"
            >
              Review Continuity <ArrowRight size={14} />
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[rgba(48,88,84,0.18)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <span className="kicker text-[10px] text-[#305854]">03 / ACCESSIBILITY</span>
              <h4 className="text-xl font-bold text-black mt-2">Accessible Design</h4>
              <p className="text-xs text-neutral-700 mt-2 leading-relaxed">
                Keyboard navigation, high-contrast typography, reduced motion, and assistive testing.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenResource('accessibility')}
              className="mt-6 text-xs font-bold text-[#305854] hover:text-black flex items-center gap-1.5"
            >
              Review Accessibility <ArrowRight size={14} />
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[rgba(48,88,84,0.18)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <span className="kicker text-[10px] text-[#305854]">04 / DEPLOYMENT</span>
              <h4 className="text-xl font-bold text-black mt-2">Governed Launch</h4>
              <p className="text-xs text-neutral-700 mt-2 leading-relaxed">
                Scope confirmation, user training, technical integration, and administrative oversight.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenResource('capability')}
              className="mt-6 text-xs font-bold text-[#305854] hover:text-black flex items-center gap-1.5"
            >
              View Overview <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={onOpenConsultation}
            className="btn btn-primary text-sm py-3 px-8"
          >
            Discuss Institutional Deployment
          </button>
        </div>
      </div>
    </section>
  );
};
