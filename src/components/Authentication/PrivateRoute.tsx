import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const SESSION_TIMEOUT = 3 * 60 * 60 * 1000; // 3 hours
const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hour

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("authToken")
  );

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const loginTime = localStorage.getItem("loginTime");

    if (!authToken || !loginTime) {
      logout();
      return;
    }

    const loginTimestamp = new Date(loginTime).getTime();
    const currentTime = new Date().getTime();

    // Check session expiration (3 hours)
    if (currentTime - loginTimestamp > SESSION_TIMEOUT) {
      logout();
      return;
    }

    // Activity tracking for 1-hour inactivity logout
    let activityTimer: NodeJS.Timeout;
    const resetInactivityTimer = () => {
      if (activityTimer) clearTimeout(activityTimer);
      activityTimer = setTimeout(logout, INACTIVITY_TIMEOUT);
    };

    resetInactivityTimer();

    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keydown", resetInactivityTimer);

    return () => {
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keydown", resetInactivityTimer);
      clearTimeout(activityTimer);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loginTime");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
