import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database (in real app, this would be backend)
const MOCK_USERS: { email: string; password: string; user: User }[] = [
  {
    email: 'demo@example.com',
    password: 'password123',
    user: {
      id: '1',
      name: 'Alex Morgan',
      email: 'demo@example.com',
      title: 'Senior Product Designer',
    },
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('jobportal_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser.user);
      localStorage.setItem('jobportal_user', JSON.stringify(foundUser.user));
      return true;
    }

    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check if user already exists
    const existingUser = MOCK_USERS.find((u) => u.email === email);
    if (existingUser) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
    };

    MOCK_USERS.push({ email, password, user: newUser });
    setUser(newUser);
    localStorage.setItem('jobportal_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jobportal_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
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
