import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="nav">
      <span className="nav-brand">🎓 SchoolMS</span>
      <NavLink to="/students" className={({ isActive }) => isActive ? 'active' : ''}>Students</NavLink>
      <NavLink to="/teachers" className={({ isActive }) => isActive ? 'active' : ''}>Teachers</NavLink>
      <NavLink to="/courses" className={({ isActive }) => isActive ? 'active' : ''}>Courses</NavLink>
      <NavLink to="/enrollments" className={({ isActive }) => isActive ? 'active' : ''}>Enrollments</NavLink>
    </nav>
  );
}
