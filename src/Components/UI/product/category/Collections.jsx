import React, { useEffect, useState } from "react";
import { getAllProduct } from "../../../../services/product-service";
import { getCategories } from "../../../../services/categories-service";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSearch } from "../../../../redux/slide/common-slice";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const initParam = {
  page: 0,
  size: 100,
  sortBy: "start_date",
  sortDirection: "ASC",
  categoryId: -1,
  name: "",
  priceFrom: null,
  priceTo: null,
};

function Categories() {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const searchRedux = useSelector(getSearch);
  const [param, setParam] = useState(initParam);
  const [showAllProducts, setShowAllProducts] = useState(false);
  // const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Tất cả sản phẩm";
  });
  
  const handleAddProductToCart = (id) => {
    navigate(`/product/${id}`);
  };

  const getProducts = (param) => {
    getAllProduct(param).then((res) => {
      setProducts(res);
    });
  };

  useEffect(() => {
    getProducts({ ...param, name: searchRedux.navBar });
    setParam({ ...param, name: searchRedux.navBar });
  }, [searchRedux]);

  useEffect(() => {
    const findAllCate = async () => {
      getCategories().then((res) => {
        setCategories(res);
      });
    };
    findAllCate();
  }, []);

  const handlePriceFilterChange = (e) => {
    const { name, value } = e.target;
    const dt = {
      ...param,
      [name]: value,
    };
    switch (dt.priceFrom) {
      case "under100":
        dt.priceFrom = 0;
        dt.priceTo = 100000;
        break;
      case "100to200":
        dt.priceFrom = 100000;
        dt.priceTo = 200000;
        break;
      case "200to300":
        dt.priceFrom = 200000;
        dt.priceTo = 300000;
        break;
      case "above300":
        dt.priceFrom = 300000;
        dt.priceTo = 1000000;
        break;
      default:
        break;
    }
    getProducts(dt);
    setParam(dt);
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    let dt = { ...param };
    switch (value) {
      case "priceD":
        dt = { ...param, sortBy: "price", sortDirection: "DESC" };
        break;
      case "priceA":
        dt = { ...param, sortBy: "price", sortDirection: "ASC" };
        break;
      case "nameD":
        dt = { ...param, sortBy: "name", sortDirection: "DESC" };
        break;
      case "nameA":
        dt = { ...param, sortBy: "name", sortDirection: "ASC" };
        break;
      case "old":
        dt = { ...param, sortBy: "startDate", sortDirection: "ASC" };
        break;
      case "new":
        dt = { ...param, sortBy: "startDate", sortDirection: "DESC" };
        break;
      default:
        dt = { ...param, sortBy: "startDate", sortDirection: "ASC" };
        break;
    }
    getProducts(dt);
    setParam(dt);
  };

  if (!categories || !products) return <div>loading...</div>;

  const displayedProducts = showAllProducts
    ? products.content
    : products.content.slice(0, 8);

  return (
    <>
      <hr />
      <Breadcrumb className="p-2">
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>Tất cả sản phẩm </Breadcrumb.Item>
      </Breadcrumb>
      <section>
        <div className="p-5">
          <div className="col-lg-12 row mt-3">
            <div className="col-12 row mt-3 ms-4">
              <div className="col-lg-6 col-md-6 col-sm-12 row p-2">
                <div className="col-5 col-md-3 ">
                  <img
                    src="/img/HomePage/filter.png"
                    alt=""
                    style={{ width: "30px", height: "30px" }}
                  />{" "}
                  BỘ LỌC {"   "}
                </div>
                <div className="col-md-9 col-7">
                  <select name="priceFrom" onChange={handlePriceFilterChange}>
                    <option value="">Lọc giá</option>
                    <option value="under100">Dưới 100.000₫</option>
                    <option value="100to200">100.000 - 200.000₫</option>
                    <option value="200to300">200.000 - 300.000₫</option>
                    <option value="above300">Trên 300.000₫</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 row">
                <div className="col-md-9 col-7"></div>
                <div className="col-md-3 col-5">
                  <select name="sortBy" onChange={handleSortChange}>
                    <option value="">Sắp xếp</option>
                    <option value="priceD">Giá: Giảm dần</option>
                    <option value="priceA">Giá: Tăng dần</option>
                    <option value="nameD">Tên: Z - A</option>
                    <option value="nameA">Tên: A - Z </option>
                    <option value="old">Cũ nhất</option>
                    <option value="new">Mới nhất</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-12 row ms-2 justify-content-center text-center">
              {displayedProducts.map((product,index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 p-2 box" key={index}>
                  <div className="product-info">
                    <div>
                      <img
                        src={`data:image/jpeg;base64,${product.image}`}
                        alt=""
                        style={{ height: "100%", width: "100%" }}
                      />
                    </div>
                    <div
                      className=""
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
                    <div className="">
                      <button
                        className="button-81"
                        onClick={() => handleAddProductToCart(product.id)}
                      >
                        Chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Show more/Show less button */}
            {!showAllProducts && (
              <div className="text-center mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowAllProducts(true)}
                >
                  Hiển thị thêm
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Categories;
