import React from "react";
import trashPath from "./../images/Trash.svg";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";

const Card = (props) => {
  const currentUserInfo = React.useContext(CurrentUserContext);

  // проверка автора карточки для показа кнопки удаления, постановки/снятия лайка
  const isOwner = currentUserInfo._id === props.card.owner._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwner ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;

  //возвращает состояние карточки (лайкнуто или нет пользователем) для отображения лайка в карточке классом
  const isLiked = props.card.likes.some(
    (element) => element._id === currentUserInfo._id
  );
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;
  //console.log(cardLikeButtonClassName)

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleCardLike() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
    props.onConfirmDelete()
  }

  return (
    <li style={{ listStyleType: "none" }}>
      <div className="card">
        <img
          className="card__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        />
        <button
          className={cardDeleteButtonClassName}
          type="button"
          id="delete-button"
          onClick={handleDeleteClick}
        >
          <img src={trashPath} alt="удалить" />
        </button>
        <div className="card__description">
          <h2 className="card__title">{props.card.name}</h2>
          <div className="card__like-section">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleCardLike}
            ></button>
            <p className="card__like-counter">{props.card.likes.length}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
