import React from "react";

const PopupWithOutForm = (props) => {
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
      <div className="popup__container-message">
        {props.children}
      </div>

    </div>
  );
};
export default PopupWithOutForm;
