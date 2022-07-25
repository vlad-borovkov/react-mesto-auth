import React from "react";
import InfoTooltip from "./InfoTooltip";
import FailRegistration from "./../images/Fail.svg";

const FailRegistrationPopup = (props) => {
  return (
    <InfoTooltip
      name="fail-registration"
      onClose="fail-registration-close"
      isOpen={props.isOpen}
      closeAllPopups={props.onClose}
    >
      <img
        className="popup__image-event"
        src={FailRegistration}
        alt="авторизация прошла успешно"
      />
      <p className="popup__event-message">Что-то пошло не так!
Попробуйте ещё раз.</p>
    </InfoTooltip>
  );
};

export default FailRegistrationPopup;
