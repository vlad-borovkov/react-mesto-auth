import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {

    const avatarRef = React.useRef('')

    function handleAvatarChange(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
          });
    }
//очистка инпута
React.useEffect(()=> {
  avatarRef.current.value = ""
}, [props.isOpen])

    return (
        <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonOnText="Сохранить"
        onClose="avatar-close"
        isOpen={props.isOpen}
        onSubmit={handleAvatarChange}
        closeAllPopups={props.onClose}
      >
          <input
            ref={avatarRef}
            id="avatar-input"
            className="popup__container-form-input popup__container-form-input_avatar"
            type="url"
            name="avatar"
            placeholder="Введите URL"
            minLength="2"
            maxLength="300"
            required
          />
          <span className="avatar-input-error popup__error"></span>
      </PopupWithForm>
    )
}

export default EditAvatarPopup