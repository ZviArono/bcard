import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { func, string, arrayOf } from "prop-types";
import { useUser } from "../../../users/providers/UserProvider";
import CardDeleteDialog from "./CardDeleteDialog";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import useCards from "../../hooks/useCards";

const CardActionBar = ({
  cardId,
  onDelete,
  userId,
  onLike,
  cardLikes,
  phone,
}) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { handleLikeCard } = useCards();
  const [isDialogOpen, setDialog] = useState(false);
  const [isLiked, setLike] = useState(
    () => !!cardLikes.find((id) => id === user._id)
  );

  const handleDialog = (term) => {
    if (term === "open") return setDialog(true);
    setDialog(false);
  };

  const handleDeleteCard = () => {
    handleDialog();
    onDelete(cardId);
  };

  const handleLike = async () => {
    setLike((prev) => !prev);
    await handleLikeCard(cardId);
    onLike();
  };

  return (
    <CardActions disableSpacing sx={{ pt: 0, justifyContent: "space-between" }}>
      <Box>
        {user && (user._id === userId || user.isAdmin) && (
          <IconButton
            aria-label="delete card"
            onClick={() => handleDialog("open")}
          >
            <DeleteIcon />
          </IconButton>
        )}
        {user && user._id === userId && (
          <IconButton
            aria-label="edit card"
            onClick={() => navigate(`${ROUTES.EDIT_CARD}/${cardId}`)}
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>

      <Box>
        <IconButton aria-label="call business">
          <a href={`tel:${phone}`}>
            <CallIcon />
          </a>
        </IconButton>
        <IconButton aria-label="add to fav" onClick={handleLike}>
          <FavoriteIcon color={isLiked ? "error" : "inherit"} />
        </IconButton>
      </Box>
      <CardDeleteDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={handleDialog}
        onDelete={handleDeleteCard}
      ></CardDeleteDialog>
    </CardActions>
  );
};

CardActionBar.propTypes = {
  cardId: string.isRequired,
  onDelete: func.isRequired,
  onLike: func.isRequired,
  userId: string.isRequired,
  cardLikes: arrayOf(string).isRequired,
  phone: string.isRequired,
};
export default CardActionBar;
