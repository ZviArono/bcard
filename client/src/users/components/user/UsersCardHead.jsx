import React from "react";
import CardMedia from "@mui/material/CardMedia";
import imageType from "../../models/types/imageType";

const UsersCardHead = ({ image }) => {
  return (
    <CardMedia component="img" image={image.url} height="194" alt={image.alt} />
  );
};

UsersCardHead.propTypes = {
  image: imageType.isRequired,
};

export default UsersCardHead;
