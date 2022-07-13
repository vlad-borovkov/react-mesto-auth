import React from "react";

const ImagePopup = (props) => {
  return (
    <div
      className={`popup popup_type_gallery ${props.isOpen ? "popup_on" : ""}`}
    >
      <div className="popup__gallery-container">
        <button
          className="popup__gallery-close-icone popup__close-icone"
          type="button"
          onClick={props.closeAllPopup}
        ></button>
        <img
          className="popup__gallery-image"
          src={props.clickedCard.link}
          alt={props.clickedCard.name}
        />
        <p className="popup__gallery-description">{props.clickedCard.name}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
