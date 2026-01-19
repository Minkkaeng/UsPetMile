export default function PlaceCardSkeleton() {
  return (
    <article className="place-card card">
      <div className="place-card__media">
        <div className="skeleton place-card__media-skeleton" />
      </div>
      <div className="place-card__content">
        <div className="skeleton place-card__line" />
        <div className="skeleton place-card__line short" />
        <div className="place-card__tags">
          <span className="skeleton place-card__chip" />
          <span className="skeleton place-card__chip" />
          <span className="skeleton place-card__chip" />
        </div>
      </div>
    </article>
  );
}
