from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Teacher, Student, Course, Enrollment
from .serializers import TeacherSerializer, StudentSerializer, CourseSerializer, EnrollmentSerializer


class TeacherViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Teacher CRUD operations
    - GET /teachers/ : List all teachers
    - GET /teachers/{id}/ : Retrieve specific teacher
    - POST /teachers/ : Create new teacher
    - PUT /teachers/{id}/ : Update teacher
    - DELETE /teachers/{id}/ : Delete teacher
    """
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class StudentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Student CRUD operations
    - GET /students/ : List all students
    - GET /students/{id}/ : Retrieve specific student
    - POST /students/ : Create new student
    - PUT /students/{id}/ : Update student
    - DELETE /students/{id}/ : Delete student
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class CourseViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Course CRUD operations
    - GET /courses/ : List all courses
    - GET /courses/{id}/ : Retrieve specific course
    - POST /courses/ : Create new course
    - PUT /courses/{id}/ : Update course
    - DELETE /courses/{id}/ : Delete course
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class EnrollmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Enrollment CRUD operations
    - GET /enrollments/ : List all enrollments
    - GET /enrollments/{id}/ : Retrieve specific enrollment
    - POST /enrollments/ : Create new enrollment
    - PUT /enrollments/{id}/ : Update enrollment
    - DELETE /enrollments/{id}/ : Delete enrollment
    """
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
