import { Container } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";

const FavCardsPage = () => {
  const { user } = useUser();
  const { value, handleDeleteCard, handleGetFavCards } = useCards();
  const { isLoading, error, filteredCards } = value;

  useEffect(() => {
    handleGetFavCards();
  }, [handleGetFavCards]);

  const onDeleteCard = useCallback(
    async (cardId) => {
      await handleDeleteCard(cardId);
      await handleGetFavCards();
    },
    [handleDeleteCard, handleGetFavCards]
  );

  const changeLikeStatus = useCallback(async () => {
    await handleGetFavCards();
  }, [handleGetFavCards]);

  if (!user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container>
      <PageHeader
        title="Favorite Cards Page"
        subtitle="Here you can find all your favorite business cards"
      />
      <CardsFeedback
        cards={filteredCards}
        error={error}
        isLoading={isLoading}
        onDelete={onDeleteCard}
        onLike={changeLikeStatus}
      />
    </Container>
  );
};

export default FavCardsPage;
