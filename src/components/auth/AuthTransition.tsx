import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import type { InspectorUser } from '../../auth/authStore';

interface AuthTransitionProps {
  user: InspectorUser;
  onComplete: () => void;
}

/**
 * Brief professional brand transition between login and dashboard.
 * Total duration: ~1.3s. No spinners, no fake technical messages.
 *
 * Sequence:
 *   1. Logo + greeting fade in (0–400ms)
 *   2. Hold (400–900ms)
 *   3. Fade out entire screen (900–1300ms)
 *   4. onComplete fires → dashboard renders
 */
export const AuthTransition: React.FC<AuthTransitionProps> = ({ user, onComplete }) => {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');
  const firstName = user.name.split(' ')[0];

  // Check reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip animation entirely
      const t = setTimeout(() => onComplete(), 200);
      return () => clearTimeout(t);
    }

    // Enter → Hold → Exit → Complete
    const t1 = setTimeout(() => setPhase('hold'), 100);
    const t2 = setTimeout(() => setPhase('exit'), 900);
    const t3 = setTimeout(() => onComplete(), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete, prefersReducedMotion]);

  return (
    <div
      className="at-overlay"
      data-phase={phase}
    >
      <div className="at-content" data-phase={phase}>
        {/* Logo */}
        <div className="at-logo">
          <Shield className="at-logo-icon" />
          <span className="at-logo-text">MetriGuard</span>
        </div>

        {/* Greeting */}
        <h1 className="at-greeting">
          Welcome back, {firstName}.
        </h1>

        {/* Supporting text */}
        <p className="at-subtext">
          Preparing your inspection workspace
        </p>
      </div>

      <style>{`
        /* ─── Overlay ─────────────────────────────────────── */
        .at-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          font-family: 'Inter', -apple-system, sans-serif;
          transition: opacity 0.35s ease;
        }
        .at-overlay[data-phase="exit"] {
          opacity: 0;
        }

        /* ─── Content Block ───────────────────────────────── */
        .at-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 32px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .at-content[data-phase="hold"],
        .at-content[data-phase="exit"] {
          opacity: 1;
          transform: translateY(0);
        }

        /* ─── Logo ────────────────────────────────────────── */
        .at-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .at-logo-icon {
          width: 24px;
          height: 24px;
          color: var(--blue);
        }
        .at-logo-text {
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          font-size: 17px;
          color: var(--text-1);
          letter-spacing: -0.01em;
        }

        /* ─── Greeting ────────────────────────────────────── */
        .at-greeting {
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          font-size: 22px;
          color: var(--text-1);
          letter-spacing: -0.02em;
          line-height: 1.25;
          margin: 0;
        }

        /* ─── Subtext ─────────────────────────────────────── */
        .at-subtext {
          font-size: 14px;
          color: var(--text-4);
          margin: 8px 0 0 0;
          line-height: 1.4;
        }

        /* ─── Reduced motion ──────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .at-overlay,
          .at-content {
            transition: none !important;
          }
          .at-content {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};
