import { Link } from "react-router-dom";
import Container from "../components/common/Container";

type NotFoundPageProps = {
  message?: string;
};

export default function NotFoundPage({ message }: NotFoundPageProps) {
  return (
    <section className="page">
      <Container>
        <div className="empty-state">
          <h2>페이지를 찾을 수 없습니다.</h2>
          <p className="muted">{message ?? "요청하신 페이지가 존재하지 않아요."}</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <Link className="button button-ghost" to="/">
            홈으로
          </Link>
        </div>
      </Container>
    </section>
  );
}
