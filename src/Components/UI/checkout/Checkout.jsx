import { useEffect, useState } from "react";
import { getAllOrderOfUser } from "./../../../services/cart-service";
import { useNavigate, useParams } from "react-router-dom";
import { createPayment } from "../../../services/payment-service";
import Swal, { swal } from "sweetalert2/dist/sweetalert2.js";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/slide/user-slice";
function Checkout() {
  const [carts, setCarts] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const userInfo = useSelector(getUserInfo);

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
    <div className="col-12 row">
      <div className="col-8">
      <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="h5">
                        Sản phẩm
                      </th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Đơn vị</th>
                      <th scope="col">Tạm tính</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((c) => (
                      <tr key={c.id}>
                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <img
                              src={`data:image/jpeg;base64,${c.product.image}`}
                              className="img-fluid rounded-3"
                              style={{ width: "120px" }}
                              alt="Book"
                            />
                            <div className="flex-column ms-4">
                              <p className="mb-2"></p>
                              <p className="mb-0">Daniel Kahneman</p>
                            </div>
                          </div>
                        </th>
                        <td className="align-middle">
                          <p class="mb-0" style={{ "font-weight": "500" }}>
                            {c.quantity}
                          </p>
                        </td>
                        <td className="align-middle">
                          <div className="d-flex flex-row">Gr</div>
                        </td>
                        <td className="align-middle">
                          <p class="mb-0" style={{ "font-weight": "500" }}>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(c.product.price * c.quantity)}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
      </div>
      <div className="col-4" style={{background: "white"}}>
        {/* thong tin ca nhan + thanh toan */}
        <div
                        class="d-flex justify-content-between mb-4"
                        style={{ "font-weight": "500" }}
                      >
                        <p className="mb-2">Total (tax included)</p>
                        <p className="mb-2">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(totalPrice)}
                        </p>
                      </div>

                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary btn-block btn-lg"
                        onClick={handlePayment}
                      >
                        <div className="d-flex justify-content-between">
                          <span>Thanh toán</span>
                          <span>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(totalPrice)}
                          </span>
                        </div>
                      </button>
      </div>
    </div>
      {/* <section className="h-100 h-custom">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="h5">
                        Sản phẩm
                      </th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Đơn vị</th>
                      <th scope="col">Tạm tính</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((c) => (
                      <tr key={c.id}>
                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <img
                              src={`data:image/jpeg;base64,${c.product.image}`}
                              className="img-fluid rounded-3"
                              style={{ width: "120px" }}
                              alt="Book"
                            />
                            <div className="flex-column ms-4">
                              <p className="mb-2"></p>
                              <p className="mb-0">Daniel Kahneman</p>
                            </div>
                          </div>
                        </th>
                        <td className="align-middle">
                          <p class="mb-0" style={{ "font-weight": "500" }}>
                            {c.quantity}
                          </p>
                        </td>
                        <td className="align-middle">
                          <div className="d-flex flex-row">Gr</div>
                        </td>
                        <td className="align-middle">
                          <p class="mb-0" style={{ "font-weight": "500" }}>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(c.product.price * c.quantity)}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                class="card shadow-2-strong mb-5 mb-lg-0"
                style={{ "border-radius": "16px" }}
              >
                <div className="card-body p-4">
                  <div className="row">
                   
                    <div className="col-lg-4 col-xl-3">
                      <div
                        class="d-flex justify-content-between"
                        style={{ "font-weight": "500" }}
                      >
                        <p className="mb-2">Subtotal</p>
                        <p className="mb-2">$23.49</p>
                      </div>

                    

                      <hr className="my-4" />

                      <div
                        class="d-flex justify-content-between mb-4"
                        style={{ "font-weight": "500" }}
                      >
                        <p className="mb-2">Total (tax included)</p>
                        <p className="mb-2">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(totalPrice)}
                        </p>
                      </div>

                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary btn-block btn-lg"
                        onClick={handlePayment}
                      >
                        <div className="d-flex justify-content-between">
                          <span>Thanh toán</span>
                          <span>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(totalPrice)}
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
export default Checkout;
