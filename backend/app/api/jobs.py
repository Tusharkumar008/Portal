from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.security import get_recruiter_user, User
from app.models.job_store import job_store
from app.schemas.job import JobCreate, JobResponse

router = APIRouter(prefix="/api/v1/jobs", tags=["Jobs"])

@router.post("", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
async def create_job(
    job: JobCreate, 
    current_user: User = Depends(get_recruiter_user) # Only recruiters
):
    """Create a new job posting"""
    new_job = job_store.create_job(job)
    if not new_job:
        raise HTTPException(status_code=500, detail="Failed to create job")
    return new_job

@router.get("", response_model=List[JobResponse])
async def list_approved_jobs():
    """List all active jobs"""
    return job_store.get_all_approved_jobs()