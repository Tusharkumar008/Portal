import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService } from '../services/api';

export interface User {
  id: string;
  email: string;
  role: "user" | "recruiter" | "admin" | "job_seeker";
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, role?: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
  isRecruiter: boolean;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for saved session on mount
  useEffect(() => {
    const savedToken = authService.getToken();
    const savedUser = authService.getUser();
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string = "user"): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(email, password);
      authService.setToken(response.access_token);
      authService.setUser(response.user);
      setToken(response.access_token);
      setUser(response.user);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: string = "job_seeker"): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.signup(name, email, password, role);
      authService.setToken(response.access_token);
      authService.setUser(response.user);
      setToken(response.access_token);
      setUser(response.user);
      return true; // Tells the SignupPage that it succeeded
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        error,
        login,
        signup,
        logout,
        isRecruiter: user?.role === "recruiter" || user?.role === "admin",
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}