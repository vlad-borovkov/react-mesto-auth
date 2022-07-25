import React from "react";

const InfoTooltip = (props) => {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_on" : ""
      }`}
    >
      <button
        className="popup__close-icone"
        type="button"
        onClick={props.closeAllPopups}
      ></button>
      <div className="popup__container-disclamer"> 
      {props.children}
      </div>
    </div>
  );
};
export default InfoTooltip;
