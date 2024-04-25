// import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { getNewProduct } from "../../../services/product-service";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../../../services/categories-service";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarouselHome from "../../../common/Carousel/CarouselHome.jsx";
import { useSelector } from 'react-redux';
import { getUserInfo } from "../../../redux/slide/user-slice.jsx";

function Home() {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const navigate = useNavigate();
  const userInfo = useSelector(getUserInfo);


  const findNewProduct = async () => {
    getNewProduct().then((res) => {
      setProducts(res);
    });
  };

  useEffect(() => {
    const getNameCategory = async () => {
      getCategories().then((res) => {
        setCategories(res);
      });
    };
    getNameCategory();
  }, []);

  const handleNavigateCate = (id) => {
    navigate(`/category/${id}`);
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
        {categories.map((cate, index) => (
          <div className="col-lg-3 col-md-12 col-sm-12" key={cate.id}>
            <button
              className="button-cate"
              onClick={() => handleNavigateCate(cate.id)}
            >
              {/* <img
                src={`data:image/jpeg;base64,${cate.image}`}
                alt=""
                style={{ width: "50px", height: "50px" }}
                className="p-1"
              />{" "} */}
              {cate.name}
            </button>
          </div>
        ))}
      </div>
      <div className="col-12 row">
        <div className="col-lg-12 col-md-12 col-sm-12 p-5 ms-2 row">
          <div className="col-10">
            <h2>Sản phẩm bán chạy</h2>
          </div>
          <div className="col-2 mt-4">
            <Link to={"/collections"}>Tất cả sản phẩm</Link>
          </div>
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
