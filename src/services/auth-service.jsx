import { axiosClient } from "./api-service";

export const handleLogin = async (user) => {
  const res = await axiosClient.post("/login", user);
  return res.data;
};

export const handleLogout = async () => {
  const res = await axiosClient.post("/logout");
  return res.data;
};
