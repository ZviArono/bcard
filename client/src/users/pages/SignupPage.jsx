import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import ROUTES from "./../../routes/routesModel";

const SignupPage = () => {
  const { user } = useUser();
  // const user = true;
  // const user = false;

  if (user) return <Navigate replace to={ROUTES.CARDS} />;

  return <div>SignupPage</div>;
};

export default SignupPage;
