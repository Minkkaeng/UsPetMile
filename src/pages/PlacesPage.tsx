import { useEffect, useMemo, useState } from "react";
import Container from "../components/common/Container";
import PlaceCard from "../components/place/PlaceCard";
import PlaceCardSkeleton from "../components/place/PlaceCardSkeleton";
import { getPlaces } from "../services/placeApi";
import type { Place, PlaceCategory } from "../types/place";

const categories: Array<"전체" | PlaceCategory> = ["전체", "숙소", "카페", "식당", "관광", "체험"];

type SortOption = "recommended" | "name" | "latest";

export default function PlacesPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"전체" | PlaceCategory>("전체");
  const [sortBy, setSortBy] = useState<SortOption>("recommended");

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await getPlaces();
        if (isMounted) {
          setPlaces(data);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setError("장소 데이터를 불러오지 못했어요.");
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
  }, []);

  const filteredPlaces = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = places
      .filter((place) => (category === "전체" ? true : place.category === category))
      .filter((place) => {
        if (!normalizedQuery) return true;
        const haystack = `${place.title} ${place.address}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      });

    if (sortBy === "name") {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === "latest") {
      return [...filtered].sort((a, b) => b.id - a.id);
    }
    return filtered;
  }, [places, category, query, sortBy]);

  return (
    <section className="page">
      <Container>
        <div className="page-hero">
          <h1 className="hero-title">반려동물 동반 장소 리스트</h1>
          <p className="hero-subtitle">지역, 카테고리, 정책을 기준으로 빠르게 탐색하세요.</p>
        </div>

        <div className="filter-panel">
          <div className="filter-group">
            <label className="filter-label" htmlFor="place-search">
              검색
            </label>
            <input
              id="place-search"
              className="input"
              type="search"
              placeholder="장소명 또는 주소 검색"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="filter-group">
            <span className="filter-label">카테고리</span>
            <div className="filter-row">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`chip${category === item ? " chip--active" : ""}`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <label className="filter-label" htmlFor="place-sort">
              정렬
            </label>
            <select
              id="place-sort"
              className="select"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
            >
              <option value="recommended">추천순</option>
              <option value="name">이름순</option>
              <option value="latest">최신순</option>
            </select>
          </div>
        </div>

        <div className="page-hero">
          <p className="muted">검색 결과 {filteredPlaces.length}곳</p>
        </div>

        {isLoading && (
          <div className="place-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <PlaceCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        )}

        {!isLoading && error && <div className="empty-state">{error}</div>}

        {!isLoading && !error && filteredPlaces.length === 0 && (
          <div className="empty-state">검색 조건에 맞는 장소가 없어요.</div>
        )}

        {!isLoading && !error && filteredPlaces.length > 0 && (
          <div className="place-grid">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
