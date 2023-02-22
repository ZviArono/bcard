import React from "react";
import Box from "@mui/material/Box";
import Logo from "../Logo/Logo";
import LogoIcon from "../Logo/LogoIcon";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavItem from "../../../../routes/components/NavItem";
import ROUTES from "../../../../routes/routesModel";

const LeftNavBar = () => {
  return (
    <Box>
      <LogoIcon />
      <Logo />

      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
        <NavItem label="about" to={ROUTES.ABOUT} />

        <Button color="inherit">
          <Typography>My Cards</Typography>
        </Button>

        <Button color="inherit">
          <Typography>Fav Cards</Typography>
        </Button>

        <NavItem label="sandbox" to={ROUTES.SANDBOX} />
      </Box>
    </Box>
  );
};

export default LeftNavBar;
