// src/components/UploadForm.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FileSpreadsheet, ArrowRight } from "lucide-react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      setFile(e.target.files[0]);
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

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (isValidExcel(droppedFile)) {
        setFile(droppedFile);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please select an Excel file!");
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // Simulate file processing/upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to results page
      navigate("/presentation", { 
        state: { 
          fileName: file.name,
          fileSize: Math.round(file.size / 1024) 
        } 
      });
      
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Failed to process file. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold mb-4">Upload Excel File</h3>
      
      <form 
        onSubmit={handleSubmit}
        className="w-full"
      >
        <div 
          className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${
            dragActive 
              ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20" 
              : "border-gray-300 hover:border-gray-400 bg-gray-50 dark:bg-gray-700/30"
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
          
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30">
              <FileSpreadsheet className="h-8 w-8 text-blue-500 dark:text-blue-400" />
            </div>
            
            <div className="text-center">
              {file ? (
                <>
                  <p className="font-medium mb-1">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {Math.round(file.size / 1024)} KB
                  </p>
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Select different file
                  </button>
                </>
              ) : (
                <>
                  <p className="font-medium mb-2">
                    {dragActive ? "Drop your file here" : "Drag & drop your Excel file"}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                    Only <span className="font-semibold">.xlsx</span> and{" "}
                    <span className="font-semibold">.xls</span> files accepted
                  </p>
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 inline-block"
                  >
                    Browse Files
                  </label>
                </>
              )}
            </div>
          </div>
          
          {dragActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-500/10 rounded-xl backdrop-blur-sm">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-blue-400">
                <p className="text-blue-500 dark:text-blue-400 font-medium">Drop to upload</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <button 
            type="submit" 
            disabled={!file || isProcessing}
            className={`w-full py-3 px-4 rounded-xl font-medium text-lg transition-all duration-300 flex items-center justify-center ${
              file && !isProcessing
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/20 hover:shadow-green-500/30 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
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
                Generate Presentation <ArrowRight className="h-5 w-5 ml-2" />
              </>
            ) : (
              "Upload File First"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
