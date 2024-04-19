import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  findProductByCateId,
  findProductById,
  addProductToCart,
} from "../../../services/product-service";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ProductDetail() {
  const [products, setProducts] = useState();
  const [product, setProduct] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);

  const handleProductDetail = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddProductToCart = () => {
    const orderDto = {
      productId: product.id,
      quantity: count,
    };
    addProductToCart(orderDto);
    toast.success("Thêm vào giỏ hàng thành công!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    console.log(orderDto);
  };

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
            <div className="col-12">
              <button
                style={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  padding: "5px 10px",
                  cursor: "pointer",
                  marginRight: "5px",
                  borderRadius: "5px",
                }}
                onClick={decrement}
                disabled={count == 1}
              >
                -
              </button>
              <span style={{ margin: "0 10px" }}>{count}</span>
              <button
                style={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  padding: "5px 10px",
                  cursor: "pointer",
                  marginRight: "5px",
                  borderRadius: "5px",
                }}
                onClick={increment}
                disabled={count == product.quantity}
              >
                +
              </button>
            </div>
            <div className="col-12 mt-4">
              <Button className="me-2">Mua ngay</Button>
              <Button onClick={handleAddProductToCart}>
                Thêm vào giỏ hàng
              </Button>
            </div>
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
                <button
                  onClick={() => handleProductDetail(product.id)}
                  className="button-81"
                  role="button"
                >
                  Chọn Mua
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}
export default ProductDetail;
