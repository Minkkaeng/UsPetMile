import { Link } from "react-router-dom";
import type { Place } from "../../types/place";

type PlaceCardProps = {
  place: Place;
};

export default function PlaceCard({ place }: PlaceCardProps) {
  const tags = place.tags.slice(0, 3);

  return (
    <article className="place-card card">
      <div className="place-card__media">
        {place.image ? <img src={place.image} alt={place.title} loading="lazy" /> : <div className="media-fallback" />}
        <span className={`badge ${place.petPolicy === "OK" ? "badge-ok" : "badge-no"}`}>
          {place.petPolicy === "OK" ? "동반 OK" : "동반 NO"}
        </span>
      </div>
      <div className="place-card__content">
        <div className="place-card__meta">
          <span className="place-card__category">{place.category}</span>
          <h3>{place.title}</h3>
        </div>
        <p className="place-card__address muted">{place.address}</p>
        <div className="place-card__tags">
          {tags.map((tag) => (
            <span key={`${place.id}-${tag}`} className="chip">
              #{tag}
            </span>
          ))}
        </div>
        <Link className="button button-ghost" to={`/places/${place.id}`}>
          상세 보기
        </Link>
      </div>
    </article>
  );
}
