import React from "react";
import "./styles.css";

const Styles = ({ sx = {} }) => {
  return (
    <>
      <h1 style={{ color: "blue", ...sx }}>five</h1>
    </>
  );
};

export default Styles;
