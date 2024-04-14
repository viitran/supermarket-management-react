import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleNavigateLoginPage = () => {
    navigate("/login");
  };

  const handleNavigateCart = () => {
    navigate("/carts");
  }
  
  return (
    <>
      <div
        className="container-fluid p-3 sticky-top"
        style={{ background: "white" }}
      >
        <div className="col-12 row">
          <div className="col-3 row me-3 ms-2">
            <img
              src="/img/HomePage/shopping-cart.png"
              className="col-3"
              alt=""
              style={{ width: "70px", height: "50px" }}
            />
            <h3
              className="col-9 mt-3"
              style={{ fontFamily: "Anybody", fontWeight: "bold" }}
            >
              <Link to="/" style={{ color: "black" }}>
                UNLIMITED
              </Link>
            </h3>
          </div>
          <div className="col-9 row p-3">
            <div className="col-6">
              <input
                className="form-control"
                placeHolder="Tìm kiếm sản phẩm..."
              />
            </div>
            <div className="col-2 p-1">
              <button style={{ border: "none", backgroundColor: "white" }}>
                <img
                  src="/img/HomePage/search.png"
                  alt="search"
                  style={{ width: "30px", height: "30px" }}
                />
              </button>
            </div>
            <div className="col-2">
              <button style={{backgroundColor: "white"}} onClick={handleNavigateCart}>
                <img
                  src="/img/HomePage/cart.png"
                  alt=""
                  style={{ height: "30px", width: "30px" }}
                />
              </button>
            </div>
            <div className="col-2 p-1">
              {/* <div className="dropdown">
                <button
                  data-mdb-button-init
                  data-mdb-ripple-init
                  data-mdb-dropdown-init
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown button
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div> */}
              <button
                style={{ border: "none", backgroundColor: "white" }}
                onClick={handleNavigateLoginPage}
              >
                <img
                  src="/img/HomePage/user.png"
                  alt=""
                  style={{ width: "30px", height: "30px" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
