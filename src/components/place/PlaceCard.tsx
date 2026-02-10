import { Link } from "react-router-dom";
import type { Place } from "../../types/place";

type PlaceCardProps = {
  place: Place;
};

export default function PlaceCard({ place }: PlaceCardProps) {
  const tags = place.tags.slice(0, 3);

  return (
    <Link to={`/places/${place.id}`} className="place-card card">
      <div className="place-card__media">
        {place.image ? (
          <img src={place.image} alt={place.title} loading="lazy" />
        ) : (
          <div className="media-fallback">
            <i className="ph ph-image text-4xl muted"></i>
          </div>
        )}
        <div className="badge badge-ok" style={{ position: "absolute", top: "12px", right: "12px" }}>
          {place.category}
        </div>
      </div>

      <div className="place-card__content">
        <div className="place-card__meta">
          <div className="muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {place.category}
          </div>
          <h3>{place.title}</h3>
        </div>

        <p className="place-card__address muted">
          <i className="ph ph-map-pin"></i> {place.address}
        </p>

        <div className="place-card__tags">
          {tags.map((tag) => (
            <span key={`${place.id}-${tag}`} className="chip">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
