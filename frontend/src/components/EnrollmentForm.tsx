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

  useEffect(() => { (async () => { setStudents(await studentsApi.list()); setCourses(await coursesApi.list()); })(); }, []);

  useEffect(() => {
    if (id) {
      (async () => { setLoading(true); try { setModel(await enrollmentsApi.get(id)); } finally { setLoading(false); } })();
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (id) await enrollmentsApi.update(id, model);
    else await enrollmentsApi.create(model);
    navigate('/enrollments');
  }

  return (
    <div>
      <h2>{id ? 'Edit' : 'Create'} Enrollment</h2>
      {loading ? <div>Loading...</div> : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Student</label><br />
            <select value={model.student} onChange={e => setModel({ ...model, student: Number(e.target.value) })}>
              <option value={0}>-- choose --</option>
              {students.map(s => <option key={s.student_id} value={s.student_id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label>Course</label><br />
            <select value={model.course} onChange={e => setModel({ ...model, course: Number(e.target.value) })}>
              <option value={0}>-- choose --</option>
              {courses.map(c => <option key={c.course_id} value={c.course_id}>{c.course_name}</option>)}
            </select>
          </div>
          <div style={{ marginTop: 8 }}>
            <button type="submit">Save</button>
            <button type="button" onClick={() => navigate('/enrollments')} style={{ marginLeft: 8 }}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
