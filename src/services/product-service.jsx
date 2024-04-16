import axios from "axios";

export const getNewProduct = async () => {
  const res = await axios.get(`http://localhost:8080`);
  return res.data;
};

export const getAllProduct = async () => {
  const res = await axios.get(`http://localhost:8080/collections`);
  return res.data;
};

export const findProductById = async (id) => {
  const res = await axios.get(`http://localhost:8080/product/${id}`);
  return res.data;
}

export const findProductByCateId = async (id) =>{
  const res = await axios.get(`http://localhost:8080/product/category/${id}`);
  return res.data;
}

export const addProductToCart = async(p) => {
  const res = await axios.post(`http://localhost:8080`,p);
  return res.data;
}