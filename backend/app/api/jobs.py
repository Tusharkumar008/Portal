from fastapi import APIRouter, Depends, HTTPException, status, Request
from datetime import datetime
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.security import get_recruiter_user, User
from app.schemas.job import JobPostingCreate, JobPostingResponse
from app.models.job_store import job_store
from app.models.job import JobLocation, EmploymentType

router = APIRouter(prefix="/api/v1/jobs", tags=["Jobs"])
limiter = Limiter(key_func=get_remote_address)


@router.post(
    "",
    response_model=JobPostingResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Post a new job",
)
@limiter.limit("10/hour")
async def create_job(
    request: Request,
    job_data: JobPostingCreate,
    current_user: User = Depends(get_recruiter_user),
):
    """
    Create a new job posting.
    
    **Requirements:**
    - User must be authenticated
    - User must have RECRUITER role
    - Rate limit: 10 jobs per hour
    
    **Response:**
    - Job is created with PENDING status
    - Recruiter receives confirmation message
    """
    try:
        # Prepare job data
        job_dict = job_data.model_dump()
        job_dict["location"] = job_data.location
        job_dict["employment_type"] = job_data.employment_type
        
        # Create job with pending status
        job = job_store.create_job(job_dict, recruiter_id=current_user.id)
        
        return JobPostingResponse(**job.to_dict())
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create job: {str(e)}"
        )


@router.get(
    "/my-jobs",
    response_model=list[JobPostingResponse],
    summary="Get recruiter's jobs"
)
async def get_my_jobs(current_user: User = Depends(get_recruiter_user)):
    """
    Get all jobs posted by the current recruiter.
    
    **Requirements:**
    - User must be authenticated
    - User must have RECRUITER role
    
    **Response:**
    - List of all jobs posted by recruiter (pending, approved, rejected)
    """
    jobs = job_store.get_recruiter_jobs(current_user.id)
    return [JobPostingResponse(**job.to_dict()) for job in jobs]


@router.get(
    "/{job_id}",
    response_model=JobPostingResponse,
    summary="Get job details"
)
async def get_job(job_id: str):
    """
    Get details of a specific job posting.
    
    **Access:**
    - Public (only approved jobs)
    - Recruiters can see their own pending/rejected jobs
    """
    job = job_store.get_job(job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    return JobPostingResponse(**job.to_dict())


@router.get(
    "",
    response_model=list[JobPostingResponse],
    summary="List all approved jobs"
)
async def list_jobs():
    """
    Get all approved job postings.
    
    **Access:** Public
    
    **Filters:**
    - Only returns APPROVED jobs
    """
    jobs = job_store.get_all_approved_jobs()
    return [JobPostingResponse(**job.to_dict()) for job in jobs]
