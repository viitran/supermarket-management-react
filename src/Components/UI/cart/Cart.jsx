import Header from "../Header/Header";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Footer from "../Footer/Footer";

function Cart() {
  const [count, setCount] = useState(1);
  const [order, setOrder] = useState();

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <hr />
      <div className=" container">
        <div className="col-12 row">
          <div className="col-8">
            <div className="col-12">
              <h1>Giỏ hàng của bạn</h1>
            </div>
            <hr />
            <div className="col-12 row" style={{ borderBottom: "solid 1px"  }}>
              <div className="col-4">
                <img
                  src="/img/HomePage/canhga.png"
                  alt=""
                  style={{ height: "200px", width: "200px" }}
                />
              </div>
              <div className="col-8 p-5">
                <div className="col-12">
                  <h4>Canh ga ...</h4>
                </div>
                <div className="col-12 mt-2">129.000₫ x {count}</div>

                <div className="col-12 row mt-4">
                  <div>
                    <button
                      //   style={{ border: "solid 1px black",backgroundColor: "white",height: "100%",width: "100%"}}
                      onClick={decrement}
                      disabled={count == 0}
                    >
                      -
                    </button>
                    <span>{count}</span>
                    <button
                      //  style={{ border: "solid 1px black",backgroundColor: "white",height: "100%",width: "100%"}}
                      data-mdb-ripple-init
                      onClick={increment}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 row" style={{ borderBottom: "solid 1px" }}>
              <div className="col-4">
                <img
                  src="/img/HomePage/canhga.png"
                  alt=""
                  style={{ height: "200px", width: "200px" }}
                />
              </div>
              <div className="col-8 p-5">
                <div className="col-12">
                  <h4>Canh ga ...</h4>
                </div>
                <div className="col-12 mt-2">129.000₫ x {count}</div>

                <div className="col-12 row mt-4">
                  <div>
                    <button
                      //   style={{ border: "solid 1px black",backgroundColor: "white",height: "100%",width: "100%"}}
                      onClick={decrement}
                      disabled={count == 0}
                    >
                      -
                    </button>
                    <span>{count}</span>
                    <button
                      //  style={{ border: "solid 1px black",backgroundColor: "white",height: "100%",width: "100%"}}
                      data-mdb-ripple-init
                      onClick={increment}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 row" style={{ borderBottom: "solid 1px" }}>
              <div className="col-4">
                <img
                  src="/img/HomePage/canhga.png"
                  alt=""
                  style={{ height: "200px", width: "200px" }}
                />
              </div>
              <div className="col-8 p-5">
                <div className="col-12">
                  <h4>Canh ga ...</h4>
                </div>
                <div className="col-12 mt-2">129.000₫ x {count}</div>

                <div className="col-12 row mt-4">
                  <div>
                    <button
                      onClick={decrement}
                      disabled={count == 1}
                    >
                      -
                    </button>
                    <span>{count}</span>
                    <button
                      data-mdb-ripple-init
                      onClick={increment}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
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
                }).format(count * 129000)}
              </div>
            </div>
            <hr />
            <div className="col-12">
              <li>
                Phí vận chuyển sẽ được Nhân viên cửa hàng liên hệ báo lại cụ thể
                theo địa chỉ của Khách hàng và chính sách giao hàng của
                UNLIMITED
              </li>
              <li>
                Phí vận chuyển sẽ được Nhân viên cửa hàng liên hệ báo lại cụ thể
                theo địa chỉ của Khách hàng và chính sách giao hàng của
                UNLIMITED
              </li>
            </div>
            <div className="row text-center mt-3">
              <button className="btn btn-primary">Thanh toán</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cart;
