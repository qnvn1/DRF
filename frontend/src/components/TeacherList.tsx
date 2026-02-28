import React, { useEffect, useState } from 'react';
import { teachersApi } from '../api';
import { Teacher } from '../types';
import { useNavigate, Link } from 'react-router-dom';

export default function TeacherList() {
  const [items, setItems] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    try { setItems(await teachersApi.list()); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id?: number) {
    if (!id) return;
    if (!window.confirm('Delete teacher?')) return;
    await teachersApi.remove(id);
    load();
  }

  return (
    <div>
      <h2>Teachers</h2>
      <div style={{ marginBottom: 12 }}><Link to="/teachers/new">Create Teacher</Link></div>
      {loading ? <div>Loading...</div> : (
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Dept</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(t => (
              <tr key={t.teacher_id}>
                <td>{t.teacher_id}</td>
                <td>{t.teacher_name}</td>
                <td>{t.department}</td>
                <td>
                  <button onClick={() => navigate(`/teachers/${t.teacher_id}/edit`)}>Edit</button>
                  <button onClick={() => handleDelete(t.teacher_id)} style={{ marginLeft: 8 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
