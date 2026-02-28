import React, { useEffect, useState } from 'react';
import { enrollmentsApi, studentsApi, coursesApi } from '../api';
import { Enrollment, Student, Course } from '../types';
import { useNavigate, useParams } from 'react-router-dom';

export default function EnrollmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Enrollment>({ student: 0, course: 0 });
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setStudents(await studentsApi.list());
      setCourses(await coursesApi.list());
    })();
  }, []);

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try { setModel(await enrollmentsApi.get(id)); }
        finally { setLoading(false); }
      })();
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (id) await enrollmentsApi.update(id, model);
    else await enrollmentsApi.create(model);
    navigate('/enrollments');
  }

  return (
    <div className="main fade-in">
      <div className="page-header">
        <h1 className="page-title">{id ? 'Edit' : 'New'} Enrollment</h1>
      </div>
      {loading ? (
        <div className="loading"><div className="spinner" /> Loading...</div>
      ) : (
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Student</label>
              <select className="form-select" value={model.student}
                onChange={e => setModel({ ...model, student: Number(e.target.value) })} required>
                <option value={0}>— Select a student —</option>
                {students.map(s => (
                  <option key={s.student_id} value={s.student_id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Course</label>
              <select className="form-select" value={model.course}
                onChange={e => setModel({ ...model, course: Number(e.target.value) })} required>
                <option value={0}>— Select a course —</option>
                {courses.map(c => (
                  <option key={c.course_id} value={c.course_id}>{c.course_name}</option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Save Enrollment</button>
              <button type="button" className="btn btn-ghost" onClick={() => navigate('/enrollments')}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}