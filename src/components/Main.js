import React from "react";
import avatarPath from "./../images/Avatar.jpg";
import Card from "./Card";
import { api } from "../utils/Api";

const Main = (props) => {
  const [userAvatar, setUserAvatar] = React.useState();
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [cards, setPlaceCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserValue().then(([res, cardList]) => {
      setUserAvatar(res.avatar);
      setUserName(res.name);
      setUserDescription(res.about);
      setPlaceCards(cardList);
    });
  }, []);
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
            src={userAvatar}
            alt="аватар автора блога"
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-title">
            <h1 className="profile__info-name">{userName}</h1>
            <button
              className="profile__info-edit-button"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__info-description">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section>
        <>
          <ul className="photo-grid">
            {cards.map((cardItem) => (
              <li key={cardItem._id}>
                {" "}
                {
                  <Card
                    cardValue={cardItem}
                    handleClickCard={props.handleClick}
                  />
                }{" "}
              </li>
            ))}
            ;
          </ul>
        </>
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
            noValidate
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
