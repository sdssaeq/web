import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

function ProtectedRoute({ element }: ProtectedRouteProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:8080/protected/", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.message === "You are authenticated") {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        } catch (error) {
          console.error("Error accessing protected route:", error);
          setAuthenticated(false);
        }
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    }

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;
