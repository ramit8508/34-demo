import React from 'react';
import { QrCode, Keyboard, Info, PackageCheck, ArrowRight, Shield } from 'lucide-react';

interface ProductIdentifyEntryProps {
  onStartScanner: () => void;
  onStartManual: () => void;
}

export const ProductIdentifyEntry: React.FC<ProductIdentifyEntryProps> = ({
  onStartScanner,
  onStartManual,
}) => {
  return (
    <div className="insp-identify-view">
      {/* Visual Package Motif Card */}
      <div className="insp-package-preview-box">
        <div className="insp-package-graphic">
          <div className="insp-package-box">
            <div className="insp-package-tag">Package</div>
            <div className="insp-package-barcode-sim">
              <div className="insp-barcode-lines">
                <span style={{ width: 2, height: 28 }} />
                <span style={{ width: 3, height: 28 }} />
                <span style={{ width: 1, height: 28 }} />
                <span style={{ width: 4, height: 28 }} />
                <span style={{ width: 2, height: 28 }} />
                <span style={{ width: 1, height: 28 }} />
                <span style={{ width: 3, height: 28 }} />
                <span style={{ width: 2, height: 28 }} />
              </div>
              <span className="text-[10px] font-mono text-[#5F6368] mt-1">EAN-13 / QR Code</span>
            </div>
          </div>
        </div>

        <div className="insp-package-text-block">
          <h2 className="insp-identify-title">Identify the product</h2>
          <p className="insp-identify-desc">
            Scan the barcode or QR code on the package to retrieve product reference information.
          </p>
        </div>
      </div>

      {/* Primary & Secondary Actions */}
      <div className="insp-actions-group">
        <button className="insp-btn-primary" onClick={onStartScanner}>
          <QrCode className="w-5 h-5" />
          <span>Scan Barcode / QR</span>
        </button>

        <button className="insp-btn-secondary" onClick={onStartManual}>
          <Keyboard className="w-4 h-4 text-[#5F6368]" />
          <span>Enter Product Manually</span>
        </button>
      </div>

      {/* Explanatory Context Note (SIH PS-34 Core Principle) */}
      <div className="insp-context-note">
        <div className="insp-context-note-icon">
          <Info className="w-4 h-4 text-[#1A73E8]" />
        </div>
        <div className="insp-context-note-text">
          <strong>Important:</strong> Scanning identifies the product. Package photos are used later to inspect declarations and compliance.
        </div>
      </div>
    </div>
  );
};
