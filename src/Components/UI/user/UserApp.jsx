import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  initialUserInfoState,
  userActions,
} from "../../../redux/slide/user-slice";
import { useEffect, useState } from "react";
import {
  MDBTabs,
  MDBBtn,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { getOrderHistoryUser } from "../../../services/product-service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleLogout } from "../../../services/auth-service";
import { findAllProductsAfterPayment } from "../../../services/user";

function UserApp() {
  const userInfo = useSelector(getUserInfo);
  const [verticalActive, setVerticalActive] = useState("tab1");
  const [histories, setHistories] = useState();
  const [products, setProducts] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [basicModal, setBasicModal] = useState(false);
  const [selectOrderHistoryId, setSelectOrderHistoryId] = useState();

  const toggleOpen = (id) => {
    setSelectOrderHistoryId(id);
    setBasicModal(!basicModal);
  };
  useEffect(() => {
    document.title = "Thông tin cá nhân";
  });

  useEffect(() => {
    getOrderHistoryUser().then((res) => {
      const data = [...res];

      const productsByBill = {};

      data.forEach((product) => {
        const billId = product.bill.id;

        if (!productsByBill[billId]) {
          productsByBill[billId] = {
            bill: product.bill,
            account: product.account,
            products: [],
          };
        }

        productsByBill[billId].products.push(product);
      });

      const resultArray = Object.values(productsByBill);
      setHistories(resultArray);
      console.log(resultArray);
    });
  }, []);

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };

  return (
    <>
      <MDBRow className="p-5 col-12">
        <MDBCol size="3">
          <MDBTabs className="flex-column text-center">
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab1")}
                active={verticalActive === "tab1"}
              >
                Tài khoản
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab2")}
                active={verticalActive === "tab2"}
              >
                Lịch sử giao dịch
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size="9">
          <MDBTabsContent>
            <MDBTabsPane open={verticalActive === "tab1"}>
              <div className="card p-4 mb-0 shadow-0 border">
                <div className="content-body">
                  <div className="d-flex align-items-center col-12">
                    <div className="me-3">
                      <img
                        src={`data:image/jpeg;base64,${userInfo.image}`}
                        className="rounded-circle"
                        style={{ width: "60px", height: "60px" }}
                      />
                    </div>
                    <div className="pt-2 col-10">
                      <h6 className="pt-2">{userInfo.fullName}</h6>
                    </div>
                  </div>
                  <div className="row g-2 mb-3 mt-1">
                    <div className="col-md-12">
                      <div className="border p-3 rounded-3 bg-light">
                        <b className="mx-2 text-muted">
                          <img
                            src="/img/HomePage/address.png"
                            alt=""
                            style={{ width: "20px", height: "20px" }}
                          />
                        </b>
                        {userInfo.address}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="border p-3 rounded-3 bg-light">
                        <b className="mx-2 text-muted">
                          <img
                            src="/img/HomePage/phone.png"
                            alt=""
                            style={{ width: "20px", height: "20px" }}
                          />
                        </b>
                        {userInfo.phoneNumber}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="border p-3 rounded-3 bg-light">
                      <b className="mx-2 text-muted">
                        <img
                          src="/img/HomePage/email.png"
                          alt=""
                          style={{ width: "20px", height: "20px" }}
                        />
                      </b>
                      {userInfo.email}
                    </div>
                  </div>
                </div>
              </div>
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab2"}>
              <div
                className="card p-4 mb-0 shadow-0 border"
                style={{ overflowY: "auto", maxHeight: "470px" }}
              >
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Ngày tạo đơn</th>
                      <th>Địa chỉ nhận</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {histories?.map((h) => {
                      const orderDate = new Date(h.bill.date);
                      const now = new Date();
                      const timeDiff = Math.floor(
                        (now - orderDate) / (1000 * 60)
                      );
                      let status = "";

                      if (timeDiff <= 30) {
                        status = "Đang xác thực";
                      } else if (timeDiff <= 60) {
                        status = "Đang giao hàng";
                      } else {
                        status = "Giao hàng thành công";
                      }

                      return (
                        <tr key={h.id}>
                          <td>
                            {orderDate.toLocaleDateString()}{" "}
                            {orderDate.toLocaleTimeString()}
                          </td>
                          <td>{h.bill.address}</td>
                          <td>
                            {h.bill.total.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline">
                              {status}
                            </span>
                          </td>
                          <td>
                            <MDBBtn
                              color="info"
                              onClick={() => toggleOpen(h.bill.id)}
                            >
                              Chi tiết
                            </MDBBtn>
                            <MDBModal
                              open={
                                basicModal && selectOrderHistoryId === h.bill.id
                              }
                              onClose={() => setBasicModal(false)}
                              tabIndex="-1"
                            >
                              <MDBModalDialog>
                                <MDBModalContent>
                                  <MDBModalHeader>
                                    <MDBModalTitle>
                                      Thông tin đơn hàng ngày{" "}
                                      {orderDate.toLocaleDateString()}
                                    </MDBModalTitle>
                                    <MDBBtn
                                      className="btn-close"
                                      color="none"
                                      onClick={toggleOpen}
                                    ></MDBBtn>
                                  </MDBModalHeader>
                                  <MDBModalBody>
                                    <table className="table table-striped table-hover">
                                      <thead>
                                        <tr>
                                          <th>Sản phẩm</th>
                                          <th>Tổng tiền</th>
                                          <th>Địa chỉ nhận</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {h.products.map((po, idx) => (
                                          <tr key={idx}>
                                            <td>
                                              <img
                                                src={`data:image/jpeg;base64,${po.product.image}`}
                                                alt=""
                                                style={{
                                                  height: "50%",
                                                  width: "50%",
                                                }}
                                              />
                                            </td>
                                            <td>
                                              {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                              }).format(po.product.price)}
                                            </td>
                                            <td>{h.bill.address}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </MDBModalBody>
                                </MDBModalContent>
                              </MDBModalDialog>
                            </MDBModal>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </>
  );
}
export default UserApp;
