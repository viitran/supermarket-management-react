import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/UI/Layout/Home.jsx";
import Login from "./Components/UI/Login/Login.jsx";
import Cart from "./Components/UI/cart/Cart.jsx";
import Layout from './common/Layout';
import Categories from './Components/UI/product/category/Collections';
import ProductDetail from "./Components/UI/product/ProductDetail.jsx";
import Checkout from './Components/UI/checkout/Checkout.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index path="/" element={<Home />} />
        <Route path="/collections" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
