import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ROUTES from "../../routes/routesModel";
import useUsers from "../hooks/useUsers";
import { useUser } from "../providers/UserProvider";

const UsersPage = () => {
  const { handleGetUsers } = useUsers();

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  const { user } = useUser();
  if (!user || !user.isAdmin) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container>
      <PageHeader
        title="Users Crm Page"
        subtitle="On this page you can edit all users"
      />
    </Container>
  );
};

export default UsersPage;
