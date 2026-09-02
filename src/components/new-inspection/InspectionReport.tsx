import React, { useState } from 'react';
import {
  Check,
  X as XIcon,
  AlertTriangle,
  Download,
  Printer,
  Home,
  ArrowLeft,
  ShieldCheck,
  ZoomIn,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import {
  STORED_DEMO_PRODUCT,
  getInspectionScenario,
  type ProductRecord,
} from '../../data/productData';
import { getPackageEvidenceImage } from '../../data/packageVisualEvidence';
import { loadSession } from '../../auth/authStore';
import { exportInspectionReportToPDF } from '../../services/pdfReportGenerator';

interface InspectionReportProps {
  product?: ProductRecord | null;
  frontImage: string | null;
  backImage: string | null;
  leftImage: string | null;
  rightImage: string | null;
  onBackToValidation: () => void;
  onDoneToDashboard: () => void;
}

export const InspectionReport: React.FC<InspectionReportProps> = ({
  product = STORED_DEMO_PRODUCT,
  frontImage,
  backImage,
  leftImage,
  rightImage,
  onBackToValidation,
  onDoneToDashboard,
}) => {
  const currentProduct = product || STORED_DEMO_PRODUCT;
  const scenario = getInspectionScenario(currentProduct);
  const { referenceData, validationResults } = scenario;

  // Active Inspector Identity
  const sessionUser = loadSession();
  const inspectorName = sessionUser?.name || 'Rahul Sharma';
  const inspectorRole = sessionUser?.role || 'Inspector';

  // Deterministic Inspection ID & Timestamp
  const isFreshBite =
    currentProduct.id === 'INSP-002' ||
    currentProduct.gtin === '8901234567890' ||
    currentProduct.product.toLowerCase().includes('freshbite');

  const inspectionId = isFreshBite ? 'MG-2026-0089' : 'MG-2026-0042';
  const inspectionDateFormatted = '02 Sep 2026, 09:30 AM IST';
  const reportGeneratedAt = '02 Sep 2026, 09:35 AM IST';

  // Dynamic Metrics derived from validationResults
  const totalChecks = validationResults.length;
  const compliantList = validationResults.filter((r) => r.status === 'COMPLIANT');
  const violationList = validationResults.filter((r) => r.status === 'NON_COMPLIANT');
  const reviewList = validationResults.filter((r) => r.status === 'REVIEW');
  const naList = validationResults.filter((r) => r.status === 'NOT_APPLICABLE');

  const isCompliant = violationList.length === 0 && reviewList.length === 0;
  const overallStatus: 'COMPLIANT' | 'NON-COMPLIANT' | 'REQUIRES REVIEW' = isCompliant
    ? 'COMPLIANT'
    : violationList.length > 0
    ? 'NON-COMPLIANT'
    : 'REQUIRES REVIEW';

  // State
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string } | null>(null);
  const [expandedRuleId, setExpandedRuleId] = useState<string | null>(null);

  // Inspector interactive remarks & follow-up action
  const [inspectorRemarks, setInspectorRemarks] = useState(
    isCompliant
      ? 'Package declarations and physical display dimensions comply in full with Legal Metrology (Packaged Commodities) Rules, 2011. Product is cleared for retail circulation.'
      : 'Identified 4 non-compliant declaration violations: (1) Net quantity shortfall of 20g on front display, (2) Mandatory Unit Sale Price missing, (3) Consumer care details omitted, (4) Statutory declaration numeral font height of 1.0mm is below prescribed 1.5mm threshold. Notice for rectification recommended.'
  );

  const [followUpAction, setFollowUpAction] = useState(
    isCompliant
      ? 'Product Cleared for Market Distribution'
      : 'Issue Notice for Rectification under Rule 32 / PCR 2011'
  );

  const reportContainerId = 'metriguard-inspection-report-document';

  // Export PDF Handler
  const handleExportPDF = async () => {
    try {
      setIsExportingPDF(true);
      setPdfSuccessMessage(null);
      const generatedFilename = await exportInspectionReportToPDF({
        reportElementId: reportContainerId,
        product: currentProduct,
        scenario,
        inspector: { name: inspectorName, email: 'inspector@metrigard.demo', role: 'Inspector' },
        inspectionId,
        inspectionTimestamp: inspectionDateFormatted,
        inspectorRemarks,
        followUpAction,
        frontImage,
        backImage,
      });
      setPdfSuccessMessage(`Exported ${generatedFilename}`);
      setTimeout(() => setPdfSuccessMessage(null), 5000);
    } catch (err) {
      console.error('PDF Export failed:', err);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getPanelImage = (panel: 'front' | 'back' | 'left' | 'right') => {
    return getPackageEvidenceImage(
      currentProduct.id,
      panel,
      frontImage,
      backImage,
      leftImage,
      rightImage
    );
  };

  const toggleRuleAccordion = (ruleId: string) => {
    setExpandedRuleId((prev) => (prev === ruleId ? null : ruleId));
  };

  return (
    <div className="rep-root">
      {/* ── Top Utility Action Bar (Sticky on web, hidden on print) ── */}
      <div className="rep-action-bar no-pdf-export">
        <div className="rep-action-left">
          <button
            type="button"
            className="rep-btn-back"
            onClick={onBackToValidation}
            title="Back to Step 04 Validation"
          >
            <ArrowLeft className="w-4 h-4 text-[#374151]" />
            <span className="text-[13px] font-medium text-[#374151]">Back to Validation</span>
          </button>
          <span className="rep-id-pill">
            <span className="font-mono font-bold text-[#1A73E8]">{inspectionId}</span>
          </span>
        </div>

        <div className="rep-action-right">
          <button
            type="button"
            className="rep-btn-secondary"
            onClick={handlePrint}
            title="Print report"
          >
            <Printer className="w-4 h-4 text-[#4B5563]" />
            <span className="hidden sm:inline">Print</span>
          </button>

          <button
            type="button"
            className="rep-btn-primary"
            onClick={handleExportPDF}
            disabled={isExportingPDF}
            title="Export official PDF"
          >
            <Download className={`w-4 h-4 ${isExportingPDF ? 'animate-bounce' : ''}`} />
            <span>{isExportingPDF ? 'Generating...' : 'Export PDF'}</span>
          </button>

          <button
            type="button"
            className="rep-btn-done"
            onClick={onDoneToDashboard}
            title="Done & Return to Dashboard"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Done</span>
          </button>
        </div>
      </div>

      {pdfSuccessMessage && (
        <div className="rep-toast no-pdf-export">
          <CheckCircle2 className="w-4 h-4 text-[#15803D] flex-shrink-0" />
          <span>{pdfSuccessMessage}</span>
        </div>
      )}

      {/* ── Main Printable Official Document Sheet ─────────── */}
      <article id={reportContainerId} className="rep-sheet">
        {/* ====================================================
            01. REPORT HEADER
            ==================================================== */}
        <header className="rep-header">
          <div className="rep-header-main">
            <div className="rep-header-branding">
              <div className="rep-logo-mark">
                <ShieldCheck className="w-6 h-6 text-[#1A73E8]" />
              </div>
              <div>
                <span className="rep-org-title">MetriGuard</span>
                <span className="rep-doc-subtitle">Legal Metrology Inspection Report</span>
              </div>
            </div>

            <div className="rep-header-meta">
              <span>
                <strong>Inspection ID:</strong> {inspectionId}
              </span>
              <span className="rep-meta-dot">•</span>
              <span>
                <strong>Date:</strong> {inspectionDateFormatted}
              </span>
              <span className="rep-meta-dot">•</span>
              <span>
                <strong>Inspector:</strong> {inspectorName}
              </span>
            </div>
          </div>
        </header>

        {/* ====================================================
            02. FINAL COMPLIANCE DECISION (HERO)
            ==================================================== */}
        <section
          className={`rep-hero-decision ${
            overallStatus === 'COMPLIANT'
              ? 'rep-hero--compliant'
              : overallStatus === 'NON-COMPLIANT'
              ? 'rep-hero--noncompliant'
              : 'rep-hero--review'
          }`}
        >
          <div className="rep-hero-icon-slot">
            {overallStatus === 'COMPLIANT' ? (
              <Check className="w-6 h-6 stroke-[3]" />
            ) : (
              <XIcon className="w-6 h-6 stroke-[3]" />
            )}
          </div>

          <div className="rep-hero-text">
            <div className="rep-hero-kicker">FINAL COMPLIANCE DETERMINATION</div>
            <h1 className="rep-hero-verdict">{overallStatus}</h1>
            <p className="rep-hero-caption">
              {isCompliant
                ? 'All 15 statutory declarations and principal display dimensions satisfy the Legal Metrology (Packaged Commodities) Rules, 2011.'
                : `${violationList.length} regulatory violations identified requiring inspector review and follow-up rectification.`}
            </p>
          </div>
        </section>

        {/* ====================================================
            03. KEY SUMMARY METRICS ROW
            ==================================================== */}
        <section className="rep-metrics-strip">
          <div className="rep-metric-item">
            <span className="rep-metric-val font-mono">{totalChecks}</span>
            <span className="rep-metric-lbl">Checks Evaluated</span>
          </div>
          <div className="rep-metric-divider" />
          <div className="rep-metric-item">
            <span className="rep-metric-val rep-metric-val--pass font-mono">
              {compliantList.length}
            </span>
            <span className="rep-metric-lbl">Compliant</span>
          </div>
          <div className="rep-metric-divider" />
          <div className="rep-metric-item">
            <span
              className={`rep-metric-val font-mono ${
                violationList.length > 0 ? 'rep-metric-val--fail' : 'text-[#6B7280]'
              }`}
            >
              {violationList.length}
            </span>
            <span className="rep-metric-lbl">Violations</span>
          </div>
          <div className="rep-metric-divider" />
          <div className="rep-metric-item">
            <span
              className={`rep-metric-val font-mono ${
                reviewList.length > 0 ? 'rep-metric-val--warn' : 'text-[#6B7280]'
              }`}
            >
              {reviewList.length}
            </span>
            <span className="rep-metric-lbl">Review</span>
          </div>
          <div className="rep-metric-divider" />
          <div className="rep-metric-item">
            <span className="rep-metric-val text-[#6B7280] font-mono">{naList.length}</span>
            <span className="rep-metric-lbl">N/A</span>
          </div>
        </section>

        {/* ====================================================
            04. FINDINGS REQUIRING ATTENTION (FOR NON-COMPLIANT)
            ==================================================== */}
        {violationList.length > 0 && (
          <section className="rep-section rep-section--alert">
            <div className="rep-section-header">
              <h2 className="rep-section-title text-[#991B1B]">
                Findings Requiring Attention ({violationList.length} Violations)
              </h2>
              <p className="rep-section-desc">
                Statutory non-compliances identified with physical packaging evidence and legal rule
                references.
              </p>
            </div>

            <div className="rep-findings-list">
              {violationList.map((v, idx) => {
                const violationNum = String(idx + 1).padStart(2, '0');
                const isQty = v.fieldId === 'netQuantity';
                const isFont = v.fieldId === 'declarationFontSize';
                const isUsp = v.fieldId === 'unitSalePrice';
                const isCare = v.fieldId === 'consumerCare';

                return (
                  <div key={v.fieldId} className="rep-finding-card">
                    {/* Finding Title & Meta */}
                    <div className="rep-finding-top">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="rep-finding-index">{violationNum}</span>
                        <h3 className="rep-finding-name">{v.ruleTitle}</h3>
                        <span className="rep-badge-noncompliant">NON-COMPLIANT</span>
                      </div>
                      <span className="rep-finding-rule-code">{v.ruleId}</span>
                    </div>

                    {/* Finding Content Grid: Data Left, Large Evidence Right */}
                    <div className="rep-finding-grid">
                      {/* Left: Values & Legal Rule Explanation */}
                      <div className="rep-finding-data">
                        {/* Comparison Values */}
                        <div className="rep-comparison-block">
                          <div className="rep-comp-col">
                            <span className="rep-comp-lbl">Expected / Standard</span>
                            <span className="rep-comp-val rep-comp-val--ref">{v.expected}</span>
                          </div>
                          <div className="rep-comp-arrow">→</div>
                          <div className="rep-comp-col">
                            <span className="rep-comp-lbl">Observed on Package</span>
                            <span className="rep-comp-val rep-comp-val--observed">
                              {v.observed}
                            </span>
                          </div>
                        </div>

                        {/* Deficit / Discrepancy Highlight */}
                        {isQty && (
                          <div className="rep-highlight-callout">
                            <span className="font-semibold text-[#991B1B]">
                              Deficit Discrepancy:
                            </span>{' '}
                            20 g shortage (10.0% deficit below 200 g reference catalog standard).
                          </div>
                        )}
                        {isFont && (
                          <div className="rep-highlight-callout">
                            <span className="font-semibold text-[#991B1B]">
                              Measurement Shortfall:
                            </span>{' '}
                            0.5 mm below prescribed minimum (Observed: 1.0 mm, Required: ≥ 1.5 mm).
                          </div>
                        )}
                        {isUsp && (
                          <div className="rep-highlight-callout">
                            <span className="font-semibold text-[#991B1B]">Statutory Omission:</span>{' '}
                            Unit Sale Price (USP) required under Rule 6(1)(s) for packages &gt; 100g
                            was omitted.
                          </div>
                        )}
                        {isCare && (
                          <div className="rep-highlight-callout">
                            <span className="font-semibold text-[#991B1B]">Statutory Omission:</span>{' '}
                            Mandatory consumer grievance contact telephone, email and address were
                            not detected.
                          </div>
                        )}

                        {/* Legal Requirement */}
                        <div className="rep-legal-clause-box">
                          <span className="rep-legal-clause-lbl">Requirement ({v.ruleId})</span>
                          <p className="rep-legal-clause-text">{v.plainLanguageExplanation}</p>
                        </div>
                      </div>

                      {/* Right: Large Physical Image Evidence with Precise Bounding Box */}
                      <div className="rep-finding-evidence">
                        <div className="rep-evidence-container">
                          <div className="rep-evidence-banner">
                            <span>
                              Evidence: {v.evidencePanel === 'front' ? 'Front Panel' : 'Back Panel'}{' '}
                              · {v.evidenceHighlightArea}
                            </span>
                          </div>

                          <div
                            className="rep-evidence-img-wrap"
                            onClick={() =>
                              setZoomedImage({
                                src: getPanelImage(v.evidencePanel),
                                title: `Violation Evidence: ${v.ruleTitle}`,
                              })
                            }
                            title="Click to enlarge evidence"
                          >
                            <img
                              src={getPanelImage(v.evidencePanel)}
                              alt={`Evidence for ${v.ruleTitle}`}
                              className="rep-evidence-img"
                            />

                            {/* Bounding box overlays */}
                            {isQty && (
                              <div className="rep-box-overlay rep-box-overlay--qty">
                                <span className="rep-box-tag">180 g (Shortfall)</span>
                              </div>
                            )}
                            {isUsp && (
                              <div className="rep-box-overlay rep-box-overlay--usp">
                                <span className="rep-box-tag">Missing USP Declaration</span>
                              </div>
                            )}
                            {isCare && (
                              <div className="rep-box-overlay rep-box-overlay--care">
                                <span className="rep-box-tag">Missing Consumer Care</span>
                              </div>
                            )}
                            {isFont && (
                              <div className="rep-box-overlay rep-box-overlay--font">
                                <span className="rep-box-tag">1.0 mm (Below 1.5mm req)</span>
                              </div>
                            )}

                            <div className="rep-zoom-tag no-pdf-export">
                              <ZoomIn className="w-3.5 h-3.5" />
                              <span>Enlarge</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ====================================================
            05. PRODUCT IDENTITY & SPECIFICATIONS
            ==================================================== */}
        <section className="rep-section">
          <div className="rep-section-header">
            <h2 className="rep-section-title">Product & Commodity Information</h2>
            <p className="rep-section-desc">
              Registered catalog baseline against which physical packaging was audited.
            </p>
          </div>

          <div className="rep-product-grid">
            <div className="rep-prop-item">
              <span className="rep-prop-label">Product Name</span>
              <span className="rep-prop-value font-semibold text-[#111827]">
                {referenceData.productName}
              </span>
            </div>
            <div className="rep-prop-item">
              <span className="rep-prop-label">Brand</span>
              <span className="rep-prop-value">{referenceData.brand}</span>
            </div>
            <div className="rep-prop-item">
              <span className="rep-prop-label">Barcode / GTIN</span>
              <span className="rep-prop-value font-mono font-medium">{currentProduct.gtin}</span>
            </div>
            <div className="rep-prop-item">
              <span className="rep-prop-label">Commodity Category</span>
              <span className="rep-prop-value">{currentProduct.category}</span>
            </div>
            <div className="rep-prop-item">
              <span className="rep-prop-label">Standard Net Quantity</span>
              <span className="rep-prop-value font-bold text-[#111827]">
                {referenceData.netQuantity}
              </span>
            </div>
            <div className="rep-prop-item">
              <span className="rep-prop-label">Declared MRP</span>
              <span className="rep-prop-value font-bold text-[#111827]">
                {referenceData.mrp}
              </span>
            </div>
            <div className="rep-prop-item rep-prop-item--full">
              <span className="rep-prop-label">Manufacturer / Packer Details</span>
              <span className="rep-prop-value">{referenceData.manufacturer}</span>
            </div>
            <div className="rep-prop-item rep-prop-item--full">
              <span className="rep-prop-label">Complete Registered Address</span>
              <span className="rep-prop-value">{referenceData.manufacturerAddress}</span>
            </div>
            <div className="rep-prop-item">
              <span className="rep-prop-label">Country of Origin</span>
              <span className="rep-prop-value font-medium">{referenceData.countryOfOrigin}</span>
            </div>
            <div className="rep-prop-item">
              <span className="rep-prop-label">Batch / Lot Code</span>
              <span className="rep-prop-value font-mono">{referenceData.batchLot}</span>
            </div>
            <div className="rep-prop-item">
              <span className="rep-prop-label">Date of Packing / Mfd</span>
              <span className="rep-prop-value font-mono">{referenceData.packDate}</span>
            </div>
            <div className="rep-prop-item">
              <span className="rep-prop-label">Standard Unit Sale Price (USP)</span>
              <span className="rep-prop-value">{referenceData.unitSalePrice}</span>
            </div>
            <div className="rep-prop-item rep-prop-item--full">
              <span className="rep-prop-label">Consumer Care & Grievance</span>
              <span className="rep-prop-value">{referenceData.consumerCare}</span>
            </div>
            <div className="rep-prop-item rep-prop-item--full">
              <span className="rep-prop-label">Statutory Marks & FSSAI</span>
              <span className="rep-prop-value">{referenceData.statutoryMarkings}</span>
            </div>
          </div>
        </section>

        {/* ====================================================
            06. PHYSICAL PACKAGE EVIDENCE GALLERY
            ==================================================== */}
        <section className="rep-section">
          <div className="rep-section-header">
            <h2 className="rep-section-title">Physical Package Photographs</h2>
            <p className="rep-section-desc">
              High-resolution photographs of physical package panels recorded during inspection.
            </p>
          </div>

          <div className="rep-gallery-grid">
            {/* Front Panel (Large) */}
            <div className="rep-gallery-card">
              <div className="rep-gallery-head">
                <span className="rep-gallery-name">01. Front Panel</span>
                <span className="rep-gallery-type">Principal Display Panel (PDP)</span>
              </div>
              <div
                className="rep-gallery-frame"
                onClick={() =>
                  setZoomedImage({
                    src: getPanelImage('front'),
                    title: 'Front Panel (Principal Display Panel)',
                  })
                }
              >
                <img
                  src={getPanelImage('front')}
                  alt="Front package panel"
                  className="rep-gallery-img"
                />
                <div className="rep-zoom-tag no-pdf-export">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Enlarge</span>
                </div>
              </div>
              <div className="rep-gallery-caption">
                Primary commodity identity, brand marking and net quantity declaration.
              </div>
            </div>

            {/* Back Panel (Large) */}
            <div className="rep-gallery-card">
              <div className="rep-gallery-head">
                <span className="rep-gallery-name">02. Back Panel</span>
                <span className="rep-gallery-type">Mandatory Information Panel</span>
              </div>
              <div
                className="rep-gallery-frame"
                onClick={() =>
                  setZoomedImage({
                    src: getPanelImage('back'),
                    title: 'Back Panel (Mandatory Information Panel)',
                  })
                }
              >
                <img
                  src={getPanelImage('back')}
                  alt="Back package panel"
                  className="rep-gallery-img"
                />
                <div className="rep-zoom-tag no-pdf-export">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Enlarge</span>
                </div>
              </div>
              <div className="rep-gallery-caption">
                Mandatory declarations: MRP, unit sale price, date, batch, font height, and consumer
                care.
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
            07. REGULATORY DECLARATION AUDIT TABLE
            ==================================================== */}
        <section className="rep-section">
          <div className="rep-section-header">
            <h2 className="rep-section-title">Declaration Compliance Audit</h2>
            <p className="rep-section-desc">
              Line-by-line verification of all statutory declarations against PCR, 2011.
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="rep-table-wrap hidden sm:block">
            <table className="rep-table">
              <thead>
                <tr>
                  <th style={{ width: '26%' }}>Declaration</th>
                  <th style={{ width: '22%' }}>Reference</th>
                  <th style={{ width: '24%' }}>Observed</th>
                  <th style={{ width: '14%' }}>Result</th>
                  <th style={{ width: '14%' }}>Rule</th>
                </tr>
              </thead>
              <tbody>
                {validationResults.map((item) => (
                  <tr
                    key={item.fieldId}
                    className={
                      item.status === 'NON_COMPLIANT'
                        ? 'rep-tr--fail'
                        : item.status === 'REVIEW'
                        ? 'rep-tr--warn'
                        : ''
                    }
                  >
                    <td>
                      <span className="font-semibold text-[#111827] block">{item.ruleTitle}</span>
                      <span className="text-[11.5px] text-[#6B7280]">{item.category}</span>
                    </td>
                    <td className="text-[#374151]">{item.expected}</td>
                    <td>
                      <span
                        className={
                          item.status === 'NON_COMPLIANT'
                            ? 'font-bold text-[#DC2626]'
                            : item.status === 'COMPLIANT'
                            ? 'text-[#15803D] font-medium'
                            : 'text-[#111827]'
                        }
                      >
                        {item.observed}
                      </span>
                    </td>
                    <td>
                      {item.status === 'COMPLIANT' && (
                        <span className="rep-status-pill rep-status-pill--pass">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                          <span>Compliant</span>
                        </span>
                      )}
                      {item.status === 'NON_COMPLIANT' && (
                        <span className="rep-status-pill rep-status-pill--fail">
                          <XIcon className="w-3 h-3 stroke-[2.5]" />
                          <span>Violation</span>
                        </span>
                      )}
                      {item.status === 'REVIEW' && (
                        <span className="rep-status-pill rep-status-pill--warn">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Review</span>
                        </span>
                      )}
                      {item.status === 'NOT_APPLICABLE' && (
                        <span className="rep-status-pill rep-status-pill--na">
                          <span>N/A</span>
                        </span>
                      )}
                    </td>
                    <td className="font-mono text-[12px] text-[#4B5563]">{item.ruleId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards View */}
          <div className="rep-mobile-audit-list sm:hidden">
            {validationResults.map((item) => (
              <div
                key={item.fieldId}
                className={`rep-mobile-audit-card ${
                  item.status === 'NON_COMPLIANT'
                    ? 'rep-mobile-card--fail'
                    : item.status === 'REVIEW'
                    ? 'rep-mobile-card--warn'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[14px] text-[#111827]">
                    {item.ruleTitle}
                  </span>
                  <span className="font-mono text-[11px] text-[#6B7280]">{item.ruleId}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[13px] mb-2">
                  <div>
                    <span className="text-[11px] text-[#6B7280] block">Expected</span>
                    <span className="text-[#374151] font-medium">{item.expected}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#6B7280] block">Observed</span>
                    <span
                      className={`font-semibold ${
                        item.status === 'NON_COMPLIANT'
                          ? 'text-[#DC2626]'
                          : item.status === 'COMPLIANT'
                          ? 'text-[#15803D]'
                          : 'text-[#111827]'
                      }`}
                    >
                      {item.observed}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-[11px] text-[#6B7280]">{item.category}</span>
                  {item.status === 'COMPLIANT' && (
                    <span className="rep-status-pill rep-status-pill--pass">✓ Compliant</span>
                  )}
                  {item.status === 'NON_COMPLIANT' && (
                    <span className="rep-status-pill rep-status-pill--fail">✕ Violation</span>
                  )}
                  {item.status === 'REVIEW' && (
                    <span className="rep-status-pill rep-status-pill--warn">⚠ Review</span>
                  )}
                  {item.status === 'NOT_APPLICABLE' && (
                    <span className="rep-status-pill rep-status-pill--na">— N/A</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================
            08. COMPLIANT CHECKS (SUBTLE LIST)
            ==================================================== */}
        <section className="rep-section">
          <div className="rep-section-header">
            <h2 className="rep-section-title">
              Passed Checks ({compliantList.length} Verified)
            </h2>
            <p className="rep-section-desc">
              Declarations that fully satisfy the prescribed legal requirements.
            </p>
          </div>

          <div className="rep-passed-grid">
            {compliantList.map((c) => (
              <div key={c.fieldId} className="rep-passed-item">
                <Check className="w-4 h-4 text-[#15803D] flex-shrink-0 mt-0.5 stroke-[2.5]" />
                <div>
                  <span className="rep-passed-name">{c.ruleTitle}</span>
                  <span className="rep-passed-sub">
                    {c.observed} · <span className="font-mono">{c.ruleId}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================
            09. RULE EVALUATION (PROGRESSIVE DISCLOSURE)
            ==================================================== */}
        <section className="rep-section">
          <div className="rep-section-header">
            <h2 className="rep-section-title">Rule-by-Rule Regulatory Evaluation</h2>
            <p className="rep-section-desc">
              Evaluation catalogue against Legal Metrology (Packaged Commodities) Rules, 2011.
            </p>
          </div>

          <div className="rep-rules-accordion">
            {validationResults.map((r) => {
              const isExpanded = expandedRuleId === r.fieldId;
              const isViolated = r.status === 'NON_COMPLIANT';

              return (
                <div
                  key={r.fieldId}
                  className={`rep-rule-card ${isViolated ? 'rep-rule-card--violated' : ''}`}
                >
                  <div
                    className="rep-rule-card-header"
                    onClick={() => toggleRuleAccordion(r.fieldId)}
                  >
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="rep-rule-code">{r.ruleId}</span>
                      <span className="rep-rule-title">{r.ruleTitle}</span>
                      <span
                        className={`rep-rule-status-tag ${
                          r.status === 'COMPLIANT'
                            ? 'rep-rule-status--pass'
                            : r.status === 'NON_COMPLIANT'
                            ? 'rep-rule-status--fail'
                            : 'rep-rule-status--na'
                        }`}
                      >
                        {r.status === 'COMPLIANT'
                          ? 'Compliant'
                          : r.status === 'NON_COMPLIANT'
                          ? 'Non-Compliant'
                          : 'N/A'}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="rep-rule-toggle-btn no-pdf-export"
                      aria-label="Toggle rule details"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#6B7280]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                      )}
                    </button>
                  </div>

                  {/* Expanded / PDF view details */}
                  <div className={`rep-rule-card-body ${isExpanded ? 'block' : 'hidden'}`}>
                    <div className="rep-rule-detail-grid">
                      <div>
                        <span className="rep-rule-subhead">Statutory Requirement:</span>
                        <p className="rep-rule-text">{r.plainLanguageExplanation}</p>
                      </div>
                      <div>
                        <span className="rep-rule-subhead">Observed Finding:</span>
                        <p
                          className={`rep-rule-text font-medium ${
                            isViolated ? 'text-[#DC2626]' : 'text-[#111827]'
                          }`}
                        >
                          {r.observed} (Evidence: {r.evidencePanel === 'front' ? 'Front' : 'Back'}{' '}
                          Panel · {r.evidenceHighlightArea})
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ====================================================
            10. INSPECTION PIPELINE TRACE & QUALITY
            ==================================================== */}
        <section className="rep-section">
          <div className="rep-section-header">
            <h2 className="rep-section-title">Inspection Pipeline Trace & Quality</h2>
            <p className="rep-section-desc">
              Deterministic verification stages executed by MetriGuard.
            </p>
          </div>

          <div className="rep-pipeline-row">
            <div className="rep-pipe-step">
              <span className="rep-pipe-check">✓</span>
              <span className="rep-pipe-label">Product Identified</span>
            </div>
            <div className="rep-pipe-step">
              <span className="rep-pipe-check">✓</span>
              <span className="rep-pipe-label">Package Captured</span>
            </div>
            <div className="rep-pipe-step">
              <span className="rep-pipe-check">✓</span>
              <span className="rep-pipe-label">Computer Vision</span>
            </div>
            <div className="rep-pipe-step">
              <span className="rep-pipe-check">✓</span>
              <span className="rep-pipe-label">OCR Text Extraction</span>
            </div>
            <div className="rep-pipe-step">
              <span className="rep-pipe-check">✓</span>
              <span className="rep-pipe-label">Declarations Structured</span>
            </div>
            <div className="rep-pipe-step">
              <span className="rep-pipe-check">✓</span>
              <span className="rep-pipe-label">Rule Engine Evaluated</span>
            </div>
          </div>

          {/* Quality Metrics */}
          <div className="rep-quality-strip">
            <div className="rep-quality-stat">
              <span className="rep-quality-key">Views Analyzed:</span>
              <span className="rep-quality-value">2 Panels (Front & Back)</span>
            </div>
            <div className="rep-quality-stat">
              <span className="rep-quality-key">Declaration Coverage:</span>
              <span className="rep-quality-value">15 of 15 Detected (100%)</span>
            </div>
            <div className="rep-quality-stat">
              <span className="rep-quality-key">Evidence Regions:</span>
              <span className="rep-quality-value">4 Regions Localized</span>
            </div>
            <div className="rep-quality-stat">
              <span className="rep-quality-key">Image Contrast & Quality:</span>
              <span className="rep-quality-value">High / Sharp</span>
            </div>
          </div>
        </section>

        {/* ====================================================
            11. INSPECTOR REMARKS & OFFICIAL ENDORSEMENT
            ==================================================== */}
        <section className="rep-section">
          <div className="rep-section-header">
            <h2 className="rep-section-title">Inspector Remarks & Action Determination</h2>
            <p className="rep-section-desc">
              Inspector physical findings, surveillance determination, and digital endorsement.
            </p>
          </div>

          <div className="rep-endorsement-card">
            <div className="rep-form-group">
              <label className="rep-label">Follow-up Action Determination</label>
              <select
                className="rep-select"
                value={followUpAction}
                onChange={(e) => setFollowUpAction(e.target.value)}
              >
                {isCompliant ? (
                  <>
                    <option value="Product Cleared for Market Distribution">
                      ✓ Product Cleared for Market Distribution
                    </option>
                    <option value="Routine Surveillance Completed">
                      ✓ Routine Surveillance Completed
                    </option>
                  </>
                ) : (
                  <>
                    <option value="Issue Notice for Rectification under Rule 32 / PCR 2011">
                      ✕ Issue Notice for Rectification under Rule 32 / PCR 2011
                    </option>
                    <option value="Schedule Physical Re-inspection">
                      ✕ Schedule Physical Re-inspection
                    </option>
                    <option value="Forward Sample for Laboratory Net Weight Testing">
                      ✕ Forward Sample for Laboratory Net Weight Testing
                    </option>
                  </>
                )}
              </select>
            </div>

            <div className="rep-form-group">
              <label className="rep-label">Inspector Remarks</label>
              <textarea
                rows={3}
                className="rep-textarea"
                value={inspectorRemarks}
                onChange={(e) => setInspectorRemarks(e.target.value)}
              />
            </div>

            {/* Official Sign-off Block */}
            <div className="rep-signoff-row">
              <div>
                <span className="rep-sign-label">INSPECTING OFFICER</span>
                <span className="rep-sign-name">{inspectorName}</span>
                <span className="rep-sign-role">{inspectorRole} · Legal Metrology Division</span>
                <span className="rep-sign-id font-mono">Officer ID: LM-OFF-4892</span>
              </div>

              <div className="text-right">
                <span className="rep-sign-label">DIGITAL VERIFICATION</span>
                <div className="rep-sign-badge">
                  <Lock className="w-3.5 h-3.5 text-[#1A73E8]" />
                  <span>METRIGUARD CERTIFIED</span>
                </div>
                <span className="rep-sign-timestamp">{reportGeneratedAt}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
            12. FOOTER & METADATA
            ==================================================== */}
        <footer className="rep-footer">
          <div className="rep-footer-meta">
            <span>
              <strong>MetriGuard Core:</strong> v2.4.1
            </span>
            <span>
              <strong>Rule Catalogue:</strong> PCR-2011 (Rev. 2022)
            </span>
            <span>
              <strong>GTIN:</strong> {currentProduct.gtin}
            </span>
            <span>
              <strong>Record ID:</strong> {inspectionId}
            </span>
          </div>
          <p className="rep-footer-disclaimer">
            This official inspection report was generated by the MetriGuard Legal Metrology
            Assistance System. Observations and measurements represent physical parameters audited
            against prescribed standards under the Legal Metrology Act, 2009.
          </p>
        </footer>
      </article>

      {/* ── High-Res Photo Viewer Modal ─────────────── */}
      {zoomedImage && (
        <div className="rep-modal-backdrop no-pdf-export" onClick={() => setZoomedImage(null)}>
          <div className="rep-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="rep-modal-header">
              <span className="font-semibold text-[14px] text-[#111827]">
                {zoomedImage.title}
              </span>
              <button
                type="button"
                className="rep-modal-close"
                onClick={() => setZoomedImage(null)}
                aria-label="Close image viewer"
              >
                <XIcon className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>
            <div className="rep-modal-body">
              <img src={zoomedImage.src} alt="Evidence photo" className="rep-modal-img" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
