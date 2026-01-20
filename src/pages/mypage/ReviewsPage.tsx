import Container from "../../components/common/Container";

export default function ReviewsPage() {
  return (
    <section className="page">
      <Container>
        <h1 className="hero-title">내 리뷰</h1>
        <div className="empty-state">작성한 리뷰가 아직 없습니다.</div>
      </Container>
    </section>
  );
}
