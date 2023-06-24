import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.scss";
import { AppContext } from "../contexts/AppContext";
import { useTranslation } from "react-i18next";
import i18n from "../locales/i18n";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar: React.FC = () => {
  const { state, dispatch } = useContext<any>(AppContext);
  const { t } = useTranslation();
  const [size, setSize] = useState<any>({
    width: undefined,
    height: undefined,
  });

  document.dir = state.language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleMenu = () => {
    dispatch({ type: "TOGGLE_NAV_MENU" });
  };

  const handleToggleLanguage = () => {
    const newLanguage = state.language === "en" ? "ar" : "en";

    i18n.changeLanguage(newLanguage);
    dispatch({ type: "SET_LANGUAGE", payload: newLanguage });
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.header__content}>
          <Link to="/" className={classes.header__content__logo}>
            Users App
          </Link>
          <nav
            className={`${classes.header__content__nav} ${
              state.isNavMenuOpen && size.width < 768 ? classes.isMenu : ""
            }`}
          >
            <ul>
              <li>
                <Link to="/">{t("NAVBAR.HOME")}</Link>
              </li>
              {state.currentUser ? (
                <>
                  <li>
                    <Link to="/profile">{t("NAVBAR.PROFILE")}</Link>
                  </li>
                  <li>
                    <a onClick={handleLogout} style={{ cursor: "pointer" }}>
                      {t("NAVBAR.LOGOUT")}
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/register">{t("NAVBAR.REGISTER")}</Link>
                  </li>
                  <li>
                    <Link to="/login">{t("NAVBAR.LOGIN")}</Link>
                  </li>
                </>
              )}
            </ul>
            <button onClick={handleToggleLanguage}>
              {state.language === "en" ? "En" : "Ar"}
            </button>
          </nav>
          <div className={classes.header__content__toggle}>
            {!state.isNavMenuOpen ? (
              <BiMenuAltRight onClick={handleToggleMenu} />
            ) : (
              <AiOutlineClose onClick={handleToggleMenu} />
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
