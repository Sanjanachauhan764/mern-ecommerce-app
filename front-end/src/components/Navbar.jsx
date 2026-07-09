import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";


  function Navbar({ search, setSearch, selectedCategory, setSelectedCategory }) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
    async function getCategories() {
        const res = await axios.get(
            "https://mern-ecommerce-app-qzaz.onrender.com/products"
        );
        const uniqueCategories = [
            "All",
            ...new Set(res.data.map(product => product.category))
        ];
        setCategories(uniqueCategories);
    }
    getCategories();
    }, []);

    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
  
    function logoutUser(){
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      window.location.href = "/login";
  }

    return (
      <nav className="navbar">
        <div className="nav-left">
        <h2>🛒 E-Commerce</h2>
        <div className="search-container">
          <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search Products..." className="nav-search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        <div>
        <select className="category-dropdown" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="All" style={{color:"white"}}>Categories</option>
              {
                  categories.map((category) => (
                      <option key={category} value={category}>
                          {category}
                      </option>
                  ))
              }
        </select>
        </div>
        </div>
        
        <div className="nav-center">
          <Link to="/">
            <button>Home</button>
          </Link>

          <Link to="/cart">
            <button>Cart</button>
          </Link>

          <Link to="/about">
            <button>About</button>
          </Link>

          <Link to="/contact">
            <button>Contact</button>
          </Link>

          <Link to="/admin">
            <button>Admin</button>
          </Link>

          <Link to="/orders">
            <button>Orders</button>
          </Link>
          </div>

          <div className="nav-right">
          {
            localStorage.getItem("role") === "admin" ? (
            <span className="profile-user">
              👑 Admin
            </span>
            ) : (
            <span className="profile-user">
                  {userName}
            </span>
            )
          }
           {
              localStorage.getItem("token") ? (
              <button onClick={logoutUser}>Logout</button>
            ) : (
              <>
              <Link to="/login">
              <button>Login</button>
              </Link>

              <Link to="/register">
              <button>Register</button>
              </Link>
              </>
            )
          }
          </div>
      </nav>
    );
  }

  export default Navbar;