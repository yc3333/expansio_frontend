// ===== 第一步：创建 Sidebar.js 文件 =====
import React, { useState } from 'react';
import { Home, BarChart3, History, ChevronRight, ChevronLeft } from 'lucide-react';
import './sidebar.css';

const Sidebar = ({ activeView, onViewChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    {
      id: 'workflow',
      name: 'AI Workflow',
      icon: Home,
      description: 'Content Generation Studio'
    },
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      icon: BarChart3,
      description: 'Content Performance Metrics'
    },
    {
      id: 'history',
      name: 'Content Library',
      icon: History,
      description: 'Generated Content Archive'
    }
  ];

  return (
    <div 
      className={`sidebar ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="sidebar-toggle"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Logo Area */}
      <div className="sidebar-logo">
        <img 
          src="/images/logo/logo.JPG" 
          alt="Logo" 
          className="sidebar-logo-img"
        />
        {isExpanded && <span className="sidebar-logo-text">EXPANSIO</span>}
      </div>

      {/* Menu Items */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
            >
              <IconComponent size={20} className="sidebar-item-icon" />
              {isExpanded && (
                <div className="sidebar-item-text">
                  <span className="sidebar-item-name">{item.name}</span>
                  <span className="sidebar-item-desc">{item.description}</span>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {isExpanded && (
        <div className="sidebar-footer">
          <div className="sidebar-status">
            <div className="sidebar-status-dot"></div>
            <span>AI Engine Active</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;