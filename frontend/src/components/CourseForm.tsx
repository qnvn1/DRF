import React, { useEffect, useState } from 'react';
import { coursesApi, teachersApi } from '../api';
import { Course, Teacher } from '../types';
import { useNavigate, useParams } from 'react-router-dom';

export default function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Course>({ course_name: '', teacher: 0 });
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { (async () => setTeachers(await teachersApi.list()))(); }, []);

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try { setModel(await coursesApi.get(id)); }
        finally { setLoading(false); }
      })();
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (id) await coursesApi.update(id, model);
    else await coursesApi.create(model);
    navigate('/courses');
  }

  return (
    <div className="main fade-in">
      <div className="page-header">
        <h1 className="page-title">{id ? 'Edit' : 'New'} Course</h1>
      </div>
      {loading ? (
        <div className="loading"><div className="spinner" /> Loading...</div>
      ) : (
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Course Name</label>
              <input className="form-input" placeholder="e.g. Introduction to Programming" value={model.course_name}
                onChange={e => setModel({ ...model, course_name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Assigned Teacher</label>
              <select className="form-select" value={model.teacher}
                onChange={e => setModel({ ...model, teacher: Number(e.target.value) })} required>
                <option value={0}>— Select a teacher —</option>
                {teachers.map(t => (
                  <option key={t.teacher_id} value={t.teacher_id}>{t.teacher_name}</option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Save Course</button>
              <button type="button" className="btn btn-ghost" onClick={() => navigate('/courses')}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}