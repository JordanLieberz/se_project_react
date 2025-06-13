import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children, redirectPath = "/" }) {
  return isLoggedIn ? children : <Navigate to={redirectPath} replace />;
}

export default ProtectedRoute;
