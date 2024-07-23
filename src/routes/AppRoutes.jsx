import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Forget from "../pages/Forget.jsx";
import EmailVerify from "../components/EmailVerify.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import AddUser from "../pages/Adduser.jsx";
import RoleManagement from "../pages/RoleManagement.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/role-management" element={<RoleManagement />} />
      <Route path="/forget-password" element={<Forget />} />
      <Route path="/*" element={<Navigate replace to="/" />} />
      <Route
        path="/users/:id/forgot-password/:token"
        element={<ResetPassword />}
      />
    </Routes>
  );
}

export default AppRoutes;
