import React from "react";
import trashPath from "./../images/Trash.svg";

const Card = (props) => {
  return (
    <li>
      <div className="card">
        <img
          className="card__image"
          src={props.cardValue.link}
          alt={props.cardValue.name}
          onClick={props.handleClickCard}
        />
        <button
          className="card__delete-button"
          type="button"
          id="delete-button"
        >
          <img src={trashPath} alt="удалить" />
        </button>
        <div className="card__description">
          <h2 className="card__title">{props.cardValue.name}</h2>
          <div className="card__like-section">
            <button className="card__like-button" type="button"></button>
            <p className="card__like-counter">{props.cardValue.likes.length}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
