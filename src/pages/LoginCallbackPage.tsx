import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../services/authService";
import Container from "../components/common/Container";

export default function LoginCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const provider = searchParams.get("provider") || "kakao";
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const processLogin = async () => {
      if (code) {
        try {
          await authService.socialLogin(provider, code);
          navigate("/main");
        } catch (error) {
          console.error("Social login failed:", error);
          navigate("/login?error=social_failed");
        }
      } else {
        navigate("/login");
      }
    };

    processLogin();
  }, [code, provider, navigate]);

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center">
      <Container>
        <div style={{ textAlign: "center" }}>
          <div className="cat-icon-wrapper" style={{ margin: "0 auto 2rem", background: "var(--brand-primary)" }}>
            <i className="ph-fill ph-circles-three-plus ph-spin"></i>
          </div>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>
            {code ? "로그인 중입니다..." : "인증 정보를 확인 중입니다..."}
          </h2>
          <p className="muted">잠시만 기다려 주세요.</p>
        </div>
      </Container>
    </div>
  );
}
