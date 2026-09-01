import React, { useState, useEffect, useRef } from 'react';
import { Camera, Keyboard, RefreshCw, Check, Zap, ZapOff, ShieldAlert } from 'lucide-react';
import { STORED_DEMO_PRODUCT, resolveProductByCode, type ProductRecord } from '../../data/productData';

interface BarcodeScannerProps {
  onScanSuccess: (product: ProductRecord) => void;
  onManualClick: () => void;
}

type CameraStatus = 'requesting' | 'active' | 'denied' | 'unsupported';

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onScanSuccess,
  onManualClick,
}) => {
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>('requesting');
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isTorchSupported, setIsTorchSupported] = useState(false);
  const [scanState, setScanState] = useState<'idle' | 'detected' | 'error'>('idle');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const detectorIntervalRef = useRef<number | null>(null);

  // Request & attach live camera stream
  const startCamera = async () => {
    setCameraStatus('requesting');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraStatus('unsupported');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      mediaStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }

      // Check for torch capability
      const track = stream.getVideoTracks()[0];
      if (track) {
        const capabilities = (track.getCapabilities ? track.getCapabilities() : {}) as any;
        if (capabilities && 'torch' in capabilities) {
          setIsTorchSupported(true);
        }
      }

      setCameraStatus('active');

      // Setup native BarcodeDetector if supported in modern mobile browser
      if ('BarcodeDetector' in window) {
        try {
          const barcodeDetector = new (window as any).BarcodeDetector({
            formats: ['ean_13', 'ean_8', 'qr_code', 'code_128', 'upc_a'],
          });

          detectorIntervalRef.current = window.setInterval(async () => {
            if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
              try {
                const barcodes = await barcodeDetector.detect(videoRef.current);
                if (barcodes.length > 0) {
                  const rawValue = barcodes[0].rawValue || STORED_DEMO_PRODUCT.gtin;
                  handleCodeDetected(rawValue);
                }
              } catch {
                // Ignore detection frame frame drops
              }
            }
          }, 400);
        } catch {
          // BarcodeDetector format error fallback
        }
      }
    } catch (err: any) {
      console.warn('Camera stream request rejected:', err);
      setCameraStatus('denied');
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (detectorIntervalRef.current) {
        clearInterval(detectorIntervalRef.current);
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Flashlight / Torch toggle
  const handleToggleTorch = async () => {
    if (!mediaStreamRef.current) return;
    const track = mediaStreamRef.current.getVideoTracks()[0];
    if (track && 'applyConstraints' in track) {
      try {
        const nextTorch = !isTorchOn;
        await track.applyConstraints({
          advanced: [{ torch: nextTorch } as any],
        });
        setIsTorchOn(nextTorch);
      } catch {
        setIsTorchOn((prev) => !prev);
      }
    } else {
      setIsTorchOn((prev) => !prev);
    }
  };

  // Resolve detected barcode value using existing stored product ID
  const handleCodeDetected = (codeValue: string) => {
    if (scanState === 'detected') return;

    if (detectorIntervalRef.current) {
      clearInterval(detectorIntervalRef.current);
    }

    setScanState('detected');

    // Resolve matching product record using the existing data source
    const matchedProduct = resolveProductByCode(codeValue) || STORED_DEMO_PRODUCT;

    // Transition to Product Identified screen with slight confirmation moment
    setTimeout(() => {
      onScanSuccess(matchedProduct);
    }, 700);
  };

  // Discreet Demo Scan Fallback (uses existing pre-fitted product GTIN)
  const handleDemoScan = () => {
    handleCodeDetected(STORED_DEMO_PRODUCT.gtin);
  };

  return (
    <div className="new-insp-scanner-view">
      {/* Screen Header */}
      <div className="new-insp-scanner-meta">
        <h2 className="new-insp-scanner-heading">Scan product</h2>
        <p className="new-insp-scanner-sub">
          Position the barcode or QR code inside the frame.
        </p>
      </div>

      {/* Camera Viewport Container */}
      <div className="new-insp-camera-wrapper">
        <div className="new-insp-camera-screen">
          {/* Live Device Camera Feed */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`new-insp-live-video ${cameraStatus === 'active' ? 'new-insp-video-ready' : ''}`}
          />

          {/* Camera Permission / Unavailable Notice */}
          {cameraStatus === 'denied' && (
            <div className="new-insp-camera-notice">
              <ShieldAlert className="w-10 h-10 text-[#F2994A] mb-2" />
              <h4 className="font-semibold text-[15px] text-white">Camera access is unavailable</h4>
              <p className="text-[13px] text-[#9AA0A6] text-center max-w-[240px] mt-1 mb-4 leading-relaxed">
                Allow camera permissions in your browser or use the demo fallback to continue.
              </p>
              <div className="flex flex-col gap-2 w-full max-w-[200px]">
                <button
                  type="button"
                  className="new-insp-notice-btn new-insp-notice-btn--primary"
                  onClick={startCamera}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
                <button
                  type="button"
                  className="new-insp-notice-btn new-insp-notice-btn--secondary"
                  onClick={handleDemoScan}
                >
                  <span>Use Demo Scan</span>
                </button>
              </div>
            </div>
          )}

          {cameraStatus === 'requesting' && (
            <div className="new-insp-camera-notice">
              <div className="new-insp-camera-spin-ring" />
              <span className="text-[13px] text-white mt-3 font-medium">Starting camera...</span>
            </div>
          )}

          {cameraStatus === 'unsupported' && (
            <div className="new-insp-camera-notice">
              <Camera className="w-8 h-8 text-[#9AA0A6] mb-2" />
              <h4 className="font-semibold text-[14px] text-white">Camera not available</h4>
              <p className="text-[12px] text-[#9AA0A6] text-center max-w-[220px] mt-1 mb-3">
                Your device does not expose a video camera stream.
              </p>
              <button
                type="button"
                className="new-insp-notice-btn new-insp-notice-btn--primary"
                onClick={handleDemoScan}
              >
                <span>Use Demo Scan</span>
              </button>
            </div>
          )}

          {/* Transparent Viewfinder Scrim & Center Frame */}
          {cameraStatus === 'active' && (
            <>
              {/* Top Controls (Flashlight) */}
              <div className="new-insp-camera-top-bar">
                {isTorchSupported ? (
                  <button
                    type="button"
                    className={`new-insp-cam-control-btn ${isTorchOn ? 'new-insp-cam-btn--active' : ''}`}
                    onClick={handleToggleTorch}
                    aria-label="Toggle flashlight"
                  >
                    {isTorchOn ? (
                      <Zap className="w-4 h-4 text-[#FBBC04]" />
                    ) : (
                      <ZapOff className="w-4 h-4 text-white" />
                    )}
                  </button>
                ) : (
                  <div />
                )}

                <span className="new-insp-camera-live-pill">
                  <span className="new-insp-live-dot" />
                  LIVE CAMERA
                </span>
              </div>

              {/* Transparent Reticle Scanning Frame */}
              <div
                className={`new-insp-target-reticle ${
                  scanState === 'detected' ? 'new-insp-reticle--success' : ''
                }`}
              >
                <span className="new-insp-corner new-insp-corner--tl" />
                <span className="new-insp-corner new-insp-corner--tr" />
                <span className="new-insp-corner new-insp-corner--bl" />
                <span className="new-insp-corner new-insp-corner--br" />

                {/* Subtle horizontal laser sweep line */}
                {scanState !== 'detected' && (
                  <div className="new-insp-scan-laser-line" />
                )}

                {/* Center State Overlay */}
                <div className="new-insp-reticle-center-info">
                  {scanState === 'idle' && (
                    <span className="new-insp-reticle-hint">
                      Align code within frame
                    </span>
                  )}

                  {scanState === 'detected' && (
                    <div className="new-insp-reticle-success-box">
                      <Check className="w-4 h-4 text-white" />
                      <span>Barcode detected</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom In-Camera Guidance */}
              <div className="new-insp-camera-bottom-caption">
                <span className="new-insp-camera-pulse-dot" />
                <span>Scanning automatically</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Scanner Controls & Fallbacks */}
      <div className="new-insp-scanner-controls">
        {/* Discreet Demo Scan Button */}
        <button
          type="button"
          className="new-insp-btn-primary"
          onClick={handleDemoScan}
          disabled={scanState === 'detected'}
        >
          <Camera className="w-4 h-4" />
          <span>Use demo scan</span>
        </button>

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            className="new-insp-btn-link"
            onClick={onManualClick}
          >
            <Keyboard className="w-4 h-4 text-[#5F6368]" />
            <span>Enter code manually</span>
          </button>

          <span className="text-[11px] text-[#80868B] font-mono">
            Demo GTIN: {STORED_DEMO_PRODUCT.gtin}
          </span>
        </div>
      </div>
    </div>
  );
};
