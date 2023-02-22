import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";

import NavItem from "../routes/components/NavItem";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

import DrawerListItem from "./DrawerListItem";

const Sandbox = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <AppBar position="sticky" color="transparent">
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ display: { xs: "inline-flex", md: "none" } }}>
          <MenuIcon />
        </IconButton>

        <Drawer anchor="top" open={isOpen} onClose={() => setOpen(false)}>
          <List>
            <DrawerListItem
              label="components"
              navigateTo="sandbox-components"
              onClose={() => setOpen(false)}
            />
            <DrawerListItem
              label="lifecycle hooks"
              navigateTo="lifecycle"
              onClose={() => setOpen(false)}
            />
            <DrawerListItem
              label="custom hooks"
              navigateTo="custom-hooks"
              onClose={() => setOpen(false)}
            />
            <DrawerListItem
              label="memoization"
              navigateTo="memoization"
              onClose={() => setOpen(false)}
            />
            <DrawerListItem
              label="context"
              navigateTo="context"
              onClose={() => setOpen(false)}
            />
            <DrawerListItem
              label="forms"
              navigateTo="forms"
              onClose={() => setOpen(false)}
              divider={false}
            />
          </List>
        </Drawer>

        <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
          <NavItem label="components" to="sandbox-components" color="black" />
          <NavItem label="lifecycle hooks" to="lifecycle" color="black" />
          <NavItem label="custom hooks" to="custom-hooks" color="black" />
          <NavItem label="memoization" to="memoization" color="black" />
          <NavItem label="context" to="context" color="black" />
          <NavItem label="forms" to="forms" color="black" />
        </Box>
      </AppBar>

      <Outlet />
    </>

    // <div>
    //   {/* <Styles /> */}
    //   {/* <Styles sx={{ color: "gray", backgroundColor: "black" }} /> */}
    //   {/* <SxProp />/ */}
    //   {/* <PropsExe /> */}
    //   {/* <FatherPropsWithObj /> */}
    //   {/* <Loops /> */}
    //   {/* <OnClick /> */}
    //   {/* <RasingEventFather />/ */}
    //   {/* <UseState /> */}
    //   {/* <UseStateWithObject /> */}
    // </div>
  );
};

export default Sandbox;
