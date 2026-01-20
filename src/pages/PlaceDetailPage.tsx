import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/common/Container";
import FavoriteButton from "../components/place/FavoriteButton";
import PolicyTable from "../components/place/PolicyTable";
import ReviewForm from "../components/place/ReviewForm";
import ReviewList, { type Review } from "../components/place/ReviewList";
import { getPlaceById } from "../services/placeApi";
import type { Place } from "../types/place";

type DetailTab = "info" | "location" | "reviews";

export default function PlaceDetailPage() {
  const { id } = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DetailTab>("info");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      rating: 4.5,
      content: "반려견 동반이 편했고 정책 안내가 명확했어요.",
      author: "초코네",
      date: "2024-10-12",
    },
    {
      id: 2,
      rating: 5,
      content: "동반 규정이 실제와 같아서 신뢰가 갔습니다.",
      author: "냥집사",
      date: "2024-10-18",
    },
  ]);

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
            <div className="detail-actions">
              <FavoriteButton isFavorite={isFavorite} onToggle={() => setIsFavorite((prev) => !prev)} />
              <button type="button" className="button button-primary" onClick={() => setIsInquiryOpen(true)}>
                예약 문의
              </button>
            </div>
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
            <h2>매장정보</h2>
            <div className="detail-info-grid">
              <div>
                <h3>정책 표준표</h3>
                {place.policy ? <PolicyTable policy={place.policy} /> : <p className="muted">정책 준비 중</p>}
              </div>
              <div>
                <h3>포인트</h3>
                <ul className="detail-points">
                  {place.points.map((point) => (
                    <li key={`${place.id}-${point}`}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
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
            <ReviewList reviews={reviews} />
            <ReviewForm
              onSubmit={(rating, content) =>
                setReviews((prev) => [
                  {
                    id: prev.length + 1,
                    rating,
                    content,
                    author: "방문자",
                    date: new Date().toISOString().slice(0, 10),
                  },
                  ...prev,
                ])
              }
            />
          </section>
        )}

        <Link className="button button-ghost" to="/places">
          목록으로
        </Link>
      </Container>

      {isInquiryOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal card">
            <h3>예약 문의</h3>
            <p className="muted">{place.title}에 문의를 남겨주세요.</p>
            <form className="modal-form">
              <label className="filter-label" htmlFor="visit-date">
                방문 예정일
              </label>
              <input id="visit-date" className="input" type="date" />
              <label className="filter-label" htmlFor="pet-count">
                반려동물 수
              </label>
              <input id="pet-count" className="input" type="number" min={1} max={5} defaultValue={1} />
              <label className="filter-label" htmlFor="message">
                문의 메시지
              </label>
              <textarea id="message" className="input review-form__textarea" placeholder="문의 내용을 입력하세요." />
              <div className="modal-actions">
                <button type="button" className="button button-ghost" onClick={() => setIsInquiryOpen(false)}>
                  닫기
                </button>
                <button type="submit" className="button button-primary" onClick={() => setIsInquiryOpen(false)}>
                  문의 보내기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
