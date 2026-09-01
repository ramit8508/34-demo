import React from 'react';
import { QrCode, Keyboard, Info, Package } from 'lucide-react';

interface ProductIdentificationProps {
  onScanClick: () => void;
  onManualClick: () => void;
}

export const ProductIdentification: React.FC<ProductIdentificationProps> = ({
  onScanClick,
  onManualClick,
}) => {
  return (
    <div className="new-insp-identify-pane">
      {/* Visual Package Card */}
      <div className="new-insp-package-card">
        <div className="new-insp-package-visual">
          <div className="new-insp-package-mock">
            <div className="new-insp-pkg-top">
              <Package className="w-4 h-4 text-[#5F6368]" />
              <span className="new-insp-pkg-tag">Packaged Commodity</span>
            </div>
            <div className="new-insp-pkg-barcode-box">
              <div className="new-insp-barcode-bars">
                <span style={{ width: 2, height: 26 }} />
                <span style={{ width: 3, height: 26 }} />
                <span style={{ width: 1, height: 26 }} />
                <span style={{ width: 4, height: 26 }} />
                <span style={{ width: 2, height: 26 }} />
                <span style={{ width: 1, height: 26 }} />
                <span style={{ width: 3, height: 26 }} />
                <span style={{ width: 2, height: 26 }} />
              </div>
              <span className="new-insp-barcode-caption">Barcode / GTIN / QR</span>
            </div>
          </div>
        </div>

        <div className="new-insp-package-text">
          <h2 className="new-insp-identify-heading">Identify the product</h2>
          <p className="new-insp-identify-sub">
            Scan the barcode or QR code on the package to retrieve product reference information.
          </p>
        </div>
      </div>

      {/* Primary & Secondary Action CTAs */}
      <div className="new-insp-actions-stack">
        <button
          type="button"
          className="new-insp-btn-primary"
          onClick={onScanClick}
        >
          <QrCode className="w-5 h-5" />
          <span>Scan Barcode / QR</span>
        </button>

        <button
          type="button"
          className="new-insp-btn-secondary"
          onClick={onManualClick}
        >
          <Keyboard className="w-4 h-4 text-[#5F6368]" />
          <span>Enter Product Manually</span>
        </button>
      </div>

      {/* Explanatory Context Box */}
      <div className="new-insp-context-box">
        <div className="new-insp-context-icon">
          <Info className="w-4 h-4 text-[#1A73E8]" />
        </div>
        <p className="new-insp-context-msg">
          <strong>Scanning identifies the product.</strong> Package photos are used later to inspect declarations and compliance.
        </p>
      </div>
    </div>
  );
};
