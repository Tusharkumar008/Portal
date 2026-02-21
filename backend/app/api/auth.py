from datetime import datetime
import uuid
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, Field

# Ensure you have get_password_hash and verify_password in your security.py file!
from app.core.security import (
    create_access_token, 
    User, 
    get_current_user, 
    get_password_hash, 
    verify_password
)
from app.supabase_client import get_supabase_client

router = APIRouter(prefix="/api/v1", tags=["Auth"])

# --- SCHEMAS ---
class SignupRequest(BaseModel):
    name: str = Field(..., description="User full name")
    email: str = Field(..., description="User email")
    password: str = Field(..., description="User password")
    role: str = Field("user", description="User role: user, recruiter, or admin")

class LoginRequest(BaseModel):
    email: str = Field(..., description="User email")
    password: str = Field(..., description="User password")
    role: str = Field("user", description="User role: user, recruiter, or admin")

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

# --- ROUTES ---

@router.post("/auth/signup", response_model=LoginResponse, summary="User signup")
async def signup(credentials: SignupRequest):
    supabase = get_supabase_client()
    
    # 1. Check if email is already in the database
    existing_user = supabase.table('users').select('*').eq('email', credentials.email).execute()
    if existing_user.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # 2. Hash the password and prepare data
    user_id = str(uuid.uuid4())
    hashed_pw = get_password_hash(credentials.password)
    
    new_user_data = {
        "id": user_id,
        "email": credentials.email,
        "password_hash": hashed_pw,
        "name": credentials.name,
        "role": credentials.role,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }
    
    # 3. Save to Supabase
    response = supabase.table('users').insert(new_user_data).execute()
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to create user in database")
        
    saved_user = response.data[0]
    
    # 4. Generate Login Token
    token_response = create_access_token(
        user_id=saved_user["id"],
        email=saved_user["email"],
        role=saved_user["role"],
    )
    
    return LoginResponse(
        access_token=token_response["access_token"],
        token_type=token_response["token_type"],
        user={
            "id": saved_user["id"],
            "email": saved_user["email"],
            "role": saved_user["role"],
            "name": saved_user["name"]
        }
    )

@router.post("/auth/login", response_model=LoginResponse, summary="User login")
async def login(credentials: LoginRequest):
    supabase = get_supabase_client()
    
    # 1. Fetch user from Supabase database
    response = supabase.table('users').select('*').eq('email', credentials.email).execute()
    
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
        
    user = response.data[0]
    
    # 2. Verify Password matches the hash in the database
    if not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
        
    # 3. Verify Role (Optional: ensures they log in with the correct account type)
    if user["role"] != credentials.role:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Account is registered as a {user['role']}, not {credentials.role}"
        )
    
    # 4. Generate Login Token
    token_response = create_access_token(
        user_id=user["id"],
        email=user["email"],
        role=user["role"],
    )
    
    return LoginResponse(
        access_token=token_response["access_token"],
        token_type=token_response["token_type"],
        user={
            "id": user["id"],
            "email": user["email"],
            "role": user["role"],
            "name": user["name"]
        }
    )

@router.get("/auth/me", response_model=dict, summary="Get current user")
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "role": current_user.role,
    }