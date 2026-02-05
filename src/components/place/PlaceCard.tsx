import { Link } from "react-router-dom";
import type { Place } from "../../types/place";

type PlaceCardProps = {
  place: Place;
};

export default function PlaceCard({ place }: PlaceCardProps) {
  const tags = place.tags.slice(0, 3);

  return (
    <Link to={`/places/${place.id}`} className="place-card-new">
      <div className="card-image-wrapper">
        {place.image ? (
          <img src={place.image} alt={place.title} className="card-image" loading="lazy" />
        ) : (
          <div className="card-image" style={{ background: "#333" }} />
        )}
        <span className="card-badge">{place.petPolicy === "OK" ? "PET OK" : "NO PETS"}</span>
      </div>

      <div className="card-content">
        <span className="card-category">{place.category}</span>
        <h3 className="card-title">{place.title}</h3>
        <p className="card-address">{place.address}</p>

        <div className="card-tags">
          {tags.map((tag) => (
            <span key={`${place.id}-${tag}`} className="card-tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
