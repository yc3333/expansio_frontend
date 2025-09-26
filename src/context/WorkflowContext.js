// frontend/web/src/context/WorkflowContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Action 类型
export const ActionTypes = {
  // Step 1 Actions
  SET_USER_INPUT: 'SET_USER_INPUT',
  SET_GENERATED_CONTENT: 'SET_GENERATED_CONTENT',
  SET_STEP1_LOADING: 'SET_STEP1_LOADING',
  
  // Step 2 Actions
  SET_CURRENT_CONTENT: 'SET_CURRENT_CONTENT',
  SET_STYLE_SETTINGS: 'SET_STYLE_SETTINGS',
  SET_STEP2_LOADING: 'SET_STEP2_LOADING',
  
  // Step 3 Actions
  SET_SELECTED_PLATFORM: 'SET_SELECTED_PLATFORM',
  SET_PLATFORM_TEMPLATES: 'SET_PLATFORM_TEMPLATES',
  SET_STEP3_LOADING: 'SET_STEP3_LOADING',
  SET_SELECTED_TEMPLATE: 'SET_SELECTED_TEMPLATE',
  SET_PLATFORM_ADAPTATION_TRIGGERED: 'SET_PLATFORM_ADAPTATION_TRIGGERED', // 新增
  
  // Step 4 Actions
  SET_FINAL_CONTENT: 'SET_FINAL_CONTENT',
  SET_STEP4_LOADING: 'SET_STEP4_LOADING',
  
  // 全局 Actions
  SET_CURRENT_STEP: 'SET_CURRENT_STEP',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// 初始状态
const initialState = {
  // Step 1 数据
  step1: {
    userInput: {
      industry: '',
      goal: ''
    },
    generatedContent: '',
    isGenerating: false,
    isSaving: false
  },
  
  // Step 2 数据
  step2: {
    currentContent: '',
    styleSettings: {
      informationDensity: 75,
      emotionalIntensity: 60,
      professionalDepth: 80,
      aiNaturalness: 70
    },
    isAdjusting: false
  },
  
  // Step 3 数据
  step3: {
    selectedPlatform: 0, // 0: linkedin, 1: instagram, 2: rednote
    platformTemplates: null,
    isGeneratingTemplates: false,
    selectedTemplate: 0,
    adaptationTriggered: false // 新增：标记是否已触发平台适配
  },
  
  // Step 4 数据
  step4: {
    finalContent: '',
    isSaving: false,
    isPublishing: false
  },
  
  // 全局状态
  currentStep: 1,
  error: null
};

// Reducer
function workflowReducer(state, action) {
  switch (action.type) {
    // Step 1 处理
    case ActionTypes.SET_USER_INPUT:
      return {
        ...state,
        step1: {
          ...state.step1,
          userInput: action.payload
        }
      };
    
    case ActionTypes.SET_GENERATED_CONTENT:
      return {
        ...state,
        step1: {
          ...state.step1,
          generatedContent: action.payload
        },
        step2: {
          ...state.step2,
          currentContent: action.payload
        }
      };
    
    case ActionTypes.SET_STEP1_LOADING:
      return {
        ...state,
        step1: {
          ...state.step1,
          isGenerating: action.payload.isGenerating || false,
          isSaving: action.payload.isSaving || false
        }
      };
    
    // Step 2 处理
    case ActionTypes.SET_CURRENT_CONTENT:
      return {
        ...state,
        step2: {
          ...state.step2,
          currentContent: action.payload
        }
      };
    
    case ActionTypes.SET_STYLE_SETTINGS:
      return {
        ...state,
        step2: {
          ...state.step2,
          styleSettings: {
            ...state.step2.styleSettings,
            ...action.payload
          }
        }
      };
    
    case ActionTypes.SET_STEP2_LOADING:
      return {
        ...state,
        step2: {
          ...state.step2,
          isAdjusting: action.payload
        }
      };
    
    // Step 3 处理
    case ActionTypes.SET_SELECTED_PLATFORM:
      return {
        ...state,
        step3: {
          ...state.step3,
          selectedPlatform: action.payload
        }
      };
    
    case ActionTypes.SET_PLATFORM_TEMPLATES:
      return {
        ...state,
        step3: {
          ...state.step3,
          platformTemplates: action.payload,
          adaptationTriggered: true // 当模板生成时，标记为已触发
        }
      };
    
    case ActionTypes.SET_STEP3_LOADING:
      return {
        ...state,
        step3: {
          ...state.step3,
          isGeneratingTemplates: action.payload
        }
      };
    
    case ActionTypes.SET_SELECTED_TEMPLATE:
      return {
        ...state,
        step3: {
          ...state.step3,
          selectedTemplate: action.payload
        }
      };

    case ActionTypes.SET_PLATFORM_ADAPTATION_TRIGGERED:
      return {
        ...state,
        step3: {
          ...state.step3,
          adaptationTriggered: action.payload
        }
      };
    
    // Step 4 处理
    case ActionTypes.SET_FINAL_CONTENT:
      return {
        ...state,
        step4: {
          ...state.step4,
          finalContent: action.payload
        }
      };
    
    case ActionTypes.SET_STEP4_LOADING:
      return {
        ...state,
        step4: {
          ...state.step4,
          isSaving: action.payload.isSaving || false,
          isPublishing: action.payload.isPublishing || false
        }
      };
    
    // 全局处理
    case ActionTypes.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload
      };
    
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
}

// Context
const WorkflowContext = createContext(null);

// Provider组件
export const WorkflowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workflowReducer, initialState);

  const value = {
    state,
    dispatch,
    ActionTypes
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
};

// Hook
export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};