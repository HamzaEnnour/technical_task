import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../contexts/AppContext";
import { useTranslation } from "react-i18next";
import classes from "./FormCard.module.scss";
import { BiUser } from "react-icons/bi";
import { AiOutlineMail, AiOutlineDelete } from "react-icons/ai";
import { useMutation } from "react-query";
import { deleteUser, login } from "../api/userApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import i18n from "../locales/i18n";
const LoginCard: React.FC<any> = () => {
  const { dispatch } = useContext(AppContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  const loginMutation = useMutation(
    (credentials: { email: string; password: string }) =>
      login(credentials.email, credentials.password).then((result) => {
        if (result) {
          dispatch({ type: "SET_CURRENT_USER", payload: result });
          window.localStorage.setItem("accessToken", result.id);
          navigate("/");
        } else setErrorMessage(t("VALIDATION.CREDENTIALS"));
      })
  );

  const handleLogin = (values: { email: string; password: string }) => {
    loginMutation.mutate({ email: values.email, password: values.password });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("VALIDATION.EMAIL"))
        .required(t("VALIDATION.EMAILREQ")),
      password: Yup.string().required(t("VALIDATION.PASSWORDREQ")),
    }),
    onSubmit: handleLogin,
  });

  return (
    <div className={classes["register-card"]}>
      <h1>Login Form</h1>
      <form onSubmit={formik.handleSubmit}>
        {errorMessage && (
          <div className={classes["error-text"]}>{errorMessage}</div>
        )}
        <div className={classes["input-group"]}>
          <label htmlFor="email">{t("RULES.EMAIL")}:</label>
          <input type="email" id="email" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email && (
            <div className={classes["error-text"]}>{formik.errors.email}</div>
          )}
        </div>
        <div className={classes["input-group"]}>
          <label htmlFor="password">{t("RULES.PASSWORD")}:</label>
          <input
            type="password"
            id="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <div className={classes["error-text"]}>
              {formik.errors.password}
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            className={classes.btn}
            disabled={loginMutation.isLoading}
            type="submit"
          >
            {loginMutation.isLoading
              ? t("RULES.LOGGINGBTN")
              : t("RULES.LOGINBTN")}
          </button>
          <button
            className={classes.btnReset}
            type="reset"
            onClick={() => {
              formik.resetForm();
              setErrorMessage("");
            }}
          >
            {t("RULES.RESETBTN")}
          </button>
        </div>
        <div className={classes["sign-in-link"]}>
          Don't have an account? <a href="/register">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default LoginCard;
