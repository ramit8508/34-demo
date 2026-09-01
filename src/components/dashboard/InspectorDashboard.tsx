import React, { useState } from 'react';
import {
  Shield,
  Plus,
  ChevronRight,
  AlertTriangle,
  Home,
  ClipboardList,
  FileBarChart,
  User,
  ScanLine,
  Clock,
  LogOut,
} from 'lucide-react';
import type { InspectorUser } from '../../auth/authStore';

// ─── Types ───────────────────────────────────────────────────
interface InspectorDashboardProps {
  user: InspectorUser;
  onLogout: () => void;
  onStartNewInspection?: () => void;
}

type InspectionStatus = 'compliant' | 'non-compliant' | 'review';

interface DemoInspection {
  id: string;
  product: string;
  variant: string;
  status: InspectionStatus;
  date: string;
  time: string;
  violations?: number;
  confidence?: number;
}

// ─── Demo Data ───────────────────────────────────────────────
const DEMO_INSPECTIONS: DemoInspection[] = [
  {
    id: 'INSP-001',
    product: "Lay's India's Magic Masala",
    variant: '50g · PepsiCo India',
    status: 'non-compliant',
    date: 'Today',
    time: '10:42 AM',
    violations: 1,
  },
  {
    id: 'INSP-002',
    product: 'Parle-G Gold Biscuits',
    variant: '100g · Parle Products',
    status: 'compliant',
    date: 'Today',
    time: '09:18 AM',
  },
  {
    id: 'INSP-003',
    product: 'Fortune Sunflower Oil',
    variant: '1L · Adani Wilmar',
    status: 'review',
    date: 'Yesterday',
    time: '04:26 PM',
    confidence: 82,
  },
  {
    id: 'INSP-004',
    product: 'Amul Taaza Toned Milk',
    variant: '500ml · GCMMF',
    status: 'compliant',
    date: 'Yesterday',
    time: '02:15 PM',
  },
  {
    id: 'INSP-005',
    product: 'Tata Salt',
    variant: '1kg · Tata Consumer',
    status: 'compliant',
    date: 'Yesterday',
    time: '11:30 AM',
  },
];

const STATS = {
  total: 24,
  compliant: 16,
  violations: 5,
  review: 3,
};

// ─── Helpers ─────────────────────────────────────────────────
function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function getStatusBadgeClass(s: InspectionStatus): string {
  if (s === 'compliant') return 'dash-insp-badge--pass';
  if (s === 'non-compliant') return 'dash-insp-badge--fail';
  return 'dash-insp-badge--review';
}

function getStatusDotClass(s: InspectionStatus): string {
  if (s === 'compliant') return 'dash-insp-status-dot--pass';
  if (s === 'non-compliant') return 'dash-insp-status-dot--fail';
  return 'dash-insp-status-dot--review';
}

function getStatusLabel(s: InspectionStatus): string {
  if (s === 'compliant') return 'Compliant';
  if (s === 'non-compliant') return 'Non-compliant';
  return 'Review';
}

