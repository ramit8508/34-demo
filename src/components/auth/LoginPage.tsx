import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Loader2 } from 'lucide-react';
import { authenticateInspector, saveSession } from '../../auth/authStore';
import type { InspectorUser } from '../../auth/authStore';

interface LoginPageProps {
  onLoginSuccess: (user: InspectorUser) => void;
  onNavigateSignUp: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigateSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setIsSubmitting(true);

    // Small delay for natural feel
    setTimeout(() => {
      const user = authenticateInspector(email.trim(), password);
      if (user) {
        saveSession(user);
        onLoginSuccess(user);
      } else {
        setError('Invalid email or password.');
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <div className="auth-page">
      {/* Top bar — logo only */}
      <header className="auth-header">
        <a href="#" className="auth-logo">
          <Shield className="auth-logo-icon" />
          <span className="auth-logo-text">MetriGuard</span>
        </a>
      </header>

      {/* Centered form container */}
      <main className="auth-main">
        <div className="auth-card">
          {/* Heading */}
          <div className="auth-card-heading">
            <h1 className="auth-title">Welcome back.</h1>
            <p className="auth-subtitle">
              Sign in to continue your inspection workflow.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Email */}
            <div className="auth-field">
              <label htmlFor="login-email" className="auth-label">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@organization.gov.in"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                disabled={isSubmitting}
                className={`auth-input ${error && !email.trim() ? 'auth-input-error' : ''}`}
              />
            </div>

            {/* Password */}
            <div className="auth-field">
              <label htmlFor="login-password" className="auth-label">
                Password
              </label>
              <div className="auth-input-wrap">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  disabled={isSubmitting}
                  className={`auth-input auth-input-password ${error && !password.trim() ? 'auth-input-error' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-toggle-pw"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword
                    ? <EyeOff className="auth-toggle-icon" />
                    : <Eye className="auth-toggle-icon" />
                  }
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="auth-error" role="alert">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="auth-error-icon">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 5v3.5M8 10.5h.005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {error}
              </div>
            )}

            {/* Sign In button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="auth-btn-primary"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="auth-spinner" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="auth-footer-link">
            Don't have an account?{' '}
            <button onClick={onNavigateSignUp} className="auth-link">
              Sign up
            </button>
          </p>
        </div>
      </main>

      {/* Bottom — legal line */}
      <footer className="auth-bottom">
        Legal Metrology (Packaged Commodities) Rules, 2011
      </footer>
    </div>
  );
};
