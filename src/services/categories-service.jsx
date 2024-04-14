import axios from "axios"

export const getCategories = async () => {
    const res = await axios.get(`http://localhost:8080/cate`);
    return res.data;
}