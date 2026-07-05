import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";

function AppContent() {

  const [search, setSearch] = useState("");
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideLayout && (
        <Navbar search={search} setSearch={setSearch} />
      )}
      <div className="main-content">
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      </div>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;