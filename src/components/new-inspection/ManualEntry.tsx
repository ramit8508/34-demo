import React, { useState } from 'react';
import { Barcode, ArrowRight } from 'lucide-react';
import { resolveProductByCode, type ProductRecord } from '../../data/productData';

interface ManualEntryProps {
  onSubmitSuccess: (product: ProductRecord) => void;
  onBackToScanner: () => void;
}

export const ManualEntry: React.FC<ManualEntryProps> = ({
  onSubmitSuccess,
  onBackToScanner,
}) => {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;

    setIsSubmitting(true);
    const resolved = resolveProductByCode(barcodeInput);
    setTimeout(() => {
      onSubmitSuccess(resolved);
    }, 500);
  };

  const handleFillLays = () => {
    setBarcodeInput('8901491101844');
  };

  const handleFillFreshBite = () => {
    setBarcodeInput('8901234567890');
  };

  return (
    <div className="new-insp-manual-pane">
      <div className="new-insp-manual-header">
        <h2 className="new-insp-manual-title">Enter product code</h2>
        <p className="new-insp-manual-sub">
          Type the 12 or 13-digit EAN/GTIN barcode number printed on the package.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="new-insp-manual-form">
        <div className="new-insp-field-group">
          <label htmlFor="manual-gtin" className="new-insp-field-label">
            Barcode / GTIN
          </label>
          <div className="new-insp-input-box">
            <Barcode className="new-insp-input-icon" />
            <input
              id="manual-gtin"
              type="text"
              className="new-insp-text-input"
              placeholder="e.g. 8901491101844 or 8901234567890"
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Demo Helper Links */}
        <div className="flex flex-col gap-1.5 text-[12px] pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[#5F6368]">Demo scenario A:</span>
            <button
              type="button"
              className="text-[#1A73E8] font-semibold hover:underline"
              onClick={handleFillLays}
            >
              Lay's GTIN (8901491101844)
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#5F6368]">Demo scenario B:</span>
            <button
              type="button"
              className="text-[#1A73E8] font-semibold hover:underline"
              onClick={handleFillFreshBite}
            >
              FreshBite GTIN (8901234567890)
            </button>
          </div>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <button
            type="submit"
            className="new-insp-btn-primary"
            disabled={!barcodeInput.trim() || isSubmitting}
          >
            <span>{isSubmitting ? 'Identifying product...' : 'Identify Product'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="new-insp-btn-secondary"
            onClick={onBackToScanner}
          >
            <span>Back to Camera Scanner</span>
          </button>
        </div>
      </form>
    </div>
  );
};
