import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onDismiss: () => void;
  registeredCount?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDismiss }) => {
  const enterButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => enterButtonRef.current?.focus(), 250);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Escape') onDismiss();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onDismiss]);

  return (
    <motion.div
      className="aera-splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="aeraSplashTitle"
      aria-describedby="aeraSplashDescription"
    >
      <style>{`
        .aera-splash {
          position: fixed;
          inset: 0;
          z-index: 20000;
          display: grid;
          place-items: center;
          min-height: 100svh;
          padding: 28px;
          overflow: auto;
          isolation: isolate;
          color: #fff;
          background:
            radial-gradient(circle at 50% 30%, rgba(125,207,194,.19), transparent 24%),
            radial-gradient(circle at 14% 86%, rgba(216,189,145,.12), transparent 25%),
            radial-gradient(circle at 87% 78%, rgba(86,154,141,.13), transparent 27%),
            linear-gradient(145deg, #0b2927 0%, #16413d 48%, #071f1e 100%);
        }
        .aera-splash::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(circle at center, #000, transparent 72%);
          animation: aera-splash-grid-drift 22s linear infinite;
        }
        .aera-splash-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(0,0,0,.08), transparent 24%, transparent 76%, rgba(0,0,0,.22));
        }
        .aera-splash-orbit {
          position: absolute;
          left: 50%;
          top: 42%;
          width: min(820px, 78vw);
          aspect-ratio: 1;
          border: 1px solid rgba(169,221,212,.08);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 0 90px rgba(169,221,212,.018), 0 0 0 180px rgba(216,189,145,.012);
          animation: aera-splash-orbit-breathe 8s ease-in-out infinite;
        }
        .aera-splash-inner {
          position: relative;
          z-index: 1;
          width: min(980px, 100%);
          text-align: center;
        }
        .aera-splash-mark {
          position: relative;
          width: 104px;
          height: 116px;
          display: grid;
          place-items: center;
          margin: 0 auto 20px;
          border: 2px solid rgba(255,255,255,.72);
          border-radius: 58px 58px 44px 44px;
          box-shadow: 0 0 0 10px rgba(255,255,255,.04), 0 25px 55px rgba(0,0,0,.22);
          animation: aera-splash-pulse 4.5s ease-in-out infinite, aera-splash-float 6s ease-in-out infinite;
        }
        .aera-splash-mark::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -13px;
          width: 26px;
          height: 26px;
          border-right: 2px solid #cda76d;
          border-bottom: 2px solid #cda76d;
          transform: translateX(-50%) rotate(45deg);
          background: #183936;
        }
        .aera-splash-logo {
          position: relative;
          z-index: 2;
          width: 86px;
          height: 96px;
          filter: drop-shadow(0 9px 18px rgba(0,0,0,.22));
        }
        .aera-splash-brand {
          display: grid;
          justify-items: center;
          gap: 5px;
          margin: 0 auto 14px;
        }
        .aera-splash-name {
          color: #fff;
          font: 900 clamp(1.35rem, 2.4vw, 1.8rem)/1 system-ui, sans-serif;
          letter-spacing: .25em;
          text-indent: .25em;
        }
        .aera-splash-expanded {
          color: #9dd5cd;
          font: 800 clamp(.72rem, 1.4vw, .88rem)/1.35 system-ui, sans-serif;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .aera-splash h1 {
          max-width: 920px;
          margin: 22px auto 0;
          color: #fff !important;
          font-family: Georgia, "Times New Roman", serif !important;
          font-size: clamp(3.6rem, 7.2vw, 6.6rem);
          font-weight: 500 !important;
          line-height: .9;
          letter-spacing: -.055em;
          text-wrap: balance;
          animation: aera-splash-title-in .9s .18s cubic-bezier(.16,1,.3,1) both;
        }
        .aera-splash h1 span { display: block; color: inherit !important; }
        .aera-splash h1 .aera-splash-headline-accent {
          margin-top: .08em;
          color: #a9ddd4 !important;
          font-style: italic;
        }
        .aera-splash-status {
          display: grid;
          gap: 12px;
          width: min(650px, 100%);
          margin: 26px auto 0;
        }
        .aera-splash-live {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          color: #d8bd91;
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .2em;
          text-transform: uppercase;
        }
        .aera-splash-live i {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #9dd5cd;
          box-shadow: 0 0 0 7px rgba(157,213,205,.1);
          animation: aera-splash-live-pulse 1.8s ease-in-out infinite;
        }
        .aera-splash-flow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 2vw, 20px);
          color: #fff;
          font-size: clamp(.72rem, 1.5vw, .9rem);
          font-weight: 900;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .aera-splash-flow span {
          opacity: 0;
          transform: translateY(8px);
          animation: aera-splash-step-in .5s cubic-bezier(.16,1,.3,1) forwards;
        }
        .aera-splash-flow span:nth-of-type(1) { animation-delay: .8s; }
        .aera-splash-flow span:nth-of-type(2) { animation-delay: 1.2s; }
        .aera-splash-flow span:nth-of-type(3) { animation-delay: 1.6s; }
        .aera-splash-flow span:nth-of-type(4) {
          color: #9dd5cd;
          animation: aera-splash-step-in .5s 2s cubic-bezier(.16,1,.3,1) forwards, aera-splash-recover-glow 2.2s 2.7s ease-in-out infinite;
        }
        .aera-splash-flow i {
          color: #d8bd91;
          font-size: 1.05rem;
          font-style: normal;
          opacity: 0;
          transform: translateX(-8px);
          animation: aera-splash-arrow-in .38s cubic-bezier(.16,1,.3,1) forwards;
        }
        .aera-splash-flow i:nth-of-type(1) { animation-delay: 1.02s; }
        .aera-splash-flow i:nth-of-type(2) { animation-delay: 1.42s; }
        .aera-splash-flow i:nth-of-type(3) { animation-delay: 1.82s; }
        .aera-splash-enter {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-width: 190px;
          min-height: 56px;
          margin-top: 32px;
          padding: 0 28px;
          border: 1px solid rgba(255,255,255,.32);
          border-radius: 999px;
          background: #fff;
          color: #305854;
          font: 900 .82rem/1 system-ui, sans-serif;
          letter-spacing: .13em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 18px 44px rgba(0,0,0,.24), inset 0 0 0 1px rgba(255,255,255,.4);
          transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
        }
        .aera-splash-enter::before {
          content: "";
          position: absolute;
          inset: -2px auto -2px -45%;
          width: 30%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.72), transparent);
          transform: skewX(-18deg);
          animation: aera-splash-button-sheen 5s 2.8s ease-in-out infinite;
        }
        .aera-splash-enter::after { content: "→"; font-size: 1.05rem; }
        .aera-splash-enter:hover {
          transform: translateY(-3px);
          background: #f4eee4;
          box-shadow: 0 24px 54px rgba(0,0,0,.28);
        }
        .aera-splash-enter:focus-visible { outline: 3px solid #d8bd91; outline-offset: 5px; }
        .aera-splash-credit {
          display: block;
          margin-top: 24px;
          color: rgba(255,255,255,.56);
          font-size: .67rem;
          font-weight: 800;
          letter-spacing: .17em;
          text-transform: uppercase;
        }
        @keyframes aera-splash-grid-drift { to { background-position: 72px 72px; } }
        @keyframes aera-splash-orbit-breathe { 0%,100% { opacity:.55; scale:.96; } 50% { opacity:1; scale:1.03; } }
        @keyframes aera-splash-float { 0%,100% { translate:0 0; } 50% { translate:0 -7px; } }
        @keyframes aera-splash-title-in { from { opacity:0; translate:0 18px; filter:blur(5px); } to { opacity:1; translate:0 0; filter:blur(0); } }
        @keyframes aera-splash-button-sheen { 0%,62% { left:-45%; } 82%,100% { left:125%; } }
        @keyframes aera-splash-pulse {
          0%,100% { transform:scale(1); box-shadow:0 0 0 10px rgba(255,255,255,.04), 0 25px 55px rgba(0,0,0,.22); }
          50% { transform:scale(1.045); box-shadow:0 0 0 17px rgba(157,213,205,.07), 0 30px 65px rgba(0,0,0,.26); }
        }
        @keyframes aera-splash-live-pulse { 0%,100% { transform:scale(1); opacity:.72; } 50% { transform:scale(1.45); opacity:1; } }
        @keyframes aera-splash-step-in { to { opacity:1; transform:translateY(0); } }
        @keyframes aera-splash-arrow-in { to { opacity:1; transform:translateX(0); } }
        @keyframes aera-splash-recover-glow { 0%,100% { text-shadow:0 0 0 rgba(157,213,205,0); } 50% { text-shadow:0 0 18px rgba(157,213,205,.72); } }
        @media (max-width: 640px) {
          .aera-splash { padding: 22px; }
          .aera-splash-mark { width: 82px; height: 92px; margin-bottom: 17px; }
          .aera-splash-logo { width: 70px; height: 80px; }
          .aera-splash-brand { margin-bottom: 12px; }
          .aera-splash-expanded { max-width: 29ch; letter-spacing: .11em; }
          .aera-splash h1 { margin-top: 18px; font-size: clamp(2.75rem, 13vw, 4.25rem); line-height: .92; }
          .aera-splash-status { margin-top: 23px; }
          .aera-splash-flow { gap: 7px; font-size: .59rem; letter-spacing: .045em; }
          .aera-splash-flow i { font-size: .84rem; }
          .aera-splash-enter { margin-top: 28px; }
          .aera-splash-credit { font-size: .58rem; letter-spacing: .12em; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aera-splash::before, .aera-splash-orbit, .aera-splash-mark, .aera-splash h1,
          .aera-splash-live i, .aera-splash-flow span, .aera-splash-flow i, .aera-splash-enter::before { animation: none; }
          .aera-splash-flow span, .aera-splash-flow i { opacity: 1; transform: none; }
          .aera-splash-enter { transition: none; }
        }
      `}</style>

      <div className="aera-splash-overlay" aria-hidden="true" />
      <div className="aera-splash-orbit" aria-hidden="true" />

      <div className="aera-splash-inner">
        <div className="aera-splash-mark" aria-hidden="true">
          <svg className="aera-splash-logo" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="legacyShield" x1="28" y1="20" x2="168" y2="188" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2E6252" />
                <stop offset="1" stopColor="#15362E" />
              </linearGradient>
              <linearGradient id="legacySwoosh" x1="20" y1="55" x2="174" y2="160" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9DD5CD" />
                <stop offset=".5" stopColor="#7CC344" />
                <stop offset="1" stopColor="#2E8047" />
              </linearGradient>
            </defs>
            <path d="M100 18C139 18 165 36 165 88C165 142 128 182 100 194C72 182 35 142 35 88C35 36 61 18 100 18Z" fill="url(#legacyShield)" stroke="#D8BD91" strokeWidth="4" />
            <path d="M100 32C130 32 151 47 151 88C151 129 121 161 100 171C79 161 49 129 49 88C49 47 70 32 100 32Z" stroke="#9DD5CD" strokeWidth="3" opacity=".72" />
            <path d="M56 119L82 87C87 81 93 81 98 87L110 101L127 76C132 68 140 69 145 77" stroke="#EAF7F3" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M23 120C22 83 60 51 119 43C167 36 185 61 166 89C145 120 87 147 38 136C28 134 22 128 23 120Z" fill="url(#legacySwoosh)" />
            <path d="M36 114C55 77 112 54 156 62C169 64 164 79 149 96C126 121 77 136 42 126" stroke="#D9F7C6" strokeWidth="3" strokeLinecap="round" opacity=".8" />
          </svg>
        </div>

        <div className="aera-splash-brand">
          <span className="aera-splash-name">AERA</span>
          <span className="aera-splash-expanded">Accelerated Emergency Response App</span>
        </div>

        <h1 id="aeraSplashTitle">
          <span>Communication</span>
          <span className="aera-splash-headline-accent">must continue.</span>
        </h1>

        <div className="aera-splash-status" id="aeraSplashDescription">
          <span className="aera-splash-live"><i aria-hidden="true" />Live emergency status</span>
          <div className="aera-splash-flow" aria-label="Prepare, Report, Coordinate, Recover">
            <span>Prepare</span><i aria-hidden="true">→</i>
            <span>Report</span><i aria-hidden="true">→</i>
            <span>Coordinate</span><i aria-hidden="true">→</i>
            <span>Recover</span>
          </div>
        </div>

        <button ref={enterButtonRef} className="aera-splash-enter" type="button" onClick={onDismiss}>
          Enter AERA
        </button>
        <small className="aera-splash-credit">Founder Kenneth Brewer</small>
      </div>
    </motion.div>
  );
};
