# Post Job Module - Production Implementation Guide

## Overview

A production-level Post Job module for a modern job portal with React (Vite) frontend and FastAPI backend, featuring role-based access control, job approval workflows, and comprehensive validation.

---

## 🏗️ Architecture

### Frontend Stack
- **Framework**: React 19 + TypeScript + Vite
- **UI**: Tailwind CSS + Shadcn UI components
- **State Management**: React Context API
- **Routing**: React Router v7
- **Icons**: Lucide React

### Backend Stack
- **Framework**: FastAPI with async support
- **Validation**: Pydantic v2
- **Authentication**: JWT with python-jose
- **Rate Limiting**: slowapi
- **Python**: 3.8+

### Data Flow (No Database Implementation)
```
Recruiter posts job → Frontend validation → API submission
    ↓
Backend validates + stores in memory → Returns pending status
    ↓
Admin reviews pending jobs → Approves/Rejects
    ↓
Job status updated → Visible on platform (if approved)
```

---

## 📁 Project Structure

### Backend Directory (`/backend`)

```
backend/
├── requirements.txt          # Python dependencies
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app initialization
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py        # Settings and configuration
│   │   └── security.py      # JWT authentication & role checks
│   ├── models/
│   │   ├── __init__.py
│   │   ├── job.py           # Job data model with enums
│   │   └── job_store.py     # In-memory job storage
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── job.py           # Pydantic request/response schemas
│   └── api/
│       ├── __init__.py
│       ├── auth.py          # Authentication endpoints
│       ├── jobs.py          # Job posting endpoints (recruiter)
│       └── admin.py         # Admin moderation endpoints
```

### Frontend Directory (`/app/src`)

```
app/src/
├── pages/
│   ├── PostJobPage.tsx      # Job posting form (recruiter)
│   └── RecruiterDashboard.tsx # Dashboard showing recruiter's jobs
├── components/
│   └── ProtectedRoute.tsx   # Route protection HOC
├── context/
│   └── AuthContext.tsx      # Authentication context provider
├── services/
│   └── api.ts               # API service layer
├── types/
│   └── index.ts             # TypeScript type definitions
└── App.tsx                  # Main app with routing
```

---

## 🔐 Authentication & Authorization

### JWT Token Structure
```json
{
  "user_id": "recruiter_001",
  "email": "recruiter@example.com",
  "role": "recruiter",
  "exp": 1704067200,
  "iat": 1704067200
}
```

### Roles
- **recruiter**: Can post jobs (limited to 10/hour), view own jobs
- **admin**: Can view pending jobs, approve/reject, see all jobs
- **user**: Read-only access to approved jobs

### Protected Routes

```
GET  /api/v1/auth/login          # Login (public)
GET  /api/v1/auth/me             # Current user (protected)

POST /api/v1/jobs                # Create job (recruiter only)
GET  /api/v1/jobs/my-jobs        # Get recruiter's jobs (recruiter only)
GET  /api/v1/jobs/{job_id}       # Get job details (public)
GET  /api/v1/jobs                # List approved jobs (public)

GET  /api/v1/admin/jobs/pending  # Get pending jobs (admin only)
POST /api/v1/admin/jobs/{id}/approve  # Approve/reject (admin only)
```

---

## 📋 Job Posting Workflow

### Step 1: Frontend Validation
```typescript
// Client-side validation ensures:
- Job title: 3-200 characters
- Company name: 2-200 characters
- Location: required (on-site, remote, hybrid)
- Employment type: required
- Experience: 0-70 years
- Salary: non-negative, min ≤ max
- Skills: 1-20 unique tags
- Descriptions: 50-5000 characters
- Application deadline: future date
```

