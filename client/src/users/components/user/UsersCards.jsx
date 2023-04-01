import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { arrayOf, func } from "prop-types";
import userType from "../../models/types/userType";
import UserCard from "./UserCard";

const UsersCards = ({ users, onDelete }) => {
  if (!users.length)
    return (
      <Typography m={2}>
        Oops... it seems there are no business users to display
      </Typography>
    );

  return (
    <Grid container spacing={2} pb={2}>
      {users.map((registeredUser) => (
        <Grid item key={registeredUser._id} xs={12} sm={6} md={4} lg={3}>
          <UserCard registeredUser={registeredUser} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};

UsersCards.propTypes = {
  users: arrayOf(userType).isRequired,
  onDelete: func.isRequired,
};

export default UsersCards;
