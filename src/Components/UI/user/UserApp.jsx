import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  initialUserInfoState,
  userActions,
} from "../../../redux/slide/user-slice";
import { useEffect, useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { getOrderHistoryUser } from "../../../services/product-service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleLogout } from "../../../services/auth-service";

function UserApp() {
  const userInfo = useSelector(getUserInfo);
  const [verticalActive, setVerticalActive] = useState("tab1");
  const [histories, setHistories] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
              <div className="card p-4 mb-0 shadow-0 border"           style={{ overflowY: "auto", maxHeight: "470px" }}
>
                <table class="table table-striped table-hover"           
>
                  <thead>
                    <tr>
                      <th>Ngày tạo đơn</th>

                      <th>Địa chỉ nhận</th>

                      <th>Tổng tiền</th>

                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {histories?.map((h) => (
                      <tr key={h.id}>
                        <td>
                          {" "}
                          {new Date(h.bill.date).toLocaleDateString()}{" "}
                          {new Date(h.bill.date).toLocaleTimeString()}
                        </td>
                        <td>{h.bill.address}</td>
                        <td>
                          {h.bill.total.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td>
                        <span class="badge badge-success rounded-pill d-inline">{h.bill.paymentStatus.name}</span></td>
                      </tr>
                    ))}
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
