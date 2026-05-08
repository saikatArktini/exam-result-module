import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import StudentsPage from '../pages/students/StudentsPage';
import AddStudentPage from '../pages/students/AddStudentPage';
import EditStudentPage from '../pages/students/EditStudentPage';
import SubjectsPage from '../pages/subjects/SubjectsPage';
import AddSubjectPage from '../pages/subjects/AddSubjectPage';
import EditSubjectPage from '../pages/subjects/EditSubjectPage';
import ResultsPage from '../pages/results/ResultsPage';
import AddResultPage from '../pages/results/AddResultPage';
import ResultDetailsPage from '../pages/results/ResultDetailsPage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import MainLayout from '../layouts/MainLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes - User CANNOT see these if already logged in */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Protected Routes - User MUST be logged in to see these */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />

        {/* Student Module Routes */}
        <Route path="students" element={<StudentsPage />} />
        <Route path="students/add" element={<AddStudentPage />} />
        <Route path="students/edit/:id" element={<EditStudentPage />} />

        {/* We will add subjects and results here later */}
        {/* Subject Module Routes */}
        <Route path="subjects" element={<SubjectsPage />} />
        <Route path="subjects/add" element={<AddSubjectPage />} />
        <Route path="subjects/edit/:id" element={<EditSubjectPage />} />
        {/* Result Module Routes */}
        <Route path="results" element={<ResultsPage />} />
        <Route path="results/add" element={<AddResultPage />} />
        <Route path="results/:id" element={<ResultDetailsPage />} />
      </Route>

      {/* Redirect all unknown routes to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
