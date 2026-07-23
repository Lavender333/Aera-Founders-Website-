export type AeraUserRole = 'MEMBER' | 'INSTITUTION_ADMIN' | 'ORG_ADMIN' | 'ADMIN';

export interface HouseholdMember {
  id: string;
  name: string;
  relationship: string;
  medicalFlags?: string[];
  accessibilityFlags?: string[];
}

export interface PreparednessProfile {
  householdMembers: HouseholdMember[];
  hasPets: boolean;
  medicationDependency: boolean;
  insulinDependency: boolean;
  oxygenOrPoweredDevice: boolean;
  mobilityLimitation: boolean;
  transportationAccess: boolean;
  financialStrain: boolean;
  additionalMedicalNotes: string;
  preparednessConsent: boolean;
  waterSupplyGal: number;
  foodSupplyDays: number;
  hasFirstAidKit: boolean;
  hasFlashlightPower: boolean;
  hasDocumentsBackup: boolean;
  hasCommunicationPlan: boolean;
}

export interface MemberRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  orgCode: string;
  childOrgId: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  safetyStatus: 'safe' | 'in_danger' | 'unknown';
  safetyNeeds?: string[];
  lastKnownLocation?: string;
  injuryNotes?: string;
  riskTier: 'Critical' | 'High' | 'Medium' | 'Complete';
  readinessPercentage: number;
  outreachFlags: string[];
  preparedness: PreparednessProfile;
}

export interface HubInventory {
  waterCases: number;
  foodBoxes: number;
  blankets: number;
  medKits: number;
  lastUpdated: string;
}

export interface BroadcastMessage {
  id: string;
  senderName: string;
  orgScope: string;
  title: string;
  body: string;
  timestamp: string;
  priority: 'normal' | 'urgent' | 'emergency';
}

export interface FounderSlide {
  id: string;
  name: string;
  role: string;
  monogram: string;
  portraitClass: string;
  intro?: string;
  bullets: string[];
  quote?: string;
}

export interface GenesisChapter {
  index: string;
  number: string;
  kicker: string;
  title: string;
  lead: string;
  label: string;
  beat?: {
    tag: string;
    text: string;
  };
  question?: string;
  principles?: string[];
  founderLine?: string;
}

export interface ScenarioStep {
  kicker: string;
  title: string;
  text: string;
  outcome: string;
  topStat: string;
  bottomStat: string;
  activeNodeCount: number;
}

export interface BuyingOption {
  key: 'assessment' | 'pilot' | 'enterprise' | 'mission';
  name: string;
  low: number;
  high: number;
  unit: string;
  explanation: string;
}

export type TrustResourceKey = 'security' | 'recovery' | 'accessibility' | 'security-contact' | 'capability';

export interface TrustResourceItem {
  label: string;
  title: string;
  body: string;
  items: string[];
  actions?: 'print';
}

export interface ConsultationFormState {
  name: string;
  organization: string;
  role: string;
  email: string;
  message: string;
  consent: boolean;
}

