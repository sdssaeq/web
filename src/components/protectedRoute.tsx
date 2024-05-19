import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { RiLoaderLine } from "@remixicon/react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            // "http://localhost:8080/protected/",
            "https://api.dprdbekasi.cloud/protected/",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

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
    return (
      <div className="w-dvh h-dvh flex items-center justify-center animate-spin">
        {<RiLoaderLine size={100} />}
      </div>
    );
  }

  return authenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
