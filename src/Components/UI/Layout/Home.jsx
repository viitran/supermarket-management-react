// import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import {
  findAllTopSelling,
  getNewProduct,
} from "../../../services/product-service";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../../../services/categories-service";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarouselHome from "../../../common/Carousel/CarouselHome.jsx";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/slide/user-slice.jsx";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

function Home() {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const navigate = useNavigate();
  const [basicActive, setBasicActive] = useState("tab1");
  const [topProductSelling, setTopProductSelling] = useState();

  const findTopSelling = () => {
    findAllTopSelling().then((res) => {
      setTopProductSelling(res);
      console.log(res);
    });
  };

  useEffect(() => {
    findTopSelling();
  }, []);
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  useEffect(() => {
    document.title = "Trang Chủ";
  }, []);

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

  const handleNavigate = () => {
    navigate(`/collections`);
  }
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
      <MDBTabs className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab1")}
            active={basicActive === "tab1"}
          >
            Sản phẩm bán chạy
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab2")}
            active={basicActive === "tab2"}
          >
            Sản phẩm mới
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            // onClick={() => handleBasicClick("tab3")}
            // active={basicActive === "tab3"}
            onClick={handleNavigate}
          >
            Tất cả sản phẩm
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === "tab1"}>

        <div className="col-12 row">
            <div className="col-12 row ms-2 justify-content-center text-center">
              {topProductSelling?.map((t, index) => (
                <div className="col-2 p-2 box" key={t.id}>
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${t.image}`}
                      alt=""
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                  <div
                    className="mt-3"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    {t.name.length > 23
                      ? `${t.name.slice(0, 23)}...`
                      : t.name}
                  </div>
                  <div>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(t.price)}
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={() => handleAddProductToCart(t.id)}
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

        </MDBTabsPane>
        <MDBTabsPane open={basicActive === "tab2"}>
          <div className="col-12 row">
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
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === "tab3"}>

                  
        </MDBTabsPane>
      </MDBTabsContent>

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
