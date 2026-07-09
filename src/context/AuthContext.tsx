'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/lib/db';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, role?: 'admin' | 'customer') => void;
  register: (email: string, name: string) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load session from local storage DB on mount
    const session = db.getCurrentSession();
    if (session) {
      setUser(session);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, role: 'admin' | 'customer' = 'customer') => {
    setIsLoading(true);
    const sessionUser = db.login(email, role);
    setUser(sessionUser);
    setIsLoading(false);
  };

  const register = (email: string, name: string) => {
    setIsLoading(true);
    const sessionUser = db.register(email, name);
    setUser(sessionUser);
    setIsLoading(false);
  };

  const logout = () => {
    db.logout();
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
