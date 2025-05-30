import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    const isLiked = item.likes.some((id) => id === currentUser?._id);
    onCardLike({ id: item._id, isLiked });
  };

  const isLiked =
    currentUser && item.likes.some((id) => id === currentUser._id);

  const likeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {currentUser && (
        <button
          className={likeButtonClassName}
          onClick={handleLike}
          type="button"
          aria-label="Like"
        >
          ❤
        </button>
      )}
    </li>
  );
}

export default ItemCard;
