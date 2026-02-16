-- Supabase Database Schema for Jobs Table

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recruiter_id TEXT NOT NULL,
    title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    location TEXT NOT NULL,
    employment_type TEXT NOT NULL,
    experience_required INTEGER NOT NULL,
    salary_min INTEGER,
    salary_max INTEGER,
    salary_disclosed BOOLEAN DEFAULT true,
    skills_required TEXT[] DEFAULT '{}',
    job_description TEXT NOT NULL,
    responsibilities TEXT NOT NULL,
    qualifications TEXT NOT NULL,
    number_of_openings INTEGER NOT NULL DEFAULT 1,
    application_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP WITH TIME ZONE
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_jobs_recruiter_id ON jobs (recruiter_id);

CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs (status);

CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs (created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policy for recruiters to see their own jobs
CREATE POLICY "Recruiters can see own jobs" ON jobs FOR
SELECT USING (recruiter_id = auth.uid ());

-- Create policy for admins to see all jobs
CREATE POLICY "Admins can see all jobs" ON jobs FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM users
            WHERE
                users.id = auth.uid ()
                AND users.role = 'admin'
        )
    );

-- Create policy for authenticated users to see approved jobs
CREATE POLICY "Authenticated users can see approved jobs" ON jobs FOR
SELECT USING (
        status = 'approved'
        OR recruiter_id = auth.uid ()
    );

-- Create policy for recruiters to insert jobs
CREATE POLICY "Recruiters can insert jobs" ON jobs FOR
INSERT
WITH
    CHECK (recruiter_id = auth.uid ());

-- Create policy for recruiters to update their own jobs
CREATE POLICY "Recruiters can update own jobs" ON jobs FOR
UPDATE USING (recruiter_id = auth.uid ());

-- Create policy for admins to update any job
CREATE POLICY "Admins can update any job" ON jobs FOR
UPDATE USING (
    EXISTS (
        SELECT 1
        FROM users
        WHERE
            users.id = auth.uid ()
            AND users.role = 'admin'
    )
);