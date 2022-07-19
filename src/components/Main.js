import React from "react";
import avatarPath from "./../images/Avatar.jpg";
import Card from "./Card";
import { api } from "../utils/Api";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";
import { CardsContext } from "./../contexts/CardsContext";

const Main = (props) => {
  //подписка на контексты currentUser, CardsContext с помощью хука useContext
  const currentUserInfo = React.useContext(CurrentUserContext);
  const currenCardsData = React.useContext(CardsContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <div
            className="profile__avatar-overlay"
            onClick={props.onEditAvatar}
          ></div>
          <img
            // style={{ backgroundImage: `url(${userAvatar})` }}
            className="profile__avatar-picture"
            src={currentUserInfo.avatar}
            alt="аватар автора блога"
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-title">
            <h1 className="profile__info-name">{currentUserInfo.name}</h1>
            <button
              className="profile__info-edit-button"
              type="button"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__info-description">{currentUserInfo.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        />
      </section>
      <section>
        <ul className="photo-grid">
          {currenCardsData.map((cardItem) => (
            <Card
              key={cardItem._id}
              card={cardItem}
              onCardClick={props.clickOnCard}
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleDeleteClick}
              onConfirmDelete={props.onConfirmDelete}
            />
          ))}
        </ul>
      </section>
      <div className="popup popup_type_delete">
        <button
          className="popup__delete-close-icone popup__close-icone"
          type="button"
        ></button>
        <div className="popup__container-form">
          <form
            className="popup__form popup__delete-form"
            name="delete"
          >
            <h2 className="popup__container-form-title">Вы уверены?</h2>
            <button
              className="popup__container-form-submit-button popup__container-form-submit-button_type_delete"
              type="submit"
              value="Да"
            >
              Да
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Main;
