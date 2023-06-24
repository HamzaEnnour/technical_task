import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axiosInstance from "../utils/axios";
import { register } from "../api/userApi";
import RegisterCard from "../components/RegisterCard";

const Register: React.FC = () => {
  return <RegisterCard />;
};

export default Register;
