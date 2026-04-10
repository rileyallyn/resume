-- SQL for Supabase Dashboard (SQL Editor)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table: resumes
CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL, -- Branch name: "Main", "Google"
    slug TEXT UNIQUE NOT NULL, -- URL slug: "main", "google"
    is_base BOOLEAN DEFAULT FALSE,
    
    -- Heading Data
    full_name TEXT DEFAULT 'Riley Smith',
    location TEXT DEFAULT 'Yucaipa, CA | College Place, WA',
    website_url TEXT DEFAULT 'https://allyn.dev',
    email TEXT DEFAULT 'riley@rileysmith.me',
    summary TEXT, -- Motivation summary

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: resume_sections
CREATE TABLE resume_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    title TEXT NOT NULL, -- "Skills", "Education", "Experience"
    display_order INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: resume_items
CREATE TABLE resume_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES resume_sections(id) ON DELETE CASCADE,
    title TEXT, -- Job Title, Degree, or Skill Category
    subtitle TEXT, -- Company or University
    date_range TEXT, -- "June 2025 - Sept 2025"
    content JSONB, -- Array of strings for bullet points or relevant courses
    display_order INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_items ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read resumes" ON resumes FOR SELECT USING (true);
CREATE POLICY "Public read sections" ON resume_sections FOR SELECT USING (true);
CREATE POLICY "Public read items" ON resume_items FOR SELECT USING (true);

-- Authenticated (Admin) write access
CREATE POLICY "Admin write resumes" ON resumes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin write sections" ON resume_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin write items" ON resume_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
