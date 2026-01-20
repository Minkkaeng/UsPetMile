import Container from "../../components/common/Container";

export default function FavoritesPage() {
  return (
    <section className="page">
      <Container>
        <h1 className="hero-title">찜 목록</h1>
        <div className="empty-state">찜한 장소가 아직 없습니다.</div>
      </Container>
    </section>
  );
}
