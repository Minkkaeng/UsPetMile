export type Review = {
  id: number;
  rating: number;
  content: string;
  author: string;
  date: string;
};

type ReviewListProps = {
  reviews: Review[];
};

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className="muted">아직 등록된 리뷰가 없어요.</p>;
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="review-card__header">
            <strong>{review.author}</strong>
            <span className="muted">{review.date}</span>
          </div>
          <p className="review-card__rating">별점 {review.rating.toFixed(1)}</p>
          <p className="muted">{review.content}</p>
        </div>
      ))}
    </div>
  );
}
