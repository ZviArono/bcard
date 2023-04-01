import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ROUTES from "../../routes/routesModel";
import useUsers from "../hooks/useUsers";
import { useUser } from "../providers/UserProvider";
import { Typography } from "@mui/material";
import UsersCardFeedback from "../components/user/UsersCardFeedback";

const UsersPage = () => {
  const { handleGetUsers, handleDeleteUser, filteredUsers, error, isLoading } =
    useUsers();

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  const onDeleteUser = async (userId) => {
    await handleDeleteUser(userId);
    await handleGetUsers();
  };

  const { user } = useUser();
  if (!user || !user.isAdmin) return <Navigate replace to={ROUTES.CARDS} />;

  if (!filteredUsers)
    return (
      <Typography m={2}>
        Oops... it seems there are no users to display
      </Typography>
    );

  return (
    <Container>
      <PageHeader
        title="Users Crm Page"
        subtitle="On this page you can edit all users"
      />
      <UsersCardFeedback
        users={filteredUsers}
        error={error}
        isLoading={isLoading}
        onDelete={onDeleteUser}
      />
    </Container>
  );
};

export default UsersPage;
