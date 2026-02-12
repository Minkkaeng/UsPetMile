import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const ParticleCanvas = ({ isExploding }: { isExploding: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const isExplodingRef = useRef(isExploding);

  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    opacity: number;
    maxSize: number;
    isMouseFollower: boolean;
    isBurst: boolean;

    constructor(x?: number, y?: number, isMouseFollower = false, isBurst = false) {
      this.x = x ?? Math.random() * window.innerWidth;
      this.y = y ?? Math.random() * window.innerHeight;
      this.isMouseFollower = isMouseFollower;
      this.isBurst = isBurst;
      this.size = isMouseFollower ? Math.random() * 1.5 + 0.2 : Math.random() * 2 + 0.5;
      this.maxSize = isMouseFollower
        ? isBurst
          ? Math.random() * 10 + 5
          : Math.random() * 2 + 1
        : Math.random() * 4 + 2;

      let speedMult = isBurst ? 8 : isMouseFollower ? 0.4 : 0.8;
      this.speedX = (Math.random() - 0.5) * speedMult;
      this.speedY = (Math.random() - 0.5) * speedMult;

      this.color =
        isMouseFollower || isBurst
          ? `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.6})`
          : `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.4})`;
      this.opacity = Math.random() * 0.5 + 0.5;
    }

    update(width: number, height: number) {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.size < this.maxSize) {
        this.size += 0.05;
      } else {
        let fadeSpeed = this.isBurst ? 0.015 : this.isMouseFollower ? 0.04 : 0.01;
        this.opacity -= fadeSpeed;
      }

      if (this.x > width || this.x < 0) this.speedX *= -1;
      if (this.y > height || this.y < 0) this.speedY *= -1;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.isBurst ? 25 : 15;
      ctx.shadowColor = "#ffffff";
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.restore();
    }
  }

  useEffect(() => {
    isExplodingRef.current = isExploding;
    if (isExploding) {
      setTimeout(() => {
        for (let i = 0; i < 150; i++) {
          particlesRef.current.push(new Particle(window.innerWidth / 2, window.innerHeight / 2, true, true));
        }
      }, 100);
    }
  }, [isExploding]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: -100, y: -100 };

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      for (let i = 0; i < 5; i++) {
        particlesRef.current.push(new Particle(mouse.x, mouse.y, true));
      }
    };

    const init = () => {
      particlesRef.current = [];
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((particle, index) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
        if (particle.opacity <= 0) {
          if (particle.isMouseFollower || particle.isBurst) {
            particlesRef.current.splice(index, 1);
          } else {
            particlesRef.current[index] = new Particle();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-1 pointer-events-none" style={{ opacity: 0.8 }} />;
};

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  // Check if intro has already played in this session to avoid repeats
  const [isLoaded, setIsLoaded] = useState(() => {
    return sessionStorage.getItem("introPlayed") === "true";
  });

  useEffect(() => {
    // Initial cinematic reveal sequence - only if not played before
    let timer: any;

    if (!sessionStorage.getItem("introPlayed")) {
      timer = setTimeout(() => {
        setIsLoaded(true);
        sessionStorage.setItem("introPlayed", "true");
      }, 3000);
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll(".snap-section");
    sections.forEach((section) => observer.observe(section));

    // Lock body scroll to prevent double scrollbars with snap-container
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.body.style.overflow = "";
      // Cleanup header class when leaving homepage
      const header = document.querySelector(".app-header");
      header?.classList.remove("header-light");
    };
  }, []);

  // Sync header color with section background
  useEffect(() => {
    const header = document.querySelector(".app-header");
    if (!header) return;

    const lightSections = ["intro", "travel", "contact"];
    if (lightSections.includes(activeSection)) {
      header.classList.add("header-light");
    } else {
      header.classList.remove("header-light");
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home-wrapper">
      {/* CINEMATIC INTRO OVERLAY */}
      <div className={`intro-overlay ${isLoaded ? "hidden" : ""}`}>
        <div className={`intro-content ${isLoaded ? "scatter" : ""}`}>
          <div className="intro-text-wrapper">
            <span className="intro-brand-text">UsPetMile</span>
          </div>
          <div className="intro-line"></div>
        </div>
      </div>

      {/* SECTION NAVIGATION DOTS */}
      <nav className="section-nav">
        {["home", "intro", "travel", "app", "contact"].map((id) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`nav-dot ${activeSection === id ? "active" : ""}`}
            aria-label={`Scroll to ${id}`}
          />
        ))}
      </nav>

      <main className="snap-container" id="mainContainer">
        {/* SECTION 1: Hero */}
        <section className="snap-section bg-black" id="home">
          <video autoPlay muted loop playsInline className={`video-bg ${isLoaded ? "cinematic" : ""}`}>
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

          <ParticleCanvas isExploding={isLoaded} />

          <div className="video-overlay"></div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-14 py-24">
            <p className="hero-top-label animate-fade-up">TOGETHER EVERYWHERE</p>
            <div className="flex flex-col items-center gap-6">
              <h1 className={`hero-title ${isLoaded ? "cinematic" : "opacity-0"}`}>
                <div className="logo-row-top">
                  <span className="char-u">U</span>
                  <span className="char-s">S</span>
                </div>
                <div className="logo-row-bottom-horizontal">
                  <span className="logo-word-pet">Pet</span>
                  <span className="logo-word-mile">Mile</span>
                </div>
              </h1>
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
                대형견이라서 거절당하셨나요? 혹은 펫푸드 정보를 찾기 어려우셨나요? <br />
                우리는 반려동물의 크기, 견종, 성향에 맞춘 <br />
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
                  <div className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&q=80&w=1600"
                      className="w-full object-cover rounded-lg shadow-xl"
                      style={{
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                        height: "calc(24rem + 18rem + 1rem)",
                      }}
                      alt="Landscape Pet Travel"
                    />
                  </div>
                  <div className="space-y-4">
                    <img
                      src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=1200"
                      className="w-full object-cover rounded-lg shadow-xl"
                      style={{ height: "24rem", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      alt="Cool Cat"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=1200"
                      className="w-full object-cover rounded-lg shadow-xl"
                      style={{ height: "18rem", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      alt="Golden Retriever"
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

            <div className="grid md:grid-cols-3 gap-12 w-full mb-24">
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
                  위치 기반으로 주변 1km 내 동반 가능한 <br />
                  카페, 식당, 숙소를 즉시 찾아드립니다.
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
                  "대형견도 되나요?" 더 이상 묻지 마세요. <br />
                  몸무게, 견종별 허용 기준을 명확히 표시합니다.
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
                  복잡한 가입이나 결제 없이, <br />
                  업체 전화번호와 홈페이지로 직접 연결해 드립니다.
                </p>
              </div>
            </div>

            <div className="animate-fade-up w-full flex justify-center" style={{ marginTop: "120px" }}>
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
            <div className="footer-main-content">
              <div className="footer-info-section">
                <h3 className="font-mont footer-brand">UsPetMile</h3>
                <p className="footer-company-info">
                  (주)어스펫마일 | 대표: 최민경 <br />
                  사업자등록번호: 123-45-67890
                  <br />
                  통신판매업신고: 제 2025-포트폴리오
                  <br />
                  데모용 홈페이지
                  <br />
                  Email: choi90326@gmail.com
                </p>
              </div>

              <div className="footer-nav-section">
                <div className="footer-links-column">
                  <Link to="/main">서비스 메인</Link>
                  <Link to="/places">장소 찾기</Link>
                  <Link to="/membership">멤버십 안내</Link>
                </div>
                <div className="footer-links-column">
                  <a href="#intro">서비스 소개</a>
                  <a href="#">제휴 문의</a>
                  <a href="#">공지사항</a>
                </div>
              </div>

              <div className="footer-social-section">
                <div className="footer-social-row">
                  <a href="#" className="footer-social-link">
                    <i className="ph-fill ph-instagram-logo"></i>
                  </a>
                  <a href="#" className="footer-social-link">
                    <i className="ph-fill ph-youtube-logo"></i>
                  </a>
                  <a href="#" className="footer-social-link">
                    <i className="ph-fill ph-twitter-logo"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <div className="footer-legal-links">
                <a href="#" className="legal-link">
                  개인정보처리방침
                </a>
                <a href="#" className="legal-link">
                  이용약관
                </a>
              </div>
              <p className="footer-copyright">© 2024 UsPetMile.</p>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
