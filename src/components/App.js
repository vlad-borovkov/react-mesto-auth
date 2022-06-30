import React from "react";
import "./../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Card from "./Card";

const App = () => {
  const [isEditAvatarPopupOpen, onEditAvatar] = React.useState(false);
  const handleClickAvatar = () => {
    onEditAvatar(!isEditAvatarPopupOpen);
  };

  const [isEditProfilePopupOpen, onEditProfile] = React.useState(false);
  const handleClickProfile = () => {
    onEditProfile(!isEditProfilePopupOpen);
  };

  const [isAddPlacePopupOpen, onAddPlace] = React.useState(false);
  const handleClickPlace = () => {
    onAddPlace(!isAddPlacePopupOpen);
  };
  const closeAllPopups = () => {
    onEditAvatar(false);
    onEditProfile(false);
    onAddPlace(false);
    onGalleryPopup(false);
    setSelectedCard({});
  };

  const [isGalleryPopupOpen, onGalleryPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const handleClickOnCard = (card) => {
    onGalleryPopup(!isGalleryPopupOpen);
    setSelectedCard(card);
  }
 

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleClickAvatar}
        onEditProfile={handleClickProfile}
        onAddPlace={handleClickPlace}
        clickOnCard={handleClickOnCard}
      />

      <ImagePopup
        clickedCard={selectedCard}
        closeAllPopup={closeAllPopups}
        isOpen={isGalleryPopupOpen}
      />

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonOnText="Сохранить"
        onClose="avatar-close"
        isOpen={isEditAvatarPopupOpen}
        onSubmit="{}"
        closeAllPopups={closeAllPopups}
      >
        <>
          <input
            id="avatar-input"
            className="popup__container-form-input popup__container-form-input_avatar"
            type="url"
            name="avatar"
            placeholder="Введите URL"
            minLength="2"
            maxLength="300"
            required
          />
          <span className="avatar-input-error popup__error"></span>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="user"
        title="Редактировать профиль"
        buttonOnText="Сохранить"
        onClose="user-close"
        isOpen={isEditProfilePopupOpen}
        onSubmit="{}"
        closeAllPopups={closeAllPopups}
      >
        <>
          <input
            id="name-input"
            className="popup__container-form-input popup__container-form-input_user-name"
            type="text"
            name="firstname"
            placeholder="Жак-Ив Кусто"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="name-input-error popup__error"></span>
          <input
            id="description-input"
            className="popup__container-form-input popup__container-form-input_user-description"
            type="text"
            name="description"
            placeholder="Исследователь океана"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="description-input-error popup__error"></span>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="place"
        title="Новое место"
        buttonOnText="Сохранить"
        onClose="place-close"
        isOpen={isAddPlacePopupOpen}
        onSubmit="{}"
        closeAllPopups={closeAllPopups}
      >
        <>
          <input
            id="location-input"
            className="popup__container-form-input popup__container-form-input_location"
            type="text"
            name="user_place"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="location-input-error popup__error"></span>
          <input
            id="link-input"
            className="popup__container-form-input popup__container-form-input_link"
            name="link_place"
            placeholder="Ссылка на картинку"
            type="url"
            required
          />
          <span className="link-input-error popup__error"></span>
        </>
      </PopupWithForm>
      <Footer />
    </div>
  );
};

export default App;
