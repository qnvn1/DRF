import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "school_management.settings")
django.setup()

from django.contrib.auth.models import User

ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin")

if not User.objects.filter(username="admin").exists():
    User.objects.create_superuser(
        username="admin",
        email="admin@example.com",
        password=ADMIN_PASSWORD
    )