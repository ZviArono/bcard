import React from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "./../../routes/routesModel";

const SignupPage = () => {
  // const user = true;
  const user = false;

  if (user) return <Navigate replace to={ROUTES.CARDS} />;

  return <div>SignupPage</div>;
};

export default SignupPage;
