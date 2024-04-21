import { axiosClient } from './api-service';


export const getAllOrderOfUser = async () =>{
    const res = await axiosClient.get(`http://localhost:8080/user/cart`)
    return res.data;
}