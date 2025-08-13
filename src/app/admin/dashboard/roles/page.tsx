"use client";

import React, { useState } from 'react';

// Types
interface Role {
  id: number;
  name: string;
  permissions: string[];
}

const RolesPage: React.FC = () => {
  // Mock role data
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: 'Admin', permissions: ['edit_users', 'view_logs', 'manage_backups'] },
    { id: 2, name: 'Editor', permissions: ['edit_content', 'view_reports'] },
    { id: 3, name: 'Viewer', permissions: ['view_dashboard'] },
  ]);

  // State for editing role
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Handle edit
  const handleEdit = (role: Role): void => {
    setEditingRole(role);
    setIsEditing(true);
  };

  // Handle update
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (editingRole) {
      setRoles((prev) =>
        prev.map((r) => (r.id === editingRole.id ? editingRole : r))
      );
      setIsEditing(false);
      setEditingRole(null);
    }
  };

  // Handle permission change
  const handlePermissionChange = (perm: string, checked: boolean): void => {
    if (editingRole) {
      setEditingRole({
        ...editingRole,
        permissions: checked
          ? [...editingRole.permissions, perm]
          : editingRole.permissions.filter((p) => p !== perm),
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Role and Permissions Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permissions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-t">
                <td className="px-6 py-4">{role.name}</td>
                <td className="px-6 py-4">{role.permissions.join(', ')}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(role)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && editingRole && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold mb-4">Update Role</h3>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Role Name</label>
              <input
                type="text"
                value={editingRole.name}
                onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Permissions</label>
              {['edit_users', 'view_logs', 'manage_backups', 'edit_content', 'view_reports', 'view_dashboard'].map((perm) => (
                <div key={perm} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingRole.permissions.includes(perm)}
                    onChange={(e) => handlePermissionChange(perm, e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">{perm}</label>
                </div>
              ))}
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="ml-2 px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RolesPage;