import React, { useEffect, useState } from 'react';
import { teachersApi } from '../api';
import { Teacher } from '../types';
import { useNavigate, useParams } from 'react-router-dom';

export default function TeacherForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Teacher>({ teacher_name: '', department: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try { setModel(await teachersApi.get(id)); }
        finally { setLoading(false); }
      })();
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (id) await teachersApi.update(id, model);
    else await teachersApi.create(model);
    navigate('/teachers');
  }

  return (
    <div>
      <h2>{id ? 'Edit' : 'Create'} Teacher</h2>
      {loading ? <div>Loading...</div> : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label><br />
            <input value={model.teacher_name} onChange={e => setModel({ ...model, teacher_name: e.target.value })} />
          </div>
          <div>
            <label>Department</label><br />
            <input value={model.department} onChange={e => setModel({ ...model, department: e.target.value })} />
          </div>
          <div style={{ marginTop: 8 }}>
            <button type="submit">Save</button>
            <button type="button" onClick={() => navigate('/teachers')} style={{ marginLeft: 8 }}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
