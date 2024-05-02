import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <hr />
      <div className="row col-12">
        <div className="col-md-3 col-sm-6 p-3">
          <img
            src="/img/HomePage/logo.jpg"
            alt=""
            style={{ maxWidth: "100%" }}
          />
        </div>
        <div className="col-md-3 col-sm-6 p-3">
          <h4 style={{textAlign: "center"}}>Về Chúng Tôi</h4>
          <p>
            UNLIMITED đồng hành và hỗ trợ nông sản Việt, mang đến cho khách hàng
            thực phẩm “3 Sạch” : Sạch từ nông trại – Sạch qua quá trình sơ chế,
            chế biến - Sạch đến bàn ăn. Phục vụ thực phẩm tươi, sạch, đảm bảo
            chất lượng và an toàn.
          </p>
        </div>
        <div className="col-md-3 col-sm-6 p-3">
          <h4 style={{textAlign: "center"}}>Liên Kết</h4>
          <ul>
            <li><b>Website:</b> www.unlimited.com</li>
            <li><b>Facebook:</b> facebook.com/unlimitedvn</li>
            <li><b>Instagram:</b> instagram.com/unlimitedvn</li>
            <li><b>YouTube:</b> youtube.com/unlimitedvn</li>
          </ul>
        </div>
        <div className="col-md-3 col-sm-6 p-3">
          <h4 style={{textAlign: "center"}}>Liên Hệ</h4>
          <p>
            <b>Hotline:</b> 1800 6034
          </p>
          <p>
            <b>Địa chỉ:</b> 295 Đường Nguyễn Tất Thành, Quận Thanh Khê, TP. Đà
            Nẵng
          </p>
        </div>
      </div>
    </>
  );
}
export default Footer;
