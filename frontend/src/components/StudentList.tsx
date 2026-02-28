import React, { useEffect, useState } from 'react';
import { studentsApi } from '../api';
import { Student } from '../types';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    try { setStudents(await studentsApi.list()); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id?: number) {
    if (!id) return;
    if (!window.confirm('Delete this student?')) return;
    await studentsApi.remove(id);
    load();
  }

  const yearBadge = (y: number) => {
    const colors = ['badge-green', 'badge-blue', 'badge-pink', 'badge-green'];
    return colors[(y - 1) % colors.length];
  };

  return (
    <div className="main fade-in">
      <div className="page-header">
        <h1 className="page-title">Students</h1>
        <Link to="/students/new" className="btn btn-primary">+ New Student</Link>
      </div>
      <div className="table-card">
        {loading ? (
          <div className="loading"><div className="spinner" /> Loading...</div>
        ) : students.length === 0 ? (
          <div className="empty"><div className="empty-icon">👤</div><p>No students yet</p></div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Year Level</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.student_id}>
                  <td><span className="id-chip">#{s.student_id}</span></td>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td><span className={`badge ${yearBadge(s.year_level)}`}>Year {s.year_level}</span></td>
                  <td>
                    <div className="td-actions">
                      <button className="btn btn-edit btn-sm" onClick={() => navigate(`/students/${s.student_id}/edit`)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.student_id)}>Delete</button>
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