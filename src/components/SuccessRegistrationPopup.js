import React from "react";
import PopupWithOutForm from "./PopupWithOutForm";

const SuccessRegistrationPopup = (props) => {
    <PopupWithOutForm
    name="success-registration"
    buttonOnText="Сохранить"
    onClose="fail-registration-close"
    isOpen={props.isOpen}
    closeAllPopups={props.onClose}
  >
    <div>

    </div>
  </PopupWithOutForm>
}

export default SuccessRegistrationPopup