import React, { useState, useEffect } from 'react';
import { ConsultationFormState } from '../types';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialTopic = '',
}) => {
  const [form, setForm] = useState<ConsultationFormState>({
    name: '',
    organization: '',
    role: '',
    email: '',
    message: initialTopic ? `I would like to discuss: ${initialTopic}.` : '',
    consent: false,
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (initialTopic) {
      setForm((prev) => ({
        ...prev,
        message: `I would like to discuss: ${initialTopic}.`,
      }));
    }
  }, [initialTopic]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      setSubmitted(false);
      setErrorMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.organization || !form.email || !form.consent) {
      setErrorMsg('Please complete all required fields and check the consent box.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

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

        {!submitted ? (
          <div>
            <span className="eyebrow">AERA Consultation</span>
            <h2 className="text-2xl sm:text-4xl font-black text-black mt-2">
              Discuss Your Use Case
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 mt-2">
              Speak with our deployment team regarding readiness assessments, pilots, or enterprise institutional rollouts.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#305854] mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Full Name"
                  className="w-full p-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#305854]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#305854] mb-1">Organization *</label>
                <input
                  type="text"
                  required
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  placeholder="Agency / School / Company"
                  className="w-full p-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#305854]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#305854] mb-1">Role / Title</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Director / Coordinator"
                  className="w-full p-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#305854]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#305854] mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@organization.gov"
                  className="w-full p-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#305854]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#305854] mb-1">Message</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your emergency readiness requirements..."
                  className="w-full p-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#305854]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-start gap-2.5 text-xs text-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-0.5 rounded text-[#305854]"
                  />
                  <span>
                    I understand this demo simulation prepares a consultation brief for evaluation.
                  </span>
                </label>
              </div>

              {errorMsg && (
                <div className="sm:col-span-2 p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-bold flex items-center gap-2">
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}

              <div className="sm:col-span-2 mt-2">
                <button type="submit" className="btn btn-primary w-full py-3">
                  Submit Consultation Request
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#EEF6F0] text-[#305854] flex items-center justify-center">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-black text-black">Request Form Received</h3>
            <p className="text-sm text-neutral-800 max-w-md leading-relaxed">
              Thank you, <strong>{form.name}</strong> from <strong>{form.organization}</strong>. Your consultation request for AERA platform deployment has been logged.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-primary text-sm py-2.5 px-6 mt-2"
            >
              Return to Platform
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
