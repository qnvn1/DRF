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
    <div className="main fade-in">
      <div className="page-header">
        <h1 className="page-title">{id ? 'Edit' : 'New'} Teacher</h1>
      </div>
      {loading ? (
        <div className="loading"><div className="spinner" /> Loading...</div>
      ) : (
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" placeholder="e.g. Dr. Jose Rizal" value={model.teacher_name}
                onChange={e => setModel({ ...model, teacher_name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input className="form-input" placeholder="e.g. Computer Science" value={model.department}
                onChange={e => setModel({ ...model, department: e.target.value })} required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Save Teacher</button>
              <button type="button" className="btn btn-ghost" onClick={() => navigate('/teachers')}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}