import { useEffect, useState } from "react";
import { getAllOrderOfUser } from "../../../services/cart-service";
import { addProductToCart } from "../../../services/product-service";
import { Link, useNavigate } from "react-router-dom";

function CartApp() {
  const [orders, setOrders] = useState();
  const [order, setOrder] = useState();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [displayedProductCount, setDisplayedProductCount] = useState(3);

  const handleShowMoreProducts = () => {
    if (displayedProductCount === orders.length) {
      setDisplayedProductCount(3);
    } else {
      setDisplayedProductCount(orders.length);
    }
  };

  useEffect(()=>{
    document.title = "Đơn hàng của bạn"
  })

  useEffect(() => {
    if (orders) {
      const totalPrice = orders.reduce((total, order) => {
        return total + order.product.price * order.quantity;
      }, 0);
      setTotalPrice(totalPrice);
    }
  }, [orders]);

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
    navigate(`/checkout`);
  };

  if (!orders) return <div>loading...</div>;
  const displayedProducts = orders.slice(0, displayedProductCount);

  return (
    <>
      <hr />
      <div className=" container">
        <div className="col-12 row">
          <div className="col-9">
            <div className="col-12 row">
              {/* <div className="col-1"></div>
              <div className="col-11  row mt-2 text-center">
                <div className="col-5 ms-5">
                  <h4>Tên sản phẩm</h4>
                </div>
                <div className="col-1">
                  <h4>Giá</h4>
                </div>
                <div className="col-1">
                  <h4>Số lượng</h4>
                </div>
                <div className="col-3 ms-4">
                  <h4>Thành tiền</h4>
                </div>
              </div> */}
            </div>
            <hr />
            {displayedProducts.map((o, index) => (
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
            <div className="text-center mt-3">
              <button
                className="btn btn-primary"
                onClick={handleShowMoreProducts}
              >
                {displayedProductCount === orders.length
                  ? "Hiện ít hơn"
                  : "Hiển thị thêm"}
              </button>
            </div>
          </div>
          <div className="col-3">
            <div style={{ position: "sticky", top: "100px" }}>
              <div className="col-12">Thông tin đơn hàng</div>
              <hr />
              <div className="col-12 row">
                <div className="col-7">Tổng tiền: </div>
                <div
                  className="col-5"
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice)}
                </div>
              </div>
              <hr />
              <div className="col-12">
                <li>
                  Phí vận chuyển sẽ được Nhân viên cửa hàng liên hệ báo lại cụ
                  thể theo địa chỉ của Khách hàng và chính sách giao hàng của
                  UNLIMITED
                </li>
              </div>
              <div className="row text-center mt-3">
                <button
                  className="btn btn-primary"
                  onClick={handleNavigatePaymentPage}
                >
                 Tiền hành thanh toán
                </button>
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
      </div>
    </>
  );
}
export default CartApp;
