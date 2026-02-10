import { Link } from "react-router-dom";
import "../styles/home.css";

export default function HomePage() {
  return (
    <>
      <main className="snap-container" id="mainContainer">
        {/* SECTION 1: Hero */}
        <section className="snap-section bg-black" id="home">
          <video autoPlay muted loop playsInline className="video-bg">
            <source
              src="https://videos.pexels.com/video-files/3722977/3722977-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
            <img
              src="https://images.unsplash.com/photo-1534361960057-19f20438c290?q=80&w=2576&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale"
              alt="Running Dog"
            />
          </video>

          <div className="video-overlay"></div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-14 py-24">
            <p className="hero-top-label animate-fade-up">TOGETHER EVERYWHERE</p>
            <div className="flex flex-col items-center gap-6">
              <h1 className="hero-title animate-fade-up delay-200">
                US
                <br />
                PET
                <br />
                MILE
              </h1>
              <p className="hero-subtitle animate-fade-up delay-400">
                반려동물과 함께하는 모든 순간이 여행이 되도록.
                <br />
                엄선된 펫 프렌들리 공간을 경험하세요.
              </p>
            </div>

            <div className="animate-fade-up delay-600">
              <Link to="/main" className="cta-button">
                지금 둘러보기 <i className="ph ph-arrow-right"></i>
              </Link>
            </div>
          </div>

          <div className="scroll-indicator animate-bounce">
            <i className="ph ph-caret-down"></i>
          </div>
        </section>

        {/* SECTION 2: Intro */}
        <section className="snap-section bg-white text-black" id="intro">
          <div className="max-w-6xl w-full px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-mont section-big-title">
                WE KNOW
                <br />
                YOUR PET
              </h2>
              <div className="section-divider"></div>
              <p className="section-intro-text">
                UsPetMile은 단순한 정보 제공을 넘어, <br />
                <strong>반려동물과의 라이프스타일</strong>을 제안합니다.
              </p>
              <p className="section-body-text">
                대형견이라서 거절당하셨나요? 혹은 펫푸드 정보를 찾기 어려우셨나요? 우리는 반려동물의 크기, 견종, 성향에
                맞춘 <br />
                <strong>최적의 여행지와 맛집 데이터</strong>를 제공합니다.
              </p>
              <ul className="mt-4 feature-list">
                <li className="flex items-center" style={{ gap: "0.75rem" }}>
                  <i className="ph-fill ph-check-circle" style={{ fontSize: "1.25rem" }}></i>
                  <span>100% 검증된 펫 동반 장소</span>
                </li>
                <li className="flex items-center" style={{ gap: "0.75rem" }}>
                  <i className="ph-fill ph-check-circle" style={{ fontSize: "1.25rem" }}></i>
                  <span>반려견 크기별 필터링 (소형/중형/대형)</span>
                </li>
                <li className="flex items-center" style={{ gap: "0.75rem" }}>
                  <i className="ph-fill ph-check-circle" style={{ fontSize: "1.25rem" }}></i>
                  <span>실시간 예약 및 펫 메뉴 확인</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="img-col translate-up">
                <img
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800"
                  className="w-full object-cover rounded-lg grayscale hover:grayscale-0 transition duration-500"
                  style={{ height: "24rem", borderRadius: "0.5rem", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  alt="Dog"
                />
                <img
                  src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800"
                  className="w-full object-cover rounded-lg grayscale hover:grayscale-0 transition duration-500"
                  style={{ height: "18rem", borderRadius: "0.5rem", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  alt="Pet Cafe"
                />
              </div>
              <div className="img-col">
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800"
                  className="w-full object-cover rounded-lg grayscale hover:grayscale-0 transition duration-500"
                  style={{ height: "18rem", borderRadius: "0.5rem", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  alt="Cat"
                />
                <img
                  src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800"
                  className="w-full object-cover rounded-lg grayscale hover:grayscale-0 transition duration-500"
                  style={{ height: "24rem", borderRadius: "0.5rem", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  alt="Dog in Car"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Travel & Food */}
        <section className="snap-section bg-zinc-100 text-black" id="travel">
          <div className="max-w-7xl w-full px-6 flex flex-col justify-center h-full">
            <div className="grid md:grid-cols-2 gap-12 items-center h-full">
              <div className="order-2 md:order-1 relative h-full max-h-[80vh] w-full">
                <div className="grid grid-cols-2 gap-4 h-full content-center">
                  <div className="space-y-4 translate-y-8">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800"
                      className="w-full aspect-[3/5] object-cover rounded-lg shadow-xl"
                      style={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      alt="Pet Friendly Cafe"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800"
                      className="w-full aspect-[3/4] object-cover rounded-lg shadow-xl"
                      style={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      alt="Pet Food"
                    />
                  </div>
                  <div className="space-y-4 -translate-y-8">
                    <img
                      src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=800"
                      className="w-full aspect-[3/4] object-cover rounded-lg shadow-xl"
                      style={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      alt="Pet Hotel"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=800"
                      className="w-full aspect-[3/5] object-cover rounded-lg shadow-xl"
                      style={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      alt="Pet Travel"
                    />
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2 space-y-8 text-center md:text-left p-6">
                <span className="premium-label">Premium Lifestyle</span>
                <h2 className="font-mont section-big-title no-leading">
                  TRAVEL <br /> & DELICIOUS
                </h2>
                <p className="section-intro-text text-gray">
                  반려동물과 함께하는 여행은 더 이상 <br className="hidden md:block" />
                  포기해야 하는 것이 아닙니다.
                </p>
                <p className="section-body-text-alt">
                  UsPetMile은 5성급 펫 프렌들리 호텔부터 <br />
                  미슐랭 셰프가 만드는 펫 다이닝까지, <br />
                  당신과 반려동물을 위한 최고의 장소만을 큐레이션합니다.
                </p>
                <Link to="/places" className="btn-black-inline">
                  컬렉션 보기 <i className="ph ph-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: App Flow */}
        <section className="snap-section bg-zinc-900 text-white" id="app">
          <div className="section-texture"></div>

          <div className="relative z-10 max-w-7xl w-full px-6 flex flex-col items-center">
            <div className="text-center mb-16">
              <span className="premium-label light">Seamless Experience</span>
              <h2 className="section-mid-title">여행 준비, 단 3번의 터치로</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 w-full mb-16">
              {/* Card 1 */}
              <div className="glass-card flex flex-col h-full">
                <div
                  className="flex items-center justify-center bg-white text-black rounded-full mb-6 mx-auto"
                  style={{ width: "4rem", height: "4rem", fontSize: "1.875rem" }}
                >
                  <i className="ph ph-magnifying-glass"></i>
                </div>
                <h3 className="text-center" style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
                  스마트 검색
                </h3>
                <p
                  className="text-center"
                  style={{ color: "#9ca3af", fontSize: "0.875rem", marginBottom: "1.5rem", lineHeight: 1.5 }}
                >
                  위치 기반으로 주변 1km 내 동반 가능한 카페, 식당, 숙소를 즉시 찾아드립니다.
                </p>
              </div>

              {/* Card 2 */}
              <div className="glass-card flex flex-col h-full border-light">
                <div
                  className="flex items-center justify-center bg-white text-black rounded-full mb-6 mx-auto"
                  style={{ width: "4rem", height: "4rem", fontSize: "1.875rem" }}
                >
                  <i className="ph ph-paw-print"></i>
                </div>
                <h3 className="text-center" style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
                  펫 맞춤 정보
                </h3>
                <p
                  className="text-center"
                  style={{ color: "#9ca3af", fontSize: "0.875rem", marginBottom: "1.5rem", lineHeight: 1.5 }}
                >
                  "대형견도 되나요?" 더 이상 묻지 마세요. 몸무게, 견종별 허용 기준을 명확히 표시합니다.
                </p>
              </div>

              {/* Card 3 */}
              <div className="glass-card flex flex-col h-full">
                <div
                  className="flex items-center justify-center bg-white text-black rounded-full mb-6 mx-auto"
                  style={{ width: "4rem", height: "4rem", fontSize: "1.875rem" }}
                >
                  <i className="ph ph-phone-call"></i>
                </div>
                <h3 className="text-center" style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
                  직접 연결
                </h3>
                <p
                  className="text-center"
                  style={{ color: "#9ca3af", fontSize: "0.875rem", marginBottom: "1.5rem", lineHeight: 1.5 }}
                >
                  복잡한 가입이나 결제 없이, 업체 전화번호와 홈페이지로 직접 연결해 드립니다.
                </p>
              </div>
            </div>

            <div className="animate-fade-up">
              <Link to="/main" className="cta-button" style={{ textDecoration: "none" }}>
                여행 시작하기 <i className="ph ph-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 4: Contact & Footer */}
        <section className="snap-section bg-white text-black justify-between" id="contact">
          <div className="contact-content-wrapper">
            <div>
              <i className="ph-fill ph-star contact-star"></i>
              <h2 className="font-mont contact-title">
                JOIN THE
                <br />
                CLUB
              </h2>
              <p className="contact-subtitle">
                UsPetMile 멤버십으로 전용 펫 푸드 할인과
                <br />
                시크릿 여행지 정보를 받아보세요.
              </p>

              <div className="contact-form-wrapper">
                <input type="email" placeholder="이메일 주소" className="input-email" />
                <button className="btn-black">구독하기</button>
              </div>
            </div>

            <div className="contact-social-row">
              <div className="app-store-btn">
                <i className="ph-fill ph-apple-logo app-icon"></i> App Store
              </div>
              <div className="app-store-btn">
                <i className="ph-fill ph-google-play-logo app-icon"></i> Google Play
              </div>
            </div>
          </div>

          <footer className="home-footer">
            <div className="max-w-7xl mx-auto">
              <div className="footer-main-content">
                <div className="footer-info-section">
                  <h3 className="font-mont footer-brand">UsPetMile</h3>
                  <p className="footer-company-info">
                    (주)어스펫마일 | 대표: 최민경 | 사업자등록번호: 123-45-67890
                    <br />
                    통신판매업신고: 제 2024-서울강남-1234호
                    <br />
                    서울특별시 강남구 테헤란로 123 펫타워 8층
                    <br />
                    Email: contact@uspetmile.com | Tel: 1588-1234
                  </p>
                </div>

                <div className="footer-nav-section">
                  <div className="footer-nav-group">
                    <div className="footer-links-column">
                      <Link to="/main">서비스 메인</Link>
                      <Link to="/places">장소 찾기</Link>
                      <Link to="/membership">멤버십 안내</Link>
                    </div>
                  </div>
                  <div className="footer-nav-group">
                    <div className="footer-links-column">
                      <a href="#intro">서비스 소개 (About Us)</a>
                      <a href="#">제휴 문의</a>
                      <a href="#">공지사항</a>
                    </div>
                  </div>
                </div>

                <div className="footer-social-section">
                  <div className="footer-social-row">
                    <a href="#" className="footer-social-link">
                      <i className="ph-fill ph-instagram-logo footer-icon"></i>
                    </a>
                    <a href="#" className="footer-social-link">
                      <i className="ph-fill ph-youtube-logo footer-icon"></i>
                    </a>
                    <a href="#" className="footer-social-link">
                      <i className="ph-fill ph-twitter-logo footer-icon"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="footer-bottom">
                <p className="footer-copyright">© 2024 UsPetMile. All rights reserved.</p>
                <div className="footer-legal-links">
                  <a href="#" className="legal-link">
                    개인정보처리방침
                  </a>
                  <a href="#" className="legal-link">
                    이용약관
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}
