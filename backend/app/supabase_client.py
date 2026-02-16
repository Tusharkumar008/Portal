"""
Supabase client helper for connecting to Supabase database
"""
from supabase import create_client, Client
from app.core.config import settings

# Create Supabase client
supabase: Client = create_client(
    settings.supabase_url,
    settings.supabase_key
)


def get_supabase_client() -> Client:
    """
    Get the Supabase client instance.
    
    Returns:
        Client: The Supabase client
    """
    return supabase
