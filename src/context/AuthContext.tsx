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
  login: (email: string, password?: string, role?: 'admin' | 'customer') => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, name: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string, newPassword?: string) => Promise<{ success: boolean; error?: string }>;
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
          email.toLowerCase() === 'admin@lendorastore.com'
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

  const login = async (email: string, password?: string, role?: 'admin' | 'customer'): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured() && supabase) {
        if (password) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (error) {
            setIsLoading(false);
            return { success: false, error: error.message };
          }
          if (data.user) {
            await fetchAndSetProfile(data.user.id, data.user.email || '');
          }
          setIsLoading(false);
          return { success: true };
        } else {
          const determinedRole = role || (email.toLowerCase() === 'admin@venuss.co.in' ? 'admin' : 'customer');
          const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
              shouldCreateUser: true,
              data: { role: determinedRole }
            }
          });
          setIsLoading(false);
          if (error) return { success: false, error: error.message };
          return { success: true };
        }
      } else {
        const res = await db.login(email, password, role);
        if (res.success && res.user) {
          setUser(res.user);
          db.syncSessionCookies(res.user);
          setIsLoading(false);
          return { success: true };
        } else {
          setIsLoading(false);
          return { success: false, error: res.error || 'Invalid credentials' };
        }
      }
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Authentication error' };
    }
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
      const res = await db.login('admin@venuss.co.in', undefined, 'admin');
      if (res.user) {
        setUser(res.user);
      }
    }
  };

  const register = async (email: string, name: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured() && supabase) {
        if (password) {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { name, role: 'customer' }
            }
          });
          if (error) {
            setIsLoading(false);
            return { success: false, error: error.message };
          }
          if (data.user) {
            await fetchAndSetProfile(data.user.id, data.user.email || '');
          }
          setIsLoading(false);
          return { success: true };
        } else {
          const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
              shouldCreateUser: true,
              data: { name, role: 'customer' }
            }
          });
          setIsLoading(false);
          if (error) return { success: false, error: error.message };
          return { success: true };
        }
      } else {
        const res = await db.register(email, name, password);
        if (res.success && res.user) {
          setUser(res.user);
          db.syncSessionCookies(res.user);
          setIsLoading(false);
          return { success: true };
        } else {
          setIsLoading(false);
          return { success: false, error: res.error || 'Registration failed' };
        }
      }
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Registration error' };
    }
  };

  const resetPassword = async (email: string, newPassword?: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/account?tab=profile`
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } else {
      if (!newPassword) {
        return { success: false, error: 'New password is required.' };
      }
      return await db.resetPassword(email, newPassword);
    }
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
    const switchedUser = await db.switchRole(targetRole);
    setUser(switchedUser);
    setIsLoading(false);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, register, resetPassword, logout, switchRole, isAdmin }}>
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
