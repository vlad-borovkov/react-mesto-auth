import React from "react";
import PopupWithOutForm from "./PopupWithOutForm";
import SuccessDownloadPath from "./../images/Success.svg";

const SuccessRegistrationPopup = (props) => {
  return (
    <PopupWithOutForm
      name="success-registration"
      onClose="fail-registration-close"
      isOpen={props.isOpen}
      closeAllPopups={props.onClose}
    >
      <img
        className="popup__image-event"
        src={SuccessDownloadPath}
        alt="авторизация прошла успешно"
      />
      <p className="popup__event-message">Вы успешно зарегистрировались!</p>
    </PopupWithOutForm>
  );
};

export default SuccessRegistrationPopup;
