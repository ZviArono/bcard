import React from "react";
import { arrayOf, string, bool, func } from "prop-types";
import Spinner from "../../../components/Spinner";
import Error from "../../../components/Error";
import Typography from "@mui/material/Typography";
import userType from "../../models/types/userType";
import UsersCards from "./UsersCards";

const UsersCardFeedback = ({ isLoading, error, users, onDelete }) => {
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (users && !users.length)
    return (
      <Typography variant="body1" color="initial">
        Oops, there are no business cards in the database that match the
        parameters you entered!
      </Typography>
    );
  if (users) return <UsersCards users={users} onDelete={onDelete} />;
  return null;
};

UsersCardFeedback.propTypes = {
  isLoading: bool.isRequired,
  error: string,
  users: arrayOf(userType),
  onDelete: func.isRequired,
};

export default UsersCardFeedback;
