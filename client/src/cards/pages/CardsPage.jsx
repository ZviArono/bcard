import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "./../hooks/useCards";

const CardsPage = () => {
  const { cards, error, isLoading, handleGetCards } = useCards();

  useEffect(() => {
    handleGetCards();
  }, []);

  return (
    <Container>
      <PageHeader
        title="Cards Page"
        subtitle="On this page you can find all business cards form all categories"
      />
      <CardsFeedback
        cards={cards}
        error={error}
        isLoading={isLoading}
        onDelete={() => {}}
      />
    </Container>
  );
};

export default CardsPage;
