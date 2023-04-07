import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Authentification from "./Authentification";
import Dashboard from "./Dashboard";
import Header from "./components/Navbar";

export default function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/authentification" element={<Authentification />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}
