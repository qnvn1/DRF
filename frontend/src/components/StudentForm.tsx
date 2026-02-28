import React, { useEffect, useState } from 'react';
import { studentsApi } from '../api';
import { Student } from '../types';
import { useNavigate, useParams } from 'react-router-dom';

export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Student>({ name: '', year_level: 1 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try { setModel(await studentsApi.get(id)); }
        finally { setLoading(false); }
      })();
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (id) await studentsApi.update(id, model);
    else await studentsApi.create(model);
    navigate('/students');
  }

  return (
    <div className="main fade-in">
      <div className="page-header">
        <h1 className="page-title">{id ? 'Edit' : 'New'} Student</h1>
      </div>
      {loading ? (
        <div className="loading"><div className="spinner" /> Loading...</div>
      ) : (
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" placeholder="e.g. Maria Santos" value={model.name}
                onChange={e => setModel({ ...model, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Year Level</label>
              <input className="form-input" type="number" min={1} max={6} value={model.year_level}
                onChange={e => setModel({ ...model, year_level: Number(e.target.value) })} required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Save Student</button>
              <button type="button" className="btn btn-ghost" onClick={() => navigate('/students')}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}