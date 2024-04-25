import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/UI/Layout/Home.jsx";
import Login from "./Components/UI/Login/Login.jsx";
import Cart from "./Components/UI/cart/Cart.jsx";
import Layout from "./common/Layout";
import Categories from "./Components/UI/product/category/Collections";
import ProductDetail from "./Components/UI/product/ProductDetail.jsx";
import Checkout from "./Components/UI/checkout/Checkout.jsx";
import CategoryApp from "./Components/UI/product/category/CategoryApp.jsx";
import Register from "./Components/UI/Regesister/Register.jsx";
import { isLogin } from "./common/render.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, userActions } from "./redux/slide/user-slice.jsx";
import { findUserInfo } from "./services/user.jsx";
function App() {
  const userInfo = useSelector(getUserInfo);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!userInfo.userName) {
      findUserInfo()
        .then((res) => {
          dispatch(userActions.setUserInfo(res));
        })
        .catch(() => {})
        .finally(() => {
          setLoading(true);
        });
    }
  }, []);
  if (!loading) return <div>loading....</div>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/collections" element={<Categories />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:id" element={<CategoryApp />} />
          {isLogin(userInfo) && (
            <>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </>
          )}
        </Route>

        {!isLogin(userInfo) && <Route path="/login" element={<Login />} />}
        <Route path="/signup" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
