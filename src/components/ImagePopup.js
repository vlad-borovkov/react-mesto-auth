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
          src={props.selectedCard.src}
          alt={props.selectedCard.src}
        />
        <p className="popup__gallery-description">{props.selectedCard.alt}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
