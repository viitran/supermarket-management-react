import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { findProductByCateId } from "../../../../services/product-service";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { getCateById } from "../../../../services/categories-service";

const initParam = {
  page: 0,
  size: 100,
  sortBy: "startDate",
  sortDirection: "ASC",
  categoryId: -1,
  name: "",
  priceFrom: null,
  priceTo: null,
};
function CategoryApp() {
  const params = useParams();
  const [products, setProducts] = useState();
  const [param, setParam] = useState(initParam);
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (category && category.name) {
        document.title = `Sản phẩm ${category.name}`;
    }
}, [category]);

  useEffect(() => {
    const { id } = params;
    if (params && id) {
      findProductByCateId(id).then((res) => {
        setProducts(res);
        console.log(res);
      });
      getCateById(id).then((resp) => {
        setCategory(resp);
      });
    }
  }, [params]);

  const handleAddProductToCart = (id) => {
    navigate(`/product/${id}`);
  };


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
    setParam(dt);
  };

  if (!products) return <div>loading...</div>;
  return (
    <>
      <hr />
      <Breadcrumb className="p-2">
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active> {category.name}</Breadcrumb.Item>
      </Breadcrumb>
      <section>
        <div className="p-5">
          <div className="row mt-3">
            <div className="col-12">
              <h1>
                Sản phẩm {category.name}
              </h1>
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
                  <select name="priceFrom" onChange={handlePriceFilterChange}>
                    <option value="">Lọc giá</option>
                    <option value="under100">Dưới 100.000₫</option>
                    <option value="100to200">100.000 - 200.000₫</option>
                    <option value="200to300">200.000 - 300.000₫</option>
                    <option value="above300">Trên 300.000₫</option>
                  </select>
                </div>
              </div>
              <div className="col-6 row">
                <div className="col-9"></div>
                <div className="col-3">
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
            <div className="col-12 row ms-2 justify-content-center text-center">
              {products.map((c) => (
                <div className="col-2 box p-2 text-center" key={c.id}>
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${c.image}`}
                      alt=""
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                  <div
                    className="mt-3"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    {c.name.length > 23 ? `${c.name.slice(0, 23)}...` : c.name}
                  </div>
                  <div>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(c.price)}
                  </div>
                  <div className="mt-3">
                  <button
                        className="button-81"
                        onClick={() => handleAddProductToCart(c.id)}
                      >
                        Chi tiết
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
export default CategoryApp;