### Step 2: API Submission
```bash
POST /api/v1/jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Senior React Developer",
  "company_name": "Tech Corp",
  "location": "remote",
  "employment_type": "full-time",
  "experience_required": 5,
  "salary_min": 120000,
  "salary_max": 180000,
  "salary_disclosed": true,
  "skills_required": ["react", "typescript", "node.js"],
  "job_description": "Join our growing team...",
  "responsibilities": "Develop and maintain...",
  "qualifications": "5+ years experience...",
  "number_of_openings": 2,
  "application_deadline": "2026-03-01T23:59:59Z"
}
```

### Step 3: Backend Processing
```
Backend receives → Validates with Pydantic
    ↓
Confirms recruiter role → Creates job with PENDING status
    ↓
Returns job with ID + created_at timestamp
    ↓
Frontend shows success message → Redirects to dashboard
```

### Step 4: Admin Approval
```bash
POST /api/v1/admin/jobs/{job_id}/approve
Authorization: Bearer <admin_token>

# Approve
{
  "approved": true
}

# Reject
{
  "approved": false,
  "rejection_reason": "Salary range too low for role"
}
```

---

## 🚀 Setup & Running

### Backend Setup

1. **Install dependencies**:
```bash
cd backend
pip install -r requirements.txt
```

2. **Run development server**:
```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

3. **Access API documentation**:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Frontend Setup

1. **Environment variables** (`/app/.env.local`):
```
VITE_API_URL=http://localhost:8000
```

2. **Start development server**:
```bash
cd app
npm install
npm run dev
```

3. **Access application**:
- Frontend: http://localhost:5173

---

## 🧪 Demo Testing

### Test Users (from backend/app/api/auth.py)

| Role | Email | Password |
|------|-------|----------|
| Recruiter | `recruiter@example.com` | `password123` |
| Admin | `admin@example.com` | `password123` |
| User | `user@example.com` | `password123` |

### Test Flows

**As a Recruiter:**
1. Login with `recruiter@example.com`
2. Click "Post New Job"
3. Fill in all required fields
4. Submit → See success message
5. Dashboard shows job with "Pending Approval" status

**As an Admin:**
1. Login with `admin@example.com`
2. Navigate to Admin Panel
3. See all pending jobs
4. Click "Review" → Approve or Reject with reason
5. Job status updates immediately

---

## 🔒 Security Features

### Frontend Security
- ✅ Protected routes with role-based access
- ✅ JWT token stored in localStorage
- ✅ Input validation with inline error messages
- ✅ XSS prevention through React's built-in escaping
- ✅ Redirect unauthenticated users to login

### Backend Security
- ✅ JWT token validation on protected routes
- ✅ Role-based access control (RBAC)
- ✅ Pydantic validation & sanitization
- ✅ Rate limiting (10 jobs/hour per recruiter)
- ✅ CORS configured for frontend domain
- ✅ Async support for non-blocking I/O
- ✅ Error messages don't leak sensitive info

### Data Validation
```python
# Example: Salary validation
if salary_min and salary_max:
    assert salary_max >= salary_min  # Must be in correct order
    assert salary_min >= 0  # No negative values
    assert salary_max >= 0

# Experience validation
assert 0 <= experience_required <= 70

# Deadline validation
assert application_deadline > datetime.utcnow()  # Must be future
```

---

## 📊 Status Lifecycle

```
PENDING → (Admin reviews) → APPROVED or REJECTED
   ↓
   Visible only to recruiter
   (In real app, hidden from job seekers)
   
APPROVED
   ↓
   Visible to all job seekers
   
REJECTED
   ↓
   Recruiter sees rejection reason
   Can resubmit edited version
