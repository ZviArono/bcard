import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import CardForm from "../components/CardForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import mapCardToModel from "../helpers/normalization/mapCardToModel";
import normalizeCard from "../helpers/normalization/normalizeCard";
import useCards from "../hooks/useCards";
import cardSchema from "../models/joi-schema/cardSchema";

const EditCardPage = () => {
  const { value, handleUpdateCard, handleGetCard } = useCards();
  const { card } = value;
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const { formValue, ...rest } = useForm(initialCardForm, cardSchema, () =>
    handleUpdateCard(id, {
      ...normalizeCard({ ...formValue.data }),
      bizNumber: card.bizNumber,
      user_id: card.user_id,
    })
  );

  useEffect(() => {
    handleGetCard(id).then((data) => {
      if (!user.isAdmin && user._id !== data.user_id) navigate(ROUTES.CARDS);
      const modeledCard = mapCardToModel(data);
      rest.setData(modeledCard);
    });
  }, []);

  if (!user) return <Navigate replace to={ROUTES.CARDS} />;

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
        title="Edit business card"
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

export default EditCardPage;
