import { useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/slide/user-slice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrderOfUser } from "../../../services/cart-service";
import { addProductToCart } from "../../../services/product-service";

function CartTest() {
  const [orders, setOrders] = useState();
  const [order, setOrder] = useState();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [displayedProductCount, setDisplayedProductCount] = useState(3);

  const handleRemoveProduct = (obj) => {
    console.log(obj);
    
};

  const handleShowMoreProducts = () => {
    if (displayedProductCount === orders.length) {
      setDisplayedProductCount(3);
    } else {
      setDisplayedProductCount(orders.length);
    }
  };

  useEffect(() => {
    document.title = "Đơn hàng của bạn";
  });

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
      <div className="col-12 mt-3">
        {/* <h5 className="ms-3">Giỏ hàng()</h5> */}
      </div>
      <hr />
      <div className="col-12 row p-4">
        <div className="col-8">
          {displayedProducts.map((o) => (
            <div
              className="col-12 row mt-3"
              key={o.id}
              style={{ border: "solid 1px", borderRadius: "7px" }}
            >
              <div className="col-2 p-3">
                <img
                  src={`data:image/jpeg;base64,${o.product.image}`}
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <div className="col-10 p-2">
                <div className="col-12 row">
                  <div className="col-11">
                    <h4>{o.product.name}</h4>
                  </div>
                  <div className="col-1">
                    <button
                      className="btn btn-outline-danger d-flex justify-content-center align-items-center"
                      style={{ width: "10px", height: "30px" }}
                      onClick={() => handleRemoveProduct(o)}
                    >
                      <img
                        src="/img/HomePage/trash.png"
                        alt=""
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                  </div>
                </div>

                <div className="col-12">
                  <p>{o.product.description}</p>
                </div>

                <div className="col-12 row ">
                  <div className="col-10 d-flex">
                    <span>
                      <button
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          height: "20px",
                          width: "30px",
                          borderRadius: "60px",
                        }}
                        onClick={() => handlerQuantityChange(-1, o)}
                      >
                        -
                      </button>
                    </span>
                    <span className="ms-4 ">{o.quantity}</span>
                    <span className="ms-4">
                      <button
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          height: "20px",
                          width: "30px",
                          borderRadius: "60px",
                        }}
                        onClick={() => handlerQuantityChange(1, o)}
                        disabled={o.product.quantity === o.quantity}
                      >
                        <span>+</span>
                      </button>
                    </span>
                  </div>
                  <div className="col-2">
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(o.product.price * o.quantity)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-4 p-5">
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
                Phí vận chuyển sẽ được Nhân viên cửa hàng liên hệ báo lại cụ thể
                theo địa chỉ của Khách hàng và chính sách giao hàng của
                UNLIMITED
              </li>
            </div>
            <div className="row text-center mt-3">
              <button
                className="btn btn-primary"
                onClick={handleNavigatePaymentPage}
              >
                Tiến hành thanh toán
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
    </>
  );
}
export default CartTest;
