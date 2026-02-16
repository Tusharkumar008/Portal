from fastapi import APIRouter, Depends, HTTPException, status

from app.core.security import get_admin_user, User
from app.schemas.job import JobApprovalRequest, JobPostingResponse
from app.models.job_store import job_store

router = APIRouter(prefix="/api/v1/admin", tags=["Admin"])


@router.get(
    "/jobs/pending",
    response_model=list[JobPostingResponse],
    summary="Get pending jobs for approval"
)
async def get_pending_jobs(current_user: User = Depends(get_admin_user)):
    """
    Get all pending job postings awaiting admin approval.
    
    **Requirements:**
    - User must be authenticated
    - User must have ADMIN role
    
    **Response:**
    - List of all PENDING jobs
    """
    jobs = job_store.get_pending_jobs()
    return [JobPostingResponse(**job.to_dict()) for job in jobs]


@router.post(
    "/jobs/{job_id}/approve",
    response_model=JobPostingResponse,
    summary="Approve a job posting"
)
async def approve_job(
    job_id: str,
    approval_data: JobApprovalRequest,
    current_user: User = Depends(get_admin_user),
):
    """
    Approve or reject a pending job posting.
    
    **Requirements:**
    - User must be authenticated
    - User must have ADMIN role
    
    **Actions:**
    - If `approved: true` -> status changes to APPROVED, job becomes visible
    - If `approved: false` -> status changes to REJECTED, rejection_reason required
    """
    job = job_store.get_job(job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    
    if job.status.value != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Job is already {job.status.value}, cannot modify"
        )
    
    if approval_data.approved:
        job_store.approve_job(job_id)
    else:
        job_store.reject_job(job_id, approval_data.rejection_reason or "No reason provided")
    
    updated_job = job_store.get_job(job_id)
    return JobPostingResponse(**updated_job.to_dict())


@router.get(
    "/jobs/{job_id}",
    response_model=JobPostingResponse,
    summary="Get job details (admin view)"
)
async def get_job_admin(
    job_id: str,
    current_user: User = Depends(get_admin_user),
):
    """
    Get full details of any job posting (for moderation).
    
    **Requirements:**
    - User must be authenticated
    - User must have ADMIN role
    """
    job = job_store.get_job(job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    return JobPostingResponse(**job.to_dict())
