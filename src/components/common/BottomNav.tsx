import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__inner">
        <NavLink
          to="/main"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 ${isActive ? "text-white" : "text-gray-500"}`
          }
        >
          <i className="ph ph-house text-2xl mb-1"></i>
          <span className="text-xs">홈</span>
        </NavLink>
        <NavLink
          to="/places"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 ${isActive ? "text-white" : "text-gray-500"}`
          }
        >
          <i className="ph ph-magnifying-glass text-2xl mb-1"></i>
          <span className="text-xs">검색</span>
        </NavLink>
        <NavLink
          to="/mypage"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 ${isActive ? "text-white" : "text-gray-500"}`
          }
        >
          <i className="ph ph-user text-2xl mb-1"></i>
          <span className="text-xs">마이</span>
        </NavLink>
      </div>
    </nav>
  );
}
