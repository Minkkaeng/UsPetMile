import { Link } from "react-router-dom";
import "../styles/home.css";

export default function HomePage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Custom Header for Home Page */}
      <header className="home-header">
        <div className="font-mont" style={{ fontSize: "1.5rem", fontWeight: 900 }}>
          UsPetMile
        </div>

        <nav className="home-nav hidden md:flex">
          <a className="nav-link" onClick={() => scrollToSection("intro")}>
            About
          </a>
          <a className="nav-link" onClick={() => scrollToSection("service")}>
            Travel & Food
          </a>
          <a className="nav-link" onClick={() => scrollToSection("app")}>
            App Flow
          </a>
          <a className="nav-link" onClick={() => scrollToSection("contact")}>
            Membership
          </a>
        </nav>

        <div className="flex items-center" style={{ gap: "1rem" }}>
          <Link
            to="/login"
            className="hidden md:block"
            style={{
              padding: "0.5rem 1.25rem",
              border: "1px solid white",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "white",
              background: "transparent",
              transition: "all 0.3s",
            }}
          >
            Login
          </Link>
          <button
            className="md:hidden"
            style={{ fontSize: "1.5rem", background: "transparent", border: "none", color: "white" }}
          >
            <i className="ph ph-list"></i>
          </button>
        </div>
      </header>

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

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <p
              className="animate-fade-up"
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.3em",
                marginBottom: "1rem",
                color: "#d1d5db",
              }}
            >
              TOGETHER EVERYWHERE
            </p>
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
            <div className="animate-fade-up delay-600">
              <button onClick={() => scrollToSection("intro")} className="cta-button">
                Explore Now <i className="ph ph-arrow-right"></i>
              </button>
            </div>
          </div>

          <div className="absolute animate-bounce text-white opacity-70" style={{ bottom: "2.5rem", left: "50%" }}>
            <i className="ph ph-caret-down" style={{ fontSize: "2rem" }}></i>
          </div>
        </section>

        {/* SECTION 2: Intro */}
        <section className="snap-section bg-white text-black" id="intro">
          <div className="max-w-6xl w-full px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2
                className="font-mont"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1 }}
              >
                WE KNOW
                <br />
                YOUR PET
              </h2>
              <div style={{ width: "4rem", height: "0.25rem", background: "black" }}></div>
              <p style={{ fontSize: "1.125rem", color: "#4b5563", fontWeight: 300, lineHeight: 1.6 }}>
                UsPetMile은 단순한 정보 제공을 넘어, <br />
                <strong>반려동물과의 라이프스타일</strong>을 제안합니다.
              </p>
              <p style={{ color: "#6b7280", lineHeight: 1.6 }}>
                대형견이라서 거절당하셨나요? 혹은 펫푸드 정보를 찾기 어려우셨나요? 우리는 반려동물의 크기, 견종, 성향에
                맞춘 <br />
                <strong>최적의 여행지와 맛집 데이터</strong>를 제공합니다.
              </p>
              <ul className="mt-4" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", transform: "translateY(2rem)" }}>
                <img
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1000&auto=format&fit=crop"
                  className="w-full object-cover rounded-lg grayscale hover:grayscale-0 transition duration-500"
                  style={{ height: "16rem", borderRadius: "0.5rem", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  alt="Dog Walking"
                />
                <img
                  src="https://images.unsplash.com/photo-1517635676447-3a480fbfd8f2?q=80&w=1000&auto=format&fit=crop"
                  className="w-full object-cover rounded-lg grayscale hover:grayscale-0 transition duration-500"
                  style={{ height: "12rem", borderRadius: "0.5rem", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  alt="Pet Cafe"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <img
                  src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1000&auto=format&fit=crop"
                  className="w-full object-cover rounded-lg grayscale hover:grayscale-0 transition duration-500"
                  style={{ height: "12rem", borderRadius: "0.5rem", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  alt="Cat Travel"
                />
                <img
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop"
                  className="w-full object-cover rounded-lg grayscale hover:grayscale-0 transition duration-500"
                  style={{ height: "16rem", borderRadius: "0.5rem", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  alt="Dog in Car"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Service */}
        <section className="snap-section bg-zinc-900 text-white" id="service">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
          ></div>

          <div className="relative z-10 max-w-7xl w-full px-6 flex flex-col items-center">
            <div className="text-center mb-16">
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  letterSpacing: "0.2em",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                }}
              >
                Seamless Experience
              </span>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "bold", marginTop: "0.5rem" }}>
                여행 준비, 단 3번의 터치로
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 w-full">
              {/* Card 1 */}
              <Link to="/places" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="glass-card">
                  <div
                    className="flex items-center justify-center bg-white text-black rounded-full mb-6"
                    style={{ width: "4rem", height: "4rem", fontSize: "1.875rem" }}
                  >
                    <i className="ph ph-magnifying-glass"></i>
                  </div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Smart Search</h3>
                  <p style={{ color: "#9ca3af", fontSize: "0.875rem", marginBottom: "1.5rem", lineHeight: 1.5 }}>
                    위치 기반으로 주변 1km 내 동반 가능한 카페, 식당, 숙소를 즉시 찾아드립니다.
                  </p>
                  <div
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      padding: "1rem",
                      borderRadius: "0.5rem",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      className="flex justify-between"
                      style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.5rem" }}
                    >
                      <span>Location</span>
                      <span>Filter</span>
                    </div>
                    <div
                      style={{
                        height: "0.5rem",
                        background: "#374151",
                        borderRadius: "9999px",
                        width: "75%",
                        marginBottom: "0.5rem",
                      }}
                    ></div>
                    <div
                      style={{ height: "0.5rem", background: "#374151", borderRadius: "9999px", width: "50%" }}
                    ></div>
                  </div>
                </div>
              </Link>

              {/* Card 2 */}
              <div className="glass-card" style={{ borderColor: "rgba(255,255,255,0.4)" }}>
                <div
                  className="flex items-center justify-center bg-white text-black rounded-full mb-6"
                  style={{ width: "4rem", height: "4rem", fontSize: "1.875rem" }}
                >
                  <i className="ph ph-paw-print"></i>
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Pet Detail</h3>
                <p style={{ color: "#9ca3af", fontSize: "0.875rem", marginBottom: "1.5rem", lineHeight: 1.5 }}>
                  "대형견도 되나요?" 더 이상 묻지 마세요. 몸무게, 견종별 허용 기준을 명확히 표시합니다.
                </p>
                <div
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      padding: "0.25rem 0.5rem",
                      background: "white",
                      color: "black",
                      fontSize: "0.75rem",
                      borderRadius: "0.25rem",
                      fontWeight: "bold",
                    }}
                  >
                    15kg 미만
                  </span>
                  <span
                    style={{
                      padding: "0.25rem 0.5rem",
                      background: "#1f2937",
                      color: "#d1d5db",
                      fontSize: "0.75rem",
                      borderRadius: "0.25rem",
                    }}
                  >
                    실내 동반
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="glass-card">
                <div
                  className="flex items-center justify-center bg-white text-black rounded-full mb-6"
                  style={{ width: "4rem", height: "4rem", fontSize: "1.875rem" }}
                >
                  <i className="ph ph-calendar-check"></i>
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Easy Booking</h3>
                <p style={{ color: "#9ca3af", fontSize: "0.875rem", marginBottom: "1.5rem", lineHeight: 1.5 }}>
                  펫 메뉴가 있는 식당 예약부터, 반려동물 전용 어메니티 선택까지 한 번에.
                </p>
                <button
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "white",
                    color: "black",
                    fontWeight: "bold",
                    borderRadius: "0.25rem",
                    fontSize: "0.875rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  예약 확정하기
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Contact & Footer */}
        <section className="snap-section bg-white text-black" style={{ justifyContent: "space-between" }} id="contact">
          <div
            className="flex-1 flex flex-col justify-center items-center text-center px-6 w-full max-w-4xl mx-auto"
            style={{ paddingTop: "100px" }}
          >
            <div className="mb-10">
              <i
                className="ph-fill ph-star"
                style={{ fontSize: "2.25rem", marginBottom: "1rem", display: "block", marginInline: "auto" }}
              ></i>
              <h2
                className="font-mont"
                style={{
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  fontWeight: 900,
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                }}
              >
                JOIN THE
                <br />
                CLUB
              </h2>
              <p style={{ fontSize: "1.25rem", color: "#4b5563", marginBottom: "2.5rem", lineHeight: 1.5 }}>
                UsPetMile 멤버십으로 전용 펫 푸드 할인과
                <br />
                시크릿 여행지 정보를 받아보세요.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  justifyContent: "center",
                  width: "100%",
                  maxWidth: "28rem",
                  margin: "0 auto",
                }}
              >
                <input type="email" placeholder="Email Address" className="input-email" />
                <button className="btn-black">Subscribe</button>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", opacity: 0.8 }}>
              <div
                style={{
                  height: "3rem",
                  width: "9rem",
                  background: "black",
                  borderRadius: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <i className="ph-fill ph-apple-logo" style={{ fontSize: "1.25rem", marginRight: "0.5rem" }}></i> App
                Store
              </div>
              <div
                style={{
                  height: "3rem",
                  width: "9rem",
                  background: "#e5e7eb",
                  borderRadius: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                <i className="ph-fill ph-google-play-logo" style={{ fontSize: "1.25rem", marginRight: "0.5rem" }}></i>{" "}
                Google Play
              </div>
            </div>
          </div>

          <footer
            style={{ width: "100%", background: "black", color: "white", padding: "2.5rem 1.5rem", marginTop: "auto" }}
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h3 className="font-mont" style={{ fontWeight: "bold", fontSize: "1.25rem", marginBottom: "0.25rem" }}>
                  UsPetMile
                </h3>
                <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>© 2024 UsPetMile. All rights reserved.</p>
              </div>

              <div style={{ display: "flex", gap: "1.5rem" }}>
                <a href="#" style={{ color: "#9ca3af" }}>
                  <i className="ph-fill ph-instagram-logo" style={{ fontSize: "1.5rem" }}></i>
                </a>
                <a href="#" style={{ color: "#9ca3af" }}>
                  <i className="ph-fill ph-youtube-logo" style={{ fontSize: "1.5rem" }}></i>
                </a>
                <a href="#" style={{ color: "#9ca3af" }}>
                  <i className="ph-fill ph-twitter-logo" style={{ fontSize: "1.5rem" }}></i>
                </a>
              </div>

              <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.75rem", color: "#9ca3af" }}>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}
