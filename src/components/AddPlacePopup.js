import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  //стейты инпутов

  const [namePlace, setNamePlace] = React.useState("");
  function handlePlaceChange(e) {
    setNamePlace(e.target.value);
  }

  const [linkPlace, setLinkPlace] = React.useState("");
  function handleLinkChange(e) {
    setLinkPlace(e.target.value);
  }

  function handlePlaceSubmit(e) {
    e.preventDefault();

    //далее передача сформированного объекта для отправки в API
    props.onAddPlace({
      name: namePlace,
      link: linkPlace,
    });
  }
  //очистка инпутов
  React.useEffect(() => {
    setNamePlace("");
    setLinkPlace("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonOnText="Сохранить"
      onClose="place-close"
      isOpen={props.isOpen}
      onSubmit={handlePlaceSubmit}
      closeAllPopups={props.onClose}
    >
      <input
        onChange={handlePlaceChange}
        value={namePlace}
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
        onChange={handleLinkChange}
        value={linkPlace}
        id="link-input"
        className="popup__container-form-input popup__container-form-input_link"
        name="link_place"
        placeholder="Ссылка на картинку"
        type="url"
        required
      />
      <span className="link-input-error popup__error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
