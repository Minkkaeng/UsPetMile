import Container from "../../components/common/Container";
import "../../styles/mypage.css";

export default function ReviewsPage() {
  return (
    <section className="page bg-black min-h-screen text-white">
      <Container className="mypage-container">
        <h1 className="section-title text-white" style={{ fontSize: "1.75rem", marginBottom: "2rem" }}>
          내 리뷰
        </h1>
        <div className="bg-[#111] border border-[#333] rounded-lg p-12 text-center text-gray-500">
          <i className="ph ph-pencil-slash text-4xl mb-4 block mx-auto opacity-50"></i>
          작성한 리뷰가 아직 없습니다.
        </div>
      </Container>
    </section>
  );
}
