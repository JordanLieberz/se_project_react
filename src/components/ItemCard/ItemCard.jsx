import "./ItemCard.css";
import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (item && currentUser) {
      const liked = item.likes.some((id) => id === currentUser._id);
      setIsLiked(liked);
    }
  }, [item, currentUser]);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    onCardLike({ id: item._id, isLiked: newIsLiked });
  };

  const likeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  return (
    <li className="card">
      <div className="card__label">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <button
            className={likeButtonClassName}
            onClick={handleLike}
            type="button"
            aria-label="Like"
          ></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
