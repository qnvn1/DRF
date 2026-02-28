import { Teacher, Student, Course, Enrollment } from './types';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8000/api';

async function request(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...opts,
  });
  if (!res.ok) throw new Error(await res.text());
  if (res.status === 204) return null;
  return res.json();
}

const buildApi = (resource: string) => ({
  list: () => request(`/${resource}/`) as Promise<any[]>,
  get: (id: number|string) => request(`/${resource}/${id}/`),
  create: (data: any) => request(`/${resource}/`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number|string, data: any) => request(`/${resource}/${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id: number|string) => request(`/${resource}/${id}/`, { method: 'DELETE' }),
});

export const teachersApi = buildApi('teachers');
export const studentsApi = buildApi('students');
export const coursesApi = buildApi('courses');
export const enrollmentsApi = buildApi('enrollments');

export default { teachersApi, studentsApi, coursesApi, enrollmentsApi };
