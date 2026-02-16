from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings"""
    
    # FastAPI
    app_name: str = "Job Portal Post Job Module"
    debug: bool = True
    api_v1_str: str = "/api/v1"
    
    # CORS
    backend_cors_origins: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5174",
        "http://localhost:5174",
    ]
    
    # JWT
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Rate limiting
    rate_limit_jobs_per_hour: int = 10
    
    # Supabase
    supabase_url: str = "https://oizqisfjgekhzrdiyuek.supabase.co"
    supabase_key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9penFpc2ZqZ2VraHpyZGl5dWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MDA1NTEsImV4cCI6MjA3ODE3NjU1MX0.O984ZpEVHIi2cxaPZOzE-LtVZwcdrFAvHMfF3NhFZEU"
    
    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
