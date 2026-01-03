import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types/hrms';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface SignupData {
  employeeId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@dayflow.com',
    employeeId: 'EMP001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'admin',
    department: 'Human Resources',
    position: 'HR Director',
    joinDate: '2020-01-15',
    phone: '+1 234 567 8900',
  },
  {
    id: '2',
    email: 'hr@dayflow.com',
    employeeId: 'EMP002',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'hr',
    department: 'Human Resources',
    position: 'HR Manager',
    joinDate: '2021-03-20',
    phone: '+1 234 567 8901',
  },
  {
    id: '3',
    email: 'employee@dayflow.com',
    employeeId: 'EMP003',
    firstName: 'Emily',
    lastName: 'Davis',
    role: 'employee',
    department: 'Engineering',
    position: 'Software Engineer',
    joinDate: '2022-06-01',
    phone: '+1 234 567 8902',
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('dayflow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('dayflow_user', JSON.stringify(foundUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = async (data: SignupData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const exists = MOCK_USERS.find(u => u.email === data.email || u.employeeId === data.employeeId);
    if (exists) {
      return { success: false, error: 'Employee already exists' };
    }

    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      email: data.email,
      employeeId: data.employeeId,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      department: 'Unassigned',
      position: 'New Employee',
      joinDate: new Date().toISOString().split('T')[0],
    };

    setUser(newUser);
    localStorage.setItem('dayflow_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dayflow_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
    }}>
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
