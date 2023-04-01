import React from "react";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Divider, Box, Typography } from "@mui/material";
import userType from "../../models/types/userType";

const UserCardBody = ({ registeredUser }) => {
  const { street, houseNumber, city } = registeredUser.address;
  const { first, middle, last } = registeredUser.name;
  return (
    <CardContent>
      <CardHeader
        title={`${first} ${middle} ${last}`}
        subheader={"sdsd"}
        sx={{ p: 0, mb: 1 }}
      />
      <Divider />
      <Box mt={1}>
        <Typography variant="body2" color="text.secondary">
          <Typography fontWeight={700} component="span">
            phone:{" "}
          </Typography>
          {registeredUser.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Typography fontWeight={700} component="span">
            address:{" "}
          </Typography>
          {street} {houseNumber} {city}
        </Typography>
      </Box>
    </CardContent>
  );
};

UserCardBody.propTypes = {
  registeredUser: userType.isRequired,
};

export default UserCardBody;
