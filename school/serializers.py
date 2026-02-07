from rest_framework import serializers
from .models import Teacher, Student, Course, Enrollment


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['teacher_id', 'teacher_name', 'department']
        read_only_fields = ['teacher_id']


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['student_id', 'name', 'year_level']
        read_only_fields = ['student_id']


class CourseSerializer(serializers.ModelSerializer):
    teacher_details = TeacherSerializer(source='teacher', read_only=True)
    
    class Meta:
        model = Course
        fields = ['course_id', 'course_name', 'teacher', 'teacher_details']
        read_only_fields = ['course_id']


class EnrollmentSerializer(serializers.ModelSerializer):
    student_details = StudentSerializer(source='student', read_only=True)
    course_details = CourseSerializer(source='course', read_only=True)
    
    class Meta:
        model = Enrollment
        fields = ['enrollment_id', 'student', 'course', 'student_details', 'course_details']
        read_only_fields = ['enrollment_id']
