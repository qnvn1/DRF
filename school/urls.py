from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from .views import TeacherViewSet, StudentViewSet, CourseViewSet, EnrollmentViewSet

router = DefaultRouter()
router.register(r'teachers', TeacherViewSet)
router.register(r'students', StudentViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'enrollments', EnrollmentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
]
