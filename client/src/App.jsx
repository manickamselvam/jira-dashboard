import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './routes/ProtectedRoute';
import MainLayout from './layouts/MainLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              {/* <MainLayout> */}
                <DashboardPage />
              {/* </MainLayout> */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}