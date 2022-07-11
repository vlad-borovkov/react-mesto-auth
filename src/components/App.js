import React from "react";
import "./../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditeProfilePopup";
import EditAvatarPopup from "./EditAvatarProfile";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";
import { CardsContext } from "./../contexts/CardsContext";
import Card from "./Card";

const App = () => {
  const [isEditAvatarPopupOpen, onEditAvatar] = React.useState(false);
  const handleClickAvatar = () => {
    onEditAvatar(!isEditAvatarPopupOpen);
  };

  const [isEditProfilePopupOpen, onEditProfile] = React.useState(false);
  const handleClickProfile = () => {
    onEditProfile(!isEditProfilePopupOpen);
  };

  const [isAddPlacePopupOpen, onAddPlace] = React.useState(false);
  const handleClickPlace = () => {
    onAddPlace(!isAddPlacePopupOpen);
  };
  const closeAllPopups = () => {
    onEditAvatar(false);
    onEditProfile(false);
    onAddPlace(false);
    onGalleryPopup(false);
    setSelectedCard({});
  };
  //открытие ZOOM галлереи
  const [isGalleryPopupOpen, onGalleryPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const handleClickOnCard = (card) => {
    onGalleryPopup(!isGalleryPopupOpen);
    setSelectedCard(card);
  };
  //получаем глобальный стейт информации пользователя и рендерим
  const [currentUser, setCurrentUser] = React.useState([]);
  React.useEffect(() => {
    api
      .getUserValue()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Упс, ошибка ${err}`);
      });
  }, []);
  //получаем массив начальных карточек и рендерим
  const [cards, setPlaceCards] = React.useState([]);
  React.useEffect(() => {
    api
      .getCardsFromServer()
      .then((res) => {
        setPlaceCards(res);
      })
      .catch((err) => {
        console.log(`Упс, ошибка ${err}`);
      });
  }, []);
  // постановка-снятие лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setPlaceCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Упс, ошибка ${err}`);
      });
  }
  //удаляем карточку пользователя
  function handleDeleteClick(card) {
    //console.log(card)
    api.deleteCard(card._id).catch((err) => {
      console.log(`Упс, ошибка ${err}`);
    });
    setPlaceCards(cards.filter((item) => item._id !== card._id));
  }

  function handleUpdateUser(userValueForm) {
    api
      .changeUserInfo(userValueForm)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Упс, ошибка ${err}`);
      });
    closeAllPopups();
  }
  function handleUpdateAvatar(avatarValueForm) {
    api
      .changeAvatar(avatarValueForm)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Упс, ошибка ${err}`);
      });
    closeAllPopups();
  }

  function handleAddPlace(newCard) {
    api.handlerAddCard(newCard).then((res) => {
      setPlaceCards([res, ...cards]) 
    })
    closeAllPopups();
  }

  return (
    <div className="page">
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>
          <Main
            onEditAvatar={handleClickAvatar}
            onEditProfile={() => handleClickProfile()}
            onAddPlace={handleClickPlace}
            clickOnCard={handleClickOnCard}
            handleCardLike={(card) => handleCardLike(card)}
            handleDeleteClick={handleDeleteClick}
          />

        </CardsContext.Provider>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <ImagePopup
          clickedCard={selectedCard}
          closeAllPopup={closeAllPopups}
          isOpen={isGalleryPopupOpen}
        />
    
      </CurrentUserContext.Provider>
      <Footer />
    </div>
  );
};

export default App;
