export interface User {
  id: string;
  email: string;
  role: 'creator' | 'talent';
  created_at: string;
  updated_at: string;
}

export interface CreatorProfile {
  id: string;
  user_id: string;
  company_name?: string;
  bio?: string;
  website?: string;
  social_links?: string[];
  created_at: string;
  updated_at: string;
}

export interface TalentProfile {
  id: string;
  user_id: string;
  title: string;
  status: 'one_off' | 'long_term' | 'both';
  bio?: string;
  rate?: number; // Only for one_off services
  skills: string[];
  location: string;
  portfolio_links: string[];
  is_invited: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobPosting {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  job_type: 'one_off' | 'long_term';
  budget?: number; // Only for one_off services
  skills_required: string[];
  location?: string;
  is_remote: boolean;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  job_id: string;
  talent_id: string;
  cover_letter: string;
  proposed_rate?: number;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  job_id: string;
  creator_id: string;
  talent_id: string;
  title: string;
  description: string;
  budget: number;
  status: 'active' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'in_escrow' | 'released' | 'refunded';
  stripe_payment_intent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  project_id: string;
  reviewer_id: string;
  reviewed_id: string;
  rating: number; // 1-5 stars
  comment: string;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  project_id?: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface SavedJob {
  id: string;
  user_id: string;
  job_id: string;
  created_at: string;
} 