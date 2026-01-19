import { Link } from "react-router-dom";
import Container from "../components/common/Container";

export default function SignupPage() {
  return (
    <section className="page">
      <Container>
        <div className="auth-page">
          <div className="auth-card">
            <h1>회원가입</h1>
            <p className="muted">반려동물과의 추억을 시작할 준비가 되셨나요?</p>
            <form className="auth-form">
              <label>
                이름
                <input className="input" type="text" name="name" placeholder="이름 입력" />
              </label>
              <label>
                이메일
                <input className="input" type="email" name="email" placeholder="you@example.com" />
              </label>
              <label>
                비밀번호
                <input className="input" type="password" name="password" placeholder="비밀번호 입력" />
              </label>
              <button type="submit" className="button button-primary">
                계정 만들기
              </button>
            </form>
            <p className="auth-switch">
              이미 계정이 있나요? <Link to="/login">로그인</Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
