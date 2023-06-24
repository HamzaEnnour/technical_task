import React from "react";
import classes from "./Page404.module.scss";
import { Link } from "react-router-dom";
import NotFoundSVG from "../styles/svg/404.svg";

const Page404: React.FC = () => {
  return (
    <div className={classes.container}>
      <img src={NotFoundSVG} alt="Page Not Found" className={classes.svg} />
      <h1 className={classes.heading}>Page Not Found</h1>
      <p className={classes.text}>
        The page you are looking for does not exist.
      </p>
      <Link to="/" className={classes.button}>
        Go to Homepage
      </Link>
    </div>
  );
};
export default Page404;
