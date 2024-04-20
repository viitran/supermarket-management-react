import axios from "axios";

export const getNewProduct = async () => {
  const res = await axios.get(`http://localhost:8080`);
  return res.data;
};

export const getAllProduct = async (p) => {
  try {
    const res = await axios.post(`http://localhost:8080/collections`, p);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const findProductById = async (id) => {
  const res = await axios.get(`http://localhost:8080/product/${id}`);
  return res.data;
};

export const findProductByCateId = async (id) => {
  const res = await axios.get(`http://localhost:8080/product/category/${id}`);
  return res.data;
};

export const addProductToCart = async (p) => {
  const res = await axios.post(`http://localhost:8080`, p);
  return res.data;
};

export const getCartDetail = async (p) => {
  const res = await axios.post(`http://localhost:8080/cart-detail`, p);
  return res.data;
}
