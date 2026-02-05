import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlaceById } from "../services/placeApi";
import type { Place } from "../types/place";
import "../styles/places.css";

export default function PlaceDetailPage() {
  const { id } = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <section className="places-page">
        <div className="places-container">
          <div style={{ color: "white", padding: "4rem", textAlign: "center" }}>Loading details...</div>
        </div>
      </section>
    );
  }

  if (error || !place) {
    return (
      <section className="places-page">
        <div className="places-container">
          <div className="empty-state-new">{error ?? "장소를 찾을 수 없습니다."}</div>
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link className="back-link" to="/places" style={{ display: "inline-flex" }}>
              <i className="ph ph-arrow-left"></i> 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ backgroundColor: "black", minHeight: "100vh", paddingBottom: "4rem" }}>
      {/* Hero Section */}
      <div className="detail-hero-section">
        {place.image ? (
          <img src={place.image} alt={place.title} className="detail-hero-image" />
        ) : (
          <div className="detail-hero-image" style={{ background: "#222" }} />
        )}
        <div className="detail-overlay">
          <div className="detail-header-content">
            <Link to="/places" className="back-link" style={{ marginBottom: "1rem", color: "rgba(255,255,255,0.7)" }}>
              <i className="ph ph-arrow-left"></i> Back to List
            </Link>
            <div className="detail-badge">{place.category}</div>
            <h1 className="detail-title">{place.title}</h1>
            <p className="detail-address">
              <i className="ph-fill ph-map-pin"></i>
              {place.address}
            </p>
          </div>
        </div>
      </div>

      <div className="places-container detail-grid">
        {/* Left Column: Main Info */}
        <div className="detail-main">
          {/* Points Section */}
          <div className="mb-10">
            <h2 className="section-title">
              <i className="ph-fill ph-star"></i> Key Points
            </h2>
            <div className="point-list">
              {place.points && place.points.length > 0 ? (
                place.points.map((point, index) => (
                  <div key={index} className="point-item">
                    <i className="ph-fill ph-check-circle point-icon"></i>
                    <div>
                      <strong style={{ display: "block", marginBottom: "0.25rem", color: "white" }}>
                        Point {index + 1}
                      </strong>
                      <span style={{ color: "#aaa" }}>{point}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="muted">등록된 포인트가 없습니다.</p>
              )}
            </div>
          </div>

          {/* Tags Section */}
          <div className="mb-10">
            <h2 className="section-title">
              <i className="ph-fill ph-tag"></i> Tags
            </h2>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {place.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "#222",
                    padding: "0.5rem 1rem",
                    borderRadius: "2rem",
                    fontSize: "0.9rem",
                    color: "#ccc",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Policy Card */}
        <div className="detail-sidebar">
          <div className="policy-card">
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                borderBottom: "1px solid #333",
                paddingBottom: "1rem",
              }}
            >
              Pet Policy
            </h3>

            {place.policy ? (
              <>
                <div className="policy-row">
                  <span className="policy-label">동반 가능 여부</span>
                  <span className="policy-value">{place.petPolicy === "OK" ? "반려동물 환영" : "동반 불가"}</span>
                </div>
                <div className="policy-row">
                  <span className="policy-label">최대 마리수</span>
                  <span className="policy-value">{place.policy.maxPets}마리</span>
                </div>
                <div className="policy-row">
                  <span className="policy-label">강아지 크기</span>
                  <span className="policy-value">
                    {[
                      place.policy.dogSize.small && "소형",
                      place.policy.dogSize.medium && "중형",
                      place.policy.dogSize.large && "대형",
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
                <div className="policy-row">
                  <span className="policy-label">고양이 동반</span>
                  <span className="policy-value">{place.policy.catAllowed ? "가능" : "불가"}</span>
                </div>
                <div className="policy-row">
                  <span className="policy-label">실내 동반</span>
                  <span className="policy-value">{place.policy.indoorAllowed ? "가능" : "불가"}</span>
                </div>
                <div className="policy-row">
                  <span className="policy-label">추가 요금</span>
                  <span className="policy-value">{place.policy.extraFee ? "있음" : "없음"}</span>
                </div>
              </>
            ) : (
              <p className="muted">정책 정보가 없습니다.</p>
            )}

            <button className="booking-btn">예약하기 / 문의하기</button>
          </div>
        </div>
      </div>
    </section>
  );
}
