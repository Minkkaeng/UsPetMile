import { Link } from "react-router-dom";
import Container from "../components/common/Container";

export default function HomePage() {
  return (
    <section className="home-scroll">
      <div className="full-bleed home-slide home-slide--hero">
        <div className="home-hero">
          <div className="home-hero__media">
            <video
              className="home-hero__video"
              src="/dog.mp4"
              autoPlay
              loop
              muted
              playsInline
              poster="https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1400&q=80"
            />
            <div className="home-hero__overlay">
              <h1>UsPetMile</h1>
              <p>travel with the family you love</p>
            </div>
            <div className="home-hero__badge">PET FRIENDLY</div>
          </div>
          <div className="home-hero__actions">
            <Link className="button button-primary" to="/places">
              Places
            </Link>
          </div>
        </div>
      </div>

      <section className="home-slide">
        <Container>
          <div className="home-info">
            <div className="home-info__card card">
              <p className="home-info__title">오늘의 추천 루트</p>
              <p className="muted">서울 성수 · 반려견 산책 루트 3곳 · 카페 포함</p>
              <Link className="button button-ghost" to="/places">
                루트 보기
              </Link>
            </div>
            <div className="home-info__card card">
              <p className="home-info__title">신규 등록</p>
              <p className="muted">이번 주에 새로 올라온 동반 가능 장소를 확인하세요.</p>
              <Link className="button button-ghost" to="/places">
                최신 장소
              </Link>
            </div>
          </div>
          <div className="home-strip">
            <div className="home-strip__item">
              <img
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80"
                alt="강아지"
              />
            </div>
            <div className="home-strip__item">
              <img
                src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80"
                alt="고양이"
              />
            </div>
            <div className="home-strip__item">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
                alt="여행 풍경"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="home-slide">
        <Container>
          <div className="home-guides">
            <div className="card home-guide">
              <p className="home-guide__title">이용 가이드</p>
              <ul className="muted">
                <li>카드의 동반 배지로 입장 가능 여부를 확인하세요.</li>
                <li>태그를 눌러 빠르게 취향별 장소를 모아보세요.</li>
                <li>상세 페이지에서 운영 규정과 포인트를 확인하세요.</li>
              </ul>
            </div>
            <div className="card home-guide">
              <p className="home-guide__title">공지사항</p>
              <div className="home-notice">
                <span className="muted">[공지] 10월 반려동물 동반 행사 안내</span>
                <span className="muted">[업데이트] 장소 상세 탭 기능 추가</span>
                <span className="muted">[점검] 10/20 02:00~03:00 시스템 점검</span>
              </div>
            </div>
          </div>

          <div className="home-grid">
            <article className="card home-card">
              <p className="home-card__title">동반 OK 큐레이션</p>
              <p className="muted">정책이 확인된 장소만 모아 신뢰 있게 안내합니다.</p>
            </article>
            <article className="card home-card">
              <p className="home-card__title">실시간 필터</p>
              <p className="muted">지역, 카테고리, 태그를 조합해 빠르게 찾을 수 있어요.</p>
            </article>
            <article className="card home-card">
              <p className="home-card__title">여정 정리</p>
              <p className="muted">관심 장소를 저장하고 루트를 쉽게 구성하세요.</p>
            </article>
          </div>
        </Container>
      </section>
    </section>
  );
}
