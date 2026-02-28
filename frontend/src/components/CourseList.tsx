import React, { useEffect, useState } from 'react';
import { coursesApi } from '../api';
import { Course } from '../types';
import { Link, useNavigate } from 'react-router-dom';

export default function CourseList() {
  const [items, setItems] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    try { setItems(await coursesApi.list()); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id?: number) {
    if (!id) return;
    if (!window.confirm('Delete course?')) return;
    await coursesApi.remove(id);
    load();
  }

  return (
    <div className="main fade-in">
      <div className="page-header">
        <h1 className="page-title">Courses</h1>
        <Link to="/courses/new" className="btn btn-primary">+ New Course</Link>
      </div>
      <div className="table-card">
        {loading ? (
          <div className="loading"><div className="spinner" /> Loading...</div>
        ) : items.length === 0 ? (
          <div className="empty"><div className="empty-icon">📚</div><p>No courses yet</p></div>
        ) : (
          <table>
            <thead>
              <tr><th>ID</th><th>Course Name</th><th>Teacher</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.map(c => (
                <tr key={c.course_id}>
                  <td><span className="id-chip">#{c.course_id}</span></td>
                  <td style={{ fontWeight: 500 }}>{c.course_name}</td>
                  <td><span className="badge badge-pink">{c.teacher_details?.teacher_name ?? `#${c.teacher}`}</span></td>
                  <td>
                    <div className="td-actions">
                      <button className="btn btn-edit btn-sm" onClick={() => navigate(`/courses/${c.course_id}/edit`)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.course_id)}>Delete</button>
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