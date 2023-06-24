import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../contexts/AppContext";
import { useTranslation } from "react-i18next";
import classes from "./FormCard.module.scss";
import { BiUser } from "react-icons/bi";
import { AiOutlineMail, AiOutlineDelete } from "react-icons/ai";
import { useMutation } from "react-query";
import { deleteUser, register, updateUser } from "../api/userApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import i18n from "../locales/i18n";
const EditProfileCard: React.FC<any> = ({ user, onUpdate, profile }) => {
  const { t } = useTranslation();
  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  const editMutation = useMutation(
    (_user: { name: string; email: string; password: string }) =>
      updateUser(user.id, _user),
    {
      onSuccess: () => {
        if (!profile) onUpdate();
      },
    }
  );

  const handleUpdate = (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    editMutation.mutate({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (!profile)
      formik.setValues({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
  };

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
      confirmPassword: user?.confirmPassword || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("VALIDATION.NAMEREQ")),
      email: Yup.string()
        .email(t("VALIDATION.EMAIL"))
        .required(t("VALIDATION.EMAILREQ")),
      password: Yup.string().required(t("VALIDATION.PASSWORDREQ")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], t("VALIDATION.CONFIRMPASSWORD"))
        .required(t("VALIDATION.CONFIRMPASSWORDREQ")),
    }),
    onSubmit: handleUpdate,
  });

  return (
    <div className={classes["register-card"]}>
      <h1>Edit Profile Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes["input-group"]}>
          <label htmlFor="name">{t("RULES.NAME")}:</label>
          <input type="text" id="name" {...formik.getFieldProps("name")} />
          {formik.touched.name && formik.errors.name && (
            <div className={classes["error-text"]}>{formik.errors.name}</div>
          )}
        </div>
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
        <div className={classes["input-group"]}>
          <label htmlFor="confirmPassword">{t("RULES.CONFIRMPASSWORD")}:</label>
          <input
            type="password"
            id="confirmPassword"
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
            disabled={editMutation.isLoading}
            type="submit"
          >
            {editMutation.isLoading
              ? t("RULES.UPDATINGBTN")
              : t("RULES.UPDATEBTN")}
          </button>
          <button
            className={classes.btnReset}
            type="reset"
            onClick={() =>
              !profile
                ? formik.setValues({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  })
                : formik.resetForm
            }
          >
            {t("RULES.RESETBTN")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileCard;
