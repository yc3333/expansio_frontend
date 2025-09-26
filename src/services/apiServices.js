// frontend/web/src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';


// Helper function for image URL handling
function isDataURL(s) {
  return typeof s === 'string' && s.indexOf('data:') === 0;
}

function absolutize(url) {
  if (url.indexOf('http') === 0) {
    return url;
  }
  return API_BASE_URL + (url.charAt(0) === '/' ? '' : '/') + url;
}

class ApiService {
  // Step 1: 生成专家内容
  static async generateExpertContent(industry, goal) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/industry/generate/expert`, {
        industry,
        goal
      });
      return response.data;
    } catch (error) {
      console.error('Expert content generation failed:', error);
      throw error;
    }
  }

  // Step 2: 风格调整
  static async adjustContentStyle(generatedContent, styleParams) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/industry/adjust-style`, {
        generated_content: generatedContent,
        information_density: styleParams.informationDensity,
        emotional_intensity: styleParams.emotionalIntensity,
        professional_depth: styleParams.professionalDepth,
        ai_naturalness: styleParams.aiNaturalness
      });
      return response.data;
    } catch (error) {
      console.error('Style adjustment failed:', error);
      throw error;
    }
  }

  // Step 3: 生成平台模板内容
  static async generatePlatformContent(content, platform) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/industry/generate-platform-content`, {
        content,
        platform
      });
      return response.data;
    } catch (error) {
      console.error('Platform content generation failed:', error);
      throw error;
    }
  }

  // 保存内容
  static async saveContent(content, contentType, step, metadata = {}) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/industry/save-content`, {
        content,
        content_type: contentType,
        step,
        metadata
      });
      return response.data;
    } catch (error) {
      console.error('Save content failed:', error);
      throw error;
    }
  }

  // 发布内容
  static async publishContent(content, platform, templateType, metadata = {}) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/industry/publish-content`, {
        content,
        platform,
        template_type: templateType,
        metadata
      });
      return response.data;
    } catch (error) {
      console.error('Publish content failed:', error);
      throw error;
    }
  }
  // 图像优化（返回 URL）
  static async enhanceImage(imageUrl, { industry, goal } = {}) {
    if (!imageUrl || typeof imageUrl !== 'string') {
      throw new Error('enhanceImage: imageUrl must be a string');
    }
    if (!industry) {
      throw new Error('enhanceImage: industry is required');
    }

    const isDataUrl = imageUrl.startsWith('data:');
    const isHttpUrl = imageUrl.startsWith('http://') || imageUrl.startsWith('https://');
    if (!isDataUrl && !isHttpUrl) {
      throw new Error('enhanceImage: imageUrl must be a data: URL or http(s) URL');
    }

    const res = await axios.post(
      `${API_BASE_URL}/api/industry/enhance-image`,
      { image: imageUrl, industry, goal },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return {
      originalUrl: absolutize(res.data.originalUrl),
      enhancedImageUrl: absolutize(res.data.enhancedImageUrl),
    };
  }

  // 获取用户历史记录
  static async getUserHistory(page = 1, pageSize = 10) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/industry/history`, {
        params: { page, page_size: pageSize }
      });
      return response.data;
    } catch (error) {
      console.error('Get user history failed:', error);
      throw error;
    }
  }
}

export default ApiService;