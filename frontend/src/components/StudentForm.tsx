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
        try {
          const data = await studentsApi.get(id);
          setModel(data);
        } finally { setLoading(false); }
      })();
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (id) {
      await studentsApi.update(id, model);
    } else {
      await studentsApi.create(model);
    }
    navigate('/students');
  }

  return (
    <div>
      <h2>{id ? 'Edit' : 'Create'} Student</h2>
      {loading ? <div>Loading...</div> : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label><br />
            <input value={model.name} onChange={e => setModel({ ...model, name: e.target.value })} />
          </div>
          <div>
            <label>Year Level</label><br />
            <input type="number" value={model.year_level} onChange={e => setModel({ ...model, year_level: Number(e.target.value) })} />
          </div>
          <div style={{ marginTop: 8 }}>
            <button type="submit">Save</button>
            <button type="button" onClick={() => navigate('/students')} style={{ marginLeft: 8 }}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
