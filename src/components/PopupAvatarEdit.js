import PopupWithForm from "./PopupWithForm";

function PopupAvatarEdit() {
    return(
        <PopupWithForm 
            title="Обновить аватар" 
            name="avatar" 
            buttonOnText="Сохранить" 
            onClose="avatar-close" 
            isOpen="" 
            onSubmit="">
                <input
                id="avatar-input"
                class="popup__container-form-input popup__container-form-input_avatar"
                type="url"
                name="avatar"
                placeholder="Введите URL"
                minlength="2"
                maxlength="300"
                required
                />
                <span class="avatar-input-error popup__error"></span>
        </PopupWithForm> 
    )
}

export default PopupAvatarEdit