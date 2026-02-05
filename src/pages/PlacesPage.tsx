import { useEffect, useMemo, useState } from "react";
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
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"전체" | PlaceCategory>("전체");
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
      })
      .filter((place) => {
        if (!place.policy) return false;
        if (petType === "dog" && !place.policy.dogAllowed) return false;
        if (petType === "cat" && !place.policy.catAllowed) return false;
        if (petType === "dog" && dogSize !== "all" && !place.policy.dogSize[dogSize]) return false;
        if (indoorAllowed !== "all") {
          if (place.policy.indoorAllowed !== (indoorAllowed === "yes")) return false;
        }
        if (extraFee !== "all") {
          if (place.policy.extraFee !== (extraFee === "yes")) return false;
        }
        return true;
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
    <section className="places-page">
      <div className="places-container">
        {/* Header */}
        <div className="places-header">
          <h1 className="places-title">Find Your Place</h1>
          <p className="places-subtitle">
            반려동물과 함께할 수 있는 최고의 장소들을 발견하세요.
            <br />
            엄선된 숙소, 카페, 맛집이 기다리고 있습니다.
          </p>
        </div>

        {/* Filters */}
        <div className="filter-section">
          {/* Top Row: Search & Main Sort */}
          <div className="filter-row-main">
            <div className="filter-group-new">
              <span className="filter-label-new">Type</span>
              {["dog", "cat"].map((type) => (
                <button
                  key={type}
                  className={`chip-new ${petType === type ? "active" : ""}`}
                  onClick={() => setPetType(type as PetType)}
                >
                  {type === "dog" ? "DOG" : "CAT"}
                </button>
              ))}
            </div>

            <div className="search-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Search places..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <i className="ph ph-magnifying-glass search-icon"></i>
            </div>
          </div>

          {/* Categories */}
          <div className="filter-group-new">
            <span className="filter-label-new">Category</span>
            {categories.map((item) => (
              <button
                key={item}
                className={`chip-new ${category === item ? "active" : ""}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Detailed Filters (Conditional) */}
          <div className="filter-row-main" style={{ alignItems: "flex-start", gap: "2rem" }}>
            {petType === "dog" && (
              <div className="filter-group-new">
                <span className="filter-label-new">Size</span>
                {[
                  { label: "ALL", value: "all" },
                  { label: "SMALL", value: "small" },
                  { label: "MEDIUM", value: "medium" },
                  { label: "LARGE", value: "large" },
                ].map((item) => (
                  <button
                    key={item.value}
                    className={`chip-new ${dogSize === item.value ? "active" : ""}`}
                    onClick={() => setDogSize(item.value as DogSize)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            <div className="filter-group-new">
              <span className="filter-label-new">Options</span>
              <button
                className={`chip-new ${indoorAllowed === "yes" ? "active" : ""}`}
                onClick={() => setIndoorAllowed(indoorAllowed === "yes" ? "all" : "yes")}
              >
                INDOOR
              </button>
              <button
                className={`chip-new ${extraFee === "no" ? "active" : ""}`}
                onClick={() => setExtraFee(extraFee === "no" ? "all" : "no")}
              >
                NO EXTRA FEE
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div
          className="results-header"
          style={{
            marginBottom: "1rem",
            color: "#666",
            fontSize: "0.875rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Showing {filteredPlaces.length} places</span>

          <select
            className="search-input"
            style={{ width: "auto", padding: "0.5rem 2rem 0.5rem 1rem", fontSize: "0.875rem" }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="recommended">Recommended</option>
            <option value="latest">Newest</option>
            <option value="name">Name</option>
          </select>
        </div>

        {isLoading && (
          <div className="places-grid-new">
            {/* Skeletons could go here, for now just loading text or reuse skeleton component if adapted */}
            <div style={{ color: "white" }}>Loading...</div>
          </div>
        )}

        {!isLoading && !error && filteredPlaces.length === 0 && (
          <div className="empty-state-new">
            <i className="ph ph-paw-print" style={{ fontSize: "3rem", marginBottom: "1rem", display: "block" }}></i>
            No places found matching your criteria.
          </div>
        )}

        {!isLoading && !error && filteredPlaces.length > 0 && (
          <div className="places-grid-new">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
