from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any
import jwt
from jwt import PyJWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel

from app.core.config import settings


class HTTPAuthCredentials:
    """HTTP credentials holder"""
    def __init__(self, scheme: str, credentials: str):
        self.scheme = scheme
        self.credentials = credentials


class TokenData(BaseModel):
    """Token payload data"""
    sub: str  # user_id
    user_id: str
    email: str
    role: str  # "recruiter", "admin", "user"
    exp: Optional[datetime] = None


class User(BaseModel):
    """User model"""
    id: str
    email: str
    role: str  # "recruiter", "admin", "user"
    is_active: bool = True


def create_access_token(
    user_id: str,
    email: str,
    role: str,
    expires_delta: Optional[timedelta] = None
) -> Dict[str, Any]:
    """Create JWT access token with expiry"""
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.access_token_expire_minutes
        )
    
    payload = {
        "user_id": user_id,
        "email": email,
        "role": role,
        "exp": expire,
        "iat": datetime.now(timezone.utc),
    }
    
    encoded_jwt = jwt.encode(
        payload,
        settings.secret_key,
        algorithm=settings.algorithm
    )
    
    return {
        "access_token": encoded_jwt,
        "token_type": "bearer",
        "expires_in": int(expires_delta.total_seconds() if expires_delta else settings.access_token_expire_minutes * 60),
    }


# Setup HTTP Bearer security
security = HTTPBearer(auto_error=False)


async def get_current_user(
    credentials: Optional[HTTPAuthCredentials] = Depends(security),
) -> User:
    """Verify JWT token and return current user"""
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = credentials.credentials
    
    try:
        payload = jwt.decode(
            token,
            settings.secret_key,
            algorithms=[settings.algorithm]
        )
        user_id: str = payload.get("user_id")
        email: str = payload.get("email")
        role: str = payload.get("role")
        
        if user_id is None or email is None or role is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
            )
        
        return User(
            id=user_id,
            email=email,
            role=role,
            is_active=True
        )
    
    except PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_recruiter_user(current_user: User = Depends(get_current_user)) -> User:
    """Verify user is a recruiter"""
    if current_user.role != "recruiter":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Recruiter access only - you do not have permission to post jobs",
        )
    return current_user


async def get_admin_user(current_user: User = Depends(get_current_user)) -> User:
    """Verify user is an admin"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access only",
        )
    return current_user
