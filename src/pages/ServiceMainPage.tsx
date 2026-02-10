import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/common/Container";
import "../styles/service-main.css";

export default function ServiceMainPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/places?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/places");
    }
  };

  const categories = [
    { id: "hotel", name: "숙소", icon: "ph-bed" },
    { id: "cafe", name: "카페", icon: "ph-coffee" },
    { id: "dining", name: "맛집", icon: "ph-bowl-food" },
    { id: "playground", name: "운동장", icon: "ph-soccer-ball" },
    { id: "hospital", name: "병원", icon: "ph-first-aid" },
    { id: "beauty", name: "미용", icon: "ph-scissors" },
  ];

  return (
    <div className="service-main">
      {/* Hero Section */}
      <section className="hero-wrapper">
        <div className="hero-content">
          <span className="hero-tag">Us Pet Mile Premium</span>
          <form onSubmit={handleSearch} className="search-container">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="장소, 분위기, 지역으로 검색..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-button">
                <i className="ph-bold ph-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
      </section>

      <Container className="service-content-container">
        {/* Categories Section */}
        <section className="categories-section-wrapper">
          <div className="section-header">
            <h2 className="section-title">카테고리</h2>
            <Link to="/places" className="view-all">
              전체보기 <i className="ph-bold ph-caret-right"></i>
            </Link>
          </div>
          <div className="category-grid">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/places?category=${cat.id}`} className="category-card">
                <div className="cat-icon-wrapper">
                  <i className={`ph-fill ${cat.icon}`}></i>
                </div>
                <span className="category-name">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Bento Grid Collections */}
        <section className="curation-section">
          <div className="section-header">
            <h2 className="section-title">이달의 큐레이션</h2>
          </div>

          <div className="bento-grid">
            {/* Primary Large Item */}
            <Link to="/places" className="bento-item item-large">
              <img
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop"
                className="bento-img"
                alt="Glamping"
              />
              <div className="bento-overlay">
                <span className="bento-tag">Season Special</span>
                <h3 className="bento-title">
                  댕댕이와 함께하는
                  <br /> 가을 글램핑 BEST 5
                </h3>
                <p className="bento-desc">선선한 가을 바람과 밤하늘의 별을 함께 즐기는 우리들만의 힐링 캠프</p>
              </div>
            </Link>

            {/* Top Small Item */}
            <Link to="/places" className="bento-item item-small">
              <img
                src="https://images.unsplash.com/photo-1551717743-49959800b1f6?q=80&w=1000&auto=format&fit=crop"
                className="bento-img"
                alt="Luxury Hotel"
              />
              <div className="bento-overlay compact">
                <span className="bento-tag">Premium</span>
                <h3 className="bento-title size-large">프리미엄 펫 호텔</h3>
                <p className="bento-desc">최고급 서비스와 반려견 전용 어메니티</p>
              </div>
            </Link>

            {/* Bottom Accent Item */}
            <Link to="/places" className="bento-item item-small item-accent">
              <div className="bento-overlay accent-content">
                <div className="badge-new">NEW FEATURE</div>
                <h3 className="bento-title accent-title">
                  실시간 우리동네
                  <br />펫 프렌들리 지도
                </h3>
                <p className="bento-desc-accent">현재 위치 기반 가장 가까운 펫 카페를 찾아보세요.</p>
                <div className="explore-link">
                  지도로 탐색하기 <i className="ph-bold ph-arrow-right"></i>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* High Engagement CTA */}
        <section className="cta-banner">
          <div className="cta-glow glow-top"></div>
          <div className="cta-glow glow-bottom"></div>

          <div className="cta-content-wrapper">
            <h2 className="cta-title">우리 아이 프로필 등록</h2>
            <p className="cta-subtitle">
              단 1분이면 완료! <br />
              아이의 성격과 크기에 딱 맞는 <span className="text-highlight">최적의 장소</span>를 추천해 드립니다.
            </p>
            <div className="cta-features">
              <div className="cta-feature-item">
                <i className="ph-fill ph-check-circle accent-icon"></i> 맞춤 추천
              </div>
              <div className="cta-feature-item">
                <i className="ph-fill ph-check-circle accent-icon"></i> 제휴 할인
              </div>
            </div>
          </div>

          <div className="cta-button-wrapper interactive">
            <Link to="/mypage/profile" className="premium-btn">
              시작하기 <i className="ph-bold ph-arrow-right"></i>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
