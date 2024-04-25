import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getUserInfo,
  initialUserInfoState,
  userActions,
} from "../redux/slide/user-slice";
import { useAppDispatch } from "../redux/redux-hook";
import { useRef } from "react";
import { commonActions, getSearch } from "../redux/slide/common-slice";
import { isLogin } from "./render";
import { getCartSize } from "../redux/slide/cart-slice";
import { handleLogout } from "../services/auth-service";
import { toast } from "react-toastify";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

function Header() {
  const userInfo = useSelector(getUserInfo);
  const dispatch = useAppDispatch();
  const inputRef = useRef();
  const totalQuantity = useSelector(getCartSize);
  const navigate = useNavigate();
  const searchRedux = useSelector(getSearch);
  const [searchValue, setSearchValue] = useState();
  const [delay, setDelay] = useState(false);

  const handleNavigateLoginPage = () => {
    navigate("/login");
  };

  const handleShowUserInfo = () => {
    navigate("/info");
  };

  const onLogoutHandler = (e) => {
    e.preventDefault();
    handleLogout().then((res) => {
      navigate("/");
      dispatch(userActions.setUserInfo(initialUserInfoState.info));
      toast("Đăng xuất thành công!!");
    });
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    console.log(value);
  };

  const handleSearch = () => {
    dispatch(commonActions.setSearch({ ...searchRedux, navBar: searchValue }));
    navigate(`/collections`);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    dispatch(commonActions.setSearch({ ...searchRedux, navBar: "" }));
  };

  const handleNavigateCartPage = () => {
    navigate("/cart");
  };

  const handleNavigateHomePage = () => {
    navigate("/");
  };

  return (
    <>
      <div
        className="container-fluid p-3 sticky-top"
        style={{ background: "white" }}
      >
        <div className="col-12 row">
          <div className="ms-2 col-2" onClick={handleNavigateHomePage}>
            <img
              src="/img/HomePage/logo.jpg"
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="mt-3 ms-1  col-4">
            <input
              name="searchValue"
              className="form-control"
              value={searchValue}
              placeholder="Nhập tên sản phẩm để tìm kiếm..."
              ref={inputRef}
              onChange={handleSearchChange}
            />
          </div>
          <div className="mt-3 col-2">
            {searchValue && (
              <button
                style={{ border: "none", backgroundColor: "white" }}
                onClick={handleClearSearch}
              >
                <img
                  src="/img/HomePage/clear.png"
                  alt="search"
                  style={{ width: "30px", height: "30px" }}
                />
              </button>
            )}{" "}
            <button
              style={{ border: "none", backgroundColor: "white" }}
              onClick={handleSearch}
            >
              <img
                src="/img/HomePage/search.png"
                alt="search"
                style={{ width: "30px", height: "30px" }}
              />
            </button>
          </div>
          <div className="mt-3 col">
            {isLogin(userInfo) && (
              <div className="col">
                <button
                  className=" rounded py-1 px-3 nav-link d-flex align-items-center"
                  onClick={handleNavigateCartPage}
                >
                  <img
                    src="/img/HomePage/cart.png"
                    alt=""
                    style={{ width: "30px", height: "30px" }}
                  />
                  {"  "}
                  <p className="d-none d-md-block mb-0">{totalQuantity}</p>
                </button>
              </div>
            )}
          </div>
          <div className="mt-3 col-3">
            {!isLogin(userInfo) && (
              <button
                className="me-1 rounded py-1 px-3 nav-link d-flex align-items-center"
                onClick={handleNavigateLoginPage}
              >
                <img
                  src="/img/HomePage/user.png"
                  alt=""
                  style={{ width: "30px", height: "30px" }}
                />
                <p className="d-none d-md-block mb-0">Đăng nhập</p>
              </button>
            )}

            {isLogin(userInfo) && (
              <MDBDropdown group className="shadow-0">
                <MDBDropdownToggle color="link">
                  {userInfo.fullName}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link childTag="button">
                    Action
                  </MDBDropdownItem>
                  <MDBDropdownItem link childTag="button">
                    Another action
                  </MDBDropdownItem>
                  <MDBDropdownItem link childTag="button">
                    Something else here
                  </MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem
                    link
                    childTag="button"
                    onClick={onLogoutHandler}
                  >
                    Đăng xuất
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
