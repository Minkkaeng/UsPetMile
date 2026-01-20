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
          <div className="home-slice">
            <div className="home-slice__info">
              <h2>Plan the next trip</h2>
              <p className="muted">동반 조건을 먼저 선택하고, 그 다음 장소를 비교하세요.</p>
              <Link className="button button-ghost" to="/places">
                추천 보기
              </Link>
            </div>
            <div className="home-slice__media">
              <img
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80"
                alt="강아지"
              />
              <img
                src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80"
                alt="고양이"
              />
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
          <div className="home-image-grid">
            <div className="home-image-grid__item">
              <img
                src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=900&q=80"
                alt="산책"
              />
            </div>
            <div className="home-image-grid__item">
              <img
                src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80"
                alt="고양이"
              />
            </div>
            <div className="home-image-grid__item">
              <img
                src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80"
                alt="야외"
              />
            </div>
            <div className="home-image-grid__item">
              <img
                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80"
                alt="숙소"
              />
            </div>
          </div>
        </Container>
      </section>
    </section>
  );
}
