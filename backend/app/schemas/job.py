from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class JobCreate(BaseModel):
    job_title: str
    company: str
    location: str
    full_part_time: str
    min_yoe: int
    salary_budget: Optional[str] = None
    jd: str
    skill1: Optional[str] = None
    skill2: Optional[str] = None
    skill3: Optional[str] = None
    email_contact: str
    last_date_apply: Optional[date] = None

class JobResponse(JobCreate):
    id: int
    created_at: Optional[datetime] = None
    status: Optional[str] = None
    views: Optional[int] = 0

    class Config:
        from_attributes = True