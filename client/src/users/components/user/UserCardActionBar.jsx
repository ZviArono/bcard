import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { func, string } from "prop-types";
import { useUser } from "../../providers/UserProvider";
import UserCardDeleteDialog from "./UserCardDeleteDialog";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";

const UserCardActionBar = ({ onDelete, registeredUserId }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isDialogOpen, setDialog] = useState(false);

  const handleDialog = (term) => {
    if (term === "open") return setDialog(true);
    setDialog(false);
  };

  const handleDeleteUser = () => {
    handleDialog();
    onDelete(registeredUserId);
  };

  return (
    <CardActions disableSpacing sx={{ pt: 0, justifyContent: "space-between" }}>
      <Box>
        {user && user.isAdmin && (
          <IconButton
            aria-label="delete user"
            onClick={() => handleDialog("open")}
          >
            <DeleteIcon />
          </IconButton>
        )}
        {user && user.isAdmin && (
          <IconButton
            aria-label="edit user"
            onClick={() => navigate(`${ROUTES.EDIT_USER}/${registeredUserId}`)}
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>

      <UserCardDeleteDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={handleDialog}
        onDelete={handleDeleteUser}
      ></UserCardDeleteDialog>
    </CardActions>
  );
};

UserCardActionBar.propTypes = {
  registeredUserId: string.isRequired,
  onDelete: func.isRequired,
};
export default UserCardActionBar;
