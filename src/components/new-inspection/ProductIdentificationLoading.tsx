import React, { useState, useEffect } from 'react';
import { CheckCircle2, Check, Package, Building2, Tag } from 'lucide-react';
import { STORED_DEMO_PRODUCT, type ProductRecord } from '../../data/productData';

interface ProductIdentificationLoadingProps {
  product?: ProductRecord | null;
  onComplete: () => void;
}

type LoadingPhase = 'identifying' | 'retrieving' | 'preparing';

export const ProductIdentificationLoading: React.FC<ProductIdentificationLoadingProps> = ({
  product = STORED_DEMO_PRODUCT,
  onComplete,
}) => {
  const currentProduct = product || STORED_DEMO_PRODUCT;
  const [phase, setPhase] = useState<LoadingPhase>('identifying');
  const [revealedRows, setRevealedRows] = useState<number>(0);

  useEffect(() => {
    // Phase 1: Identifying (0 - 750ms)
    const t1 = setTimeout(() => {
      setPhase('retrieving');
    }, 750);

    // Phase 2: Retrieving details (750ms - 1500ms)
    const t2 = setTimeout(() => {
      setPhase('preparing');
    }, 1500);

    // Phase 3: Staggered row reveals
    const r1 = setTimeout(() => setRevealedRows(1), 1600);
    const r2 = setTimeout(() => setRevealedRows(2), 1800);
    const r3 = setTimeout(() => setRevealedRows(3), 2000);
    const r4 = setTimeout(() => setRevealedRows(4), 2200);

    // Phase 4: Final completion (~2500ms)
    const tComplete = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(r1);
      clearTimeout(r2);
      clearTimeout(r3);
      clearTimeout(r4);
      clearTimeout(tComplete);
    };
  }, [onComplete]);

  const getProgressPercent = () => {
    if (phase === 'identifying') return 35;
    if (phase === 'retrieving') return 70;
    return 100;
  };

  return (
    <div className="new-insp-loading-pane">
      {/* Detected Barcode Pill */}
      <div className="new-insp-detected-badge">
        <CheckCircle2 className="w-4 h-4 text-[#1E8E3E]" />
        <span className="font-semibold text-[13px] text-[#137333]">
          Barcode detected
        </span>
        <span className="text-[12px] text-[#5F6368] font-mono ml-auto">
          {currentProduct.gtin}
        </span>
      </div>

      {/* Main Loading Card */}
      <div className="new-insp-loading-card">
        {/* Dynamic Title and Subtitle */}
        <div className="new-insp-loading-text">
          <h2 className="new-insp-loading-heading">
            {phase === 'identifying' && 'Identifying product'}
            {phase === 'retrieving' && 'Retrieving product details'}
            {phase === 'preparing' && 'Preparing product information'}
          </h2>
          <p className="new-insp-loading-sub">
            {phase === 'identifying' && 'Matching product information'}
            {phase === 'retrieving' && 'Matching product information'}
            {phase === 'preparing' && 'Checking reference details'}
          </p>
        </div>

        {/* Horizontal Progress Track */}
        <div className="new-insp-progress-bar-container">
          <div
            className="new-insp-progress-bar-fill"
            style={{ width: `${getProgressPercent()}%` }}
          />
        </div>

        {/* 3-Step Stepper Progress */}
        <div className="new-insp-stepper-list">
          {/* Step 1 */}
          <div className="new-insp-stepper-row">
            <div
              className={`new-insp-stepper-dot ${
                phase !== 'identifying'
                  ? 'new-insp-stepper-dot--done'
                  : 'new-insp-stepper-dot--active'
              }`}
            >
              {phase !== 'identifying' ? (
                <Check className="w-3 h-3 text-white" />
              ) : (
                <span className="new-insp-pulse-ring" />
              )}
            </div>
            <span
              className={`new-insp-stepper-label ${
                phase === 'identifying' ? 'font-semibold text-[#202124]' : 'text-[#5F6368]'
              }`}
            >
              Identifying product
            </span>
          </div>

          {/* Step 2 */}
          <div className="new-insp-stepper-row">
            <div
              className={`new-insp-stepper-dot ${
                phase === 'preparing'
                  ? 'new-insp-stepper-dot--done'
                  : phase === 'retrieving'
                  ? 'new-insp-stepper-dot--active'
                  : 'new-insp-stepper-dot--pending'
              }`}
            >
              {phase === 'preparing' ? (
                <Check className="w-3 h-3 text-white" />
              ) : phase === 'retrieving' ? (
                <span className="new-insp-pulse-ring" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-[#BDC1C6]" />
              )}
            </div>
            <span
              className={`new-insp-stepper-label ${
                phase === 'retrieving' ? 'font-semibold text-[#202124]' : 'text-[#5F6368]'
              }`}
            >
              Retrieving product details
            </span>
          </div>

          {/* Step 3 */}
          <div className="new-insp-stepper-row">
            <div
              className={`new-insp-stepper-dot ${
                phase === 'preparing'
                  ? 'new-insp-stepper-dot--active'
                  : 'new-insp-stepper-dot--pending'
              }`}
            >
              {phase === 'preparing' ? (
                <span className="new-insp-pulse-ring" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-[#BDC1C6]" />
              )}
            </div>
            <span
              className={`new-insp-stepper-label ${
                phase === 'preparing' ? 'font-semibold text-[#202124]' : 'text-[#5F6368]'
              }`}
            >
              Preparing product information
            </span>
          </div>
        </div>

        {/* Staggered Information Reveal Rows (Phase 3) */}
        {phase === 'preparing' && (
          <div className="new-insp-loading-preview-table">
            {revealedRows >= 1 && (
              <div className="new-insp-loading-row new-insp-row--animate">
                <Tag className="w-3.5 h-3.5 text-[#5F6368]" />
                <span className="new-insp-row-key">Product</span>
                <span className="new-insp-row-val">{currentProduct.product}</span>
              </div>
            )}

            {revealedRows >= 2 && (
              <div className="new-insp-loading-row new-insp-row--animate">
                <Building2 className="w-3.5 h-3.5 text-[#5F6368]" />
                <span className="new-insp-row-key">Manufacturer</span>
                <span className="new-insp-row-val">{currentProduct.manufacturer}</span>
              </div>
            )}

            {revealedRows >= 3 && (
              <div className="new-insp-loading-row new-insp-row--animate">
                <Package className="w-3.5 h-3.5 text-[#5F6368]" />
                <span className="new-insp-row-key">Pack size</span>
                <span className="new-insp-row-val">{currentProduct.packSize}</span>
              </div>
            )}

            {revealedRows >= 4 && (
              <div className="new-insp-loading-row new-insp-row--animate">
                <span className="text-[12px] font-bold text-[#5F6368] w-3.5 text-center">₹</span>
                <span className="new-insp-row-key">MRP</span>
                <span className="new-insp-row-val">{currentProduct.mrp}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
