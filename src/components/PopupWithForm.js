import PopupAvatarEdit from "./PopupAvatarEdit"

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name}`}>
        <button className={`popup__${props.onClose}-icone popup__close-icone`} type="button"></button>
        <div className="popup__container-form">
          <form
            className="popup__form"
            name={`${props.name}-profile`}
            novalidate
          >
            <h2 className="popup__container-form-title">{props.title}</h2>
           {props.children}
            <button
              className="popup__container-form-submit-button popup__container-form-submit-button_active"
              type="submit"
              value="{props.buttonOnText}"
            >
            {props.buttonOnText}
            </button>
          </form>
        </div>
      </div>
    )
}
export default PopupWithForm