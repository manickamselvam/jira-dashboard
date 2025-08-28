// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// export default function ProtectedRoute({ children }) {
//   const isloggedin = useSelector((state) => state.auth.isloggedin);
//   console.log('User in protected route :', isloggedin);
//   return isloggedin ? children : <Navigate to="/login" />;
// }

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isloggedin, loading } = useSelector((state) => state.auth);

  if (loading) return null; // or a spinner

  return isloggedin ? children : <Navigate to="/login" />;
}
