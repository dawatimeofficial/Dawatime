import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, setToken, clearToken, fetchMe, saveFcmToken } from '../api/index.js';
import { registerPushNotifications } from '../utils/pushNotifications.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const initPush = () => {
    registerPushNotifications((fcmToken) => {
      saveFcmToken(fcmToken).catch(console.error);
    });
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuthLoading(false);
      return;
    }
    fetchMe()
      .then((userData) => {
        setUser(userData);
        initPush();
      })
      .catch(() => clearToken())
      .finally(() => setAuthLoading(false));
  }, []);

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    initPush();
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
