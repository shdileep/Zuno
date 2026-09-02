-- ==========================================================
-- ZUNO DASHBOARD - SUPABASE DATABASE INITIALIZATION SCHEMA
-- Project Ref: ljedommugttmgbkboevi
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/ljedommugttmgbkboevi/sql/new
-- ==========================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT UNIQUE,
    name TEXT NOT NULL,
    username TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    phone TEXT,
    avatar_url TEXT,
    profession TEXT,
    city TEXT,
    dob DATE,
    college TEXT,
    degree TEXT,
    degree_other TEXT,
    branch TEXT,
    branch_other TEXT,
    specialization TEXT,
    from_month TEXT,
    from_year TEXT,
    to_month TEXT,
    to_year TEXT,
    preferred_role TEXT,
    desired_designation TEXT,
    expected_salary TEXT,
    location_pref TEXT,
    portfolio_url TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    leetcode_url TEXT,
    codechef_url TEXT,
    hackerrank_url TEXT,
    hackerearth_url TEXT,
    about TEXT,
    resume_url TEXT,
    goals TEXT[],
    skills TEXT[],
    total_earnings NUMERIC DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Opportunities Table
CREATE TABLE IF NOT EXISTS public.opportunities (
    id TEXT PRIMARY KEY,
    company_name TEXT NOT NULL,
    company_logo TEXT,
    website_url TEXT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    duration TEXT NOT NULL,
    deadline DATE,
    stipend NUMERIC NOT NULL,
    stipend_display TEXT,
    roles TEXT,
    responsibilities TEXT[],
    obligations TEXT[],
    tags TEXT[],
    google_form_url TEXT,
    posted_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Applications Table
CREATE TABLE IF NOT EXISTS public.applications (
    id TEXT PRIMARY KEY,
    opportunity_id TEXT REFERENCES public.opportunities(id) ON DELETE CASCADE,
    candidate_email TEXT NOT NULL,
    candidate_name TEXT,
    candidate_phone TEXT,
    job_title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    company_logo TEXT,
    location TEXT,
    stipend NUMERIC,
    stipend_display TEXT,
    duration TEXT,
    status TEXT DEFAULT 'SUBMITTED',
    profile_viewed BOOLEAN DEFAULT FALSE,
    applied_date DATE DEFAULT CURRENT_DATE,
    candidate_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Payments Ledger Table
CREATE TABLE IF NOT EXISTS public.payments (
    id TEXT PRIMARY KEY,
    candidate_email TEXT NOT NULL,
    employer_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    status TEXT DEFAULT 'VERIFIED',
    payout_date DATE DEFAULT CURRENT_DATE,
    transaction_ref TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) & Allow Read/Write with Publishable Key
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Anonymous/Authenticated Public Access Policies (for seamless demo & dashboard operations)
CREATE POLICY "Public profiles access" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public opportunities access" ON public.opportunities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public applications access" ON public.applications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public payments access" ON public.payments FOR ALL USING (true) WITH CHECK (true);

-- Insert Default Seed Opportunities
INSERT INTO public.opportunities (id, company_name, company_logo, website_url, title, category, location, duration, deadline, stipend, stipend_display, roles, responsibilities, obligations, tags, posted_date)
VALUES 
('opp_101', 'HyperGrowth Media', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80', 'https://hypergrowthmedia.io', 'Short-Form Video Editor & Reels Specialist', 'video', 'Bengaluru', '3 Months', '2026-09-25', 28000, '₹28,000 / month', 'Edit high-retention short form videos for top tier venture-backed founders.', ARRAY['Edit 12-15 high energy reels per week', 'Optimize hooks and retention metrics', 'Collaborate with scripting team'], ARRAY['Deliver first cut within 24h', 'Maintain confidentiality', 'Attend weekly sync'], ARRAY['Premiere Pro', 'After Effects', 'CapCut', 'Retention Hooks'], '2026-08-29'),
('opp_102', 'NeuraScale AI', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80', 'https://neurascale.ai', 'Full Stack Developer (Spring Boot & Vue.js)', 'tech', 'Bengaluru', '6 Months', '2026-10-01', 35000, '₹35,000 / month', 'Build scalable REST microservices and dashboard components for our enterprise AI copilot platform.', ARRAY['Develop high-throughput REST APIs using Spring Boot', 'Build reactive UI modules in Vue.js / Tailwind', 'Optimize PostgreSQL queries'], ARRAY['Write clean unit and integration tests', 'Participate in agile sprint ceremonies', 'Document API contracts'], ARRAY['Java', 'Spring Boot', 'REST API', 'PostgreSQL', 'Docker'], '2026-08-30'),
('opp_103', 'EdVenture Academy', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&auto=format&fit=crop&q=80', 'https://edventure.academy', 'Math & Coding Curriculum Creator', 'education', 'Delhi', '4 Months', '2026-09-15', 22000, '₹22,000 / month', 'Design interactive STEM problem sets, gamified modules, and video explanations for K-12 learners.', ARRAY['Author 40+ interactive problem walkthroughs weekly', 'Review peer curriculum modules for clarity', 'Incorporate visual analogies'], ARRAY['Adhere strictly to pedagogical guidelines', 'Ensure 100% mathematical accuracy', 'Meet bi-weekly delivery milestones'], ARRAY['Curriculum Design', 'Python', 'STEM Pedagogy', 'Interactive Learning'], '2026-08-28')
ON CONFLICT (id) DO NOTHING;
