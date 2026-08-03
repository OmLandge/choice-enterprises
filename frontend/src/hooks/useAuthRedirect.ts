import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userString = sessionStorage.getItem("user");

      // Not logged in
      if (!token || !userString) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("user");

        // Redirect to login unless already there
        if (window.location.pathname !== "/login") {
          navigate("/login", { replace: true });
          window.location.reload();
        }

        return false;
      }

      try {
        const user = JSON.parse(userString);

        if (!user || !user.role) {
          throw new Error("Invalid user data");
        }

        // Admin should only access admin dashboard
        if (
          user.role === "ADMIN" &&
          window.location.pathname !== "/admin"
        ) {
          navigate("/admin", { replace: true });
          window.location.reload();
        }

        // Employee should only access employee dashboard
        if (
          user.role === "EMPLOYEE" &&
          window.location.pathname !== "/dashboard"
        ) {
          navigate("/dashboard", { replace: true });
          window.location.reload();
        }

        return true;
      } catch (error) {
        console.error("Error parsing user data:", error);

        localStorage.removeItem("token");
        sessionStorage.removeItem("user");

        navigate("/login", { replace: true });
        window.location.reload();

        return false;
      }
    };

    const isAuthenticated = checkAuth();
    setIsLoading(!isAuthenticated);
  }, [navigate]);

  return { isLoading };
};