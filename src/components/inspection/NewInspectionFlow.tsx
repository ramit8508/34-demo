import React, { useState } from 'react';
import { ArrowLeft, X, Shield } from 'lucide-react';
import { WorkflowProgress } from './WorkflowProgress';
import { ProductIdentifyEntry } from './ProductIdentifyEntry';
import { BarcodeScannerView } from './BarcodeScannerView';
import { ManualEntryView } from './ManualEntryView';
import { ProductIdentifiedView } from './ProductIdentifiedView';
import { PackageCapturePlaceholder } from './PackageCapturePlaceholder';

interface NewInspectionFlowProps {
  onClose: () => void;
}

type FlowStep = 'entry' | 'scanner' | 'manual' | 'identified' | 'capture_placeholder';

export const NewInspectionFlow: React.FC<NewInspectionFlowProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('entry');

  const handleBack = () => {
    if (currentStep === 'entry') {
      onClose();
    } else if (currentStep === 'scanner' || currentStep === 'manual') {
      setCurrentStep('entry');
    } else if (currentStep === 'identified') {
      setCurrentStep('entry');
    } else if (currentStep === 'capture_placeholder') {
      setCurrentStep('identified');
    }
  };

  return (
    <div className="new-inspection-screen">
      {/* Top Header Bar */}
      <header className="new-inspection-header">
        <div className="flex items-center gap-3">
          <button
            className="new-insp-back-btn"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-[#3C4043]" />
          </button>
          <div>
            <h1 className="new-insp-header-title">New inspection</h1>
            <p className="new-insp-header-sub">
              {currentStep === 'capture_placeholder'
                ? 'Step 02 · Package Image Capture'
                : 'Start by identifying the packaged commodity.'}
            </p>
          </div>
        </div>

        <button
          className="new-insp-close-btn"
          onClick={onClose}
          aria-label="Exit inspection workflow"
        >
          <X className="w-5 h-5 text-[#5F6368]" />
        </button>
      </header>

      {/* Workflow 5-Step Progress Indicator */}
      <WorkflowProgress currentStep={currentStep === 'capture_placeholder' ? 2 : 1} />

      {/* Main Flow Content Body */}
      <main className="new-inspection-main">
        <div className="new-inspection-body">
          {currentStep === 'entry' && (
            <ProductIdentifyEntry
              onStartScanner={() => setCurrentStep('scanner')}
              onStartManual={() => setCurrentStep('manual')}
            />
          )}

          {currentStep === 'scanner' && (
            <BarcodeScannerView
              onScanSuccess={() => setCurrentStep('identified')}
              onEnterManual={() => setCurrentStep('manual')}
            />
          )}

          {currentStep === 'manual' && (
            <ManualEntryView
              onSuccess={() => setCurrentStep('identified')}
              onBackToScanner={() => setCurrentStep('scanner')}
            />
          )}

          {currentStep === 'identified' && (
            <ProductIdentifiedView
              onContinue={() => setCurrentStep('capture_placeholder')}
              onRescan={() => setCurrentStep('scanner')}
            />
          )}

          {currentStep === 'capture_placeholder' && (
            <PackageCapturePlaceholder
              onBackToDashboard={onClose}
              onBackToIdentification={() => setCurrentStep('identified')}
            />
          )}
        </div>
      </main>
    </div>
  );
};
