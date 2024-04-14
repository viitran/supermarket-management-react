function Login() {
  return (
    <>
      <div className="container">
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
        className="vh-100"
      >
        <div>
          <h1 className="text-center">Login</h1>
          <form
          //  onSubmit={handleSubmit(onSubmitHandler)}
           >
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                username
              </span> 
              <input
                type="text"
                className="form-control"
                placeholder="username.."
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                password
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Password..."
              />
            </div>
            <button className="btn btn-primary text-white">
                Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
