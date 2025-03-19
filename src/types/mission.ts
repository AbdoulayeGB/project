export type MissionType = 'Contrôle sur place' | 'Contrôle sur pièces' | 'Contrôle en ligne';
export type MissionStatus = 'PLANIFIEE' | 'EN_COURS' | 'TERMINEE' | 'ANNULEE';
export type SanctionType = 'AVERTISSEMENT' | 'MISE_EN_DEMEURE' | 'AMENDE' | 'INJONCTION' | 'RESTRICTION_TRAITEMENT';
export type FindingType = 'NON_CONFORMITE_MAJEURE' | 'NON_CONFORMITE_MINEURE' | 'OBSERVATION' | 'POINT_CONFORME';

export interface Organization {
  id: string;
  name: string;
  sigle: string;
  secteur_activite: string;
  address: string;
  telephone: string;
  email: string;
  site_web: string;
  ninea: string;
  registre_commerce: string;
  date_creation: string;
  representant_legal: string;
  contact_dpo: string;
  telephone_dpo: string;
  email_dpo: string;
}

export interface Finding {
  id: string;
  mission_id: string;
  type: FindingType;
  description: string;
  reference_legale?: string;
  recommandation?: string;
  delai_correction?: number;
  date_constat: string;
  created_at: string;
  updated_at: string;
}

export interface Remark {
  id: string;
  mission_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Sanction {
  id: string;
  mission_id: string;
  type: SanctionType;
  description: string;
  amount?: number;
  decision_date: string;
  created_at: string;
  updated_at: string;
}

export interface Mission {
  id: string;
  reference: string;
  title: string;
  description: string;
  type_mission: MissionType;
  organization: string;
  address: string;
  start_date: string;
  end_date: string;
  status: MissionStatus;
  motif_controle: string;
  decision_numero?: string;
  date_decision?: string;
  team_members: string[];
  objectives: string[];
  findings?: Finding[];
  remarks?: Remark[];
  sanctions?: Sanction[];
  created_at: string;
  updated_at: string;
}