import { axiosClient } from "./api-service";

export const getNewProduct = async () => {
  const res = await axiosClient.get(`http://localhost:8080/public`);
  return res.data;
};

export const getAllProduct = async (p) => {
  try {
    const res = await axiosClient.post(
      `http://localhost:8080/public/collections`,
      p
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const findProductById = async (id) => {
  const res = await axiosClient.get(
    `http://localhost:8080/public/product/${id}`
  );
  return res.data;
};

export const findProductByCateId = async (id) => {
  const res = await axiosClient.get(
    `http://localhost:8080/public/product/category/${id}`
  );
  return res.data;
};

export const addProductToCart = async (p) => {
  const res = await axiosClient.post(`http://localhost:8080/user`, p);
  return res.data;
};

export const getCartDetail = async (p) => {
  const res = await axiosClient.post(
    `http://localhost:8080/public/cart-detail`,
    p
  );
  return res.data;
};

export const getAllProductsThatCanBeDishesForId = async (id) => {
  const res = await axiosClient.get(
    `http://localhost:8080/public/product-dish/${id}`
  );
  return res.data;
};

export const removeProductOnCart = async (id) => {
  const res = await axiosClient.post(`http://localhost:8080/user/remove/${id}`);
  return res.data;
};

export const findAllTopSelling = async () => {
  const res = await axiosClient.get(`http://localhost:8080/public/selling`);
  return res.data;
};

export const getOrderHistoryUser = async () => {
  const res = await axiosClient.get(`http://localhost:8080/user/history`);
  return res.data;
};
