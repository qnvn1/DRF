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
    try {
      const data = await studentsApi.list();
      setStudents(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id?: number) {
    if (!id) return;
    if (!window.confirm('Delete this student?')) return;
    await studentsApi.remove(id);
    load();
  }

  return (
    <div>
      <h2>Students</h2>
      <div style={{ marginBottom: 12 }}>
        <Link to="/students/new">Create Student</Link>
      </div>
      {loading ? <div>Loading...</div> : (
        <table>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Year</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.student_id}>
                <td>{s.student_id}</td>
                <td>{s.name}</td>
                <td>{s.year_level}</td>
                <td>
                  <button onClick={() => navigate(`/students/${s.student_id}/edit`)}>Edit</button>
                  <button onClick={() => handleDelete(s.student_id)} style={{ marginLeft: 8 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
