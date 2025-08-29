import React, { useEffect, useState } from 'react';
import http from '../utils/http';

function fmtBytes(b = 0) {
  if (b < 1024) return `${b} B`;
  if (b < 1024*1024) return `${(b/1024).toFixed(1)} KB`;
  if (b < 1024*1024*1024) return `${(b/1024/1024).toFixed(1)} MB`;
  return `${(b/1024/1024/1024).toFixed(1)} GB`;
}

export default function Admin() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState('');

  const load = async () => {
    try {
      const { data } = await http.get('/admin/users');
      setRows(data);
    } catch (e) {
      setErr(e.response?.data?.message || 'Failed to load users');
    }
  };

  const setRole = async (id, role) => {
    await http.patch(`/admin/users/${id}/role`, { role });
    await load();
  };

  const delUser = async (id) => {
    if (!confirm('Delete user and all data?')) return;
    await http.delete(`/admin/users/${id}`);
    await load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Admin — Users & Usage</h1>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Files</th>
              <th className="p-2 border">Storage</th>
              <th className="p-2 border">Insights</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(u => (
              <tr key={u._id}>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">
                  <select
                    className="border p-1"
                    value={u.role}
                    onChange={(e) => setRole(u._id, e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    <option value="superadmin">superadmin</option>
                  </select>
                </td>
                <td className="p-2 border">{u.usage.files}</td>
                <td className="p-2 border">{fmtBytes(u.usage.bytes)}</td>
                <td className="p-2 border">{u.usage.insights}</td>
                <td className="p-2 border">
                  <button onClick={() => delUser(u._id)} className="px-2 py-1 border rounded">Delete</button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td className="p-2 border" colSpan="7">No users.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
