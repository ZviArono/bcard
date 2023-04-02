import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ROUTES from "../../routes/routesModel";
import useUsers from "../hooks/useUsers";
import { useUser } from "../providers/UserProvider";
import Card from "@mui/material/Card";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CheckIcon from "@mui/icons-material/Check";

import {
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Fab,
  Typography,
} from "@mui/material";

const ProfilePage = () => {
  const { user } = useUser();
  const { users, handleGetUser } = useUsers();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetUser(id);
  }, [handleGetUser, id]);

  if (!user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container>
      <PageHeader
        title="Your Profile Page"
        subtitle="On this page you can see your profile"
      />
      {users && (
        <Card sx={{ display: "flex", flexDirection: "row" }}>
          <CardMedia
            component="img"
            sx={{ width: 300, height: 300 }}
            image={users.image.url}
            alt={users.image.alt}
          />

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardHeader
              title={`${users.name.first.toUpperCase()} ${users.name.middle.toUpperCase()} ${users.name.last.toUpperCase()}`}
              action={users.isAdmin && <AdminPanelSettingsIcon />}
              sx={{ p: 2, mb: 1 }}
            />

            <CardContent sx={{ flex: "1 0 auto" }}>
              <Divider />
              <Box mt={1}>
                <Typography variant="body2" color="text.secondary">
                  <Typography fontWeight={700} component="span">
                    phone:{" "}
                  </Typography>
                  {users.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Typography fontWeight={700} component="span">
                    address:{" "}
                  </Typography>
                  {users.address.street} {users.address.houseNumber}{" "}
                  {users.address.city}
                </Typography>
                <Typography>
                  <Typography fontWeight={700} component="span">
                    email:{" "}
                  </Typography>
                  {users.email}
                </Typography>
                <Typography>
                  <Typography fontWeight={700} component="span">
                    business account: {users.isBusiness && <CheckIcon />}
                  </Typography>
                </Typography>
              </Box>
            </CardContent>
          </Box>
        </Card>
      )}
      <Fab
        onClick={() => navigate(-1)}
        color="primary"
        aria-label="back"
        sx={{
          position: "absolute",
          bottom: 75,
          right: 16,
        }}
      >
        <SettingsBackupRestoreIcon />
      </Fab>
    </Container>
  );
};

export default ProfilePage;
