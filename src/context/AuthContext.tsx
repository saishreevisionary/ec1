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
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      }
      setIsLoading(false);
    }
  }, []);

  const fetchAndSetProfile = async (uid: string, email: string) => {
    if (!supabase) return;
    try {
      // Fetch user profile from the custom DB public.users table to get their true role (admin/customer)
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', uid)
        .single();
      
      if (error) {
        console.log(`[PROFILE_QUERY_ERROR] Code: ${error.code} | Message: ${error.message} | Details: ${error.details} | Hint: ${error.hint}`);
      } else {
        console.log("fetchAndSetProfile Success:", profile);
      }
      
      if (!error && profile) {
        setUser(profile as User);
      } else {
        // Fallback profile if sync trigger is delayed
        setUser({
          id: uid,
          email: email,
          name: email.split('@')[0].toUpperCase(),
          role: email.toLowerCase() === 'admin@lendorastore.com' || email.toLowerCase() === 'ssv.ec1926@gmail.com' || email.toLowerCase().includes('admin') ? 'admin' : 'customer',
          created_at: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error("Error loading user profile:", err);
    }
  };

  const login = async (email: string, role: 'admin' | 'customer' = 'customer') => {
    setIsLoading(true);
    if (isSupabaseConfigured() && supabase) {
      // Sign in / sign up via magic link
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true
        }
      });
      if (error) {
        alert("Supabase Magic Link error: " + error.message);
      } else {
        alert("A verification magic link has been sent to your email. Click it to log in.");
      }
    } else {
      // Local storage fallback
      const sessionUser = db.login(email, role);
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
      alert("Supabase is not configured yet. Simulating Google Sign-In with admin fallback.");
      const sessionUser = db.login('admin@lendorastore.com', 'admin');
      setUser(sessionUser);
    }
  };

  const register = async (email: string, name: string) => {
    setIsLoading(true);
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: { name, role: 'customer' }
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

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, register, logout, isAdmin }}>
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
