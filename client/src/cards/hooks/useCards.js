import { useState } from "react";
import { getCards } from "./../services/cardApiService";
import useAxios from "../../hooks/useAxios";

const useCards = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState();
  const [card, setCard] = useState();

  useAxios();

  const requestStatus = (loading, errorMessage, cards, card = null) => {
    setLoading(loading);
    setError(errorMessage);
    setCards(cards);
    setCard(card);
  };

  const handleGetCards = async () => {
    try {
      setLoading(true);
      const cards = await getCards();
      requestStatus(false, null, cards);
    } catch (error) {
      requestStatus(false, error, null);
    }
  };

  return { card, cards, isLoading, error, handleGetCards };
};

export default useCards;
