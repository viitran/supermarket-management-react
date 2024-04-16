import  axios  from 'axios';


export const getAllOrderOfUser = async () =>{
    const res = await axios.get(`http://localhost:8080/cart`)
    return res.data;
}