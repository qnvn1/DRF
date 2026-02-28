import React, { useEffect, useState } from 'react';
import { teachersApi } from '../api';
import { Teacher } from '../types';
import { Link, useNavigate } from 'react-router-dom';

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
    <div className="main fade-in">
      <div className="page-header">
        <h1 className="page-title">Teachers</h1>
        <Link to="/teachers/new" className="btn btn-primary">+ New Teacher</Link>
      </div>
      <div className="table-card">
        {loading ? (
          <div className="loading"><div className="spinner" /> Loading...</div>
        ) : items.length === 0 ? (
          <div className="empty"><div className="empty-icon">👨‍🏫</div><p>No teachers yet</p></div>
        ) : (
          <table>
            <thead>
              <tr><th>ID</th><th>Name</th><th>Department</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.map(t => (
                <tr key={t.teacher_id}>
                  <td><span className="id-chip">#{t.teacher_id}</span></td>
                  <td style={{ fontWeight: 500 }}>{t.teacher_name}</td>
                  <td><span className="badge badge-blue">{t.department}</span></td>
                  <td>
                    <div className="td-actions">
                      <button className="btn btn-edit btn-sm" onClick={() => navigate(`/teachers/${t.teacher_id}/edit`)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t.teacher_id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}