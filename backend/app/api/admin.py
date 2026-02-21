from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.core.security import get_current_user, User
from app.supabase_client import get_supabase_client
from app.schemas.job import JobResponse

router = APIRouter(prefix="/api/v1/admin", tags=["Admin"])

# Define the request schema right here
class JobApprovalRequest(BaseModel):
    approved: bool
    rejection_reason: Optional[str] = None

# Dependency to ensure only admins can access these routes
async def get_admin_user(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return current_user

@router.get("/jobs/pending", response_model=List[JobResponse])
async def get_pending_jobs(admin_user: User = Depends(get_admin_user)):
    """Get all jobs that are waiting for admin approval (status = inactive)"""
    supabase = get_supabase_client()
    response = supabase.table('jobs').select('*').eq('status', 'inactive').execute()
    return response.data

@router.post("/jobs/{job_id}/approve")
async def approve_job(
    job_id: int, 
    approval: JobApprovalRequest, 
    admin_user: User = Depends(get_admin_user)
):
    """Approve or reject a job posting"""
    supabase = get_supabase_client()
    
    # If approved, set status to active. If rejected, set to rejected.
    new_status = 'active' if approval.approved else 'rejected'
    
    response = supabase.table('jobs').update({'status': new_status}).eq('id', job_id).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Job not found")
        
    return {"message": f"Job {job_id} has been {new_status}", "job": response.data[0]}