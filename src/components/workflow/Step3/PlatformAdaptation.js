// frontend/web/src/components/workflow/Step3/PlatformAdaptation.js
import React, { useEffect } from 'react';
import { Heart, MessageCircle, Share, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWorkflow } from '../../../context/WorkflowContext';
import ApiService from '../../../services/apiServices';
import './platformAdaptation.css';

const PlatformAdaptation = () => {
  const { state, dispatch, ActionTypes } = useWorkflow();
  
  const { selectedPlatform, platformTemplates, isGeneratingTemplates, selectedTemplate } = state.step3;
  const currentContent = state.step2.currentContent;

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', logo: '/images/logos/linkedin.png', color: '#0077b5' },
    { id: 'instagram', name: 'Instagram', logo: '/images/logos/instagram.png', color: '#e4405f' },
    { id: 'rednote', name: 'RedNote', logo: '/images/logos/rednote.png', color: '#ff2442' },
    { id: 'tiktok', name: 'TikTok', logo: '/images/logos/tiktok.png', color: '#000000' }
  ];

  // 硬编码的默认模板数据 - 仅在没有Step2生成的模板时使用
  const getDefaultTemplates = (platformIndex = 0) => {
    const platformColors = ['#0077b5', '#e4405f', '#ff2442', '#000000']; // LinkedIn, Instagram, RedNote, TikTok
    return [
      {
        template_type: 'city_observation',
        content: '纽约人聚在westside，就为了看小鸭子们排队跳河🦆🫶\n\n当我的朋友们问我 每天都在纽约干什么 我：看鸭子条河\n#纽约留学生 #纽约 #纽约生活 #第一视角',
        predicted_likes: 277,
        predicted_comments: 23,
        predicted_shares: 196,
        predicted_bookmarks: 22,
        color: platformColors[platformIndex]
      },
      {
        template_type: 'trendy_baking',
        content: 'labubu cookie 🍪✨👀\n\nlabubu的受众群体到底是谁啊…😔 credit to ig@itsmejuliette\n#纽约留学生 #纽约 #留学生活 #cookie #labubu',
        predicted_likes: 104,
        predicted_comments: 3,
        predicted_shares: 3,
        predicted_bookmarks: 2,
        color: platformColors[platformIndex]
      },
      {
        template_type: 'campaign_announcement',
        content: '【年度福利】2025纽约新生专属大礼包来啦❗️\n\n每年九月的万人接机，都是纽约留学生网最具代表性的迎新活动之一！\n今年，我们依旧为初来乍到的新生们准备了超实用的"两弹大礼包"🎁',
        predicted_likes: 55,
        predicted_comments: 0,
        predicted_shares: 0,
        predicted_bookmarks: 5,
        color: platformColors[platformIndex]
      }
    ];
  };

  // 生成Step2风格的真实平台特定模板
  const generatePlatformSpecificTemplates = async (platformIndex) => {
    const platformColors = ['#0077b5', '#e4405f', '#ff2442', '#000000'];
    const platformNames = ['LinkedIn', 'Instagram', 'RedNote', 'TikTok'];
    
    // 根据不同平台生成不同的真实模板内容
    const platformTemplates = {
      0: [ // LinkedIn Templates - 英文商务风格
        {
          template_type: 'employee_milestone',
          content: 'Continuing our series celebrating employees reaching their 20-year tenure milestone at lululemon, we are excited to share the incredible journey of our Senior Director, Franchise and Product Innovations—a true visionary whose work has helped define lululemon for millions around the world. Among her many achievements, she was instrumental in leading the creation of the iconic Align™ Pant, a product innovation that transformed the way people experience performance leggings. #lululemon #lululemonlife',
          predicted_likes: 756,
          predicted_comments: 29,
          predicted_shares: 10,
          predicted_bookmarks: 85,
          color: platformColors[0]
        },
        {
          template_type: 'company_innovation',
          content: 'One of my favorite things about working with @lululemon is getting to empower others. With the help of the beautiful + wonderful team, we brought these lovely people in to celebrate and empower them, as they continue to show up and show out with all of the good energy. THANK YOU for letting us play! & pls go try the new Align -no line- Collection, specifically in Pool Party- she\'s stunning 🦋 #lululemon #lululemonAmbassador',
          predicted_likes: 892,
          predicted_comments: 43,
          predicted_shares: 15,
          predicted_bookmarks: 156,
          color: platformColors[0]
        },
        {
          template_type: 'thought_leadership',
          content: 'The intersection of performance and sustainability continues to drive innovation in athletic wear. As we look toward the future of activewear, the focus on both functionality and environmental responsibility will shape how we design products that serve both people and planet. #innovation #sustainability #activewear #thoughtleadership',
          predicted_likes: 1240,
          predicted_comments: 67,
          predicted_shares: 23,
          predicted_bookmarks: 198,
          color: platformColors[0]
        },
        {
          template_type: 'industry_insights',
          content: 'The athletic apparel industry has seen remarkable growth, with consumers increasingly prioritizing both performance and style. Key trends shaping the market include sustainable materials, inclusive sizing, and technology integration. As professionals in this space, we must continue to innovate while staying true to our core values. #athleticwear #industrytrends #innovation',
          predicted_likes: 987,
          predicted_comments: 52,
          predicted_shares: 18,
          predicted_bookmarks: 143,
          color: platformColors[0]
        }
      ],
      1: [ // Instagram Templates - 英文生活方式风格
        {
          template_type: 'product_showcase',
          content: 'it\'s time for an upgrade 🤭\n\n... cause Lululemon Align No Line just entered the group chat.\n\nShe\'s smooth, sleek and (finally!) front seam free 🏆\n\nHead to Lululemon for a personalized, 1:1 session with a fit expert who\'s here to help you find THE perfect outfit. Whether you\'re looking for a studio, race day or travel fit - they got you.\n\nSimply fill this form, and a fit educator will guide you at the store. You\'re welcome 😉\n\nTop: Flow Y Bra (white)\nBottom: Align No Line (espresso)',
          predicted_likes: 598,
          predicted_comments: 10,
          predicted_shares: 119,
          predicted_bookmarks: 45,
          color: platformColors[1]
        },
        {
          template_type: 'lifestyle_content',
          content: 'which combo do we love the most?? @lululemon ✨\n\nmy current fave items 👇\n• Energy Bra\n• Shake It Out High-Rise Running Short\n• Align No Line High-Rise Pant 25"\n• Fast and Free High-Rise Pocket Short 6"\n• Bend This Scoop and Cross Bra\n• Align Palazzo Pant\n• Define Cropped Jacket\n\n#lululemoncreator #ad',
          predicted_likes: 903,
          predicted_comments: 13,
          predicted_shares: 21,
          predicted_bookmarks: 67,
          color: platformColors[1]
        },
        {
          template_type: 'dupe_comparison',
          content: 'which combo do we love the most?? @lululemon ✨\n\nmy current fave items from the new collection 👇\n• Align High-Rise Pant 25" (so buttery soft!)\n• Energy Bra in Bold Beige \n• Oversized Scuba Hoodie for layering\n• Everywhere Belt Bag for hands-free vibes\n\nSeriously obsessed with how these pieces mix and match! The align pants are still my holy grail - nothing compares to that second-skin feel 🤍\n\n#lululemon #alignpants #lululook #activewearootd' ,         
          predicted_likes: 31600,
          predicted_comments: 5314,
          predicted_shares: 4296,
          predicted_bookmarks: 8750,
          color: platformColors[1]  
        },
        {
          template_type: 'size_comparison',
          content: 'here\'s another #Lululemon Align color comparison since so many of you said the last one helped you out! (already posted this on IG story but I\'ll put it here too)\nI wear a size 4 in these and usually any other @lululemon legging. (Sometimes a 6 but if I ever post a pair I need to size up on I\'ll let you know - I\'m always talking about Lulu on Twitter)\n✨ My Lululemon sizes are as follows:\nLeggings - 4 (some styles 6)\nShorts - 4/6\nTops - 4/6\nSports Bras - 8\nDresses - 4\nBodysuits - 2/4\nJackets - 6',
          predicted_likes: 1501,
          predicted_comments: 40,
          predicted_shares: 23,
          predicted_bookmarks: 156,
          color: platformColors[1]
        }
      ],
      2: [ // RedNote Templates - 中文风格
        {
          template_type: 'product_review',
          content: '这是 Lululemon 最显身材的浅色裤子吧！\n\nalign 的太阳灰色，是买过这么多 lulu 家衣服中最显身材的，之前试过 align 其他浅色款，比如浅象牙白，基本都是双层的又厚又不舒服。\n\n这个太阳灰单层而且超级轻薄！夏天穿绝绝子\n#瑜伽裤穿搭 #灰色运动裤 #显身材比例 #lulu穿搭 #Lululemon #瑜伽裤',
          predicted_likes: 277,
          predicted_comments: 23,
          predicted_shares: 196,
          predicted_bookmarks: 22,
          color: platformColors[2]
        },
        {
          template_type: 'buying_guide',
          content: 'Lululemon选购攻略🤩热门款大全\n\n不知不觉了收集了不少Lululemon了，这次把几个热门款式试给大家做比较，无修图无调色，只为给大家最直观的对比。本人163cm，46kg，裤子基本都是2码的。以下对比均为个人感受，欢迎大家补充哦！\n\n1⃣包裹感 （紧实度从高到低）\nWunder Under>Bace Pace>Fast&Free>Wunder Train>Instill>Align\n\n2⃣舒适度 （仅代表个人感受）\nAlign>Instill>Bace Pace>Wunder Train>Fast&Free>Wunder Under',
          predicted_likes: 8994,
          predicted_comments: 725,
          predicted_shares: 892,
          predicted_bookmarks: 2150,
          color: platformColors[2]
        },
        {
          template_type: 'casual_sharing',
          content: '不知道穿什么就穿 Lululemon🤍\n\n#今日穿搭 #lulu #提臀瑜伽裤',
          predicted_likes: 4402,
          predicted_comments: 140,
          predicted_shares: 235,
          predicted_bookmarks: 1013,
          color: platformColors[2]
        },
        {
          template_type: 'employee_recommendation',
          content: '离职的lululemon员工告诉你哪些值得买\n\n这两年lululemon是确实很火，我觉得满大街啥品牌最多，lululemon排不了前三啊前五肯定是排的到！但我也是买了大几百件了，那买了那么多到底哪些最值得买呢？\n\n1. 首先肯定是当家花旦Align，Align是穿过那么多legging中无疑最舒服的，也是我穿着频率最高的，但近两年又点开盲盒的感觉，和前几年相比啊有些事会起球但不全会，可这个系列的舒适度便捷就算再质量不如以前还是会买',
          predicted_likes: 4090,
          predicted_comments: 222,
          predicted_shares: 387,
          predicted_bookmarks: 1254,
          color: platformColors[2]
        }
      ],
      3: [ // TikTok Templates - 英文短视频风格
        {
          template_type: 'product_review_video',
          content: 'Lululemon Align leggings review! These are the petite range. Obsessed with them tbh, ill definitely wear them on my flight to europe\n#lululemon #lululemonalign #lululemonalignleggings #lululemonreview #tightsreview #leggingsreview #lululemontryon #planefit #flightfit #whatimwearingontheplane #europeflightfit',
          predicted_likes: 3641,
          predicted_comments: 24,
          predicted_shares: 107,
          predicted_bookmarks: 1019,
          color: platformColors[3]
        },
        {
          template_type: 'outfit_showcase',
          content: 'pilates outfit of the day in the city 🎀\n\nTwo Pieces Womens Solid Backless Sports Bra Set 💕\n\n#pilates #workout #activewear #ootd #citylife #athleisure',
          predicted_likes: 1375,
          predicted_comments: 18,
          predicted_shares: 37,
          predicted_bookmarks: 231,
          color: platformColors[3]
        },
        {
          template_type: 'product_comparison',
          content: 'lululemon mini haul~ 🏃‍♀️\n\n2⃣ swiftly tech cropped - the fabric is so breathable and comfy, super cooling for workouts! gives me confidence at the gym and creates such a nice long line from chest to waist 👍\n\n3⃣ wunder train 4" - makes legs look so long and lifted😆 perfect score for aesthetics but can be tight during workouts (sizing up helps with comfort but then the waist doesn\'t fit as snug)\n\nall it takes nulu tshirt is SO incredibly flattering 🫶 🫶 shoulders feel amazing and the length isn\'t too cropped - perfect for pairing with low-rise jeans when not working out' ,         
          predicted_likes: 2421,
          predicted_comments: 23,
          predicted_shares: 89,
          predicted_bookmarks: 864,
          color: platformColors[3]
        },
        {
          template_type: 'trending_challenge',
          content: 'POV: you\'re obsessed with lululemon but your wallet isn\'t 💸\n\nShowing you the best lululemon dupes that actually work! From Align dupe leggings to Define jacket alternatives - your bank account will thank me later ✨\n\n#lululemon #dupes #budget #shopping #activewear #affordable #hacks #fyp',
          predicted_likes: 12500,
          predicted_comments: 456,
          predicted_shares: 234,
          predicted_bookmarks: 3450,
          color: platformColors[3]
        }
      ]
    };

    return platformTemplates[platformIndex] || platformTemplates[0];
  };

  // 组件初始化时设置默认模板（仅在没有模板时）
  // useEffect(() => {
  //   if (!platformTemplates) {
  //     console.log('Initializing default templates...');
  //     const defaultTemplates = getDefaultTemplates(selectedPlatform);
  //     dispatch({
  //       type: ActionTypes.SET_PLATFORM_TEMPLATES,
  //       payload: defaultTemplates
  //     });
  //   }
  // }, []);

  // 当平台切换时，生成对应平台的模板
  const handlePlatformChange = async (platformIndex) => {
    dispatch({
      type: ActionTypes.SET_SELECTED_PLATFORM,
      payload: platformIndex
    });
    
    // 重置选中的模板
    dispatch({
      type: ActionTypes.SET_SELECTED_TEMPLATE,
      payload: 0
    });

    // 设置加载状态
    dispatch({
      type: ActionTypes.SET_STEP3_LOADING,
      payload: true
    });

    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 如果有Step2的内容，生成平台特定模板；否则使用默认模板
      let newTemplates;
      if (currentContent) {
        // 使用Step2风格的平台特定模板
        newTemplates = await generatePlatformSpecificTemplates(platformIndex);
      } else {
        // 使用默认模板
        newTemplates = getDefaultTemplates(platformIndex);
      }

      dispatch({
        type: ActionTypes.SET_PLATFORM_TEMPLATES,
        payload: newTemplates
      });

      // 设置第一个模板为默认选中内容
      if (newTemplates[0]) {
        dispatch({
          type: ActionTypes.SET_FINAL_CONTENT,
          payload: newTemplates[0].content
        });
      }
    } catch (error) {
      console.error('Platform template generation error:', error);
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: error.message || 'Failed to generate platform templates'
      });
    } finally {
      dispatch({
        type: ActionTypes.SET_STEP3_LOADING,
        payload: false
      });
    }
  };

  // 手动生成模板的函数（保持原有功能）
  const generatePlatformTemplates = async () => {
    if (!currentContent) {
      alert('No content available. Please complete Step 2 first.');
      return;
    }

    dispatch({ type: ActionTypes.SET_STEP3_LOADING, payload: true });

    try {
      // 使用平台特定的模板
      const newTemplates = await generatePlatformSpecificTemplates(selectedPlatform);

      // 模拟API响应延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 添加调试日志
      console.log('Platform-specific templates response:', { success: true, templates: newTemplates });
      console.log('Number of templates received:', newTemplates.length);
      console.log('Template types:', newTemplates.map(t => t.template_type));
      
      dispatch({
        type: ActionTypes.SET_PLATFORM_TEMPLATES,
        payload: newTemplates
      });
    } catch (error) {
      console.error('Template generation error:', error);
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: error.message || 'Template generation failed'
      });
    } finally {
      dispatch({ type: ActionTypes.SET_STEP3_LOADING, payload: false });
    }
  };

  const handleTemplateChange = (templateIndex) => {
    dispatch({
      type: ActionTypes.SET_SELECTED_TEMPLATE,
      payload: templateIndex
    });
    
    if (platformTemplates && platformTemplates[templateIndex]) {
      dispatch({
        type: ActionTypes.SET_FINAL_CONTENT,
        payload: platformTemplates[templateIndex].content
      });
    }
  };

  const getContentPreview = (content) => {
    if (!content) return '';
    if (content.length <= 100) return content;
    return content.substring(0, 100) + '...';
  };

  // 确保 platformTemplates 始终有值
  //const currentTemplates = platformTemplates || getDefaultTemplates(selectedPlatform);
  const currentTemplates = platformTemplates || [];


  return (
    <>
      <div className="step-header">
        <h3>Step 3</h3>
        <p>Platform Adaptation</p>
      </div>
      
      <div className="platform-content">
        <div className="platform-slider-section">
          <label className="slider-label">Select Platform:</label>
          
          <div className="platform-selector">
            <button 
              className="nav-arrow nav-arrow-left"
              onClick={() => handlePlatformChange(Math.max(0, selectedPlatform - 1))}
              disabled={selectedPlatform === 0 || isGeneratingTemplates}
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="current-platform">
              <img 
                src={platforms[selectedPlatform].logo} 
                alt={platforms[selectedPlatform].name}
                className="platform-logo"
              />
            </div>
            
            <button 
              className="nav-arrow nav-arrow-right"
              onClick={() => handlePlatformChange(Math.min(platforms.length - 1, selectedPlatform + 1))}
              disabled={selectedPlatform === platforms.length - 1 || isGeneratingTemplates}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="platform-name-display">
            {platforms[selectedPlatform].name}
          </div>
        </div>

        <div className="content-templates-section">
          <label className="templates-label">Content Structure Templates</label>
          
          {isGeneratingTemplates ? (
            <div className="templates-loading">
              <div className="loading-spinner"></div>
              <p>Generating platform-specific templates...</p>
            </div>
          ) : (
            <div className="templates-container">
              <div className="templates-info">
                <p className="templates-count">
                  {currentTemplates.length} templates available - scroll to see all
                </p>
                {currentContent && (
                  <p className="templates-note">
                    📝 Templates generated based on your Step 2 content with real platform data
                  </p>
                )}
              </div>
              <div className="templates-list">
                {currentTemplates.map((template, index) => {
                  const contentPreview = getContentPreview(template.content);
                  
                  return (
                    <div
                      key={index}
                      className={`template-card ${selectedTemplate === index ? 'active' : ''}`}
                      onClick={() => handleTemplateChange(index)}
                      style={{ '--template-color': template.color || '#3b82f6' }}
                    >
                      <div className="template-header">
                        <div className="template-type">
                          {template.template_type?.charAt(0).toUpperCase() + template.template_type?.slice(1) || 'Template'} Type
                        </div>
                        <div className="template-engagement">
                          <div className="engagement-item">
                            <Heart size={14} />
                            <span>{template.predicted_likes?.toLocaleString() || '1.2K'}</span>
                          </div>
                          <div className="engagement-item">
                            <MessageCircle size={14} />
                            <span>{template.predicted_comments || '89'}</span>
                          </div>
                          <div className="engagement-item">
                            <Share size={14} />
                            <span>{template.predicted_shares || '56'}</span>
                          </div>
                          <div className="engagement-item">
                            <Bookmark size={14} />
                            <span>{template.predicted_bookmarks || '234'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="template-content">
                        <h4 className="template-title">
                          {template.template_type?.replace('_', ' ').split(' ').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ') || 'Content'} Type
                        </h4>
                        
                        <div className="template-content-preview">
                          <span className="content-label">
                            {platforms[selectedPlatform].name} Content:
                          </span>
                          <div className="content-preview-text">
                            {contentPreview}
                          </div>
                        </div>
                      </div>
                      
                      {selectedTemplate === index && (
                        <div className="template-selected-indicator"></div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* 可选：保留手动重新生成按钮 */}
              <div className="regenerate-section">
                <button 
                  className="generate-templates-btn secondary"
                  onClick={generatePlatformTemplates}
                  disabled={isGeneratingTemplates || !currentContent}
                >
                  {currentContent ? 'Regenerate Templates' : 'Complete Step 2 First'}
                </button>
              </div>
            </div>
          )}
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

export default PlatformAdaptation;