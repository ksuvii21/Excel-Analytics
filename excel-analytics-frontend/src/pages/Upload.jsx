import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileSpreadsheet, ArrowRight, Crown, X } from "lucide-react";
import * as XLSX from "xlsx";
import Chart from "chart.js/auto";

// Animation components from landing.jsx
const FadeIn = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

// Helper function to convert values to numbers
const toNumber = (value) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const num = parseFloat(value.replace(/[^\d.-]/g, ''));
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

export default function Upload() {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("bar");
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showProMessage, setShowProMessage] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // Mouse tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parseExcel = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const data = new Uint8Array(evt.target.result);
          const wb = XLSX.read(data, { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const raw = XLSX.utils.sheet_to_json(ws, { header: 1 });
          
          if (!raw || raw.length === 0) {
            reject(new Error("Uploaded file contains no data."));
            return;
          }
          
          const headerRow = raw[0].map((h) => (h == null ? "" : String(h)));
          const dataRows = raw.slice(1).map((r) => Array.isArray(r) ? r : []);
          
          resolve({ headerRow, dataRows });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileChange = async (e) => {
    if (e.target.files.length) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      try {
        const { headerRow, dataRows } = await parseExcel(selectedFile);
        setColumns(headerRow);
        setRows(dataRows);
        setXAxis(headerRow[0] || "");
        setYAxis(headerRow[1] || "");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (isValidExcel(droppedFile)) {
        setFile(droppedFile);
        
        try {
          const { headerRow, dataRows } = await parseExcel(droppedFile);
          setColumns(headerRow);
          setRows(dataRows);
          setXAxis(headerRow[0] || "");
          setYAxis(headerRow[1] || "");
        } catch (error) {
          alert(error.message);
        }
      } else {
        alert("Please upload a valid Excel file (.xlsx or .xls)");
      }
    }
  };

  const isValidExcel = (file) => {
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
    return validTypes.includes(file.type) || 
           file.name.endsWith(".xlsx") || 
           file.name.endsWith(".xls");
  };

  const generateChart = () => {
    // Check if it's a pro chart type
    const proCharts = ["3dscatter", "3dbar", "3dline", "3dsurface", "radar", "polarArea", "bubble", "scatter", "doughnut"];
    
    if (proCharts.includes(chartType)) {
      setShowProMessage(true);
      return;
    }

    if (!rows.length) { 
      alert("No data available. Please upload an Excel file first."); 
      return; 
    }

    // Destroy any existing chart
    if (chartRef.current) {
      try {
        chartRef.current.destroy();
      } catch {}
      chartRef.current = null;
    }

    const xIndex = columns.indexOf(xAxis);
    const yIndex = columns.indexOf(yAxis);
    const built = rows.map((r, i) => ({
      rawX: r[xIndex],
      rawY: r[yIndex],
      xNum: Number(r[xIndex]),
      yNum: Number(r[yIndex]),
      label: String(r[xIndex] ?? `Row ${i+1}`)
    }));

    const labels = built.map((b) => b.label);
    const values = built.map((b) => b.yNum).filter((v) => !isNaN(v));

    // No values? Bail out gracefully
    if (!values.length) {
      alert("The selected Y-axis column has no numeric data to plot. Choose a different column.");
      return;
    }

    // Create 2D chart
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) {
      alert("Canvas context not available.");
      return;
    }

    try {
      chartRef.current = new Chart(ctx, {
        type: chartType,
        data: {
          labels,
          datasets: [
            {
              label: yAxis || "Value",
              data: values,
              backgroundColor: [
                "#3B82F6",
                "#8B5CF6",
                "#06B6D4",
                "#10B981",
                "#F59E0B",
                "#EF4444",
                "#EC4899",
                "#F97316",
                "#6366F1",
                "#14B8A6"
              ],
              borderColor: "#1F2937",
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "#374151",
                font: { size: 12, weight: "bold" }
              }
            },
            tooltip: { enabled: true }
          },
          scales:
            chartType !== "pie" && chartType !== "doughnut"
              ? {
                  x: {
                    title: {
                      display: true,
                      text: xAxis,
                      color: "#6B7280",
                      font: { weight: "bold" }
                    },
                    ticks: { color: "#6B7280" },
                    grid: { color: "rgba(0,0,0,0.04)" }
                  },
                  y: {
                    title: {
                      display: true,
                      text: yAxis,
                      color: "#6B7280",
                      font: { weight: "bold" }
                    },
                    ticks: { color: "#6B7280" },
                    grid: { color: "rgba(0,0,0,0.06)" }
                  }
                }
              : undefined,
          animation: { duration: 600 }
        }
      });
    } catch (err) {
      console.error(err);
      alert("Failed to render chart.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please select an Excel file!");
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // Generate the chart
      generateChart();
      
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Failed to process file. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const chartOptions = [
    { value: "bar", label: "Bar Chart", icon: "📊" },
    { value: "line", label: "Line Chart", icon: "📈" },
    { value: "pie", label: "Pie Chart", icon: "🥧" },
    { value: "doughnut", label: "Doughnut Chart", icon: "🍩", pro: true },
    { value: "radar", label: "Radar Chart", icon: "🕸️", pro: true },
    { value: "polarArea", label: "Polar Area", icon: "🎯", pro: true },
    { value: "bubble", label: "Bubble Chart", icon: "🫧", pro: true },
    { value: "scatter", label: "Scatter Plot", icon: "⚫", pro: true },
    { value: "3dscatter", label: "3D Scatter", icon: "🌐", pro: true },
    { value: "3dbar", label: "3D Bar", icon: "🟪", pro: true },
    { value: "3dline", label: "3D Line", icon: "〰️", pro: true },
    { value: "3dsurface", label: "3D Surface", icon: "🗻", pro: true }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Enhanced background from landing.jsx */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {/* Left planet */}
        <div className="absolute bottom-0 left-0 w-64 md:w-80 lg:w-[400px]">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <img 
              src={`${import.meta.env.BASE_URL}planet1.png`}
              className="relative z-10 w-full" 
              alt="Decorative planet" 
              style={{ 
                transform: 'translateX(-30%)',
                animation: 'float 6s ease-in-out infinite'
              }}
            />
          </div>
        </div>
        
        {/* Right planet */}
        <div className="absolute top-10 right-10 w-48 md:w-72 lg:w-[300px]">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <img 
              src={`${import.meta.env.BASE_URL}planet2.png`}
              className="relative z-10 w-full" 
              alt="Decorative planet" 
              style={{ 
                transform: 'translateX(30%)',
                animation: 'float 8s ease-in-out infinite reverse'
              }}
            />
          </div>
        </div>

        {/* Glowing stars */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.8 + 0.2,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}

        {/* Interactive cursor gradient */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl transition-all duration-1000 pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Enhanced Navbar from landing.jsx */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full relative z-50">
        <Link 
          to="/" 
          className="text-white font-bold text-3xl relative group"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
            Excel Analytics
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 transition-all duration-500 group-hover:w-full"></span>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-pink-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </Link>
        
        <ul className="hidden md:flex items-center gap-6 text-white">
          {['home', 'about', 'features', 'services'].map((item) => (
            <li key={item}>
              <Link
                to={`/#${item.toLowerCase()}`}
                className="relative py-1 px-3 group transition-all duration-300 hover:text-indigo-300"
              >
                <span className="relative z-10 capitalize">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </span>
                <span className="absolute inset-0 bg-gray-800/80 rounded-lg scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-0 backdrop-blur-sm"></span>
                <span className="absolute inset-0 rounded-lg bg-blue-500 blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Link>
            </li>
          ))}
          
          <li>
            <Link 
              to="/login" 
              className="relative inline-block px-4 py-2 font-medium overflow-hidden rounded-lg group"
            >
              <span className="relative z-10 text-white">Sign In</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-1/2 w-0 h-full bg-white/20 transition-all duration-700 group-hover:w-3/4 group-hover:left-0 transform -skew-x-12"></span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Upload section with landing.jsx styling */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-16 pb-32">
        <div className="container mx-auto px-4 relative z-10 w-full">
          <div className="max-w-4xl mx-auto w-full">
            <FadeIn delay={0.2}>
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 hover:scale-105 transition-transform duration-500">
                  Turn your <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Excel</span> into <br />
                  <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Actionable Insights</span>
                </h1>
                <p className="text-xl text-zinc-300 max-w-xl mx-auto">
                  Unlock hidden potential in your data with beautiful visualizations and 
                  interactive dashboards. Transform spreadsheets into compelling stories.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <form 
                onSubmit={handleSubmit}
                className="w-full bg-gray-800/50 backdrop-blur-lg rounded-2xl p-1 border border-gray-700 shadow-xl"
              >
                <div 
                  className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 transition-all duration-300 ${
                    dragActive 
                      ? "border-blue-400 bg-blue-900/20" 
                      : "border-gray-700 hover:border-gray-500 bg-gray-800/30"
                  }`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <input 
                    type="file" 
                    accept=".xlsx,.xls" 
                    onChange={handleFileChange} 
                    className="hidden" 
                    id="fileInput"
                    ref={fileInputRef}
                  />
                  
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="p-4 rounded-full bg-gradient-to-br from-purple-900/30 to-blue-900/30 group-hover:scale-110 transition-transform duration-300">
                      <FileSpreadsheet className="h-12 w-12 text-blue-400" />
                    </div>
                    
                    <div className="text-center">
                      {file ? (
                        <>
                          <p className="text-lg font-medium mb-1">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-400 mb-4">
                            {Math.round(file.size / 1024)} KB
                          </p>
                          <button
                            type="button"
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                            onClick={() => fileInputRef.current.click()}
                          >
                            Select different file
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-medium mb-2">
                            {dragActive ? "Drop your file here" : "Drag & drop your Excel file"}
                          </p>
                          <p className="text-gray-400 text-sm mb-6">
                            Only <span className="font-semibold">.xlsx</span> and{" "}
                            <span className="font-semibold">.xls</span> files accepted
                          </p>
                          <label
                            htmlFor="fileInput"
                            className="cursor-pointer px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 inline-block"
                          >
                            Browse Files
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {dragActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-900/30 rounded-2xl">
                      <div className="p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-blue-400">
                        <p className="text-blue-300 font-medium">Drop to upload</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* X and Y Axis Selection */}
                {file && columns.length > 0 && (
                  <div className="mt-6 px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        X-Axis
                      </label>
                      <select 
                        value={xAxis} 
                        onChange={(e) => setXAxis(e.target.value)} 
                        className="w-full bg-gray-700 border-2 border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-900 transition-all"
                      >
                        {columns.map((column, index) => (
                          <option key={index} value={column}>
                            {column}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Y-Axis
                      </label>
                      <select 
                        value={yAxis} 
                        onChange={(e) => setYAxis(e.target.value)} 
                        className="w-full bg-gray-700 border-2 border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-900 transition-all"
                      >
                        {columns.map((column, index) => (
                          <option key={index} value={column}>
                            {column}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Chart Type Selection */}
                {file && (
                  <div className="mt-6 px-6">
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Chart Type
                    </label>
                    <div className="relative">
                      <select 
                        value={chartType} 
                        onChange={(e) => setChartType(e.target.value)} 
                        className="w-full appearance-none bg-gray-700 border-2 border-gray-600 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-900 transition-all"
                      >
                        {chartOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.icon} {option.label} {option.pro && "🔒"}
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
                )}

                {/* Chart Preview */}
                {file && rows.length > 0 && (
                  <div className="mt-6 px-6">
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <h3 className="text-gray-300 font-medium mb-3">Preview</h3>
                      <div className="w-full h-64 bg-gray-800/50 rounded-lg p-4">
                        <canvas ref={canvasRef} className="w-full h-full" />
                      </div>
                      <button
                        type="button"
                        onClick={generateChart}
                        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        Refresh Preview
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-8 px-4 pb-6 flex justify-center">
                  <button 
                    type="submit" 
                    disabled={!file || isProcessing}
                    className={`px-8 py-4 rounded-2xl font-medium text-lg w-full max-w-xs transition-all duration-300 flex items-center justify-center group ${
                      file && !isProcessing
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/20 hover:shadow-green-500/30 cursor-pointer transform hover:-translate-y-1"
                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : file ? (
                      <>
                        Generate Chart <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      "Upload File First"
                    )}
                  </button>
                </div>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-gray-500 text-sm relative z-10">
        Transform raw data into compelling business narratives
      </div>

      {/* Pro Message Modal */}
      {showProMessage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full relative">
            <button 
              onClick={() => setShowProMessage(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mb-4">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Premium Feature</h3>
              <p className="text-gray-300">
                This chart type is available with a Pro subscription. Please login to access all advanced features.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setShowProMessage(false)}
                className="flex-1 py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Maybe Later
              </button>
              <Link 
                to="/login"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg transition-all text-center"
              >
                Login Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}