import React from 'react';
import { AeraLogo } from './AeraLogo';
import { TrustResourceKey } from '../types';

interface FooterProps {
  onOpenResource: (key: TrustResourceKey) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResource, onOpenConsultation }) => {
  return (
    <footer className="bg-[#305854] text-white pt-16 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/20">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <AeraLogo size={48} bgWhite />
              <div>
                <strong className="text-2xl font-black text-white tracking-widest block leading-none">AERA</strong>
                <span className="text-xs text-white/80 font-bold uppercase tracking-wider block mt-1">
                  Accelerated Emergency Response
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/90 max-w-sm leading-relaxed mt-2">
              Prepare. Report. Coordinate. Recover. Mobile-first emergency readiness and response coordination.
            </p>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 flex flex-col gap-3 text-sm">
            <strong className="text-xs uppercase font-extrabold tracking-widest text-[#8CBB5D]">Explore</strong>
            <a href="#genesis" className="text-white/80 hover:text-white transition-colors">Story &amp; Vision</a>
            <a href="#demo" className="text-white/80 hover:text-white transition-colors">Live App Demo</a>
            <a href="#platform" className="text-white/80 hover:text-white transition-colors">Platform Workflows</a>
            <a href="#enterprise" className="text-white/80 hover:text-white transition-colors">Enterprise &amp; Pricing</a>
            <a href="#trust" className="text-white/80 hover:text-white transition-colors">Trust &amp; Governance</a>
          </div>

          {/* Resources */}
          <div className="md:col-span-4 flex flex-col gap-3 text-sm">
            <strong className="text-xs uppercase font-extrabold tracking-widest text-[#8CBB5D]">Resources</strong>
            <button
              type="button"
              onClick={() => onOpenResource('accessibility')}
              className="text-left text-white/80 hover:text-white transition-colors"
            >
              Accessibility Statement
            </button>
            <button
              type="button"
              onClick={() => onOpenResource('security-contact')}
              className="text-left text-white/80 hover:text-white transition-colors"
            >
              Security Contact
            </button>
            <button
              type="button"
              onClick={() => onOpenResource('capability')}
              className="text-left text-white/80 hover:text-white transition-colors"
            >
              Printable Capability Overview
            </button>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="text-left text-white/80 hover:text-white transition-colors font-bold mt-1 text-[#8CBB5D]"
            >
              Contact Consultation Team →
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-8 text-center sm:text-left text-[11px] text-white/70 leading-relaxed max-w-3xl">
          AERA is an independent civic technology initiative. It is not affiliated with or endorsed by President Barack Obama, the Obama Foundation, FEMA, or the White House.
        </div>
      </div>
    </footer>
  );
};
