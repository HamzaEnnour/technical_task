import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../contexts/AppContext";
import { useTranslation } from "react-i18next";
import classes from "./FormCard.module.scss";
import { BiUser } from "react-icons/bi";
import { AiOutlineMail, AiOutlineDelete } from "react-icons/ai";
import { useMutation } from "react-query";
import { deleteUser, emailExisting, register } from "../api/userApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import i18n from "../locales/i18n";
const RegisterCard: React.FC<any> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  const registerMutation = useMutation(
    (user: { name: string; email: string; password: string }) => register(user),
    {
      onSuccess: () => {
        navigate("/login");
      },
    }
  );

  const handleRegister = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      await registerMutation.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    } catch (error) {}
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("VALIDATION.NAMEREQ")),
      email: Yup.string()
        .email(t("VALIDATION.EMAIL"))
        .test(
          "email-exists",
          t("VALIDATION.EMAILEXIST"),
          async function (value: any) {
            return await emailExisting(value);
          }
        )
        .required(t("VALIDATION.EMAILREQ")),
      password: Yup.string().required(t("VALIDATION.PASSWORDREQ")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], t("VALIDATION.CONFIRMPASSWORD"))
        .required(t("VALIDATION.CONFIRMPASSWORDREQ")),
    }),
    onSubmit: handleRegister,
  });

  return (
    <div className={classes["register-card"]}>
      <h1>Registration Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes["input-group"]}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            data-testid="name-input"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <div className={classes["error-text"]}>{formik.errors.name}</div>
          )}
        </div>
        <div className={classes["input-group"]}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            data-testid="email-input"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div className={classes["error-text"]}>{formik.errors.email}</div>
          )}
        </div>
        <div className={classes["input-group"]}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            data-testid="password-input"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <div className={classes["error-text"]}>
              {formik.errors.password}
            </div>
          )}
        </div>
        <div className={classes["input-group"]}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            data-testid="confirm-password-input"
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className={classes["error-text"]}>
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            className={classes.btn}
            disabled={registerMutation.isLoading}
            data-testid="register-button"
            type="submit"
          >
            {registerMutation.isLoading ? "Registering..." : "Register"}
          </button>
          <button
            className={classes.btnReset}
            type="reset"
            onClick={() => formik.resetForm()}
          >
            Reset
          </button>
        </div>

        <div className={classes["sign-in-link"]}>
          Already registered? <a href="/login">Sign in</a>
        </div>
      </form>
    </div>
  );
};

export default RegisterCard;
