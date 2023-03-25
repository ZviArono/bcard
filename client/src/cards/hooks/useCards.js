import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getCards,
  getMyCards,
  changeLikeStatus,
  deleteCard,
  editCard,
  createCard,
  getCard,
} from "./../services/cardApiService";
import useAxios from "../../hooks/useAxios";
import { useUser } from "../../users/providers/UserProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnack } from "../../providers/SnackbarProvider";
import normalizeCard from "../helpers/normalization/normalizeCard";
import ROUTES from "../../routes/routesModel";

const useCards = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState();
  const [card, setCard] = useState();
  const { user } = useUser();
  const [query, setQuery] = useState("");
  const [filteredCards, setFilter] = useState(null);
  const [searchParams] = useSearchParams();
  const snack = useSnack();

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    if (cards) {
      setFilter(
        cards.filter(
          (card) =>
            card.title.includes(query) || String(card.bizNumber).includes(query)
        )
      );
    }
  }, [cards, query]);

  useAxios();

  const navigate = useNavigate();

  const requestStatus = (loading, errorMessage, cards, card = null) => {
    setLoading(loading);
    setError(errorMessage);
    setCards(cards);
    setCard(card);
  };

  const handleGetCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getCards();
      requestStatus(false, null, cards);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleGetCard = useCallback(async (cardId) => {
    try {
      setLoading(true);
      const card = await getCard(cardId);
      requestStatus(false, null, null, card);
      return card;
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleGetMyCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getMyCards();
      requestStatus(false, null, cards);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleGetFavCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getCards();
      const favCards = cards.filter(
        (card) => !!card.likes.find((_id) => _id === user._id)
      );
      requestStatus(false, null, favCards);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, [user]);

  const handleLikeCard = useCallback(
    async (cardId) => {
      try {
        const card = await changeLikeStatus(cardId);
        requestStatus(false, null, cards, card);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [cards]
  );

  const handleUpdateCard = useCallback(
    async (cardId, cardFromClient) => {
      try {
        setLoading(true);
        const card = await editCard(cardId, cardFromClient);
        requestStatus(false, null, null, card);
        snack("success", "The business card has been successfully updated");
        navigate(ROUTES.MY_CARDS);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [snack, navigate]
  );

  const handleDeleteCard = useCallback(
    async (cardId) => {
      try {
        setLoading(true);
        const card = await deleteCard(cardId);
        requestStatus(false, null, cards, card);
        snack("success", "The business card has been successfully deleted");
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [snack, cards]
  );

  const handleCreateCard = useCallback(
    async (cardFromClient) => {
      try {
        const normalizedCard = normalizeCard(cardFromClient);
        setLoading(true);
        const card = await createCard(normalizedCard);
        requestStatus(false, null, null, card);
        snack("success", "The business card has been successfully Created");

        navigate(ROUTES.MY_CARDS);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [snack, navigate]
  );

  const value = useMemo(() => {
    return { card, cards, isLoading, error, filteredCards };
  }, [card, cards, isLoading, error, filteredCards]);

  return {
    value,
    handleGetCards,
    handleGetMyCards,
    handleGetFavCards,
    handleLikeCard,
    handleDeleteCard,
    handleUpdateCard,
    handleCreateCard,
    handleGetCard,
  };
};

export default useCards;
