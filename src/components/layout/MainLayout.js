// frontend/web/src/components/layout/MainLayout.js
import React, { useState } from 'react';
import { WorkflowProvider } from '../../context/WorkflowContext';
import WorkflowGrid from './WorkflowGrid';
import Sidebar from './Sidebar';
import AnalyticsDashboard from '../analytics/AnalyticsDashboard';
import './mainLayout.css';

function MainLayout() {
  const [currentView, setCurrentView] = useState('workflow');

  return (
    <WorkflowProvider>
      <div className="main-layout">
        {/* 侧边栏 */}
        <Sidebar 
          activeView={currentView} 
          onViewChange={setCurrentView} 
        />
        
        {/* 主要内容区域 */}
        <div className="main-content">
          {/* Logo - 只在workflow页面显示 */}
          {currentView === 'workflow' && (
            <img 
              src="/images/logo/logo.JPG" 
              alt="Logo" 
              className="custom-logo"
            />
          )}
          
          {/* 根据当前页面显示不同内容 */}
          {currentView === 'workflow' && <WorkflowGrid />}
          
          {currentView === 'analytics' && <AnalyticsDashboard />}
          
          {currentView === 'history' && (
            <div className="page-content">
              <h1>Content Library</h1>
              <div className="history-container">
                <h2>Generated Content Archive</h2>
                <div className="history-list">
                  <div className="history-item">
                    <div>
                      <h3>Social Media Campaign - Tech Launch</h3>
                      <p>Generated 2 hours ago</p>
                    </div>
                    <button className="history-view-btn">View</button>
                  </div>
                  <div className="history-item">
                    <div>
                      <h3>Blog Article - AI Trends 2025</h3>
                      <p>Generated 4 hours ago</p>
                    </div>
                    <button className="history-view-btn">View</button>
                  </div>
                  <div className="history-item">
                    <div>
                      <h3>Email Newsletter - Product Update</h3>
                      <p>Generated 1 day ago</p>
                    </div>
                    <button className="history-view-btn">View</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </WorkflowProvider>
  );
}

export default MainLayout;