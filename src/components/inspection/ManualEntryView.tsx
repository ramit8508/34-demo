import React, { useState } from 'react';
import { Barcode, ArrowRight, Sparkles } from 'lucide-react';

interface ManualEntryViewProps {
  onSuccess: () => void;
  onBackToScanner: () => void;
}

export const ManualEntryView: React.FC<ManualEntryViewProps> = ({
  onSuccess,
  onBackToScanner,
}) => {
  const [barcodeValue, setBarcodeValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeValue.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSuccess();
    }, 600);
  };

  const handleQuickFill = () => {
    setBarcodeValue('8901491101844');
  };

  return (
    <div className="manual-entry-container">
      <div className="manual-entry-header">
        <h2 className="manual-entry-title">Enter product code</h2>
        <p className="manual-entry-subtitle">
          Type the 12 or 13-digit EAN/GTIN barcode number printed on the package.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="manual-entry-form">
        <div className="manual-field-block">
          <label htmlFor="gtin-input" className="manual-field-label">
            Barcode / GTIN
          </label>
          <div className="manual-input-wrap">
            <Barcode className="manual-input-icon" />
            <input
              id="gtin-input"
              type="text"
              className="manual-input"
              placeholder="e.g. 8901491101844"
              value={barcodeValue}
              onChange={(e) => setBarcodeValue(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Quick Demo Fill Helper */}
        <div className="flex items-center justify-between text-[12px] pt-1">
          <span className="text-[#5F6368]">Demo product code:</span>
          <button
            type="button"
            className="text-[#1A73E8] font-semibold hover:underline flex items-center gap-1"
            onClick={handleQuickFill}
          >
            <span>Fill Lay's GTIN</span>
          </button>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <button
            type="submit"
            className="insp-btn-primary"
            disabled={!barcodeValue.trim() || isSubmitting}
          >
            <span>{isSubmitting ? 'Identifying product...' : 'Identify Product'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="insp-btn-secondary"
            onClick={onBackToScanner}
          >
            <span>Back to Camera Scanner</span>
          </button>
        </div>
      </form>
    </div>
  );
};
