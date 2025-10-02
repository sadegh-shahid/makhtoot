import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, role) {
    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // The 'role' parameter is not used here as the 'profiles' table doesn't have a 'role' column.
    // We will use the email as the username.
    const { error: insertError } = await supabase
      .from('profiles')
      .insert([{ id: user.id, username: user.email }]);

    if (insertError) {
      // If the profile insertion fails, we should probably handle it.
      // For now, we'll throw the error.
      // It might be a good idea to delete the user from auth if this fails.
      console.error("Failed to create user profile:", insertError);
      throw insertError;
    }

    // The onAuthStateChange listener will set the currentUser
    return user;
  }

  function login(email, password) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  function logout() {
    return supabase.auth.signOut();
  }

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const user = session.user;
        const { data: userProfile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          setCurrentUser(user);
        } else {
          setCurrentUser({ ...user, ...userProfile });
        }
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const user = session.user;
        const { data: userProfile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          setCurrentUser(user);
        } else {
          setCurrentUser({ ...user, ...userProfile });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}