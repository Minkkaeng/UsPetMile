type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggle: () => void;
};

export default function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      className={`button button-ghost favorite-button${isFavorite ? " favorite-button--active" : ""}`}
      onClick={onToggle}
    >
      {isFavorite ? "찜 해제" : "찜하기"}
    </button>
  );
}
