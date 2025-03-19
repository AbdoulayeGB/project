/*
  # Création de la table des missions de contrôle

  1. Nouvelle Table
    - `missions`
      - `id` (uuid, clé primaire)
      - `title` (text, titre de la mission)
      - `description` (text, description détaillée)
      - `start_date` (date, date de début)
      - `end_date` (date, date de fin)
      - `status` (enum, statut de la mission)
      - `organization` (text, organisation contrôlée)
      - `address` (text, adresse de l'organisation)
      - `team_members` (array, membres de l'équipe)
      - `objectives` (array, objectifs de la mission)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Activation RLS
    - Politique pour les utilisateurs authentifiés
*/

-- Création du type enum pour le statut
CREATE TYPE mission_status AS ENUM ('PLANIFIEE', 'EN_COURS', 'TERMINEE', 'ANNULEE');

-- Création de la table missions
CREATE TABLE missions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status mission_status NOT NULL DEFAULT 'PLANIFIEE',
  organization text NOT NULL,
  address text,
  team_members text[] DEFAULT '{}',
  objectives text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activation de la sécurité niveau ligne
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;

-- Politique pour la lecture des missions
CREATE POLICY "Les utilisateurs authentifiés peuvent lire toutes les missions"
  ON missions
  FOR SELECT
  TO authenticated
  USING (true);

-- Politique pour la création des missions
CREATE POLICY "Les utilisateurs authentifiés peuvent créer des missions"
  ON missions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Politique pour la modification des missions
CREATE POLICY "Les utilisateurs authentifiés peuvent modifier les missions"
  ON missions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_missions_updated_at
    BEFORE UPDATE ON missions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();