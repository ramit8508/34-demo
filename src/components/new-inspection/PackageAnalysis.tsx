import React, { useState, useEffect } from 'react';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Scan,
  ShieldCheck,
  Package,
} from 'lucide-react';
import { STORED_DEMO_PRODUCT, type ProductRecord } from '../../data/productData';

interface PackageAnalysisProps {
  product?: ProductRecord | null;
  frontImage: string | null;
  backImage: string | null;
  leftImage: string | null;
  rightImage: string | null;
  onBackToCapture: () => void;
  onContinueToValidation: () => void;
}

type AnalysisPhase =
  | 'images_received'      // 0.0 - 0.6s
  | 'computer_vision'      // 0.6 - 1.5s
  | 'ocr'                  // 1.5 - 2.3s
  | 'structured_decl'      // 2.3 - 3.0s
  | 'reference_matching'   // 3.0 - 4.0s
  | 'rule_engine'          // 4.0 - 4.7s
  | 'complete';            // 4.7s+

export const PackageAnalysis: React.FC<PackageAnalysisProps> = ({
  product = STORED_DEMO_PRODUCT,
  frontImage,
  backImage,
  leftImage,
  rightImage,
  onBackToCapture,
  onContinueToValidation,
}) => {
  const currentProduct = product || STORED_DEMO_PRODUCT;
  const [phase, setPhase] = useState<AnalysisPhase>('images_received');
  const [activeImageTab, setActiveImageTab] = useState<'front' | 'back' | 'left' | 'right'>('front');

  // Staggered item reveals
  const [cvMarkersVisible, setCvMarkersVisible] = useState(false);
  const [ocrRevealedCount, setOcrRevealedCount] = useState(0);
  const [structRevealedCount, setStructRevealedCount] = useState(0);
  const [matchRevealedCount, setMatchRevealedCount] = useState(0);
  const [ruleRevealedCount, setRuleRevealedCount] = useState(0);

  useEffect(() => {
    // 0.0s - Phase 0: Images received
    const t0 = setTimeout(() => {
      setPhase('images_received');
    }, 0);

    // 0.6s - Phase 1: Computer Vision
    const t1 = setTimeout(() => {
      setPhase('computer_vision');
    }, 600);

    // 0.9s - Computer vision markers appear during scan
    const t1b = setTimeout(() => {
      setCvMarkersVisible(true);
    }, 900);

    // 1.5s - Phase 2: OCR
    const t2 = setTimeout(() => {
      setPhase('ocr');
    }, 1500);

    // Staggered OCR items
    const ocrT1 = setTimeout(() => setOcrRevealedCount(1), 1600);
    const ocrT2 = setTimeout(() => setOcrRevealedCount(2), 1750);
    const ocrT3 = setTimeout(() => setOcrRevealedCount(3), 1900);
    const ocrT4 = setTimeout(() => setOcrRevealedCount(4), 2050);
    const ocrT5 = setTimeout(() => setOcrRevealedCount(5), 2200);

    // 2.3s - Phase 3: Structured Declarations
    const t3 = setTimeout(() => {
      setPhase('structured_decl');
    }, 2300);

    // Staggered Structured items
    const sT1 = setTimeout(() => setStructRevealedCount(1), 2400);
    const sT2 = setTimeout(() => setStructRevealedCount(2), 2550);
    const sT3 = setTimeout(() => setStructRevealedCount(3), 2700);
    const sT4 = setTimeout(() => setStructRevealedCount(4), 2850);
    const sT5 = setTimeout(() => setStructRevealedCount(5), 2950);

    // 3.0s - Phase 4: Reference Matching
    const t4 = setTimeout(() => {
      setPhase('reference_matching');
    }, 3000);

    // Staggered Reference Matching rows
    const mT1 = setTimeout(() => setMatchRevealedCount(1), 3150);
    const mT2 = setTimeout(() => setMatchRevealedCount(2), 3350);
    const mT3 = setTimeout(() => setMatchRevealedCount(3), 3550);
    const mT4 = setTimeout(() => setMatchRevealedCount(4), 3750);
    const mT5 = setTimeout(() => setMatchRevealedCount(5), 3950);

    // 4.0s - Phase 5: Legal Metrology Rule Engine
    const t5 = setTimeout(() => {
      setPhase('rule_engine');
    }, 4000);

    // Staggered Rule evaluations
    const rT1 = setTimeout(() => setRuleRevealedCount(1), 4100);
    const rT2 = setTimeout(() => setRuleRevealedCount(2), 4250);
    const rT3 = setTimeout(() => setRuleRevealedCount(3), 4400);
    const rT4 = setTimeout(() => setRuleRevealedCount(4), 4550);
    const rT5 = setTimeout(() => setRuleRevealedCount(5), 4700);

    // 4.7s - Phase 6: Complete
    const t6 = setTimeout(() => {
      setPhase('complete');
    }, 4700);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t1b);
      clearTimeout(t2);
      clearTimeout(ocrT1);
      clearTimeout(ocrT2);
      clearTimeout(ocrT3);
      clearTimeout(ocrT4);
      clearTimeout(ocrT5);
      clearTimeout(t3);
      clearTimeout(sT1);
      clearTimeout(sT2);
      clearTimeout(sT3);
      clearTimeout(sT4);
      clearTimeout(sT5);
      clearTimeout(t4);
      clearTimeout(mT1);
      clearTimeout(mT2);
      clearTimeout(mT3);
      clearTimeout(mT4);
      clearTimeout(mT5);
      clearTimeout(t5);
      clearTimeout(rT1);
      clearTimeout(rT2);
      clearTimeout(rT3);
      clearTimeout(rT4);
      clearTimeout(rT5);
      clearTimeout(t6);
    };
  }, []);

  const isComplete = phase === 'complete';

  const phaseRank = (p: AnalysisPhase): number => {
    const list: AnalysisPhase[] = [
      'images_received',
      'computer_vision',
      'ocr',
      'structured_decl',
      'reference_matching',
      'rule_engine',
      'complete',
    ];
    return list.indexOf(p);
  };

  const isDone = (p: AnalysisPhase) => phaseRank(phase) > phaseRank(p);
  const isActive = (p: AnalysisPhase) => phase === p;

  const getActiveImageUrl = () => {
    if (activeImageTab === 'front') return frontImage;
    if (activeImageTab === 'back') return backImage;
    if (activeImageTab === 'left') return leftImage;
    return rightImage;
  };

  return (
    <div className="analysis-page-root">
      {/* ── Top Status Header ─────────────────────────────── */}
      <div className="analysis-header-block">
        <div className="flex items-center gap-2">
          {isComplete ? (
            <div className="analysis-status-pill analysis-status-pill--done">
              <Check className="w-3.5 h-3.5 text-[#1E8E3E] stroke-[2.5]" />
              <span>Analysis complete</span>
            </div>
          ) : (
            <div className="analysis-status-pill analysis-status-pill--active">
              <span className="analysis-pulse-dot" />
              <span>
                {phase === 'images_received' && 'Package images received'}
                {phase === 'computer_vision' && 'Inspecting package regions...'}
                {phase === 'ocr' && 'Extracting printed declarations...'}
                {phase === 'structured_decl' && 'Structuring declaration fields...'}
                {phase === 'reference_matching' && 'Comparing with reference catalog...'}
                {phase === 'rule_engine' && 'Evaluating Legal Metrology rules...'}
              </span>
            </div>
          )}
          <span className="text-[12px] text-[#5F6368] ml-auto font-mono">
            Session: {currentProduct.id}
          </span>
        </div>

        <h1 className="analysis-page-title">Package analysis</h1>
        <p className="analysis-page-sub">
          {isComplete
            ? 'Package declarations have been structured and are ready for regulatory validation.'
            : 'Reviewing captured package images and extracting legal metrology declarations.'}
        </p>

        {/* Continuous Pipeline Progress Track */}
        <div className="analysis-progress-bar-wrap">
          <div
            className="analysis-progress-bar-fill"
            style={{
              width:
                phase === 'images_received'
                  ? '14%'
                  : phase === 'computer_vision'
                  ? '30%'
                  : phase === 'ocr'
                  ? '48%'
                  : phase === 'structured_decl'
                  ? '66%'
                  : phase === 'reference_matching'
                  ? '84%'
                  : '100%',
            }}
          />
        </div>
      </div>

      {/* ── Main Two-Column Layout (Desktop) / Vertical (Mobile) ── */}
      <div className="analysis-layout-grid">
        {/* LEFT COLUMN: Real Captured Images & Computer Vision Regions */}
        <div className="analysis-left-col">
          <div className="analysis-image-viewport-card">
            <div className="analysis-card-head">
              <div className="flex items-center gap-2">
                <Scan className="w-4 h-4 text-[#1A73E8]" />
                <span className="analysis-card-title">Observed package evidence</span>
              </div>
              <span className="text-[11px] text-[#5F6368] font-medium">Physical Photographs</span>
            </div>

            {/* Viewport Tabs */}
            <div className="analysis-tab-row">
              <button
                type="button"
                className={`analysis-tab-btn ${activeImageTab === 'front' ? 'analysis-tab-btn--active' : ''}`}
                onClick={() => setActiveImageTab('front')}
              >
                01. Front
              </button>
              <button
                type="button"
                className={`analysis-tab-btn ${activeImageTab === 'back' ? 'analysis-tab-btn--active' : ''}`}
                onClick={() => setActiveImageTab('back')}
              >
                02. Back
              </button>
              {leftImage && (
                <button
                  type="button"
                  className={`analysis-tab-btn ${activeImageTab === 'left' ? 'analysis-tab-btn--active' : ''}`}
                  onClick={() => setActiveImageTab('left')}
                >
                  03. Left
                </button>
              )}
              {rightImage && (
                <button
                  type="button"
                  className={`analysis-tab-btn ${activeImageTab === 'right' ? 'analysis-tab-btn--active' : ''}`}
                  onClick={() => setActiveImageTab('right')}
                >
                  04. Right
                </button>
              )}
            </div>

            {/* Real Image Canvas with Scan Beam & Precise Annotation Callouts */}
            <div className="analysis-image-canvas">
              {getActiveImageUrl() ? (
                <>
                  <img
                    src={getActiveImageUrl()!}
                    alt={`${activeImageTab} view`}
                    className="analysis-captured-img insp-img-enter"
                  />

                  {/* Active Scan Beam during Computer Vision Phase */}
                  {phase === 'computer_vision' && (
                    <div className="insp-scan-beam" />
                  )}

                  {/* Precise Regulatory Annotation Markers */}
                  {(cvMarkersVisible || isDone('computer_vision')) && (
                    <div className="insp-annotation-layer">
                      {activeImageTab === 'front' ? (
                        <>
                          {/* PDP Marker */}
                          <div className="insp-callout insp-callout--pdp insp-callout-anim">
                            <span className="insp-callout-dot" />
                            <span className="insp-callout-line" />
                            <span className="insp-callout-tag">Principal Display Panel</span>
                          </div>

                          {/* Net Qty Marker */}
                          <div className="insp-callout insp-callout--qty insp-callout-anim">
                            <span className="insp-callout-dot" />
                            <span className="insp-callout-line" />
                            <span className="insp-callout-tag">Net Qty: {currentProduct.packSize}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Information Panel */}
                          <div className="insp-callout insp-callout--info insp-callout-anim">
                            <span className="insp-callout-dot" />
                            <span className="insp-callout-line" />
                            <span className="insp-callout-tag">Information Panel</span>
                          </div>

                          {/* MRP & Date Callout */}
                          <div className="insp-callout insp-callout--mrp insp-callout-anim">
                            <span className="insp-callout-dot" />
                            <span className="insp-callout-line" />
                            <span className="insp-callout-tag">MRP: {currentProduct.mrp}</span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="analysis-no-img">
                  <Package className="w-8 h-8 text-[#BDC1C6] mb-2" />
                  <span className="text-[12px] text-[#5F6368]">No image captured for this view</span>
                </div>
              )}
            </div>

            <div className="analysis-image-caption">
              <span className="font-semibold text-[#202124]">
                {activeImageTab === 'front'
                  ? 'Principal Display Panel (PDP)'
                  : activeImageTab === 'back'
                  ? 'Information & Declaration Panel'
                  : 'Side Packaging Panel'}
              </span>
              <span className="text-[11.5px] text-[#5F6368] block mt-0.5">
                {activeImageTab === 'front'
                  ? 'Primary commodity identity, brand marking and net quantity declaration.'
                  : 'Mandatory declarations: MRP, manufacturer address, consumer care and batch.'}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 5 Sequential Technology Processing Panels (Continuous Visual Spine) */}
        <div className="analysis-right-col">
          {/* ── Tech 01: Computer Vision ────────────────────── */}
          <div
            className={`analysis-step-card ${
              isActive('computer_vision')
                ? 'analysis-step--active'
                : isDone('computer_vision')
                ? 'analysis-step--done'
                : 'analysis-step--pending'
            }`}
          >
            <div className="analysis-step-header">
              <div className="flex items-center gap-2">
                <div className="analysis-tech-badge">01</div>
                <div>
                  <h3 className="analysis-tech-name">Computer Vision</h3>
                  <p className="analysis-tech-sub">
                    Detecting package regions and locating printed information.
                  </p>
                </div>
              </div>

              {isDone('computer_vision') ? (
                <span className="analysis-state-tag analysis-state-tag--done">
                  <Check className="w-3 h-3 text-[#1E8E3E]" />
                  <span>Regions localized</span>
                </span>
              ) : isActive('computer_vision') ? (
                <span className="analysis-state-tag analysis-state-tag--active">
                  <span>Scanning regions...</span>
                </span>
              ) : (
                <span className="analysis-state-tag">Queued</span>
              )}
            </div>

            {isDone('computer_vision') && (
              <div className="analysis-detected-regions-list insp-fade-enter">
                <span className="analysis-region-chip">✓ PDP Region</span>
                <span className="analysis-region-chip">✓ Information Panel</span>
                <span className="analysis-region-chip">✓ MRP Area</span>
                <span className="analysis-region-chip">✓ Net Quantity Zone</span>
              </div>
            )}
          </div>

          {/* ── Tech 02: OCR ────────────────────────────────── */}
          <div
            className={`analysis-step-card ${
              isActive('ocr')
                ? 'analysis-step--active'
                : isDone('ocr')
                ? 'analysis-step--done'
                : 'analysis-step--pending'
            }`}
          >
            <div className="analysis-step-header">
              <div className="flex items-center gap-2">
                <div className="analysis-tech-badge">02</div>
                <div>
                  <h3 className="analysis-tech-name">OCR (Optical Character Recognition)</h3>
                  <p className="analysis-tech-sub">
                    Extracting text and numeric declarations from the package.
                  </p>
                </div>
              </div>

              {isDone('ocr') ? (
                <span className="analysis-state-tag analysis-state-tag--done">
                  <Check className="w-3 h-3 text-[#1E8E3E]" />
                  <span>Text extracted</span>
                </span>
              ) : isActive('ocr') ? (
                <span className="analysis-state-tag analysis-state-tag--active">
                  <span>Extracting tokens...</span>
                </span>
              ) : (
                <span className="analysis-state-tag">Waiting</span>
              )}
            </div>

            {ocrRevealedCount > 0 && (
              <div className="analysis-raw-ocr-box">
                {ocrRevealedCount >= 1 && (
                  <span className="analysis-ocr-line insp-token-resolve">
                    "MRP Rs. 20.00 (INCL. OF ALL TAXES)"
                  </span>
                )}
                {ocrRevealedCount >= 2 && (
                  <span className="analysis-ocr-line insp-token-resolve">
                    "NET QUANTITY: 50 g"
                  </span>
                )}
                {ocrRevealedCount >= 3 && (
                  <span className="analysis-ocr-line insp-token-resolve">
                    "MFD BY: PEPSICO INDIA HOLDINGS PVT LTD"
                  </span>
                )}
                {ocrRevealedCount >= 4 && (
                  <span className="analysis-ocr-line insp-token-resolve">
                    "CONSUMER CARE: 1800 226 226 | feedback@pepsico.com"
                  </span>
                )}
                {ocrRevealedCount >= 5 && (
                  <span className="analysis-ocr-line insp-token-resolve">
                    "COUNTRY OF ORIGIN: INDIA"
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ── Tech 03: Structured Declarations ────────────── */}
          <div
            className={`analysis-step-card ${
              isActive('structured_decl')
                ? 'analysis-step--active'
                : isDone('structured_decl')
                ? 'analysis-step--done'
                : 'analysis-step--pending'
            }`}
          >
            <div className="analysis-step-header">
              <div className="flex items-center gap-2">
                <div className="analysis-tech-badge">03</div>
                <div>
                  <h3 className="analysis-tech-name">Structured Declarations</h3>
                  <p className="analysis-tech-sub">
                    Converting extracted package text into compliance-ready fields.
                  </p>
                </div>
              </div>

              {isDone('structured_decl') ? (
                <span className="analysis-state-tag analysis-state-tag--done">
                  <Check className="w-3 h-3 text-[#1E8E3E]" />
                  <span>Declarations structured</span>
                </span>
              ) : isActive('structured_decl') ? (
                <span className="analysis-state-tag analysis-state-tag--active">
                  <span>Structuring...</span>
                </span>
              ) : (
                <span className="analysis-state-tag">Waiting</span>
              )}
            </div>

            {structRevealedCount > 0 && (
              <div className="analysis-structured-table">
                {structRevealedCount >= 1 && (
                  <div className="analysis-struct-row insp-struct-align">
                    <span className="analysis-struct-key">Maximum Retail Price (MRP)</span>
                    <span className="analysis-struct-val font-semibold">{currentProduct.mrp}</span>
                  </div>
                )}
                {structRevealedCount >= 2 && (
                  <div className="analysis-struct-row insp-struct-align">
                    <span className="analysis-struct-key">Net Quantity</span>
                    <span className="analysis-struct-val">{currentProduct.netQuantity}</span>
                  </div>
                )}
                {structRevealedCount >= 3 && (
                  <div className="analysis-struct-row insp-struct-align">
                    <span className="analysis-struct-key">Manufacturer Name</span>
                    <span className="analysis-struct-val">{currentProduct.manufacturer}</span>
                  </div>
                )}
                {structRevealedCount >= 4 && (
                  <div className="analysis-struct-row insp-struct-align">
                    <span className="analysis-struct-key">Consumer Redressal</span>
                    <span className="analysis-struct-val">1800 226 226 / feedback@pepsico.com</span>
                  </div>
                )}
                {structRevealedCount >= 5 && (
                  <div className="analysis-struct-row insp-struct-align">
                    <span className="analysis-struct-key">Country of Origin</span>
                    <span className="analysis-struct-val">India</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Tech 04: Reference Data Matching ────────────── */}
          <div
            className={`analysis-step-card ${
              isActive('reference_matching')
                ? 'analysis-step--active'
                : isDone('reference_matching')
                ? 'analysis-step--done'
                : 'analysis-step--pending'
            }`}
          >
            <div className="analysis-step-header">
              <div className="flex items-center gap-2">
                <div className="analysis-tech-badge">04</div>
                <div>
                  <h3 className="analysis-tech-name">Reference Data Matching</h3>
                  <p className="analysis-tech-sub">
                    Comparing observed package information with the product reference record.
                  </p>
                </div>
              </div>

              {isDone('reference_matching') ? (
                <span className="analysis-state-tag analysis-state-tag--done">
                  <Check className="w-3 h-3 text-[#1E8E3E]" />
                  <span>5 of 5 matched</span>
                </span>
              ) : isActive('reference_matching') ? (
                <span className="analysis-state-tag analysis-state-tag--active">
                  <span>Comparing records...</span>
                </span>
              ) : (
                <span className="analysis-state-tag">Waiting</span>
              )}
            </div>

            {matchRevealedCount > 0 && (
              <div className="analysis-match-matrix insp-fade-enter">
                <div className="analysis-matrix-header-row">
                  <span>Field</span>
                  <span>Reference (Catalog)</span>
                  <span>Observed (Package)</span>
                  <span>Result</span>
                </div>

                {matchRevealedCount >= 1 && (
                  <div className="analysis-matrix-row insp-row-compare">
                    <span className="font-medium text-[#202124]">MRP</span>
                    <span className="text-[#5F6368]">{currentProduct.mrp}</span>
                    <span className="text-[#202124] font-semibold">{currentProduct.mrp}</span>
                    <span className="analysis-match-tag">MATCH ✓</span>
                  </div>
                )}

                {matchRevealedCount >= 2 && (
                  <div className="analysis-matrix-row insp-row-compare">
                    <span className="font-medium text-[#202124]">Net Qty</span>
                    <span className="text-[#5F6368]">{currentProduct.netQuantity}</span>
                    <span className="text-[#202124] font-semibold">{currentProduct.netQuantity}</span>
                    <span className="analysis-match-tag">MATCH ✓</span>
                  </div>
                )}

                {matchRevealedCount >= 3 && (
                  <div className="analysis-matrix-row insp-row-compare">
                    <span className="font-medium text-[#202124]">Manufacturer</span>
                    <span className="text-[#5F6368]">PepsiCo India</span>
                    <span className="text-[#202124] font-semibold">PepsiCo India</span>
                    <span className="analysis-match-tag">MATCH ✓</span>
                  </div>
                )}

                {matchRevealedCount >= 4 && (
                  <div className="analysis-matrix-row insp-row-compare">
                    <span className="font-medium text-[#202124]">Consumer Care</span>
                    <span className="text-[#5F6368]">Available</span>
                    <span className="text-[#202124] font-semibold">1800 226 226</span>
                    <span className="analysis-match-tag">MATCH ✓</span>
                  </div>
                )}

                {matchRevealedCount >= 5 && (
                  <div className="analysis-matrix-row insp-row-compare">
                    <span className="font-medium text-[#202124]">Origin</span>
                    <span className="text-[#5F6368]">India</span>
                    <span className="text-[#202124] font-semibold">India</span>
                    <span className="analysis-match-tag">MATCH ✓</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Tech 05: Legal Metrology Rule Engine ─────────── */}
          <div
            className={`analysis-step-card ${
              isActive('rule_engine')
                ? 'analysis-step--active'
                : isDone('rule_engine')
                ? 'analysis-step--done'
                : 'analysis-step--pending'
            }`}
          >
            <div className="analysis-step-header">
              <div className="flex items-center gap-2">
                <div className="analysis-tech-badge">05</div>
                <div>
                  <h3 className="analysis-tech-name">Legal Metrology Rule Engine</h3>
                  <p className="analysis-tech-sub">
                    Evaluating structured declarations against applicable packaged-commodity requirements.
                  </p>
                </div>
              </div>

              {isDone('rule_engine') ? (
                <span className="analysis-state-tag analysis-state-tag--done">
                  <Check className="w-3 h-3 text-[#1E8E3E]" />
                  <span>Rules evaluated</span>
                </span>
              ) : isActive('rule_engine') ? (
                <span className="analysis-state-tag analysis-state-tag--active">
                  <span>Evaluating rules...</span>
                </span>
              ) : (
                <span className="analysis-state-tag">Waiting</span>
              )}
            </div>

            {ruleRevealedCount > 0 && (
              <div className="analysis-rule-list insp-fade-enter">
                {ruleRevealedCount >= 1 && (
                  <div className="analysis-rule-row insp-rule-sweep">
                    <span className="font-mono text-[11px] text-[#5F6368]">Rule 6(1)(a)</span>
                    <span className="text-[12px] text-[#202124]">Name & Address of Manufacturer / Packer</span>
                    <span className="analysis-rule-eval-tag">Evaluated ✓</span>
                  </div>
                )}
                {ruleRevealedCount >= 2 && (
                  <div className="analysis-rule-row insp-rule-sweep">
                    <span className="font-mono text-[11px] text-[#5F6368]">Rule 6(1)(b)</span>
                    <span className="text-[12px] text-[#202124]">Generic / Common Commodity Name</span>
                    <span className="analysis-rule-eval-tag">Evaluated ✓</span>
                  </div>
                )}
                {ruleRevealedCount >= 3 && (
                  <div className="analysis-rule-row insp-rule-sweep">
                    <span className="font-mono text-[11px] text-[#5F6368]">Rule 6(1)(c)</span>
                    <span className="text-[12px] text-[#202124]">Net Quantity in Standard Units (g)</span>
                    <span className="analysis-rule-eval-tag">Evaluated ✓</span>
                  </div>
                )}
                {ruleRevealedCount >= 4 && (
                  <div className="analysis-rule-row insp-rule-sweep">
                    <span className="font-mono text-[11px] text-[#5F6368]">Rule 6(1)(d)</span>
                    <span className="text-[12px] text-[#202124]">Month & Year of Manufacture / Packing</span>
                    <span className="analysis-rule-eval-tag">Evaluated ✓</span>
                  </div>
                )}
                {ruleRevealedCount >= 5 && (
                  <div className="analysis-rule-row insp-rule-sweep">
                    <span className="font-mono text-[11px] text-[#5F6368]">Rule 6(1)(e)</span>
                    <span className="text-[12px] text-[#202124]">Maximum Retail Price (MRP) Declaration</span>
                    <span className="analysis-rule-eval-tag">Evaluated ✓</span>
                  </div>
                )}

                {isDone('rule_engine') && (
                  <div className="analysis-rule-note mt-2">
                    <ShieldCheck className="w-4 h-4 text-[#1E8E3E] flex-shrink-0" />
                    <span className="text-[11.5px] text-[#3C4043]">
                      Legal Metrology (Packaged Commodities) Rules, 2011 requirements staged for regulatory validation.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom Section Divider & Actions ──────────────── */}
      <div className="analysis-section-divider" />

      <div className="analysis-footer-actions">
        <div className="analysis-footer-summary">
          <span className="font-semibold text-[13.5px] text-[#202124]">
            {isComplete ? 'Analysis pipeline complete' : 'Processing inspection pipeline...'}
          </span>
          <span className="text-[12px] text-[#5F6368] block mt-0.5">
            {isComplete
              ? 'Observed package evidence aligned with reference baseline.'
              : 'Please wait while declarations are extracted and evaluated.'}
          </span>
        </div>

        <div className="analysis-action-btns">
          <button
            type="button"
            className="analysis-btn-primary"
            onClick={onContinueToValidation}
            disabled={!isComplete}
          >
            <span>Continue to Validation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="analysis-btn-secondary"
            onClick={onBackToCapture}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Package Capture</span>
          </button>
        </div>
      </div>
    </div>
  );
};
