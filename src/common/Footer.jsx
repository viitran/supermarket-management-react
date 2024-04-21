import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <hr />
      <div className="col-12 row ">
        <div className="col-4 p-5">
          <img src="/img/HomePage/logo.jpg" alt="" />
        </div>
        <div className="col-3 p-5">
          <h4 style={{ textAlign: "center" }}>Về Chúng Tôi</h4>
          <div className="col-12">
            {" "}
            UNLIMITED đồng hành và hỗ trợ nông sản Việt, mang đến cho khách hàng
            thực phẩm “3 Sạch” : Sạch từ nông trại – Sạch qua quá trình sơ chế,
            chế biến - Sạch đến bàn ăn. Phục vụ thực phẩm tươi, sạch, đảm bảo
            chất lượng và an toàn.
          </div>
        </div>
        <div className="col-3 p-5">
          <h4 style={{ textAlign: "center" }}>Liên Kết</h4>
          <div className="col-12">
            <img
              src="/img/HomePage/mail.png"
              alt=""
              style={{ width: "30px", height: "30px" }}
            />{" "}
            - <Link to={"#"} style={{ color: "black" }}>unlimited@gmail.com</Link>
          </div>
          <div className="col-12 mt-3">
            <img
              src="/img/HomePage/facebook.png"
              alt=""
              style={{ width: "30px", height: "30px" }}
            /> {" "}
            -  <Link to={"#"} style={{ color: "black" }}>Unlimited shop</Link>
          </div>
        </div>
        <div className="col-2 p-5">
          <h4 style={{ textAlign: "center" }}>Liên Hệ</h4>
        </div>
      </div>
    </>
  );
}
export default Footer;
