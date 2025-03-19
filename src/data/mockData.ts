import { Mission } from '../types/mission';

export const mockMissions: Mission[] = [
  {
    id: '1',
    reference: 'MISSION-2024-001',
    title: 'Contrôle annuel - Banque ABC',
    description: 'Mission de contrôle des processus de protection des données personnelles',
    type_mission: 'Contrôle sur place',
    start_date: '2024-03-20',
    end_date: '2024-03-25',
    status: 'PLANIFIEE',
    organization: 'Banque ABC',
    address: '123 Avenue Leopold Sedar Senghor, Dakar',
    motif_controle: 'Contrôle programmé dans le cadre du plan annuel',
    decision_numero: 'DEC-2024-001',
    date_decision: '2024-03-19',
    team_members: ['Amadou Diallo', 'Fatou Sow'],
    objectives: [
      'Vérification des registres de traitement',
      'Contrôle des mesures de sécurité',
      'Audit des processus de collecte de données'
    ],
    created_at: '2024-03-19T10:00:00Z',
    updated_at: '2024-03-19T10:00:00Z'
  },
  {
    id: '2',
    reference: 'MISSION-2024-002',
    title: 'Inspection - Société XYZ',
    description: 'Contrôle suite à une plainte concernant la collecte de données',
    type_mission: 'Contrôle sur pièces',
    start_date: '2024-04-01',
    end_date: '2024-04-03',
    status: 'EN_COURS',
    organization: 'Société XYZ',
    address: '45 Rue Félix Faure, Dakar',
    motif_controle: 'Plainte reçue concernant la collecte excessive de données',
    team_members: ['Moussa Ndiaye', 'Aïssatou Ba'],
    objectives: [
      'Investigation sur les pratiques de collecte',
      'Vérification du consentement',
      'Examen des mesures correctives'
    ],
    created_at: '2024-03-15T14:30:00Z',
    updated_at: '2024-03-15T14:30:00Z'
  }
];