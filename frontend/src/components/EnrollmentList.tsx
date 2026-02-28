import React, { useEffect, useState } from 'react';
import { enrollmentsApi } from '../api';
import { Enrollment } from '../types';
import { useNavigate, Link } from 'react-router-dom';

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
    <div>
      <h2>Enrollments</h2>
      <div style={{ marginBottom: 12 }}><Link to="/enrollments/new">Create Enrollment</Link></div>
      {loading ? <div>Loading...</div> : (
        <table>
          <thead><tr><th>ID</th><th>Student</th><th>Course</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(e => (
              <tr key={e.enrollment_id}>
                <td>{e.enrollment_id}</td>
                <td>{e.student_details?.name ?? e.student}</td>
                <td>{e.course_details?.course_name ?? e.course}</td>
                <td>
                  <button onClick={() => navigate(`/enrollments/${e.enrollment_id}/edit`)}>Edit</button>
                  <button onClick={() => handleDelete(e.enrollment_id)} style={{ marginLeft: 8 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
