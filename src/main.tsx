import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Kehadiran from "./routes/kehadiran";
import RiwayatAbsen from "./routes/riwayatabsen";
import Ranking from "./routes/ranking";
import Home from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/kehadiran",
    element: <Kehadiran />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/riwayat",
    element: <RiwayatAbsen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/ranking",
    element: <Ranking />,
    errorElement: <ErrorPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
