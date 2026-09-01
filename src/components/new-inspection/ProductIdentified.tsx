import React from 'react';
import { Check, ArrowRight, RefreshCw } from 'lucide-react';
import { STORED_DEMO_PRODUCT, type ProductRecord } from '../../data/productData';

interface ProductIdentifiedProps {
  product?: ProductRecord | null;
  onContinue: () => void;
  onRescan: () => void;
}

export const ProductIdentified: React.FC<ProductIdentifiedProps> = ({
  product = STORED_DEMO_PRODUCT,
  onContinue,
  onRescan,
}) => {
  const currentProduct = product || STORED_DEMO_PRODUCT;

  return (
    <div className="id-page-root">
      {/* ── Status Confirmation ───────────────────────────── */}
      <div className="id-status-line">
        <div className="id-status-badge">
          <Check className="w-3.5 h-3.5 text-[#1E8E3E] stroke-[2.5]" />
        </div>
        <span className="id-status-text">Product identified</span>
      </div>

      {/* ── Editorial Workspace: 2-Col Desktop / Vertical Mobile ── */}
      <div className="id-layout-columns">
        {/* Left Column: Product Identity Hero */}
        <div className="id-col-hero">
          <h1 className="id-product-name">{currentProduct.product}</h1>
          <div className="id-product-descriptor">
            <span className="font-semibold text-[#202124]">{currentProduct.packSize}</span>
            <span className="id-bullet-sep">·</span>
            <span>{currentProduct.category}</span>
            <span className="id-bullet-sep">·</span>
            <span>{currentProduct.type}</span>
          </div>

          <div className="id-gtin-row">
            <span className="id-gtin-label">GTIN</span>
            <span className="id-gtin-val font-mono">{currentProduct.gtin}</span>
          </div>
        </div>

        {/* Right Column: Reference Information List */}
        <div className="id-col-reference">
          <div className="id-section-header">
            <h2 className="id-section-title">Reference information</h2>
            <p className="id-section-caption">
              Catalog baseline used for physical compliance inspection.
            </p>
          </div>

          <div className="id-data-list">
            <div className="id-data-row">
              <span className="id-row-key">Brand</span>
              <span className="id-row-val">{currentProduct.brand}</span>
            </div>

            <div className="id-data-row">
              <span className="id-row-key">Manufacturer</span>
              <span className="id-row-val">{currentProduct.manufacturer}</span>
            </div>

            <div className="id-data-row">
              <span className="id-row-key">Standard net quantity</span>
              <span className="id-row-val">{currentProduct.netQuantity}</span>
            </div>

            <div className="id-data-row">
              <span className="id-row-key">Standard MRP</span>
              <span className="id-row-val font-semibold text-[#202124]">{currentProduct.mrp}</span>
            </div>

            <div className="id-data-row id-data-row--last">
              <span className="id-row-key">Barcode / GTIN</span>
              <span className="id-row-val font-mono">{currentProduct.gtin}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section Divider ───────────────────────────────── */}
      <div className="id-section-divider" />

      {/* ── Next Step Section & Actions ───────────────────── */}
      <div className="id-next-step-section">
        <div className="id-next-step-content">
          <span className="id-next-step-kicker">Next step</span>
          <p className="id-next-step-lead">
            Capture the physical package to verify printed declarations against the reference baseline.
          </p>

          <div className="id-checklist-wrap">
            <span className="id-check-item">• MRP & standard unit price</span>
            <span className="id-check-item">• Net quantity declarations</span>
            <span className="id-check-item">• Manufacturer / packer details</span>
            <span className="id-check-item">• Consumer care & redressal info</span>
            <span className="id-check-item">• Date markings & batch codes</span>
          </div>
        </div>

        <div className="id-actions-bar">
          <button
            type="button"
            className="id-btn-primary"
            onClick={onContinue}
          >
            <span>Continue to Package Capture</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="id-btn-rescan"
            onClick={onRescan}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Rescan product</span>
          </button>
        </div>
      </div>
    </div>
  );
};
