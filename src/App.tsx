import React, { lazy, Suspense, useState } from 'react';
import { AeraLogo } from './components/AeraLogo';
import { ConsultationModal } from './components/ConsultationModal';
import { TrustResourceModal } from './components/TrustResourceModal';
import { AeraPresentationModal } from './components/AeraPresentationModal';
import { EnterpriseSection } from './components/EnterpriseSection';
import { TrustResourceKey } from './types';
import { giftLegacyImage } from './assets/giftLegacyImage';
import { threeKingsLegacyImage } from './assets/threeKingsLegacyImage';
import { palletsLegacyImage } from './assets/palletsLegacyImage';
import { podModelImage } from './assets/podModelImage';
const Simulator = lazy(() => import('./components/AeraAppSimulator').then(m => ({ default: m.AeraAppSimulator })));

export default function App() {
  const [menu, setMenu] = useState(false);
  const [demo, setDemo] = useState(false);
  const [consultation, setConsultation] = useState(false);
  const [topic, setTopic] = useState('Pilot deployment');
  const [presentation, setPresentation] = useState(false);
  const [resource, setResource] = useState<TrustResourceKey | null>(null);
  const discuss = (value = 'Pilot deployment') => { setTopic(value); setConsultation(true); };
  const links = [['Story', '#legacy'], ['Leadership', '#founders'], ['Platform', '#platform'], ['Trust', '#trust']];
  return <div className="editorial-site">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="editorial-header"><div className="editorial-wrap nav-inner">
      <a href="#top" className="brand" aria-label="AERA home"><AeraLogo size={36}/><span>AERA</span></a>
      <button className="menu-toggle" aria-expanded={menu} aria-controls="site-navigation" onClick={() => setMenu(!menu)}>{menu ? 'Close' : 'Menu'}</button>
      <nav id="site-navigation" className={menu ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}
        <button className="editorial-button" onClick={() => { setMenu(false); discuss(); }}>Discuss a Pilot <span aria-hidden="true">↗</span></button>
      </nav>
    </div></header>
    <main id="main-content" tabIndex={-1}>
      <section id="top" className="editorial-hero"><div className="editorial-wrap">
        <p className="editorial-label">AERA / Emergency readiness & coordination</p>
        <h1>Make preparedness visible <em>before the crisis.</em></h1>
        <div className="hero-bottom"><p>A shared picture of people, needs, and resources—connecting households, community hubs, and institutions when coordination matters most.</p>
        <div className="hero-actions"><button className="editorial-button" onClick={() => discuss()}>Discuss a Pilot <span aria-hidden="true">↗</span></button><a className="editorial-link" href="#platform">Explore the Platform <span aria-hidden="true">↓</span></a></div></div>
        <div className="hero-rule"><span>Built around people.</span><span>Designed for coordinated action.</span></div>
      </div></section>
      <section id="legacy" className="editorial-section story-section"><div className="editorial-wrap">
        <div className="editorial-split"><div><p className="editorial-label">01 / The field story</p><h2>Experience shaped<br/>the mission.</h2></div><div className="editorial-copy"><p>During the Hurricane Katrina response in 2005, Kenneth Brewer saw how fragmented information and disconnected relief efforts could prolong a crisis.</p><p>His work with families and communities shaped AERA’s founding question: how can people move from knowing something happened to knowing what happens next?</p><p>AERA brings that experience into a shared system for readiness, response, and recovery.</p></div></div>
        <div className="field-grid">{[
          [giftLegacyImage, 'G.I.F.T.', 'Giving Inspires Families Today', 'Family-centered relief and practical support for children and households affected by disaster.'],
          [threeKingsLegacyImage, 'Three Kings Day', 'Puerto Rico', 'Community visits and cultural celebration built relationships with families during recovery.'],
          [palletsLegacyImage, 'Pallets of Pride', 'Recovery infrastructure', 'A concept for repurposing damaged logistics materials into useful community resources.'],
        ].map(([src, title, subtitle, text]) => <figure key={title}><div className="archive-image"><img src={src} alt={`${title} archival field material`} loading="lazy"/></div><figcaption><p className="editorial-label">{subtitle}</p><h3>{title}</h3><p>{text}</p></figcaption></figure>)}</div>
      </div></section>
      <section id="founders" className="editorial-section leadership-section"><div className="editorial-wrap"><p className="editorial-label">02 / Leadership</p><h2>The people behind AERA.</h2><div className="leader-grid">
        <article><span className="leader-index">01</span><h3>Kenneth Brewer</h3><p className="leader-role">Founder & Chief Executive</p><p>Originated AERA’s founding vision and response model. Leads the mission, strategic partnerships, and institutional growth, grounded in years of field experience.</p></article>
        <article><span className="leader-index">02</span><h3>Antoinette Williams</h3><p className="leader-role">Co-Founder & Chief Product & Systems Architect</p><p>Leads product architecture, workflows, user experience, and platform engineering. Turned the founding vision into working technology and co-created AERA’s name and visual identity.</p></article>
      </div></div></section>
      <section id="platform" className="editorial-section"><div className="editorial-wrap"><div className="editorial-split"><div><p className="editorial-label">03 / How AERA works</p><h2>One connected<br/>operating picture.</h2></div><p className="editorial-copy">From a household’s request to a local distribution site, AERA connects the people responsible for the next step.</p></div>
        <div className="workflow-grid">{[['Prepare', 'Organize people, essential supplies, and readiness gaps.'], ['Report', 'Share safety status, location, and urgent needs.'], ['Coordinate', 'Align trusted updates, assignments, and resources.'], ['Recover', 'Track assistance, delivery, and follow-through.']].map(([title, text], i) => <article key={title}><span className="editorial-label">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <figure id="pod-model" className="pod-figure"><img src={podModelImage} alt="AERA POD model connecting household needs, the warehouse logistics hub, church oversight, and local distribution sites." loading="lazy"/><figcaption><strong>The POD model</strong><span>Households · Central logistics · Church hubs · Local distribution</span></figcaption></figure>
        <div id="app-simulator" className="demo-intro"><div><p className="editorial-label">Explore at your own pace</p><h3>See the experience in action.</h3><p>Interactive demonstration with sample data. No real emergency requests are submitted.</p></div><button className="editorial-button secondary" aria-expanded={demo} aria-controls="platform-demo" onClick={() => setDemo(!demo)}>{demo ? 'Close Demo −' : 'Explore Demo +'}</button></div>
        {demo && <div id="platform-demo" className="demo-panel"><Suspense fallback={<p role="status">Loading demonstration…</p>}><Simulator/></Suspense></div>}
      </div></section>
      <section id="trust" className="editorial-section trust-section"><div className="editorial-wrap"><div className="editorial-split"><div><p className="editorial-label">04 / Trust & governance</p><h2>Clarity before<br/>commitment.</h2></div><p className="editorial-copy">Evaluate capabilities, data responsibilities, and deployment requirements for your organization. Assurance requirements are reviewed for each institutional environment.</p></div><div className="trust-links">{([['security', 'Security & privacy', 'Access, data handling, and oversight'], ['recovery', 'Operational continuity', 'Storage and service dependencies'], ['accessibility', 'Accessible design', 'Navigation, readability, and assistive use'], ['capability', 'Deployment overview', 'Scope, training, and administration']] as [TrustResourceKey, string, string][]).map(([key, title, text]) => <button key={key} onClick={() => setResource(key)}><span><strong>{title}</strong><small>{text}</small></span><span aria-hidden="true">↗</span></button>)}</div></div></section>
      <section id="enterprise" className="editorial-section pilot-section"><div className="editorial-wrap"><p className="editorial-label">05 / Start with a pilot</p><h2>A focused first step.<br/><em>A clear path forward.</em></h2><p className="pilot-copy">Define one use case, agree on success measures, and evaluate AERA in a controlled scope before expanding.</p><button className="editorial-button" onClick={() => discuss()}>Discuss a Pilot <span aria-hidden="true">↗</span></button><details className="planning-details"><summary>Explore deployment options & planning ranges</summary><EnterpriseSection onOpenConsultation={discuss}/></details></div></section>
    </main>
    <footer className="editorial-footer"><div className="editorial-wrap"><div className="footer-top"><a href="#top" className="brand"><AeraLogo size={32}/><span>AERA</span></a><p>Accelerated Emergency Response</p><button className="editorial-link" onClick={() => setPresentation(true)}>View Executive Presentation ↗</button></div><div className="footer-bottom"><span>© {new Date().getFullYear()} AERA</span><button onClick={() => setResource('accessibility')}>Accessibility</button><button onClick={() => setResource('security-contact')}>Security contact</button></div><p className="footer-disclaimer">AERA is an independent civic technology initiative. It is not affiliated with or endorsed by President Barack Obama, the Obama Foundation, FEMA, or the White House.</p></div></footer>
    <ConsultationModal isOpen={consultation} onClose={() => setConsultation(false)} initialTopic={topic}/>
    <TrustResourceModal resourceKey={resource} onClose={() => setResource(null)}/>
    <AeraPresentationModal isOpen={presentation} onClose={() => setPresentation(false)}/>
  </div>;
}
