import Container from "../../components/common/Container";

export default function AdminPlacesPage() {
  return (
    <section className="page">
      <Container>
        <h1 className="hero-title">장소 관리</h1>
        <div className="empty-state">등록된 장소 목록이 여기에 표시됩니다.</div>
      </Container>
    </section>
  );
}
