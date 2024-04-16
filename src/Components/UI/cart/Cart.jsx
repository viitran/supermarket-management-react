import { useEffect, useState } from "react";
import { getAllOrderOfUser } from "../../../services/cart-service";
import { addProductToCart } from "../../../services/product-service";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const [orders, setOrders] = useState();
  const [order, setOrder] = useState();
  const navigate = useNavigate();

  const AddProductToCart = (quantity, product) => {
    const orderDto = {
      productId: product.id,
      quantity,
    };
    addProductToCart(orderDto).then(() => {
      getOrderOfUser();
    });
  };

  const handlerQuantityChange = (quantity, order) => {
    if (order.quantity <= 1 && quantity === -1) {
      console.log(order);
      setOrder(order);
    } else {
      AddProductToCart(quantity, order.product);
    }
  };

  const getOrderOfUser = async () => {
    getAllOrderOfUser().then((res) => {
      setOrders(res);
    });
  };

  useEffect(() => {
    getOrderOfUser();
  }, []);

  const handleNavigateProductList = () => {
    navigate("/collections");
  };

  const handleNavigatePaymentPage = () => {
    navigate("/checkout");
  }

  if (!orders) return <div>loading...</div>;

  return (
    <>
      <hr />
      <div className=" container">
        <div className="col-12 row">
          <div className="col-9">
            <div className="col-12">
              <h1>Giỏ hàng của bạn</h1>
            </div>
            <div className="col-12 row">
              <div className="col-3"></div>
              <div className="col-9  row mt-2 text-center">
                <div className="col-5 ms-5">Tên sản phẩm</div>
                <div className="col-2">Giá</div>
                <div className="col-2">Số lượng</div>
                <div className="col ms-4">Thành tiền</div>
              </div>
            </div>
            <hr />
            {orders.map((o, index) => (
              <div
                className="col-12 row mt-2 text-center "
                key={index}
                style={{ borderBottom: "solid 1px" }}
              >
                <div className="col-3">
                  <img
                    src={`data:image/jpeg;base64,${o.product.image}`}
                    alt=""
                    style={{ height: "200px", width: "200px" }}
                  />
                </div>
                <div className="col-9 row p-5">
                  <div className="col-6">
                    {/* <Link to={() => handleNavigateDetailProduct(o.productId)}> */}
                    <h4>{o.product.name}</h4>
                    {/* </Link> */}
                  </div>
                  <div className="col-2">
                    <b>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(o.product.price)}
                    </b>
                  </div>
                  <div className="col-3">
                    <div>
                      <button
                        style={{
                          backgroundColor: "white",
                          border: "1px solid #ccc",
                          padding: "5px 10px",
                          cursor: "pointer",
                          marginRight: "5px",
                          borderRadius: "5px",
                        }}
                        onClick={() => handlerQuantityChange(-1, o)}
                      >
                        -
                      </button>
                      <span style={{ margin: "0 10px" }}>{o.quantity}</span>
                      <button
                        style={{
                          backgroundColor: "white",
                          border: "1px solid #ccc",
                          padding: "5px 10px",
                          cursor:
                            o.product.quantity === o.quantity
                              ? "not-allowed"
                              : "pointer",
                          borderRadius: "5px",
                        }}
                        onClick={() => handlerQuantityChange(1, o)}
                        disabled={o.product.quantity === o.quantity}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-1">
                    <b>
                      {" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(o.product.price * o.quantity)}
                    </b>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-3">
            <div className="col-12">Thông tin đơn hàng</div>
            <hr />
            <div className="col-12">
              Tên người nhận: 
            </div>
            <hr/>
            <div className="col-12 row">
              <div className="col-7">Tổng tiền: </div>
              <div
                className="col-5"
                style={{ color: "red", fontWeight: "bold" }}
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  orders.reduce(
                    (total, order) =>
                      total + order.product.price * order.quantity,
                    0
                  )
                )}
              </div>
            </div>
            <hr />
            <div className="col-12">
              <li>
                Phí vận chuyển sẽ được Nhân viên cửa hàng liên hệ báo lại cụ thể
                theo địa chỉ của Khách hàng và chính sách giao hàng của
                UNLIMITED
              </li>
            </div>
            <div className="row text-center mt-3">
              <button className="btn btn-primary"
              onClick={handleNavigatePaymentPage}>Thanh toán</button>
              <button
                className="btn btn-primary mt-2"
                onClick={handleNavigateProductList}
              >
                Tiếp tục mua sắm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cart;
