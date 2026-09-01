import React from 'react';
import { Shield, LogOut } from 'lucide-react';
import type { InspectorUser } from '../../auth/authStore';

interface DashboardPlaceholderProps {
  user: InspectorUser;
  onLogout: () => void;
}

/**
 * Minimal placeholder route for the Inspector Dashboard.
 * Prevents navigation failure after successful login.
 * 
 * DO NOT design or implement the actual dashboard here.
 * The next prompt will build it.
 */
export const DashboardPlaceholder: React.FC<DashboardPlaceholderProps> = ({ user, onLogout }) => {
  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Minimal header with logout */}
      <header
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md h-16 flex items-center justify-between px-5 sm:px-8"
        style={{ borderBottom: '1px solid var(--border-light)' }}
      >
        <div className="flex items-center gap-2.5">
          <Shield className="w-5 h-5 text-[var(--blue)]" />
          <span
            className="font-bold text-[15px] text-[var(--text-1)] tracking-[-0.01em]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            MetriGuard
          </span>
          <span className="text-[var(--text-5)] text-[13px] mx-1">·</span>
          <span className="text-[var(--text-4)] text-[13px] font-medium">Inspector Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-[13px] text-[var(--text-3)] font-medium">
            {user.name}
          </span>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-[var(--text-3)] hover:bg-[var(--bg-alt)] hover:text-[var(--red)] transition-colors"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Placeholder content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-5">
        <div
          className="px-4 py-2 rounded-full bg-[var(--green-bg)] text-[var(--green)] text-[13px] font-semibold"
        >
          ✓ Authenticated as {user.role}
        </div>
        <h2
          className="text-[28px] sm:text-[32px] font-bold text-[var(--text-1)] tracking-[-0.025em]"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Inspector Dashboard
        </h2>
        <p className="text-[var(--text-3)] text-[15px] max-w-md leading-[1.65]">
          Welcome, {user.name}. The Inspector Dashboard will be implemented in the next phase.
        </p>
        <div className="text-[var(--text-5)] text-[13px]">
          Role: {user.role} · {user.email}
        </div>
      </div>
    </div>
  );
};
