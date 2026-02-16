from enum import Enum
from datetime import datetime
from typing import Optional, List


class JobStatus(str, Enum):
    """Job posting status"""
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    EXPIRED = "expired"


class EmploymentType(str, Enum):
    """Employment type"""
    FULL_TIME = "full-time"
    PART_TIME = "part-time"
    INTERNSHIP = "internship"
    CONTRACT = "contract"


class JobLocation(str, Enum):
    """Job location type"""
    ON_SITE = "on-site"
    REMOTE = "remote"
    HYBRID = "hybrid"


class JobPosting:
    """Job posting data model - can be replaced with ORM model later"""
    
    def __init__(
        self,
        id: str,
        recruiter_id: str,
        title: str,
        company_name: str,
        location: JobLocation,
        employment_type: EmploymentType,
        experience_required: int,
        salary_min: Optional[int],
        salary_max: Optional[int],
        salary_disclosed: bool,
        skills_required: List[str],
        job_description: str,
        responsibilities: str,
        qualifications: str,
        number_of_openings: int,
        application_deadline: datetime,
        status: JobStatus = JobStatus.PENDING,
        rejection_reason: Optional[str] = None,
        created_at: datetime = None,
        updated_at: datetime = None,
        approved_at: Optional[datetime] = None,
    ):
        self.id = id
        self.recruiter_id = recruiter_id
        self.title = title
        self.company_name = company_name
        self.location = location
        self.employment_type = employment_type
        self.experience_required = experience_required
        self.salary_min = salary_min
        self.salary_max = salary_max
        self.salary_disclosed = salary_disclosed
        self.skills_required = skills_required
        self.job_description = job_description
        self.responsibilities = responsibilities
        self.qualifications = qualifications
        self.number_of_openings = number_of_openings
        self.application_deadline = application_deadline
        self.status = status
        self.rejection_reason = rejection_reason
        self.created_at = created_at or datetime.utcnow()
        self.updated_at = updated_at or datetime.utcnow()
        self.approved_at = approved_at
    
    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return {
            "id": self.id,
            "recruiter_id": self.recruiter_id,
            "title": self.title,
            "company_name": self.company_name,
            "location": self.location.value if isinstance(self.location, JobLocation) else self.location,
            "employment_type": self.employment_type.value if isinstance(self.employment_type, EmploymentType) else self.employment_type,
            "experience_required": self.experience_required,
            "salary_min": self.salary_min,
            "salary_max": self.salary_max,
            "salary_disclosed": self.salary_disclosed,
            "skills_required": self.skills_required,
            "job_description": self.job_description,
            "responsibilities": self.responsibilities,
            "qualifications": self.qualifications,
            "number_of_openings": self.number_of_openings,
            "application_deadline": self.application_deadline.isoformat(),
            "status": self.status.value if isinstance(self.status, JobStatus) else self.status,
            "rejection_reason": self.rejection_reason,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "approved_at": self.approved_at.isoformat() if self.approved_at else None,
        }
