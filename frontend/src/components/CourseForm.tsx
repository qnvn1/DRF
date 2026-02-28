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
      (async () => { setLoading(true); try { setModel(await coursesApi.get(id)); } finally { setLoading(false); } })();
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (id) await coursesApi.update(id, model);
    else await coursesApi.create(model);
    navigate('/courses');
  }

  return (
    <div>
      <h2>{id ? 'Edit' : 'Create'} Course</h2>
      {loading ? <div>Loading...</div> : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Course Name</label><br />
            <input value={model.course_name} onChange={e => setModel({ ...model, course_name: e.target.value })} />
          </div>
          <div>
            <label>Teacher</label><br />
            <select value={model.teacher} onChange={e => setModel({ ...model, teacher: Number(e.target.value) })}>
              <option value={0}>-- choose --</option>
              {teachers.map(t => <option key={t.teacher_id} value={t.teacher_id}>{t.teacher_name}</option>)}
            </select>
          </div>
          <div style={{ marginTop: 8 }}>
            <button type="submit">Save</button>
            <button type="button" onClick={() => navigate('/courses')} style={{ marginLeft: 8 }}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
