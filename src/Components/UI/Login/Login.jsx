import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const navigatePage = () => {
    navigate(-1);
    alert("Đăng nhập thành công!");
  }
  return (
    <>
     <div className="container p-5">
     <div className="row p-5 mt-5">
        <div className="col-6 text-center p-5 mt-5">
          <img src="/img/HomePage/logo.jpg" alt="" />
        </div>
        <div className="col-6 row">
          <div>
            <h3>Đăng nhập</h3>
            <div className="col-12 row mt-3">
              <div className="col-12 form-label">Email </div>
              <div className="col-12">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-12 row mt-3">
              <div className="col-8 form-label">Mật khẩu </div>
              <div className="col-4 form-label">
                <Link to="#">Quên mật khẩu?</Link>{" "}
              </div>
              <div className="col-12">
                <input type="password" className="form-control" />
              </div>
            </div>

            <div className="col-12 mt-3">
              <input type="checkbox" /> Remember me
            </div>
            <div className="col-12 mt-3">
              <button className="btn btn-primary" onClick={navigatePage}>Đăng nhập</button>
            </div>
            <div className="col-12 mt-3">
              <Link>Bạn chưa có tài khoản? Đăng ký ngay</Link>
            </div>
          </div>
        </div>
      </div>
     </div>
    </>
  );
}
export default Login;
