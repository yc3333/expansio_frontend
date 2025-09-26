// frontend/web/src/components/layout/WorkflowGrid.js
import React from 'react';
import ContentGenerator from '../workflow/Step1/ContentGenerator';
import StyleSettings from '../workflow/Step2/StyleSettings';
import PlatformAdaptation from '../workflow/Step3/PlatformAdaptation';
import Preview from '../workflow/Step4/Preview';
import './workflowGrid.css';

function WorkflowGrid() {
  return (
    <div className="workflow-grid">
      {/* Step 1 - Content Intent */}
      <div className="workflow-column">
        <ContentGenerator />
      </div>
      
      {/* Step 2 - Style Settings */}
      <div className="workflow-column">
        <StyleSettings />
      </div>
      
      {/* Step 3 - Platform Adaptation */}
      <div className="workflow-column">
        <PlatformAdaptation />
      </div>
      
      {/* Step 4 - Content Preview */}
      <div className="workflow-column">
        <Preview />
      </div>
    </div>
  );
}

export default WorkflowGrid;