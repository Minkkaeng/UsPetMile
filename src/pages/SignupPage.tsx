import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/common/Container";
import { authService } from "../services/authService";

export default function SignupPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await authService.signup({ name, email, password });
      navigate("/main");
    } catch {
      setError("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="page" style={{ background: "transparent" }}>
      <Container>
        <div className="auth-page">
          <div className="auth-card">
            <h1>회원가입</h1>
            <p className="muted">UsPetMile과 함께 반려동물과의 추억을 시작하세요.</p>

            {error && (
              <p style={{ color: "#ff6b6b", fontSize: "0.875rem", marginBottom: "1rem", textAlign: "center" }}>
                {error}
              </p>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <label>
                이름
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="이름 입력"
                  required
                  disabled={isLoading}
                />
              </label>
              <label>
                이메일
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                />
              </label>
              <label>
                비밀번호
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="비밀번호 입력"
                  required
                  disabled={isLoading}
                />
              </label>
              <button type="submit" className="button button-primary" disabled={isLoading}>
                {isLoading ? "처리 중..." : "계정 만들기"}
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
