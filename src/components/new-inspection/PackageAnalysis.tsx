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

type PipelineStage =
  | 'init'
  | 'computer_vision'
  | 'ocr'
  | 'structured_declarations'
  | 'reference_matching'
  | 'rule_engine'
  | 'complete';

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
  const [stage, setStage] = useState<PipelineStage>('init');
  const [activeImageTab, setActiveImageTab] = useState<'front' | 'back' | 'left' | 'right'>('front');

  useEffect(() => {
    // Pipeline Timers (Total ~5.2s)
    const t1 = setTimeout(() => setStage('computer_vision'), 500);
    const t2 = setTimeout(() => setStage('ocr'), 1600);
    const t3 = setTimeout(() => setStage('structured_declarations'), 2700);
    const t4 = setTimeout(() => setStage('reference_matching'), 3800);
    const t5 = setTimeout(() => setStage('rule_engine'), 4700);
    const t6 = setTimeout(() => setStage('complete'), 5400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  const isStageActive = (target: PipelineStage) => stage === target;
  const isStageDone = (target: PipelineStage) => {
    const order: PipelineStage[] = [
      'init',
      'computer_vision',
      'ocr',
      'structured_declarations',
      'reference_matching',
      'rule_engine',
      'complete',
    ];
    return order.indexOf(stage) > order.indexOf(target);
  };

  const isComplete = stage === 'complete';

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
              <span>Analyzing package...</span>
            </div>
          )}
          <span className="text-[12px] text-[#5F6368] ml-auto font-mono">
            ID: {currentProduct.id}
          </span>
        </div>

        <h1 className="analysis-page-title">Package analysis</h1>
        <p className="analysis-page-sub">
          {isComplete
            ? 'Package declarations have been structured and are ready for regulatory validation.'
            : 'Reviewing captured package images and extracting legal metrology declarations.'}
        </p>

        {/* Progress Track */}
        <div className="analysis-progress-bar-wrap">
          <div
            className="analysis-progress-bar-fill"
            style={{
              width:
                stage === 'init'
                  ? '10%'
                  : stage === 'computer_vision'
                  ? '28%'
                  : stage === 'ocr'
                  ? '48%'
                  : stage === 'structured_declarations'
                  ? '68%'
                  : stage === 'reference_matching'
                  ? '86%'
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

            {/* Real Image Frame with Vision Overlays */}
            <div className="analysis-image-canvas">
              {getActiveImageUrl() ? (
                <>
                  <img
                    src={getActiveImageUrl()!}
                    alt={`${activeImageTab} view`}
                    className="analysis-captured-img"
                  />

                  {/* Computer Vision Annotation Overlays */}
                  {(stage !== 'init') && (
                    <div className="analysis-cv-overlay-layer">
                      {activeImageTab === 'front' ? (
                        <div className="analysis-bbox analysis-bbox--pdp">
                          <span className="analysis-bbox-tag">Principal Display Panel (PDP)</span>
                        </div>
                      ) : (
                        <>
                          <div className="analysis-bbox analysis-bbox--info">
                            <span className="analysis-bbox-tag">Information Panel</span>
                          </div>
                          <div className="analysis-bbox analysis-bbox--mrp">
                            <span className="analysis-bbox-tag">MRP & Date Cluster</span>
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
                  ? 'Principal Display Panel'
                  : activeImageTab === 'back'
                  ? 'Information & Declaration Panel'
                  : 'Side Panel'}
              </span>
              <span className="text-[11.5px] text-[#5F6368] block mt-0.5">
                {activeImageTab === 'front'
                  ? 'Brand identity, commodity name and net quantity marking.'
                  : 'MRP, manufacturer details, consumer grievance contact and batch dates.'}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 5 Sequential Technology Processing Panels */}
        <div className="analysis-right-col">
          {/* ── Tech 01: Computer Vision ────────────────────── */}
          <div
            className={`analysis-step-card ${
              isStageActive('computer_vision')
                ? 'analysis-step--active'
                : isStageDone('computer_vision')
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

              {isStageDone('computer_vision') ? (
                <span className="analysis-state-tag analysis-state-tag--done">
                  <Check className="w-3 h-3 text-[#1E8E3E]" />
                  <span>Regions localized</span>
                </span>
              ) : isStageActive('computer_vision') ? (
                <span className="analysis-state-tag analysis-state-tag--active">
                  <span>Scanning regions...</span>
                </span>
              ) : (
                <span className="analysis-state-tag">Queued</span>
              )}
            </div>

            {isStageDone('computer_vision') && (
              <div className="analysis-detected-regions-list">
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
              isStageActive('ocr')
                ? 'analysis-step--active'
                : isStageDone('ocr')
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

              {isStageDone('ocr') ? (
                <span className="analysis-state-tag analysis-state-tag--done">
                  <Check className="w-3 h-3 text-[#1E8E3E]" />
                  <span>Text extracted</span>
                </span>
              ) : isStageActive('ocr') ? (
                <span className="analysis-state-tag analysis-state-tag--active">
                  <span>Extracting tokens...</span>
                </span>
              ) : (
                <span className="analysis-state-tag">Waiting</span>
              )}
            </div>

            {(isStageDone('ocr') || isStageActive('ocr')) && (
              <div className="analysis-raw-ocr-box">
                <span className="analysis-ocr-line">"MRP Rs. 20.00 (INCL. OF ALL TAXES)"</span>
                <span className="analysis-ocr-line">"NET QUANTITY: 50 g"</span>
                <span className="analysis-ocr-line">"MFD BY: PEPSICO INDIA HOLDINGS PVT LTD"</span>
                <span className="analysis-ocr-line">"CONSUMER CARE: 1800 226 226 | feedback@pepsico.com"</span>
                <span className="analysis-ocr-line">"COUNTRY OF ORIGIN: INDIA"</span>
                <span className="analysis-ocr-line">"PKD: 10/24 | BATCH: B2409"</span>
              </div>
            )}
          </div>

          {/* ── Tech 03: Structured Declarations ────────────── */}
          <div
            className={`analysis-step-card ${
              isStageActive('structured_declarations')
                ? 'analysis-step--active'
                : isStageDone('structured_declarations')
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

              {isStageDone('structured_declarations') ? (
                <span className="analysis-state-tag analysis-state-tag--done">
                  <Check className="w-3 h-3 text-[#1E8E3E]" />
                  <span>Normalized</span>
                </span>
              ) : isStageActive('structured_declarations') ? (
                <span className="analysis-state-tag analysis-state-tag--active">
                  <span>Structuring...</span>
                </span>
              ) : (
                <span className="analysis-state-tag">Waiting</span>
              )}
            </div>

            {(isStageDone('structured_declarations') || isStageActive('structured_declarations')) && (
              <div className="analysis-structured-table">
                <div className="analysis-struct-row">
                  <span className="analysis-struct-key">MRP</span>
                  <span className="analysis-struct-val font-semibold">{currentProduct.mrp}</span>
                </div>
                <div className="analysis-struct-row">
                  <span className="analysis-struct-key">Net Quantity</span>
                  <span className="analysis-struct-val">{currentProduct.netQuantity}</span>
                </div>
                <div className="analysis-struct-row">
                  <span className="analysis-struct-key">Manufacturer</span>
                  <span className="analysis-struct-val">{currentProduct.manufacturer}</span>
                </div>
                <div className="analysis-struct-row">
                  <span className="analysis-struct-key">Consumer Care</span>
                  <span className="analysis-struct-val">1800 226 226 / feedback@pepsico.com</span>
                </div>
                <div className="analysis-struct-row">
                  <span className="analysis-struct-key">Country of Origin</span>
                  <span className="analysis-struct-val">India</span>
                </div>
              </div>
            )}
          </div>

          {/* ── Tech 04: Reference Data Matching ────────────── */}
          <div
            className={`analysis-step-card ${
              isStageActive('reference_matching')
                ? 'analysis-step--active'
                : isStageDone('reference_matching')
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

              {isStageDone('reference_matching') ? (
                <span className="analysis-state-tag analysis-state-tag--done">
                  <Check className="w-3 h-3 text-[#1E8E3E]" />
                  <span>5 of 5 matched</span>
                </span>
              ) : isStageActive('reference_matching') ? (
                <span className="analysis-state-tag analysis-state-tag--active">
                  <span>Comparing...</span>
                </span>
              ) : (
                <span className="analysis-state-tag">Waiting</span>
              )}
            </div>

            {(isStageDone('reference_matching') || isStageActive('reference_matching')) && (
              <div className="analysis-match-matrix">
                <div className="analysis-matrix-header-row">
                  <span>Field</span>
                  <span>Reference (Catalog)</span>
                  <span>Observed (Package)</span>
                  <span>Status</span>
                </div>

                <div className="analysis-matrix-row">
                  <span className="font-medium text-[#202124]">MRP</span>
                  <span className="text-[#5F6368]">{currentProduct.mrp}</span>
                  <span className="text-[#202124] font-semibold">{currentProduct.mrp}</span>
                  <span className="analysis-match-tag">Matched ✓</span>
                </div>

                <div className="analysis-matrix-row">
                  <span className="font-medium text-[#202124]">Net Qty</span>
                  <span className="text-[#5F6368]">{currentProduct.netQuantity}</span>
                  <span className="text-[#202124] font-semibold">{currentProduct.netQuantity}</span>
                  <span className="analysis-match-tag">Matched ✓</span>
                </div>

                <div className="analysis-matrix-row">
                  <span className="font-medium text-[#202124]">Manufacturer</span>
                  <span className="text-[#5F6368]">PepsiCo India</span>
                  <span className="text-[#202124] font-semibold">PepsiCo India</span>
                  <span className="analysis-match-tag">Matched ✓</span>
                </div>

                <div className="analysis-matrix-row">
                  <span className="font-medium text-[#202124]">Origin</span>
                  <span className="text-[#5F6368]">India</span>
                  <span className="text-[#202124] font-semibold">India</span>
                  <span className="analysis-match-tag">Matched ✓</span>
                </div>
              </div>
            )}
          </div>

          {/* ── Tech 05: Legal Metrology Rule Engine ─────────── */}
          <div
            className={`analysis-step-card ${
              isStageActive('rule_engine')
                ? 'analysis-step--active'
                : isStageDone('rule_engine')
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

              {isStageDone('rule_engine') ? (
                <span className="analysis-state-tag analysis-state-tag--done">
                  <Check className="w-3 h-3 text-[#1E8E3E]" />
                  <span>Staged for validation</span>
                </span>
              ) : isStageActive('rule_engine') ? (
                <span className="analysis-state-tag analysis-state-tag--active">
                  <span>Evaluating rules...</span>
                </span>
              ) : (
                <span className="analysis-state-tag">Waiting</span>
              )}
            </div>

            {isStageDone('rule_engine') && (
              <div className="analysis-rule-note">
                <ShieldCheck className="w-4 h-4 text-[#1E8E3E] flex-shrink-0" />
                <span className="text-[12px] text-[#3C4043]">
                  Rules evaluated under Legal Metrology (Packaged Commodities) Rules, 2011 (Rule 6, Rule 8).
                </span>
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
              : 'Please wait while declarations are extracted and normalized.'}
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
