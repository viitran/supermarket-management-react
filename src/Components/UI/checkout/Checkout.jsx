import { useEffect, useState } from "react";
import { getAllOrderOfUser } from "./../../../services/cart-service";
import { useNavigate, useParams } from "react-router-dom";
import { createPayment } from "../../../services/payment-service";
import Swal, { swal } from "sweetalert2/dist/sweetalert2.js";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/slide/user-slice";
const initPaymentValue = {
  paymentStatusId: 2,
  messageToSeller: "",
};
function Checkout() {
  const [carts, setCarts] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const userInfo = useSelector(getUserInfo);
  const [paymentValue, setPaymentValue] = useState(initPaymentValue);

  const getProductOrder = () => {
    getAllOrderOfUser().then((res) => {
      setCarts(res);
      console.log(res);
    });
  };

  useEffect(() => {
    getProductOrder();
  }, []);

  useEffect(() => {
    if (carts) {
      const totalPrice = carts.reduce((total, order) => {
        return total + order.product.price * order.quantity;
      }, 0);
      setTotalPrice(totalPrice);
    }
  }, [carts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentValue({ ...paymentValue, [name]: value });
  };

  const handlePayment = () => {
    console.log(userInfo);
    console.log("test");
    createPayment(totalPrice, userInfo.id)
      .then((res) => {
        window.location.href = res;
      })
      .catch((error) => {
        if (error.response.data === "error") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Thanh toán thất bại!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (error.response.data === "success") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Thanh toán thành công!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  if (!carts) return <div>loading...</div>;

  return (
    <>
      <div className=" p-5 shadow-0 col-12 row">
        <div className="col-8 row border mb-5">
          <div className="col-12">
            <h3>Thông tin đơn hàng</h3>
          </div>
          <div className="col-12 row">
            <div className="col-6 mt-2">
              <div className="form-control" style={{ border: "none" }}>
                <small>Họ và tên</small>
                <input
                  type="text"
                  style={{ fontWeight: "bold" }}
                  placeholder="Nguyen Van A"
                  className="form-control"
                  defaultValue={userInfo.fullName}
                />
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="form-control" style={{ border: "none" }}>
                <small>Số điện thoại</small>
                <input
                  type="text"
                  style={{ fontWeight: "bold" }}
                  placeholder="09xxxxxxxx"
                  className="form-control"
                  defaultValue={userInfo.phoneNumber}
                />
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="form-control" style={{ border: "none" }}>
                <small>Địa chỉ nhận hàng</small>
                <textarea
                  style={{
                    fontWeight: "bold",
                    overflow: "hidden",
                    resize: "none",
                  }}
                  placeholder="XX Đường ABC, Quận BCZ, Thành phố X"
                  className="form-control"
                  defaultValue={userInfo.address}
                />
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="form-control" style={{ border: "none" }}>
                <small>Email</small>
                <input
                  type="email"
                  style={{ fontWeight: "bold" }}
                  placeholder="abc@gmail.com"
                  className="form-control"
                  defaultValue={userInfo.email}
                />
              </div>
            </div>
            <hr className="mt-3" />
            <div className="col-12">
              <h4>Ghi chú cho đơn hàng</h4>
              <div className="mt-3">
                <div className="form p-2">
                  <small>
                    Hãy để lại lời nhắn cho nhân viên giao hàng và cửa hàng(nếu
                    có):
                  </small>
                  <textarea
                    className="form-control"
                    id="textAreaExample1"
                    style={{ overflow: "hidden", resize: "none" }}
                    name="messageToSeller"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="col-8"></div>
            <div className="button-group col-4 p-3">
              <button
                className="btn btn-light border me-2"
                onClick={() => navigate("/cart")}
              >
                Hủy
              </button>
              <button
                className="btn btn-success shadow-0 border"
                onClick={handlePayment}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
        <div
          className="col-4 "
          style={{ overflowY: "auto", maxHeight: "470px" }}
        >
          <div className="ms-lg-4 mt-4 mt-lg-0" style={{ maxWidth: "320px" }}>
            <h6 className="mb-3">Tổng</h6>
            <div className="d-flex justify-content-between">
              <p className="mb-2">Tổng các sản phẩm</p>
              <p className="mb-2">
                {totalPrice.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="mb-2">Phí vận chuyển</p>
              <p className="mb-2">+ 30.000 VND</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <p className="mb-2">Tổng tiền</p>
              <p className="mb-2 fw-bold" style={{ color: "red" }}>
                {(totalPrice + 30000).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>

            <hr />
            <h6 className="text-dark my-4">Sản phẩm đã chọn</h6>

            {carts.map((cart) => (
              <div className="d-flex align-items-center mb-4" key={cart.id}>
                <div className="me-3 position-relative">
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                    {cart.quantity}
                  </span>
                  <img
                    src={`data:image/jpeg;base64,${cart.product.image}`}
                    style={{ width: "96px", height: "96px" }}
                    className="img-sm rounded border"
                  />
                </div>
                <div className="">
                  <a href="#" className="nav-link">
                    {cart.product.name} <br />
                    <small className="text-muted text-nowrap">
                      {cart.product.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </small>
                  </a>
                  <div className="price text-muted">
                    Tổng tiền:{" "}
                    {(cart.product.price * cart.quantity).toLocaleString(
                      "it-IT",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Checkout;
