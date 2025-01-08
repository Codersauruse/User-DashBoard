import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Dashboard, UserLayout } from "./layouts/index";
import Register from "./pages/auth/Register";
import { Toaster } from "react-hot-toast";
import Login from "./pages/auth/Login";

export default function App() {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard/*"
            element={
              <UserLayout>
                <Dashboard />
              </UserLayout>
            }
          />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
