from app.supabase_client import get_supabase_client
from app.schemas.job import JobCreate
from datetime import datetime

class JobStore:
    def __init__(self):
        self.supabase = get_supabase_client()

    def create_job(self, job_data: JobCreate) -> dict:
        job_dict = job_data.model_dump()
        
        # Convert date to string if it exists
        if job_dict.get('last_date_apply'):
            job_dict['last_date_apply'] = job_dict['last_date_apply'].isoformat()
            
        job_dict["status"] = "inactive" # Defaults to inactive for admin approval
        job_dict["updated_at"] = datetime.utcnow().date().isoformat()
        job_dict["views"] = 0
        
        response = self.supabase.table('jobs').insert(job_dict).execute()
        return response.data[0] if response.data else None

    def get_all_approved_jobs(self):
        # Only fetch active jobs for the main page
        response = self.supabase.table('jobs').select('*').eq('status', 'active').execute()
        return response.data

job_store = JobStore()