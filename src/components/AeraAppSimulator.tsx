import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Shield, Radio, Users, Package, WifiOff, Check, AlertCircle, RefreshCw,
  Search, MapPin, Send, Plus, Trash2, ArrowRight, Bell, Phone, Eye,
  Lock, AlertTriangle, Play, Pause, Compass, Zap, Flame, HeartPulse,
  Home as HomeIcon, Settings as SettingsIcon, FileText, CheckCircle2, ChevronRight, UserCheck, ShieldAlert
} from 'lucide-react';
import {
  AeraUserRole, MemberRecord, HubInventory, BroadcastMessage, HouseholdMember
} from '../types';
import {
  INITIAL_CHILD_ORGS, INITIAL_MEMBERS, INITIAL_HUB_INVENTORY, INITIAL_BROADCASTS
} from '../data/aeraData';
import { soundEngine } from '../utils/audio';

export const AeraAppSimulator: React.FC = () => {
  // Role & Presentation Mode
  const [currentRole, setCurrentRole] = useState<AeraUserRole>('MEMBER');
  const [presentationMode, setPresentationMode] = useState<boolean>(true);

  // Active Member Tab for Member View
  const [memberTab, setMemberTab] = useState<'home' | 'report' | 'settings' | 'recovery'>('home');

  // Active Org Command Center Tab for Admin Views
  const [adminTab, setAdminTab] = useState<'status' | 'preparedness' | 'inventory' | 'broadcast' | 'response' | 'users'>('status');

  // Response Sub-views
  const [responseSubView, setResponseSubView] = useState<'map' | 'population' | 'recovery' | 'drone' | 'assessment' | 'gaps'>('map');

  // Active Selected Location Context for Network Admin
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  // State for Members Data
  const [members, setMembers] = useState<MemberRecord[]>(INITIAL_MEMBERS);

  // State for Inventory Data
  const [inventories, setInventories] = useState<Record<string, HubInventory>>(INITIAL_HUB_INVENTORY);

  // State for Broadcasts
  const [broadcasts, setBroadcasts] = useState<BroadcastMessage[]>(INITIAL_BROADCASTS);

  // Active User Profile being simulated
  const [currentUser, setCurrentUser] = useState<MemberRecord>(INITIAL_MEMBERS[0]);

  // Report Wizard State (5 steps)
  const [reportStep, setReportStep] = useState<number>(1);
  const [reportSafety, setReportSafety] = useState<'safe' | 'in_danger'>('in_danger');
  const [reportLocation, setReportLocation] = useState<string>('742 Evergreen Terrace, Sector B');
  const [reportInjured, setReportInjured] = useState<boolean>(true);
  const [reportInjuryDesc, setReportInjuryDesc] = useState<string>('Minor cut on left arm, need bandage');
  const [reportNeeds, setReportNeeds] = useState<string[]>(['Urgent Medical', 'Oxygen / Power']);
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  // Search filter in Org Command
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Ping Notification Toast Message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected Member for Detail View Drawer
  const [selectedMember, setSelectedMember] = useState<MemberRecord | null>(null);

  // Broadcast Composer State
  const [broadcastTitle, setBroadcastTitle] = useState<string>('');
  const [broadcastBody, setBroadcastBody] = useState<string>('');
  const [broadcastScope, setBroadcastScope] = useState<string>('all');
  const [broadcastStep, setBroadcastStep] = useState<'compose' | 'review'>('compose');

  // Replenishment Request Modal State
  const [replenishOpen, setReplenishOpen] = useState<boolean>(false);
  const [replenishWater, setReplenishWater] = useState<number>(50);
  const [replenishFood, setReplenishFood] = useState<number>(40);

  // Drone Tasking State
  const [droneTargetAddress, setDroneTargetAddress] = useState<string>('742 Evergreen Terrace');
  const [droneSupplyType, setDroneSupplyType] = useState<string>('Oxygen / Battery Pack');
  const [droneStatus, setDroneStatus] = useState<'idle' | 'in_flight' | 'delivered'>('idle');

  // Damage Assessment Form
  const [assessAddress, setAssessAddress] = useState<string>('742 Evergreen Terrace');
  const [assessSeverity, setAssessSeverity] = useState<string>('Severe Structural & Utility Failure');
  const [assessSubmitted, setAssessSubmitted] = useState<boolean>(false);

  // Pending Signups List for System Admin
  const [pendingSignups, setPendingSignups] = useState([
    { id: 'p-1', email: 'john.doe@example.org', orgCode: 'CH-1234', date: '2026-07-22' },
    { id: 'p-2', email: 'clarissa.m@example.org', orgCode: 'NGO-9173', date: '2026-07-22' },
  ]);

  const showToast = (msg: string) => {
    soundEngine.playClick();
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Helper filter for location
  const filteredMembers = members.filter((m) => {
    const matchesLoc = selectedLocation === 'all' || m.childOrgId === selectedLocation;
    const matchesQuery =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.orgCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLoc && matchesQuery;
  });

  const inDangerCount = filteredMembers.filter((m) => m.safetyStatus === 'in_danger').length;
  const safeCount = filteredMembers.filter((m) => m.safetyStatus === 'safe').length;
  const unknownCount = filteredMembers.filter((m) => m.safetyStatus === 'unknown').length;

  const currentHubInventory = inventories[selectedLocation] || inventories['all'];

  // Handle Report Submit
  const handleReportSubmit = () => {
    soundEngine.playSuccess();
    const updatedUser: MemberRecord = {
      ...currentUser,
      safetyStatus: reportSafety,
      safetyNeeds: reportNeeds,
      lastKnownLocation: reportLocation,
      injuryNotes: reportInjured ? reportInjuryDesc : undefined,
    };
    setCurrentUser(updatedUser);
    setMembers((prev) => prev.map((m) => (m.id === currentUser.id ? updatedUser : m)));
    setReportSubmitted(true);
    showToast('Status & needs reported! Your Org Admin command view has been updated.');
  };

  // Handle Send Broadcast
  const handleSendBroadcast = () => {
    if (!broadcastTitle || !broadcastBody) return;
    soundEngine.playSuccess();
    const newB: BroadcastMessage = {
      id: `b-${Date.now()}`,
      senderName: currentRole === 'ORG_ADMIN' ? 'Network Command Center' : 'Institution Admin',
      orgScope: broadcastScope === 'all' ? 'All Connected Members' : broadcastScope,
      title: broadcastTitle,
      body: broadcastBody,
      timestamp: 'Just now',
      priority: 'urgent',
    };
    setBroadcasts([newB, ...broadcasts]);
    setBroadcastTitle('');
    setBroadcastBody('');
    setBroadcastStep('compose');
    showToast('Broadcast dispatched live across selected network scope!');
  };

  // Toggle Need Option in Report Wizard
  const toggleNeed = (need: string) => {
    soundEngine.playClick();
    if (reportNeeds.includes(need)) {
      setReportNeeds(reportNeeds.filter((n) => n !== need));
    } else {
      setReportNeeds([...reportNeeds, need]);
    }
  };

  // Handle Ping Member
  const handlePingMember = (memberName: string) => {
    showToast(`Status Ping sent to ${memberName}. Notification pushed to app.`);
  };

  // Handle Inventory Stock Edit
  const handleUpdateStock = (key: keyof HubInventory, delta: number) => {
    soundEngine.playClick();
    setInventories((prev) => {
      const target = prev[selectedLocation] || prev['all'];
      const updated = {
        ...target,
        [key]: Math.max(0, (target[key] as number) + delta),
        lastUpdated: 'Just now',
      };
      return { ...prev, [selectedLocation]: updated };
    });
  };

  const simRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: simRef,
    offset: ['start end', 'end start'],
  });

  const bgPulseY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={simRef} className="py-16 bg-[#0F172A] text-white border-y border-slate-800 relative overflow-hidden" id="app-simulator">
      {/* Decorative Glow Layer with Parallax */}
      <motion.div style={{ y: bgPulseY }} className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[120px]" />
      </motion.div>
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[120] bg-emerald-600 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 size={20} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8">
        {/* Header & Alignment Kicker */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                AERA Complete Guide Alignment
              </span>
              {presentationMode && (
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-xs font-bold flex items-center gap-1.5">
                  <Eye size={13} /> Presentation Mode Active
                </span>
              )}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Interactive AERA Platform Simulator
            </h2>
            <p className="text-slate-400 mt-2 max-w-3xl text-sm sm:text-base leading-relaxed">
              Experience the complete AERA application flows defined in the official AERA Application Guide — from member onboarding and emergency reporting to organization command center operations and UAV drone dispatch.
            </p>
          </div>

          {/* Role Persona Switcher */}
          <div className="bg-slate-900/90 p-2 rounded-2xl border border-slate-800 flex flex-wrap items-center gap-1.5 shrink-0">
            <span className="text-xs font-bold text-slate-400 px-3 uppercase tracking-wider">Role:</span>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setCurrentRole('MEMBER');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentRole === 'MEMBER'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Users size={14} /> All Members
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setCurrentRole('INSTITUTION_ADMIN');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentRole === 'INSTITUTION_ADMIN'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Shield size={14} /> Org Admin
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setCurrentRole('ORG_ADMIN');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentRole === 'ORG_ADMIN'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Radio size={14} /> Network Admin
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setCurrentRole('ADMIN');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentRole === 'ADMIN'
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Lock size={14} /> Admin Only
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROLE VIEW 1: ALL MEMBERS APP INTERFACE */}
        {/* ========================================================================= */}
        {currentRole === 'MEMBER' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Phone Container */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-[32px] p-4 sm:p-6 shadow-2xl">
              {/* App Navigation Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-base shadow-md">
                    A
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base leading-none">AERA Mobile App</h3>
                    <span className="text-[11px] text-emerald-400 font-medium">
                      Connected to NGO-9173 (Verified Hub)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setMemberTab('home');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      memberTab === 'home' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400'
                    }`}
                  >
                    Home
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setMemberTab('report');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
                      memberTab === 'report' ? 'bg-rose-600 text-white' : 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
                    }`}
                  >
                    <AlertCircle size={13} /> Report Status
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setMemberTab('settings');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      memberTab === 'settings' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400'
                    }`}
                  >
                    Settings
                  </button>
                </div>
              </div>

              {/* Broadcast Alert Banner */}
              {broadcasts.length > 0 && (
                <div className="mb-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-amber-200">
                  <Bell size={20} className="text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-amber-300 block font-bold text-sm">
                      {broadcasts[0].title}
                    </strong>
                    <p className="mt-1 leading-relaxed text-amber-200/90">{broadcasts[0].body}</p>
                    <span className="text-[10px] text-amber-400/80 block mt-1.5 font-mono">
                      From {broadcasts[0].senderName} • {broadcasts[0].timestamp}
                    </span>
                  </div>
                </div>
              )}

              {/* ----------------- MEMBER TAB 1: HOME ----------------- */}
              {memberTab === 'home' && (
                <div className="space-y-5">
                  {/* Household Readiness Score & Gap View */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                          SECTION 3 / PREPAREDNESS TRACKING
                        </span>
                        <h4 className="text-lg font-black text-white">Household Readiness Checklist</h4>
                      </div>
                      <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold">
                        {currentUser.readinessPercentage}% Ready
                      </span>
                    </div>

                    {/* Gap Flags List */}
                    <div className="space-y-2 mb-4">
                      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between text-xs text-amber-200">
                        <span className="flex items-center gap-2">
                          <AlertTriangle size={15} className="text-amber-400 shrink-0" />
                          Missing Emergency Contact Details
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            soundEngine.playClick();
                            setMemberTab('settings');
                          }}
                          className="px-2.5 py-1 bg-amber-600 text-white rounded-lg font-bold text-[11px]"
                        >
                          Fix Gap
                        </button>
                      </div>

                      <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-between text-xs text-rose-200">
                        <span className="flex items-center gap-2">
                          <HeartPulse size={15} className="text-rose-400 shrink-0" />
                          Oxygen Dependency (Backup Power Plan Required)
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            soundEngine.playClick();
                            setMemberTab('settings');
                          }}
                          className="px-2.5 py-1 bg-rose-600 text-white rounded-lg font-bold text-[11px]"
                        >
                          Review Plan
                        </button>
                      </div>
                    </div>

                    {/* Checklist Calculator Items */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-300">Water Supply</span>
                        <strong className="text-emerald-400">
                          {currentUser.preparedness.waterSupplyGal} Gal / 9 Gal Need
                        </strong>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-300">Food Supply</span>
                        <strong className="text-amber-400">
                          {currentUser.preparedness.foodSupplyDays} Days Stock
                        </strong>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-300">First Aid Kit</span>
                        <span className="text-emerald-400 font-bold">✓ Ready</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-300">Flashlight / Power</span>
                        <span className="text-emerald-400 font-bold">✓ Solar Ready</span>
                      </div>
                    </div>
                  </div>

                  {/* Hub Inventory Card */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                          CONNECTED HUB INVENTORY
                        </span>
                        <h4 className="text-base font-black text-white">NGO-9173 Regional Care Stock</h4>
                      </div>
                      <span className="text-[11px] text-slate-400">Updated {currentHubInventory.lastUpdated}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                        <span className="text-lg font-black text-emerald-400 block">{currentHubInventory.waterCases}</span>
                        Water Cases
                      </div>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                        <span className="text-lg font-black text-emerald-400 block">{currentHubInventory.foodBoxes}</span>
                        Food Boxes
                      </div>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                        <span className="text-lg font-black text-emerald-400 block">{currentHubInventory.blankets}</span>
                        Blankets
                      </div>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                        <span className="text-lg font-black text-emerald-400 block">{currentHubInventory.medKits}</span>
                        Med Kits
                      </div>
                    </div>
                  </div>

                  {/* Recovery & Resources Quick Tools */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-3">
                      SECTION 7 / RECOVERY &amp; RESOURCES
                    </span>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          setCurrentRole('INSTITUTION_ADMIN');
                          setAdminTab('response');
                          setResponseSubView('map');
                        }}
                        className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-left flex items-center justify-between transition-colors"
                      >
                        <div>
                          <strong className="text-white block">Interactive Map</strong>
                          <span className="text-slate-400 text-[11px]">Pins &amp; Evac zones</span>
                        </div>
                        <Compass size={18} className="text-emerald-400" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          setCurrentRole('INSTITUTION_ADMIN');
                          setAdminTab('response');
                          setResponseSubView('drone');
                        }}
                        className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-left flex items-center justify-between transition-colors"
                      >
                        <div>
                          <strong className="text-white block">Drone Dispatch</strong>
                          <span className="text-slate-400 text-[11px]">UAV feed &amp; delivery</span>
                        </div>
                        <Radio size={18} className="text-emerald-400" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- MEMBER TAB 2: REPORT WIZARD (5 STEPS) ----------------- */}
              {memberTab === 'report' && (
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[11px] font-mono text-rose-400 font-bold uppercase tracking-wider block">
                        SECTION 2.3 / INCIDENT REPORT WIZARD
                      </span>
                      <h4 className="text-xl font-black text-white">Report Status &amp; Needs</h4>
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-bold">Step {reportStep} of 5</span>
                  </div>

                  {reportSubmitted ? (
                    <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3">
                      <CheckCircle2 size={40} className="text-emerald-400 mx-auto" />
                      <h5 className="text-xl font-black text-white">Status Report Submitted Live!</h5>
                      <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                        Your Org Admin Command Center has received your exact safety status, location, and prioritized needs ({reportNeeds.join(', ')}).
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          setReportSubmitted(false);
                          setReportStep(1);
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                      >
                        Submit Updated Report
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Step 1: Safety Status */}
                      {reportStep === 1 && (
                        <div className="space-y-4">
                          <label className="text-sm font-bold text-slate-200 block">
                            1. Are you safe right now?
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                soundEngine.playClick();
                                setReportSafety('safe');
                              }}
                              className={`p-4 rounded-xl border font-bold text-sm flex flex-col items-center gap-2 transition-all ${
                                reportSafety === 'safe'
                                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg'
                                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-600'
                              }`}
                            >
                              <CheckCircle2 size={24} />
                              Yes, I am Safe
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                soundEngine.playClick();
                                setReportSafety('in_danger');
                              }}
                              className={`p-4 rounded-xl border font-bold text-sm flex flex-col items-center gap-2 transition-all ${
                                reportSafety === 'in_danger'
                                  ? 'bg-rose-600 border-rose-500 text-white shadow-lg'
                                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-rose-600'
                              }`}
                            >
                              <AlertCircle size={24} />
                              No, I am in Danger
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Last Known Location */}
                      {reportStep === 2 && (
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-slate-200 block">
                            2. Last Known Location (GPS or Address)
                          </label>
                          <input
                            type="text"
                            value={reportLocation}
                            onChange={(e) => setReportLocation(e.target.value)}
                            className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-emerald-500 outline-none"
                            placeholder="Enter home address or grid location"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              soundEngine.playClick();
                              setReportLocation('GPS: 37.7749° N, 122.4194° W (Auto-captured)');
                            }}
                            className="px-3 py-2 bg-slate-800 text-emerald-400 rounded-lg text-xs font-bold flex items-center gap-1.5"
                          >
                            <MapPin size={14} /> Auto-capture GPS Location
                          </button>
                        </div>
                      )}

                      {/* Step 3: Injury Check */}
                      {reportStep === 3 && (
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-slate-200 block">
                            3. Is anyone in your household injured?
                          </label>
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
                              <input
                                type="radio"
                                name="injured"
                                checked={reportInjured}
                                onChange={() => setReportInjured(true)}
                              />
                              Yes
                            </label>
                            <label className="flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
                              <input
                                type="radio"
                                name="injured"
                                checked={!reportInjured}
                                onChange={() => setReportInjured(false)}
                              />
                              No
                            </label>
                          </div>
                          {reportInjured && (
                            <textarea
                              value={reportInjuryDesc}
                              onChange={(e) => setReportInjuryDesc(e.target.value)}
                              rows={2}
                              className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-emerald-500 outline-none"
                              placeholder="Describe injury details..."
                            />
                          )}
                        </div>
                      )}

                      {/* Step 4: What do you need? */}
                      {reportStep === 4 && (
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-slate-200 block">
                            4. What do you need most urgently?
                          </label>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {['Urgent Medical', 'Water', 'Food', 'Shelter', 'Transport', 'Oxygen / Power'].map((need) => (
                              <button
                                type="button"
                                key={need}
                                onClick={() => toggleNeed(need)}
                                className={`p-3 rounded-xl border text-left font-bold transition-all ${
                                  reportNeeds.includes(need)
                                    ? 'bg-emerald-600 border-emerald-500 text-white'
                                    : 'bg-slate-900 border-slate-800 text-slate-300'
                                }`}
                              >
                                {reportNeeds.includes(need) ? '✓ ' : '+ '} {need}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 5: Confirm & Submit */}
                      {reportStep === 5 && (
                        <div className="space-y-4">
                          <label className="text-sm font-bold text-slate-200 block">
                            5. Review &amp; Submit Status
                          </label>
                          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Status:</span>
                              <strong className={reportSafety === 'safe' ? 'text-emerald-400' : 'text-rose-400'}>
                                {reportSafety === 'safe' ? 'SAFE' : 'IN DANGER'}
                              </strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Location:</span>
                              <span className="text-white font-bold">{reportLocation}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Needs:</span>
                              <span className="text-amber-300 font-bold">{reportNeeds.join(', ')}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step Navigation Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                        <button
                          type="button"
                          disabled={reportStep === 1}
                          onClick={() => {
                            soundEngine.playClick();
                            setReportStep((s) => Math.max(1, s - 1));
                          }}
                          className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40"
                        >
                          Back
                        </button>

                        {reportStep < 5 ? (
                          <button
                            type="button"
                            onClick={() => {
                              soundEngine.playClick();
                              setReportStep((s) => Math.min(5, s + 1));
                            }}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                          >
                            Next Step <ChevronRight size={14} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleReportSubmit}
                            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg"
                          >
                            Submit Status &amp; Needs
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ----------------- MEMBER TAB 3: SETTINGS ----------------- */}
              {memberTab === 'settings' && (
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 text-xs">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block mb-1">
                      SECTION 4 &amp; 5 / SETTINGS &amp; HOUSEHOLD
                    </span>
                    <h4 className="text-lg font-black text-white">Personal Profile &amp; Household Management</h4>
                  </div>

                  {/* Section 1.4 Identity */}
                  <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <strong className="text-white text-sm font-bold block">Identity &amp; Emergency Contact</strong>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 block">Full Name</label>
                        <input
                          type="text"
                          value={currentUser.name}
                          onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                          className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block">Emergency Contact</label>
                        <input
                          type="text"
                          value={currentUser.emergencyContact.name}
                          onChange={(e) =>
                            setCurrentUser({
                              ...currentUser,
                              emergencyContact: { ...currentUser.emergencyContact, name: e.target.value },
                            })
                          }
                          className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 5 Community Connection */}
                  <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <strong className="text-white text-sm font-bold block">Community &amp; Organization Code</strong>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={currentUser.orgCode}
                        onChange={(e) => setCurrentUser({ ...currentUser, orgCode: e.target.value })}
                        className="flex-1 p-2 bg-slate-950 border border-slate-800 rounded text-white font-mono"
                        placeholder="e.g. NGO-9173 or CH-1234"
                      />
                      <button
                        type="button"
                        onClick={() => showToast('Community Code updated and verified with organization hub!')}
                        className="px-3 py-2 bg-emerald-600 text-white font-bold rounded"
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  {/* Section 1.5 Medical & Vulnerability Flags */}
                  <div className="space-y-2 bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <strong className="text-white text-sm font-bold block">Medical &amp; Vulnerability Flags</strong>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentUser.preparedness.oxygenOrPoweredDevice}
                          onChange={(e) =>
                            setCurrentUser({
                              ...currentUser,
                              preparedness: { ...currentUser.preparedness, oxygenOrPoweredDevice: e.target.checked },
                            })
                          }
                        />
                        Oxygen / Powered Device
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentUser.preparedness.mobilityLimitation}
                          onChange={(e) =>
                            setCurrentUser({
                              ...currentUser,
                              preparedness: { ...currentUser.preparedness, mobilityLimitation: e.target.checked },
                            })
                          }
                        />
                        Mobility Limitation
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!currentUser.preparedness.transportationAccess}
                          onChange={(e) =>
                            setCurrentUser({
                              ...currentUser,
                              preparedness: { ...currentUser.preparedness, transportationAccess: !e.target.checked },
                            })
                          }
                        />
                        No Vehicle Transport
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentUser.preparedness.insulinDependency}
                          onChange={(e) =>
                            setCurrentUser({
                              ...currentUser,
                              preparedness: { ...currentUser.preparedness, insulinDependency: e.target.checked },
                            })
                          }
                        />
                        Insulin Dependent
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Side Explanatory Card corresponding to Guide Section */}
            <div className="lg:col-span-5 bg-slate-900 p-6 rounded-[32px] border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  GUIDE SECTION 1–5 SUMMARY
                </span>
                <h3 className="text-2xl font-black text-white mt-1">Member Operations Core</h3>
              </div>

              <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <strong className="text-white font-bold block text-sm">1.1–1.7 Onboarding &amp; Setup</strong>
                  <p>
                    Every member registers, confirms email, provides emergency contacts, and logs household readiness flags (medications, mobility, transport access).
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <strong className="text-white font-bold block text-sm">2.3 5-Step Incident Wizard</strong>
                  <p>
                    During emergencies, members use 1-click status reporting (Safe vs In Danger), location pinning, and prioritized needs selection which syncs instantly to Org Command Center.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <strong className="text-white font-bold block text-sm">5.1 Community Code Linking</strong>
                  <p>
                    Connecting via codes like <code className="text-emerald-400 font-mono">NGO-9173</code> links the member’s preparedness profile to their local care hub safely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ROLE VIEW 2: ORG ADMIN & NETWORK ADMIN COMMAND CENTER */}
        {/* ========================================================================= */}
        {(currentRole === 'INSTITUTION_ADMIN' || currentRole === 'ORG_ADMIN') && (
          <div className="space-y-6">
            {/* Top Command Bar & Context Switcher */}
            <div className="bg-slate-900 p-6 rounded-[28px] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  SECTION 6 / ORGANIZATION COMMAND CENTER
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {currentRole === 'ORG_ADMIN' ? 'Network Command Center' : 'Institution Org Command Center'}
                </h3>
              </div>

              {/* Location Switcher for Network Admins */}
              <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-slate-400 shrink-0">Child Hub Context:</span>
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    soundEngine.playClick();
                    setSelectedLocation(e.target.value);
                  }}
                  className="bg-slate-900 text-xs font-bold text-emerald-400 border border-slate-800 rounded-xl px-3 py-1.5 outline-none"
                >
                  {INITIAL_CHILD_ORGS.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name} ({org.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick-Status Count Tiles (Section 6.1) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-rose-950/40 border border-rose-800/60 p-5 rounded-2xl">
                <span className="text-xs font-mono font-bold text-rose-300 block uppercase">In Danger</span>
                <span className="text-3xl font-black text-rose-400 block mt-1">{inDangerCount}</span>
                <span className="text-[11px] text-rose-300/80 mt-1 block">Requires immediate response</span>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-800/60 p-5 rounded-2xl">
                <span className="text-xs font-mono font-bold text-emerald-300 block uppercase">Confirmed Safe</span>
                <span className="text-3xl font-black text-emerald-400 block mt-1">{safeCount}</span>
                <span className="text-[11px] text-emerald-300/80 mt-1 block">Accounted for</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs font-mono font-bold text-slate-400 block uppercase">Unknown Status</span>
                <span className="text-3xl font-black text-slate-200 block mt-1">{unknownCount}</span>
                <span className="text-[11px] text-slate-400 mt-1 block">Pending ping check</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs font-mono font-bold text-slate-400 block uppercase">Total Connected Members</span>
                <span className="text-3xl font-black text-white block mt-1">{filteredMembers.length}</span>
                <span className="text-[11px] text-slate-400 mt-1 block">Across active filter</span>
              </div>
            </div>

            {/* Command Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setAdminTab('status');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  adminTab === 'status' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                6.3 Member Status
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setAdminTab('preparedness');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  adminTab === 'preparedness' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                6.4 Preparedness &amp; Risk Tiers
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setAdminTab('inventory');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  adminTab === 'inventory' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                6.5 Hub Supply Inventory
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setAdminTab('broadcast');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  adminTab === 'broadcast' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                6.6 Send Broadcast
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setAdminTab('response');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  adminTab === 'response' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                Section 7 Advanced Response Views
              </button>
            </div>

            {/* TAB 1: MEMBER STATUS */}
            {adminTab === 'status' && (
              <div className="bg-slate-900 p-6 rounded-[28px] border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-80">
                    <Search size={16} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search member name or address..."
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Showing {filteredMembers.length} records</span>
                </div>

                {/* Member Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px]">
                      <tr>
                        <th className="p-3.5 rounded-l-xl">Member / Address</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">Org Code</th>
                        <th className="p-3.5">Emergency Contact</th>
                        <th className="p-3.5">Needs / Flags</th>
                        <th className="p-3.5 text-right rounded-r-xl">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredMembers.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-950/60 transition-colors">
                          <td className="p-3.5 font-bold text-white">
                            <div>{m.name}</div>
                            <div className="text-[11px] text-slate-400 font-normal">{m.address}</div>
                          </td>
                          <td className="p-3.5">
                            {m.safetyStatus === 'in_danger' && (
                              <span className="px-2.5 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full font-bold text-[11px] flex items-center gap-1 w-max">
                                <AlertCircle size={12} /> IN DANGER
                              </span>
                            )}
                            {m.safetyStatus === 'safe' && (
                              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-bold text-[11px] flex items-center gap-1 w-max">
                                <CheckCircle2 size={12} /> SAFE
                              </span>
                            )}
                            {m.safetyStatus === 'unknown' && (
                              <span className="px-2.5 py-1 bg-slate-800 text-slate-400 rounded-full font-bold text-[11px] w-max">
                                UNKNOWN
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 font-mono text-slate-400">{m.orgCode}</td>
                          <td className="p-3.5">
                            <div>{m.emergencyContact.name}</div>
                            <div className="text-[11px] text-slate-400">{m.emergencyContact.phone}</div>
                          </td>
                          <td className="p-3.5">
                            <div className="flex flex-wrap gap-1">
                              {m.outreachFlags.map((f) => (
                                <span key={f} className="px-2 py-0.5 bg-amber-500/10 text-amber-300 text-[10px] rounded">
                                  {f}
                                </span>
                              ))}
                              {m.safetyNeeds?.map((n) => (
                                <span key={n} className="px-2 py-0.5 bg-rose-500/10 text-rose-300 text-[10px] rounded">
                                  {n}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3.5 text-right space-x-2">
                            <button
                              type="button"
                              onClick={() => setSelectedMember(m)}
                              className="px-2.5 py-1.5 bg-slate-800 text-white rounded-lg text-[11px] font-bold hover:bg-slate-700"
                            >
                              Detail
                            </button>
                            <button
                              type="button"
                              onClick={() => handlePingMember(m.name)}
                              className="px-2.5 py-1.5 bg-emerald-600 text-white rounded-lg text-[11px] font-bold hover:bg-emerald-500"
                            >
                              Ping Status
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: PREPAREDNESS & RISK TIERS */}
            {adminTab === 'preparedness' && (
              <div className="bg-slate-900 p-6 rounded-[28px] border border-slate-800 space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                    SECTION 6.4 / PREPAREDNESS AUDIT
                  </span>
                  <h4 className="text-xl font-black text-white">Risk Tiers &amp; Outreach Priorities</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {['Critical', 'High', 'Medium', 'Complete'].map((tier) => {
                    const tierMembers = filteredMembers.filter((m) => m.riskTier === tier);
                    return (
                      <div key={tier} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                        <div className="flex justify-between items-center">
                          <strong className="text-sm font-bold text-white">{tier} Risk Tier</strong>
                          <span className="px-2.5 py-0.5 bg-slate-900 border border-slate-800 rounded-full text-xs font-mono text-slate-300">
                            {tierMembers.length}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {tierMembers.map((tm) => (
                            <div key={tm.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                              <strong className="text-white block">{tm.name}</strong>
                              <span className="text-[11px] text-amber-300 block">{tm.readinessPercentage}% Readiness</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {tm.outreachFlags.map((f) => (
                                  <span key={f} className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded">
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: HUB INVENTORY */}
            {adminTab === 'inventory' && (
              <div className="bg-slate-900 p-6 rounded-[28px] border border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                      SECTION 6.5 / HUB INVENTORY
                    </span>
                    <h4 className="text-xl font-black text-white">Live Stock &amp; Replenishment Requests</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setReplenishOpen(true);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    + Request Replenishment
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <span className="text-xs text-slate-400 font-bold uppercase block">Water Cases</span>
                    <span className="text-4xl font-black text-emerald-400 block">{currentHubInventory.waterCases}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateStock('waterCases', 10)}
                        className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded font-bold text-xs"
                      >
                        +10
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateStock('waterCases', -10)}
                        className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded font-bold text-xs"
                      >
                        -10
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <span className="text-xs text-slate-400 font-bold uppercase block">Food Boxes</span>
                    <span className="text-4xl font-black text-emerald-400 block">{currentHubInventory.foodBoxes}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateStock('foodBoxes', 10)}
                        className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded font-bold text-xs"
                      >
                        +10
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateStock('foodBoxes', -10)}
                        className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded font-bold text-xs"
                      >
                        -10
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <span className="text-xs text-slate-400 font-bold uppercase block">Blankets</span>
                    <span className="text-4xl font-black text-emerald-400 block">{currentHubInventory.blankets}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateStock('blankets', 10)}
                        className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded font-bold text-xs"
                      >
                        +10
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateStock('blankets', -10)}
                        className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded font-bold text-xs"
                      >
                        -10
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <span className="text-xs text-slate-400 font-bold uppercase block">Medical Kits</span>
                    <span className="text-4xl font-black text-emerald-400 block">{currentHubInventory.medKits}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateStock('medKits', 5)}
                        className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded font-bold text-xs"
                      >
                        +5
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateStock('medKits', -5)}
                        className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded font-bold text-xs"
                      >
                        -5
                      </button>
                    </div>
                  </div>
                </div>

                {replenishOpen && (
                  <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-3 text-xs">
                    <strong className="text-white text-sm block">Prefilled Replenishment Request Form</strong>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 block">Water Cases Request</label>
                        <input
                          type="number"
                          value={replenishWater}
                          onChange={(e) => setReplenishWater(Number(e.target.value))}
                          className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block">Food Boxes Request</label>
                        <input
                          type="number"
                          value={replenishFood}
                          onChange={(e) => setReplenishFood(Number(e.target.value))}
                          className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-white"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setReplenishOpen(false)}
                        className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleUpdateStock('waterCases', replenishWater);
                          handleUpdateStock('foodBoxes', replenishFood);
                          setReplenishOpen(false);
                          showToast('Replenishment request fulfilled and stocked into hub inventory!');
                        }}
                        className="px-4 py-1.5 bg-emerald-600 text-white rounded font-bold"
                      >
                        Submit &amp; Mark as Stocked
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: BROADCAST COMPOSER */}
            {adminTab === 'broadcast' && (
              <div className="bg-slate-900 p-6 rounded-[28px] border border-slate-800 space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                    SECTION 6.6 / COMMUNITY BROADCAST
                  </span>
                  <h4 className="text-xl font-black text-white">Send Directive or Alert Message</h4>
                </div>

                <div className="space-y-4 max-w-2xl text-xs">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Select Target Scope</label>
                    <select
                      value={broadcastScope}
                      onChange={(e) => setBroadcastScope(e.target.value)}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                    >
                      <option value="all">All Child Hubs Across Network (Network Broadcast)</option>
                      <option value="CH-1234">West High Community Center Hub Only (CH-1234)</option>
                      <option value="NGO-9173">Northern Food Bank &amp; Care Network Only (NGO-9173)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Broadcast Title</label>
                    <input
                      type="text"
                      value={broadcastTitle}
                      onChange={(e) => setBroadcastTitle(e.target.value)}
                      placeholder="e.g. FLASH FLOOD ADVISORY & SHELTER OPEN"
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Message Body (Actionable Advice)</label>
                    <textarea
                      value={broadcastBody}
                      onChange={(e) => setBroadcastBody(e.target.value)}
                      rows={4}
                      placeholder="Specify what is happening, what members should do, and who to contact..."
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                    />
                  </div>

                  {/* Moderation Review Banner */}
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200">
                    <strong className="block font-bold text-amber-300 mb-1">Writing Effective Broadcasts Rule:</strong>
                    <p className="leading-relaxed">
                      Every message must answer: What is happening? What should members do? Who should they contact?
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSendBroadcast}
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg"
                  >
                    <Send size={16} /> Moderation Review &amp; Dispatch Live Alert
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: SECTION 7 ADVANCED RESPONSE VIEWS */}
            {adminTab === 'response' && (
              <div className="bg-slate-900 p-6 rounded-[28px] border border-slate-800 space-y-6">
                {/* Sub-view Nav */}
                <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
                  <button
                    type="button"
                    onClick={() => setResponseSubView('map')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      responseSubView === 'map' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    7.1 Live Map View
                  </button>
                  <button
                    type="button"
                    onClick={() => setResponseSubView('population')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      responseSubView === 'population' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    7.2 Evac Zones &amp; Heatmaps
                  </button>
                  <button
                    type="button"
                    onClick={() => setResponseSubView('recovery')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      responseSubView === 'recovery' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    7.3 Recovery Teams
                  </button>
                  <button
                    type="button"
                    onClick={() => setResponseSubView('drone')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      responseSubView === 'drone' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    7.4 UAV Drone Dispatch
                  </button>
                  <button
                    type="button"
                    onClick={() => setResponseSubView('assessment')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      responseSubView === 'assessment' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    7.6 Damage Assessment
                  </button>
                </div>

                {/* SUB VIEW: LIVE MAP */}
                {responseSubView === 'map' && (
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center">
                      <strong className="text-white font-bold text-sm">Interactive Geographic Member Pins</strong>
                      <div className="flex gap-3 text-xs">
                        <span className="flex items-center gap-1 text-rose-400"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> In Danger</span>
                        <span className="flex items-center gap-1 text-emerald-400"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Safe</span>
                        <span className="flex items-center gap-1 text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span> Unknown</span>
                      </div>
                    </div>

                    <div className="relative w-full h-64 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
                      {/* Grid overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

                      {/* Map Pins */}
                      <button
                        type="button"
                        onClick={() => setSelectedMember(members[0])}
                        className="absolute top-1/3 left-1/4 p-2 bg-rose-600 text-white rounded-full shadow-xl animate-pulse text-xs font-bold flex items-center gap-1"
                      >
                        <MapPin size={16} /> Sarah J. (IN DANGER)
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedMember(members[1])}
                        className="absolute bottom-1/3 right-1/3 p-2 bg-emerald-600 text-white rounded-full shadow-xl text-xs font-bold flex items-center gap-1"
                      >
                        <MapPin size={16} /> Marcus V. (SAFE)
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedMember(members[2])}
                        className="absolute top-1/2 right-1/4 p-2 bg-slate-700 text-white rounded-full shadow-xl text-xs font-bold flex items-center gap-1"
                      >
                        <MapPin size={16} /> Eleanor V. (UNKNOWN)
                      </button>

                      <span className="absolute bottom-3 left-4 text-[10px] text-slate-500 font-mono">
                        Sector Map Overlay Grid B-4 • Live GPS Sync Active
                      </span>
                    </div>
                  </div>
                )}

                {/* SUB VIEW: DRONE DISPATCH */}
                {responseSubView === 'drone' && (
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <strong className="text-white font-bold text-sm block">Section 7.4 UAV Live Camera Feed &amp; Supply Delivery Tasking</strong>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center relative min-h-[200px]">
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-600 text-white rounded font-mono text-[10px] font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> LIVE UAV STREAM #04
                        </div>
                        <Radio size={48} className="text-emerald-400 animate-pulse mb-2" />
                        <span className="text-xs text-slate-300 font-mono">Camera Feed: Overhead Sector B-4 (742 Evergreen)</span>
                        <span className="text-[10px] text-slate-500 font-mono">Altitude: 120m • Wind: 8kts • Battery: 88%</span>
                      </div>

                      <div className="lg:col-span-5 space-y-3 text-xs">
                        <strong className="text-white block font-bold">Task Drone Delivery</strong>
                        <div>
                          <label className="text-slate-400 block">Target Address</label>
                          <input
                            type="text"
                            value={droneTargetAddress}
                            onChange={(e) => setDroneTargetAddress(e.target.value)}
                            className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-white"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block">Supply Payload</label>
                          <select
                            value={droneSupplyType}
                            onChange={(e) => setDroneSupplyType(e.target.value)}
                            className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-white"
                          >
                            <option value="Oxygen / Battery Pack">Oxygen Backup Battery Pack</option>
                            <option value="Insulin Thermal Container">Insulin Thermal Cooling Container</option>
                            <option value="Emergency Water Pack">5L Emergency Water Pack</option>
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            soundEngine.playSuccess();
                            setDroneStatus('in_flight');
                            showToast(`UAV Drone dispatched to ${droneTargetAddress} carrying ${droneSupplyType}!`);
                          }}
                          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md"
                        >
                          Dispatch UAV Payload
                        </button>

                        {droneStatus === 'in_flight' && (
                          <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-300 text-[11px] flex items-center gap-2">
                            <Radio size={16} className="animate-spin text-indigo-400" />
                            UAV Flight Path En Route to Sector B-4 (ETA 4 Mins)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* ROLE VIEW 3: ADMIN ONLY CONTROL PANEL */}
        {/* ========================================================================= */}
        {currentRole === 'ADMIN' && (
          <div className="bg-slate-900 p-6 rounded-[32px] border border-amber-500/30 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                SECTION 8 / SYSTEM ADMIN ONLY CAPABILITIES
              </span>
              <h3 className="text-2xl font-black text-white mt-1">User Directory &amp; New Signups Management</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs">
              {/* User Directory */}
              <div className="lg:col-span-7 space-y-4">
                <strong className="text-white text-sm font-bold block">8.1 Full System User Directory</strong>
                <div className="space-y-2">
                  {members.map((m) => (
                    <div key={m.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <strong className="text-white block">{m.name} ({m.email})</strong>
                        <span className="text-[11px] text-slate-400">Org: {m.orgCode}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select className="bg-slate-900 border border-slate-800 text-amber-300 font-mono text-[11px] rounded px-2 py-1">
                          <option value="MEMBER">MEMBER</option>
                          <option value="INSTITUTION_ADMIN">INSTITUTION_ADMIN</option>
                          <option value="ORG_ADMIN">ORG_ADMIN</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => showToast(`Password reset link dispatched to ${m.email}`)}
                          className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded font-bold"
                        >
                          Reset Pass
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Approvals */}
              <div className="lg:col-span-5 space-y-4">
                <strong className="text-white text-sm font-bold block">8.2 Pending Registration Approvals</strong>
                <div className="space-y-3">
                  {pendingSignups.map((p) => (
                    <div key={p.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between">
                        <strong className="text-white">{p.email}</strong>
                        <span className="text-[11px] text-slate-400">{p.date}</span>
                      </div>
                      <div className="text-slate-400">Entered Code: <span className="text-emerald-400 font-mono">{p.orgCode}</span></div>
                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            soundEngine.playSuccess();
                            setPendingSignups(pendingSignups.filter((item) => item.id !== p.id));
                            showToast(`Approved ${p.email} as MEMBER for ${p.orgCode}`);
                          }}
                          className="flex-1 py-1.5 bg-emerald-600 text-white rounded font-bold text-xs"
                        >
                          Approve Registration
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            soundEngine.playClick();
                            setPendingSignups(pendingSignups.filter((item) => item.id !== p.id));
                            showToast(`Rejected registration for ${p.email}`);
                          }}
                          className="px-3 py-1.5 bg-slate-800 text-slate-400 rounded font-bold text-xs"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                  {pendingSignups.length === 0 && (
                    <div className="p-4 bg-slate-950 text-slate-400 rounded-xl text-center">
                      No pending signups in queue.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Member Detail Drawer Modal */}
        {selectedMember && (
          <div className="fixed inset-0 z-[130] bg-black/80 flex items-center justify-center p-4">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 max-w-lg w-full text-xs space-y-4 text-white">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <strong className="text-lg font-black">{selectedMember.name} Profile</strong>
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="text-slate-400 hover:text-white font-bold"
                >
                  ✕ Close
                </button>
              </div>

              <div className="space-y-2">
                <div><span className="text-slate-400">Address:</span> {selectedMember.address}</div>
                <div><span className="text-slate-400">Phone:</span> {selectedMember.phone}</div>
                <div><span className="text-slate-400">Emergency Contact:</span> {selectedMember.emergencyContact.name} ({selectedMember.emergencyContact.phone})</div>
                <div><span className="text-slate-400">Safety Status:</span> <strong className="text-emerald-400">{selectedMember.safetyStatus.toUpperCase()}</strong></div>
                <div><span className="text-slate-400">Medical Flags:</span> {selectedMember.outreachFlags.join(', ') || 'None'}</div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    handlePingMember(selectedMember.name);
                    setSelectedMember(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold"
                >
                  Ping Member Direct
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
