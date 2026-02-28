export interface Teacher {
  teacher_id?: number;
  teacher_name: string;
  department: string;
}

export interface Student {
  student_id?: number;
  name: string;
  year_level: number;
}

export interface Course {
  course_id?: number;
  course_name: string;
  teacher: number; // teacher id
  teacher_details?: Teacher;
}

export interface Enrollment {
  enrollment_id?: number;
  student: number; // student id
  course: number; // course id
  student_details?: Student;
  course_details?: Course;
}
