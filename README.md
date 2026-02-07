# School Management System - Django REST Framework API

## Project Overview
This is a Django REST Framework implementation of a School Management System with CRUD operations for Teachers, Students, Courses, and Enrollments based on the provided ERD.

## Project Structure
```
c:\Users\daniv\ERD\
├── school_management/          # Main project settings
│   ├── settings.py             # Django settings
│   ├── urls.py                 # Project URL configuration
│   ├── wsgi.py                 # WSGI application
│   └── asgi.py                 # ASGI application
├── school/                     # Main application
│   ├── models.py               # Database models
│   ├── views.py                # DRF ViewSets
│   ├── serializers.py          # DRF Serializers
│   ├── urls.py                 # App URL routing
│   ├── admin.py                # Django admin configuration
│   └── migrations/             # Database migrations
├── manage.py                   # Django management script
└── db.sqlite3                  # SQLite database
```

## Models

### Teacher
- **teacher_id** (PK): Auto-generated primary key
- **teacher_name**: Name of the teacher (CharField, max_length=100)
- **department**: Department name (CharField, max_length=50)

### Student
- **student_id** (PK): Auto-generated primary key
- **name**: Student name (CharField, max_length=100)
- **year_level**: Academic year level (IntegerField)

### Course
- **course_id** (PK): Auto-generated primary key
- **course_name**: Name of the course (CharField, max_length=100)
- **teacher** (FK): Foreign key to Teacher model

### Enrollment
- **enrollment_id** (PK): Auto-generated primary key
- **student** (FK): Foreign key to Student model
- **course** (FK): Foreign key to Course model

## API Endpoints

### Teachers
- **List all teachers**: `GET /api/teachers/`
- **Retrieve teacher**: `GET /api/teachers/{id}/`
- **Create teacher**: `POST /api/teachers/`
- **Update teacher**: `PUT /api/teachers/{id}/`
- **Partial update**: `PATCH /api/teachers/{id}/`
- **Delete teacher**: `DELETE /api/teachers/{id}/`

### Students
- **List all students**: `GET /api/students/`
- **Retrieve student**: `GET /api/students/{id}/`
- **Create student**: `POST /api/students/`
- **Update student**: `PUT /api/students/{id}/`
- **Partial update**: `PATCH /api/students/{id}/`
- **Delete student**: `DELETE /api/students/{id}/`

### Courses
- **List all courses**: `GET /api/courses/`
- **Retrieve course**: `GET /api/courses/{id}/`
- **Create course**: `POST /api/courses/`
- **Update course**: `PUT /api/courses/{id}/`
- **Partial update**: `PATCH /api/courses/{id}/`
- **Delete course**: `DELETE /api/courses/{id}/`

### Enrollments
- **List all enrollments**: `GET /api/enrollments/`
- **Retrieve enrollment**: `GET /api/enrollments/{id}/`
- **Create enrollment**: `POST /api/enrollments/`
- **Update enrollment**: `PUT /api/enrollments/{id}/`
- **Partial update**: `PATCH /api/enrollments/{id}/`
- **Delete enrollment**: `DELETE /api/enrollments/{id}/`

## Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Setup Steps

1. **Install dependencies:**
```bash
pip install django djangorestframework
```

2. **Navigate to project directory:**
```bash
cd c:\Users\daniv\ERD
```

3. **Apply migrations (already done):**
```bash
python manage.py migrate
```

4. **Create superuser (optional, for admin access):**
```bash
python manage.py createsuperuser
```

5. **Run development server:**
```bash
python manage.py runserver
```

Server will start at `http://127.0.0.1:8000/`

## Usage Examples

### Create a Teacher
```bash
curl -X POST http://localhost:8000/api/teachers/ \
  -H "Content-Type: application/json" \
  -d '{
    "teacher_name": "John Smith",
    "department": "Mathematics"
  }'
```

### Create a Student
```bash
curl -X POST http://localhost:8000/api/students/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "year_level": 2
  }'
```

### Create a Course
```bash
curl -X POST http://localhost:8000/api/courses/ \
  -H "Content-Type: application/json" \
  -d '{
    "course_name": "Calculus I",
    "teacher": 1
  }'
```

### Create an Enrollment
```bash
curl -X POST http://localhost:8000/api/enrollments/ \
  -H "Content-Type: application/json" \
  -d '{
    "student": 1,
    "course": 1
  }'
```

