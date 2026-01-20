import { useState, type FormEvent } from "react";

type ReviewFormProps = {
  onSubmit: (rating: number, content: string) => void;
};

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content.trim()) return;
    onSubmit(rating, content.trim());
    setContent("");
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <label className="filter-label" htmlFor="review-rating">
        별점
      </label>
      <select
        id="review-rating"
        className="select"
        value={rating}
        onChange={(event) => setRating(Number(event.target.value))}
      >
        {[5, 4.5, 4, 3.5, 3].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <label className="filter-label" htmlFor="review-content">
        후기
      </label>
      <textarea
        id="review-content"
        className="input review-form__textarea"
        placeholder="정책과 실제 경험을 공유해 주세요."
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <button type="submit" className="button button-primary">
        후기 등록
      </button>
    </form>
  );
}
