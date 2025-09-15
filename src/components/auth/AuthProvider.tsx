import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Tables } from '@/integrations/supabase/types';
import { useNavigate } from 'react-router-dom';

type Profile = Tables<'profiles'>;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string; }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isStaff: boolean;
  isStudent: boolean;
  canAccessAdminDashboard: boolean;
  canAccessStaffDashboard: boolean;
  canAccessStudentDashboard: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Defer profile fetching to avoid blocking auth state
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      
      // Test Supabase connection first
      const { data: connectionTest, error: connectionError } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);
      
      if (connectionError) {
        console.error('Supabase connection test failed:', connectionError);
        throw new Error(`Connection failed: ${connectionError.message}`);
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        if (error.code === 'PGRST116') {
          // Profile doesn't exist, create one
          console.log('Profile not found, creating default profile');
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              email: user?.email || '',
              name: user?.email?.split('@')[0] || 'Unknown',
              role: 'student',
              full_name: user?.user_metadata?.full_name || 'Unknown User',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select()
            .single();
          
          if (createError) {
            console.error('Error creating profile:', createError);
            throw createError;
          }
          
          setProfile(newProfile);
          if (newProfile && newProfile.role) {
            navigateToRoleDashboard(newProfile.role);
          }
        } else {
          throw error;
        }
      } else {
        console.log('Profile fetched:', data);
        setProfile(data);
        
        // Navigate to appropriate dashboard based on role
        if (data && data.role) {
          navigateToRoleDashboard(data.role);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      
      // Provide more detailed error information
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('Network error: Unable to connect to Supabase. Please check:');
        console.error('1. Your internet connection');
        console.error('2. Supabase project status');
        console.error('3. CORS configuration in Supabase dashboard');
        console.error('4. Firewall or proxy settings');
      }
    } finally {
      setLoading(false);
    }
  };

  const navigateToRoleDashboard = (role: string) => {
    // Only navigate if we're currently on the home page or login page
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/login') {
      switch (role) {
        case 'admin':
          window.location.href = '/admin/dashboard';
          break;
        case 'staff':
          window.location.href = '/staff/dashboard';
          break;
        case 'student':
          window.location.href = '/student/dashboard';
          break;
        default:
          console.log('Unknown role:', role);
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('Attempting sign in for:', email);
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    if (error) {
      console.error('Sign in error:', error);
      // Provide user-friendly error messages
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      } else if (error.message.includes('Email not confirmed')) {
        throw new Error('Please confirm your email address before signing in.');
      } else if (error.message.includes('Too many requests')) {
        throw new Error('Too many login attempts. Please wait a few minutes before trying again.');
      }
      throw error;
    }
    console.log('Sign in successful for:', email);
  };

  const signUp = async (email: string, password: string, fullName: string, userRole: string = 'student') => {
    console.log('Attempting sign up for:', email, 'with role:', userRole);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: userRole
        }
      }
    });
    
    if (error) {
      console.error('Sign up error:', error);
      // Provide user-friendly error messages
      if (error.message.includes('User already registered')) {
        throw new Error('This email is already registered. Please try signing in instead.');
      } else if (error.message.includes('Password should be at least')) {
        throw new Error('Password must be at least 6 characters long.');
      } else if (error.message.includes('Unable to validate email address')) {
        throw new Error('Please enter a valid email address.');
      }
      throw error;
    }
    console.log('Sign up successful for:', email);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Navigate to home page after sign out
    window.location.href = '/';
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      if (error) {
        console.error('Google OAuth error:', error);
        if (error.message.includes('provider is not enabled')) {
          throw new Error('Google sign-in is not configured. Please use email/password login or contact support.');
        }
        throw error;
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.log('Attempting password reset for:', email);
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      if (error) {
        console.error('Reset password error:', error);
        if (error.message.includes('Unable to validate email address')) {
          throw new Error('Please enter a valid email address.');
        } else if (error.message.includes('Email rate limit exceeded') || error.code === 'over_email_send_rate_limit') {
          throw new Error('Too many reset requests. Please wait a few minutes before trying again.');
        } else if (error.message.includes('For security purposes, you can only request this after')) {
          throw new Error('Please wait a few seconds before requesting another password reset.');
        } else if (error.message.includes('User not found')) {
          throw new Error('No account found with this email address.');
        }
        throw error;
      }
      console.log('Reset password email sent successfully');
      return { success: true, message: 'Password reset email sent successfully' };
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  const isAdmin = profile?.role === 'admin';
  const isStaff = profile?.role === 'staff';
  const isStudent = profile?.role === 'student';

  // Admin users can access all dashboards
  const canAccessAdminDashboard = isAdmin;
  const canAccessStaffDashboard = isAdmin || isStaff;
  const canAccessStudentDashboard = isAdmin || isStaff || isStudent;

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      resetPassword,
      signOut,
      isAdmin,
      isStaff,
      isStudent,
      canAccessAdminDashboard,
      canAccessStaffDashboard,
      canAccessStudentDashboard
    }}>
      {children}
    </AuthContext.Provider>
  );
};
