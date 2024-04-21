import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from './../../../services/auth-service';
import { toast } from 'react-toastify';
import { findUserInfo } from './../../../services/user';
import { useAppDispatch } from "../../../redux/redux-hook";
import { userActions } from './../../../redux/slide/user-slice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      username: formData.get('username'),
      password: formData.get('password')
    };

    handleLogin(data)
      .then((res) => {
        navigate("/");
        toast("Đăng nhập thành công!!");
        findUserInfo().then((res) => {
          dispatch(userActions.setUserInfo(res));
        });
        // showProductInCart().then((res) => {
        //   const size = res.reduce((c: any, cart: any) => {
        //     return c + cart.quantity;
        //   }, 0);
        //   dispatch(cartActions.setCartSize(size));
        // });
      })
      .catch((err) => {
        alert("sai tk or mk");
        toast("Tên tài khoản hoặc mật khẩu không chính xác!");
      });
  };

  return (
    <div className="container p-5">
      <div className="row p-5 mt-5">
        <div className="col-6 text-center p-5 mt-5">
          <img src="/img/HomePage/logo.jpg" alt="" />
        </div>
        <div className="col-6 row">
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
              <Link to="#">Bạn chưa có tài khoản? Đăng ký ngay</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
