import { axiosClient } from "./api-service";

export const findUserInfo = async () => {
  const res = await axiosClient.get("/user/info");
  return res.data;
};

export const findAllProductsAfterPayment = async () => {
  const res = await axiosClient.get("/user/products-after-payment");
  return res.data;
};
