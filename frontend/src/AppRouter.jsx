import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

import LoadingScreen from './components/LoadingScreen';
import SplashScreen from './components/SplashScreen';
import Login from './pages/Login';
import Register from './pages/Register';
import DawaTimeApp from './App';

export default function AppRouter() {
  const { user, authLoading } = useAuth();

  const isNative = Capacitor.isNativePlatform(); // 🔥 detect app
  const [showSplash, setShowSplash] = useState(isNative); // 🔥 only true on app

  // 🔥 Splash timer (only runs in app)
  useEffect(() => {
    if (!isNative) return;

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // adjust timing

    return () => clearTimeout(timer);
  }, [isNative]);

  // 🔥 Show splash ONLY in app
  if (isNative && showSplash) {
    return <SplashScreen />;
  }

  // 🔥 Then auth loading
  if (authLoading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
      <Route
        path="/"
        element={user ? <DawaTimeApp /> : <Navigate to="/login" replace />}
      />
      <Route
        path="*"
        element={<Navigate to={user ? '/' : '/login'} replace />}
      />
    </Routes>
  );
}