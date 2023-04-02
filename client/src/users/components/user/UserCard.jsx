import React from "react";
import { func } from "prop-types";
import MuiCard from "@mui/material/Card";
import userType from "../../models/types/userType";
import { useUser } from "../../providers/UserProvider";
import UserCardActionBar from "./UserCardActionBar";
import UserCardBody from "./UserCardBody";
import UsersCardHead from "./UsersCardHead";

const UserCard = ({ registeredUser, onDelete }) => {
  const { user } = useUser();

  return (
    <MuiCard sx={{ minWidth: 280 }}>
      <UsersCardHead image={registeredUser.image} />
      <UserCardBody registeredUser={registeredUser} />
      {user && (
        <UserCardActionBar
          registeredUser={registeredUser}
          onDelete={onDelete}
        />
      )}
    </MuiCard>
  );
};

UserCard.propTypes = {
  registeredUser: userType.isRequired,
  onDelete: func.isRequired,
};

export default UserCard;
