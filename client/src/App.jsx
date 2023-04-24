import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import CreateProduct from "./pages/CreateProduct";
import Profil from "./pages/Profil";
import Carts from "./pages/Carts";
import ProductId from "./pages/product/[productId]";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { sessionIsValid } from "./actions/session.action";


function RouteWrapper({ children }) {
  
  const dispatch = useDispatch()
  const location = useLocation();

  useEffect(() => {
    dispatch(sessionIsValid());
    
  }, [location]);

  return <>{children}</>;
}

export default function App() {

  return (
    <>
      <BrowserRouter>
          <RouteWrapper>
              <Routes>
                <Route path="/" element={<Welcome />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/product/:id" element={<ProductId />}/>
                <Route path="/product/new" element={<CreateProduct />}/>
                <Route path="/profil" element={<Profil />}/>
                <Route path="/carts" element={<Carts />}/>
              </Routes>
          </RouteWrapper>
      </BrowserRouter>
    </>
  )
}
