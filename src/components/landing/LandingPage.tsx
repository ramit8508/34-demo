import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Shield,
  ArrowRight,
  Menu,
  X,
  Check,
  AlertTriangle,
  FileText,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────
interface LandingPageProps {
  onLaunchDemo: (mode?: 'mobile' | 'web') => void;
}

// ─── Scroll Reveal Hook ──────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('is-visible'); io.unobserve(el); } },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// ─── Component ───────────────────────────────────────────────
export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchDemo }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const heroR = useReveal();
  const problemR = useReveal();
  const journeyR = useReveal();
  const intelR = useReveal();
  const refR = useReveal();
  const evidenceR = useReveal();
  const ctaR = useReveal();

  // Journey scroll activation
  const [activeStep, setActiveStep] = useState(0);
  const stepEls = useRef<(HTMLDivElement | null)[]>([]);
  const setStep = useCallback(
    (i: number) => (el: HTMLDivElement | null) => { stepEls.current[i] = el; },
    [],
  );

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = stepEls.current.indexOf(e.target as HTMLDivElement);
            if (idx >= 0) setActiveStep(idx);
          }
        });
      },
      { threshold: 0.55 },
    );
    stepEls.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const steps = [
    { n: '01', title: 'Identify', text: 'Scan barcode or QR to fetch product reference data from master databases.' },
    { n: '02', title: 'Capture', text: 'Photograph the front and back package panels with guided alignment assistance.' },
    { n: '03', title: 'Understand', text: 'Computer Vision and OCR extract printed text with spatial coordinates.' },
    { n: '04', title: 'Validate', text: 'Deterministic rule engine applies Legal Metrology provisions to each field.' },
    { n: '05', title: 'Prove', text: 'Generate an evidence-backed inspection report with image crops and rule citations.' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-1)] flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══════════════════════════════════════════════════════════
          NAV — Google-style: clean, minimal, lots of air
          ══════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md" style={{ borderBottom: '1px solid var(--border-light)' }}>
        <div className="max-w-[1200px] mx-auto h-16 flex items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 no-underline select-none">
            <Shield className="w-6 h-6 text-[var(--blue)]" />
            <span className="font-bold text-[15px] text-[var(--text-1)] tracking-[-0.01em]">MetriGuard</span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium text-[var(--text-3)]">
            <a href="#product" className="hover:text-[var(--text-1)] transition-colors">Product</a>
            <a href="#how-it-works" className="hover:text-[var(--text-1)] transition-colors">How It Works</a>
            <a href="#technology" className="hover:text-[var(--text-1)] transition-colors">Technology</a>
            <a href="#compliance" className="hover:text-[var(--text-1)] transition-colors">Compliance</a>
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={() => onLaunchDemo('mobile')}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--blue)] text-white text-[14px] font-medium hover:bg-[#1557B0] transition-colors"
          >
            Start Inspection
          </button>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-[var(--text-3)]" aria-label="Menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-[var(--border-light)] px-5 pb-5 pt-3 space-y-1">
            {['Product', 'How It Works', 'Technology', 'Compliance'].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, '-')}`}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-3 rounded-lg text-[16px] font-medium text-[var(--text-2)] hover:bg-[var(--bg-alt)] transition-colors"
              >
                {l}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-[var(--border-light)]">
              <button
                onClick={() => { setMenuOpen(false); onLaunchDemo('mobile'); }}
                className="w-full py-3.5 rounded-full bg-[var(--blue)] text-white font-medium text-[16px] flex items-center justify-center gap-2"
              >
                Start Inspection <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — HERO
          Google-product-launch style. Large headline + phone visual.
          ══════════════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ paddingTop: 'clamp(3.5rem, 8vh, 6rem)', paddingBottom: 'clamp(4rem, 10vh, 7rem)' }}>
        <div ref={heroR} className="reveal max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
            {/* Copy */}
            <div className="flex-1 text-center lg:text-left space-y-7">
              <h1
                className="font-extrabold text-[var(--text-1)] leading-[1.08] tracking-[-0.03em]"
                style={{ fontSize: 'var(--fs-display)' }}
              >
                Turn every package<br className="hidden sm:inline" /> into a compliance decision.
              </h1>

              <p className="text-[var(--text-3)] max-w-[520px] mx-auto lg:mx-0 leading-[1.7]" style={{ fontSize: 'var(--fs-body-lg)' }}>
                MetriGuard helps inspectors analyze packaged commodities using
                package images, computer vision, OCR and regulatory
                intelligence — with evidence-backed results.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:justify-center lg:justify-start pt-1">
                <button
                  onClick={() => onLaunchDemo('mobile')}
                  className="px-8 py-3.5 rounded-full bg-[var(--blue)] text-white font-medium text-[16px] hover:bg-[#1557B0] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  Start Inspection
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#how-it-works"
                  className="px-8 py-3.5 rounded-full text-[var(--blue)] font-medium text-[16px] border border-[var(--border)] hover:bg-[var(--bg-alt)] transition-colors text-center"
                >
                  See how it works
                </a>
              </div>
            </div>

            {/* Phone Product Visual */}
            <div className="flex-shrink-0 flex justify-center mt-14 lg:mt-0">
              <div className="device">
                <div className="device-screen">
                  <PhoneUI />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — THE PHYSICAL PACKAGE
          Large editorial layout — no cards.
          ══════════════════════════════════════════════════════════ */}
      <section id="product" className="section-padding bg-[var(--bg-alt)]">
        <div ref={problemR} className="reveal max-w-[1000px] mx-auto">
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <h2 className="font-bold tracking-[-0.025em] text-[var(--text-1)]" style={{ fontSize: 'var(--fs-h1)' }}>
              Compliance starts with the package in your hands.
            </h2>
            <p className="mt-5 text-[var(--text-3)] leading-[1.7]" style={{ fontSize: 'var(--fs-body-lg)' }}>
              Every packaged commodity carries mandatory declarations under
              the Legal Metrology Rules, 2011. MetriGuard reads and verifies
              them — digitally.
            </p>
          </div>

          {/* Clean white inspection card — Google-style information surface */}
          <div className="bg-white rounded-3xl max-w-[640px] mx-auto overflow-hidden" style={{ border: '1px solid var(--border)', boxShadow: '0 1px 3px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.04)' }}>
            {/* Product identity header */}
            <div className="px-7 sm:px-9 pt-8 pb-6" style={{ borderBottom: '1px solid var(--border-light)' }}>
              <div className="text-[var(--text-4)] text-[var(--fs-xs)] font-semibold uppercase tracking-[0.15em]">
                Packaged Commodity
              </div>
              <h3 className="text-[26px] sm:text-[30px] font-bold text-[var(--text-1)] leading-[1.15] tracking-[-0.02em] mt-2">
                Potato Chips
              </h3>
              <p className="text-[var(--text-3)] text-[var(--fs-body)] mt-1">
                India's Magic Masala · 50g
              </p>
              <div className="text-[var(--text-5)] text-[var(--fs-xs)] mt-3">
                EAN 8901491101844
              </div>
            </div>

            {/* Declaration rows */}
            <div className="px-7 sm:px-9 py-2">
              {[
                { label: 'Maximum Retail Price', value: '₹ 20.00 (incl. of all taxes)', status: 'pass' as const },
                { label: 'Net Quantity', value: '50 g — standard metric', status: 'pass' as const },
                { label: 'Manufacturer', value: 'PepsiCo India, Gurugram 132103', status: 'pass' as const },
                { label: 'Consumer Care Email', value: 'Not found on package', status: 'fail' as const },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-4 py-5" style={{ borderBottom: i < 3 ? '1px solid var(--border-light)' : 'none' }}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[var(--text-4)] text-[var(--fs-xs)] font-medium uppercase tracking-[0.1em]">
                      {item.label}
                    </div>
                    <div className={`text-[var(--fs-body)] font-semibold mt-1.5 ${item.status === 'fail' ? 'text-[var(--red)]' : 'text-[var(--text-1)]'}`}>
                      {item.value}
                    </div>
                  </div>
                  <div className={`flex-shrink-0 mt-3 w-6 h-6 rounded-full flex items-center justify-center ${
                    item.status === 'pass' ? 'bg-[var(--green-bg)]' : 'bg-[var(--red-bg)]'
                  }`}>
                    {item.status === 'pass'
                      ? <Check className="w-3.5 h-3.5 text-[var(--green)]" />
                      : <X className="w-3.5 h-3.5 text-[var(--red)]" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — HOW IT WORKS (Journey)
          Vertical, scroll-activated, one step at a time.
          ══════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="section-padding">
        <div ref={journeyR} className="reveal max-w-[680px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-bold tracking-[-0.025em] text-[var(--text-1)]" style={{ fontSize: 'var(--fs-h1)' }}>
              From package to proof.
            </h2>
            <p className="mt-5 text-[var(--text-3)] leading-[1.7] max-w-[480px] mx-auto" style={{ fontSize: 'var(--fs-body-lg)' }}>
              Five steps transform a physical commodity into a verified compliance record.
            </p>
          </div>

          <div className="space-y-2">
            {steps.map((s, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  key={i}
                  ref={setStep(i)}
                  className="transition-all duration-500 rounded-2xl px-6 sm:px-8 py-7"
                  style={{
                    background: isActive ? 'var(--bg-alt)' : 'transparent',
                    opacity: isActive ? 1 : 0.45,
                  }}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-bold text-[var(--fs-sm)] transition-all duration-500"
                      style={{
                        background: isActive ? 'var(--blue)' : 'var(--bg-subtle)',
                        color: isActive ? '#fff' : 'var(--text-4)',
                      }}
                    >
                      {s.n}
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text-1)] text-[22px] tracking-[-0.02em]">
                        {s.title}
                      </h3>
                      <p className="text-[var(--text-3)] mt-2 leading-[1.65]" style={{ fontSize: 'var(--fs-body)' }}>
                        {s.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — INTELLIGENCE (Package → Structured Data)
          ══════════════════════════════════════════════════════════ */}
      <section id="technology" className="section-padding bg-[var(--bg-alt)]">
        <div ref={intelR} className="reveal max-w-[1000px] mx-auto">
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <h2 className="font-bold tracking-[-0.025em] text-[var(--text-1)]" style={{ fontSize: 'var(--fs-h1)' }}>
              From pixels to regulatory insight.
            </h2>
            <p className="mt-5 text-[var(--text-3)] leading-[1.7]" style={{ fontSize: 'var(--fs-body-lg)' }}>
              Computer Vision and OCR extract mandatory declarations from physical
              package images and normalize them into structured compliance fields.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-sm" style={{ border: '1px solid var(--border-light)' }}>
            {/* Dark: raw package text */}
            <div className="flex-1 bg-[#202124] p-8 sm:p-10 text-white">
              <div className="text-white/40 text-[var(--fs-xs)] font-medium uppercase tracking-[0.15em] mb-6">
                Physical package · OCR extraction
              </div>
              <div className="space-y-5">
                {[
                  { text: '"MRP ₹ 20.00 (incl. of all taxes)"', ok: true },
                  { text: '"Net Qty: 50 g"', ok: true },
                  { text: '"PepsiCo India Holdings Pvt Ltd, Gurugram — 132103"', ok: true },
                  { text: '"Consumer Manager, PO Box 27, Tel: 1800-22-4020"', ok: true },
                  { text: 'Consumer grievance email — not detected', ok: false },
                ].map((r, i) => (
                  <div key={i} className={`pl-4 text-[var(--fs-body)] leading-[1.6] ${r.ok ? 'text-white/80 border-l-2 border-white/20' : 'text-red-400/90 border-l-2 border-red-500/40 italic'}`}>
                    {r.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Light: structured data */}
            <div className="flex-1 bg-white p-8 sm:p-10">
              <div className="text-[var(--text-4)] text-[var(--fs-xs)] font-medium uppercase tracking-[0.15em] mb-6">
                Structured compliance fields
              </div>
              <div className="space-y-0 divide-y divide-[var(--border-light)]">
                {[
                  { k: 'Retail Sale Price', v: '₹ 20.00 (incl. all taxes)', ok: true },
                  { k: 'Net Quantity', v: '50 g — metric standard', ok: true },
                  { k: 'Manufacturer', v: 'Complete address + PIN', ok: true },
                  { k: 'Country of Origin', v: 'India', ok: true },
                  { k: 'Consumer Care Email', v: 'Not detected', ok: false },
                ].map((r, i) => (
                  <div key={i} className="py-4 flex items-center justify-between gap-3">
                    <span className="text-[var(--text-3)] text-[var(--fs-sm)]">{r.k}</span>
                    <span className={`text-[var(--fs-sm)] font-semibold text-right ${r.ok ? 'text-[var(--text-1)]' : 'text-[var(--red)]'}`}>
                      {r.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 — REFERENCE VS REALITY
          ══════════════════════════════════════════════════════════ */}
      <section className="section-padding">
        <div ref={refR} className="reveal max-w-[900px] mx-auto">
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <h2 className="font-bold tracking-[-0.025em] text-[var(--text-1)]" style={{ fontSize: 'var(--fs-h1)' }}>
              Reference data meets physical reality.
            </h2>
            <p className="mt-5 text-[var(--text-3)] leading-[1.7]" style={{ fontSize: 'var(--fs-body-lg)' }}>
              MetriGuard cross-examines what the database expects against what
              was physically captured from the package.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden" style={{ border: '1px solid var(--border-light)' }}>
            {/* Reference */}
            <div className="bg-[var(--bg-alt)] p-7 sm:p-9 border-b md:border-b-0 md:border-r border-[var(--border-light)]">
              <div className="text-[var(--text-4)] text-[var(--fs-xs)] font-semibold uppercase tracking-[0.15em]">Reference</div>
              <h3 className="font-bold text-[var(--text-1)] text-[20px] mt-1 mb-7">Product Master Database</h3>
              {[
                { k: 'Product', v: "Lay's India's Magic Masala" },
                { k: 'Net Quantity', v: '50 g' },
                { k: 'MRP', v: '₹ 20.00' },
                { k: 'Consumer Email', v: 'care@pepsico.com' },
              ].map((r, i) => (
                <div key={i} className="mb-5">
                  <div className="text-[var(--text-4)] text-[var(--fs-xs)]">{r.k}</div>
                  <div className="text-[var(--text-1)] text-[var(--fs-body)] font-semibold mt-0.5">{r.v}</div>
                </div>
              ))}
            </div>

            {/* Observed */}
            <div className="bg-white p-7 sm:p-9">
              <div className="text-[var(--text-4)] text-[var(--fs-xs)] font-semibold uppercase tracking-[0.15em]">Observed</div>
              <h3 className="font-bold text-[var(--text-1)] text-[20px] mt-1 mb-7">Physical Package (OCR)</h3>
              {[
                { k: 'Product', v: 'Match (98%)', ok: true },
                { k: 'Net Quantity', v: 'Match (50 g)', ok: true },
                { k: 'MRP', v: 'Match (₹ 20.00)', ok: true },
                { k: 'Consumer Email', v: 'Missing on package', ok: false },
              ].map((r, i) => (
                <div key={i} className="mb-5">
                  <div className="text-[var(--text-4)] text-[var(--fs-xs)]">{r.k}</div>
                  <div className={`flex items-center gap-1.5 text-[var(--fs-body)] font-semibold mt-0.5 ${
                    r.ok ? 'text-[var(--green)]' : 'text-[var(--red)]'
                  }`}>
                    {r.ok ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    {r.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 6 — EVIDENCE REPORT (Second Hero)
          ══════════════════════════════════════════════════════════ */}
      <section id="compliance" className="section-padding bg-[var(--bg-alt)]">
        <div ref={evidenceR} className="reveal max-w-[880px] mx-auto">
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <h2 className="font-bold tracking-[-0.025em] text-[var(--text-1)]" style={{ fontSize: 'var(--fs-h1)' }}>
              Every finding comes with evidence.
            </h2>
            <p className="mt-5 text-[var(--text-3)] leading-[1.7]" style={{ fontSize: 'var(--fs-body-lg)' }}>
              Every statutory finding is tied to visual evidence, spatial
              coordinates, and rule citations — nothing unsubstantiated.
            </p>
          </div>

          {/* Report card */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm" style={{ border: '1px solid var(--border)' }}>
            {/* Header */}
            <div className="px-7 sm:px-10 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderBottom: '1px solid var(--border-light)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--text-1)] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[18px] text-[var(--text-1)]">
                    Legal Metrology Inspection Report
                  </h3>
                  <span className="text-[var(--text-4)] text-[var(--fs-sm)]">
                    INSP-2026-LM-00942 · Gurugram
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--red-bg)] text-[var(--red)] text-[var(--fs-sm)] font-bold self-start">
                <span className="w-2 h-2 rounded-full bg-[var(--red)]" />
                Non-Compliant
              </span>
            </div>

            <div className="px-7 sm:px-10 py-8 space-y-8">
              {/* Evidence crop */}
              <div className="rounded-2xl p-6 border-2 border-dashed border-red-200 bg-[var(--red-bg)]/30">
                <div className="text-[var(--text-4)] text-[var(--fs-xs)] font-semibold uppercase tracking-[0.15em] mb-3">
                  Evidence — Consumer Redressal Panel
                </div>
                <div className="bg-white rounded-xl p-4 border border-[var(--border-light)]">
                  <p className="text-[var(--text-2)] text-[var(--fs-body)] leading-[1.65] italic">
                    "Consumer Manager, PO Box 27, DLF Qutab Enclave Phase III,
                    Gurugram — 122002. Tel: 1800-22-4020"
                  </p>
                </div>
                <p className="text-[var(--red)] text-[var(--fs-sm)] font-medium mt-4">
                  Expected consumer grievance email address was not detected in
                  any text region of the package.
                </p>
              </div>

              {/* Details */}
              <div className="divide-y divide-[var(--border-light)]">
                {[
                  { k: 'Product', v: "Lay's India's Magic Masala (50g)" },
                  { k: 'Violation', v: 'Missing mandatory grievance email', red: true },
                  { k: 'Applicable Rule', v: 'PCR 2011 — Rule 6(1)(f)' },
                  { k: 'OCR Confidence', v: '94.7%' },
                  { k: 'Inspector', v: 'Sh. R. K. Verma (#LM-884)' },
                  { k: 'Timestamp', v: '01 Sep 2026 · 14:24 IST' },
                ].map((r, i) => (
                  <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[var(--text-3)] text-[var(--fs-sm)]">{r.k}</span>
                    <span className={`text-[var(--fs-sm)] font-semibold sm:text-right ${r.red ? 'text-[var(--red)]' : 'text-[var(--text-1)]'}`}>
                      {r.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 7 — FINAL CTA + FOOTER
          ══════════════════════════════════════════════════════════ */}
      <section className="section-padding">
        <div ref={ctaR} className="reveal max-w-[640px] mx-auto text-center space-y-7">
          <h2 className="font-bold tracking-[-0.025em] text-[var(--text-1)] leading-[1.15]" style={{ fontSize: 'var(--fs-h1)' }}>
            Inspect smarter.{' '}<br className="sm:hidden" />
            Document better.{' '}<br className="sm:hidden" />
            Enforce with evidence.
          </h2>
          <p className="text-[var(--text-3)] leading-[1.7]" style={{ fontSize: 'var(--fs-body-lg)' }}>
            MetriGuard brings package inspection, regulatory validation, and
            evidence-backed reporting into one workflow.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onLaunchDemo('mobile')}
              className="px-10 py-4 rounded-full bg-[var(--blue)] text-white font-medium text-[16px] hover:bg-[#1557B0] transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              Start Inspection
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-5 sm:px-8" style={{ borderTop: '1px solid var(--border-light)' }}>
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[var(--fs-sm)] text-[var(--text-4)]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[var(--blue)]" />
            <span className="font-bold text-[var(--text-1)]">MetriGuard</span>
            <span className="mx-1">·</span>
            <span>Legal Metrology (Packaged Commodities) Rules, 2011</span>
          </div>
          <span className="text-[var(--fs-xs)] text-[var(--text-5)]">
            Smart India Hackathon 2026 · PS 34
          </span>
        </div>
      </footer>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   PhoneUI — Realistic MetriGuard inspection screen inside device
   ══════════════════════════════════════════════════════════════ */
function PhoneUI() {
  return (
    <div className="h-full flex flex-col bg-white text-[var(--text-1)]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-12 pb-1 text-[10px] font-semibold text-[var(--text-4)]">
        <span>9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-4 h-2 rounded-sm bg-[var(--text-4)]" />
        </div>
      </div>

      {/* App header */}
      <div className="px-5 py-3 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border-light)' }}>
        <Shield className="w-4 h-4 text-[var(--blue)]" />
        <span className="font-bold text-[12px] tracking-[-0.01em]">MetriGuard</span>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        {/* Product card */}
        <div className="rounded-xl p-3.5" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-light)' }}>
          <div className="text-[9px] font-semibold text-[var(--text-4)] uppercase tracking-[0.12em]">Inspecting</div>
          <div className="text-[13px] font-bold text-[var(--text-1)] mt-0.5">Lay's Magic Masala</div>
          <div className="text-[10px] text-[var(--text-4)] mt-0.5">50g · EAN 8901491101844</div>
        </div>

        {/* Results */}
        <div className="space-y-1.5">
          {[
            { label: 'MRP Declaration', pass: true },
            { label: 'Net Quantity', pass: true },
            { label: 'Manufacturer', pass: true },
            { label: 'Consumer Email', pass: false },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between px-3.5 py-2.5 rounded-xl" style={{
              background: r.pass ? 'var(--green-bg)' : 'var(--red-bg)',
            }}>
              <span className="text-[11px] font-medium text-[var(--text-2)]">{r.label}</span>
              <span className={`text-[10px] font-bold flex items-center gap-1 ${r.pass ? 'text-[var(--green)]' : 'text-[var(--red)]'}`}>
                {r.pass ? <Check className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                {r.pass ? 'Pass' : 'Fail'}
              </span>
            </div>
          ))}
        </div>

        {/* Verdict */}
        <div className="rounded-xl p-3.5" style={{ background: 'var(--red-bg)', border: '1px solid #f5c6cb' }}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--red)]" />
            <span className="text-[12px] font-bold text-[var(--red)]">Non-Compliant</span>
          </div>
          <div className="text-[10px] text-[var(--text-3)] mt-1">1 violation · Rule 6(1)(f)</div>
        </div>

        {/* CTA */}
        <button className="w-full py-2.5 rounded-xl bg-[var(--blue)] text-white text-[11px] font-semibold">
          View Evidence Report
        </button>
      </div>
    </div>
  );
}
