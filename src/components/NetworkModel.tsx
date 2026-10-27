import React from 'react';
import { Building2, Boxes, Home, Network } from 'lucide-react';

export function NetworkModel() {
  return <div className="network-model" aria-label="AERA coordination model">
    <div className="network-caption"><span className="editorial-label">The POD model</span><span>From need to fulfillment</span></div>
    <div className="network-platform"><Network size={26} aria-hidden="true"/><div><h3>AERA</h3><p>A shared view of household needs, inventory, and distribution.</p></div></div>
    <ol className="network-steps">
      {[
        {icon:Home, title:'Households', text:'Share needs and safety status.'},
        {icon:Building2, title:'Church hub', text:'Coordinate oversight and local response.'},
        {icon:Boxes, title:'Central logistics', text:'Match supply and replenishment to demand.'},
        {icon:Building2, title:'Local POD sites', text:'Organize distribution and track fulfillment.'},
      ].map(({icon:Icon,title,text},i)=><li key={title}><span className="network-step-number">0{i+1}</span><Icon size={26} strokeWidth={1.3} aria-hidden="true"/><h4>{title}</h4><p>{text}</p></li>)}
    </ol>
    <p className="network-note">POD means point of distribution. Updates connect local activity with the shared operating picture.</p>
  </div>;
}

export function HeroNetwork() {
  return <div className="hero-network" aria-hidden="true">
    <svg viewBox="0 0 600 160" fill="none"><g stroke="currentColor" strokeWidth="1"><path d="M30 80H190L300 25L410 80H570M190 80L300 135L410 80M190 80H410"/><circle cx="300" cy="80" r="47" opacity=".22"/><circle cx="300" cy="80" r="66" opacity=".1"/></g><g fill="currentColor">{[[30,80],[190,80],[300,25],[300,80],[300,135],[410,80],[570,80]].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r={i===3?7:4} className="network-dot" style={{animationDelay:`${i*.28}s`}}/>)}</g></svg>
    <span>People. Resources. Shared understanding.</span>
  </div>;
}
