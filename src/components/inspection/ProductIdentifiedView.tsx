import React from 'react';
import { CheckCircle2, ArrowRight, RefreshCw, AlertCircle, Building2, Package, Tag, Barcode, Shield } from 'lucide-react';

interface ProductIdentifiedViewProps {
  onContinue: () => void;
  onRescan: () => void;
}

export const ProductIdentifiedView: React.FC<ProductIdentifiedViewProps> = ({
  onContinue,
  onRescan,
}) => {
  return (
    <div className="product-identified-container">
      {/* Confirmation Badge Card */}
      <div className="identified-status-card">
        <div className="identified-status-badge">
          <CheckCircle2 className="w-5 h-5 text-[#1E8E3E]" />
          <span>Product identified</span>
        </div>
        <p className="identified-status-note">
          Reference catalog data successfully retrieved. Physical compliance has <strong>not</strong> been evaluated yet.
        </p>
      </div>

      {/* Product Reference Information Card */}
      <div className="identified-product-card">
        <div className="identified-product-header">
          <span className="identified-kicker">Packaged Commodity Reference Data</span>
          <h2 className="identified-product-title">Lay's India's Magic Masala</h2>
          <div className="identified-product-tags">
            <span className="identified-pill">50 g</span>
            <span className="identified-pill">Snack Food</span>
            <span className="identified-pill">Solid Commodity</span>
          </div>
        </div>

        <div className="identified-details-grid">
          <div className="identified-detail-item">
            <Tag className="w-4 h-4 text-[#5F6368]" />
            <div>
              <span className="identified-detail-label">Brand</span>
              <span className="identified-detail-val">Lay's</span>
            </div>
          </div>

          <div className="identified-detail-item">
            <Building2 className="w-4 h-4 text-[#5F6368]" />
            <div>
              <span className="identified-detail-label">Manufacturer</span>
              <span className="identified-detail-val">PepsiCo India Holdings Pvt Ltd</span>
            </div>
          </div>

          <div className="identified-detail-item">
            <Package className="w-4 h-4 text-[#5F6368]" />
            <div>
              <span className="identified-detail-label">Standard Net Quantity</span>
              <span className="identified-detail-val">50 g</span>
            </div>
          </div>

          <div className="identified-detail-item">
            <span className="text-[13px] font-bold text-[#5F6368] w-4 text-center">₹</span>
            <div>
              <span className="identified-detail-label">Standard MRP</span>
              <span className="identified-detail-val">₹20.00 (incl. all taxes)</span>
            </div>
          </div>

          <div className="identified-detail-item sm:col-span-2">
            <Barcode className="w-4 h-4 text-[#5F6368]" />
            <div>
              <span className="identified-detail-label">Barcode / GTIN</span>
              <span className="identified-detail-val font-mono">8901491101844</span>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Legal Metrology Protocol Reminder */}
      <div className="identified-protocol-box">
        <div className="flex items-start gap-2.5">
          <Shield className="w-4 h-4 text-[#1A73E8] flex-shrink-0 mt-0.5" />
          <div className="text-[13px] text-[#3C4043] leading-relaxed">
            <strong>Next Step:</strong> You will photograph the package declarations (Front, Back, MRP/Batch area) to verify Legal Metrology compliance with OCR and rule engines.
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="identified-actions-group">
        <button className="insp-btn-primary" onClick={onContinue}>
          <span>Continue to Package Capture</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button className="insp-btn-secondary" onClick={onRescan}>
          <RefreshCw className="w-4 h-4" />
          <span>Rescan Product</span>
        </button>
      </div>
    </div>
  );
};
