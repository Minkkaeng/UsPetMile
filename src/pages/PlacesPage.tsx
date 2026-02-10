import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../components/common/Container";
import PlaceCard from "../components/place/PlaceCard";
import { getPlaces } from "../services/placeApi";
import type { Place, PlaceCategory } from "../types/place";
import "../styles/places.css";

const categories: Array<"전체" | PlaceCategory> = ["전체", "숙소", "카페", "식당", "관광", "체험"];

type SortOption = "recommended" | "name" | "latest";
type PetType = "dog" | "cat";
type DogSize = "all" | "small" | "medium" | "large";
type ToggleOption = "all" | "yes" | "no";

export default function PlacesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = searchParams.get("search") || "";
  const category = (searchParams.get("category") || "전체") as PlaceCategory | "전체";

  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [petType, setPetType] = useState<PetType>("dog");
  const [dogSize, setDogSize] = useState<DogSize>("all");
  const [indoorAllowed, setIndoorAllowed] = useState<ToggleOption>("all");
  const [extraFee, setExtraFee] = useState<ToggleOption>("all");

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
          setError("데이터를 불러오지 못했습니다.");
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

  const handleQueryChange = (value: string) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        if (value) newParams.set("search", value);
        else newParams.delete("search");
        return newParams;
      },
      { replace: true },
    );
  };

  const handleCategoryChange = (newCat: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (newCat === "전체") newParams.delete("category");
      else newParams.set("category", newCat);
      return newParams;
    });
  };

  const filteredPlaces = useMemo(() => {
    const norm = query.trim().toLowerCase();
    const filtered = places
      .filter((p) => (category === "전체" ? true : p.category === category))
      .filter((p) => {
        if (!norm) return true;
        return (
          p.title.toLowerCase().includes(norm) ||
          p.address.toLowerCase().includes(norm) ||
          p.tags.some((t) => t.toLowerCase().includes(norm))
        );
      })
      .filter((p) => {
        if (!p.policy) return false;
        if (petType === "dog" && !p.policy.dogAllowed) return false;
        if (petType === "cat" && !p.policy.catAllowed) return false;
        if (petType === "dog" && dogSize !== "all" && !p.policy.dogSize[dogSize as keyof typeof p.policy.dogSize])
          return false;
        if (indoorAllowed !== "all" && p.policy.indoorAllowed !== (indoorAllowed === "yes")) return false;
        if (extraFee !== "all" && p.policy.extraFee !== (extraFee === "yes")) return false;
        return true;
      });

    return [...filtered].sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "latest") return b.id - a.id;
      return 0;
    });
  }, [places, category, query, sortBy, petType, dogSize, indoorAllowed, extraFee]);

  return (
    <div className="places-page">
      <Container className="places-container">
        {/* Filters Panel */}
        <section className="filter-card">
          {/* Row 1: Search & Sort */}
          <div className="filter-row-top">
            <div className="search-control">
              <input
                type="text"
                className="search-input search-field"
                placeholder="어디로 갈까요?"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
              />
              <i className="ph ph-magnifying-glass search-icon search-glass"></i>
            </div>

            <div className="sort-control">
              <span className="count-badge">정렬:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="select modern-select"
              >
                <option value="recommended">추천순</option>
                <option value="latest">최신순</option>
                <option value="name">이름순</option>
              </select>
            </div>
          </div>

          {/* Row 2: Categories */}
          <div className="mb-8">
            <div className="filter-group-new">
              <span className="filter-label-new">CATEGORY</span>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => handleCategoryChange(c)}
                  className={`chip-new ${category === c ? "active" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: Pet Filters */}
          <div className="pet-filter-row">
            <div className="filter-group-new">
              <span className="filter-label-new">PET TYPE</span>
              <div className="segmented-control">
                {["dog", "cat"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPetType(type as PetType)}
                    className={`segmented-button ${petType === type ? "active" : ""}`}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {petType === "dog" && (
              <div className="filter-group-new">
                <span className="filter-label-new">SIZE</span>
                {["all", "small", "medium", "large"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setDogSize(s as DogSize)}
                    className={`chip-new chip-small ${dogSize === s ? "active" : ""}`}
                  >
                    {s === "all" ? "전체" : s === "small" ? "소형" : s === "medium" ? "중형" : "대형"}
                  </button>
                ))}
              </div>
            )}

            <div className="filter-group-new">
              <span className="filter-label-new">POLICY</span>
              <button
                onClick={() => setIndoorAllowed(indoorAllowed === "yes" ? "all" : "yes")}
                className={`chip-new chip-small ${indoorAllowed === "yes" ? "active" : ""}`}
              >
                실내 가능
              </button>
              <button
                onClick={() => setExtraFee(extraFee === "no" ? "all" : "no")}
                className={`chip-new chip-small ${extraFee === "no" ? "active" : ""}`}
              >
                무료 입장
              </button>
            </div>
          </div>
        </section>

        {/* Results */}
        <div className="results-header">
          <span className="count-badge">
            총 <strong className="count-strong">{filteredPlaces.length}</strong>개의 장소
          </span>
        </div>

        {isLoading ? (
          <div className="empty-state-new">데이터를 가져오는 중...</div>
        ) : error ? (
          <div className="empty-state-new error-text">{error}</div>
        ) : filteredPlaces.length === 0 ? (
          <div className="empty-state-new">일치하는 장소가 없습니다.</div>
        ) : (
          <div className="places-grid-new">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
