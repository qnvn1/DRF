import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import TeacherList from './components/TeacherList';
import TeacherForm from './components/TeacherForm';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import EnrollmentList from './components/EnrollmentList';
import EnrollmentForm from './components/EnrollmentForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <main style={{ padding: 16 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/students" replace />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/new" element={<StudentForm />} />
            <Route path="/students/:id/edit" element={<StudentForm />} />

            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/teachers/new" element={<TeacherForm />} />
            <Route path="/teachers/:id/edit" element={<TeacherForm />} />

            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/new" element={<CourseForm />} />
            <Route path="/courses/:id/edit" element={<CourseForm />} />

            <Route path="/enrollments" element={<EnrollmentList />} />
            <Route path="/enrollments/new" element={<EnrollmentForm />} />
            <Route path="/enrollments/:id/edit" element={<EnrollmentForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
