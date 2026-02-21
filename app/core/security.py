from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
import bcrypt
from pydantic import BaseModel

from app.core.config import settings

# --- SCHEMAS ---
class User(BaseModel):
    id: str
    email: str
    role: str
    is_active: bool = True

# --- SECURITY UTILS ---
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Check if a plain password matches the hashed one in the database"""
    # bcrypt requires bytes, so we encode the strings
    return bcrypt.checkpw(
        plain_password.encode('utf-8'), 
        hashed_password.encode('utf-8')
    )

def get_password_hash(password: str) -> str:
    """Hash a password for secure database storage"""
    # Generate a salt and hash the password
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    # Decode back to a string so it can be saved in Supabase
    return hashed.decode('utf-8')

def create_access_token(user_id: str, email: str, role: str, expires_delta: Optional[timedelta] = None):
    """Generate a JWT login token"""
    to_encode = {"sub": email, "user_id": user_id, "role": role}
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        # Default token expiration is 24 hours
        expire = datetime.utcnow() + timedelta(hours=24)
        
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    
    return {"access_token": encoded_jwt, "token_type": "bearer"}

async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    """Dependency to get the currently logged-in user from their token"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        email: str = payload.get("sub")
        role: str = payload.get("role")
        user_id: str = payload.get("user_id")
        
        if email is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
        
    return User(id=user_id, email=email, role=role)

async def get_recruiter_user(current_user: User = Depends(get_current_user)) -> User:
    """Dependency to ensure the current user is a recruiter or admin"""
    if current_user.role not in ["recruiter", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Recruiter privileges required"
        )
    return current_user