# Exam Result Module System

A professional, full-stack management dashboard for academic institutions to manage Students, Subjects, and Exam Results. Features automated grading, percentage calculation, and printable marksheets.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide Icons, Axios, React Router.
- **Backend**: Node.js, Express.js, Prisma ORM.
- **Database**: MongoDB.
- **Authentication**: JWT (JSON Web Tokens).

---

##  Installation & Setup

### 1. Prerequisites
- Node.js installed.
- MongoDB database (local or Atlas).

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Setup Prisma
npx prisma generate
```

### 3. Environment Configuration
Create a `.env` file in the `backend` directory and add the following:
```env
PORT=5000
DATABASE_URL="mongodb+srv://your_username:your_password@cluster.mongodb.net/exam_db?retryWrites=true&w=majority"
JWT_SECRET="your_super_secret_key_here"

```

### 4. Database Initialization
```bash
# Push the schema to your MongoDB
npx prisma db push

# (Optional) Seed initial data
node prisma/seed.js
```

### 5. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

##  Admin Credentials
Once the system is running, you can log in with the following default credentials (if you ran the seed script):

- **Email**: `admin@example.com`
- **Password**: `admin123`

---

## API Documentation
The interactive API documentation (Swagger) is available at: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

##  Project Structure

### Backend
- `/src/controllers`: Request handlers.
- `/src/services`: Database logic (Prisma).
- `/src/routes`: API endpoints.
- `/prisma`: Schema definition and migrations.

### Frontend
- `/src/pages`: Main view components (Dashboard, Students, etc).
- `/src/components`: Reusable UI elements.
- `/src/services`: API service layer.
- `/src/hooks`: Custom React hooks for data fetching.

---

##  License
This project is for educational purposes and internal management use.
