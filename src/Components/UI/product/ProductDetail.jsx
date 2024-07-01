import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  findProductByCateId,
  findProductById,
  addProductToCart,
  getCartDetail,
} from "../../../services/product-service";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllProductsThatCanBeDishesForId } from "./../../../services/product-service";
import { isLogin } from "../../../common/render";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/slide/user-slice";
import { cartActions } from "../../../redux/slide/cart-slice";
import { getAllOrderOfUser } from "../../../services/cart-service";
function ProductDetail() {
  const userInfo = useSelector(getUserInfo);
  const [products, setProducts] = useState();
  const [product, setProduct] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [cart, setCart] = useState();
  const [recommendDishes, setRecommendDishes] = useState();
  const handleNavigatePayment = () => {
    navigate("/payment");
  };

  useEffect(() => {
    document.title = "Chi tiết sản phẩm";
  });

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

  const handleChangeSizeCart = () => {
    getAllOrderOfUser().then((res) => {
      const size = res.reduce((c, cart) => {
        return c + cart.quantity;
      }, 0);
      dispatch(cartActions.setCartSize(size));
    });
  };

  const handleAddProductToCart = () => {
    const orderDto = {
      productId: product.id,
      quantity: count,
    };
    addProductToCart(orderDto).then(() => {
      handleChangeSizeCart();
    });
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
  };

  useEffect(() => {
    const { id } = params;
    if (params && id) {
      findProductById(id).then((res) => {
        setProduct(res);
        findProductByCateId(res.category.id).then((resp) => {
          setProducts(resp);
        });
        getAllProductsThatCanBeDishesForId(id).then((r) => {
          setRecommendDishes(r);
        });
      });

      getCartDetail({ productId: id })
        .then((res) => {
          if (res && res.quantity !== undefined) {
            setCart(res);
          } else {
            setCart({ quantity: 1 });
          }
        })
        .catch((error) => {
          console.error("Failed to fetch cart details:", error);
          setCart({ quantity: 1 });
        });
    }
  }, [params]);

  const handleAddToCart = (product) => {
    if (isLogin(userInfo)) {
      handleAddProductToCart(product);
    } else {
      toast("Vui lòng đăng nhập!!");
    }
  };

  if (!product) return <div>loading..</div>;
  if (!products) return <div>loading..</div>;
  if (!recommendDishes) return <div>loading..</div>;

  return (
    <>
      <div className="container">
        <div className="col-lg-12 col-md-12 col-sm-12 row">
          <div
            className="col-lg-6 col-md-6 col-sm-12"
            style={{ borderRight: "solid 1px lightgrey" }}
          >
            <img
              src={`data:image/jpeg;base64,${product.image}`}
              alt=""
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                display: "block",
                margin: "auto",
              }}
            />
          </div>
          {/* thong tin */}
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="col-lg-12 ">
              <h1>{product.name}</h1>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 row">
              <div
                className="col-lg-6 col-md-6 col-sm-6"
                style={{ borderRight: "solid 1px lightgrey" }}
              >
                <span>
                  Mã sản phẩm:{" "}
                  <small>
                    <b>{product.code}</b>
                  </small>
                </span>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6">
                Tình trạng:{" "}
                <small>
                  <b
                    style={
                      product.quantity >= 65
                        ? { color: "green" }
                        : product.quantity >= 1 && product.quantity <= 64
                        ? { color: "#FD7702" }
                        : { color: "red" }
                    }
                  >
                    {product.quantity >= 65
                      ? "Còn hàng"
                      : product.quantity >= 1 && product.quantity <= 64
                      ? "Sắp hết hàng"
                      : "Hết hàng"}
                  </b>
                </small>
              </div>
            </div>
            <div className="col-lg-12 mt-3">
              <h3>Thông tin sản phẩm:</h3>
              <p>{product.description}</p>
              <span>
                Số lượng tồn kho:<b> {product.quantity}</b>
              </span>
              <br />
              {/* {isLogin(userInfo) && (<span>Số lượng của sản phẩm này hiện có trong giỏ hàng: <b></b> </span>)} */}
            </div>
            <div className="mt-3">
              <h4>
                Giá:{" "}
                <b style={{ color: "red" }}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </b>
              </h4>
            </div>
            <div className="col-lg-12 col-md-12 col-xs-12 row">
              <div className="col-lg-4 col-md-12 col-xs-12 col-12 mt-3">
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
                  disabled={count <= 1}
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
                  disabled={count + cart.quantity >= product.quantity}
                >
                  +
                </button>
              </div>
              <div className="col-lg-8 col-md-12 col-xs-12 col-12 mt-3">
                <Button className="btn" style={{width: "100%"}} onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h2 className="text-center">Có thể bạn thích</h2>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
          {products.map((product, index) => (
            <div className="col-lg-3 col-md-2 col-sm-2 p-2 box text-center" key={product.id}>
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
        {recommendDishes.products ? (
          <div className="mt-5">
            <h2>Có thể kết hợp {product.name} </h2>
            <div className="col-12 row">
              {recommendDishes.products.map((dish) => (
                <div className="col-2 p-2 box text-center" key={dish.id}>
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${dish.image}`}
                      alt=""
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                  <div
                    className="mt-3"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    {dish.name.length > 23
                      ? `${dish.name.slice(0, 23)}...`
                      : dish.name}
                  </div>
                  <div>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(dish.price)}
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={() => handleProductDetail(dish.id)}
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
        ) : (
          <div className="mt-5 col-12">
            
          </div>
        )}
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
