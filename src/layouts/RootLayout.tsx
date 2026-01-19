import { Outlet } from "react-router-dom";
import BottomNav from "../components/common/BottomNav";
import Container from "../components/common/Container";
import Header from "../components/common/Header";

export default function RootLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
