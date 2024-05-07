import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../redux/slide/user-slice";
import { useEffect, useState } from "react";
import { axiosClient } from "../../../services/api-service";
import { toast } from "react-toastify";
import { getAllOrderOfUser } from "../../../services/cart-service";
import { cartActions } from "../../../redux/slide/cart-slice";

export default function CheckoutSuccessfully() {
  const navigate = useNavigate();
  console.log("a");
  const userInfo = useSelector(getUserInfo);
  console.log(userInfo);
  const dispatch = useDispatch();
  const [resultPayment, setResultPayment] = useState("");

  useEffect(() => {
    console.log(userInfo.id);
    if (userInfo.username) {
      getAllOrderOfUser().then((res) => {
        const size = res.reduce((c, cart) => {
          return c + cart.quantity;
        }, 0);
        dispatch(cartActions.setCartSize(size));
      });
    }
  }, [userInfo.username]);
  useEffect(() => {
    const setPaymentOk = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const status = searchParams.get(`vnp_TransactionStatus`);
      console.log(status);
      const res = await axiosClient.get(
        `http://localhost:8080/user/payment_info/${userInfo.id}`,
        { params: { status: status } }
      );
      console.log(res.data);
      
      if (res.data === "success") {
        navigate(`/info`);
        toast("Thanh toán thành công");
      } else {
        if (res.data === "error") {
          navigate(`/cart`);
          toast("Thanh toán đã bị gián đoạn hoặc thất bại!Vui lòng thử lại");
        }
      }
    };
    setPaymentOk();
  }, []);
}
