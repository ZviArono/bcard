import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import PageHeader from "./../../components/PageHeader";
import useCards from "../hooks/useCards";
import CallIcon from "@mui/icons-material/Call";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import EmailIcon from "@mui/icons-material/Email";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Fab,
  IconButton,
  Typography,
} from "@mui/material";

const CardDetailsPage = () => {
  const { cardId } = useParams();
  const { handleGetCard } = useCards();
  const [cardDetails, setCardDetails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCard(cardId).then((data) => {
      setCardDetails(data);
    });
  }, []);

  return (
    <Container>
      <PageHeader
        title="Business Details Page"
        subtitle="Here you can see details of the business"
      />
      {cardDetails && (
        <Card sx={{ display: "flex", flexDirection: "row" }}>
          <CardMedia
            component="img"
            sx={{ width: 400 }}
            image={cardDetails.image.url}
            alt={cardDetails.image.alt}
          />

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardHeader
              title={cardDetails.title.toUpperCase()}
              subheader={cardDetails.subtitle}
            />

            <CardContent sx={{ flex: "1 0 auto" }}>
              <Divider />
              <Box mt={1}>
                <Typography variant="body2" color="text.secondary">
                  <Typography fontWeight={700} component="span">
                    description:{" "}
                  </Typography>
                  {cardDetails.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Typography fontWeight={700} component="span">
                    phone:{" "}
                  </Typography>
                  {cardDetails.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Typography fontWeight={700} component="span">
                    email:{" "}
                  </Typography>
                  {cardDetails.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Typography fontWeight={700} component="span">
                    web site:{" "}
                  </Typography>
                  {cardDetails.web}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Typography fontWeight={700} component="span">
                    address:{" "}
                  </Typography>
                  {cardDetails.address.street} {cardDetails.address.houseNumber}{" "}
                  {cardDetails.address.city}
                  {", "}
                  {cardDetails.address.state}
                  {cardDetails.address.country.toUpperCase()}
                  {", "}
                  {cardDetails.address.zip}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Typography fontWeight={700} component="span">
                    card number:{" "}
                  </Typography>
                  {cardDetails.bizNumber}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <IconButton aria-label="call business">
                <a href={`tel:${cardDetails.phone}`}>
                  <CallIcon />
                </a>
              </IconButton>
              <IconButton aria-label="email business">
                <a href={`mailto:${cardDetails.email}`}>
                  <EmailIcon />
                </a>
              </IconButton>
            </CardActions>
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

export default CardDetailsPage;
