import React, { useEffect } from 'react';
import { TrustResourceKey, TrustResourceItem } from '../types';
import { X, Printer, Shield, RefreshCw, Eye, PhoneCall, FileText } from 'lucide-react';

interface TrustResourceModalProps {
  resourceKey: TrustResourceKey | null;
  onClose: () => void;
}

export const TrustResourceModal: React.FC<TrustResourceModalProps> = ({
  resourceKey,
  onClose,
}) => {
  const resourceData: Record<TrustResourceKey, TrustResourceItem> = {
    security: {
      label: 'Security & Privacy',
      title: 'High-Assurance Security Model',
      body: 'AERA evaluates security through strict role-based access controls, encrypted data storage, continuous monitoring, and structured incident escalation.',
      items: [
        'Identity & Role-Based Access Controls (RBAC)',
        'Local encrypted queue for offline device storage',
        'Routine threat modeling and automated dependency security scans',
        'Defined emergency incident escalation and vulnerability reporting',
      ],
    },
    recovery: {
      label: 'Continuity & Resilience',
      title: 'Communication Continuity',
      body: 'AERA is architected to operate during degraded network environments, severe power interruptions, and emergency infrastructure failures.',
      items: [
        'Local IndexedDB offline record buffering',
        'Automatic incremental synchronization upon network restoration',
        'Minimal payload bandwidth overhead for low-bitrate connections',
        'Redundant distributed cloud infrastructure',
      ],
    },
    accessibility: {
      label: 'Inclusive Design',
      title: 'Accessible Product Standard',
      body: 'AERA prioritizes accessible design so everyone — regardless of device, visual acuity, or motor capability — can access critical safety workflows.',
      items: [
        'WCAG 2.1 AA compliant color contrast ratio throughout',
        'Full keyboard navigation and visible focus rings',
        'Native screen reader support with semantic ARIA landmarks',
        'Respects OS settings for reduced motion and high contrast',
      ],
    },
    'security-contact': {
      label: 'Security Office',
      title: 'Responsible Disclosure & Contact',
      body: 'A dedicated security channel allows researchers and emergency partners to report vulnerabilities or request technical auditing materials.',
      items: [
        'Monitored security response email: security@getaeraapp.com',
        'PGP key availability for encrypted communication',
        '72-hour acknowledgment SLA for security inquiries',
        'Safe harbor policy for authorized security research',
      ],
    },
    capability: {
      label: 'Institutional Overview',
      title: 'AERA Capability Brief',
      body: 'A comprehensive summary of AERA’s core architecture, readiness tools, and institutional deployment path.',
      items: [
        'Household readiness, contacts, and supply gap tracking',
        'One-click emergency status reporting (Safe / Need Help)',
        'Community group broadcasts & safety roll call dashboards',
        'Offline resilience, supply logistics, and multi-agency governance',
      ],
      actions: 'print',
    },
  };

  useEffect(() => {
    if (resourceKey) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [resourceKey]);

  if (!resourceKey) return null;

  const item = resourceData[resourceKey];

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[32px] border border-[rgba(48,88,84,0.18)] p-6 sm:p-10 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div>
          <span className="eyebrow">{item.label}</span>
          <h2 className="text-2xl sm:text-3xl font-black text-black mt-2">
            {item.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-800 mt-3 leading-relaxed">
            {item.body}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            {item.items.map((it, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#F3F8F5] border border-[rgba(48,88,84,0.15)] flex items-start gap-3 text-xs sm:text-sm font-semibold text-black">
                <span className="w-5 h-5 rounded-full bg-[#305854] text-white flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5 font-bold">
                  0{idx + 1}
                </span>
                <span>{it}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-neutral-100 text-xs text-neutral-700 leading-snug">
            <strong>Institutional Note:</strong> Deployment specifications and assurance documentation are customized for each enterprise partner.
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-200">
            {item.actions === 'print' && (
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-primary text-xs py-2.5 px-5 flex items-center gap-2"
              >
                <Printer size={16} /> Print / Save Capability PDF
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary text-xs py-2.5 px-5 ml-auto"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
