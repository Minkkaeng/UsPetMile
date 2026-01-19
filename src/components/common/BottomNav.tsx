import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__inner">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/places">Places</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </nav>
  );
}
