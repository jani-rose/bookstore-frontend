import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("access");

  const isActive = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  const handleLogout = async () => {
    const refresh = localStorage.getItem("refresh");
    try {
      if (refresh) {
        await API.post("/api/logout/", { refresh });
      }
    } catch {
      // blacklist may fail if token is already expired — still log out locally
    }
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          Book<span>Store</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/books" className={isActive("/books")}>
                My Books
              </Link>
              <button className="nav-btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={isActive("/login")}>
                Login
              </Link>
              <Link to="/register" className={isActive("/register")}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
