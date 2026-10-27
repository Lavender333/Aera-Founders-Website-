import React, { useEffect, useRef, useState } from 'react';
import { X, Download } from 'lucide-react';

interface ConsultationModalProps { isOpen: boolean; onClose: () => void; initialTopic?: string; }
export const ConsultationModal: React.FC<ConsultationModalProps> = ({isOpen,onClose,initialTopic=''}) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [organization,setOrganization] = useState('');
  const [message,setMessage] = useState('');
  const [downloaded,setDownloaded] = useState(false);
  useEffect(()=>{
    const node=dialog.current;
    if(isOpen){ setDownloaded(false); node?.showModal(); document.body.classList.add('modal-open'); }
    else { node?.close(); document.body.classList.remove('modal-open'); }
    return ()=>document.body.classList.remove('modal-open');
  },[isOpen]);
  function download(event:React.FormEvent){
    event.preventDefault();
    const brief=`AERA PILOT DISCUSSION BRIEF\n\nOrganization: ${organization.trim()}\nInterest: ${initialTopic || 'Pilot deployment'}\n\nObjectives & scope\n${message.trim()}\n\nDiscussion checklist\n- Define one use case and the people involved.\n- Agree on measurable success criteria.\n- Review data, integration, and training needs.\n- Confirm scope, timing, and costs.\n\nPrepared locally. This brief has not been sent to AERA.\nPlatform: https://getaeraapp.com\n`;
    const url=URL.createObjectURL(new Blob([brief],{type:'text/plain;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download='AERA-Pilot-Brief.txt';link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);setDownloaded(true);
  }
  return <dialog ref={dialog} className="pilot-dialog" aria-labelledby="pilot-dialog-title" onCancel={onClose} onClick={event=>{if(event.target===dialog.current)onClose();}}>
    <div className="pilot-dialog-content">
      <button type="button" className="dialog-close" onClick={onClose} aria-label="Close pilot brief"><X size={20}/></button>
      <p className="editorial-label">Start a focused conversation</p><h2 id="pilot-dialog-title">Plan your pilot.</h2>
      <p className="dialog-intro">Outline your priorities and save a brief to share with your AERA contact.</p>
      <form onSubmit={download}>
        <label htmlFor="pilot-organization">Organization</label><input id="pilot-organization" autoComplete="organization" value={organization} onChange={e=>setOrganization(e.target.value)} placeholder="Your organization" required maxLength={200}/>
        <label htmlFor="pilot-objective">What would you like to accomplish?</label><textarea id="pilot-objective" value={message} onChange={e=>setMessage(e.target.value)} rows={5} placeholder="Your use case, community, location, and intended scope…" required maxLength={5000}/>
        <p className="brief-privacy">Your entries stay in this page. Downloading creates a file on your device; it does not submit an inquiry.</p>
        <button className="editorial-button" type="submit"><Download size={17} aria-hidden="true"/>Download Pilot Brief</button>
        {downloaded && <p className="brief-status" role="status">Your brief is ready to save. Share the downloaded file with your AERA contact when you’re ready.</p>}
      </form>
      <a className="editorial-link" href="https://getaeraapp.com">Explore Aera <span aria-hidden="true">↗</span></a>
    </div>
  </dialog>;
};
