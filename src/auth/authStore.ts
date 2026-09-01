// ─── MetriGuard Auth Store ───────────────────────────────────
// Frontend-only demo authentication.
// ONE predefined Inspector account — no backend, no dynamic users.
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'metriguard_session';

export interface InspectorUser {
  name: string;
  email: string;
  role: 'Inspector';
}

// ─── Demo Inspector (the ONLY valid account) ─────────────────
const DEMO_INSPECTOR: InspectorUser = {
  name: 'Rahul Sharma',
  email: 'inspector@metrigard.demo',
  role: 'Inspector',
};

const DEMO_PASSWORD = 'Inspector@123';

// ─── Auth Functions ──────────────────────────────────────────

/**
 * Attempt login with the given credentials.
 * Returns the InspectorUser if credentials match the demo account,
 * or null if they don't.
 */
export function authenticateInspector(
  email: string,
  password: string,
): InspectorUser | null {
  if (email === DEMO_INSPECTOR.email && password === DEMO_PASSWORD) {
    return { ...DEMO_INSPECTOR };
  }
  return null;
}

/**
 * Get the demo inspector credentials (for the "Use Demo Inspector" button).
 */
export function getDemoCredentials(): { email: string; password: string } {
  return {
    email: DEMO_INSPECTOR.email,
    password: DEMO_PASSWORD,
  };
}

/**
 * Save session to localStorage after successful login.
 */
export function saveSession(user: InspectorUser): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        isAuthenticated: true,
        currentUser: user,
      }),
    );
  } catch {
    // localStorage unavailable — session won't persist
  }
}

/**
 * Load existing session from localStorage.
 * Returns the InspectorUser if a valid session exists, or null.
 */
export function loadSession(): InspectorUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (
      parsed?.isAuthenticated === true &&
      parsed?.currentUser?.email === DEMO_INSPECTOR.email &&
      parsed?.currentUser?.role === 'Inspector'
    ) {
      return parsed.currentUser as InspectorUser;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Clear the demo session (logout).
 */
export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // noop
  }
}
