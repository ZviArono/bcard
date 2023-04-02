import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ROUTES from "../../../../routes/routesModel";
import { useUser } from "../../../../users/providers/UserProvider";
import useUsers from "../../../../users/hooks/useUsers";
import MenuLink from "./MenuLink";

const Menu = ({ isOpen, anchorEl, onClose }) => {
  const { user } = useUser();
  const { handleLogout } = useUsers();

  const onLogout = () => {
    handleLogout();
    onClose();
  };

  return (
    <MuiMenu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box>
        <MenuLink
          label="about"
          navigateTo={ROUTES.ABOUT}
          onClick={onClose}
          styles={{ display: { xs: "block", md: "none" } }}
        />

        {!user && (
          <>
            <MenuLink
              label="login"
              navigateTo={ROUTES.LOGIN}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />
            <MenuLink
              label="signup"
              navigateTo={ROUTES.SIGNUP}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />
          </>
        )}
        {user && (
          <MenuLink
            label="Fav Cards"
            navigateTo={ROUTES.FAV_CARDS}
            onClick={onClose}
            styles={{ display: { xs: "block", md: "none" } }}
          />
        )}

        {user && user.isBusiness && (
          <MenuLink
            label="My Cards"
            navigateTo={ROUTES.MY_CARDS}
            onClick={onClose}
            styles={{ display: { xs: "block", md: "none" } }}
          />
        )}

        {user && user.isAdmin && (
          <MenuLink
            label="sandbox"
            navigateTo={ROUTES.SANDBOX}
            onClick={onClose}
            styles={{ display: { xs: "block", md: "none" } }}
          />
        )}
        {user && user.isAdmin && (
          <MenuLink
            label="crm"
            navigateTo={ROUTES.CRM}
            onClick={onClose}
            styles={{ display: { xs: "block", md: "none" } }}
          />
        )}

        {user && (
          <>
            <MenuLink
              label="profile"
              navigateTo={`${ROUTES.USER_PROFILE}/${user._id}`}
              onClick={onClose}
            />
            <MenuLink
              label="edit account"
              navigateTo={`${ROUTES.EDIT_USER}/${user._id}`}
              onClick={onClose}
            />

            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </>
        )}
      </Box>
    </MuiMenu>
  );
};

export default Menu;
