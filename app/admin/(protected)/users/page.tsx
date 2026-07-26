"use client";

import { useEffect, useState } from 'react';

type User = { id: string; email: string; name?: string; role: string };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin/users');
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    } else {
      alert('Failed to load users');
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateRole(id: string, role: string) {
    const res = await fetch('/api/admin/users', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, role }) });
    if (res.ok) await load(); else alert('Update failed');
  }

  async function removeUser(id: string) {
    if (!confirm('Delete user?')) return;
    const res = await fetch(`/api/admin/users?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (res.ok) await load(); else alert('Delete failed');
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">User management</h1>
      <p className="mt-2 text-sm text-stone-600">Manage application users and roles.</p>

      <div className="mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="flex items-center justify-between rounded border px-3 py-2">
                <div>
                  <p className="font-semibold">{u.email}</p>
                  <p className="text-sm text-stone-500">{u.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select defaultValue={u.role} onChange={(e) => updateRole(u.id, e.target.value)} className="rounded border px-2 py-1">
                    <option value="ADMIN">ADMIN</option>
                    <option value="EDITOR">EDITOR</option>
                    <option value="USER">USER</option>
                  </select>
                  <button onClick={() => removeUser(u.id)} className="rounded bg-red-600 px-3 py-1 text-white">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
