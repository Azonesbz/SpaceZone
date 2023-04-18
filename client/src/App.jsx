import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Welcome from "./Welcome";
import Dashboard from "./Dashboard";
import ProductId from "./product/[productId]";
import CreateProduct from "./CreateProduct";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sessionIsValid } from "./actions/user.action";
import { useState } from "react";

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
