import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
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
import { getAllUser } from "./actions/user.action";
import Error from "./pages/404";
import { getAllProduct, getLikeProduct, getProductNumber } from "./actions/product.action";
import { isEmpty } from "./utils/utils";
import { getCarts } from "./actions/cart.action";
import PrivacyPolicy from "./pages/PrivacyPolicy";


function RouteWrapper({ children }) {
  
  const currentUser = useSelector((state) => state.currentUserReducer.user)
  const dispatch = useDispatch()
  const location = useLocation();


  const scrollToTop = () => {
    const scrollStep = -window.scrollY / (100 / 15); // 500 est la durée de l'animation en millisecondes
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  }

  useEffect(() => {
    scrollToTop()
    dispatch(sessionIsValid())
    dispatch(getAllUser())
    dispatch(getProductNumber())
    dispatch(getAllProduct())
    dispatch(getCarts())
    dispatch(getLikeProduct())
  }, [location]);
  
  useEffect(() => {
    !isEmpty(currentUser) ? dispatch(getLikeProduct(currentUser.id)) : null
  }, [currentUser])

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
                <Route path="/privacy-policy" element={<PrivacyPolicy />}/>
                <Route path="/*" element={<Error />}/>
              </Routes>
          </RouteWrapper>
      </BrowserRouter>
    </>
  )
}
