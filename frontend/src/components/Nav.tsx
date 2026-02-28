import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav style={{ padding: 12, background: '#282c34', color: 'white' }}>
      <Link to="/students" style={{ marginRight: 12, color: 'white' }}>Students</Link>
      <Link to="/teachers" style={{ marginRight: 12, color: 'white' }}>Teachers</Link>
      <Link to="/courses" style={{ marginRight: 12, color: 'white' }}>Courses</Link>
      <Link to="/enrollments" style={{ marginRight: 12, color: 'white' }}>Enrollments</Link>
    </nav>
  );
}
