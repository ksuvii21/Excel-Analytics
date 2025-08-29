// FileUpload.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { Upload, FileText } from 'lucide-react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const processExcel = (arrayBuffer) => {
    try {
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      const headers = json.length ? Object.keys(json[0]) : [];
      return { columns: headers, rows: json };
    } catch (err) {
      console.error('Excel parse error:', err);
      return { columns: [], rows: [] };
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = processExcel(e.target.result);
      console.log('Parsed file data:', fileData);

      if (!fileData.columns.length) {
        alert('No valid data found in file.');
        return;
      }

      // Save to sessionStorage
      sessionStorage.setItem('currentFile', JSON.stringify({
        fileName: file.name,
        fileData: fileData
      }));
      console.log('Saved to sessionStorage:', sessionStorage.getItem('currentFile'));

      // Navigate to Presentation
      navigate('/presentation', {
        state: {
          fileName: file.name,
          fileData: fileData
        }
      });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".xls,.xlsx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload & Analyze</button>
    </div>
  );
};

export default FileUpload;
