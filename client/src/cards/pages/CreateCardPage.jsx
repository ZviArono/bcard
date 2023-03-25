import React, { useEffect } from "react";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import Container from "@mui/material/Container";
import useCards from "../hooks/useCards";
import CardForm from "../components/CardForm";
import useForm from "../../forms/hooks/useForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import cardSchema from "../models/joi-schema/cardSchema";

const CreateCardPage = (props) => {
  const { user } = useUser();
  const { handleGetMyCards, handleCreateCard } = useCards();
  const { formValue, ...rest } = useForm(
    initialCardForm,
    cardSchema,
    handleCreateCard
  );

  useEffect(() => {
    handleGetMyCards();
  }, [handleGetMyCards]);

  if (!user || !user.isBusiness) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardForm
        title="create new business card"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        data={formValue.data}
        errors={formValue.errors}
        setData={rest.setData}
      />
    </Container>
  );
};

export default CreateCardPage;
