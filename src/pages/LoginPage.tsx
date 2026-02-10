import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/common/Container";
import { authService } from "../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectUri = import.meta.env.VITE_OAUTH_REDIRECT_URI ?? `${window.location.origin}/login/callback`;
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
  const state = "uspetmile";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await authService.login({ email, password });
      navigate("/main");
    } catch {
      setError("이메일 또는 비밀번호를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const oauthLinks = [
    {
      label: "Kakao",
      className: "social-button social-button--kakao",
      href: kakaoClientId
        ? `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${encodeURIComponent(
            redirectUri,
          )}&response_type=code`
        : `/login/callback?code=mock_kakao_code&provider=kakao`,
    },
    {
      label: "Google",
      className: "social-button social-button--google",
      href: googleClientId
        ? `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
            redirectUri,
          )}&response_type=code&scope=${encodeURIComponent("openid email profile")}`
        : `/login/callback?code=mock_google_code&provider=google`,
    },
    {
      label: "Naver",
      className: "social-button social-button--naver",
      href: naverClientId
        ? `https://nid.naver.com/oauth2.0/authorize?client_id=${naverClientId}&redirect_uri=${encodeURIComponent(
            redirectUri,
          )}&response_type=code&state=${state}`
        : `/login/callback?code=mock_naver_code&provider=naver`,
    },
  ];

  return (
    <section className="page">
      <Container>
        <div className="auth-page">
          <div className="auth-card">
            <h1>로그인</h1>
            <p className="muted">UsPetMile 계정으로 맞춤 장소를 저장하세요.</p>

            {error && (
              <p style={{ color: "#ff6b6b", fontSize: "0.875rem", marginBottom: "1rem", textAlign: "center" }}>
                {error}
              </p>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
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
                {isLoading ? "로그인 중..." : "로그인"}
              </button>
            </form>
            <div className="auth-divider">
              <span>SNS로 계속하기</span>
            </div>
            <div className="social-grid">
              {oauthLinks.map((provider) => {
                return (
                  <a key={provider.label} className={provider.className} href={provider.href}>
                    {provider.label}
                  </a>
                );
              })}
            </div>
            <p className="auth-switch">
              아직 계정이 없나요? <Link to="/signup">회원가입</Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
