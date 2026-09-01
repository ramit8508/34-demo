import React, { useState, useEffect } from 'react';
import {
  Check,
  X as XIcon,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Minus,
  ZoomIn,
  Package,
  FileCheck,
  Maximize2,
  Filter,
} from 'lucide-react';
import {
  STORED_DEMO_PRODUCT,
  getInspectionScenario,
  type ProductRecord,
  type ValidationFinding,
  type ValidationStatus,
} from '../../data/productData';

interface PackageValidationProps {
  product?: ProductRecord | null;
  frontImage: string | null;
  backImage: string | null;
  leftImage: string | null;
  rightImage: string | null;
  onBackToAnalysis: () => void;
  onContinueToReport: () => void;
}

export const PackageValidation: React.FC<PackageValidationProps> = ({
  product = STORED_DEMO_PRODUCT,
  frontImage,
  backImage,
  leftImage,
  rightImage,
  onBackToAnalysis,
  onContinueToReport,
}) => {
  const currentProduct = product || STORED_DEMO_PRODUCT;

  // Retrieve deterministic scenario with separated referenceData, observedData, and validationResults
  const scenario = getInspectionScenario(currentProduct);
  const { validationResults } = scenario;

  const totalChecks = validationResults.length;
  const [evaluatedIndex, setEvaluatedIndex] = useState(0);
  const [isEvaluationComplete, setIsEvaluationComplete] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedEvidencePanel, setSelectedEvidencePanel] = useState<'front' | 'back' | 'left' | 'right'>('front');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    // Progressive evaluation reveal over ~3.2s
    const interval = setInterval(() => {
      setEvaluatedIndex((prev) => {
        if (prev < totalChecks) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsEvaluationComplete(true);
          return prev;
        }
      });
    }, 200);

    return () => clearInterval(interval);
  }, [totalChecks]);

  // Derived metrics dynamically calculated from validationResults
  const evaluatedItems = validationResults.slice(0, evaluatedIndex);
  const compliantCount = evaluatedItems.filter((c) => c.status === 'COMPLIANT').length;
  const nonCompliantCount = evaluatedItems.filter((c) => c.status === 'NON_COMPLIANT').length;
  const reviewCount = evaluatedItems.filter((c) => c.status === 'REVIEW').length;
  const naCount = evaluatedItems.filter((c) => c.status === 'NOT_APPLICABLE').length;

  const isOverallCompliant = nonCompliantCount === 0 && reviewCount === 0;

  const getEvidenceImageUrl = (panel: 'front' | 'back' | 'left' | 'right') => {
    if (panel === 'front') return frontImage;
    if (panel === 'back') return backImage;
    if (panel === 'left') return leftImage;
    return rightImage;
  };

  const handleRuleEvidenceClick = (panel: 'front' | 'back' | 'left' | 'right') => {
    setSelectedEvidencePanel(panel);
  };

  // Filtered list
  const filteredChecks = validationResults.filter((c) => {
    if (selectedCategoryFilter !== 'all' && c.category !== selectedCategoryFilter) return false;
    if (selectedStatusFilter !== 'all' && c.status !== selectedStatusFilter) return false;
    return true;
  });

  const getStatusBadge = (status: ValidationStatus, isEvaluated: boolean, isCurrentlyChecking: boolean) => {
    if (!isEvaluated) {
      if (isCurrentlyChecking) {
        return (
          <span className="val-tag val-tag--evaluating">
            <span>Checking...</span>
          </span>
        );
      }
      return <span className="val-tag val-tag--queued">Waiting</span>;
    }

    switch (status) {
      case 'COMPLIANT':
        return (
          <span className="val-tag val-tag--compliant">
            <Check className="w-3 h-3 text-[#137333] stroke-[2.5]" />
            <span>Compliant</span>
          </span>
        );
      case 'NON_COMPLIANT':
        return (
          <span className="val-tag val-tag--noncompliant">
            <XIcon className="w-3 h-3 text-[#C5221F] stroke-[2.5]" />
            <span>Non-compliant</span>
          </span>
        );
      case 'REVIEW':
        return (
          <span className="val-tag val-tag--review">
            <HelpCircle className="w-3 h-3 text-[#B06000] stroke-[2.5]" />
            <span>Review</span>
          </span>
        );
      case 'NOT_APPLICABLE':
      default:
        return (
          <span className="val-tag val-tag--na">
            <Minus className="w-3 h-3 text-[#5F6368] stroke-[2.5]" />
            <span>Not Applicable</span>
          </span>
        );
    }
  };

  return (
    <div className="val-page-root">
      {/* ── Top Summary Header ─────────────────────────────── */}
      <div className="val-header-block">
        <div className="flex items-center gap-2">
          {isEvaluationComplete ? (
            isOverallCompliant ? (
              <div className="val-status-pill val-status-pill--compliant">
                <Check className="w-3.5 h-3.5 text-[#137333] stroke-[2.5]" />
                <span>All evaluated declarations compliant</span>
              </div>
            ) : (
              <div className="val-status-pill val-status-pill--noncompliant">
                <AlertTriangle className="w-3.5 h-3.5 text-[#C5221F] stroke-[2.5]" />
                <span>{nonCompliantCount} findings require attention</span>
              </div>
            )
          ) : (
            <div className="val-status-pill val-status-pill--evaluating">
              <span className="val-pulse-dot" />
              <span>Evaluating package declarations ({evaluatedIndex}/{totalChecks})...</span>
            </div>
          )}
          <span className="text-[12px] text-[#5F6368] ml-auto font-mono">
            GTIN: {currentProduct.gtin}
          </span>
        </div>

        <h1 className="val-page-title">Package validation</h1>
        <p className="val-page-sub">
          Comprehensive compliance evaluation against Legal Metrology (Packaged Commodities) Rules, 2011.
        </p>

        {/* Product Identity & Meta Bar */}
        <div className="val-product-meta-row">
          <span className="font-semibold text-[#202124]">{currentProduct.product}</span>
          <span className="val-meta-dot">•</span>
          <span className="text-[#5F6368]">{currentProduct.packSize}</span>
          <span className="val-meta-dot">•</span>
          <span className="text-[#5F6368]">ID: {currentProduct.id}</span>
        </div>

        {/* Dynamic Multi-Status Metrics Bar (Derived from validationResults) */}
        <div className="val-metrics-summary-bar">
          <div className="val-metric-chip val-metric-chip--total">
            <span className="val-metric-num">{evaluatedIndex}</span>
            <span className="val-metric-label">Checks</span>
          </div>
          <div className="val-metric-chip val-metric-chip--compliant">
            <span className="val-metric-num">{compliantCount}</span>
            <span className="val-metric-label">Compliant</span>
          </div>
          <div className="val-metric-chip val-metric-chip--noncompliant">
            <span className="val-metric-num">{nonCompliantCount}</span>
            <span className="val-metric-label">Non-compliant</span>
          </div>
          {reviewCount > 0 && (
            <div className="val-metric-chip val-metric-chip--review">
              <span className="val-metric-num">{reviewCount}</span>
              <span className="val-metric-label">Review</span>
            </div>
          )}
          <div className="val-metric-chip val-metric-chip--na">
            <span className="val-metric-num">{naCount}</span>
            <span className="val-metric-label">N/A</span>
          </div>
        </div>

        {/* Continuous Progress Track */}
        <div className="val-progress-bar-wrap">
          <div
            className="val-progress-bar-fill"
            style={{ width: `${(evaluatedIndex / totalChecks) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Main Two-Column Layout (Desktop) / Vertical (Mobile) ── */}
      <div className="val-layout-grid">
        {/* LEFT COLUMN: 15-Point Declaration Checks Checklist */}
        <div className="val-left-col">
          <div className="val-section-title-row">
            <FileCheck className="w-4 h-4 text-[#1A73E8]" />
            <h2 className="val-section-heading">Package Declaration Checklist</h2>
            <span className="text-[11.5px] text-[#5F6368] ml-auto">
              PCR 2011 Rules 6, 7, 9, 10
            </span>
          </div>

          {/* Quick Filter Bar */}
          <div className="val-filter-scroll-row">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-[#5F6368] font-semibold flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3 text-[#5F6368]" /> Filter:
              </span>
              <button
                type="button"
                className={`val-filter-pill ${selectedStatusFilter === 'all' && selectedCategoryFilter === 'all' ? 'val-filter-pill--active' : ''}`}
                onClick={() => {
                  setSelectedStatusFilter('all');
                  setSelectedCategoryFilter('all');
                }}
              >
                All ({totalChecks})
              </button>
              <button
                type="button"
                className={`val-filter-pill ${selectedStatusFilter === 'COMPLIANT' ? 'val-filter-pill--active' : ''}`}
                onClick={() => setSelectedStatusFilter('COMPLIANT')}
              >
                ✓ Compliant ({compliantCount})
              </button>
              {nonCompliantCount > 0 && (
                <button
                  type="button"
                  className={`val-filter-pill val-filter-pill--alert ${selectedStatusFilter === 'NON_COMPLIANT' ? 'val-filter-pill--active-alert' : ''}`}
                  onClick={() => setSelectedStatusFilter('NON_COMPLIANT')}
                >
                  ✕ Non-compliant ({nonCompliantCount})
                </button>
              )}
              {reviewCount > 0 && (
                <button
                  type="button"
                  className={`val-filter-pill val-filter-pill--warn ${selectedStatusFilter === 'REVIEW' ? 'val-filter-pill--active-warn' : ''}`}
                  onClick={() => setSelectedStatusFilter('REVIEW')}
                >
                  ⚠ Review ({reviewCount})
                </button>
              )}
              <button
                type="button"
                className={`val-filter-pill ${selectedStatusFilter === 'NOT_APPLICABLE' ? 'val-filter-pill--active' : ''}`}
                onClick={() => setSelectedStatusFilter('NOT_APPLICABLE')}
              >
                — N/A ({naCount})
              </button>
            </div>
          </div>

          {/* Declaration Checks Card List */}
          <div className="val-rule-list">
            {filteredChecks.map((chk: ValidationFinding) => {
              const actualGlobalIdx = validationResults.findIndex((item) => item.fieldId === chk.fieldId);
              const isEvaluated = actualGlobalIdx < evaluatedIndex;
              const isCurrentlyChecking = actualGlobalIdx === evaluatedIndex;

              return (
                <div
                  key={chk.fieldId}
                  className={`val-rule-card ${
                    isEvaluated
                      ? chk.status === 'COMPLIANT'
                        ? 'val-rule-card--compliant'
                        : chk.status === 'NON_COMPLIANT'
                        ? 'val-rule-card--noncompliant'
                        : chk.status === 'REVIEW'
                        ? 'val-rule-card--review'
                        : 'val-rule-card--na'
                      : isCurrentlyChecking
                      ? 'val-rule-card--checking'
                      : 'val-rule-card--pending'
                  }`}
                >
                  {/* Rule Header */}
                  <div className="val-rule-header">
                    <div className="val-rule-title-group">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="val-rule-clause">{chk.ruleId}</span>
                        <h3 className="val-rule-name">{chk.ruleTitle}</h3>
                        <span className="val-category-tag">{chk.category}</span>
                      </div>
                      <p className="val-rule-explanation">{chk.plainLanguageExplanation}</p>
                    </div>

                    {/* 4-State Result Badge */}
                    <div className="val-rule-result-badge">
                      {getStatusBadge(chk.status, isEvaluated, isCurrentlyChecking)}
                    </div>
                  </div>

                  {/* Reference vs Observed Comparison Values */}
                  {isEvaluated && (
                    <div className="val-rule-body val-fade-enter">
                      <div className="val-compare-grid">
                        <div className="val-compare-box">
                          <span className="val-compare-label">Reference</span>
                          <span className="val-compare-value val-compare-value--ref">
                            {chk.expected}
                          </span>
                        </div>
                        <div className="val-compare-divider" />
                        <div className="val-compare-box">
                          <span className="val-compare-label">Observed</span>
                          <span
                            className={`val-compare-value ${
                              chk.status === 'COMPLIANT'
                                ? 'val-compare-value--matched'
                                : chk.status === 'NON_COMPLIANT'
                                ? 'val-compare-value--mismatch'
                                : chk.status === 'REVIEW'
                                ? 'val-compare-value--review'
                                : 'val-compare-value--na'
                            }`}
                          >
                            {chk.observed}
                          </span>
                        </div>
                      </div>

                      {/* Finding Note for Non-Compliant or Review */}
                      {chk.findingNote && (
                        <div
                          className={`val-violation-note ${
                            chk.status === 'REVIEW'
                              ? 'val-violation-note--review'
                              : chk.status === 'NOT_APPLICABLE'
                              ? 'val-violation-note--na'
                              : 'val-violation-note--fail'
                          }`}
                        >
                          {chk.status === 'REVIEW' ? (
                            <AlertTriangle className="w-4 h-4 text-[#B06000] flex-shrink-0 mt-0.5" />
                          ) : chk.status === 'NOT_APPLICABLE' ? (
                            <Minus className="w-4 h-4 text-[#5F6368] flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-[#C5221F] flex-shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`text-[12px] leading-snug font-medium ${
                              chk.status === 'REVIEW'
                                ? 'text-[#B06000]'
                                : chk.status === 'NOT_APPLICABLE'
                                ? 'text-[#5F6368]'
                                : 'text-[#C5221F]'
                            }`}
                          >
                            {chk.findingNote}
                          </span>
                        </div>
                      )}

                      {/* Traceable Evidence Button */}
                      {chk.status !== 'NOT_APPLICABLE' && (
                        <div className="val-rule-footer">
                          <button
                            type="button"
                            className="val-evidence-btn"
                            onClick={() => handleRuleEvidenceClick(chk.evidencePanel)}
                          >
                            <ZoomIn className="w-3.5 h-3.5 text-[#1A73E8]" />
                            <span>
                              Evidence: {chk.evidencePanel === 'front' ? 'Front Panel' : 'Back Panel'} · {chk.evidenceHighlightArea}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Evidence Viewport & Calculated Final Decision */}
        <div className="val-right-col">
          <div className="val-evidence-card">
            <div className="val-card-head">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1A73E8]" />
                <span className="val-card-title">Inspection evidence</span>
              </div>
              <span className="text-[11px] text-[#5F6368] font-medium">Photographed Panels</span>
            </div>

            {/* Panel Selector Tabs */}
            <div className="val-tab-row">
              <button
                type="button"
                className={`val-tab-btn ${selectedEvidencePanel === 'front' ? 'val-tab-btn--active' : ''}`}
                onClick={() => setSelectedEvidencePanel('front')}
              >
                01. Front Panel
              </button>
              <button
                type="button"
                className={`val-tab-btn ${selectedEvidencePanel === 'back' ? 'val-tab-btn--active' : ''}`}
                onClick={() => setSelectedEvidencePanel('back')}
              >
                02. Back Panel
              </button>
              {leftImage && (
                <button
                  type="button"
                  className={`val-tab-btn ${selectedEvidencePanel === 'left' ? 'val-tab-btn--active' : ''}`}
                  onClick={() => setSelectedEvidencePanel('left')}
                >
                  03. Left
                </button>
              )}
              {rightImage && (
                <button
                  type="button"
                  className={`val-tab-btn ${selectedEvidencePanel === 'right' ? 'val-tab-btn--active' : ''}`}
                  onClick={() => setSelectedEvidencePanel('right')}
                >
                  04. Right
                </button>
              )}
            </div>

            {/* Real Photographed Canvas with Zoom trigger */}
            <div
              className="val-evidence-canvas"
              onClick={() => {
                const img = getEvidenceImageUrl(selectedEvidencePanel);
                if (img) setZoomedImage(img);
              }}
              title="Click to zoom evidence photo"
            >
              {getEvidenceImageUrl(selectedEvidencePanel) ? (
                <>
                  <img
                    src={getEvidenceImageUrl(selectedEvidencePanel)!}
                    alt={`${selectedEvidencePanel} panel evidence`}
                    className="val-evidence-img"
                  />
                  <div className="val-zoom-overlay">
                    <Maximize2 className="w-4 h-4 text-white" />
                    <span className="text-[11px] text-white font-medium ml-1">Tap to enlarge</span>
                  </div>

                  {/* Contextual inspection highlight banner */}
                  <div className="val-evidence-highlight-pill">
                    <span className="val-highlight-dot" />
                    <span>
                      {selectedEvidencePanel === 'front'
                        ? 'Principal Display Panel · Brand & Net Quantity Verification'
                        : 'Information Panel · Mandatory Declarations & Grievance Contact'}
                    </span>
                  </div>
                </>
              ) : (
                <div className="val-no-img">
                  <Package className="w-8 h-8 text-[#BDC1C6] mb-2" />
                  <span className="text-[12px] text-[#5F6368]">No image captured for this view</span>
                </div>
              )}
            </div>

            <div className="val-evidence-caption">
              <span className="font-semibold text-[#202124] text-[12.5px]">
                {selectedEvidencePanel === 'front'
                  ? 'Principal Display Panel (PDP)'
                  : selectedEvidencePanel === 'back'
                  ? 'Mandatory Information Panel'
                  : 'Side Panel Marking'}
              </span>
              <span className="text-[11.5px] text-[#5F6368] block mt-0.5 leading-normal">
                {selectedEvidencePanel === 'front'
                  ? 'Evidence anchor for brand commodity title, PDP dimensions, and net quantity.'
                  : 'Evidence anchor for MRP, unit sale price, manufacturer premises, batch, font size, and consumer care.'}
              </span>
            </div>
          </div>

          {/* ── Final Inspection Decision Box (Calculated from validationResults) ── */}
          {isEvaluationComplete && (
            <div
              className={`val-decision-card val-fade-enter ${
                isOverallCompliant ? 'val-decision--compliant' : 'val-decision--noncompliant'
              }`}
            >
              <div className="val-decision-header">
                <div className="val-decision-badge">
                  {isOverallCompliant ? (
                    <Check className="w-4 h-4 text-[#137333] stroke-[3]" />
                  ) : (
                    <XIcon className="w-4 h-4 text-[#C5221F] stroke-[3]" />
                  )}
                </div>
                <div>
                  <span className="val-decision-label">Inspection decision</span>
                  <h3 className="val-decision-verdict">
                    {isOverallCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
                  </h3>
                </div>
              </div>

              {/* Dynamic Summary derived from validationResults */}
              <div className="val-decision-metrics-row">
                <span>{totalChecks} checks evaluated</span>
                <span className="val-meta-dot">•</span>
                <span className="text-[#137333] font-semibold">{compliantCount} compliant</span>
                {nonCompliantCount > 0 && (
                  <>
                    <span className="val-meta-dot">•</span>
                    <span className="text-[#C5221F] font-semibold">{nonCompliantCount} non-compliant</span>
                  </>
                )}
                {reviewCount > 0 && (
                  <>
                    <span className="val-meta-dot">•</span>
                    <span className="text-[#B06000] font-semibold">{reviewCount} review</span>
                  </>
                )}
                <span className="val-meta-dot">•</span>
                <span className="text-[#5F6368]">{naCount} N/A</span>
              </div>

              <p className="val-decision-text">
                {isOverallCompliant
                  ? 'All evaluated declarations satisfy the applicable Legal Metrology (Packaged Commodities) Rules, 2011 requirements.'
                  : `${nonCompliantCount} regulatory findings require attention and inspector review.`}
              </p>

              {/* Specific Findings List */}
              <div className="val-decision-findings-list">
                {isOverallCompliant ? (
                  <>
                    <div className="val-finding-item val-finding-item--ok">
                      <Check className="w-3.5 h-3.5 text-[#137333] flex-shrink-0" />
                      <span>Product identity and manufacturer registration details verified</span>
                    </div>
                    <div className="val-finding-item val-finding-item--ok">
                      <Check className="w-3.5 h-3.5 text-[#137333] flex-shrink-0" />
                      <span>Net quantity, MRP, and unit sale price declarations matched</span>
                    </div>
                    <div className="val-finding-item val-finding-item--ok">
                      <Check className="w-3.5 h-3.5 text-[#137333] flex-shrink-0" />
                      <span>Batch identification and packing date prominent</span>
                    </div>
                    <div className="val-finding-item val-finding-item--ok">
                      <Check className="w-3.5 h-3.5 text-[#137333] flex-shrink-0" />
                      <span>Prescribed consumer grievance contact details present</span>
                    </div>
                    <div className="val-finding-item val-finding-item--ok">
                      <Check className="w-3.5 h-3.5 text-[#137333] flex-shrink-0" />
                      <span>Principal Display Panel and font height requirements satisfied</span>
                    </div>
                  </>
                ) : (
                  validationResults
                    .filter((c) => c.status === 'NON_COMPLIANT' || c.status === 'REVIEW')
                    .map((item) => (
                      <div
                        key={item.fieldId}
                        className={`val-finding-item ${
                          item.status === 'REVIEW'
                            ? 'val-finding-item--warn'
                            : 'val-finding-item--fail'
                        }`}
                      >
                        {item.status === 'REVIEW' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-[#B06000] flex-shrink-0 mt-0.5" />
                        ) : (
                          <XIcon className="w-3.5 h-3.5 text-[#C5221F] flex-shrink-0 mt-0.5" />
                        )}
                        <span>
                          <strong>{item.ruleTitle}:</strong> {item.findingNote || 'Requirement violation observed.'}
                        </span>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom Section Divider & Actions ──────────────── */}
      <div className="val-section-divider" />

      <div className="val-footer-actions">
        <div className="val-footer-summary">
          <span className="font-semibold text-[13.5px] text-[#202124]">
            {isEvaluationComplete
              ? isOverallCompliant
                ? 'Package validation passed'
                : 'Validation complete with findings'
              : 'Evaluating package declarations...'}
          </span>
          <span className="text-[12px] text-[#5F6368] block mt-0.5">
            {isEvaluationComplete
              ? 'Results structured and staged for final legal metrology certification.'
              : 'Please wait while regulatory declaration checks are verified.'}
          </span>
        </div>

        <div className="val-action-btns">
          <button
            type="button"
            className="val-btn-primary"
            onClick={onContinueToReport}
            disabled={!isEvaluationComplete}
          >
            <span>Continue to Inspection Report</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="val-btn-secondary"
            onClick={onBackToAnalysis}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Analysis</span>
          </button>
        </div>
      </div>

      {/* ── Modal: High-Resolution Evidence Photo Viewer ── */}
      {zoomedImage && (
        <div
          className="val-modal-backdrop"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="val-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="val-modal-head">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1A73E8]" />
                <span className="font-semibold text-[13.5px] text-[#202124]">
                  Evidence Inspection · {selectedEvidencePanel.toUpperCase()} View
                </span>
              </div>
              <button
                type="button"
                className="val-modal-close-btn"
                onClick={() => setZoomedImage(null)}
                aria-label="Close image viewer"
              >
                <XIcon className="w-5 h-5 text-[#5F6368]" />
              </button>
            </div>
            <div className="val-modal-body">
              <img
                src={zoomedImage}
                alt="Enlarged evidence"
                className="val-modal-img"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
