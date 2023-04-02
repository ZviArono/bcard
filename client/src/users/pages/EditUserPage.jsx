import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import ROUTES from "./../../routes/routesModel";
import { useUser } from "../providers/UserProvider";
import Container from "@mui/material/Container";
import useForm from "../../forms/hooks/useForm";
import useUsers from "./../hooks/useUsers";
import normalizeUser from "../helpers/normalization/normalizeUser";
import mapUserToModel from "../helpers/normalization/mapUserToModel";
import UserEditForm from "../components/UserEditForm";
import initialUserEditForm from "../helpers/initialForms/initialUserEditForm";
import editUserSchema from "../models/joi-schema/editUserSchema";
import PageHeader from "../../components/PageHeader";

const EditUserPage = () => {
  const { user } = useUser();
  const { users, handleEditUser, handleGetUser } = useUsers();
  const { id } = useParams();

  const { formValue, ...rest } = useForm(
    initialUserEditForm,
    editUserSchema,
    () => {
      handleEditUser(id, {
        ...normalizeUser({ ...formValue.data }),
        _id: users._id,
        email: users.email,
        password: users.password,
        loginAttempts: users.loginAttempts,
        lastFailedAttempt: users.lastFailedAttempt,
        isBusiness: users.isBusiness,
      });
    }
  );

  useEffect(() => {
    handleGetUser(id).then((data) => {
      const modeledUser = mapUserToModel(data);
      rest.setData(modeledUser);
    });
  }, [handleGetUser, id, rest]);

  if (!user || (user._id !== id && !user.isAdmin))
    return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container>
      <PageHeader
        title="Edit your Profile Page"
        subtitle="Here you can edit you user account"
      />

      <Container
        sx={{
          paddingTop: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserEditForm
          title="Edit User Profile"
          onSubmit={rest.onSubmit}
          onReset={rest.handleReset}
          onFormChange={rest.validateForm}
          onInputChange={rest.handleChange}
          data={formValue.data}
          errors={formValue.errors}
          setData={rest.setData}
        />
      </Container>
    </Container>
  );
};

export default EditUserPage;
