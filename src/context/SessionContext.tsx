import React, { createContext, useState, useEffect, useContext } from 'react';

// Define UserProfile interface directly here to avoid circular dependencies
interface UserProfile {
  name: string;
  email?: string;
  avatar?: string;
}

interface SessionContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  setAuthenticated: (status: boolean) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Check localStorage for existing session on mount
    const storedUser = localStorage.getItem('user');
    const authStatus = localStorage.getItem('isAuthenticated');

    if (storedUser && authStatus === 'true') {
      try {
        setUserProfile(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
  }, []);

  // Update localStorage when authentication state changes
  useEffect(() => {
    if (isAuthenticated && userProfile) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userProfile));
      localStorage.setItem('lastActive', new Date().toISOString());
    }
  }, [isAuthenticated, userProfile]);

  const setAuthenticated = (status: boolean) => {
    setIsAuthenticated(status);
    
    // Clear session data if logging out
    if (!status) {
      setUserProfile(null);
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('sessionData');
    }
  };

  const logout = () => {
    // Clear all session data
    setIsAuthenticated(false);
    setUserProfile(null);
    localStorage.removeItem('sessionData');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  const contextValue = { 
    isAuthenticated, 
    userProfile, 
    setAuthenticated, 
    setUserProfile,
    logout
  };
  
  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
