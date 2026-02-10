import Container from "../../components/common/Container";
import "../../styles/mypage.css";

export default function FavoritesPage() {
  return (
    <section className="page bg-black min-h-screen text-white">
      <Container className="mypage-container">
        <h1 className="section-title text-white" style={{ fontSize: "1.75rem", marginBottom: "2rem" }}>
          찜 목록
        </h1>
        <div className="bg-[#111] border border-[#333] rounded-lg p-12 text-center text-gray-500">
          <i className="ph ph-heart-break text-4xl mb-4 block mx-auto opacity-50"></i>
          찜한 장소가 아직 없습니다.
        </div>
      </Container>
    </section>
  );
}
