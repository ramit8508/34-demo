import React from 'react';
import { ArrowLeft, CheckCircle2, Building2, Tag } from 'lucide-react';
import { STORED_DEMO_PRODUCT, type ProductRecord } from '../../data/productData';

interface PackageAnalysisReadyProps {
  product?: ProductRecord | null;
  frontImage: string | null;
  backImage: string | null;
  leftImage: string | null;
  rightImage: string | null;
  onBackToCapture: () => void;
  onReturnToDashboard: () => void;
}

export const PackageAnalysisReady: React.FC<PackageAnalysisReadyProps> = ({
  product = STORED_DEMO_PRODUCT,
  frontImage,
  backImage,
  leftImage,
  rightImage,
  onBackToCapture,
  onReturnToDashboard,
}) => {
  const currentProduct = product || STORED_DEMO_PRODUCT;
  const totalCaptured = [frontImage, backImage, leftImage, rightImage].filter(Boolean).length;

  return (
    <div className="new-insp-analysis-ready-pane">
      {/* Header */}
      <div className="new-insp-analysis-header">
        <h2 className="new-insp-analysis-title">Package analysis</h2>
        <p className="new-insp-analysis-sub">
          Observed package photographs staged for declaration extraction and legal compliance review.
        </p>
      </div>

      {/* Observed Status Pill */}
      <div className="new-insp-status-banner">
        <div className="new-insp-status-title-row">
          <CheckCircle2 className="w-5 h-5 text-[#1E8E3E]" />
          <span>{totalCaptured} of 4 package views ready for analysis</span>
        </div>
        <p className="new-insp-status-disclaimer">
          Observed physical package photographs attached to inspection session <strong>{currentProduct.id}</strong>.
        </p>
      </div>

      {/* Captured Evidence 4-View Grid */}
      <div className="new-insp-evidence-grid">
        {/* Front */}
        <div className="new-insp-evidence-card">
          <div className="new-insp-evidence-tag">01. Front Panel (PDP)</div>
          <div className="new-insp-evidence-frame">
            {frontImage ? (
              <img src={frontImage} alt="Front panel" className="new-insp-evidence-img" />
            ) : (
              <div className="text-[12px] text-[#5F6368]">No image</div>
            )}
          </div>
          <span className="new-insp-evidence-caption">Principal Display Panel</span>
        </div>

        {/* Back */}
        <div className="new-insp-evidence-card">
          <div className="new-insp-evidence-tag">02. Back Panel (Info)</div>
          <div className="new-insp-evidence-frame">
            {backImage ? (
              <img src={backImage} alt="Back panel" className="new-insp-evidence-img" />
            ) : (
              <div className="text-[12px] text-[#5F6368]">No image</div>
            )}
          </div>
          <span className="new-insp-evidence-caption">Declarations & MRP Panel</span>
        </div>

        {/* Left Side */}
        <div className="new-insp-evidence-card">
          <div className="new-insp-evidence-tag">03. Left Side</div>
          <div className="new-insp-evidence-frame">
            {leftImage ? (
              <img src={leftImage} alt="Left side" className="new-insp-evidence-img" />
            ) : (
              <div className="text-[12px] text-[#80868B] italic">Not captured (Optional)</div>
            )}
          </div>
          <span className="new-insp-evidence-caption">Side Markings / Panel</span>
        </div>

        {/* Right Side */}
        <div className="new-insp-evidence-card">
          <div className="new-insp-evidence-tag">04. Right Side</div>
          <div className="new-insp-evidence-frame">
            {rightImage ? (
              <img src={rightImage} alt="Right side" className="new-insp-evidence-img" />
            ) : (
              <div className="text-[12px] text-[#80868B] italic">Not captured (Optional)</div>
            )}
          </div>
          <span className="new-insp-evidence-caption">Side Markings / Panel</span>
        </div>
      </div>

      {/* Reference Commodity Record */}
      <div className="new-insp-reference-card">
        <div className="new-insp-ref-header">
          <span className="new-insp-ref-kicker">Catalog Commodity Details</span>
          <h3 className="new-insp-ref-title">{currentProduct.product}</h3>
        </div>
        <div className="new-insp-ref-grid">
          <div className="new-insp-grid-item">
            <Tag className="w-4 h-4 text-[#5F6368]" />
            <div>
              <span className="new-insp-grid-label">Brand</span>
              <span className="new-insp-grid-val">{currentProduct.brand}</span>
            </div>
          </div>
          <div className="new-insp-grid-item">
            <Building2 className="w-4 h-4 text-[#5F6368]" />
            <div>
              <span className="new-insp-grid-label">Manufacturer</span>
              <span className="new-insp-grid-val">{currentProduct.manufacturer}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="new-insp-actions-stack pt-2">
        <button
          type="button"
          className="new-insp-btn-primary"
          onClick={onReturnToDashboard}
        >
          <span>Finish · Return to Dashboard</span>
        </button>

        <button
          type="button"
          className="new-insp-btn-secondary"
          onClick={onBackToCapture}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Package Capture</span>
        </button>
      </div>
    </div>
  );
};
