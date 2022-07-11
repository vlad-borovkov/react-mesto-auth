import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {

    const currentUserInfo = React.useContext(CurrentUserContext);
//рендерим текушего пользователя в форму
    React.useEffect(() => {
        setName(currentUserInfo.name);
        setDescription(currentUserInfo.about);
    }, [currentUserInfo]); 

//стейты инпутов и ручной захват значений инпутов
    const [name, setName] = React.useState('');
        function handleNameChange(e) {
            setName(e.target.value)
        } 
    const [description, setDescription] = React.useState('');
        function handleDescriptionChange(e) {
            setDescription(e.target.value)
        }
//

function handleSubmitEditeProfile(e) {
    e.preventDefault();
   
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
        name,
        about: description,
    });

  }

    return (
    <PopupWithForm
    name="user"
    title="Редактировать профиль"
    buttonOnText="Сохранить"
    onClose="user-close"
    isOpen={props.isOpen}
    onSubmit={handleSubmitEditeProfile}
    closeAllPopups={props.onClose}
  >
    <>
      <input
        onChange={handleNameChange}
        value={name}
        id="name-input"
        className="popup__container-form-input popup__container-form-input_user-name"
        type="text"
        name="firstname"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="name-input-error popup__error"></span>
      <input
        onChange={handleDescriptionChange}
        value={description}
        id="description-input"
        className="popup__container-form-input popup__container-form-input_user-description"
        type="text"
        name="description"
        placeholder="Расскажите о себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="description-input-error popup__error"></span>
    </>
  </PopupWithForm>
    )
}

export default EditProfilePopup 


