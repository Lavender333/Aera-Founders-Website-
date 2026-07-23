import React from 'react';
import { AeraLogo } from './AeraLogo';

interface ClosingSectionProps {
  onOpenConsultation: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-[#305854] text-white rounded-[36px] p-8 sm:p-16 shadow-2xl flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
          <AeraLogo size={64} bgWhite />

          <span className="text-[#8CBB5D] font-black text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-white/10">
            The Public Purpose
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight max-w-2xl">
            Clear information creates coordinated action.
          </h2>

          <p className="text-base sm:text-xl text-white/90 max-w-xl leading-relaxed">
            AERA empowers households, community groups, and institutions to prepare, report, coordinate, and recover through disruption.
          </p>

          <button
            type="button"
            onClick={onOpenConsultation}
            className="btn bg-white text-[#305854] hover:bg-[#F3F8F5] text-base font-extrabold py-4 px-8 mt-2 shadow-lg"
          >
            Discuss AERA Deployment
          </button>
        </div>
      </div>
    </section>
  );
};
