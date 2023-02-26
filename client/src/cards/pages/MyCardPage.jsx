import React from "react";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

const MyCardPage = () => {
  const { user } = useUser();

  if (!user || !user.isBusiness) return <Navigate replace to={ROUTES.CARDS} />;
  return <div>MyCardPage</div>;
};

export default MyCardPage;
