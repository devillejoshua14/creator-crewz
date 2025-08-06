-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('creator', 'talent')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creator profiles
CREATE TABLE creator_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  company_name TEXT,
  bio TEXT,
  website TEXT,
  social_links TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Talent profiles
CREATE TABLE talent_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  title TEXT NOT NULL,
  status TEXT CHECK (status IN ('one_off', 'long_term', 'both')) NOT NULL,
  bio TEXT,
  rate DECIMAL(10,2), -- Only for one_off services
  skills TEXT[] NOT NULL,
  location TEXT NOT NULL,
  portfolio_links TEXT[],
  is_invited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job postings
CREATE TABLE job_postings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  job_type TEXT CHECK (job_type IN ('one_off', 'long_term')) NOT NULL,
  budget DECIMAL(10,2), -- Only for one_off services
  skills_required TEXT[] NOT NULL,
  location TEXT,
  is_remote BOOLEAN DEFAULT FALSE,
  status TEXT CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')) DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications
CREATE TABLE applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
  talent_id UUID REFERENCES users(id) ON DELETE CASCADE,
  cover_letter TEXT NOT NULL,
  proposed_rate DECIMAL(10,2),
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, talent_id)
);

-- Projects (for one_off services with escrow)
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  talent_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  budget DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('active', 'completed', 'cancelled')) DEFAULT 'active',
  payment_status TEXT CHECK (payment_status IN ('pending', 'in_escrow', 'released', 'refunded')) DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reviewed_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, reviewer_id)
);

-- Messages
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Saved jobs
CREATE TABLE saved_jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  job_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_talent_profiles_status ON talent_profiles(status);
CREATE INDEX idx_talent_profiles_location ON talent_profiles USING GIN(location gin_trgm_ops);
CREATE INDEX idx_talent_profiles_skills ON talent_profiles USING GIN(skills);
CREATE INDEX idx_job_postings_status ON job_postings(status);
CREATE INDEX idx_job_postings_job_type ON job_postings(job_type);
CREATE INDEX idx_job_postings_skills ON job_postings USING GIN(skills_required);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_payment_status ON projects(payment_status);
CREATE INDEX idx_messages_sender_receiver ON messages(sender_id, receiver_id);
CREATE INDEX idx_messages_project ON messages(project_id);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE talent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);

-- Creator profiles: users can read all, creators can update their own
CREATE POLICY "Anyone can view creator profiles" ON creator_profiles FOR SELECT USING (true);
CREATE POLICY "Creators can update own profile" ON creator_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Creators can insert own profile" ON creator_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Talent profiles: users can read all, talent can update their own
CREATE POLICY "Anyone can view talent profiles" ON talent_profiles FOR SELECT USING (true);
CREATE POLICY "Talent can update own profile" ON talent_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Talent can insert own profile" ON talent_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Job postings: anyone can read, creators can manage their own
CREATE POLICY "Anyone can view job postings" ON job_postings FOR SELECT USING (true);
CREATE POLICY "Creators can manage own job postings" ON job_postings FOR ALL USING (auth.uid() = creator_id);

-- Applications: applicants and job creators can view
CREATE POLICY "Job creators can view applications" ON applications FOR SELECT USING (
  EXISTS (SELECT 1 FROM job_postings WHERE id = applications.job_id AND creator_id = auth.uid())
);
CREATE POLICY "Applicants can view own applications" ON applications FOR SELECT USING (auth.uid() = talent_id);
CREATE POLICY "Talent can create applications" ON applications FOR INSERT WITH CHECK (auth.uid() = talent_id);
CREATE POLICY "Job creators can update applications" ON applications FOR UPDATE USING (
  EXISTS (SELECT 1 FROM job_postings WHERE id = applications.job_id AND creator_id = auth.uid())
);

-- Projects: participants can view and manage
CREATE POLICY "Project participants can view projects" ON projects FOR SELECT USING (
  auth.uid() = creator_id OR auth.uid() = talent_id
);
CREATE POLICY "Project participants can update projects" ON projects FOR UPDATE USING (
  auth.uid() = creator_id OR auth.uid() = talent_id
);
CREATE POLICY "Job creators can create projects" ON projects FOR INSERT WITH CHECK (auth.uid() = creator_id);

-- Reviews: anyone can read, project participants can create
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Project participants can create reviews" ON reviews FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM projects WHERE id = reviews.project_id AND (creator_id = auth.uid() OR talent_id = auth.uid()))
);

-- Messages: participants can view and send
CREATE POLICY "Message participants can view messages" ON messages FOR SELECT USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Saved jobs: users can manage their own
CREATE POLICY "Users can manage own saved jobs" ON saved_jobs FOR ALL USING (auth.uid() = user_id);

-- Functions for updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_creator_profiles_updated_at BEFORE UPDATE ON creator_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_talent_profiles_updated_at BEFORE UPDATE ON talent_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_postings_updated_at BEFORE UPDATE ON job_postings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 