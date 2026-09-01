import { useState, useEffect, useCallback } from 'react';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { AuthTransition } from './components/auth/AuthTransition';
import { InspectorDashboard } from './components/dashboard/InspectorDashboard';
import { loadSession, clearSession } from './auth/authStore';
import type { InspectorUser } from './auth/authStore';

type AppView = 'landing' | 'login' | 'signup' | 'auth_transition' | 'dashboard';

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [currentUser, setCurrentUser] = useState<InspectorUser | null>(null);

  // ─── Restore session on mount ────────────────────────────
  useEffect(() => {
    const existingUser = loadSession();
    if (existingUser) {
      setCurrentUser(existingUser);
      setCurrentView('dashboard');
    }
  }, []);

  // ─── Landing → Login (Start Inspection) ──────────────────
  const handleLaunchDemo = () => {
    setCurrentView('login');
  };

  // ─── Login Success → Auth Transition ─────────────────────
  const handleLoginSuccess = useCallback((user: InspectorUser) => {
    setCurrentUser(user);
    setCurrentView('auth_transition');
  }, []);

  // ─── Auth Transition Complete → Dashboard ────────────────
  const handleTransitionComplete = useCallback(() => {
    setCurrentView('dashboard');
  }, []);

  // ─── Logout → Landing ────────────────────────────────────
  const handleLogout = useCallback(() => {
    clearSession();
    setCurrentUser(null);
    setCurrentView('landing');
  }, []);

  // ─── Navigation helpers ──────────────────────────────────
  const goToSignUp = useCallback(() => setCurrentView('signup'), []);
  const goToLogin = useCallback(() => setCurrentView('login'), []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-1)] flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {currentView === 'landing' && (
        <LandingPage onLaunchDemo={handleLaunchDemo} />
      )}

      {currentView === 'login' && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onNavigateSignUp={goToSignUp}
        />
      )}

      {currentView === 'signup' && (
        <SignUpPage onNavigateLogin={goToLogin} />
      )}

      {currentView === 'auth_transition' && currentUser && (
        <AuthTransition
          user={currentUser}
          onComplete={handleTransitionComplete}
        />
      )}

      {currentView === 'dashboard' && currentUser && (
        <InspectorDashboard
          user={currentUser}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
