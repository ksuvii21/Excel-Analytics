import React, { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import { useAuth } from "../../context/AuthContext";
import http from '../../utils/http';
import InsightsButton from '../../components/InsightsButton';
import * as XLSX from "xlsx";
import { 
  FileSpreadsheet, BarChart4, TrendingUp, Clock, 
  Download, Share, Edit, Trash2, Plus, Activity,
  Calendar, Eye, Upload, PieChart
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Enhanced SVG-based pie chart component with numbers
// Enhanced SVG-based pie chart component with numbers
const DecorativePieChart = ({ data, colors, size = "w-24 h-24" }) => {
  const total = data.reduce((sum, value) => sum + value, 0);
  let cumulativePercentage = 0;
  
  // Pre-calculate segments
  const segments = data.map((value, index) => {
    const percentage = (value / total) * 100;
    const startAngle = cumulativePercentage * 3.6;
    cumulativePercentage += percentage;
    const endAngle = cumulativePercentage * 3.6;
    const midAngle = (startAngle + endAngle) / 2;
    
    return {
      percentage,
      startAngle,
      endAngle,
      midAngle,
      color: colors[index]
    };
  });
  
  return (
    <div className={`${size} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {segments.map((segment, index) => {
          // Calculate coordinates for arc
          const x1 = 50 + 50 * Math.cos((segment.startAngle - 90) * (Math.PI / 180));
          const y1 = 50 + 50 * Math.sin((segment.startAngle - 90) * (Math.PI / 180));
          const x2 = 50 + 50 * Math.cos((segment.endAngle - 90) * (Math.PI / 180));
          const y2 = 50 + 50 * Math.sin((segment.endAngle - 90) * (Math.PI / 180));
          
          // Determine if this is a large arc
          const largeArcFlag = segment.percentage > 50 ? 1 : 0;
          
          return (
            <path
              key={index}
              d={`M50,50 L${x1},${y1} A50,50 0 ${largeArcFlag},1 ${x2},${y2} Z`}
              fill={segment.color}
              stroke="none"
            />
          );
        })}
        <circle cx="50" cy="50" r="35" fill="transparent" />
        
        {/* Display percentages */}
        {segments.map((segment, index) => {
          // Calculate text position based on mid angle
          const x = 50 + 30 * Math.cos((segment.midAngle - 90) * (Math.PI / 180));
          const y = 50 + 30 * Math.sin((segment.midAngle - 90) * (Math.PI / 180));
          
          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor="middle"
              fontSize="8"
              fill="white"
              fontWeight="bold"
              dy=".3em" // Vertically center the text
            >
              {Math.round(segment.percentage)}%
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [fileName, setFileName] = useState("");
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("bar");
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [insights, setInsights] = useState({});
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    try {
      const { data } = await http.get('/files/my');
      setFiles(data);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load files');
    }
  };

  const loadInsights = async (fileId) => {
    try {
      const { data } = await http.get(`/insights/${fileId}`);
      setInsights((prev) => ({ ...prev, [fileId]: data }));
    } catch (e) {
      // silent
    }
  };

  useEffect(() => { load(); }, []);
  

  useEffect(() => {
    if (!user) return;
    // Mock data for demonstration
    const mockHistory = [
      { _id: "1", fileName: "Sales Data.xlsx", chartType: "bar", xAxis: "Month", yAxis: "Revenue", date: new Date() },
      { _id: "2", fileName: "Expenses.xlsx", chartType: "pie", xAxis: "Category", yAxis: "Amount", date: new Date(Date.now() - 86400000) },
      { _id: "3", fileName: "User Growth.xlsx", chartType: "line", xAxis: "Quarter", yAxis: "Users", date: new Date(Date.now() - 172800000) }
    ];
    setHistory(mockHistory);
  }, [user]);

  const handleFileUpload = (e) => {
    setErrorMessage(""); 
    setInfoMessage("");
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const wb = XLSX.read(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const raw = XLSX.utils.sheet_to_json(ws, { header: 1 });
        if (!raw || raw.length === 0) {
          setErrorMessage("Uploaded file contains no data.");
          return;
        }
        const headerRow = raw[0].map((h) => (h == null ? "" : String(h)));
        const dataRows = raw.slice(1).map((r) => Array.isArray(r) ? r : []);
        setColumns(headerRow);
        setRows(dataRows);
        setXAxis(headerRow[0] ?? "");
        setYAxis(headerRow[1] ?? "");
        setInfoMessage(`Successfully loaded ${dataRows.length} rows and ${headerRow.length} columns.`);
      } catch {
        setErrorMessage("Failed to parse the Excel file.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleGenerateVisualization = () => {
    setErrorMessage(""); 
    setInfoMessage("");
    if (!rows.length) { 
      setErrorMessage("No data available. Please upload an Excel file first."); 
      return; 
    }

    // Navigate to presentation page with the data
    navigate('/presentation', { 
      state: { 
        fileName, 
        columns, 
        rows, 
        xAxis, 
        yAxis, 
        chartType 
      } 
    });
  };
  

  const chartOptions = [
    { value: "bar", label: "Bar Chart", icon: "📊" },
    { value: "line", label: "Line Chart", icon: "📈" },
    { value: "pie", label: "Pie Chart", icon: "🥧" },
    { value: "doughnut", label: "Doughnut Chart", icon: "🍩" },
    { value: "radar", label: "Radar Chart", icon: "🕸️" },
    { value: "polarArea", label: "Polar Area", icon: "🎯" },
  ];

  // Decorative chart data with ratios
  const decorativeCharts = [
    { data: [35, 25, 40], colors: ["#3B82F6", "#8B5CF6", "#06B6D4"] },
    { data: [45, 30, 25], colors: ["#10B981", "#F59E0B", "#EF4444"] },
    { data: [20, 50, 30], colors: ["#8B5CF6", "#EC4899", "#F97316"] }
  ];

  return (
    <UserLayout>
      {/* Enhanced Dark Background */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
        {/* Animated Background Elements */}
        <div className="absolute top-20 right-32 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-r from-indigo-500/8 to-cyan-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-purple-500/12 to-pink-600/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400/20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDuration: `${Math.random() * 4 + 3}s`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Controls */}
        <div className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user?.name || 'User'}
            </h1>
            <p className="text-gray-400">Here's what's happening with your data today.</p>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Files Uploaded */}
          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-800/90 to-blue-900/30 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700/50 hover:border-blue-500/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg">
                  <FileSpreadsheet className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">24</div>
                  <div className="text-sm text-gray-400">Files Uploaded</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" /> +2 this week
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full"></div>
            </div>
          </div>

          {/* Charts Created */}
          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-800/90 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700/50 hover:border-purple-500/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-700 rounded-xl shadow-lg">
                  <BarChart4 className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">18</div>
                  <div className="text-sm text-gray-400">Charts Created</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" /> +5 this week
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full"></div>
            </div>
          </div>

          {/* Success Rate */}
          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-800/90 to-green-900/30 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700/50 hover:border-green-500/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">87%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" /> +3% improvement
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-full"></div>
            </div>
          </div>

          {/* Last Active */}
          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-800/90 to-orange-900/30 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700/50 hover:border-orange-500/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-orange-600 to-amber-700 rounded-xl shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    {history[0]?.date ? new Date(history[0].date).toLocaleDateString() : "—"}
                  </div>
                  <div className="text-sm text-gray-400">Last Active</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-blue-400">
                <Clock className="h-4 w-4 mr-1" />
                {history[0]?.date ? new Date(history[0].date).toLocaleTimeString() : "—"}
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full"></div>
            </div>
          </div>
        </div>

        {/* Decorative Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {decorativeCharts.map((chart, index) => (
            <div key={index} className="group hover:scale-105 transition-transform duration-300">
              <div className="relative overflow-hidden bg-gradient-to-br from-gray-800/90 to-indigo-900/30 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700/50 hover:border-indigo-500/50 flex items-center justify-center">
                <DecorativePieChart data={chart.data} colors={chart.colors} size="w-32 h-32" />
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3 flex-grow">
          {/* Upload & Analyze - Takes 2/3 width */}
          <div className="lg:col-span-2">
            <div className="group hover:scale-[1.02] transition-transform duration-300">
              <div className="relative bg-gradient-to-br from-gray-800/90 to-blue-900/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700/50 hover:border-blue-500/50">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg mr-4">
                    <FileSpreadsheet className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">Upload & Analyze</h3>
                    <p className="text-gray-400">Transform your Excel files into beautiful insights</p>
                  </div>
                </div>
                
                {/* File Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    <Upload className="inline h-4 w-4 mr-2" />
                    Upload Excel File
                  </label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept=".xls,.xlsx" 
                      onChange={handleFileUpload} 
                      className="w-full border-2 border-dashed border-gray-600 rounded-2xl p-4 text-center bg-gray-700/50 hover:border-blue-500 transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700" 
                    />
                  </div>
                  {fileName && (
                    <div className="mt-3 p-3 bg-blue-900/30 rounded-xl">
                      <div className="flex items-center text-sm text-blue-300">
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        <span className="font-medium">Loaded: {fileName}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Axis Selection */}
                {rows.length > 0 && (
                  <div className="space-y-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        X-Axis Column
                      </label>
                      <div className="relative">
                        <select 
                          value={xAxis} 
                          onChange={(e) => setXAxis(e.target.value)} 
                          className="w-full appearance-none bg-gray-700 border-2 border-gray-600 rounded-xl px-4 py-3 pr-10 text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-800 transition-all"
                        >
                          {columns.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Y-Axis Column
                      </label>
                      <div className="relative">
                        <select 
                          value={yAxis} 
                          onChange={(e) => setYAxis(e.target.value)} 
                          className="w-full appearance-none bg-gray-700 border-2 border-gray-600 rounded-xl px-4 py-3 pr-10 text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-800 transition-all"
                        >
                          {columns.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        <PieChart className="inline h-4 w-4 mr-2" />
                        Chart Type
                      </label>
                      <div className="relative">
                        <select 
                          value={chartType} 
                          onChange={(e) => setChartType(e.target.value)} 
                          className="w-full appearance-none bg-gray-700 border-2 border-gray-600 rounded-xl px-4 py-3 pr-10 text-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-800 transition-all"
                        >
                          {chartOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.icon} {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Messages */}
                {errorMessage && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-red-900/30 to-pink-900/20 border border-red-800 rounded-xl">
                    <div className="flex items-center text-red-300">
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">{errorMessage}</span>
                    </div>
                  </div>
                )}

                {infoMessage && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-800 rounded-xl">
                    <div className="flex items-center text-green-300">
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">{infoMessage}</span>
                    </div>
                  </div>
                )}

                {/* Generate Chart Button */}
                <button 
                  onClick={handleGenerateVisualization} 
                  className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  <BarChart4 className="h-5 w-5 mr-3" /> 
                  Generate Visualization
                </button>

                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full"></div>
              </div>
            </div>
          </div>

          {/* Quick Actions - Takes 1/3 width */}
          <div className="space-y-6">
            <div className="group hover:scale-[1.02] transition-transform duration-300">
              <div className="relative bg-gradient-to-br from-gray-800/90 to-purple-900/20 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700/50 hover:border-purple-500/50">
                <div className="flex items-center mb-4">
                  <Activity className="h-6 w-6 text-purple-400 mr-3" />
                  <h3 className="text-xl font-bold text-white">Quick Actions</h3>
                </div>
                <div className="space-y-3">
                  <button 
                    onClick={() => window.location.href = '/upload'}
                    className="w-full flex items-center gap-3 p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-all duration-200 text-left group"
                  >
                    <Plus className="h-5 w-5 text-blue-400" />
                    <span className="text-gray-300 group-hover:text-white">New Analysis</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-all duration-200 text-left group">
                    <Download className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300 group-hover:text-white">Export Data</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-all duration-200 text-left group">
                    <Share className="h-5 w-5 text-orange-400" />
                    <span className="text-gray-300 group-hover:text-white">Share Report</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="group hover:scale-[1.02] transition-transform duration-300">
              <div className="relative bg-gradient-to-br from-gray-800/90 to-emerald-900/20 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700/50 hover:border-emerald-500/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Activity Feed</h3>
                  <Calendar className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Chart created 2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">File uploaded successfully</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-300">Report shared with team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="group hover:scale-[1.01] transition-transform duration-300">
            <div className="relative bg-gradient-to-br from-gray-800/90 to-purple-900/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700/50 hover:border-purple-500/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-700 rounded-2xl shadow-lg mr-4">
                    <BarChart4 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">Recent Activity</h3>
                    <p className="text-gray-400">Your latest charts and analytics</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-all duration-200">
                    <Eye className="h-4 w-4" />
                    View All
                  </button>
                </div>
              </div>
              
              {history.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {history.slice(0, 6).map((item) => (
                    <div key={item._id} className="group/item hover:scale-105 transition-transform duration-200">
                      <div className="p-5 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 hover:border-gray-500 rounded-xl transition-all duration-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                            <BarChart4 className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                            <button className="p-1 hover:bg-gray-600 rounded">
                              <Edit className="h-4 w-4 text-gray-400 hover:text-white" />
                            </button>
                            <button className="p-1 hover:bg-gray-600 rounded">
                              <Share className="h-4 w-4 text-gray-400 hover:text-white" />
                            </button>
                            <button className="p-1 hover:bg-gray-600 rounded">
                              <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-400" />
                            </button>
                          </div>
                        </div>
                        <h4 className="font-semibold text-white mb-2 truncate">{item.fileName}</h4>
                        <p className="text-sm text-gray-400 mb-3">
                          <span className="inline-block px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs font-medium mr-2">
                            {item.chartType.toUpperCase()}
                          </span>
                          {item.xAxis} vs {item.yAxis}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(item.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="p-4 bg-gray-700/30 rounded-full w-fit mx-auto mb-4">
                    <BarChart4 className="h-12 w-12 text-gray-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-400 mb-2">No analyses yet</h4>
                  <p className="text-gray-500">Upload your first file to get started with data visualization</p>
                </div>
              )}
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full"></div>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold">My Upload History</h1>
      {error && <div className="text-red-600">{error}</div>}

      <div className="grid gap-4">
        {files.map(f => (
          <div key={f._id} className="border rounded p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{f.originalname}</div>
                <div className="text-sm opacity-70">Uploaded {new Date(f.createdAt).toLocaleString()}</div>
                <div className="text-sm opacity-70">Size {(f.size/1024).toFixed(1)} KB</div>
              </div>
              <InsightsButton
                fileId={f._id}
                onCreated={() => loadInsights(f._id)}
              />
            </div>

            <div className="mt-3">
              <button className="underline text-sm" onClick={() => loadInsights(f._id)}>Show insights</button>
              <div className="mt-2 text-sm">
                {(insights[f._id] || []).length === 0 && <div className="opacity-70">No insights yet.</div>}
                {(insights[f._id] || []).map(i => (
                  <div key={i._id} className="border rounded p-2 mb-2">
                    <div className="opacity-60">{new Date(i.createdAt).toLocaleString()}</div>
                    <div>{i.summary}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {files.length === 0 && <div>No uploads yet.</div>}
      </div>
    </div>
      </div>
    </UserLayout>
  );
}