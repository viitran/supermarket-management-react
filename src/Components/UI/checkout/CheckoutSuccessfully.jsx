import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../redux/slide/user-slice";
import { useEffect, useState } from "react";
import { axiosClient } from "../../../services/api-service";

export default function CheckoutSuccessfully() {
  const navigate = useNavigate();
  console.log("a");
  const userInfo = useSelector(getUserInfo);
  console.log(userInfo);
  const [resultPayment, setResultPayment] = useState("");
  useEffect(() => {
    const setPaymentOk = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const status = searchParams.get(`vnp_TransactionStatus`);
      console.log(status);
      const res = await axiosClient.get(
        `http://localhost:8080/user/payment_info/${userInfo.id}`,
        { params: { status: status } }
      );
      if (res.data === "success") {
        navigate(`/`);
      }
    
    };  
    setPaymentOk();
  }, []);
}
