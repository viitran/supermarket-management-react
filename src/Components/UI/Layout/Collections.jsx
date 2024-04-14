import { getCategories } from "../../../services/categories-service";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../../services/product-service";
import CarouselHome from "./../Carousel/CarouselHome";
import { NavLink } from "react-router-dom";
function Categories() {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();

  const getProduct = async () => {
    getAllProduct().then((res) => {
      setProducts(res);
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    const findAllCate = async () => {
      getCategories().then((res) => {
        setCategories(res);
      });
    };
    findAllCate();
  }, []);

  if (!categories) return <div>loading...</div>;
  if (!products) return <div>loading...</div>;

  return (
    <>
      <hr />
      <div className="p-3">
        <NavLink to="/" style={{ color: "black" }}>
          Trang Chủ
        </NavLink>{" "}
        {">"} Tất cả sản phẩm{" "}
      </div>
      <section>
        <div className="p-5">
          <div className="row mt-3">
            <div className="col-12">
              <h1>Tất cả sản phẩm</h1>
            </div>
            <div className="col-12 row mt-3 ms-4">
              <div className="col-6 row p-2">
                <div className="col-3 ">
                  <img
                    src="/img/HomePage/filter.png"
                    alt=""
                    style={{ width: "30px", height: "30px" }}
                  />{" "}
                  BỘ LỌC {"   "}
                  <img
                    src="/img/HomePage/line.png"
                    alt=""
                    style={{ height: "30px", width: "30px" }}
                  />
                </div>
                <div className="col-7">
                  <select>
                    <option selected>Lọc giá</option>
                    <option>Dưới 100.000₫</option>
                    <option>100.000 - 200.000₫</option>
                    <option>200.000 - 300.000₫</option>
                    <option>Trên 300.000₫</option>
                  </select>
                </div>
              </div>
              <div className="col-6 row">
                <div className="col-9"></div>

                <div className="col-3">
                  <select>
                    <option>Sắp xếp</option>
                    <option>Giá: Giảm dần</option>
                    <option>Giá: Tăng dần</option>
                    <option>Tên: Giảm dần</option>
                    <option>Tên: Tăng dần</option>
                    <option>Cũ nhất</option>
                    <option>Mới nhất</option>
                  </select>
                </div>
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
                    <button className="button-81" role="button">
                      Chọn Mua
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Categories;
