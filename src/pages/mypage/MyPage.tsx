import { useNavigate, Link } from "react-router-dom";
import Container from "../../components/common/Container";
import { authService } from "../../services/authService";
import "../../styles/mypage.css";

export default function MyPage() {
  const navigate = useNavigate();
  const user = authService.getUser();

  if (!user) {
    navigate("/login");
    return null;
  }

  const stats = {
    favorites: 12,
    reviews: 5,
    pets: 1,
  };

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      authService.logout();
      navigate("/");
    }
  };

  return (
    <section className="page" style={{ background: "transparent" }}>
      <Container className="mypage-container">
        {/* Header */}
        <div className="mypage-header">
          <div className="mypage-avatar">
            <i className="ph-fill ph-user"></i>
          </div>
          <div className="mypage-info">
            <h1>{user.name}님, 안녕하세요!</h1>
            <p>{user.email}</p>
            <Link to="/mypage/profile" className="text-sm text-blue-400 font-medium hover:underline mt-1 inline-block">
              프로필 수정 &gt;
            </Link>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          <Link to="/mypage/profile" className="dashboard-card">
            <div>
              <i className="ph-fill ph-paw-print dashboard-icon"></i>
              <div className="dashboard-label">내 반려동물</div>
              <div className="dashboard-count">{stats.pets}마리 등록됨</div>
            </div>
            <div className="text-right text-gray-400">
              <i className="ph-bold ph-arrow-right"></i>
            </div>
          </Link>

          <Link to="/mypage/favorites" className="dashboard-card">
            <div>
              <i className="ph-fill ph-heart dashboard-icon text-red-500"></i>
              <div className="dashboard-label">찜한 장소</div>
              <div className="dashboard-count">{stats.favorites}개</div>
            </div>
            <div className="text-right text-gray-400">
              <i className="ph-bold ph-arrow-right"></i>
            </div>
          </Link>

          <Link to="/mypage/reviews" className="dashboard-card">
            <div>
              <i className="ph-fill ph-star dashboard-icon text-yellow-500"></i>
              <div className="dashboard-label">나의 리뷰</div>
              <div className="dashboard-count">{stats.reviews}개 작성</div>
            </div>
            <div className="text-right text-gray-400">
              <i className="ph-bold ph-arrow-right"></i>
            </div>
          </Link>
        </div>

        {/* Account Actions */}
        <div className="bg-[#111] rounded-lg shadow-sm border border-[#333] overflow-hidden transition-colors hover:border-[#555]">
          <button
            onClick={handleLogout}
            className="w-full text-left px-6 py-4 hover:bg-[#222] flex items-center justify-between group transition-colors"
          >
            <span className="font-medium text-gray-300 group-hover:text-white">로그아웃</span>
            <i className="ph ph-sign-out text-gray-500 group-hover:text-white"></i>
          </button>
        </div>
      </Container>
    </section>
  );
}
