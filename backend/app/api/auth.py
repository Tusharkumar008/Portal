from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, Field
from app.core.security import create_access_token, User, get_current_user

router = APIRouter(prefix="/api/v1", tags=["Auth"])


class LoginRequest(BaseModel):

    """Login request"""
    email: str = Field(..., description="User email")
    password: str = Field(..., description="User password")
    role: str = Field("user", description="User role: user, recruiter, or admin")


class LoginResponse(BaseModel):
    """Login response"""
    access_token: str
    token_type: str
    user: dict


# Demo users for testing
DEMO_USERS = {
    "recruiter@example.com": {
        "id": "recruiter_001",
        "email": "recruiter@example.com",
        "password": "password123",
        "role": "recruiter",
        "name": "John Recruiter"
    },
    "admin@example.com": {
        "id": "admin_001",
        "email": "admin@example.com",
        "password": "password123",
        "role": "admin",
        "name": "Admin User"
    },
    "user@example.com": {
        "id": "user_001",
        "email": "user@example.com",
        "password": "password123",
        "role": "user",
        "name": "Regular User"
    },
}


@router.post("/auth/login", response_model=LoginResponse, summary="User login")
async def login(credentials: LoginRequest):
    print(f"[LOGIN ATTEMPT] email={credentials.email} password={credentials.password} role={credentials.role}")

    user = DEMO_USERS.get(credentials.email)

    if not user:
        print(f"[LOGIN ERROR] No such user: {credentials.email}")
    elif user["password"] != credentials.password:
        print(f"[LOGIN ERROR] Password mismatch for {credentials.email}")
    elif user["role"] != credentials.role:
        print(f"[LOGIN ERROR] Role mismatch for {credentials.email}: expected {user['role']}, got {credentials.role}")
    if not user or user["password"] != credentials.password or user["role"] != credentials.role:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password or role"
        )
    


    
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
    """
    Get information about the currently authenticated user.
    
    **Requirements:**
    - User must be authenticated
    """
    return {
        "id": current_user.id,
        "email": current_user.email,
        "role": current_user.role,
        "is_active": current_user.is_active
    }
