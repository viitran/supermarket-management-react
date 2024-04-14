import { useEffect, useState } from "react";
import { Button, Fade } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  findProductByCateId,
  findProductById,
  addProductToCart,
} from "../../../services/product-service";
function ProductDetail() {
  const [products, setProducts] = useState();
  const [product, setProduct] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const handleProductDetail = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };


  const handleAddProductToCart = (id) => {
    console.log(id);
}

  useEffect(() => {
    const { id } = params;
    if (params && id) {
      findProductById(id).then((res) => {
        setProduct(res);
        findProductByCateId(res.category.id).then((resp) => {
          setProducts(resp);
        });
      });
    }
  }, [params]);
  if (!product) return <div>loading..</div>;
  if (!products) return <div>loading..</div>;
  return (
    <>
      <div className="container">
        <div className="col-12 row">
          <div className="col-6" style={{ borderRight: "solid 1px lightgrey" }}>
            <img
              src={`data:image/jpeg;base64,${product.image}`}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          {/* thong tin */}
          <div className="col-6">
            <div className="col-12">
              <h1>{product.name}</h1>
            </div>
            <div className="col-12 row">
              <div
                className="col-3"
                style={{ borderRight: "solid 1px lightgrey" }}
              >
                Mã sản phẩm: <small>{product.code}</small>
              </div>

              <div className="col-9">
                Tình trạng: <small>{product.status.name}</small>
              </div>
            </div>
            <div className="col-12 mt-3">
              
                <h3>Thông tin sản phẩm:</h3>
             <p>{product.description}</p>
            </div>
            <div className="col-12 mt-3">
              <h6>
                Giá:{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </h6>
            </div>
            <div className="col-12 mt-4">
              <Button className="me-2">Mua ngay</Button>
              <Button onClick={() => handleAddProductToCart(product.id)}>Thêm vào giỏ hàng</Button>
            </div>
            {/* <div className="col-12">
                <h3>Chính sách bán hàng</h3>
                <li>
                Cam kết thực phẩm “3 Sạch”: Sạch từ nông trại – Sạch qua quá trình sơ chế, chế biến - Sạch đến bàn ăn.
              </li>
              <li>
                Cam kết thực phẩm “3 Sạch”: Sạch từ nông trại – Sạch qua quá trình sơ chế, chế biến - Sạch đến bàn ăn.
              </li>
              <li>
                Cam kết thực phẩm “3 Sạch”: Sạch từ nông trại – Sạch qua quá trình sơ chế, chế biến - Sạch đến bàn ăn.
              </li>
            </div> */}
          </div>
        </div>
        <hr />
        <h2 className="text-center">Có thể bạn thích</h2>
        <div className="col-12 row">
        {products.map((product, index) => (
          <div className="col-2 p-2 box text-center" key={index}>
            <div>
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                alt=""
                style={{ height: "100%", width: "100%" }}
              />
            </div>
            <div
              className="mt-3"
              style={{ fontSize: "14px", fontWeight: "500" }}
            >
              {product.name.length > 23
                ? `${product.name.slice(0, 23)}...`
                : product.name}
            </div>
            <div>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </div>
            <div className="mt-3">
              <button onClick={() => handleProductDetail(product)} className="button-81" role="button">
                Chọn Mua
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}
export default ProductDetail;
