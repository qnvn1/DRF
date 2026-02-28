import React, { useEffect, useState } from 'react';
import { coursesApi, teachersApi } from '../api';
import { Course, Teacher } from '../types';
import { useNavigate, Link } from 'react-router-dom';

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
    <div>
      <h2>Courses</h2>
      <div style={{ marginBottom: 12 }}><Link to="/courses/new">Create Course</Link></div>
      {loading ? <div>Loading...</div> : (
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Teacher</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(c => (
              <tr key={c.course_id}>
                <td>{c.course_id}</td>
                <td>{c.course_name}</td>
                <td>{c.teacher_details?.teacher_name ?? c.teacher}</td>
                <td>
                  <button onClick={() => navigate(`/courses/${c.course_id}/edit`)}>Edit</button>
                  <button onClick={() => handleDelete(c.course_id)} style={{ marginLeft: 8 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
