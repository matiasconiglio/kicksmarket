import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
