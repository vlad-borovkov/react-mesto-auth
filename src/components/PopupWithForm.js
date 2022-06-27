import React from "react";

const PopupWithForm = (props) => {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_on" : ""
      }`}
    >
      <button
        className={`popup__${props.onClose}-icone popup__close-icone`}
        type="button"
        onClick={props.closeAllPopups}
      ></button>
      <div className="popup__container-form">
        <form className="popup__form" name={`${props.name}-profile`} noValidate>
          <h2 className="popup__container-form-title">{props.title}</h2>
          {props.children}
          <button
            className="popup__container-form-submit-button popup__container-form-submit-button_active"
            type="submit"
            value={`${props.buttonOnText}`}
          >
            {`${props.buttonOnText}`}
          </button>
        </form>
      </div>
    </div>
  );
};
export default PopupWithForm;
