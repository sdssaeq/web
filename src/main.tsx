import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Kehadiran from "./routes/kehadiran";
import RiwayatAbsen from "./routes/riwayatabsen";
import Ranking from "./routes/ranking";
import Home from "./routes/Home";
import AbsenManual from "./routes/absenManual";
import Tambahwajah from "./routes/tambahwajah";
import Login from "./routes/login";
import ProtectedRoute from "./components/protectedRoute";
import Hapuswajah from "./routes/hapus";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/kehadiran", element: <Kehadiran /> },
      { path: "/riwayat", element: <RiwayatAbsen /> },
      { path: "/ranking", element: <Ranking /> },
      { path: "/absenmanual", element: <AbsenManual /> },
      {
        path: "/tambahwajah",
        element: (
          <ProtectedRoute>
            <Tambahwajah />
          </ProtectedRoute>
        ),
      },
      {
        path: "/hapuswajah",
        element: (
          <ProtectedRoute>
            <Hapuswajah />
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <Login /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
