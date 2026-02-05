import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/common/BottomNav";
import Header from "../components/common/Header";

export default function RootLayout() {
  const location = useLocation();
  return (
    <div className="app-shell">
      {location.pathname !== "/" && <Header />}
      <main>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
