"""
Job storage using Supabase database
"""
from typing import Dict, List, Optional
from datetime import datetime
from app.models.job import JobPosting, JobStatus
from app.supabase_client import get_supabase_client
import uuid


class JobStore:
    """Job storage using Supabase database"""
    
    def __init__(self):
        self.supabase = get_supabase_client()
    
    def _row_to_job(self, row: dict) -> JobPosting:
        """Convert a database row to a JobPosting object"""
        if not row:
            return None
        
        # Handle skills_required - could be a list or string representation
        skills = row.get('skills_required', [])
        if isinstance(skills, str):
            # If it's a string, try to parse it as a JSON array
            import json
            try:
                skills = json.loads(skills)
            except:
                skills = []
        
        return JobPosting(
            id=row['id'],
            recruiter_id=row['recruiter_id'],
            title=row['title'],
            company_name=row['company_name'],
            location=row['location'],
            employment_type=row['employment_type'],
            experience_required=row['experience_required'],
            salary_min=row.get('salary_min'),
            salary_max=row.get('salary_max'),
            salary_disclosed=row.get('salary_disclosed', True),
            skills_required=skills,
            job_description=row['job_description'],
            responsibilities=row['responsibilities'],
            qualifications=row['qualifications'],
            number_of_openings=row['number_of_openings'],
            application_deadline=row['application_deadline'],
            status=row['status'],
            rejection_reason=row.get('rejection_reason'),
            created_at=row.get('created_at'),
            updated_at=row.get('updated_at'),
            approved_at=row.get('approved_at'),
        )
    
    def create_job(self, job_data: dict, recruiter_id: str) -> JobPosting:
        """Create a new job posting"""
        job_id = str(uuid.uuid4())
        
        # Prepare the job data for Supabase
        job_dict = {
            'id': job_id,
            'recruiter_id': recruiter_id,
            'title': job_data.get('title'),
            'company_name': job_data.get('company_name'),
            'location': job_data.get('location'),
            'employment_type': job_data.get('employment_type'),
            'experience_required': job_data.get('experience_required'),
            'salary_min': job_data.get('salary_min'),
            'salary_max': job_data.get('salary_max'),
            'salary_disclosed': job_data.get('salary_disclosed', True),
            'skills_required': job_data.get('skills_required', []),
            'job_description': job_data.get('job_description'),
            'responsibilities': job_data.get('responsibilities'),
            'qualifications': job_data.get('qualifications'),
            'number_of_openings': job_data.get('number_of_openings', 1),
            'application_deadline': job_data.get('application_deadline'),
            'status': JobStatus.PENDING.value,
            'created_at': datetime.utcnow().isoformat(),
            'updated_at': datetime.utcnow().isoformat(),
        }
        
        # Insert into Supabase
        response = self.supabase.table('jobs').insert(job_dict).execute()
        
        if response.data:
            return self._row_to_job(response.data[0])
        
        return None
    
    def get_job(self, job_id: str) -> Optional[JobPosting]:
        """Get a job by ID"""
        response = self.supabase.table('jobs').select('*').eq('id', job_id).execute()
        
        if response.data:
            return self._row_to_job(response.data[0])
        
        return None
    
    def get_recruiter_jobs(self, recruiter_id: str) -> List[JobPosting]:
        """Get all jobs by recruiter"""
        response = self.supabase.table('jobs').select('*').eq('recruiter_id', recruiter_id).execute()
        
        return [self._row_to_job(row) for row in response.data]
    
    def get_pending_jobs(self) -> List[JobPosting]:
        """Get all pending jobs for admin approval"""
        response = self.supabase.table('jobs').select('*').eq('status', JobStatus.PENDING.value).execute()
        
        return [self._row_to_job(row) for row in response.data]
    
    def approve_job(self, job_id: str) -> Optional[JobPosting]:
        """Approve a job posting"""
        update_data = {
            'status': JobStatus.APPROVED.value,
            'approved_at': datetime.utcnow().isoformat(),
            'updated_at': datetime.utcnow().isoformat(),
        }
        
        response = self.supabase.table('jobs').update(update_data).eq('id', job_id).execute()
        
        if response.data:
            return self._row_to_job(response.data[0])
        
        return None
    
    def reject_job(self, job_id: str, reason: str) -> Optional[JobPosting]:
        """Reject a job posting"""
        update_data = {
            'status': JobStatus.REJECTED.value,
            'rejection_reason': reason,
            'updated_at': datetime.utcnow().isoformat(),
        }
        
        response = self.supabase.table('jobs').update(update_data).eq('id', job_id).execute()
        
        if response.data:
            return self._row_to_job(response.data[0])
        
        return None
    
    def get_all_approved_jobs(self) -> List[JobPosting]:
        """Get all approved jobs (visible to job seekers)"""
        response = self.supabase.table('jobs').select('*').eq('status', JobStatus.APPROVED.value).execute()
        
        return [self._row_to_job(row) for row in response.data]


# Global instance
job_store = JobStore()
