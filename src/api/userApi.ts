import axiosInstance from "../utils/axios";

const API_USER_URL = "/users"; // Change the URL if needed

export const register = async (user: any) => {
  try {
    const response = await axiosInstance.post(`${API_USER_URL}`, user);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error);
  }
};
export const emailExisting = async (email: string) => {
  console.log(email);

  try {
    const validate = await axiosInstance.get(`${API_USER_URL}/?email=${email}`);
    return validate?.data?.length === 0;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.get(
      `${API_USER_URL}/?email=${email}&password=${password}`
    );
    return response.data[0];
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateUser = async (userId: number, updatedUser: any) => {
  try {
    const response = await axiosInstance.put(
      `${API_USER_URL}/${userId}`,
      updatedUser
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const deleteUser = async (userId: number) => {
  try {
    await axiosInstance.delete(`${API_USER_URL}/${userId}`);
    return true;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const getUserById = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`${API_USER_URL}/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(`${API_USER_URL}/`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};
