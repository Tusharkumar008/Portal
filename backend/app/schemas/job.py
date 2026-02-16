from pydantic import BaseModel, Field, field_validator
from datetime import datetime
from typing import Optional, List
from app.models.job import JobStatus, EmploymentType, JobLocation


class JobPostingCreate(BaseModel):
    """Schema for creating a job posting"""
    title: str = Field(..., min_length=3, max_length=200, description="Job title")
    company_name: str = Field(..., min_length=2, max_length=200, description="Company name")
    location: JobLocation = Field(..., description="Job location type")
    employment_type: EmploymentType = Field(..., description="Employment type")
    experience_required: int = Field(..., ge=0, le=70, description="Years of experience required")
    salary_min: Optional[int] = Field(None, ge=0, description="Minimum salary")
    salary_max: Optional[int] = Field(None, ge=0, description="Maximum salary")
    salary_disclosed: bool = Field(True, description="Whether to disclose salary")
    skills_required: List[str] = Field(..., min_items=1, max_items=20, description="Required skills")
    job_description: str = Field(..., min_length=50, max_length=5000, description="Job description")
    responsibilities: str = Field(..., min_length=50, max_length=5000, description="Job responsibilities")
    qualifications: str = Field(..., min_length=50, max_length=5000, description="Required qualifications")
    number_of_openings: int = Field(..., ge=1, le=1000, description="Number of openings")
    application_deadline: datetime = Field(..., description="Application deadline")
    
    @field_validator("salary_min", "salary_max")
    @classmethod
    def validate_salary(cls, v):
        """Ensure salary is not negative"""
        if v is not None and v < 0:
            raise ValueError("Salary cannot be negative")
        return v
    
    @field_validator("salary_max")
    @classmethod
    def validate_salary_range(cls, v, info):
        """Ensure max salary >= min salary"""
        if v is not None and info.data.get("salary_min") is not None:
            if v < info.data.get("salary_min"):
                raise ValueError("Maximum salary must be >= minimum salary")
        return v
    
    @field_validator("application_deadline")
    @classmethod
    def validate_deadline(cls, v):
        """Ensure deadline is in the future"""
        if v <= datetime.utcnow():
            raise ValueError("Application deadline must be in the future")
        return v
    
    @field_validator("skills_required")
    @classmethod
    def validate_skills(cls, v):
        """Ensure no duplicate skills"""
        if len(v) != len(set(v)):
            raise ValueError("Duplicate skills are not allowed")
        return [skill.strip().lower() for skill in v]


class JobPostingResponse(BaseModel):
    """Schema for job posting response"""
    id: str
    recruiter_id: str
    title: str
    company_name: str
    location: str
    employment_type: str
    experience_required: int
    salary_min: Optional[int]
    salary_max: Optional[int]
    salary_disclosed: bool
    skills_required: List[str]
    job_description: str
    responsibilities: str
    qualifications: str
    number_of_openings: int
    application_deadline: str
    status: str
    rejection_reason: Optional[str] = None
    created_at: str
    updated_at: str
    approved_at: Optional[str] = None


class JobApprovalRequest(BaseModel):
    """Schema for approving a job"""
    approved: bool = Field(..., description="Approve or reject job")
    rejection_reason: Optional[str] = Field(None, max_length=500, description="Reason for rejection (if rejected)")
    
    @field_validator("rejection_reason")
    @classmethod
    def validate_rejection_reason(cls, v, info):
        """Ensure rejection reason is provided if rejecting"""
        if info.data.get("approved") is False and not v:
            raise ValueError("Rejection reason is required when rejecting a job")
        return v


class JobListResponse(BaseModel):
    """Schema for listing jobs"""
    id: str
    title: str
    company_name: str
    location: str
    employment_type: str
    experience_required: int
    status: str
    created_at: str
