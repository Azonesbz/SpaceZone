import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Welcome from "./Welcome";
import Dashboard from "./Dashboard";
import ProductId from "./product/[productId]";
import CreateProduct from "./CreateProduct";

export default function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/product/:id" element={<ProductId />}/>
            <Route path="/product/new" element={<CreateProduct />}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}
