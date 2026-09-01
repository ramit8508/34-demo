import React, { useState, useEffect } from 'react';
import { Camera, Keyboard, AlertCircle, RefreshCw, Check, Sparkles } from 'lucide-react';

interface BarcodeScannerViewProps {
  onScanSuccess: () => void;
  onEnterManual: () => void;
}

export const BarcodeScannerView: React.FC<BarcodeScannerViewProps> = ({
  onScanSuccess,
  onEnterManual,
}) => {
  const [scanState, setScanState] = useState<'viewing' | 'reading' | 'identified' | 'error'>('viewing');

  const triggerScan = () => {
    setScanState('reading');
    setTimeout(() => {
      setScanState('identified');
      setTimeout(() => {
        onScanSuccess();
      }, 600);
    }, 1200);
  };

  const triggerError = () => {
    setScanState('reading');
    setTimeout(() => {
      setScanState('error');
    }, 1000);
  };

  return (
    <div className="scanner-view-container">
      {/* Header Info */}
      <div className="scanner-header-info">
        <h2 className="scanner-title">Scan product</h2>
        <p className="scanner-subtitle">Align the barcode or QR code inside the frame.</p>
      </div>

      {/* Camera Viewfinder Screen */}
      <div className="scanner-viewport">
        {/* Background Simulation / Dark Camera Backdrop */}
        <div className="scanner-camera-bg">
          {/* Central Scanning Reticle / Frame */}
          <div className={`scanner-reticle ${scanState === 'reading' ? 'scanner-reticle--reading' : ''} ${scanState === 'identified' ? 'scanner-reticle--success' : ''}`}>
            {/* Corner Indicators */}
            <span className="scanner-corner scanner-corner--tl" />
            <span className="scanner-corner scanner-corner--tr" />
            <span className="scanner-corner scanner-corner--bl" />
            <span className="scanner-corner scanner-corner--br" />

            {/* Target Alignment Center */}
            <div className="scanner-reticle-center">
              {scanState === 'viewing' && (
                <div className="scanner-status-text">
                  <div className="scanner-barcode-icon-anim" />
                  <span>Align code within the frame</span>
                </div>
              )}

              {scanState === 'reading' && (
                <div className="scanner-status-text scanner-status-text--reading">
                  <div className="scanner-spinner-ring" />
                  <span>Reading product code...</span>
                </div>
              )}

              {scanState === 'identified' && (
                <div className="scanner-status-text scanner-status-text--success">
                  <div className="scanner-check-circle">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span>Product identified</span>
                </div>
              )}
            </div>
          </div>

          <div className="scanner-bottom-hint">
            {scanState === 'reading' ? 'Processing barcode optical data...' : 'Scanning automatically'}
          </div>
        </div>
      </div>

      {/* Error State Banner if Triggered */}
      {scanState === 'error' && (
        <div className="scanner-error-banner">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#D93025] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-[14px] text-[#202124]">Couldn't identify this product.</h4>
              <p className="text-[13px] text-[#5F6368] mt-1">
                Try scanning again or enter the barcode manually.
              </p>
              <div className="flex items-center gap-3 mt-3">
                <button
                  className="scanner-err-btn scanner-err-btn--primary"
                  onClick={() => setScanState('viewing')}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
                <button
                  className="scanner-err-btn scanner-err-btn--secondary"
                  onClick={onEnterManual}
                >
                  <span>Enter Manually</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simulation Controls & Fallback */}
      <div className="scanner-footer-controls">
        {scanState !== 'error' && (
          <button
            className="insp-btn-primary"
            onClick={triggerScan}
            disabled={scanState === 'reading' || scanState === 'identified'}
          >
            <Camera className="w-5 h-5" />
            <span>Simulate Scan</span>
          </button>
        )}

        <div className="flex items-center justify-between gap-3 pt-1">
          <button className="insp-btn-text" onClick={onEnterManual}>
            <Keyboard className="w-4 h-4 text-[#5F6368]" />
            <span>Enter code manually</span>
          </button>

          {scanState === 'viewing' && (
            <button
              className="text-[12px] text-[#5F6368] hover:text-[#D93025] transition-colors"
              onClick={triggerError}
            >
              Simulate Error
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
