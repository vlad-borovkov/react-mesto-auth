import avatarPath from './../images/Avatar.jpg';
import PopupWithForm from './PopupWithForm';




function Main() {

    const handleEditAvatarClick = () => {
        document.querySelector('.popup_type_avatar').classList.add('popup_on');
    };

    const handleEditProfileClick = () => {
        document.querySelector('.popup_type_user').classList.add('popup_on');
    }
    const handleAddPlaceClick = () => {
        document.querySelector('.popup_type_place').classList.add('popup_on');
    }

    return (
        
        <main>
    <section className="profile">

      <div className="profile__avatar">
        <div 
        className="profile__avatar-overlay"
        onClick={handleEditAvatarClick}>
        </div>
        <img
        className="profile__avatar-picture"
        src={avatarPath}
        alt="аватар автора блога"
      />
      </div>
      <div className="profile__info">
        <div className="profile__info-title">
          <h1 className="profile__info-name">Жак-Ив Кусто</h1>
          <button 
          className="profile__info-edit-button" 
          type="button"
          onClick={handleEditProfileClick}></button>
        </div>
        <p className="profile__info-description">Исследователь океана</p>
      </div>
      <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
    </section>
    <section className="photo-grid"></section>
    
    {/* <PopupWithForm name="user" title="Редактировать профиль"/>
    <PopupWithForm name="place" title="Новое место"/>
        и т.д.  */}

    <div className="popup popup_type_user">
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
    <div className="popup popup_type_place">
      <button className="popup__place-close-icone popup__close-icone" type="button"></button>
      <div className="popup__container-form">
        <form
          className="popup__form popup__place-form"
          name="user-location"
          novalidate
        >
          <h2 className="popup__container-form-title">Новое место</h2>
          <input
            id="location-input"
            className="popup__container-form-input popup__container-form-input_location"
            type="text"
            name="user_place"
            placeholder="Название"
            minlength="2"
            maxlength="30"
            required
          />
          <span className="location-input-error popup__error"></span>
          <input
            id="link-input"
            className="popup__container-form-input popup__container-form-input_link"
            name="link_place"
            placeholder="Ссылка на картинку"
            type="url"
            required
          />
          <span className="link-input-error popup__error"></span>
          <button
            className="popup__container-form-submit-button popup__container-form-submit-button_type_place"
            type="submit"
            value="Сохранить"
          >
            Создать
          </button>
        </form>
      </div>
    </div>
    <div className="popup popup_type_gallery">
      <div className="popup__gallery-container">
        <button className="popup__gallery-close-icone popup__close-icone" type="button"></button>
        <img className="popup__gallery-image" src="//:0" alt="" />
        <p className="popup__gallery-description"></p>
      </div>
    </div>
    <div className="popup popup_type_delete">
      <button className="popup__delete-close-icone popup__close-icone" type="button"></button>
      <div className="popup__container-form">
        <form
        className="popup__form popup__delete-form"
        name="delete"
        novalidate>
        <h2 className="popup__container-form-title">Вы уверены?</h2>
        <button
            className="popup__container-form-submit-button popup__container-form-submit-button_type_delete"
            type="submit"
            value="Да">
            Да
          </button>
        </form>
      </div>
    </div>
    <div className="popup popup_type_avatar">
      <button className="popup__avatar-close-icone popup__close-icone" type="button"></button>
      <div className="popup__container-form">
        <form
        className="popup__form popup__avatar-form"
        name="avatar">
        <h2 className="popup__container-form-title">Обновить аватар</h2>
        <input
        id="avatar-input"
        className="popup__container-form-input popup__container-form-input_avatar"
        type="url"
        name="avatar"
        placeholder="Введите URL"
        minlength="2"
        maxlength="300"
        required
      />
        <span className="avatar-input-error popup__error"></span>
        <button
            className="popup__container-form-submit-button popup__container-form-submit-button_type_avatar"
            type="submit"
            value="Сохранить">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  </main>
    )
}

export default Main;