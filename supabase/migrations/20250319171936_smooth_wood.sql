/*
  # Ajout des remarques et sanctions pour les missions

  1. Nouvelles Tables
    - `remarks`
      - `id` (uuid, clé primaire)
      - `mission_id` (uuid, clé étrangère vers missions)
      - `content` (text, contenu de la remarque)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `sanctions`
      - `id` (uuid, clé primaire)
      - `mission_id` (uuid, clé étrangère vers missions)
      - `type` (enum, type de sanction)
      - `description` (text, description de la sanction)
      - `amount` (numeric, montant de l'amende si applicable)
      - `decision_date` (date, date de la décision)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Activation RLS sur les nouvelles tables
    - Politiques pour les utilisateurs authentifiés
*/

-- Type enum pour les sanctions
CREATE TYPE sanction_type AS ENUM (
  'AVERTISSEMENT',
  'MISE_EN_DEMEURE',
  'AMENDE',
  'INJONCTION',
  'RESTRICTION_TRAITEMENT'
);

-- Table des remarques
CREATE TABLE remarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id uuid REFERENCES missions(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des sanctions
CREATE TABLE sanctions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id uuid REFERENCES missions(id) ON DELETE CASCADE,
  type sanction_type NOT NULL,
  description text NOT NULL,
  amount numeric(15, 2),
  decision_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activation RLS
ALTER TABLE remarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE sanctions ENABLE ROW LEVEL SECURITY;

-- Politiques pour les remarques
CREATE POLICY "Les utilisateurs authentifiés peuvent lire les remarques"
  ON remarks FOR SELECT TO authenticated USING (true);

CREATE POLICY "Les utilisateurs authentifiés peuvent créer des remarques"
  ON remarks FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Les utilisateurs authentifiés peuvent modifier les remarques"
  ON remarks FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Politiques pour les sanctions
CREATE POLICY "Les utilisateurs authentifiés peuvent lire les sanctions"
  ON sanctions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Les utilisateurs authentifiés peuvent créer des sanctions"
  ON sanctions FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Les utilisateurs authentifiés peuvent modifier les sanctions"
  ON sanctions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Triggers pour updated_at
CREATE TRIGGER update_remarks_updated_at
  BEFORE UPDATE ON remarks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sanctions_updated_at
  BEFORE UPDATE ON sanctions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();