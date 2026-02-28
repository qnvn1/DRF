import React, { useEffect, useState } from 'react';
import { enrollmentsApi } from '../api';
import { Enrollment } from '../types';
import { Link, useNavigate } from 'react-router-dom';

export default function EnrollmentList() {
  const [items, setItems] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    try { setItems(await enrollmentsApi.list()); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id?: number) {
    if (!id) return;
    if (!window.confirm('Delete enrollment?')) return;
    await enrollmentsApi.remove(id);
    load();
  }

  return (
    <div className="main fade-in">
      <div className="page-header">
        <h1 className="page-title">Enrollments</h1>
        <Link to="/enrollments/new" className="btn btn-primary">+ New Enrollment</Link>
      </div>
      <div className="table-card">
        {loading ? (
          <div className="loading"><div className="spinner" /> Loading...</div>
        ) : items.length === 0 ? (
          <div className="empty"><div className="empty-icon">📋</div><p>No enrollments yet</p></div>
        ) : (
          <table>
            <thead>
              <tr><th>ID</th><th>Student</th><th>Course</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.map(e => (
                <tr key={e.enrollment_id}>
                  <td><span className="id-chip">#{e.enrollment_id}</span></td>
                  <td style={{ fontWeight: 500 }}>{e.student_details?.name ?? `#${e.student}`}</td>
                  <td><span className="badge badge-green">{e.course_details?.course_name ?? `#${e.course}`}</span></td>
                  <td>
                    <div className="td-actions">
                      <button className="btn btn-edit btn-sm" onClick={() => navigate(`/enrollments/${e.enrollment_id}/edit`)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.enrollment_id)}>Delete</button>
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