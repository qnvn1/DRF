from django.db import models


class Teacher(models.Model):
    """Teacher model with ID, Name, and Department"""
    teacher_id = models.AutoField(primary_key=True)
    teacher_name = models.CharField(max_length=100)
    department = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.teacher_name} - {self.department}"

    class Meta:
        db_table = 'teacher'


class Student(models.Model):
    """Student model with ID, Name, and Year Level"""
    student_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    year_level = models.IntegerField()

    def __str__(self):
        return f"{self.name} - Year {self.year_level}"

    class Meta:
        db_table = 'student'


class Course(models.Model):
    """Course model with ID, Name, and Teacher Foreign Key"""
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=100)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.course_name} - {self.teacher.teacher_name}"

    class Meta:
        db_table = 'course'


class Enrollment(models.Model):
    """Enrollment model linking Students and Courses"""
    enrollment_id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.student.name} - {self.course.course_name}"

    class Meta:
        db_table = 'enrollment'
