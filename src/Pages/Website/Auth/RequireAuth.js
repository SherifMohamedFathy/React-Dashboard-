import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "./Login";
import { User } from "../context/UserContext";

export default function RequireAuth() {
  const user = useContext(User);
  const location = useLocation();
  return user.auth.userDetails ? <Outlet /> : <Navigate state={{ from: location }} replace to="/login" />;
}
