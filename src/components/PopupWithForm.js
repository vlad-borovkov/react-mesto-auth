
function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name}`}>
        <button className="popup__user-close-icone popup__close-icone" type="button"></button>
        <div className="popup__container-form">
          <form
            className="popup__form popup__user-form"
            name="user-profile"
            novalidate
          >
            <h2 className="popup__container-form-title">Редактировать профиль</h2>
            <input
              id="name-input"
              className="popup__container-form-input popup__container-form-input_user-name"
              type="text"
              name="firstname"
              placeholder="Жак-Ив Кусто"
              minlength="2"
              maxlength="40"
              required
            />
            <span className="name-input-error popup__error"></span>
            <input
              id="description-input"
              className="popup__container-form-input popup__container-form-input_user-description"
              type="text"
              name="description"
              placeholder="Исследователь океана"
              minlength="2"
              maxlength="200"
              required
            />
            <span className="description-input-error popup__error"></span>
            <button
              className="popup__container-form-submit-button popup__container-form-submit-button_active"
              type="submit"
              value="Сохранить"
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>
    )
}
export default PopupWithForm