import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import CreateProduct from "./pages/CreateProduct";
import Profil from "./pages/Profil";
import ProductId from "./pages/product/[productId]";
import { useDispatch } from "react-redux";
import { sessionIsValid } from "./actions/session.action";


export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(sessionIsValid())
  }, []);
  
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/product/:id" element={<ProductId />}/>
            <Route path="/product/new" element={<CreateProduct />}/>
            <Route path="/profil" element={<Profil />}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}
