import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import axiosInstance from "../utils/axios";
import { login } from "../api/userApi";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import EditProfileCard from "../components/EditProfileCard";

const Profile: React.FC = () => {
  const { state } = useContext(AppContext);
  return <EditProfileCard user={state.currentUser} profile={true} />;
};

export default Profile;
