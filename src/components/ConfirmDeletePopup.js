import React from "react";
import PopupWithForm from "./PopupWithForm";

const ConfirmDeletePopup = (props) => {
    function handleDeleteConfirm(e) {
        e.preventDefault()
        props.onDeleteCard()
    }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      buttonOnText="Да"
      onClose="delete-close"
      isOpen={props.isOpen}
      onSubmit={handleDeleteConfirm}
      closeAllPopups={props.onClose}
    >
    
    </PopupWithForm>
  );
};

export default ConfirmDeletePopup;