```

---

## 🎨 UI Components Used

- **Card**: Display job details
- **Button**: Actions (Submit, Cancel, Approve, Reject)
- **Input**: Text fields for job details
- **Textarea**: Multi-line fields (descriptions)
- **Select**: Dropdown selections (location, employment type)
- **Badge**: Status indicators
- **Alert**: Success/error messages
- **Spinner**: Loading states

---

## 🔧 Backend Extensions (For Database Integration)

The backend is structured for easy database migration:

1. **Replace `JobStore` in `models/job_store.py`**:
   ```python
   # Currently: In-memory dict
   # Future: SQLAlchemy ORM
   class JobStore(Base):
       __tablename__ = "jobs"
       id = Column(String, primary_key=True)
       recruiter_id = Column(String, ForeignKey("users.id"))
       status = Column(String, default="pending")
       # ... other fields
   ```

2. **Update schemas** for database responses:
   ```python
   class JobPostingResponse(BaseModel):
       # Already matches database structure
       model_config = ConfigDict(from_attributes=True)
   ```

3. **Add migrations**:
   ```bash
   alembic init alembic
   alembic revision --autogenerate -m "Initial schema"
   alembic upgrade head
   ```

---

## 📝 API Examples

### Create Job
```bash
curl -X POST http://localhost:8000/api/v1/jobs \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Frontend Engineer",
    "company_name": "Tech Corp",
    "location": "remote",
    "employment_type": "full-time",
    "experience_required": 5,
    "salary_min": 120000,
    "salary_max": 180000,
    "salary_disclosed": true,
    "skills_required": ["react", "typescript"],
    "job_description": "We are hiring...",
    "responsibilities": "Develop features...",
    "qualifications": "5+ years...",
    "number_of_openings": 2,
    "application_deadline": "2026-03-15T23:59:59Z"
  }'
```

### Get My Jobs
```bash
curl http://localhost:8000/api/v1/jobs/my-jobs \
  -H "Authorization: Bearer <recruiter_token>"
```

### Approve Job (Admin)
```bash
curl -X POST http://localhost:8000/api/v1/admin/jobs/{job_id}/approve \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{"approved": true}'
```

### Reject Job (Admin)
```bash
curl -X POST http://localhost:8000/api/v1/admin/jobs/{job_id}/approve \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "approved": false,
    "rejection_reason": "Salary range needs adjustment"
  }'
```

---

## 🎯 Features Implemented

✅ **Recruiter Features**
- Post jobs with comprehensive details
- View own job postings
- See approval status (Pending/Approved/Rejected)
- Inline validation with error messages
- Loading states during submission
- Success notifications

✅ **Admin Features**
- View all pending jobs
- Approve jobs
- Reject jobs with reasons
- See all job details

✅ **Security**
- JWT authentication
- Role-based access control
- Rate limiting (10 jobs/hour)
- Frontend input validation
- Backend data validation
- Protected routes

✅ **User Experience**
- Clean, modern interface
- Responsive design
- Real-time validation feedback
- Clear error messages
- Success confirmation messages
- Status indicators

---

## 📌 Important Notes

1. **No Database**: Job data is stored in memory and resets on server restart
2. **Demo Users**: Fixed credentials for testing (see table above)
3. **CORS**: Configured for `localhost:5173` and `localhost:3000`
4. **Rate Limiting**: 10 jobs per recruiter per hour
5. **Token Expiry**: 30 minutes (configurable in `core/config.py`)
6. **Validation**: Both frontend and backend validate all inputs

---

## 🚨 Production Checklist

Before deploying to production:

- [ ] Add real database (PostgreSQL/MongoDB)
- [ ] Implement email notifications
- [ ] Add proper error logging
- [ ] Enable HTTPS/SSL
- [ ] Implement proper user authentication
- [ ] Add payment processing for sponsored jobs
- [ ] Set up automated backups
- [ ] Add monitoring and alerting
- [ ] Implement file uploads for company logos
- [ ] Add rate limiting per IP
- [ ] Implement job analytics dashboard
- [ ] Add job search/filtering for candidates
- [ ] Implement application management system

---

## 📞 Support & Questions

For issues or questions:
1. Check the API documentation at `/docs`
2. Review validation error messages
3. Check browser console for frontend errors
4. Check server logs for backend errors

---

**Created**: February 2026  
**Version**: 1.0.0  
**License**: MIT
