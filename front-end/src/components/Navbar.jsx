  import { Link } from "react-router-dom";
  import { FaUserCircle } from "react-icons/fa";


  function Navbar({ search, setSearch }) {

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

        
        <h2>🛒 E-Commerce</h2>

        <div className="search-container">
          <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search Products..." className="nav-search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>

        <div style={{marginTop:"20px"}}>
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
            <button>My Orders</button>
          </Link>

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
      </nav>
    );
  }

  export default Navbar;