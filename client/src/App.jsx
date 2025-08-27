import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './routes/ProtectedRoute';
// import MainLayout from '../src/components/layouts';
import RegisterPage from './pages/RegisterPage';
import BoardPage from './pages/TaskBoardPage';
import TaskDetailPage from './pages/TaskDetailPage';
import UserDashboard from './pages/UserDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
            //   <MainLayout>
            //   <DashboardPage />
            //   </MainLayout>
            // </ProtectedRoute>
            <DashboardPage />
          }
        />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/task/:taskId" element={<TaskDetailPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
