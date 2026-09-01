import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, RefreshCw, Zap, ZapOff, ShieldAlert, Image as ImageIcon } from 'lucide-react';

interface PackageCameraModalProps {
  side: 'front' | 'back' | 'left' | 'right';
  onCapture: (imageDataUrl: string) => void;
  onClose: () => void;
}

export const PackageCameraModal: React.FC<PackageCameraModalProps> = ({
  side,
  onCapture,
  onClose,
}) => {
  const [cameraState, setCameraState] = useState<'requesting' | 'active' | 'denied' | 'unsupported'>('requesting');
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isTorchSupported, setIsTorchSupported] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const startCamera = async () => {
    setCameraState('requesting');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraState('unsupported');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
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

      setCameraState('active');
    } catch (err) {
      console.warn('Camera error for package photography:', err);
      setCameraState('denied');
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Flashlight / Torch toggle
  const toggleTorch = async () => {
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

  // Real frame snapshot to Canvas
  const takeSnapshot = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      onCapture(dataUrl);
      onClose();
    }
  };

  // Handle native file upload fallback
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onCapture(event.target.result as string);
          onClose();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getSideDetails = () => {
    switch (side) {
      case 'front':
        return {
          label: 'Front of package',
          hint: 'Include the full principal display panel',
          guide: 'Fit front panel inside box',
        };
      case 'back':
        return {
          label: 'Back of package',
          hint: 'Include the MRP, net quantity, batch & manufacturer panel',
          guide: 'Fit back panel inside box',
        };
      case 'left':
        return {
          label: 'Left side of package',
          hint: 'Show any side declarations, markings or packaging details clearly',
          guide: 'Fit left side inside box',
        };
      case 'right':
        return {
          label: 'Right side of package',
          hint: 'Show any side declarations, markings or packaging details clearly',
          guide: 'Fit right side inside box',
        };
    }
  };

  const { label: sideLabel, hint: sideHint, guide: sideGuide } = getSideDetails();

  return (
    <div className="pkg-cam-modal-backdrop">
      <div className="pkg-cam-modal-container">
        {/* Top Header */}
        <div className="pkg-cam-header">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="pkg-cam-close-btn"
              onClick={onClose}
              aria-label="Close camera"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <div>
              <h3 className="pkg-cam-title">{sideLabel}</h3>
              <p className="pkg-cam-sub">{sideHint}</p>
            </div>
          </div>

          {isTorchSupported && (
            <button
              type="button"
              className={`pkg-cam-torch-btn ${isTorchOn ? 'pkg-cam-torch--active' : ''}`}
              onClick={toggleTorch}
              aria-label="Toggle flashlight"
            >
              {isTorchOn ? <Zap className="w-4 h-4 text-[#FBBC04]" /> : <ZapOff className="w-4 h-4 text-white" />}
            </button>
          )}
        </div>

        {/* Live Camera Viewport */}
        <div className="pkg-cam-viewport">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`pkg-cam-video ${cameraState === 'active' ? 'pkg-cam-video--ready' : ''}`}
          />

          {/* Camera Permission / Unavailable Notice */}
          {cameraState === 'denied' && (
            <div className="pkg-cam-notice">
              <ShieldAlert className="w-10 h-10 text-[#F2994A] mb-2" />
              <h4 className="font-semibold text-[15px] text-white">Camera access is unavailable</h4>
              <p className="text-[13px] text-[#9AA0A6] text-center max-w-[240px] mt-1 mb-4 leading-relaxed">
                Allow camera permissions in your browser or upload a photo from your device.
              </p>
              <div className="flex flex-col gap-2 w-full max-w-[220px]">
                <button
                  type="button"
                  className="pkg-cam-btn-primary"
                  onClick={startCamera}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
                <button
                  type="button"
                  className="pkg-cam-btn-secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Upload from device</span>
                </button>
              </div>
            </div>
          )}

          {cameraState === 'requesting' && (
            <div className="pkg-cam-notice">
              <div className="pkg-cam-spinner" />
              <span className="text-[13px] text-white mt-3">Starting camera...</span>
            </div>
          )}

          {cameraState === 'unsupported' && (
            <div className="pkg-cam-notice">
              <Camera className="w-8 h-8 text-[#9AA0A6] mb-2" />
              <h4 className="font-semibold text-[14px] text-white">Camera not available</h4>
              <p className="text-[12px] text-[#9AA0A6] text-center max-w-[220px] mt-1 mb-3">
                Upload a photograph from your device to continue.
              </p>
              <button
                type="button"
                className="pkg-cam-btn-primary"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Upload from device</span>
              </button>
            </div>
          )}

          {/* Framing Guide Scrim */}
          {cameraState === 'active' && (
            <div className="pkg-cam-scrim-guide">
              <div className="pkg-cam-guide-box">
                <span className="pkg-cam-guide-corner pkg-cam-guide-corner--tl" />
                <span className="pkg-cam-guide-corner pkg-cam-guide-corner--tr" />
                <span className="pkg-cam-guide-corner pkg-cam-guide-corner--bl" />
                <span className="pkg-cam-guide-corner pkg-cam-guide-corner--br" />
                <span className="pkg-cam-guide-hint">{sideGuide}</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Shutter Controls */}
        <div className="pkg-cam-footer">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            className="pkg-cam-gallery-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Upload from device"
          >
            <ImageIcon className="w-5 h-5 text-white" />
          </button>

          {/* Large Shutter Button */}
          <button
            type="button"
            className="pkg-cam-shutter-btn"
            onClick={takeSnapshot}
            disabled={cameraState !== 'active'}
            aria-label="Capture photo"
          >
            <div className="pkg-cam-shutter-inner" />
          </button>

          <div className="w-10" />
        </div>
      </div>
    </div>
  );
};
