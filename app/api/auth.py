from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.security import (
    create_access_token, 
    get_password_hash, 
    verify_password,
    get_current_user
)
from app.core.config import settings
from app.models.user_store import user_store
from app.schemas.user import User, UserCreate, UserLogin, Token

router = APIRouter(prefix="/api/v1/auth", tags=["Auth"])

@router.post("/signup", response_model=Token)
async def signup(user: UserCreate):
    # Check if user exists
    db_user = user_store.get_user_by_email(user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    hashed_password = get_password_hash(user.password)
    new_user_data = user_store.create_user(user, hashed_password)
    
    if not new_user_data:
        raise HTTPException(status_code=500, detail="Failed to create user")
        
    # Generate token
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": new_user_data
    }

@router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin):
    # Check user
    user_data = user_store.get_user_by_email(user_credentials.email)
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    # Check password
    if not verify_password(user_credentials.password, user_data['password_hash']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Generate token
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user_data['email'], "role": user_data['role']},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": user_data
    }

@router.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user