import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ResetPassword from "../../pages/ResetPassword";
import Forget from "../../pages/Forget";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout routeElement={routeElement} />}>
        <Route index element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>

      <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      <Route
        path="/users/:id/forgot-password/:token"
        element={<ResetPassword />}
      />
      <Route path={"/forget-password"} element={<Forget />} />
      <Route path={"/*"} element={<Navigate replace to={"/"} />} />
    </Routes>
  );
}

export default AppRoutes;
