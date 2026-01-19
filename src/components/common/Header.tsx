import { NavLink } from "react-router-dom";
import Container from "./Container";

export default function Header() {
  return (
    <header className="app-header">
      <Container>
        <div className="header-content">
          <NavLink className="brand" to="/">
            UsPetMile
          </NavLink>
          <nav className="nav-links">
            <NavLink to="/places">Places</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </nav>
        </div>
      </Container>
    </header>
  );
}
