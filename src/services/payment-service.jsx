import { axiosClient } from "./api-service";
export const createPayment = async (price,id) => {
  const res = await axiosClient.get(
    `http://localhost:8080/user/createPay?price=${price}&id=${id}`
  );
  return res.data;
};
