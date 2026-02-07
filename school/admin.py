from django.contrib import admin
from .models import Teacher, Student, Course, Enrollment


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ['teacher_id', 'teacher_name', 'department']
    search_fields = ['teacher_name', 'department']


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'name', 'year_level']
    search_fields = ['name']
    list_filter = ['year_level']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['course_id', 'course_name', 'teacher']
    search_fields = ['course_name']
    list_filter = ['teacher']


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ['enrollment_id', 'student', 'course']
    search_fields = ['student__name', 'course__course_name']
    list_filter = ['course']
