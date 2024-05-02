import { axiosClient } from "./api-service";
export const createPayment = async (price) => {
  const res = await axiosClient.get(
    `http://localhost:8080/user/createPay?price=${price}`
  );
  return res.data;
};
