import axios from "axios"

export const getCategories = async () => {
    const res = await axios.get(`http://localhost:8080/cate`);
    return res.data;
}

export const getCateById = async (id) => {
    const res = await axios.get(`http://localhost:8080/cate/${id}`);
    return res.data;
}