import React, { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  Eye,
  Bookmark,
  Target,
  Zap,
  BarChart3,
  Activity,
  TrendingDown,
  TrendingUp as TrendingUpIcon,
  Users,
  Clock,
  Download,
  RefreshCw,
  Settings,
  Search,
  Filter as FilterIcon,
  FileText as FileList,
  Heart as HeartHandshake,
  DollarSign,
  UserCheck,
  Calendar,
  ChevronDown,
  FileSpreadsheet as FileExcel,
  FileText,
  Share,
  Menu,
  Bell,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Edit,
  Store,
  Grid3x3,
  Lightbulb,
  BarChart,
  Globe,
  UserPlus,
  Plus,
} from "lucide-react";
import "./analyticsDashboard.css";

const AnalyticsDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTimeFilter, setActiveTimeFilter] = useState("Last 30 Days");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [activePlatformFilter, setActivePlatformFilter] =
    useState("All Platforms");
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("July 2025");

  // Chart refs
  const trendChartRef = useRef(null);
  const audienceChartRef = useRef(null);
  const heatmapChartRef = useRef(null);
  const ctaChartRef = useRef(null);
  const funnelChartRef = useRef(null);
  const platformTrendChartRef = useRef(null);
  const platformShareChartRef = useRef(null);

  const sidebarNavItems = [
    {
      id: "overview",
      label: "Brand Content Overview",
      icon: BarChart3,
      active: true,
    },
    {
      id: "strategy",
      label: "Platform Strategy View",
      icon: Target,
      active: false,
    },
    {
      id: "structure",
      label: "Content Structure Analysis",
      icon: FileList,
      active: false,
    },
    {
      id: "ai-insights",
      label: "AI Strategy Suggestions",
      icon: Lightbulb,
      active: false,
    },
    {
      id: "top-content",
      label: "Top Content Performance",
      icon: BarChart,
      active: false,
    },
    {
      id: "user-insights",
      label: "User Interaction Insights",
      icon: HeartHandshake,
      active: false,
    },
    {
      id: "distribution",
      label: "Cross-Platform Distribution",
      icon: Globe,
      active: false,
    },
    {
      id: "collaboration",
      label: "Collaboration System",
      icon: UserPlus,
      active: false,
    },
    {
      id: "planning",
      label: "Monthly Strategy Planning",
      icon: Calendar,
      active: false,
    },
  ];

  const platforms = [
    {
      name: "TikTok",
      icon: "🎵",
      color: "#ff0050",
      status: "Active",
      contentType: "UGC Mix, Emotion-driven",
      emotionDistribution: { emotion: 90, rational: 10 },
      frequency: "3-4 times per week",
    },
    {
      name: "Instagram",
      icon: "📸",
      color: "#E1306C",
      status: "Active",
      contentType: "Clean display style, Product images + text",
      contentForm: { images: 60, videos: 30, carousel: 10 },
      frequency: "5-7 times per week",
    },
    {
      name: "RedNote",
      icon: "📖",
      color: "#FF2442",
      status: "Active",
      contentType: "Collection + lifestyle sharing structure",
      contentForm: { imageText: 70, videos: 30 },
      frequency: "2-3 times per week",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      color: "#0077B5",
      status: "Low Frequency",
      contentType: "Employee stories + leadership endorsement",
      contentForm: { articles: 50, imageText: 40, videos: 10 },
      frequency: "1-2 times per week",
    },
  ];

  const contentStyleTags = [
    // { label: 'List-type', count: 32, color: '#6366f1' },
    { label: "Story-type", count: 28, color: "#3b82f6" },
    { label: "Visual-driven", count: 45, color: "#8b5cf6" },
    // { label: 'Tutorial', count: 19, color: '#10b981' },
    // { label: 'Before/After', count: 15, color: '#f59e0b' },
    // { label: 'Collection', count: 23, color: '#ef4444' },
    // { label: 'Tips', count: 17, color: '#eab308' },
    { label: "Character dialogue", count: 12, color: "#6366f1" },
    { label: "Milestone story", count: 8, color: "#ec4899" },
  ];

  const topContentData = [
    {
      platform: "TikTok",
      title: "3 HIIT Hacks to Improve Your Fitness Efficiency",
      date: "2025-06-15",
      engagement: "14.1%",
      tags: ["Strong Hook", "Visuals"],
    },
    {
      platform: "Instagram",
      title: "5 Essential Summer Workout Skincare Products",
      date: "2025-06-22",
      engagement: "11.5%",
      tags: ["Product Layout"],
    },
    {
      platform: "LinkedIn",
      title: "Lululemon 20th Anniversary: Our Sustainability Journey",
      date: "2025-06-20",
      engagement: "6.7%",
      tags: ["Authority"],
    },
    {
      platform: "RedNote",
      title: "5 Yoga Outfits for a Week, Easy for Different Occasions",
      date: "2025-06-18",
      engagement: "9.3%",
      tags: ["Collection", "List-type"],
    },
    {
      platform: "TikTok",
      title: "Wearing This, My Running Record Improved by 15%",
      date: "2025-06-12",
      engagement: "12.8%",
      tags: ["Before/After"],
    },
  ];

  const aiSuggestions = [
    {
      title: "Move CTA Earlier",
      description:
        "In TikTok content, move call-to-action to first 7 seconds, expected to improve conversion rate by 32%.",
      priority: "High",
      type: "improvement",
    },
    {
      title: "Switch to Visual Hook",
      description:
        "TikTok content opening with strong visual impact product close-ups, expected to boost engagement by 15%.",
      priority: "Medium",
      type: "optimization",
    },
    {
      title: "Reduce LinkedIn Emotional Load",
      description:
        "LinkedIn platform content is too emotional, reducing professionalism. Suggest adjusting to data-driven content structure.",
      priority: "Medium",
      type: "adjustment",
    },
  ];

  const calendarData = [
    {
      day: 1,
      content: [
        { platform: "TikTok", type: "Fitness Tutorial", color: "#ff0050" },
      ],
    },
    {
      day: 2,
      content: [
        { platform: "Instagram", type: "Product Display", color: "#E1306C" },
      ],
    },
    {
      day: 3,
      content: [
        { platform: "RedNote", type: "Outfit Collection", color: "#FF2442" },
      ],
    },
    {
      day: 4,
      isToday: true,
      content: [
        { platform: "TikTok", type: "UGC Share", color: "#ff0050" },
        { platform: "Instagram", type: "Story Share", color: "#E1306C" },
      ],
    },
    {
      day: 5,
      content: [
        { platform: "LinkedIn", type: "Industry Insights", color: "#0077B5" },
      ],
    },
    {
      day: 6,
      content: [
        { platform: "Instagram", type: "Product Display", color: "#E1306C" },
      ],
    },
    { day: 7, content: [] },
    {
      day: 8,
      content: [
        { platform: "TikTok", type: "Challenge Video", color: "#ff0050" },
      ],
    },
    {
      day: 9,
      content: [
        { platform: "RedNote", type: "Fitness Tips", color: "#FF2442" },
      ],
    },
    { day: 10, content: [] },
    {
      day: 11,
      content: [{ platform: "Instagram", type: "Carousel", color: "#E1306C" }],
    },
    {
      day: 12,
      content: [
        { platform: "TikTok", type: "Product Review", color: "#ff0050" },
      ],
    },
    { day: 13, content: [] },
    { day: 14, content: [] },
  ];

  // Initialize charts after component mounts
  useEffect(() => {
    const initializeCharts = () => {
      // 获取统一的高度
      const getChartSize = (ref) => {
        if (!ref.current) return { width: 400, height: 256 };
        const width = ref.current.offsetWidth || 400;
        const height = ref.current.offsetHeight || 256;
        return { width, height };
      };

      // Content Performance Trend Chart
      if (trendChartRef.current) {
        const { width, height } = getChartSize(trendChartRef);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        trendChartRef.current.innerHTML = "";
        trendChartRef.current.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        const data = [5.2, 5.8, 6.5, 7.3, 7.8, 8.5, 8.7];
        const labels = ["6/5", "6/10", "6/15", "6/20", "6/25", "6/30", "7/4"];
        drawLineChart(ctx, data, labels, "#3b82f6", width, height);
      }

      // Audience Distribution Chart
      if (audienceChartRef.current) {
        const { width, height } = getChartSize(audienceChartRef);
        const size = Math.min(width, height);
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        audienceChartRef.current.innerHTML = "";
        audienceChartRef.current.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        const data = [
          { label: "18-25 Female", value: 48, color: "#3b82f6" },
          { label: "26-35 Female", value: 32, color: "#8b5cf6" },
          { label: "18-25 Male", value: 12, color: "#f59e0b" },
          { label: "26-35 Male", value: 8, color: "#ef4444" },
        ];
        drawPieChart(ctx, data, size / 2, size / 2, size / 2 - 20);
      }

      // Content Structure Heatmap
      if (heatmapChartRef.current) {
        const { width, height } = getChartSize(heatmapChartRef);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        heatmapChartRef.current.innerHTML = "";
        heatmapChartRef.current.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        drawHeatmap(ctx, width, height);
      }

      // CTA Performance Chart
      if (ctaChartRef.current) {
        const { width, height } = getChartSize(ctaChartRef);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        ctaChartRef.current.innerHTML = "";
        ctaChartRef.current.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        const data = [8.5, 4.2, 6.8, 5.3, 3.7];
        const labels = ["Shop Now", "Learn More", "Save", "Comment", "Share"];
        drawBarChart(ctx, data, labels, "#3b82f6", width, height);
      }

      // Funnel Chart
      if (funnelChartRef.current) {
        const { width, height } = getChartSize(funnelChartRef);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        funnelChartRef.current.innerHTML = "";
        funnelChartRef.current.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        drawFunnelChart(ctx, width, height);
      }

      // Platform Trend Chart
      if (platformTrendChartRef.current) {
        const { width, height } = getChartSize(platformTrendChartRef);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        platformTrendChartRef.current.innerHTML = "";
        platformTrendChartRef.current.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        drawPlatformTrendChart(ctx, width, height);
      }

      // Platform Share Chart
      if (platformShareChartRef.current) {
        const { width, height } = getChartSize(platformShareChartRef);
        const size = Math.min(width, height);
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        platformShareChartRef.current.innerHTML = "";
        platformShareChartRef.current.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        const data = [
          { label: "TikTok", value: 42, color: "#ff0050" },
          { label: "Instagram", value: 31, color: "#E1306C" },
          { label: "RedNote", value: 19, color: "#FF2442" },
          { label: "LinkedIn", value: 8, color: "#0077B5" },
        ];
        drawPieChart(ctx, data, size / 2, size / 2, size / 2 - 20);
      }
    };

    const timer = setTimeout(initializeCharts, 100);
    return () => clearTimeout(timer);
  }, []);

  // Chart drawing functions
  // 统一padding为32，所有内容都在padding内
  const drawLineChart = (ctx, data, labels, color, width, height) => {
    const padding = 32;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const stepX = chartWidth / (data.length - 1);
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;

    ctx.clearRect(0, 0, width, height);

    // Draw area fill
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    data.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = padding + (1 - (value - minValue) / range) * chartHeight;
      ctx.lineTo(x, y);
    });
    ctx.lineTo(padding + (data.length - 1) * stepX, height - padding);
    ctx.closePath();
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();

    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = padding + (1 - (value - minValue) / range) * chartHeight;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw points
    ctx.fillStyle = color;
    data.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = padding + (1 - (value - minValue) / range) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Inter";
    ctx.textAlign = "center";
    labels.forEach((label, index) => {
      const x = padding + index * stepX;
      ctx.fillText(label, x, height - 10);
    });
  };

  const drawPieChart = (ctx, data, centerX, centerY, radius) => {
    let currentAngle = -Math.PI / 2;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    data.forEach((item) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX,
        centerY,
        radius,
        currentAngle,
        currentAngle + sliceAngle
      );
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      // Add percentage text
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.6);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.6);
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px Inter";
      ctx.textAlign = "center";
      ctx.fillText(`${item.value}%`, labelX, labelY);
      currentAngle += sliceAngle;
    });
  };

  const drawBarChart = (ctx, data, labels, color, width, height) => {
    const padding = 32;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = (chartWidth / data.length) * 0.6;
    const maxValue = Math.max(...data);
    ctx.clearRect(0, 0, width, height);
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x =
        padding +
        index * (chartWidth / data.length) +
        (chartWidth / data.length - barWidth) / 2;
      const y = height - padding - barHeight;
      // Draw bar
      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth, barHeight);
      // Draw value on top
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "12px Inter";
      ctx.textAlign = "center";
      ctx.fillText(`${value}%`, x + barWidth / 2, y - 5);
      // Draw label
      ctx.fillStyle = "#6b7280";
      ctx.font = "10px Inter";
      ctx.save();
      ctx.translate(x + barWidth / 2, height - 10);
      ctx.rotate(-Math.PI / 6);
      ctx.textAlign = "right";
      ctx.fillText(labels[index], 0, 0);
      ctx.restore();
    });
  };

  const drawHeatmap = (ctx, width, height) => {
    const padding = 48;
    const platforms = ["TikTok", "Instagram", "RedNote", "LinkedIn"];
    const contentTypes = [
      "Collection",
      "Tips",
      "Character dialogue",
      "Before/After",
      "Milestone",
    ];
    const cellWidth = (width - padding * 2) / platforms.length;
    const cellHeight = (height - padding * 2) / contentTypes.length;
    const heatmapData = [
      [8, 6, 10, 2],
      [9, 5, 7, 5],
      [3, 7, 4, 3],
      [5, 8, 3, 2],
      [2, 4, 1, 9],
    ];
    ctx.clearRect(0, 0, width, height);
    // Draw cells
    heatmapData.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        const x = padding + colIndex * cellWidth;
        const y = padding + rowIndex * cellHeight;
        const intensity = value / 10;
        ctx.fillStyle = `rgba(99, 102, 241, ${intensity})`;
        ctx.fillRect(x, y, cellWidth, cellHeight);
        // Draw value
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px Inter";
        ctx.textAlign = "center";
        ctx.fillText(
          value.toString(),
          x + cellWidth / 2,
          y + cellHeight / 2 + 5
        );
      });
    });
    // Draw labels
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Inter";
    ctx.textAlign = "center";
    // Platform labels
    platforms.forEach((platform, index) => {
      const x = padding + index * cellWidth + cellWidth / 2;
      ctx.fillText(platform, x, height - 10);
    });
    // Content type labels
    ctx.textAlign = "right";
    contentTypes.forEach((type, index) => {
      const y = padding + index * cellHeight + cellHeight / 2 + 5;
      ctx.fillText(type, padding - 10, y);
    });
  };

  const drawFunnelChart = (ctx, width, height) => {
    const padding = 32;
    const stages = [
      { name: "Browse", value: 100, color: "#3b82f6" },
      { name: "Click", value: 68, color: "#8b5cf6" },
      { name: "Lead", value: 42, color: "#f59e0b" },
      { name: "Convert", value: 24.3, color: "#ef4444" },
    ];
    ctx.clearRect(0, 0, width, height);
    const maxWidth = width - padding * 2;
    const stageHeight = (height - padding * 2) / stages.length;
    stages.forEach((stage, index) => {
      const stageWidth = (stage.value / 100) * maxWidth;
      const x = padding + (maxWidth - stageWidth) / 2;
      const y = padding + index * stageHeight;
      // Draw funnel stage
      ctx.fillStyle = stage.color;
      ctx.fillRect(x, y, stageWidth, stageHeight - 4);
      // Draw label
      ctx.fillStyle = "#ffffff";
      ctx.font = "14px Inter";
      ctx.textAlign = "center";
      ctx.fillText(
        `${stage.name}: ${stage.value}%`,
        x + stageWidth / 2,
        y + stageHeight / 2 + 5
      );
    });
  };

  const drawPlatformTrendChart = (ctx, width, height) => {
    const padding = 32;
    const platformData = {
      TikTok: [7.2, 8.5, 9.8, 11.2, 12.5, 13.8, 14.1],
      Instagram: [6.8, 7.5, 8.2, 9.5, 10.2, 10.8, 11.5],
      RedNote: [5.2, 6.3, 7.1, 7.8, 8.5, 9.0, 9.3],
      LinkedIn: [3.5, 4.2, 4.8, 5.5, 6.0, 6.5, 6.7],
    };
    const colors = ["#ff0050", "#E1306C", "#FF2442", "#0077B5"];
    const dates = ["6/5", "6/10", "6/15", "6/20", "6/25", "6/30", "7/4"];
    ctx.clearRect(0, 0, width, height);
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const stepX = chartWidth / (dates.length - 1);
    const maxValue = Math.max(...Object.values(platformData).flat());
    Object.entries(platformData).forEach(([platform, data], platformIndex) => {
      const color = colors[platformIndex];
      // Draw line
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      data.forEach((value, index) => {
        const x = padding + index * stepX;
        const y = height - padding - (value / maxValue) * chartHeight;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      // Draw points
      ctx.fillStyle = color;
      data.forEach((value, index) => {
        const x = padding + index * stepX;
        const y = height - padding - (value / maxValue) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    });
    // Draw legend
    Object.keys(platformData).forEach((platform, index) => {
      const legendX = padding + index * 100;
      const legendY = 20;
      ctx.fillStyle = colors[index];
      ctx.fillRect(legendX, legendY, 12, 12);
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "12px Inter";
      ctx.fillText(platform, legendX + 20, legendY + 9);
    });
    // Draw x-axis labels
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Inter";
    ctx.textAlign = "center";
    dates.forEach((date, index) => {
      const x = padding + index * stepX;
      ctx.fillText(date, x, height - 10);
    });
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      TikTok: "🎵",
      Instagram: "📸",
      RedNote: "📖",
      LinkedIn: "💼",
    };
    return icons[platform] || "📱";
  };

  const getTagColor = (index) => {
    const colors = [
      "bg-indigo-50 text-indigo-600",
      "bg-blue-50 text-blue-600",
      "bg-purple-50 text-purple-600",
      "bg-green-50 text-green-600",
      "bg-orange-50 text-orange-600",
      "bg-red-50 text-red-600",
      "bg-yellow-50 text-yellow-600",
      "bg-indigo-50 text-indigo-600",
      "bg-pink-50 text-pink-600",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={`w-64 bg-white border-r border-gray-200 flex-shrink-0 ${
            sidebarOpen ? "block" : "hidden"
          } lg:block`}
        >
          <div className="h-16 flex items-center px-4 border-b border-gray-200">
            <img
              src="/images/logo/logo.JPG"
              alt="Logo"
              className="custom-logo"
            />
          </div>

          <div className="p-4">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Store className="text-indigo-600" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium">Lululemon</p>
                <p className="text-xs text-gray-500">Athletic Apparel Brand</p>
              </div>
            </div>

            <nav className="space-y-1">
              {sidebarNavItems.map((item) => (
                <a
                  key={item.id}
                  href="#"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium ${
                    item.active
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-sm">👩‍💼</span>
              </div>
              <div>
                <p className="text-sm font-medium">Sarah Chen</p>
                <p className="text-xs text-gray-500">Brand Strategy Manager</p>
              </div>
              <button className="ml-auto p-2 rounded-full hover:bg-gray-100">
                <Settings size={16} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 justify-between">
            <div className="flex items-center lg:hidden">
              <button
                className="p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu size={20} />
              </button>
              <img
                src="/images/logo/logo.JPG"
                alt="Logo"
                className="custom-logo"
              />
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium">
                <span>Brand Overview</span>
                <ChevronDown size={16} />
              </button>
              <div className="h-6 border-r border-gray-300"></div>
              <span className="text-sm font-medium">2025-07-04, Friday</span>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell size={16} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <HelpCircle size={16} />
              </button>
              <div className="h-8 border-r border-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-sm">👩‍💼</span>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium">Sarah Chen</p>
                  <p className="text-xs text-gray-500">
                    Brand Strategy Manager
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Brand Strategy Control Panel
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Real-time monitoring of brand content performance and
                    strategy effectiveness
                  </p>
                </div>
                <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                  <div className="relative">
                    <button
                      className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium"
                      onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                    >
                      <Calendar size={16} />
                      <span>{activeTimeFilter}</span>
                      <ChevronDown size={16} />
                    </button>
                    {showTimeDropdown && (
                      <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {["Last 7 Days", "Last 30 Days", "Last 90 Days"].map(
                          (filter) => (
                            <button
                              key={filter}
                              className="w-full text-left px-3 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                              onClick={() => {
                                setActiveTimeFilter(filter);
                                setShowTimeDropdown(false);
                              }}
                            >
                              {filter}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                  <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium">
                    Export Report
                  </button>
                </div>
              </div>

              {/* Brand Content Overview */}
              <section className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Brand Content Overview
                  </h2>
                  <button className="text-sm text-indigo-600 flex items-center">
                    <span>View Details</span>
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">
                        Current Campaign
                      </span>
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Calendar className="text-indigo-600" size={16} />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold">
                      Back-to-Gym Campaign
                    </h3>
                    <div className="mt-2 flex items-center">
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                        In Progress
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        12 days left
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">
                        Content Generated
                      </span>
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <FileList className="text-blue-500" size={16} />
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <h3 className="text-2xl font-semibold">247</h3>
                      <span className="ml-2 text-sm text-green-600">+14%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Increased by 32 posts vs last month
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">
                        Engagement Index
                      </span>
                      <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                        <HeartHandshake className="text-purple-500" size={16} />
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <h3 className="text-2xl font-semibold">8.7%</h3>
                      <span className="ml-2 text-sm text-green-600">
                        ↑ 1.2%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Engagement rate continues to rise
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">
                        Conversion Rate
                      </span>
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                        <DollarSign className="text-orange-500" size={16} />
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <h3 className="text-2xl font-semibold">24.3%</h3>
                      <span className="ml-2 text-sm text-red-600">↓ 2.1%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Need to optimize conversion funnel
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 col-span-1 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">
                        Content Performance Trend
                      </h3>
                      <div className="flex items-center space-x-2">
                        <button className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded">
                          Engagement Rate
                        </button>
                        <button className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          Conversion Rate
                        </button>
                        <button className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          Click Rate
                        </button>
                      </div>
                    </div>
                    <div ref={trendChartRef} className="w-full h-64"></div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium mb-4">
                      Target Audience Distribution
                    </h3>
                    <div ref={audienceChartRef} className="w-full h-64"></div>
                  </div>
                </div>
              </section>

              {/* Platform Strategy View */}
              <section className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Platform Strategy View
                  </h2>
                  <button className="text-sm text-indigo-600 flex items-center">
                    <span>Edit Strategy</span>
                    <Edit size={16} className="ml-1" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {platforms.map((platform) => (
                    <div
                      key={platform.name}
                      className={`bg-white p-4 rounded-lg shadow-sm border-l-4`}
                      style={{ borderLeftColor: platform.color }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: platform.color + "1A" }}
                          >
                            <span style={{ color: platform.color }}>
                              {platform.icon}
                            </span>
                          </div>
                          <h3 className="ml-2 text-base font-medium">
                            {platform.name}
                          </h3>
                        </div>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            platform.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {platform.status}
                        </span>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div>
                          <p className="text-xs text-gray-500">Content Type</p>
                          <p className="text-sm font-medium">
                            {platform.contentType}
                          </p>
                        </div>

                        {platform.emotionDistribution && (
                          <div>
                            <p className="text-xs text-gray-500">
                              Emotion Distribution
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div
                                className="h-2 rounded-full"
                                style={{
                                  width: `${platform.emotionDistribution.emotion}%`,
                                  backgroundColor: platform.color,
                                }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                              <span>
                                Emotion-driven{" "}
                                {platform.emotionDistribution.emotion}%
                              </span>
                              <span>
                                Rational {platform.emotionDistribution.rational}
                                %
                              </span>
                            </div>
                          </div>
                        )}

                        {platform.contentForm && (
                          <div>
                            <p className="text-xs text-gray-500">
                              Content Form
                            </p>
                            <div className="flex space-x-2 mt-1">
                              {Object.entries(platform.contentForm).map(
                                ([type, percentage]) => (
                                  <span
                                    key={type}
                                    className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
                                  >
                                    {type.charAt(0).toUpperCase() +
                                      type.slice(1)}{" "}
                                    {percentage}%
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        <div>
                          <p className="text-xs text-gray-500">
                            Publishing Frequency
                          </p>
                          <p className="text-sm font-medium">
                            {platform.frequency}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Content Structure Analysis */}
              <section className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Content Structure Analysis
                  </h2>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium">
                    View Complete Analysis
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 col-span-1 lg:col-span-2">
                    <h3 className="text-sm font-medium mb-4">
                      Content Structure Heatmap
                    </h3>
                    <div ref={heatmapChartRef} className="w-full h-64"></div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium mb-4">
                      Content Style Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {contentStyleTags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1.5 text-sm rounded-full ${getTagColor(
                            index
                          )}`}
                        >
                          {tag.label} ({tag.count})
                        </span>
                      ))}
                    </div>

                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">
                        Content Similarity Recommendations
                      </h3>
                      <div className="space-y-2">
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              TikTok Viral Structure
                            </span>
                            <span className="text-xs text-indigo-600">
                              Similarity 87%
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Opening hook + Three key points + Emotional
                            resonance
                          </p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              Instagram High-conversion Template
                            </span>
                            <span className="text-xs text-indigo-600">
                              Similarity 74%
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Product close-up + Usage scenario + User reviews
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Top Content Performance */}
              <section className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Top Content Performance
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium">
                      <span>By Engagement Rate</span>
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Platform
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Post Title
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Publish Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Engagement Rate
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tags
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {topContentData.map((content, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <div
                                  className="w-6 h-6 rounded-full flex items-center justify-center mr-2"
                                  style={{
                                    backgroundColor:
                                      platforms.find(
                                        (p) => p.name === content.platform
                                      )?.color + "1A",
                                  }}
                                >
                                  <span className="text-xs">
                                    {getPlatformIcon(content.platform)}
                                  </span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                  {content.platform}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {content.title}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {content.date}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="text-sm font-medium text-green-600">
                                {content.engagement}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex space-x-1">
                                {content.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-indigo-600 hover:text-indigo-900">
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* AI Strategy Suggestions */}
              <section className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    AI Strategy Suggestions
                  </h2>
                  <button className="text-sm text-indigo-600 flex items-center">
                    <span>View All Suggestions</span>
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${
                        suggestion.priority === "High"
                          ? "border-l-green-500"
                          : "border-l-blue-500"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            suggestion.priority === "High"
                              ? "bg-green-100"
                              : "bg-blue-100"
                          }`}
                        >
                          <ArrowLeft
                            className={`${
                              suggestion.priority === "High"
                                ? "text-green-600"
                                : "text-blue-600"
                            }`}
                            size={16}
                          />
                        </div>
                        <h3 className="text-base font-medium">
                          {suggestion.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {suggestion.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          Priority: {suggestion.priority}
                        </span>
                        <button
                          className={`px-3 py-1 text-xs font-medium rounded ${
                            suggestion.priority === "High"
                              ? "bg-green-500 text-white"
                              : "bg-white border border-gray-300 text-gray-700"
                          }`}
                        >
                          {suggestion.priority === "High"
                            ? "Apply Suggestion"
                            : "View Details"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* User Interaction Insights */}
              <section className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    User Interaction Insights
                  </h2>
                  <div className="flex items-center space-x-2">
                    <div className="px-1 py-1 bg-gray-100 rounded-full">
                      <div className="flex items-center">
                        <button className="px-3 py-1 bg-white shadow-sm text-gray-700 rounded-full text-sm font-medium">
                          By Platform
                        </button>
                        <button className="px-3 py-1 text-gray-500 rounded-full text-sm font-medium">
                          By Time
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium mb-4">
                      CTA Performance Analysis
                    </h3>
                    <div ref={ctaChartRef} className="w-full h-64"></div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500">
                          Best Performing CTA
                        </p>
                        <p className="text-sm font-medium">Shop Now</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500">
                          Worst Performing CTA
                        </p>
                        <p className="text-sm font-medium">Learn More</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: "32%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium mb-4">
                      Interaction Path Funnel
                    </h3>
                    <div ref={funnelChartRef} className="w-full h-64"></div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Conversion Rate</span>
                        <span className="font-medium">24.3%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: "24.3%" }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Decreased 2.1% vs last month
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cross-Platform Content Distribution */}
              <section className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Cross-Platform Content Distribution
                  </h2>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium">
                    View Detailed Report
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 col-span-1 lg:col-span-2">
                    <h3 className="text-sm font-medium mb-4">
                      Platform Engagement Rate Trends (Last 30 Days)
                    </h3>
                    <div
                      ref={platformTrendChartRef}
                      className="w-full h-64"
                    ></div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium mb-4">
                      Platform Performance Share
                    </h3>
                    <div
                      ref={platformShareChartRef}
                      className="w-full h-64"
                    ></div>
                    <div className="mt-4">
                      <h4 className="text-xs font-medium text-gray-500 mb-2">
                        Platform Importance Ranking
                      </h4>
                      <div className="space-y-2">
                        {[
                          {
                            name: "TikTok",
                            icon: "🎵",
                            color: "#ff0050",
                            percentage: 42,
                          },
                          {
                            name: "Instagram",
                            icon: "📸",
                            color: "#E1306C",
                            percentage: 31,
                          },
                          {
                            name: "RedNote",
                            icon: "📖",
                            color: "#FF2442",
                            percentage: 19,
                          },
                          {
                            name: "LinkedIn",
                            icon: "💼",
                            color: "#0077B5",
                            percentage: 8,
                          },
                        ].map((platform) => (
                          <div
                            key={platform.name}
                            className="flex items-center"
                          >
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: platform.color + "1A" }}
                            >
                              <span className="text-xs">{platform.icon}</span>
                            </div>
                            <span className="ml-2 text-sm">
                              {platform.name}
                            </span>
                            <div className="ml-auto">
                              <span className="text-sm font-medium">
                                {platform.percentage}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Monthly Strategy Planning */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Monthly Strategy Planning
                  </h2>
                  <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium">
                    Add New Strategy
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 col-span-1 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">
                        Strategy Publishing Calendar
                      </h3>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 rounded-full hover:bg-gray-100">
                          <ArrowLeft size={16} />
                        </button>
                        <span className="text-sm font-medium">
                          {currentMonth}
                        </span>
                        <button className="p-1 rounded-full hover:bg-gray-100">
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            {[
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday",
                              "Saturday",
                              "Sunday",
                            ].map((day) => (
                              <th
                                key={day}
                                className="p-2 border text-xs font-medium text-gray-500"
                              >
                                {day}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {calendarData.slice(0, 7).map((day) => (
                              <td
                                key={day.day}
                                className={`p-2 border align-top h-24 ${
                                  day.isToday ? "bg-gray-50" : ""
                                }`}
                              >
                                <div className="text-xs text-gray-500">
                                  {day.day}{" "}
                                  {day.isToday && (
                                    <span className="text-indigo-600 font-medium">
                                      Today
                                    </span>
                                  )}
                                </div>
                                <div className="mt-1 space-y-1">
                                  {day.content.map((item, index) => (
                                    <div
                                      key={index}
                                      className="p-1 rounded text-xs"
                                      style={{
                                        backgroundColor: item.color + "1A",
                                      }}
                                    >
                                      <div className="flex items-center">
                                        <span className="text-xs">
                                          {getPlatformIcon(item.platform)}
                                        </span>
                                        <span className="ml-1 text-gray-700">
                                          {item.type}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </td>
                            ))}
                          </tr>
                          <tr>
                            {calendarData.slice(7, 14).map((day) => (
                              <td
                                key={day.day}
                                className="p-2 border align-top h-24"
                              >
                                <div className="text-xs text-gray-500">
                                  {day.day}
                                </div>
                                <div className="mt-1 space-y-1">
                                  {day.content.map((item, index) => (
                                    <div
                                      key={index}
                                      className="p-1 rounded text-xs"
                                      style={{
                                        backgroundColor: item.color + "1A",
                                      }}
                                    >
                                      <div className="flex items-center">
                                        <span className="text-xs">
                                          {getPlatformIcon(item.platform)}
                                        </span>
                                        <span className="ml-1 text-gray-700">
                                          {item.type}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium mb-4">
                      Monthly Strategy Goals
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm">Increase UGC content to 40%</p>
                          <span className="text-xs text-gray-500">
                            25% / 40%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: "62.5%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm">
                            RedNote platform focus on collections
                          </p>
                          <span className="text-xs text-gray-500">4 / 10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: "40%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm">
                            Reuse high-performance structures for multi-platform
                            experiments
                          </p>
                          <span className="text-xs text-gray-500">2 / 5</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: "40%" }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">
                        Strategy Tasks To-Do
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            className="mt-0.5 mr-2 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <div>
                            <p className="text-sm font-medium">
                              TikTok content structure optimization
                            </p>
                            <p className="text-xs text-gray-500">
                              Due: 2025-07-10
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            className="mt-0.5 mr-2 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <div>
                            <p className="text-sm font-medium">
                              Instagram product display template update
                            </p>
                            <p className="text-xs text-gray-500">
                              Due: 2025-07-15
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            checked
                            className="mt-0.5 mr-2 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            readOnly
                          />
                          <div>
                            <p className="text-sm font-medium line-through text-gray-400">
                              RedNote collection content planning
                            </p>
                            <p className="text-xs text-gray-400">
                              Completed on 2025-07-02
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
