import { axiosClient } from './api-service';

export const getCategories = async () => {
    const res = await axiosClient.get(`http://localhost:8080/public/cate`);
    return res.data;
}

export const getCateById = async (id) => {
    const res = await axiosClient.get(`http://localhost:8080/public/cate/${id}`);
    return res.data;
}