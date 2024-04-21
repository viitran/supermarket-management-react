// import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { getNewProduct } from "../../../services/product-service";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../services/categories-service";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarouselHome from '../../../common/Carousel/CarouselHome.jsx';
function Home() {
  const [products, setProducts] = useState();
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  const findNewProduct = async () => {
    getNewProduct().then((res) => {
      setProducts(res);
    });
  };

  useEffect(() => {
    const getNameCategory = async () => {
      getCategories().then((res) => {
        console.log(res);
        setCategory(res);
      });
    };
    getNameCategory();
  }, []);

  const handleNavigateCate = () => {
    navigate("/collections");
  };

  const handleAddProductToCart = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    findNewProduct();
  }, []);

  if (!products) return <div>loading....</div>;

  return (
    <>
      <CarouselHome />
      <div className="col-12 row p-3 text-center">
        <div className="col-lg-3 col-md-12 col-sm-12">
          <button className="button-cate" onClick={handleNavigateCate}>
            <img
              src="/img/HomePage/meat.png"
              alt=""
              style={{ width: "50px", height: "50px" }}
              className="p-1"
            />{" "}
            Tươi sống
          </button>
        </div>
        <div className="col-lg-3 col-md-12 col-sm-12">
          <button className="button-cate">
            <img
              src="/img/HomePage/vegatable.png"
              alt=""
              style={{ width: "50px", height: "50px" }}
              className="p-1"
            />{" "}
            Rau
          </button>
        </div>
        <div className="col-lg-3 col-md-12 col-sm-12 text-center">
          <button className="button-cate">
            <img
              src="/img/HomePage/nuoc.png"
              alt=""
              style={{ width: "50px", height: "50px" }}
              className="p-1"
            />{" "}
            Nước
          </button>
        </div>
        <div className="col-lg-3 col-md-12 col-sm-12">
          <button className="button-cate">
            <img
              src="/img/HomePage/fruit.png"
              alt=""
              style={{ width: "50px", height: "50px" }}
              className="p-1"
            />{" "}
            Củ - Quả
          </button>
        </div>
      </div>
      <div className="col-12 row">
        <div className="col-lg-12 col-md-12 col-sm-12 p-5 ms-2">
          <h2>Sản phẩm bán chạy</h2>
        </div>

        <div className="col-12 row ms-2 justify-content-center text-center">
          {products.map((product, index) => (
            <div className="col-2 p-2 box" key={index}>
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
                  onClick={() => handleAddProductToCart(product.id)}
                  className="button-81"
                  role="button"
                >
                  Chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 text-center">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/vi-project-957bb.appspot.com/o/product%2Fqcao1.png?alt=media&token=25dd868a-1203-49d6-8b1c-c2a65cf3d71d"
          alt="qcao1"
          style={{ width: "90%" }}
        />
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
export default Home;
