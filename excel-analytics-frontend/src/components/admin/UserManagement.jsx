import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';
import { adminAPI } from '../../utils/api';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getUsers();
      // Filter to only show users with role 'user'
      const filteredUsers = response.data.filter(user => user.role === 'user' || user.role === 'admin');
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    navigate('/register');
  };

  if (loading) {
    return <div className="p-6">Loading users...</div>;
  }

  const handleEdit = (user) => {
  setSelectedUser(user);
  setShowEdit(true);
};

const handleUpdateUser = async (e) => {
  e.preventDefault();
  try {
    await adminAPI.updateUser(selectedUser._id, selectedUser);
    fetchUsers();
    setShowEdit(false);
  } catch (err) {
    console.error('Update failed', err);
  }
};

const handleDelete = (user) => {
  setSelectedUser(user);
  setShowDelete(true);
};

const confirmDelete = async () => {
  try {
    await adminAPI.deleteUser(selectedUser._id);
    fetchUsers();
    setShowDelete(false);
  } catch (err) {
    console.error('Delete failed', err);
  }
};


  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">User Management</h2>
        <button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={handleAddUser}
        >
          <Plus className="h-4 w-4 mr-2" /> Add User
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{user.name}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : user.role === 'superadmin'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                  <button 
                    className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    onClick={() => handleEdit(user)}
                  >
                  <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    onClick={() => handleDelete(user)}
                  >
                  <Trash2 className="h-4 w-4" />
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showEdit && selectedUser && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 text-gray-800 dark:text-white">
      <h3 className="text-lg font-bold mb-4">Edit User</h3>
      <form onSubmit={handleUpdateUser} className="space-y-4">
        {/* Name */}
        <input 
          type="text"
          value={selectedUser.name}
          onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
          className="w-full border px-3 py-2 rounded text-gray-800 dark:text-white dark:bg-gray-700"
          placeholder="Full Name"
        />

        {/* Email */}
        <input 
          type="email"
          value={selectedUser.email}
          onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
          className="w-full border px-3 py-2 rounded text-gray-800 dark:text-white dark:bg-gray-700"
          placeholder="Email"
        />

        {/* Role */}
        <select
          value={selectedUser.role}
          onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
          className="w-full border px-3 py-2 rounded text-gray-800 dark:text-white dark:bg-gray-700"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>

        {/* Status */}
        <select
          value={selectedUser.status}
          onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value})}
          className="w-full border px-3 py-2 rounded text-gray-800 dark:text-white dark:bg-gray-700"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Password */}
        <input
          type="password"
          value={selectedUser.password || ""}
          onChange={(e) => setSelectedUser({...selectedUser, password: e.target.value})}
          className="w-full border px-3 py-2 rounded text-gray-800 dark:text-white dark:bg-gray-700"
          placeholder="Set new password"
        />

        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={() => setShowEdit(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  </div>
)}

{showDelete && selectedUser && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-80 text-gray-800 dark:text-white">
      <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
      <p>Are you sure you want to delete <strong>{selectedUser.name}</strong> ({selectedUser.email})?</p>
      <div className="flex justify-end mt-4 space-x-2">
        <button onClick={() => setShowDelete(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded">Cancel</button>
        <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}