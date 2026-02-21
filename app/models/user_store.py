from typing import Optional
from datetime import datetime
import uuid
from app.supabase_client import get_supabase_client
from app.schemas.user import User, UserCreate

class UserStore:
    def __init__(self):
        self.supabase = get_supabase_client()

    def get_user_by_email(self, email: str) -> Optional[dict]:
        response = self.supabase.table('users').select('*').eq('email', email).execute()
        if response.data:
            return response.data[0]
        return None

    def create_user(self, user: UserCreate, password_hash: str) -> dict:
        user_id = str(uuid.uuid4())
        user_data = {
            "id": user_id,
            "email": user.email,
            "password_hash": password_hash,
            "name": user.name,
            "role": user.role,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        response = self.supabase.table('users').insert(user_data).execute()
        return response.data[0] if response.data else None

user_store = UserStore()