// ─── Component ───────────────────────────────────────────────
export const InspectorDashboard: React.FC<InspectorDashboardProps> = ({
  user,
  onLogout,
  onStartNewInspection,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<'home' | 'inspections' | 'reports' | 'profile'>('home');

  const firstName = user.name.split(' ')[0];
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const reviewItems = DEMO_INSPECTIONS.filter((i) => i.status === 'review');

  return (
    <div className="dash">
      {/* ════════════════════════════════════════════════════════
          HEADER
          ════════════════════════════════════════════════════════ */}
      <header className="dash-header">
        <div className="dash-header-logo">
          <Shield />
          <span>MetriGuard</span>
        </div>

        <div style={{ position: 'relative' }}>
          <button
            className="dash-avatar-btn"
            onClick={() => setProfileOpen(!profileOpen)}
            aria-label="Profile menu"
          >
            {initials}
          </button>

          {/* Profile dropdown */}
          {profileOpen && (
            <>
              <div className="dash-backdrop" onClick={() => setProfileOpen(false)} />
              <div className="dash-profile-menu">
                <div className="dash-profile-info">
                  <div className="dash-profile-name">{user.name}</div>
                  <div className="dash-profile-email">{user.email}</div>
                  <div className="dash-profile-role">
                    <Shield />
                    {user.role}
                  </div>
                </div>
                <button
                  className="dash-menu-item dash-menu-item--danger"
                  onClick={() => { setProfileOpen(false); onLogout(); }}
                >
                  <LogOut />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════
          SCROLLABLE CONTENT
          ════════════════════════════════════════════════════════ */}
      <div className="dash-content">
        <div className="dash-inner">

          {/* ── Greeting ─────────────────────────────────────── */}
          <div className="dash-greeting">
            <h1 className="dash-greeting-hello">
              {getGreeting()}, {firstName}
            </h1>
            <p className="dash-greeting-sub">
              Ready for your next inspection?
            </p>
          </div>

          {/* ── New Inspection CTA ───────────────────────────── */}
          <div className="dash-cta">
            <div className="dash-cta-label">
              <ClipboardList />
              New Inspection
            </div>
            <h2 className="dash-cta-title">
              Inspect a packaged commodity
            </h2>
            <p className="dash-cta-desc">
              Scan the product barcode and capture package labels for compliance analysis.
            </p>
            <button className="dash-cta-btn" onClick={onStartNewInspection}>
              <Plus />
              Start New Inspection
            </button>
          </div>

          {/* ── Today's Overview ──────────────────────────────── */}
          <h3 className="dash-section-title">Today's overview</h3>
          <div className="dash-stats">
            <div className="dash-stat dash-stat--blue">
              <div className="dash-stat-value">{STATS.total}</div>
              <div className="dash-stat-label">Inspections</div>
            </div>
            <div className="dash-stat dash-stat--green">
              <div className="dash-stat-value">{STATS.compliant}</div>
              <div className="dash-stat-label">Compliant</div>
            </div>
            <div className="dash-stat dash-stat--red">
              <div className="dash-stat-value">{STATS.violations}</div>
              <div className="dash-stat-label">Violations</div>
            </div>
            <div className="dash-stat dash-stat--amber">
              <div className="dash-stat-value">{STATS.review}</div>
              <div className="dash-stat-label">Review</div>
            </div>
          </div>

          {/* ── Needs Review ──────────────────────────────────── */}
          {reviewItems.length > 0 && (
            <div className="dash-review">
              <div className="dash-review-header">
                <div className="dash-review-dot" />
                <span className="dash-review-label">Needs your review</span>
                <span className="dash-review-count">
                  {reviewItems.length} inspection{reviewItems.length > 1 ? 's' : ''}
                </span>
              </div>

              {reviewItems.map((item) => (
                <div key={item.id} className="dash-review-item">
                  <div className="dash-review-item-icon">
                    <AlertTriangle />
                  </div>
                  <div className="dash-review-item-info">
                    <div className="dash-review-item-name">{item.product}</div>
                    <div className="dash-review-item-detail">
                      Low OCR confidence · {item.confidence}%
                    </div>
                  </div>
                  <button className="dash-review-btn">Review</button>
                </div>
              ))}
            </div>
          )}

          {/* ── Quick Actions ─────────────────────────────────── */}
          <h3 className="dash-section-title">Quick actions</h3>
          <div className="dash-actions">
            <button className="dash-action-btn" onClick={onStartNewInspection}>
              <div className="dash-action-icon dash-action-icon--blue">
                <ScanLine />
              </div>
              <span className="dash-action-label">Scan Product</span>
            </button>
            <button className="dash-action-btn">
              <div className="dash-action-icon dash-action-icon--text">
                <Clock />
              </div>
              <span className="dash-action-label">History</span>
            </button>
            <button className="dash-action-btn">
              <div className="dash-action-icon dash-action-icon--green">
                <FileBarChart />
              </div>
              <span className="dash-action-label">Reports</span>
            </button>
          </div>

          {/* ── Recent Inspections ────────────────────────────── */}
          <div className="dash-recent">
            <div className="dash-recent-header">
              <h3 className="dash-section-title" style={{ margin: 0 }}>Recent inspections</h3>
              <button className="dash-recent-viewall">View all</button>
            </div>

            {DEMO_INSPECTIONS.map((insp) => (
              <div key={insp.id} className="dash-insp-item">
                <div className={`dash-insp-status-dot ${getStatusDotClass(insp.status)}`} />
                <div className="dash-insp-info">
                  <div className="dash-insp-name">{insp.product}</div>
                  <div className="dash-insp-meta">
                    <span>{insp.variant}</span>
                    <span>·</span>
                    <span>{insp.date}, {insp.time}</span>
                  </div>
                </div>
                <span className={`dash-insp-badge ${getStatusBadgeClass(insp.status)}`}>
                  {getStatusLabel(insp.status)}
                </span>
                <ChevronRight className="dash-insp-chevron" />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BOTTOM NAVIGATION (Mobile)
          ════════════════════════════════════════════════════════ */}
      <nav className="dash-bottomnav">
        {([
          { key: 'home' as const, icon: Home, label: 'Home' },
          { key: 'inspections' as const, icon: ClipboardList, label: 'Inspections' },
          { key: 'reports' as const, icon: FileBarChart, label: 'Reports' },
          { key: 'profile' as const, icon: User, label: 'Profile' },
        ]).map((tab) => (
          <button
            key={tab.key}
            className={`dash-navitem ${activeNav === tab.key ? 'dash-navitem--active' : 'dash-navitem--inactive'}`}
            onClick={() => setActiveNav(tab.key)}
          >
            <tab.icon />
            <span className="dash-navitem-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
