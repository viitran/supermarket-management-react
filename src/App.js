import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/UI/Layout/Home.jsx";
import Login from "./Components/UI/Login/Login.jsx";
import Categories from './Components/UI/Layout/Collections.jsx';
import Cart from "./Components/UI/cart/Cart.jsx";
import Layout from "./Components/UI/Layout/Layout.jsx";
import ProductDetail from "./Components/UI/product/ProductDetail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/collections" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
