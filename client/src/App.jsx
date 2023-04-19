import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import CreateProduct from "./pages/CreateProduct";
import ProductId from "./pages/product/[productId]";


export default function App() {
  const [session, setSession] = useState(false)
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setSession(true);
    } else {
      setSession(false);
    }
  }, [window.localStorage]);
  
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />}/>
            <Route path="/home" element={<Home session={session} />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/product/:id" element={<ProductId />}/>
            <Route path="/product/new" element={<CreateProduct />}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}
