/*
  # Create RSVP Responses Table

  1. New Tables
    - `rsvp_responses`
      - `id` (uuid, primary key)
      - `name` (text, guest name)
      - `email` (text, unique per event)
      - `phone` (text, contact number)
      - `attending` (boolean, attendance status)
      - `number_of_guests` (integer, total guests including primary)
      - `dietary_restrictions` (text, optional dietary needs)
      - `message` (text, optional message to host)
      - `qr_code` (text, QR code data for attending guests)
      - `event_id` (text, event identifier)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `rsvp_responses` table
    - Add policy for public read/write access (for demo purposes)
    - In production, you'd want more restrictive policies
*/

CREATE TABLE IF NOT EXISTS rsvp_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  attending boolean NOT NULL DEFAULT false,
  number_of_guests integer NOT NULL DEFAULT 1,
  dietary_restrictions text DEFAULT '',
  message text DEFAULT '',
  qr_code text,
  event_id text NOT NULL DEFAULT 'birthday-2025-sarah-johnson',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(email, event_id)
);

ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Allow public access for demo purposes
-- In production, you'd want more restrictive policies
CREATE POLICY "Allow public read access to RSVP responses"
  ON rsvp_responses
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to RSVP responses"
  ON rsvp_responses
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to RSVP responses"
  ON rsvp_responses
  FOR UPDATE
  TO public
  USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_rsvp_responses_event_id ON rsvp_responses(event_id);
CREATE INDEX IF NOT EXISTS idx_rsvp_responses_email ON rsvp_responses(email);