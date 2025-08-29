// Presentation.jsx
import React, { useState, useRef, useEffect, useMemo } from "react";
import * as XLSX from "xlsx";
import Chart from "chart.js/auto";
import * as THREE from "three";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { historyAPI } from "../utils/api";
import {
  FileSpreadsheet,
  BarChart4,
  Save,
  SlidersHorizontal,
  TrendingUp,
  PieChart,
  Upload,
  Settings,
  Eye,
  Database,
  Download,
} from "lucide-react";

/**
 * Utility: convert non-numeric values to number
 */
const toNumber = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const num = parseFloat(value.replace(/[^\d.-]/g, ""));
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

// Mock auth hook (replace with your auth context/hook)
const useAuth = () => ({ user: { id: "demo-user" } });

/* -------------------------------------------------------------------------- */
/*                        Decorative Pie Chart Component                       */
/* -------------------------------------------------------------------------- */
const DecorativePieChart = ({ data, colors, size = "w-24 h-24" }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        animation: { animateRotate: true, animateScale: true },
      },
    });
    return () => {
      try {
        chartRef.current?.destroy();
      } catch {}
    };
  }, [data, colors]);

  return (
    <div className={`${size} relative`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 Component                                   */
/* -------------------------------------------------------------------------- */
export default function Presentation() {
  const location = useLocation();
  const { user } = useAuth?.() || {};

  // Data + config state
  const [fileName, setFileName] = useState("");
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]); // rows: array of arrays: [ [c1, c2, ...], ... ]
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("bar");

  // UI state
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [workbook, setWorkbook] = useState(null);

  // Refs
  const canvasRef = useRef(null); // DOM canvas for Chart.js
  const chartRef = useRef(null); // Chart.js instance
  const threeContainerRef = useRef(null);
  const threeSceneRef = useRef(
    /** @type {null | { renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, frame?: number, _cleanup?: ()=>void}} */ (
      null
    )
  );

  // Decorative charts
  const decorativeCharts = useMemo(
    () => [
      { data: [35, 25, 40], colors: ["#3B82F6", "#8B5CF6", "#06B6D4"] },
      { data: [45, 30, 25], colors: ["#10B981", "#F59E0B", "#EF4444"] },
      { data: [20, 50, 30], colors: ["#8B5CF6", "#EC4899", "#F97316"] },
    ],
    []
  );

  /*******************************
   * Lifecycle: cleanup on unmount
   *******************************/
  useEffect(() => {
    return () => {
      // destroy chartjs
      try {
        chartRef.current?.destroy();
      } catch {}
      // dispose three.js if present
      if (threeSceneRef.current) {
        try {
          disposeThree();
        } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*******************************
   * Handle preloaded state via router
   *******************************/
  useEffect(() => {
    if (location.state) {
      const { fileName, columns, rows, xAxis, yAxis, chartType } = location.state;
      if (fileName) setFileName(fileName);
      if (columns) setColumns(columns);
      if (rows) setRows(rows);
      setXAxis(xAxis || (columns?.[0] || ""));
      setYAxis(yAxis || (columns?.[1] || ""));
      setChartType(chartType || "bar");

      if (!rows || rows.length === 0) {
        setErrorMessage("No valid data found in uploaded file.");
        return;
      }

      // Auto-generate chart once state applied
      setTimeout(() => {
        if (rows.length > 0) {
          generateChart();
        }
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  /*******************************
   * Load history on mount (if user)
   *******************************/
  useEffect(() => {
    if (user?.id) {
      loadHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  /*******************************
   * File upload handler
   *******************************/
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const wb = XLSX.read(data, { type: "array" });
      setWorkbook(wb);
      const ws = wb.Sheets[wb.SheetNames[0]];
      // header:1 to get raw rows
      const raw = XLSX.utils.sheet_to_json(ws, { header: 1 });
      if (!raw || raw.length === 0) {
        setErrorMessage("Uploaded file contained no data.");
        return;
      }
      const headerRow = raw[0].map((h) => String(h || ""));
      const dataRows = raw.slice(1);
      setColumns(headerRow);
      setRows(dataRows);
      // default axis picks
      setXAxis(headerRow[0] || "");
      setYAxis(headerRow[1] || headerRow[0] || "");
      setErrorMessage("");
      setInfoMessage("File loaded. Select axes and chart type, then generate.");
    };
    reader.readAsArrayBuffer(file);
  };

  /*******************************
   * Chart & Three helpers
   *******************************/
  const safeDestroyChart = () => {
    if (chartRef.current) {
      try {
        chartRef.current.destroy();
      } catch {}
      chartRef.current = null;
    }
  };

  const resetThreeContainer = () => {
    const container = threeContainerRef.current;
    if (container) {
      while (container.firstChild) {
        try {
          container.removeChild(container.firstChild);
        } catch {}
      }
    }
  };

  const disposeThree = () => {
    const store = threeSceneRef.current;
    if (!store) return;
    const { renderer, scene, frame, _cleanup } = store;

    if (frame != null) {
      try {
        cancelAnimationFrame(frame);
      } catch {}
    }

    // Traverse & dispose geometries/materials/textures
    try {
      scene.traverse((obj) => {
        if (obj.geometry) {
          try {
            obj.geometry.dispose();
          } catch {}
        }
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => {
              try {
                m.dispose?.();
              } catch {}
            });
          } else {
            try {
              obj.material.dispose?.();
            } catch {}
          }
        }
      });
    } catch {}

    // Dispose renderer
    try {
      renderer.dispose();
    } catch {}

    // cleanup event listeners
    try {
      _cleanup?.();
    } catch {}

    resetThreeContainer();
    threeSceneRef.current = null;
  };

  const initThree = () => {
    const container = threeContainerRef.current;
    if (!container) {
      setErrorMessage("3D container not available.");
      return null;
    }

    const width = Math.max(1, container.clientWidth || 1);
    const height = Math.max(1, container.clientHeight || 1);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 15, 40);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);

    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.7);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(1, 2, 1);
    scene.add(ambientLight);
    scene.add(directionalLight);

    const grid = new THREE.GridHelper(100, 20, 0xcccccc, 0xeeeeee);
    grid.position.y = 0;
    scene.add(grid);

    const store = { scene, camera, renderer, frame: undefined };
    threeSceneRef.current = store;

    const handleResize = () => {
      const w = Math.max(1, container.clientWidth || 1);
      const h = Math.max(1, container.clientHeight || 1);
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    store._cleanup = () => {
      window.removeEventListener("resize", handleResize);
    };

    return store;
  };

  const animateThree = () => {
    const store = threeSceneRef.current;
    if (!store) return;
    const { renderer, scene, camera } = store;

    const loop = () => {
      store.frame = requestAnimationFrame(loop);
      scene.rotation.y += 0.0015;
      renderer.render(scene, camera);
    };
    loop();
  };

  /*******************************
   * 3D chart generators
   *******************************/
  const generateThreeScatter = () => {
    disposeThree();
    resetThreeContainer();
    const store = initThree();
    if (!store) return;
    const { scene } = store;

    const xIndex = columns.indexOf(xAxis);
    const yIndex = columns.indexOf(yAxis);
    if (xIndex < 0 || yIndex < 0) {
      setErrorMessage("Invalid X/Y axis selection. Please choose valid columns.");
      return;
    }

    const built = rows
      .map((r) => ({
        x: toNumber(r[xIndex]),
        y: toNumber(r[yIndex]),
        z: Math.random() * 30 - 15,
      }))
      .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));

    if (!built.length) {
      setErrorMessage("No numeric X/Y data to plot in 3D scatter.");
      return;
    }

    built.forEach((p, i) => {
      const geometry = new THREE.SphereGeometry(0.6, 16, 16);
      const hue = (i * 0.07) % 1;
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(hue, 0.65, 0.55),
        shininess: 90,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(p.x, p.y, p.z);
      scene.add(sphere);
    });

    setInfoMessage(`Rendered 3D scatter plot with ${built.length} data points.`);
    animateThree();
  };

  const generateThreeBar = () => {
    disposeThree();
    resetThreeContainer();
    const store = initThree();
    if (!store) return;
    const { scene } = store;

    const xIndex = columns.indexOf(xAxis);
    const yIndex = columns.indexOf(yAxis);
    if (xIndex < 0 || yIndex < 0) {
      setErrorMessage("Invalid X/Y axis selection. Please choose valid columns.");
      return;
    }

    const built = rows.map((r, i) => ({
      x: i * 2.0,
      y: toNumber(r[yIndex]),
      label: String(r[xIndex]),
    }));

    const offset = (built.length * 2.0) / 2;

    built.forEach((b, i) => {
      const height = Math.max(0, b.y);
      const geometry = new THREE.BoxGeometry(1.5, Math.max(0.001, height), 1.5);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(`hsl(${(i * 37) % 360}, 70%, 60%)`),
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(b.x - offset, height / 2, 0);
      scene.add(cube);
    });

    setInfoMessage(`Rendered 3D bar chart with ${built.length} bars.`);
    animateThree();
  };

  const generateThreeLine = () => {
    disposeThree();
    resetThreeContainer();
    const store = initThree();
    if (!store) return;
    const { scene } = store;

    const xIndex = columns.indexOf(xAxis);
    const yIndex = columns.indexOf(yAxis);
    if (xIndex < 0 || yIndex < 0) {
      setErrorMessage("Invalid X/Y axis selection. Please choose valid columns.");
      return;
    }

    const points = rows.map((r, i) => {
      const y = toNumber(r[yIndex]);
      return new THREE.Vector3(i * 1.2, y, 0);
    });

    if (!points.length) {
      setErrorMessage("No data points available to render 3D line.");
      return;
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x3b82f6 });
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    points.forEach((p, idx) => {
      const sphereGeom = new THREE.SphereGeometry(0.25, 12, 12);
      const sphereMat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(`hsl(${(idx * 45) % 360}, 70%, 55%)`),
      });
      const marker = new THREE.Mesh(sphereGeom, sphereMat);
      marker.position.copy(p);
      scene.add(marker);
    });

    setInfoMessage(`Rendered 3D line chart with ${points.length} points.`);
    animateThree();
  };

  const generateThreeSurface = () => {
    disposeThree();
    resetThreeContainer();
    const store = initThree();
    if (!store) return;
    const { scene } = store;

    const size = 30;
    const segments = 40;
    const geometry = new THREE.PlaneGeometry(size, size, segments, segments);

    const pos = geometry.attributes.position;
    const v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      const z =
        Math.sin(v3.x * 0.35) * Math.cos(v3.y * 0.35) * 2 +
        Math.sin((v3.x + v3.y) * 0.2) * 1.2;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();

    const material = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      wireframe: true,
    });

    const surface = new THREE.Mesh(geometry, material);
    surface.rotation.x = -Math.PI / 2;
    scene.add(surface);

    setInfoMessage("Rendered 3D surface chart.");
    animateThree();
  };

  /*******************************
   * 2D Chart generator (Chart.js)
   *******************************/
  const generateChart = () => {
    setErrorMessage("");
    setInfoMessage("");
    if (!rows || rows.length === 0) {
      setErrorMessage("No data available. Please upload an Excel file first.");
      return;
    }

    safeDestroyChart();
    disposeThree();

    // 3D route
    if (chartType.startsWith("3d")) {
      switch (chartType) {
        case "3dscatter":
          generateThreeScatter();
          break;
        case "3dbar":
          generateThreeBar();
          break;
        case "3dline":
          generateThreeLine();
          break;
        case "3dsurface":
          generateThreeSurface();
          break;
        default:
          setErrorMessage("Unsupported 3D chart type.");
      }
      return;
    }

    const xIndex = columns.indexOf(xAxis);
    const yIndex = columns.indexOf(yAxis);

    const built = rows.map((r, i) => ({
      rawX: r[xIndex],
      rawY: r[yIndex],
      xNum: Number(r[xIndex]),
      yNum: Number(r[yIndex]),
      label: String(r[xIndex] ?? `Row ${i + 1}`),
    }));

    const labels = built.map((b) => b.label);
    const values = built.map((b) => b.yNum).filter((v) => !isNaN(v));

    if (!values.length) {
      setErrorMessage("The selected Y-axis column has no numeric data to plot.");
      return;
    }

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) {
      setErrorMessage("Canvas context not available.");
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
                "#14B8A6",
              ],
              borderColor: "#1F2937",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "#374151",
                font: { size: 12, weight: "bold" },
              },
            },
            tooltip: { enabled: true },
          },
          scales:
            chartType !== "pie" && chartType !== "doughnut"
              ? {
                  x: { ticks: { color: "#6B7280" }, grid: { color: "rgba(0,0,0,0.04)" } },
                  y: { ticks: { color: "#6B7280" }, grid: { color: "rgba(0,0,0,0.06)" } },
                }
              : undefined,
          animation: { duration: 600 },
        },
      });

      setInfoMessage(`Successfully rendered ${chartType} chart with ${values.length} data points.`);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to render Chart.js chart.");
    }
  };

  /*******************************
   * Downloads
   *******************************/
  const handleDownloadChart = () => {
    try {
      let imageData;
      const filename = `chart-${new Date().getTime()}.png`;

      if (chartType.startsWith("3d") && threeSceneRef.current) {
        const renderer = threeSceneRef.current.renderer;
        if (!renderer?.domElement) {
          setErrorMessage("3D renderer not available for download.");
          return;
        }
        imageData = renderer.domElement.toDataURL("image/png");
      } else if (chartRef.current && typeof chartRef.current.toBase64Image === "function") {
        imageData = chartRef.current.toBase64Image();
      } else if (canvasRef.current) {
        imageData = canvasRef.current.toDataURL("image/png");
      } else {
        setErrorMessage("No chart available to download.");
        return;
      }

      const link = document.createElement("a");
      link.href = imageData;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setInfoMessage("Chart downloaded successfully.");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to download chart image.");
    }
  };

  const handleDownloadCSV = () => {
    if (!columns || !rows) {
      setErrorMessage("No data to export.");
      return;
    }
    try {
      const csvLines = [];
      csvLines.push(columns.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","));
      rows.forEach((row) => {
        const line = columns.map((_, idx) => {
          const val = row?.[idx] ?? "";
          return `"${String(val).replace(/"/g, '""')}"`;
        });
        csvLines.push(line.join(","));
      });
      const csv = csvLines.join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName || "data"}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      setInfoMessage("CSV exported.");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to export CSV.");
    }
  };

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      let imageData;
      if (chartType.startsWith("3d") && threeSceneRef.current) {
        imageData = threeSceneRef.current.renderer.domElement.toDataURL();
      } else if (canvasRef.current) {
        imageData = canvasRef.current.toDataURL("image/png", 1.0);
      }
      if (imageData) {
        doc.addImage(imageData, "PNG", 15, 15, 180, 90);
      }

      doc.text("Uploaded Data", 14, 115);
      const tableColumnHeaders = columns;
      const tableRows = rows.map((row) => columns.map((col, idx) => row[idx]));
      autoTable(doc, {
        head: [tableColumnHeaders],
        body: tableRows,
        startY: 120,
        styles: { fontSize: 8 },
      });

      if (fileName) {
        doc.setProperties({ title: fileName });
      }

      doc.save(`${fileName || "report"}.pdf`);
      setInfoMessage("PDF downloaded.");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to create PDF.");
    }
  };

  const handleDownloadHistoryEntryJSON = (entry) => {
    try {
      const payload = JSON.stringify(entry, null, 2);
      const blob = new Blob([payload], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${entry.fileName || "analysis"}-${entry._id || "entry"}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setInfoMessage("History entry downloaded as JSON.");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to download history JSON.");
    }
  };

  /*******************************
   * History: save / load / reload
   *******************************/
  const handleSaveAnalysis = async () => {
    if (!user?.id) {
      setErrorMessage("Authentication required. Please log in to save analysis.");
      return;
    }
    try {
      setErrorMessage("");
      setInfoMessage("Saving analysis...");
      // Compose payload: include rows and columns and chart config
      const payload = {
        userId: user.id,
        fileName,
        columns,
        rows,
        chartType,
        xAxis,
        yAxis,
      };

      // Save analysis to backend and ask for AI summary
      const response = await historyAPI.saveAnalysis(payload);
      // Optionally call getSummary or have backend summarise during save
      let summaryText = "";
      try {
        const sresp = await historyAPI.getSummary({ columns, rows, chartType, xAxis, yAxis });
        summaryText = sresp?.data?.summary || "";
      } catch (e) {
        // Non-fatal: summary may fail
        console.warn("Summary call failed", e);
      }

      setInfoMessage(`Analysis saved successfully${summaryText ? ` — summary: ${summaryText}` : ""}`);
      // Refresh history list
      await loadHistory();
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to save analysis. Please try again.");
    }
  };

  const loadHistory = async () => {
    if (!user?.id) return;
    try {
      const response = await historyAPI.getUserHistory(user.id);
      // Expect response.data to be array of saved analyses
      setHistory(response.data || []);
      setInfoMessage("History loaded.");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to load history");
    }
  };

  const handleReloadHistoryEntry = (entry) => {
    // Entry shape: assumed { fileName, columns, rows, chartType, xAxis, yAxis, summary? }
    if (!entry) return;
    setFileName(entry.fileName || "");
    setColumns(entry.columns || []);
    setRows(entry.rows || []);
    setChartType(entry.chartType || "bar");
    setXAxis(entry.xAxis || (entry.columns?.[0] || ""));
    setYAxis(entry.yAxis || (entry.columns?.[1] || entry.columns?.[0] || ""));
    setInfoMessage(`Loaded "${entry.fileName || "analysis"}" from history.`);
    // Slight delay to ensure DOM canvas / 3D container is ready
    setTimeout(() => {
      generateChart();
    }, 100);
  };

  const handleRequestSummary = async () => {
    if (!rows || rows.length === 0) {
      setErrorMessage("No data present to summarize.");
      return;
    }
    try {
      setInfoMessage("Generating summary...");
      const resp = await historyAPI.getSummary({ columns, rows, chartType, xAxis, yAxis });
      const summary = resp?.data?.summary || "No summary returned.";
      setInfoMessage(`Summary: ${summary}`);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to generate summary.");
    }
  };

  /*******************************
   * Chart options list
   *******************************/
  const chartOptions = [
    { value: "bar", label: "Bar Chart", icon: "📊" },
    { value: "line", label: "Line Chart", icon: "📈" },
    { value: "pie", label: "Pie Chart", icon: "🥧" },
    { value: "doughnut", label: "Doughnut Chart", icon: "🍩" },
    { value: "radar", label: "Radar Chart", icon: "🕸️" },
    { value: "polarArea", label: "Polar Area", icon: "🎯" },
    { value: "bubble", label: "Bubble Chart", icon: "🫧" },
    { value: "scatter", label: "Scatter Plot", icon: "⚫" },
    { value: "3dscatter", label: "3D Scatter", icon: "🌐" },
    { value: "3dbar", label: "3D Bar", icon: "🟪" },
    { value: "3dline", label: "3D Line", icon: "〰️" },
    { value: "3dsurface", label: "3D Surface", icon: "🗻" },
  ];

  /*******************************
   * Render
   *******************************/
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Decorative background + decorative pies */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-32 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-r from-indigo-400/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-400/12 to-pink-500/12 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "4s" }} />

        <div className="absolute top-24 left-8 opacity-20">
          <DecorativePieChart data={decorativeCharts[0].data} colors={decorativeCharts[0].colors} size="w-16 h-16" />
        </div>
        <div className="absolute top-1/3 right-12 opacity-15">
          <DecorativePieChart data={decorativeCharts[1].data} colors={decorativeCharts[1].colors} size="w-20 h-20" />
        </div>
        <div className="absolute bottom-40 right-1/3 opacity-10">
          <DecorativePieChart data={decorativeCharts[2].data} colors={decorativeCharts[2].colors} size="w-24 h-24" />
        </div>
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mr-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Data Presentation Studio
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your Excel data into visualizations, save analysis, and generate AI summaries
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-12">
          {/* Control Panel */}
          <div className="lg:col-span-4">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-blue-500/10 dark:shadow-slate-900/20">
              <div className="flex items-center mb-8">
                <div className="p-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl mr-4">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Configuration</h3>
                  <p className="text-gray-500 dark:text-gray-400">Upload, configure axes, choose chart type</p>
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <Upload className="inline h-4 w-4 mr-2" />
                  Upload Excel File
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={handleFileUpload}
                    className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-4 text-center bg-gray-50 dark:bg-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                {fileName && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                    <div className="flex items-center text-sm text-blue-700 dark:text-blue-300">
                      <Database className="h-4 w-4 mr-2" />
                      <span className="font-medium">Loaded: {fileName}</span>
                    </div>
                  </div>
                )}
              </div>

              {rows.length > 0 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">X-Axis Column</label>
                    <div className="relative">
                      <select value={xAxis} onChange={(e) => setXAxis(e.target.value)} className="w-full appearance-none bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 pr-10 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all">
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
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Y-Axis Column</label>
                    <div className="relative">
                      <select value={yAxis} onChange={(e) => setYAxis(e.target.value)} className="w-full appearance-none bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 pr-10 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all">
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
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      <PieChart className="inline h-4 w-4 mr-2" />
                      Chart Type
                    </label>
                    <div className="relative">
                      <select value={chartType} onChange={(e) => setChartType(e.target.value)} className="w-full appearance-none bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 pr-10 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all">
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
                <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <div className="flex items-center text-red-700 dark:text-red-300">
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{errorMessage}</span>
                  </div>
                </div>
              )}

              {infoMessage && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                  <div className="flex items-center text-green-700 dark:text-green-300">
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{infoMessage}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chart Display */}
          <div className="lg:col-span-8">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-purple-500/10 dark:shadow-slate-900/20">
              <div className="flex items-center mb-8">
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mr-4">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Visualization Preview</h3>
                  <p className="text-gray-500 dark:text-gray-400">Interactive chart display</p>
                </div>
              </div>

              <div className="relative">
                {chartType.startsWith("3d") ? (
                  <div ref={threeContainerRef} className="w-full h-[500px] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 rounded-2xl border-2 border-gray-100 dark:border-slate-700 shadow-inner" />
                ) : (
                  <div className="w-full h-[500px] bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border-2 border-gray-100 dark:border-slate-700 shadow-inner">
                    <canvas ref={canvasRef} className="w-full h-full" />
                  </div>
                )}

                {rows.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 dark:bg-slate-800/80 rounded-2xl">
                    <div className="text-center">
                      <div className="p-6 bg-gray-100 dark:bg-slate-700 rounded-2xl mb-4 inline-block">
                        <BarChart4 className="h-12 w-12 text-gray-400" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No Data Available</h4>
                      <p className="text-gray-500 dark:text-gray-400">Upload an Excel file to start creating visualizations</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-7xl mx-auto mt-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={generateChart} className="group flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              <BarChart4 className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
              Generate Visualization
            </button>

            <button onClick={handleSaveAnalysis} className="group flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              <Save className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
              Save Analysis
            </button>

            <button onClick={handleRequestSummary} className="group flex items-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              <SlidersHorizontal className="h-5 w-5 mr-3" /> Generate Summary
            </button>

            <button onClick={handleDownloadChart} className="group flex items-center px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              <Download className="h-5 w-5 mr-3" /> Download Chart (PNG)
            </button>

            <button onClick={handleDownloadCSV} className="group flex items-center px-6 py-4 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg">
              <FileSpreadsheet className="h-5 w-5 mr-3" /> Download CSV
            </button>

            <button onClick={handleDownloadPDF} className="group flex items-center px-6 py-4 bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              <Download className="h-5 w-5 mr-3" /> Download PDF
            </button>
          </div>
        </div>

        {/* History UI */}
        <div className="max-w-7xl mx-auto mt-10">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Saved Analyses</h3>
              <div className="flex items-center gap-2">
                <button onClick={loadHistory} className="px-3 py-2 bg-blue-50 dark:bg-blue-900/25 rounded-md text-sm">Refresh</button>
                <button onClick={() => { setHistory([]); setInfoMessage("Cleared history in UI (does not delete server-side)."); }} className="px-3 py-2 bg-red-50 dark:bg-red-900/25 rounded-md text-sm">Clear UI</button>
              </div>
            </div>

            {history.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No saved analyses found for this user.</p>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {history.map((h) => (
                  <li key={h._id} className="p-3 bg-gray-50 dark:bg-slate-700 rounded-xl flex flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-semibold">{h.fileName || "Untitled"}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-300">{h.chartType || "—"}</div>
                      </div>
                      <div className="text-xs text-gray-400">{h._id?.slice?.(0, 6)}</div>
                    </div>

                    {h.summary && <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">{h.summary}</div>}

                    <div className="mt-3 flex gap-2">
                      <button onClick={() => handleReloadHistoryEntry(h)} className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 rounded-md text-sm border">Load</button>
                      <button onClick={() => handleDownloadHistoryEntryJSON(h)} className="px-3 py-2 bg-blue-50 dark:bg-blue-900/25 rounded-md text-sm">Export</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};






