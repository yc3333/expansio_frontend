// frontend/web/src/components/workflow/Step2/StyleSettings.js
import React, { useState, useRef, useEffect } from 'react';
import { BarChart3, Heart, Target, BrainCircuit } from 'lucide-react';
import { useWorkflow } from '../../../context/WorkflowContext';
import ApiService from '../../../services/apiServices';
import './styleSettings.css';

const StyleSettings = () => {
  const { state, dispatch, ActionTypes } = useWorkflow();
  const textRef = useRef(null);

  const { currentContent, styleSettings, isAdjusting } = state.step2;
  const generatedContent = state.step1.generatedContent;

  useEffect(() => {
    if (!currentContent && generatedContent) {
      dispatch({
        type: ActionTypes.SET_CURRENT_CONTENT,
        payload: generatedContent
      });
    }
  }, [generatedContent, currentContent, dispatch, ActionTypes]);

  const adjustTextHeight = () => {
    const textElement = textRef.current;
    if (textElement) {
      textElement.style.height = 'auto';
      textElement.style.height = textElement.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    adjustTextHeight();
  }, [currentContent]);

  const handleSliderChange = (setting, value) => {
    dispatch({
      type: ActionTypes.SET_STYLE_SETTINGS,
      payload: {
        [setting]: parseInt(value)
      }
    });
  };

  const handleContentChange = (event) => {
    const newContent = event.target.value;
    dispatch({
      type: ActionTypes.SET_CURRENT_CONTENT,
      payload: newContent
    });
  };

  const handleApplyStyleChanges = async () => {
    if (!currentContent) {
      alert('No content to adjust. Please generate content in Step 1 first.');
      return;
    }

    dispatch({
      type: ActionTypes.SET_STEP2_LOADING,
      payload: true
    });

    try {
      const response = await ApiService.adjustContentStyle(currentContent, styleSettings);
      
      if (response.success) {
        dispatch({
          type: ActionTypes.SET_CURRENT_CONTENT,
          payload: response.adjusted_content
        });
        alert('Style adjustment applied successfully!');
      } else {
        throw new Error(response.message || 'Style adjustment failed');
      }
    } catch (error) {
      console.error('Style adjustment error:', error);
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: error.response?.data?.message || error.message || 'Style adjustment failed'
      });
      alert('Style adjustment failed. Please try again.');
    } finally {
      dispatch({
        type: ActionTypes.SET_STEP2_LOADING,
        payload: false
      });
    }
  };

  // 修改这个函数 - 根据选择的平台生成对应的真实模板
  const handlePlatformAdaptation = async () => {
    if (!currentContent) {
      alert('No content available. Please generate and adjust content first.');
      return;
    }

    // 设置Step3开始生成模板的状态
    dispatch({
      type: ActionTypes.SET_STEP3_LOADING,
      payload: true
    });

    try {
      const selectedPlatformIndex = state.step3.selectedPlatform;
      const platformColors = ['#0077b5', '#e4405f', '#ff2442', '#000000']; // LinkedIn, Instagram, RedNote, TikTok
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
            content: 'it\'s time for an upgrade 🤭\n\n... cause Lululemon Align No Line just entered the group chat.\n\nShe\'s smooth, sleek and (finally!) front seam free 🏆\n\nHead to Lululemon 📍 Takashimaya for a personalized, 1:1 session with a fit expert who\'s here to help you find THE perfect outfit. Whether you\'re looking for a studio, race day or travel fit - they got you.\n\nSimply fill this form, and a fit educator will guide you at the store. You\'re welcome 😉\n\nTop: Flow Y Bra (white)\nBottom: Align No Line (espresso)',
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
            content: 'POV you found Lululemon Align flare pant lookalikes for $38 on Amazon\n\nComment "LINK" and I\'ll send the direct link to your DM ⚠️ these amazon flare leggings are IDENTICAL to Lululemon\'s Align flare pants but a fraction of the cost! $38 VS $118 ‼️‼️ The stitching and material is the exact same. They\'re SO comfortable and come in so many colors! Perfect for lounging or working out. Also available in a V waistband which I\'ll be grabbing next 💗🫶',
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
            content: 'lululemon小合集～ 🏃‍♀️\n\n2⃣ swiftly tech cropped 速干材质 很透气很舒服 超级凉快 健身很有安全感 而且会显得胸腰得长线条好看 👍\n\n3⃣ wunder train 四寸 很显腿长 很吊挎😆 为了好看的话满分但是锻炼穿着可难受（买大一号就会舒服很多 但是腰就不太贴合）\n\nall it takes nulu tshirt 特别特别特别显身材 🫶 🫶 肩膀没那的很舒服 长度没那么cropped 不锻炼的话可以配低腰牛仔裤很好看',
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

      // 模拟API响应延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 根据选择的平台获取对应的模板
      const selectedTemplates = platformTemplates[selectedPlatformIndex] || platformTemplates[0];

      dispatch({
        type: ActionTypes.SET_PLATFORM_TEMPLATES,
        payload: selectedTemplates
      });
      
      alert(`${platformNames[selectedPlatformIndex]} templates generated successfully! Check Step 3.`);
    } catch (error) {
      console.error('Platform template generation error:', error);
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: error.message || 'Platform content generation failed'
      });
      alert('Failed to generate platform templates. Please try again.');
    } finally {
      dispatch({
        type: ActionTypes.SET_STEP3_LOADING,
        payload: false
      });
    }
  };

  const sliderConfig = [
    {
      id: 'informationDensity',
      label: 'Information Density',
      description: 'Amount of facts and details',
      icon: BarChart3,
      min: 0,
      max: 100,
      color: '#3b82f6'
    },
    {
      id: 'emotionalIntensity',
      label: 'Emotional Intensity',
      description: 'Level of emotional appeal',
      icon: Heart,
      min: 0,
      max: 100,
      color: '#8b5cf6'
    },
    {
      id: 'professionalDepth',
      label: 'Professional Depth',
      description: 'Technical complexity level',
      icon: Target,
      min: 0,
      max: 100,
      color: '#06b6d4'
    },
    {
      id: 'aiNaturalness',
      label: 'AI Naturalness',
      description: 'Human-like writing style',
      icon: BrainCircuit,
      min: 0,
      max: 100,
      color: '#10b981'
    }
  ];

  return (
    <>
      <div className="step-header">
        <h3>Step 2</h3>
        <p>Style Settings</p>
      </div>
      
      <div className="style-content">
     <div className="generated-text-section">
  <label className="section-label">Generated Content Preview:</label>
  <textarea
    ref={textRef}
    className="generated-text-display"
    value={currentContent || ''}
    onChange={handleContentChange}
    placeholder="No content available. Please generate content in Step 1 first."
  />
</div>

        <div className="sliders-section">
          <label className="section-label">Style Adjustments:</label>
          <div className="sliders-grid">
            {sliderConfig.map((slider) => {
              const IconComponent = slider.icon;
              return (
                <div key={slider.id} className="slider-group">
                  <div className="slider-header">
                    <div className="slider-icon">
                      <IconComponent size={18} />
                    </div>
                    <div className="slider-info">
                      <span className="slider-label">{slider.label}</span>
                      <span className="slider-description">{slider.description}</span>
                    </div>
                    <span className="slider-value" style={{color: slider.color}}>
                      {styleSettings[slider.id]}%
                    </span>
                  </div>
                  <div className="slider-container">
                    <input
                      type="range"
                      min={slider.min}
                      max={slider.max}
                      value={styleSettings[slider.id]}
                      onChange={(e) => handleSliderChange(slider.id, e.target.value)}
                      className="custom-slider"
                      style={{
                        '--slider-color': slider.color,
                        '--slider-progress': `${styleSettings[slider.id]}%`
                      }}
                      disabled={isAdjusting}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button 
          className={`apply-style-btn ${isAdjusting || !currentContent ? 'disabled' : ''}`}
          onClick={handleApplyStyleChanges}
          disabled={isAdjusting || !currentContent}
        >
          {isAdjusting ? (
            <>
              <span className="spinner"></span>
              Applying Changes...
            </>
          ) : (
            <>
              <BrainCircuit size={16} />
              Apply Style Changes
            </>
          )}
        </button>
        
        <button 
          className={`next-step-btn ${!currentContent || state.step3.isGeneratingTemplates ? 'disabled' : ''}`}
          onClick={handlePlatformAdaptation}
          disabled={!currentContent || state.step3.isGeneratingTemplates}
        >
          {state.step3.isGeneratingTemplates ? (
            <>
              <span className="spinner"></span>
              Generating Templates...
            </>
          ) : (
            'Platform Adaptation →'
          )}
        </button>

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

export default StyleSettings;