### Read Operations
```bash
# Get all teachers
curl http://localhost:8000/api/teachers/

# Get specific teacher
curl http://localhost:8000/api/teachers/1/

# Get all students
curl http://localhost:8000/api/students/

# Get all courses
curl http://localhost:8000/api/courses/

# Get all enrollments
curl http://localhost:8000/api/enrollments/
```

### Update Operations
```bash
# Update teacher
curl -X PUT http://localhost:8000/api/teachers/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "teacher_name": "John Smith",
    "department": "Physics"
  }'

# Partial update
curl -X PATCH http://localhost:8000/api/teachers/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "department": "Computer Science"
  }'
```

### Delete Operations
```bash
# Delete teacher
curl -X DELETE http://localhost:8000/api/teachers/1/

# Delete student
curl -X DELETE http://localhost:8000/api/students/1/

# Delete course
curl -X DELETE http://localhost:8000/api/courses/1/

# Delete enrollment
curl -X DELETE http://localhost:8000/api/enrollments/1/
```

## Response Format

### Successful CREATE Response (201 Created)
```json
{
  "teacher_id": 1,
  "teacher_name": "John Smith",
  "department": "Mathematics"
}
```

### Successful READ Response (200 OK)
```json
{
  "teacher_id": 1,
  "teacher_name": "John Smith",
  "department": "Mathematics"
}
```

### List Response (200 OK)
```json
[
  {
    "teacher_id": 1,
    "teacher_name": "John Smith",
    "department": "Mathematics"
  },
  {
    "teacher_id": 2,
    "teacher_name": "Jane Doe",
    "department": "English"
  }
]
```

### Enrollment Response with Nested Details
```json
{
  "enrollment_id": 1,
  "student": 1,
  "course": 1,
  "student_details": {
    "student_id": 1,
    "name": "Jane Doe",
    "year_level": 2
  },
  "course_details": {
    "course_id": 1,
    "course_name": "Calculus I",
    "teacher": 1,
    "teacher_details": {
      "teacher_id": 1,
      "teacher_name": "John Smith",
      "department": "Mathematics"
    }
  }
}
```

### Error Response (400 Bad Request)
```json
{
  "field_name": [
    "This field is required."
  ]
}
```

## Features

✅ **CRUD Operations**: Full Create, Read, Update, Delete functionality
✅ **DRF ModelViewSet**: Automatic REST endpoints generation
✅ **Nested Serializers**: Related object details in responses
✅ **Read-only Fields**: Primary keys are read-only
✅ **Relationships**: Proper foreign key management
✅ **Automatic Validation**: Built-in serializer validation
✅ **Admin Interface**: Django admin configuration

## Testing the API

You can test the API using:
1. **Postman** - Desktop app for API testing
2. **cURL** - Command-line tool
3. **Browser** - For GET requests (DRF provides browsable API)
4. **Python requests** - For automated testing

### Access Browsable API
Open your browser and navigate to:
- `http://localhost:8000/api/teachers/`
- `http://localhost:8000/api/students/`
- `http://localhost:8000/api/courses/`
- `http://localhost:8000/api/enrollments/`

## Database Schema
The database follows the ERD with these relationships:
- **Teacher** (1) ←→ (Many) **Course**
- **Course** (1) ←→ (Many) **Enrollment**
- **Student** (1) ←→ (Many) **Enrollment**

## Troubleshooting

### Port Already in Use
If port 8000 is already in use, run:
```bash
python manage.py runserver 8001
```

### Database Issues
To reset the database:
```bash
rm db.sqlite3
python manage.py migrate
```

### Import Errors
Ensure all packages are installed:
```bash
pip install -r requirements.txt
```

## Next Steps

Consider adding:
1. **Authentication** - Token or JWT authentication
2. **Permissions** - Object-level permissions
3. **Pagination** - Large dataset pagination
4. **Filtering** - Advanced filtering options
5. **Testing** - Unit and integration tests
6. **Documentation** - API documentation with Swagger/OpenAPI

## References

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [DRF Serializers](https://www.django-rest-framework.org/api-guide/serializers/)
- [DRF ViewSets](https://www.django-rest-framework.org/api-guide/viewsets/)
