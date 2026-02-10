import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { authService } from "../../services/authService";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isLoggedIn());

  useEffect(() => {
    return authService.subscribe(() => {
      setIsLoggedIn(authService.isLoggedIn());
    });
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/main");
  };

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/#" + id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) => `nav-link ${isActive ? "active" : ""}`;

  return (
    <header className="app-header">
      <div className="header-content">
        {/* Logo Section */}
        <NavLink to="/" className="brand">
          UsPetMile
        </NavLink>

        {/* Categorized Navigation Group */}
        <nav className="nav-links hidden md:flex">
          {/* Group 1: Discovery */}
          <div className="nav-group">
            <NavLink to="/main" className={navItemClass}>
              Home
            </NavLink>
            <NavLink to="/places" className={navItemClass}>
              Places
            </NavLink>
          </div>

          <div className="nav-divider"></div>

          {/* Group 2: About / Sections */}
          <div className="nav-group">
            <span className="nav-link" onClick={() => scrollToSection("intro")}>
              About
            </span>
            <span className="nav-link" onClick={() => scrollToSection("travel")}>
              Travel
            </span>
            <span className="nav-link" onClick={() => scrollToSection("contact")}>
              Membership
            </span>
          </div>

          <div className="nav-divider"></div>

          {/* Group 3: User / Auth */}
          <div className="nav-group">
            {isLoggedIn ? (
              <>
                <NavLink to="/mypage" className={navItemClass}>
                  My Page
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="nav-link"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    font: "inherit",
                    textTransform: "inherit",
                    letterSpacing: "inherit",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navItemClass}>
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="nav-link"
                  style={{
                    padding: "0.5rem 1.25rem",
                    border: "1px solid white",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Join
                </NavLink>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          className="md:hidden"
          style={{ background: "transparent", border: "none", color: "white", fontSize: "1.5rem" }}
        >
          <i className="ph ph-list"></i>
        </button>
      </div>
    </header>
  );
}
