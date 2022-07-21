import React from "react";
import PopupWithOutForm from "./PopupWithOutForm";

const FailRegistrationPopup = (props) => {
    <PopupWithOutForm
    name="fail-registration"
    buttonOnText="Сохранить"
    onClose="fail-registration-close"
    isOpen={props.isOpen}
    closeAllPopups={props.onClose}
  >
    <div>

    </div>
  </PopupWithOutForm>
}

export default FailRegistrationPopup