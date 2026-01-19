import { Link } from "react-router-dom";
import Container from "../components/common/Container";

export default function LoginPage() {
  const redirectUri =
    import.meta.env.VITE_OAUTH_REDIRECT_URI ?? `${window.location.origin}/login/callback`;
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
  const state = "uspetmile";

  const oauthLinks = [
    {
      label: "Kakao",
      className: "social-button social-button--kakao",
      href: kakaoClientId
        ? `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${encodeURIComponent(
            redirectUri,
          )}&response_type=code`
        : null,
    },
    {
      label: "Google",
      className: "social-button social-button--google",
      href: googleClientId
        ? `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
            redirectUri,
          )}&response_type=code&scope=${encodeURIComponent("openid email profile")}`
        : null,
    },
    {
      label: "Naver",
      className: "social-button social-button--naver",
      href: naverClientId
        ? `https://nid.naver.com/oauth2.0/authorize?client_id=${naverClientId}&redirect_uri=${encodeURIComponent(
            redirectUri,
          )}&response_type=code&state=${state}`
        : null,
    },
  ];

  return (
    <section className="page">
      <Container>
        <div className="auth-page">
          <div className="auth-card">
            <h1>로그인</h1>
            <p className="muted">UsPetMile 계정으로 맞춤 장소를 저장하세요.</p>
            <form className="auth-form">
              <label>
                이메일
                <input className="input" type="email" name="email" placeholder="you@example.com" />
              </label>
              <label>
                비밀번호
                <input className="input" type="password" name="password" placeholder="비밀번호 입력" />
              </label>
              <button type="submit" className="button button-primary">
                로그인
              </button>
            </form>
            <div className="auth-divider">
              <span>SNS로 계속하기</span>
            </div>
            <div className="social-grid">
              {oauthLinks.map((provider) => {
                const disabled = !provider.href;
                return (
                  <a
                    key={provider.label}
                    className={`${provider.className}${disabled ? " is-disabled" : ""}`}
                    href={provider.href ?? "#"}
                    aria-disabled={disabled}
                    onClick={(event) => {
                      if (disabled) event.preventDefault();
                    }}
                  >
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
