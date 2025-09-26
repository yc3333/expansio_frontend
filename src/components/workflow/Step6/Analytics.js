import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark, 
  Target, 
  Zap,
  BarChart3,
  Activity,
  TrendingDown,
  TrendingUp as TrendingUpIcon,
  Users,
  Clock,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { useWorkflow } from '../../../context/WorkflowContext';
import './step6.css';

const Analytics = () => {
  const { state } = useWorkflow();
  const [viralForecast, setViralForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  // 模拟Viral Forecast Engine数据
  const generateViralForecast = (content, platform, templateType) => {
    // 基于内容、平台和模板类型生成预测数据
    const baseMetrics = {
      ctr: Math.random() * 0.15 + 0.02, // 2-17% CTR
      er: Math.random() * 0.12 + 0.03,  // 3-15% ER
      saves: Math.random() * 0.25 + 0.05, // 5-30% saves
      hitProbability: Math.random() * 0.4 + 0.1 // 10-50% hit probability
    };

    // 平台调整因子
    const platformFactors = {
      linkedin: { ctr: 1.2, er: 1.1, saves: 1.3, hitProbability: 1.1 },
      instagram: { ctr: 1.0, er: 1.2, saves: 1.1, hitProbability: 1.0 },
      rednote: { ctr: 0.9, er: 1.0, saves: 0.9, hitProbability: 0.9 },
      tiktok: { ctr: 1.3, er: 1.4, saves: 1.2, hitProbability: 1.3 }
    };

    // 模板类型调整因子
    const templateFactors = {
      knowledge_sharing: { ctr: 1.1, er: 1.0, saves: 1.2, hitProbability: 1.1 },
      suspense_creation: { ctr: 1.3, er: 1.2, saves: 1.1, hitProbability: 1.2 },
      diary_sharing: { ctr: 0.9, er: 1.1, saves: 1.0, hitProbability: 0.9 },
      question_guided: { ctr: 1.2, er: 1.3, saves: 1.1, hitProbability: 1.1 }
    };

    const factor = platformFactors[platform] || platformFactors.instagram;
    const templateFactor = templateFactors[templateType] || templateFactors.knowledge_sharing;

    return {
      ctr: (baseMetrics.ctr * factor.ctr * templateFactor.ctr * 100).toFixed(2),
      er: (baseMetrics.er * factor.er * templateFactor.er * 100).toFixed(2),
      saves: (baseMetrics.saves * factor.saves * templateFactor.saves * 100).toFixed(2),
      hitProbability: (baseMetrics.hitProbability * factor.hitProbability * templateFactor.hitProbability * 100).toFixed(2),
      confidence: Math.floor(Math.random() * 20 + 80), // 80-100% confidence
      trendingKeywords: generateTrendingKeywords(),
      ugcInsights: generateUGCInsights(),
      recommendations: generateRecommendations()
    };
  };

  const generateTrendingKeywords = () => {
    const keywords = [
      'AI content', 'viral trends', 'social media', 'digital marketing',
      'content strategy', 'engagement', 'brand awareness', 'user generated content',
      'influencer marketing', 'viral content', 'social proof', 'authenticity'
    ];
    return keywords.sort(() => Math.random() - 0.5).slice(0, 6);
  };

  const generateUGCInsights = () => {
    return {
      totalPosts: Math.floor(Math.random() * 10000 + 5000),
      avgEngagement: (Math.random() * 15 + 5).toFixed(2),
      topPerformingType: ['video', 'image', 'carousel', 'story'][Math.floor(Math.random() * 4)],
      peakPostingTime: ['9 AM', '12 PM', '3 PM', '6 PM', '9 PM'][Math.floor(Math.random() * 5)]
    };
  };

  const generateRecommendations = () => {
    return [
      'Optimize posting time to 6 PM for maximum engagement',
      'Include trending hashtags: #AI #content #viral',
      'Use video format for 40% higher engagement',
      'Add call-to-action buttons to increase CTR by 25%',
      'Post on Tuesday and Thursday for best performance'
    ];
  };

  useEffect(() => {
    if (state.step3.platformTemplates && state.step3.selectedTemplate !== undefined) {
      setIsLoading(true);
      
      // 模拟API调用延迟
      setTimeout(() => {
        const currentTemplate = state.step3.platformTemplates[state.step3.selectedTemplate];
        const platforms = ['linkedin', 'instagram', 'rednote', 'tiktok'];
        const currentPlatform = platforms[state.step3.selectedPlatform];
        
        const forecast = generateViralForecast(
          state.step4.finalContent,
          currentPlatform,
          currentTemplate?.template_type
        );
        
        setViralForecast(forecast);
        setIsLoading(false);
      }, 1500);
    }
  }, [state.step3.platformTemplates, state.step3.selectedTemplate, state.step3.selectedPlatform, state.step4.finalContent]);

  const getMetricColor = (value, type) => {
    const numValue = parseFloat(value);
    if (type === 'hitProbability') {
      if (numValue >= 30) return '#10b981'; // green
      if (numValue >= 20) return '#f59e0b'; // yellow
      return '#ef4444'; // red
    }
    if (numValue >= 10) return '#10b981';
    if (numValue >= 5) return '#f59e0b';
    return '#ef4444';
  };

  const getTrendIcon = (value) => {
    const numValue = parseFloat(value);
    if (numValue >= 10) return <TrendingUpIcon className="trend-up" />;
    if (numValue >= 5) return <Activity className="trend-stable" />;
    return <TrendingDown className="trend-down" />;
  };

  if (isLoading) {
    return (
      <div className="analytics-container">
        <div className="analytics-header">
          <h3>Step 6</h3>
          <p>Analytics Dashboard</p>
        </div>
        <div className="loading-container">
          <RefreshCw className="loading-spinner" />
          <p>Analyzing viral potential...</p>
        </div>
      </div>
    );
  }

  if (!viralForecast) {
    return (
      <div className="analytics-container">
        <div className="analytics-header">
          <h3>Step 6</h3>
          <p>Analytics Dashboard</p>
        </div>
        <div className="no-data-container">
          <BarChart3 size={48} />
          <p>Complete previous steps to generate analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h3>Step 6</h3>
        <p>Analytics Dashboard</p>
      </div>

      <div className="analytics-content">
        {/* Viral Forecast Engine Section */}
        <div className="viral-forecast-section">
          <div className="section-header">
            <div className="section-title">
              <Zap className="section-icon" />
              <h4>Viral Forecast Engine</h4>
            </div>
            <div className="confidence-badge">
              <Target size={16} />
              <span>{viralForecast.confidence}% Confidence</span>
            </div>
          </div>
          
          <div className="forecast-description">
            <p>AI-powered analysis of past UGC + trending keywords → Predicts viral potential</p>
          </div>

          {/* Key Metrics Grid */}
          <div className="metrics-grid">
            <div className="metric-card ctr">
              <div className="metric-header">
                <Eye className="metric-icon" />
                <span className="metric-label">CTR (Click-Through Rate)</span>
                {getTrendIcon(viralForecast.ctr)}
              </div>
              <div className="metric-value" style={{ color: getMetricColor(viralForecast.ctr, 'ctr') }}>
                {viralForecast.ctr}%
              </div>
              <div className="metric-description">
                Expected click-through rate based on content analysis
              </div>
            </div>

            <div className="metric-card er">
              <div className="metric-header">
                <Users className="metric-icon" />
                <span className="metric-label">ER (Engagement Rate)</span>
                {getTrendIcon(viralForecast.er)}
              </div>
              <div className="metric-value" style={{ color: getMetricColor(viralForecast.er, 'er') }}>
                {viralForecast.er}%
              </div>
              <div className="metric-description">
                Predicted engagement rate from likes, comments, shares
              </div>
            </div>

            <div className="metric-card saves">
              <div className="metric-header">
                <Bookmark className="metric-icon" />
                <span className="metric-label">Saves Rate</span>
                {getTrendIcon(viralForecast.saves)}
              </div>
              <div className="metric-value" style={{ color: getMetricColor(viralForecast.saves, 'saves') }}>
                {viralForecast.saves}%
              </div>
              <div className="metric-description">
                Expected save/bookmark rate indicating content value
              </div>
            </div>

            <div className="metric-card hit-probability">
              <div className="metric-header">
                <Target className="metric-icon" />
                <span className="metric-label">Hit Probability</span>
                {getTrendIcon(viralForecast.hitProbability)}
              </div>
              <div className="metric-value" style={{ color: getMetricColor(viralForecast.hitProbability, 'hitProbability') }}>
                {viralForecast.hitProbability}%
              </div>
              <div className="metric-description">
                Probability of content going viral based on current trends
              </div>
            </div>
          </div>
        </div>

        {/* Trending Keywords Section */}
        <div className="trending-section">
          <div className="section-header">
            <TrendingUp className="section-icon" />
            <h4>Trending Keywords Analysis</h4>
          </div>
          <div className="keywords-grid">
            {viralForecast.trendingKeywords.map((keyword, index) => (
              <div key={index} className="keyword-tag">
                #{keyword}
              </div>
            ))}
          </div>
        </div>

        {/* UGC Insights Section */}
        <div className="ugc-insights-section">
          <div className="section-header">
            <BarChart3 className="section-icon" />
            <h4>UGC Performance Insights</h4>
          </div>
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-value">{viralForecast.ugcInsights.totalPosts.toLocaleString()}</div>
              <div className="insight-label">Total Posts Analyzed</div>
            </div>
            <div className="insight-card">
              <div className="insight-value">{viralForecast.ugcInsights.avgEngagement}%</div>
              <div className="insight-label">Avg Engagement Rate</div>
            </div>
            <div className="insight-card">
              <div className="insight-value">{viralForecast.ugcInsights.topPerformingType}</div>
              <div className="insight-label">Top Content Type</div>
            </div>
            <div className="insight-card">
              <div className="insight-value">{viralForecast.ugcInsights.peakPostingTime}</div>
              <div className="insight-label">Peak Posting Time</div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="recommendations-section">
          <div className="section-header">
            <Target className="section-icon" />
            <h4>AI Recommendations</h4>
          </div>
          <div className="recommendations-list">
            {viralForecast.recommendations.map((recommendation, index) => (
              <div key={index} className="recommendation-item">
                <div className="recommendation-bullet">•</div>
                <span>{recommendation}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="analytics-actions">
          <button className="action-btn export-btn">
            <Download size={16} />
            Export Report
          </button>
          <button className="action-btn refresh-btn" onClick={() => window.location.reload()}>
            <RefreshCw size={16} />
            Refresh Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
