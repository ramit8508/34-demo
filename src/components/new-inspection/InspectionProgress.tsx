import React from 'react';
import { Check } from 'lucide-react';

interface InspectionProgressProps {
  currentStep: number; // 1 = Identify, 2 = Capture, etc.
}

const STEPS = [
  { num: '01', label: 'Identify' },
  { num: '02', label: 'Capture' },
  { num: '03', label: 'Analyze' },
  { num: '04', label: 'Validate' },
  { num: '05', label: 'Report' },
];

export const InspectionProgress: React.FC<InspectionProgressProps> = ({ currentStep }) => {
  return (
    <div className="new-insp-progress-wrapper">
      <div className="new-insp-progress-track">
        {STEPS.map((step, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div
              key={step.num}
              className={`new-insp-step-item ${isActive ? 'new-insp-step--active' : ''} ${
                isCompleted ? 'new-insp-step--completed' : ''
              }`}
            >
              <div className="new-insp-step-badge">
                {isCompleted ? (
                  <Check className="w-3 h-3 text-[#1E8E3E]" />
                ) : (
                  <span>{step.num}</span>
                )}
              </div>
              <span className="new-insp-step-label">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
