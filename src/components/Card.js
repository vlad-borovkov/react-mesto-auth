import React from "react";
import trashPath from "./../images/Trash.svg";

const Card = (props) => {
    function handleClick() {
       // props.onCardClick(props.card, console.log(props.card))
        props.onCardClick(props.card) 
      } 
  return (
    <li>
      <div className="card">
        <img
          className="card__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        />
        <button
          className="card__delete-button"
          type="button"
          id="delete-button"
        >
          <img src={trashPath} alt="удалить" />
        </button>
        <div className="card__description">
          <h2 className="card__title">{props.card.name}</h2>
          <div className="card__like-section">
            <button className="card__like-button" type="button"></button>
            <p className="card__like-counter">{props.card.likes.length}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
