import { Outlet } from "react-router-dom";
import BottomNav from "../components/common/BottomNav";
import Header from "../components/common/Header";
import ScrollToTop from "../components/common/ScrollToTop";

export default function RootLayout() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
