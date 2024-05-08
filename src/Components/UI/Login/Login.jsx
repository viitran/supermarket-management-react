import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from './../../../services/auth-service';
import { toast } from 'react-toastify';
import { findUserInfo } from './../../../services/user';
import { useAppDispatch } from "../../../redux/redux-hook";
import { userActions } from './../../../redux/slide/user-slice';
import { getAllOrderOfUser } from "../../../services/cart-service";
import { cartActions } from "../../../redux/slide/cart-slice";
import { useEffect } from 'react';

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Đăng nhập";
  });
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      username: formData.get('username'),
      password: formData.get('password')
    };

    handleLogin(data)
      .then((res) => {
        navigate(-1);
        toast("Đăng nhập thành công!!");
        findUserInfo().then((res) => {
          dispatch(userActions.setUserInfo(res));
        });
        getAllOrderOfUser().then(res => {
          const size = res.reduce((c, cart) => {
            return c + cart.quantity
          }, 0)
          dispatch(cartActions.setCartSize(size))
        })
      })
      .catch((err) => {
        toast("Tên tài khoản hoặc mật khẩu không chính xác!");
      });
  };

  return (
    <div className="container p-5">
      <div className="row p-5 mt-5">
        <div className="col-6 text-center p-5 mt-5">
          <img src="/img/HomePage/logo.jpg" alt="" 
          onClick={() => navigate("/")}
          />
        </div>
        <div className="col-lg-6 row">
          <div>
            <h3>Đăng nhập</h3>
            <form onSubmit={handleSubmit}>
              <div className="col-12 row mt-3">
                <div className="col-12 form-label">Email </div>
                <div className="col-12">
                  <input type="text" className="form-control" name="username" />
                </div>
              </div>
              <div className="col-12 row mt-3">
                <div className="col-8 form-label">Mật khẩu </div>
                <div className="col-4 form-label">
                  <Link to="#">Quên mật khẩu?</Link>{" "}
                </div>
                <div className="col-12">
                  <input type="password" name="password" className="form-control" />
                </div>
              </div>

              <div className="col-12 mt-3">
                <input type="checkbox" /> Remember me
              </div>
              <div className="col-12 mt-3">
                <button className="btn btn-primary" type="submit">Đăng nhập</button>
              </div>
            </form>
            <div className="col-12 mt-3">
              <Link to={"/signup"}>Bạn chưa có tài khoản? Đăng ký ngay</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
