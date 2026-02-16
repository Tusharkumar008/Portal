from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.core.config import settings
from app.api import jobs, admin, auth



# Create FastAPI app
app = FastAPI(
    title=settings.app_name,
    description="Post Job Module API for Job Portal",
    version="1.0.0",
)

# Rate limiter
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.backend_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(auth.router)
app.include_router(jobs.router)
app.include_router(admin.router)


@app.get("/", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "app": settings.app_name,
        "version": "1.0.0"
    }


@app.get("/api/v1/docs", tags=["Docs"])
async def get_docs():
    """API Documentation"""
    return {
        "message": "Visit /docs for interactive API documentation (Swagger UI)",
        "endpoints": {
            "auth": [
                "POST /api/v1/auth/login - Authenticate and get JWT token",
                "GET /api/v1/auth/me - Get current user info"
            ],
            "jobs": [
                "POST /api/v1/jobs - Create job (recruiter only)",
                "GET /api/v1/jobs/my-jobs - Get recruiter's jobs",
                "GET /api/v1/jobs/{job_id} - Get job details",
                "GET /api/v1/jobs - List all approved jobs"
            ],
            "admin": [
                "GET /api/v1/admin/jobs/pending - Get pending jobs (admin only)",
                "POST /api/v1/admin/jobs/{job_id}/approve - Approve/reject job (admin only)"
            ]
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug
    )
