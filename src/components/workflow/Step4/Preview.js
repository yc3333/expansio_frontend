// frontend/web/src/components/workflow/Step4/Preview.js
import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Share, ThumbsUp, Repeat2, Download, Save, MoreHorizontal, Upload, X } from 'lucide-react';
import { useWorkflow } from '../../../context/WorkflowContext';
import ApiService from '../../../services/apiServices';
import './preview.css';

const Preview = () => {
  const { state, dispatch, ActionTypes } = useWorkflow();
  
  const [currentTime, setCurrentTime] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const fileInputRef = useRef(null);

  const { selectedPlatform, platformTemplates, selectedTemplate } = state.step3;
  const { finalContent, isSaving, isPublishing } = state.step4;

  const { userInput } = state.step1 || {};
  const industryFromStep1 = userInput?.industry?.trim();
  const goalFromStep1 = userInput?.goal?.trim();

  const platforms = [
    { name: 'LinkedIn', logo: '/images/logos/linkedin.png', color: '#0077b5', id: 'linkedin' },
    { name: 'Instagram', logo: '/images/logos/instagram.png', color: '#e4405f', id: 'instagram' },
    { name: 'RedNote', logo: '/images/logos/rednote.png', color: '#ff2442', id: 'rednote' },
    { name: 'TikTok', logo: '/images/logos/tiktok.png', color: '#000000', id: 'tiktok' }
  ];

  // 移除所有星号的函数
  const removeAsterisks = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/\*/g, '');
  };

  const currentPlatform = platforms[selectedPlatform];
  const currentTemplate = platformTemplates ? platformTemplates[selectedTemplate] : null;
  
  // 获取原始内容并去除星号
  const rawContent = finalContent || currentTemplate?.content || 'No content available';
  const displayContent = removeAsterisks(rawContent);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: false 
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentTemplate && !finalContent) {
      // 在设置 finalContent 时就去掉星号
      const contentWithoutAsterisks = removeAsterisks(currentTemplate.content);
      dispatch({
        type: ActionTypes.SET_FINAL_CONTENT,
        payload: contentWithoutAsterisks
      });
    }
  }, [currentTemplate, finalContent, dispatch, ActionTypes]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setIsImageUploading(true);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setTimeout(() => {
          setUploadedImage(e.target.result);
          setIsImageUploading(false);
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Handler for image enhancement
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleImageEnhancement = async () => {
    if (!uploadedImage) {
      alert('Please upload an image first.');
      return;
    }
    if (!industryFromStep1) {
      alert('Please set the Industry in Step 1 first.');
      return;
    }
    setIsEnhancing(true);
    try {
      const { enhancedImageUrl } = await ApiService.enhanceImage(
        uploadedImage,
        {
          industry: industryFromStep1,
          goal: goalFromStep1 || 'high-CTR social ads',
        }
      );
      const busted = `${enhancedImageUrl}${enhancedImageUrl.includes('?') ? '&' : '?'}t=${Date.now()}`;
      setUploadedImage(busted);
    } finally {
      setIsEnhancing(false);
    }
  };


  const handleSaveToLibrary = async () => {
    if (!displayContent || displayContent === 'No content available') {
      alert('No content to save. Please complete the workflow first.');
      return;
    }

    dispatch({
      type: ActionTypes.SET_STEP4_LOADING,
      payload: { isSaving: true }
    });

    try {
      const metadata = {
        platform: currentPlatform.id,
        template_type: currentTemplate?.template_type || 'custom',
        predicted_engagement: currentTemplate ? {
          likes: currentTemplate.predicted_likes,
          comments: currentTemplate.predicted_comments,
          shares: currentTemplate.predicted_shares,
          bookmarks: currentTemplate.predicted_bookmarks
        } : null,
        has_image: !!uploadedImage
      };

      // 保存去除星号后的内容
      const response = await ApiService.saveContent(
        displayContent,
        'final_content',
        'step4',
        metadata
      );

      if (response.success) {
        alert('Content saved to library successfully!');
      } else {
        throw new Error(response.message || 'Save failed');
      }
    } catch (error) {
      console.error('Save error:', error);
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: error.response?.data?.message || error.message || 'Failed to save content'
      });
      alert('Failed to save content. Please try again.');
    } finally {
      dispatch({
        type: ActionTypes.SET_STEP4_LOADING,
        payload: { isSaving: false }
      });
    }
  };

  const handlePublishNow = async () => {
    if (!displayContent || displayContent === 'No content available') {
      alert('No content to publish. Please complete the workflow first.');
      return;
    }

    dispatch({
      type: ActionTypes.SET_STEP4_LOADING,
      payload: { isPublishing: true }
    });

    try {
      const metadata = {
        predicted_engagement: currentTemplate ? {
          likes: currentTemplate.predicted_likes,
          comments: currentTemplate.predicted_comments,
          shares: currentTemplate.predicted_shares,
          bookmarks: currentTemplate.predicted_bookmarks
        } : null,
        has_image: !!uploadedImage,
        publish_time: new Date().toISOString()
      };

      // 发布去除星号后的内容
      const response = await ApiService.publishContent(
        displayContent,
        currentPlatform.id,
        currentTemplate?.template_type || 'custom',
        metadata
      );

      if (response.success) {
        alert(`Content published to ${currentPlatform.name} successfully!`);
      } else {
        throw new Error(response.message || 'Publish failed');
      }
    } catch (error) {
      console.error('Publish error:', error);
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: error.response?.data?.message || error.message || 'Failed to publish content'
      });
      alert('Failed to publish content. Please try again.');
    } finally {
      dispatch({
        type: ActionTypes.SET_STEP4_LOADING,
        payload: { isPublishing: false }
      });
    }
  };

  const renderImageUploadArea = () => {
    if (isImageUploading) {
      return (
        <div className="image-uploading">
          <div className="upload-spinner"></div>
          <span>Uploading...</span>
        </div>
      );
    }

    if (uploadedImage) {
      return (
        <div className="uploaded-image-container">
          <img src={uploadedImage} alt="Uploaded content" className="uploaded-image" />
          <button className="remove-image-btn" onClick={removeUploadedImage}>
            <X size={16} />
          </button>
        </div>
      );
    }

    return (
      <div className="image-upload-placeholder" onClick={triggerFileSelect}>
        <Upload size={24} />
        <span>Click to upload image</span>
      </div>
    );
  };

  const renderLinkedInPost = () => {
    return (
      <div className="linkedin-post">
        <div className="linkedin-header">
          <div className="linkedin-avatar">
            <div className="avatar-placeholder">E</div>
          </div>
          <div className="linkedin-user-info">
            <div className="linkedin-name">EXPANSIO AI</div>
            <div className="linkedin-title">AI Content Creation Platform</div>
            <div className="linkedin-time">2h • 🌍</div>
          </div>
          <div className="linkedin-menu">
            <MoreHorizontal size={20} />
          </div>
        </div>
        
        <div className="linkedin-content">
          <p>{displayContent.replace(/\*/g, '')}</p>
        </div>
        
        <div className="linkedin-image">
          {renderImageUploadArea()}
        </div>
        
        <div className="linkedin-engagement">
          <div className="linkedin-stats">
            <div className="reaction-summary">
              <div className="reaction-icons">
                <span className="reaction-icon like">👍</span>
                <span className="reaction-icon love">❤️</span>
                <span className="reaction-icon insight">💡</span>
              </div>
              <span className="reaction-count">
                {currentTemplate?.predicted_likes?.toLocaleString() || '1,247'}
              </span>
            </div>
            <div className="engagement-counts">
              <span className="count-item">{currentTemplate?.predicted_comments || '89'} comments</span>
              <span className="count-separator">•</span>
              <span className="count-item">{currentTemplate?.predicted_shares || '56'} reposts</span>
            </div>
          </div>
        </div>
        
        <div className="linkedin-actions">
          <button className="linkedin-action-btn">
            <ThumbsUp size={20} />
            <span>Like</span>
          </button>
          <button className="linkedin-action-btn">
            <MessageCircle size={20} />
            <span>Comment</span>
          </button>
          <button className="linkedin-action-btn">
            <Repeat2 size={20} />
            <span>Repost</span>
          </button>
          <button className="linkedin-action-btn">
            <Send size={20} />
            <span>Send</span>
          </button>
        </div>
      </div>
    );
  };

  const renderInstagramPost = () => {
    return (
      <div className="instagram-post">
        <div className="instagram-header">
          <div className="instagram-avatar">
            <div className="avatar-placeholder">E</div>
          </div>
          <div className="instagram-user-info">
            <div className="instagram-username">expansio_ai</div>
            <div className="instagram-location">Tech Hub</div>
          </div>
          <div className="instagram-menu">⋯</div>
        </div>
        
        <div className="instagram-image">
          {renderImageUploadArea()}
        </div>
        
        <div className="instagram-actions">
          <div className="action-left">
            <Heart size={20} />
            <MessageCircle size={20} />
            <Send size={20} />
          </div>
          <div className="action-right">
            <Bookmark size={20} />
          </div>
        </div>
        
        <div className="instagram-content">
          <div className="instagram-likes">
            <strong>{currentTemplate?.predicted_likes?.toLocaleString() || '1,247'} likes</strong>
          </div>
          <div className="instagram-caption">
            <span className="username">expansio_ai</span> {displayContent.replace(/\*/g, '')}
          </div>
          <div className="instagram-comments-link">
            View all {currentTemplate?.predicted_comments || '89'} comments
          </div>
        </div>
      </div>
    );
  };

  const renderRedNotePost = () => {
    return (
      <div className="rednote-post">
        <div className="rednote-header">
          <div className="rednote-avatar">
            <div className="avatar-placeholder">E</div>
          </div>
          <div className="rednote-user-info">
            <div className="rednote-username">EXPANSIO AI</div>
            <div className="rednote-time">2h ago</div>
          </div>
          <div className="rednote-follow">+ Follow</div>
        </div>
        
        <div className="rednote-image">
          {renderImageUploadArea()}
        </div>
        
        <div className="rednote-actions">
          <div className="action-left">
            <div className="rednote-action">
              <Heart size={18} />
              <span>{currentTemplate?.predicted_likes?.toLocaleString() || '1,247'}</span>
            </div>
            <div className="rednote-action">
              <MessageCircle size={18} />
              <span>{currentTemplate?.predicted_comments || '89'}</span>
            </div>
            <div className="rednote-action">
              <Share size={18} />
              <span>{currentTemplate?.predicted_shares || '56'}</span>
            </div>
          </div>
          <div className="action-right">
            <div className="rednote-action">
              <Bookmark size={18} />
              <span>{currentTemplate?.predicted_bookmarks || '234'}</span>
            </div>
          </div>
        </div>
        
        <div className="rednote-content">
          <div className="rednote-description">{displayContent.replace(/\*/g, '')}</div>
        </div>
      </div>
    );
  };

  const renderTikTokPost = () => {
    return (
      <div className="tiktok-post">
        <div className="tiktok-video-container">
          {renderImageUploadArea()}
          
          {/* TikTok右侧操作按钮 */}
          <div className="tiktok-actions">
            <div className="tiktok-action">
              <div className="tiktok-avatar">
                <div className="avatar-placeholder">E</div>
              </div>
              <div className="tiktok-follow-btn">+</div>
            </div>
            
            <div className="tiktok-action">
              <Heart size={24} />
              <span>{currentTemplate?.predicted_likes?.toLocaleString() || '1.2K'}</span>
            </div>
            
            <div className="tiktok-action">
              <MessageCircle size={24} />
              <span>{currentTemplate?.predicted_comments || '89'}</span>
            </div>
            
            <div className="tiktok-action">
              <Share size={24} />
              <span>{currentTemplate?.predicted_shares || '56'}</span>
            </div>
            
            <div className="tiktok-action">
              <Bookmark size={24} />
              <span>{currentTemplate?.predicted_bookmarks || '234'}</span>
            </div>
            
            <div className="tiktok-action">
              <Repeat2 size={24} />
              <span>Remix</span>
            </div>
          </div>
        </div>
        
        {/* TikTok底部内容区域 */}
        <div className="tiktok-content">
          <div className="tiktok-user-info">
            <span className="tiktok-username">@expansio_ai</span>
            <span className="tiktok-verified">✓</span>
          </div>
          
          <div className="tiktok-caption">
            {displayContent.replace(/\*/g, '')}
          </div>
          
          <div className="tiktok-music">
            <span className="music-icon">🎵</span>
            <span className="music-text">Original Sound - Expansio AI</span>
          </div>
          
          <div className="tiktok-hashtags">
            #expansio #ai #content #viral
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentPost = () => {
    switch (selectedPlatform) {
      case 0:
        return renderLinkedInPost();
      case 1:
        return renderInstagramPost();
      case 2:
        return renderRedNotePost();
      case 3:
        return renderTikTokPost();
      default:
        return renderLinkedInPost();
    }
  };

  return (
    <>
      <div className="step-header">
        <h3>Step 4</h3>
        <p>Content Preview</p>
      </div>
      
      <div className="preview-content">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />

        <div className="phone-mockup">
          <div className="phone-frame">
            <div className="phone-screen">
              <div className="phone-status-bar">
                <div className="status-center">{currentTime}</div>
              </div>
              <div className="phone-content">
                {renderCurrentPost()}
              </div>
            </div>
          </div>
        </div>

        <div className="enhance-action">
          <button
            className={`action-btn export${isEnhancing ? ' disabled' : ''}`}
            onClick={handleImageEnhancement}
            disabled={isEnhancing || !uploadedImage}
          >
            {isEnhancing ? (
              <>
                <span className="spinner"></span>
                Enhancing...
              </>
            ) : (
              <>Image Enhancement</>
            )}
          </button>
      </div>

        <div className="preview-actions">
          <button 
            className={`action-btn export ${isSaving || isPublishing ? 'disabled' : ''}`}
            onClick={() => {
              const blob = new Blob([displayContent], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `content_${currentPlatform.name}_${Date.now()}.txt`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            disabled={isSaving || isPublishing || displayContent === 'No content available'}
          >
            <Download size={16} />
            Export Content
          </button>
          
          <button 
            className={`action-btn save ${isSaving || isPublishing ? 'disabled' : ''}`}
            onClick={handleSaveToLibrary}
            disabled={isSaving || isPublishing || displayContent === 'No content available'}
          >
            {isSaving ? (
              <>
                <span className="spinner"></span>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save to Library
              </>
            )}
          </button>
        </div>

        <div className="publish-section">
          <div className="publish-header">
            <span className="publish-title">One-Click Publish</span>
            <span className="publish-subtitle">Direct publishing to selected platform</span>
          </div>
          
          <div className="publish-action">
            <div className="platform-publish-info">
              <div className="platform-logo-simple">
                <img 
                  src={currentPlatform.logo} 
                  alt={currentPlatform.name}
                  className="publish-platform-logo"
                />
              </div>
              <div className="platform-info">
                <span className="platform-name">{currentPlatform.name}</span>
                <span className="publish-ready">Ready to publish</span>
              </div>
            </div>
            
            <button 
              className={`publish-btn ${isPublishing || isSaving || displayContent === 'No content available' ? 'disabled' : ''}`}
              onClick={handlePublishNow}
              disabled={isPublishing || isSaving || displayContent === 'No content available'}
              style={{'--platform-color': currentPlatform.color}}
            >
              {isPublishing ? (
                <>
                  <span className="spinner"></span>
                  Publishing...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Publish Now
                </>
              )}
            </button>
          </div>
        </div>

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

export default Preview;