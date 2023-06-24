import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import axiosInstance from "../utils/axios";
import { login } from "../api/userApi";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";

const Login: React.FC = () => {
  return <LoginCard />;
};

export default Login;
