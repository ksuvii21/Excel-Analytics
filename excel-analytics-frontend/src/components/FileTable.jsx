import React from 'react';

export default function FileTable({ rows=[{name:'sales.xlsx', rows:120, date:'2025-08-12'}] }){
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            <th className="p-3 text-left">File</th>
            <th className="p-3 text-left">Rows</th>
            <th className="p-3 text-left">Uploaded</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=> (
            <tr key={i} className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="p-3">{r.name}</td>
              <td className="p-3">{r.rows}</td>
              <td className="p-3">{r.date}</td>
              <td className="p-3">
                <button className="rounded-lg border px-3 py-1 text-xs">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}