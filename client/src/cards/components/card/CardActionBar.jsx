import React from "react";
import { Box, IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { func, string } from "prop-types";

const CardActionBar = ({ cardId, onDelete, onLike }) => {
  return (
    <CardActions disableSpacing sx={{ pt: 0, justifyContent: "space-between" }}>
      <Box>
        <IconButton
          aria-label="delete card"
          onClick={() => onDelete(`you deleted card no: ${cardId}`)}>
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="edit card"
          onClick={() => console.log(`you edit card no: ${cardId}`)}>
          <EditIcon />
        </IconButton>
      </Box>

      <Box>
        <IconButton aria-label="call business">
          <CallIcon />
        </IconButton>
        <IconButton
          aria-label="add to fav"
          onClick={() => onLike(`you liked card no: ${cardId}`)}>
          <FavoriteIcon />
        </IconButton>
      </Box>
    </CardActions>
  );
};

CardActionBar.propTypes = {
  cardId: string.isRequired,
  onDelete: func.isRequired,
  onLike: func.isRequired,
};
export default CardActionBar;
