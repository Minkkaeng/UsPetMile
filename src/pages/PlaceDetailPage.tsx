import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/common/Container";
import { getPlaceById } from "../services/placeApi";
import type { Place } from "../types/place";

type DetailTab = "info" | "location" | "reviews";

export default function PlaceDetailPage() {
  const { id } = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DetailTab>("info");

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setIsLoading(true);
        const targetId = Number(id);
        if (Number.isNaN(targetId)) {
          if (isMounted) {
            setPlace(null);
            setError("잘못된 요청입니다.");
          }
          return;
        }
        const data = await getPlaceById(targetId);
        if (isMounted) {
          setPlace(data);
          setError(data ? null : "장소 정보를 찾을 수 없습니다.");
          setActiveTab("info");
        }
      } catch {
        if (isMounted) {
          setError("장소 정보를 불러오지 못했어요.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <section className="page">
        <Container>
          <div className="skeleton" style={{ height: "320px" }} />
        </Container>
      </section>
    );
  }

  if (error || !place) {
    return (
      <section className="page">
        <Container>
          <div className="empty-state">{error ?? "장소를 찾을 수 없습니다."}</div>
          <div style={{ marginTop: "16px" }}>
            <Link className="button button-ghost" to="/places">
              목록으로 돌아가기
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="page">
      <Container>
        <div className="detail-hero">
          <div className="detail-hero__media">
            {place.image ? <img src={place.image} alt={place.title} /> : <div className="media-fallback" />}
          </div>
          <div className="detail-meta">
            <span className="place-card__category">{place.category}</span>
            <h1 className="hero-title">{place.title}</h1>
            <p className="muted">{place.address}</p>
            <span className={`badge ${place.petPolicy === "OK" ? "badge-ok" : "badge-no"}`}>
              {place.petPolicy === "OK" ? "동반 OK" : "동반 NO"}
            </span>
          </div>
        </div>
        <div className="detail-tabs">
          <button
            type="button"
            className={`detail-tab${activeTab === "info" ? " detail-tab--active" : ""}`}
            onClick={() => setActiveTab("info")}
          >
            매장정보
          </button>
          <button
            type="button"
            className={`detail-tab${activeTab === "location" ? " detail-tab--active" : ""}`}
            onClick={() => setActiveTab("location")}
          >
            위치
          </button>
          <button
            type="button"
            className={`detail-tab${activeTab === "reviews" ? " detail-tab--active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            리뷰
          </button>
        </div>

        {activeTab === "info" && (
          <section className="detail-panel">
            <h2>방문 포인트</h2>
            <ul className="detail-points">
              {place.points.map((point) => (
                <li key={`${place.id}-${point}`}>{point}</li>
              ))}
            </ul>
          </section>
        )}

        {activeTab === "location" && (
          <section className="detail-panel">
            <h2>위치</h2>
            <div className="detail-map">지도 연동 예정</div>
            <p className="muted">{place.address}</p>
          </section>
        )}

        {activeTab === "reviews" && (
          <section className="detail-panel">
            <h2>리뷰</h2>
            <div className="review-card">
              <strong>반려견 동반이 편했어요.</strong>
              <p className="muted">실내 동선이 넓고 사장님이 반려견 친화적이셨어요.</p>
            </div>
            <div className="review-card">
              <strong>재방문 의사 100%</strong>
              <p className="muted">포토존과 펫 메뉴가 마음에 들었어요.</p>
            </div>
          </section>
        )}

        <Link className="button button-ghost" to="/places">
          목록으로
        </Link>
      </Container>
    </section>
  );
}
