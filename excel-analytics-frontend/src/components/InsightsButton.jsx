import React, { useState } from 'react';
import http from '../utils/http';

export default function InsightsButton({ fileId, onCreated }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const go = async () => {
    setErr('');
    setLoading(true);
    try {
      const { data } = await http.post(`/insights/${fileId}`);
      onCreated?.(data);
    } catch (e) {
      setErr(e.response?.data?.message || 'Failed to generate insights');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button disabled={loading} onClick={go} className="px-3 py-1 border rounded">
        {loading ? 'Thinking…' : 'Generate AI Insights'}
      </button>
      {err && <div className="text-red-500 text-sm mt-1">{err}</div>}
    </div>
  );
}
