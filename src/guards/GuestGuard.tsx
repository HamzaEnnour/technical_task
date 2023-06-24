import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import React, { ReactNode, useContext } from "react";
import { AppContext } from "../contexts/AppContext";

// routes

// ----------------------------------------------------------------------

const GuestGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state } = useContext(AppContext);

  if (state.currentUser) {
    return <Navigate to={"/"} />;
  }

  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;
