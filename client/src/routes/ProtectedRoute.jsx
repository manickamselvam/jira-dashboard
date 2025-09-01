import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isloggedin, loading } = useSelector((state) => state.auth);

  if (loading) return null;

  return isloggedin ? children : <Navigate to="/login" />;
}
