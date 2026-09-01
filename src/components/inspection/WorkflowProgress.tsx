import React from 'react';

interface WorkflowProgressProps {
  currentStep?: number; // default 1
}

const STEPS = [
  { num: '01', label: 'Identify' },
  { num: '02', label: 'Capture' },
  { num: '03', label: 'Analyze' },
  { num: '04', label: 'Validate' },
  { num: '05', label: 'Report' },
];

export const WorkflowProgress: React.FC<WorkflowProgressProps> = ({ currentStep = 1 }) => {
  return (
    <div className="wf-progress-container">
      <div className="wf-progress-track">
        {STEPS.map((s, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div
              key={s.num}
              className={`wf-step-item ${isActive ? 'wf-step-item--active' : ''} ${
                isCompleted ? 'wf-step-item--completed' : ''
              }`}
            >
              <div className="wf-step-badge">
                <span className="wf-step-num">{s.num}</span>
              </div>
              <span className="wf-step-label">{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
