import React from "react";
import { func, string } from "prop-types";
import NavBarLink from "../../../../routes/components/NavBarLink";
import { MenuItem } from "@mui/material";
import { makeFirstLetterCapital } from "./utils/algoMethods";

const MenuLink = ({ label, navigateTo, onClick, styles }) => {
  return (
    <NavBarLink to={navigateTo} color="black">
      <MenuItem onClick={onClick} sx={{ ...styles }}>
        {makeFirstLetterCapital(label)}
      </MenuItem>
    </NavBarLink>
  );
};

MenuLink.propTypes = {
  navigateTo: string.isRequired,
  onClick: func.isRequired,
  label: string.isRequired,
};

MenuLink.defaultProps = {
  styles: {},
};

export default MenuLink;
