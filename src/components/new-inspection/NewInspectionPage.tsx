import React, { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import './inspection.css';
import { InspectionProgress } from './InspectionProgress';
import { ProductIdentification } from './ProductIdentification';
import { BarcodeScanner } from './BarcodeScanner';
import { ManualEntry } from './ManualEntry';
import { ProductIdentificationLoading } from './ProductIdentificationLoading';
import { ProductIdentified } from './ProductIdentified';
import { PackageCapture } from './PackageCapture';
import { PackageAnalysis } from './PackageAnalysis';
import { STORED_DEMO_PRODUCT, type ProductRecord } from '../../data/productData';

interface NewInspectionPageProps {
  onBackToHome: () => void;
}

type StepState = 'identify' | 'scanner' | 'manual' | 'loading' | 'identified' | 'capture' | 'analysis';

export const NewInspectionPage: React.FC<NewInspectionPageProps> = ({ onBackToHome }) => {
  const [step, setStep] = useState<StepState>('identify');
  const [resolvedProduct, setResolvedProduct] = useState<ProductRecord>(STORED_DEMO_PRODUCT);
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [leftImage, setLeftImage] = useState<string | null>(null);
  const [rightImage, setRightImage] = useState<string | null>(null);

  const handleBack = () => {
    if (step === 'identify') {
      onBackToHome();
    } else if (step === 'scanner' || step === 'manual' || step === 'loading') {
      setStep('identify');
    } else if (step === 'identified') {
      setStep('identify');
    } else if (step === 'capture') {
      setStep('identified');
    } else if (step === 'analysis') {
      setStep('capture');
    }
  };

  const handleScanSuccess = (product: ProductRecord) => {
    setResolvedProduct(product);
    setStep('loading');
  };

  const handleManualSuccess = () => {
    setResolvedProduct(STORED_DEMO_PRODUCT);
    setStep('loading');
  };

  const getStepNumber = (): number => {
    if (step === 'analysis') return 3;
    if (step === 'capture') return 2;
    return 1;
  };

  const getSubTitle = (): string => {
    if (step === 'analysis') return 'Step 03 · Analyze package declarations';
    if (step === 'capture') return 'Step 02 · Capture package images';
    if (step === 'loading') return 'Matching product information against catalog';
    return 'Start by identifying the packaged commodity.';
  };

  return (
    <div className="new-insp-viewport">
      {/* Top Standard Header */}
      <header className="new-insp-topbar">
        <button
          type="button"
          className="new-insp-nav-btn"
          onClick={handleBack}
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-[#202124]" />
        </button>

        <div className="new-insp-title-box">
          <h1 className="new-insp-screen-title">New inspection</h1>
          <span className="new-insp-screen-sub">{getSubTitle()}</span>
        </div>

        <button
          type="button"
          className="new-insp-nav-btn"
          onClick={onBackToHome}
          aria-label="Close inspection"
        >
          <X className="w-5 h-5 text-[#5F6368]" />
        </button>
      </header>

      {/* Progress Flow Indicator */}
      <InspectionProgress currentStep={getStepNumber()} />

      {/* Main Screen Content Viewport */}
      <main className="new-insp-main-scroll">
        <div className={`new-insp-center-container ${step === 'identified' || step === 'analysis' ? 'new-insp-center-container--wide' : ''}`}>
          {step === 'identify' && (
            <ProductIdentification
              onScanClick={() => setStep('scanner')}
              onManualClick={() => setStep('manual')}
            />
          )}

          {step === 'scanner' && (
            <BarcodeScanner
              onScanSuccess={handleScanSuccess}
              onManualClick={() => setStep('manual')}
            />
          )}

          {step === 'manual' && (
            <ManualEntry
              onSubmitSuccess={handleManualSuccess}
              onBackToScanner={() => setStep('scanner')}
            />
          )}

          {step === 'loading' && (
            <ProductIdentificationLoading
              product={resolvedProduct}
              onComplete={() => setStep('identified')}
            />
          )}

          {step === 'identified' && (
            <ProductIdentified
              product={resolvedProduct}
              onContinue={() => setStep('capture')}
              onRescan={() => setStep('scanner')}
            />
          )}

          {step === 'capture' && (
            <PackageCapture
              product={resolvedProduct}
              frontImage={frontImage}
              backImage={backImage}
              leftImage={leftImage}
              rightImage={rightImage}
              onFrontChange={setFrontImage}
              onBackChange={setBackImage}
              onLeftChange={setLeftImage}
              onRightChange={setRightImage}
              onContinueToAnalysis={() => setStep('analysis')}
            />
          )}

          {step === 'analysis' && (
            <PackageAnalysis
              product={resolvedProduct}
              frontImage={frontImage}
              backImage={backImage}
              leftImage={leftImage}
              rightImage={rightImage}
              onBackToCapture={() => setStep('capture')}
              onContinueToValidation={() => {
                // Validation stage is the next upcoming milestone
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
};
