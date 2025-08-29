import React from 'react';

export default function HistoryTable({ items }) {
  if (!items?.length) return <div>No history yet.</div>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="p-2 border">File</th>
            <th className="p-2 border">When</th>
            <th className="p-2 border">Rows</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((f) => (
            <tr key={f._id}>
              <td className="p-2 border">{f.originalname}</td>
              <td className="p-2 border">{new Date(f.createdAt).toLocaleString()}</td>
              <td className="p-2 border">{f.previewRows ?? '—'}</td>
              <td className="p-2 border">
                <a className="underline mr-2" href={f.path?.replace(/^\.?/, '')} target="_blank">download</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
