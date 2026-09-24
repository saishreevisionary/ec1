'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, supabase, isSupabaseConfigured } from '@/lib/db';

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
  login: (email: string, role?: 'admin' | 'customer') => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: 'admin' | 'customer') => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAndSetProfile = async (uid: string, email: string) => {
    if (!supabase) return;
    try {
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', uid)
        .single();
      
      if (!error && profile) {
        setUser(profile as User);
        db.syncSessionCookies(profile);
      } else {
        const fallbackRole = (
          email.toLowerCase() === 'admin@venuss.co.in' ||
          email.toLowerCase() === 'admin@lendorastore.com' || 
          email.toLowerCase().includes('admin') 
            ? 'admin' 
            : 'customer'
        );
        const fallbackUser: User = {
          id: uid,
          email: email,
          name: email.split('@')[0].toUpperCase(),
          role: fallbackRole,
          created_at: new Date().toISOString()
        };
        setUser(fallbackUser);
        db.syncSessionCookies(fallbackUser);
      }
    } catch (err) {
      console.error("Error loading user profile:", err);
    }
  };

  // Load and listen to Supabase or Local sessions
  useEffect(() => {
    if (isSupabaseConfigured() && supabase) {
      const client = supabase;
      
      // 1. Initial Session Check
      const checkSession = async () => {
        const { data: { session } } = await client.auth.getSession();
        if (session?.user) {
          await fetchAndSetProfile(session.user.id, session.user.email || '');
        } else {
          setUser(null);
          db.syncSessionCookies(null);
        }
        setIsLoading(false);
      };
      
      checkSession();

      // 2. On Auth State Changes (Google OAuth redirect, logouts, etc.)
      const { data: { subscription } } = client.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          await fetchAndSetProfile(session.user.id, session.user.email || '');
        } else {
          setUser(null);
          db.syncSessionCookies(null);
        }
        setIsLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Local Fallback session loader
      const session = db.getCurrentSession();
      if (session) {
        setUser(session);
        db.syncSessionCookies(session);
      } else {
        db.syncSessionCookies(null);
      }
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, role?: 'admin' | 'customer') => {
    setIsLoading(true);
    const determinedRole = role || (
      email.toLowerCase() === 'admin@venuss.co.in' ||
      email.toLowerCase() === 'admin@lendorastore.com' || 
      email.toLowerCase().includes('admin') 
        ? 'admin' 
        : 'customer'
    );
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
          data: {
            role: determinedRole
          }
        }
      });
      if (error) {
        alert("Supabase Magic Link error: " + error.message);
      } else {
        alert("A verification magic link has been sent to your email. Click it to log in.");
      }
    } else {
      const sessionUser = db.login(email, determinedRole);
      setUser(sessionUser);
    }
    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) {
        alert("Google Sign-In Error: " + error.message);
      }
    } else {
      const sessionUser = db.login('admin@venuss.co.in', 'admin');
      setUser(sessionUser);
    }
  };

  const register = async (email: string, name: string) => {
    setIsLoading(true);
    const determinedRole = (
      email.toLowerCase() === 'admin@venuss.co.in' ||
      email.toLowerCase() === 'admin@lendorastore.com' || 
      email.toLowerCase().includes('admin') 
        ? 'admin' 
        : 'customer'
    );
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: { name, role: determinedRole }
        }
      });
      if (error) {
        alert("Supabase Register error: " + error.message);
      } else {
        alert("Verification link sent! Click it to complete registration.");
      }
    } else {
      const sessionUser = db.register(email, name);
      setUser(sessionUser);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    } else {
      db.logout();
    }
    setUser(null);
  };

  const switchRole = async (targetRole: 'admin' | 'customer') => {
    setIsLoading(true);
    const switchedUser = db.switchRole(targetRole);
    setUser(switchedUser);
    setIsLoading(false);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, register, logout, switchRole, isAdmin }}>
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
