  import { Link } from "react-router-dom";


  function Navbar({ search, setSearch }) {
  
    function logoutUser(){
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
  }

    return (
      <nav className="navbar">

        <h2>🛒 E-Commerce</h2>

        <div className="search-container">
          <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search Products..." className="nav-search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>


        <div>
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