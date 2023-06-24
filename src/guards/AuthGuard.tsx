import PropTypes from "prop-types";
import { useState, ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import { AppContext } from "../contexts/AppContext";

// ----------------------------------------------------------------------

const AuthGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state } = useContext(AppContext);
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<String | null>(
    null
  );

  console.log(requestedLocation);

  if (!state.currentUser) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={""} />;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
