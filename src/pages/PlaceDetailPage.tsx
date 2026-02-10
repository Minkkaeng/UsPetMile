import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import KakaoMap from "../components/common/KakaoMap";
import ReviewForm from "../components/review/ReviewForm";
import ReviewList from "../components/review/ReviewList";
import { getPlaceById } from "../services/placeApi";
import { createReview, getReviewsByPlaceId } from "../services/reviewApi";
import type { Place } from "../types/place";
import type { Review, ReviewFormInput } from "../types/review";
import "../styles/places.css";

export default function PlaceDetailPage() {
  const { id } = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
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

        const [placeData, reviewsData] = await Promise.all([getPlaceById(targetId), getReviewsByPlaceId(targetId)]);

        if (isMounted) {
          setPlace(placeData);
          setReviews(reviewsData);
          setError(placeData ? null : "장소 정보를 찾을 수 없습니다.");
        }
      } catch {
        if (isMounted) {
          setError("정보를 불러오지 못했어요.");
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

  const handleCreateReview = async (data: ReviewFormInput) => {
    if (!place) return;
    try {
      const newReview = await createReview(place.id, data);
      setReviews((prev) => [newReview, ...prev]);
      setShowReviewForm(false);
    } catch {
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return (
      <section className="places-page">
        <div className="places-container">
          <div className="loading-box">Loading details...</div>
        </div>
      </section>
    );
  }

  if (error || !place) {
    return (
      <section className="places-page">
        <div className="places-container">
          <div className="empty-state-new">{error ?? "장소를 찾을 수 없습니다."}</div>
          <div className="back-link-wrapper">
            <Link className="back-link inline-flex" to="/places">
              <i className="ph ph-arrow-left"></i> 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="places-page places-page-bottom">
      {/* Hero Section */}
      <div className="detail-hero-section">
        {place.image ? (
          <img src={place.image} alt={place.title} className="detail-hero-image" />
        ) : (
          <div className="detail-hero-image bg-dark-placeholder" />
        )}
        <div className="detail-overlay">
          <div className="detail-header-content">
            <Link to="/places" className="back-link back-link-muted">
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
          {/* Description */}
          <div className="detail-section mb-10">
            <h2 className="section-title">
              <i className="ph-fill ph-info"></i> About
            </h2>
            <p className="detail-description">{place.description || "등록된 소개가 없습니다."}</p>
          </div>

          {/* Info Table (Phone, Hours, Use) */}
          <div className="detail-section mb-10">
            <h2 className="section-title">
              <i className="ph-fill ph-list-dashes"></i> Information
            </h2>
            <div className="point-list">
              {place.phoneNumber && (
                <div className="point-item">
                  <i className="ph-fill ph-phone point-icon"></i>
                  <div>
                    <strong className="point-label">Phone</strong>
                    <span className="point-value">{place.phoneNumber}</span>
                  </div>
                </div>
              )}
              {place.operatingHours && (
                <div className="point-item">
                  <i className="ph-fill ph-clock point-icon"></i>
                  <div>
                    <strong className="point-label">Hours</strong>
                    <span className="point-value">{place.operatingHours}</span>
                  </div>
                </div>
              )}
              {place.homepageUrl && (
                <div className="point-item">
                  <i className="ph-fill ph-globe point-icon"></i>
                  <div>
                    <strong className="point-label">Website</strong>
                    <a href={place.homepageUrl} target="_blank" rel="noreferrer" className="point-value text-underline">
                      Visit Website
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map Section */}
          <div className="detail-section mb-10">
            <h2 className="section-title">
              <i className="ph-fill ph-map-trifold"></i> Location
            </h2>
            {place.coordinates ? (
              <KakaoMap lat={place.coordinates.lat} lng={place.coordinates.lng} />
            ) : (
              <div className="map-placeholder">지도를 불러올 수 없습니다.</div>
            )}
            <p style={{ marginTop: "1rem", color: "#888" }}>{place.address}</p>
          </div>

          {/* Points Section */}
          <div className="detail-section mb-10">
            <h2 className="section-title">
              <i className="ph-fill ph-star"></i> Key Points
            </h2>
            <div className="point-list">
              {place.points && place.points.length > 0 ? (
                place.points.map((point, index) => (
                  <div key={index} className="point-item">
                    <i className="ph-fill ph-check-circle point-icon"></i>
                    <div>
                      <strong className="point-label">Point {index + 1}</strong>
                      <span className="point-value">{point}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="muted">등록된 포인트가 없습니다.</p>
              )}
            </div>
          </div>

          {/* Tags Section */}
          <div className="detail-section mb-10">
            <h2 className="section-title">
              <i className="ph-fill ph-tag"></i> Tags
            </h2>
            <div className="detail-tag-group">
              {place.tags.map((tag) => (
                <span key={tag} className="detail-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="detail-section mb-10" id="reviews">
            <div className="flex justify-between items-center mb-6">
              <h2 className="section-title mb-0 flex items-center gap-2">
                <i className="ph-fill ph-chat-text"></i> Reviews{" "}
                <span className="text-gray-500 text-lg">({reviews.length})</span>
              </h2>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors"
              >
                {showReviewForm ? "취소" : "리뷰 작성"}
              </button>
            </div>

            {showReviewForm && (
              <div className="mb-8">
                <ReviewForm title={place.title} onSubmit={handleCreateReview} />
              </div>
            )}

            <ReviewList reviews={reviews} />
          </div>
        </div>

        {/* Right Column: Sticky Policy Card */}
        <div className="detail-sidebar">
          <div className="policy-card">
            <h3 className="policy-title">Pet Policy</h3>

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

            <div className="flex flex-col gap-3 mt-6">
              {place.homepageUrl && (
                <a
                  href={place.homepageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="booking-btn text-center hover:no-underline btn-full"
                >
                  홈페이지 예약
                </a>
              )}
              {place.phoneNumber && (
                <a
                  href={`tel:${place.phoneNumber}`}
                  className={`booking-btn text-center hover:no-underline btn-ghost ${place.homepageUrl ? "btn-secondary" : ""}`}
                >
                  전화 문의 ({place.phoneNumber})
                </a>
              )}
              {!place.homepageUrl && !place.phoneNumber && (
                <button disabled className="booking-btn opacity-50 cursor-not-allowed">
                  문의 정보 없음
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
