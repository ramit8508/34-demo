import React from 'react';
import { Camera, ArrowLeft, CheckCircle2, Shield } from 'lucide-react';

interface PackageCapturePlaceholderProps {
  onBackToDashboard: () => void;
  onBackToIdentification: () => void;
}

export const PackageCapturePlaceholder: React.FC<PackageCapturePlaceholderProps> = ({
  onBackToDashboard,
  onBackToIdentification,
}) => {
  return (
    <div className="capture-placeholder-container">
      <div className="capture-placeholder-card">
        <div className="capture-icon-bubble">
          <Camera className="w-8 h-8 text-[#1A73E8]" />
        </div>

        <div className="capture-placeholder-kicker">
          <span className="text-[12px] font-bold text-[#1A73E8] uppercase tracking-wider">Step 02 · Capture</span>
        </div>

        <h2 className="capture-placeholder-title">Package Image Capture</h2>

        <p className="capture-placeholder-desc">
          You have successfully identified <strong>Lay's India's Magic Masala (50g)</strong>.
          <br /><br />
          In the upcoming phase, the multi-angle camera module will capture the front, back, and mandatory declaration panels for AI-assisted OCR and Legal Metrology rule validation.
        </p>

        <div className="capture-placeholder-meta-box">
          <div className="flex items-center gap-2 text-[#1E8E3E] font-semibold text-[13px]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Product Identification Milestone Complete</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col gap-3 w-full">
          <button className="insp-btn-primary" onClick={onBackToDashboard}>
            <span>Done · Return to Dashboard</span>
          </button>

          <button className="insp-btn-secondary" onClick={onBackToIdentification}>
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Product Identification</span>
          </button>
        </div>
      </div>
    </div>
  );
};
