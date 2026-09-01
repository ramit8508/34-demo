import React, { useState } from 'react';
import { Shield, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface SignUpPageProps {
  onNavigateLogin: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigateLogin }) => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) errs.fullName = 'Full name is required.';
    if (!workEmail.trim()) errs.workEmail = 'Work email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail.trim()))
      errs.workEmail = 'Enter a valid email address.';
    if (!password) errs.password = 'Password is required.';
    else if (password.length < 8) errs.password = 'Password must be at least 8 characters.';
    if (!confirmPassword) errs.confirmPassword = 'Please confirm your password.';
    else if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // DO NOT create any user. This is a visual-only demo.
      setSubmitted(true);
    }
  };

  const clearFieldError = (key: string) => {
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  // ─── Submitted state ──────────────────────────────────────
  if (submitted) {
    return (
      <div className="auth-page">
        <header className="auth-header">
          <a href="#" className="auth-logo">
            <Shield className="auth-logo-icon" />
            <span className="auth-logo-text">MetriGuard</span>
          </a>
        </header>

        <main className="auth-main">
          <div className="auth-card" style={{ textAlign: 'center' }}>
            {/* Status */}
            <div className="auth-status-icon auth-status-amber">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4m0 4h.01" />
              </svg>
            </div>

            <h1 className="auth-title" style={{ marginTop: '20px' }}>
              Registration Unavailable
            </h1>
            <p className="auth-subtitle" style={{ marginTop: '8px' }}>
              Account registration is currently unavailable in this prototype.
              <br />
              Full registration will be available in the production version.
            </p>

            <button
              onClick={onNavigateLogin}
              className="auth-btn-primary"
              style={{ marginTop: '28px' }}
            >
              <ArrowLeft style={{ width: 16, height: 16 }} />
              Back to Sign In
            </button>
          </div>
        </main>

        <footer className="auth-bottom">
          Legal Metrology (Packaged Commodities) Rules, 2011
        </footer>
      </div>
    );
  }

  // ─── Sign Up Form ─────────────────────────────────────────
  return (
    <div className="auth-page">
      <header className="auth-header">
        <a href="#" className="auth-logo">
          <Shield className="auth-logo-icon" />
          <span className="auth-logo-text">MetriGuard</span>
        </a>
      </header>

      <main className="auth-main">
        <div className="auth-card">
          {/* Heading */}
          <div className="auth-card-heading">
            <h1 className="auth-title">Create your Inspector account.</h1>
            <p className="auth-subtitle">
              Set up your credentials to begin inspections.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Full Name */}
            <div className="auth-field">
              <label htmlFor="signup-name" className="auth-label">Full Name</label>
              <input
                id="signup-name"
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); clearFieldError('fullName'); }}
                className={`auth-input ${errors.fullName ? 'auth-input-error' : ''}`}
              />
              {errors.fullName && <p className="auth-field-error">{errors.fullName}</p>}
            </div>

            {/* Work Email */}
            <div className="auth-field">
              <label htmlFor="signup-email" className="auth-label">Work Email</label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@department.gov.in"
                value={workEmail}
                onChange={(e) => { setWorkEmail(e.target.value); clearFieldError('workEmail'); }}
                className={`auth-input ${errors.workEmail ? 'auth-input-error' : ''}`}
              />
              {errors.workEmail && <p className="auth-field-error">{errors.workEmail}</p>}
            </div>

            {/* Password */}
            <div className="auth-field">
              <label htmlFor="signup-password" className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearFieldError('password'); }}
                  className={`auth-input auth-input-password ${errors.password ? 'auth-input-error' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-toggle-pw"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="auth-toggle-icon" /> : <Eye className="auth-toggle-icon" />}
                </button>
              </div>
              {errors.password && <p className="auth-field-error">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="auth-field">
              <label htmlFor="signup-confirm" className="auth-label">Confirm Password</label>
              <div className="auth-input-wrap">
                <input
                  id="signup-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError('confirmPassword'); }}
                  className={`auth-input auth-input-password ${errors.confirmPassword ? 'auth-input-error' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="auth-toggle-pw"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff className="auth-toggle-icon" /> : <Eye className="auth-toggle-icon" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="auth-field-error">{errors.confirmPassword}</p>}
            </div>

            {/* Role — read-only */}
            <div className="auth-field">
              <label className="auth-label">Role</label>
              <div className="auth-role-display">
                <Shield style={{ width: 15, height: 15, color: 'var(--blue)' }} />
                Inspector
              </div>
            </div>

            {/* Create Account */}
            <button type="submit" className="auth-btn-primary">
              Create Account
            </button>
          </form>

          {/* Sign in link */}
          <p className="auth-footer-link">
            Already have an account?{' '}
            <button onClick={onNavigateLogin} className="auth-link">
              Sign in
            </button>
          </p>
        </div>
      </main>

      <footer className="auth-bottom">
        Legal Metrology (Packaged Commodities) Rules, 2011
      </footer>
    </div>
  );
};
