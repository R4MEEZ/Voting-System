// PrivateRoutes.js
import React from "react";
import { useCookies } from "react-cookie";
import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

const PrivateRoutes = () => {
  const { user } = useUser();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  return user && token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
