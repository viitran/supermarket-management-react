import { axiosClient } from "./api-service";

export const findUserInfo = async () => {
  const res = await axiosClient.get("/user/info");
  return res.data;
};
