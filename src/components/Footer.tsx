import React from 'react';
import { MonitorPlay } from 'lucide-react';
import { AeraLogo } from './AeraLogo';
import { TrustResourceKey } from '../types';

interface FooterProps {
  onOpenResource: (key: TrustResourceKey) => void;
  onOpenConsultation: () => void;
  onOpenPresentation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenResource,
  onOpenConsultation,
  onOpenPresentation,
}) => {
  return (
    <footer className="bg-[#305854] pb-10 pt-16 text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-white/20 pb-12 md:grid-cols-12">
          <div className="flex flex-col gap-4 md:col-span-5">
            <div className="flex items-center gap-3">
              <AeraLogo size={48} bgWhite />
              <div>
                <strong className="block text-2xl font-black leading-none tracking-widest text-white">AERA</strong>
                <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-white/80">
                  Accelerated Emergency Response
                </span>
              </div>
            </div>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/90 sm:text-sm">
              Prepare. Report. Coordinate. Recover. Mobile-first emergency readiness and response coordination shaped by Kenneth Brewer’s founding vision.
            </p>
            <button
              type="button"
              onClick={onOpenPresentation}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-[#8CBB5D]/40 bg-[#8CBB5D]/12 px-4 py-2 text-xs font-black text-[#B9E58B] transition-all hover:-translate-y-0.5 hover:bg-[#8CBB5D]/20"
            >
              <MonitorPlay size={16} />
              View Executive Presentation
            </button>
          </div>

          <div className="flex flex-col gap-3 text-sm md:col-span-3">
            <strong className="text-xs font-extrabold uppercase tracking-widest text-[#8CBB5D]">Explore</strong>
            <a href="#genesis" className="text-white/80 transition-colors hover:text-white">Founding Vision</a>
            <a href="#legacy" className="text-white/80 transition-colors hover:text-white">Mission &amp; Field Legacy</a>
            <a href="#founders" className="text-white/80 transition-colors hover:text-white">Founder Leadership</a>
            <a href="#app-simulator" className="text-white/80 transition-colors hover:text-white">Live App Experience</a>
            <a href="#platform" className="text-white/80 transition-colors hover:text-white">Platform Workflows</a>
            <a href="#trust" className="text-white/80 transition-colors hover:text-white">Trust &amp; Governance</a>
          </div>

          <div className="flex flex-col gap-3 text-sm md:col-span-4">
            <strong className="text-xs font-extrabold uppercase tracking-widest text-[#8CBB5D]">Resources</strong>
            <button
              type="button"
              onClick={() => onOpenResource('accessibility')}
              className="text-left text-white/80 transition-colors hover:text-white"
            >
              Accessibility Statement
            </button>
            <button
              type="button"
              onClick={() => onOpenResource('security-contact')}
              className="text-left text-white/80 transition-colors hover:text-white"
            >
              Security Contact
            </button>
            <button
              type="button"
              onClick={() => onOpenResource('capability')}
              className="text-left text-white/80 transition-colors hover:text-white"
            >
              Printable Capability Overview
            </button>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="mt-1 text-left font-bold text-[#8CBB5D] transition-colors hover:text-[#B9E58B]"
            >
              Contact Consultation Team →
            </button>
          </div>
        </div>

        <div className="max-w-3xl pt-8 text-center text-[11px] leading-relaxed text-white/70 sm:text-left">
          AERA is an independent civic technology initiative. It is not affiliated with or endorsed by President Barack Obama, the Obama Foundation, FEMA, or the White House.
        </div>
      </div>
    </footer>
  );
};
