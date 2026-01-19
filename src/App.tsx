import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import PlacesPage from "./pages/PlacesPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">
          UsPetMile
        </NavLink>
        <nav className="nav">
          <NavLink to="/places">Places</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup" className="nav-cta">
            Signup
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/places/:id" element={<PlaceDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
