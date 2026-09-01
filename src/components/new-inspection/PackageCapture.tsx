import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, CheckCircle2, ArrowRight, RefreshCw, Trash2, Plus, Info, Check } from 'lucide-react';
import { STORED_DEMO_PRODUCT, type ProductRecord } from '../../data/productData';
import { PackageCameraModal } from './PackageCameraModal';

interface PackageCaptureProps {
  product?: ProductRecord | null;
  frontImage: string | null;
  backImage: string | null;
  leftImage: string | null;
  rightImage: string | null;
  onFrontChange: (img: string | null) => void;
  onBackChange: (img: string | null) => void;
  onLeftChange: (img: string | null) => void;
  onRightChange: (img: string | null) => void;
  onContinueToAnalysis: () => void;
}

export const PackageCapture: React.FC<PackageCaptureProps> = ({
  product = STORED_DEMO_PRODUCT,
  frontImage,
  backImage,
  leftImage,
  rightImage,
  onFrontChange,
  onBackChange,
  onLeftChange,
  onRightChange,
  onContinueToAnalysis,
}) => {
  const currentProduct = product || STORED_DEMO_PRODUCT;
  const [activeCameraSide, setActiveCameraSide] = useState<'front' | 'back' | 'left' | 'right' | null>(null);

  const frontFileInputRef = useRef<HTMLInputElement | null>(null);
  const backFileInputRef = useRef<HTMLInputElement | null>(null);
  const leftFileInputRef = useRef<HTMLInputElement | null>(null);
  const rightFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, setter: (img: string | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setter(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const mandatoryCount = (frontImage ? 1 : 0) + (backImage ? 1 : 0);
  const totalCount = [frontImage, backImage, leftImage, rightImage].filter(Boolean).length;
  const isMandatoryComplete = mandatoryCount === 2;

  const getCoverageLabel = () => {
    if (totalCount === 4) return '4 / 4 views captured ✓';
    if (isMandatoryComplete && totalCount === 3) return '3 / 4 views captured ✓';
    if (isMandatoryComplete) return '2 / 2 required views captured ✓';
    return `${mandatoryCount} / 2 required views captured`;
  };

  return (
    <div className="pkg-capture-root">
      {/* Hidden File Inputs for all 4 views */}
      <input
        ref={frontFileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFileInput(e, onFrontChange)}
      />
      <input
        ref={backFileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFileInput(e, onBackChange)}
      />
      <input
        ref={leftFileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFileInput(e, onLeftChange)}
      />
      <input
        ref={rightFileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFileInput(e, onRightChange)}
      />

      {/* Compact Page Header */}
      <div className="pkg-capture-header">
        <h2 className="pkg-capture-title">Capture package</h2>
        <p className="pkg-capture-sub">
          Capture the package from the required views.
        </p>
      </div>

      {/* Compact Product Context Row */}
      <div className="pkg-product-context-row">
        <div className="pkg-context-left">
          <CheckCircle2 className="w-4 h-4 text-[#1E8E3E] flex-shrink-0" />
          <div className="pkg-context-meta">
            <span className="pkg-context-name">{currentProduct.product}</span>
            <span className="pkg-context-details">
              {currentProduct.packSize} · <span className="font-mono">{currentProduct.gtin}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Global Concise Quality Guidance Banner */}
      <div className="pkg-guidance-banner">
        <Info className="w-4 h-4 text-[#1A73E8] flex-shrink-0 mt-0.5" />
        <p className="pkg-guidance-text">
          Keep the package fully visible and make sure printed text is sharp.
        </p>
      </div>

      {/* Required Views Section Header */}
      <div className="pkg-section-header-row">
        <span className="pkg-section-label">Required views</span>
        <span className={`pkg-coverage-pill ${isMandatoryComplete ? 'pkg-coverage--complete' : ''}`}>
          {getCoverageLabel()}
        </span>
      </div>

      {/* ── Primary Required Views (Front & Back) ─────────────── */}
      <div className="pkg-primary-views-stack">
        {/* 01. Front of Package Card */}
        <div className={`pkg-camera-card ${frontImage ? 'pkg-camera-card--captured' : ''}`}>
          <div className="pkg-card-top-bar">
            <div className="pkg-card-identity">
              <span className="pkg-card-num">01</span>
              <div>
                <h3 className="pkg-card-title">Front of package</h3>
                <span className="pkg-card-caption">Principal display panel</span>
              </div>
            </div>
            <span className="pkg-badge-req">Required</span>
          </div>

          {!frontImage ? (
            <div className="pkg-empty-viewport">
              <div className="pkg-empty-icon-box">
                <Camera className="w-7 h-7 text-[#5F6368]" />
              </div>
              <p className="pkg-empty-title">Capture front image</p>
              <p className="pkg-empty-hint">Show the principal display panel clearly.</p>

              <div className="pkg-empty-action-group">
                <button
                  type="button"
                  className="pkg-btn-shutter"
                  onClick={() => setActiveCameraSide('front')}
                >
                  <Camera className="w-4 h-4" />
                  <span>Take photo</span>
                </button>
                <button
                  type="button"
                  className="pkg-btn-upload-link"
                  onClick={() => frontFileInputRef.current?.click()}
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#5F6368]" />
                  <span>Upload from device</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="pkg-captured-viewport">
              <div className="pkg-image-canvas">
                <img
                  src={frontImage}
                  alt="Front of package"
                  className="pkg-rendered-image"
                />
                <div className="pkg-image-tag">
                  <Check className="w-3.5 h-3.5 text-[#1E8E3E]" />
                  <span>Front captured ✓</span>
                </div>
              </div>

              <div className="pkg-image-actions-row">
                <button
                  type="button"
                  className="pkg-image-action-btn"
                  onClick={() => setActiveCameraSide('front')}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
                <button
                  type="button"
                  className="pkg-image-action-btn"
                  onClick={() => frontFileInputRef.current?.click()}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Change photo</span>
                </button>
                <button
                  type="button"
                  className="pkg-image-action-btn pkg-image-action-btn--delete"
                  onClick={() => onFrontChange(null)}
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 02. Back of Package Card */}
        <div className={`pkg-camera-card ${backImage ? 'pkg-camera-card--captured' : ''}`}>
          <div className="pkg-card-top-bar">
            <div className="pkg-card-identity">
              <span className="pkg-card-num">02</span>
              <div>
                <h3 className="pkg-card-title">Back of package</h3>
                <span className="pkg-card-caption">MRP, quantity, manufacturer and declarations</span>
              </div>
            </div>
            <span className="pkg-badge-req">Required</span>
          </div>

          {!backImage ? (
            <div className="pkg-empty-viewport">
              <div className="pkg-empty-icon-box">
                <Camera className="w-7 h-7 text-[#5F6368]" />
              </div>
              <p className="pkg-empty-title">Capture back image</p>
              <p className="pkg-empty-hint">Show the information panel clearly.</p>

              <div className="pkg-empty-action-group">
                <button
                  type="button"
                  className="pkg-btn-shutter"
                  onClick={() => setActiveCameraSide('back')}
                >
                  <Camera className="w-4 h-4" />
                  <span>Take photo</span>
                </button>
                <button
                  type="button"
                  className="pkg-btn-upload-link"
                  onClick={() => backFileInputRef.current?.click()}
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#5F6368]" />
                  <span>Upload from device</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="pkg-captured-viewport">
              <div className="pkg-image-canvas">
                <img
                  src={backImage}
                  alt="Back of package"
                  className="pkg-rendered-image"
                />
                <div className="pkg-image-tag">
                  <Check className="w-3.5 h-3.5 text-[#1E8E3E]" />
                  <span>Back captured ✓</span>
                </div>
              </div>

              <div className="pkg-image-actions-row">
                <button
                  type="button"
                  className="pkg-image-action-btn"
                  onClick={() => setActiveCameraSide('back')}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
                <button
                  type="button"
                  className="pkg-image-action-btn"
                  onClick={() => backFileInputRef.current?.click()}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Change photo</span>
                </button>
                <button
                  type="button"
                  className="pkg-image-action-btn pkg-image-action-btn--delete"
                  onClick={() => onBackChange(null)}
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Secondary Optional Views (Left & Right Sides) ─────── */}
      <div className="pkg-optional-section">
        <div className="pkg-optional-header">
          <div>
            <h3 className="pkg-optional-title">Additional package views</h3>
            <p className="pkg-optional-sub">Side declarations, markings or packaging details</p>
          </div>
          <span className="pkg-badge-opt">Optional</span>
        </div>

        <div className="pkg-optional-list">
          {/* 03. Left Side Row */}
          <div className={`pkg-optional-row ${leftImage ? 'pkg-optional-row--active' : ''}`}>
            <div className="pkg-opt-row-info">
              {leftImage ? (
                <div className="pkg-opt-thumb-wrap">
                  <img src={leftImage} alt="Left side thumbnail" className="pkg-opt-thumb-img" />
                </div>
              ) : (
                <div className="pkg-opt-icon-slot">
                  <Camera className="w-4 h-4 text-[#5F6368]" />
                </div>
              )}
              <div className="pkg-opt-meta">
                <span className="pkg-opt-name">03. Left side</span>
                <span className="pkg-opt-state">
                  {leftImage ? 'Captured ✓' : 'Any side declarations or markings'}
                </span>
              </div>
            </div>

            <div className="pkg-opt-actions">
              {!leftImage ? (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    className="pkg-opt-add-btn"
                    onClick={() => setActiveCameraSide('left')}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add photo</span>
                  </button>
                  <button
                    type="button"
                    className="pkg-opt-upload-btn"
                    onClick={() => leftFileInputRef.current?.click()}
                    title="Upload left side"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-[#5F6368]" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="pkg-opt-action-btn"
                    onClick={() => setActiveCameraSide('left')}
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Retake</span>
                  </button>
                  <button
                    type="button"
                    className="pkg-opt-action-btn pkg-opt-action-btn--delete"
                    onClick={() => onLeftChange(null)}
                    title="Remove left side"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 04. Right Side Row */}
          <div className={`pkg-optional-row ${rightImage ? 'pkg-optional-row--active' : ''}`}>
            <div className="pkg-opt-row-info">
              {rightImage ? (
                <div className="pkg-opt-thumb-wrap">
                  <img src={rightImage} alt="Right side thumbnail" className="pkg-opt-thumb-img" />
                </div>
              ) : (
                <div className="pkg-opt-icon-slot">
                  <Camera className="w-4 h-4 text-[#5F6368]" />
                </div>
              )}
              <div className="pkg-opt-meta">
                <span className="pkg-opt-name">04. Right side</span>
                <span className="pkg-opt-state">
                  {rightImage ? 'Captured ✓' : 'Any side declarations or markings'}
                </span>
              </div>
            </div>

            <div className="pkg-opt-actions">
              {!rightImage ? (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    className="pkg-opt-add-btn"
                    onClick={() => setActiveCameraSide('right')}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add photo</span>
                  </button>
                  <button
                    type="button"
                    className="pkg-opt-upload-btn"
                    onClick={() => rightFileInputRef.current?.click()}
                    title="Upload right side"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-[#5F6368]" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="pkg-opt-action-btn"
                    onClick={() => setActiveCameraSide('right')}
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Retake</span>
                  </button>
                  <button
                    type="button"
                    className="pkg-opt-action-btn pkg-opt-action-btn--delete"
                    onClick={() => onRightChange(null)}
                    title="Remove right side"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Mobile Action Bar ──────────────────────────── */}
      <div className="pkg-action-footer">
        <div className="pkg-action-footer-inner">
          <div className="pkg-footer-status">
            <span className={isMandatoryComplete ? 'text-[#1E8E3E] font-medium' : 'text-[#5F6368]'}>
              {isMandatoryComplete ? 'Front and back captured ✓' : 'Front and back required'}
            </span>
          </div>

          <button
            type="button"
            className="pkg-btn-continue"
            onClick={onContinueToAnalysis}
            disabled={!isMandatoryComplete}
          >
            <span>Continue to Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* In-App Camera Modal if open */}
      {activeCameraSide && (
        <PackageCameraModal
          side={activeCameraSide}
          onCapture={(dataUrl) => {
            if (activeCameraSide === 'front') {
              onFrontChange(dataUrl);
            } else if (activeCameraSide === 'back') {
              onBackChange(dataUrl);
            } else if (activeCameraSide === 'left') {
              onLeftChange(dataUrl);
            } else if (activeCameraSide === 'right') {
              onRightChange(dataUrl);
            }
          }}
          onClose={() => setActiveCameraSide(null)}
        />
      )}
    </div>
  );
};
