// frontend/web/src/components/workflow/Step1/ContentGenerator.js
import React, { useState, useRef, useEffect } from 'react';
import { useWorkflow } from '../../../context/WorkflowContext';
import ApiService from '../../../services/apiServices';
import './contentGenerator.css';

const ContentGenerator = () => {
  const { state, dispatch, ActionTypes } = useWorkflow();
  const [industry, setIndustry] = useState(state.step1.userInput.industry);
  const [goal, setGoal] = useState(state.step1.userInput.goal);
  const textareaRef = useRef(null);

  // 自动调整文本框高度
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 400) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [goal]);

  const handleInputChange = (field, value) => {
    if (field === 'industry') {
      setIndustry(value);
    } else if (field === 'goal') {
      setGoal(value);
    }
    
    // 更新状态
    dispatch({
      type: ActionTypes.SET_USER_INPUT,
      payload: {
        industry: field === 'industry' ? value : industry,
        goal: field === 'goal' ? value : goal
      }
    });
  };

  const handleGenerate = async () => {
    if (!industry.trim() || !goal.trim()) {
      alert('Please enter both industry and goal information!');
      return;
    }

    dispatch({
      type: ActionTypes.SET_STEP1_LOADING,
      payload: { isGenerating: true }
    });

    try {
      const response = await ApiService.generateExpertContent(industry.trim(), goal.trim());
      
      if (response.success) {
        dispatch({
          type: ActionTypes.SET_GENERATED_CONTENT,
          payload: response.content
        });
        
        alert('Content generated successfully! Check Step 2 for the results.');
      } else {
        throw new Error(response.message || 'Generation failed');
      }
    } catch (error) {
      console.error('Generation error:', error);
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: error.response?.data?.message || error.message || 'Content generation failed'
      });
      alert('Content generation failed. Please try again.');
    } finally {
      dispatch({
        type: ActionTypes.SET_STEP1_LOADING,
        payload: { isGenerating: false }
      });
    }
  };

  const handleSaveIdea = async () => {
    if (!industry.trim() || !goal.trim()) {
      alert('Please enter both industry and goal information!');
      return;
    }

    dispatch({
      type: ActionTypes.SET_STEP1_LOADING,
      payload: { isSaving: true }
    });

    try {
      const ideaContent = `Industry: ${industry}\nGoal: ${goal}`;
      const response = await ApiService.saveContent(
        ideaContent, 
        'idea', 
        'step1', 
        { industry, goal }
      );
      
      if (response.success) {
        alert('Idea saved successfully!');
      } else {
        throw new Error(response.message || 'Save failed');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save idea. Please try again.');
    } finally {
      dispatch({
        type: ActionTypes.SET_STEP1_LOADING,
        payload: { isSaving: false }
      });
    }
  };

  const { isGenerating, isSaving } = state.step1;

  return (
    <>
      <div className="content-generator-header">
        <h3>Step 1</h3>
        <p>Content Intent</p>
      </div>
      
      <div className="content-generator-content">
        <label className="content-generator-label">
          Industry/Field:
        </label>
        <input
          type="text"
          className="content-generator-input"
          placeholder="e.g., Technology, Marketing, Healthcare..."
          value={industry}
          onChange={(e) => handleInputChange('industry', e.target.value)}
          disabled={isGenerating || isSaving}
        />
        
        <label className="content-generator-label">
          Goal/Objective:
        </label>
        <textarea
          ref={textareaRef}
          className="content-generator-textarea"
          placeholder="Describe your content goal...

For example: 'Create a social media post about our new AI product launch targeting tech entrepreneurs and showcase the key benefits of automation in content creation.'"
          value={goal}
          onChange={(e) => handleInputChange('goal', e.target.value)}
          disabled={isGenerating || isSaving}
        />
        
        <div className="button-group">
          <button 
            className={`content-generator-btn generate-btn ${isGenerating ? 'generating' : ''}`}
            onClick={handleGenerate}
            disabled={isGenerating || isSaving}
          >
            {isGenerating ? (
              <>
                <span className="spinner"></span>
                Generating...
              </>
            ) : (
              'Generate Content'
            )}
          </button>
          
          <button 
            className={`content-generator-btn save-btn ${isSaving ? 'saving' : ''}`}
            onClick={handleSaveIdea}
            disabled={isGenerating || isSaving}
          >
            {isSaving ? (
              <>
                <span className="spinner"></span>
                Saving...
              </>
            ) : (
              'Save Idea'
            )}
          </button>
        </div>

        {/* 错误显示 */}
        {state.error && (
          <div className="error-message">
            <p>{state.error}</p>
            <button onClick={() => dispatch({ type: ActionTypes.CLEAR_ERROR })}>
              ✕
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ContentGenerator;