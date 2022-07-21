import React from "react";

import { CurrentUserContext } from "./../contexts/CurrentUserContext";
import { CardsContext } from "./../contexts/CardsContext";
//import ReactDOM from "react-dom/client";

import { Route, Switch } from "react-router-dom";

import "./../index.css";

import { api } from "../utils/Api";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditeProfilePopup";
import EditAvatarPopup from "./EditAvatarProfile";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Register from "./Register";
import Login from "./Login";
import FailRegistrationPopup from "./FailRegistrationPopup";
import SuccessRegistrationPopup from "./SuccessRegistrationPopup";

const App = () => {
  const [isEditAvatarPopupOpen, setEditAvatar] = React.useState(false);
  const handleClickAvatar = () => {
    setEditAvatar(!isEditAvatarPopupOpen);
  };

  const [isEditProfilePopupOpen, setEditProfile] = React.useState(false);
  const handleClickProfile = () => {
    setEditProfile(!isEditProfilePopupOpen);
  };

  const [isAddPlacePopupOpen, setAddPlace] = React.useState(false);
  const handleClickPlace = () => {
    setAddPlace(!isAddPlacePopupOpen);
  };
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] =
    React.useState(false);
  const handleFirstDelete = () => {
    setConfirmDeletePopupOpen(!isConfirmDeletePopupOpen);
  };

  //popup уведомление о регистрации
  const [isSuccessRegistrationPopupOpen, setSuccessRegistrationPopupOpen ] = React.useState(true);
  const pushSuccessRegistration = () => {
    setSuccessRegistrationPopupOpen(!isSuccessRegistrationPopupOpen)
  }

  const [isFailRegistrationPopupOpen, setFailRegistrationPopupOpen ] = React.useState(false);
  const pushFailRegistration = () => {
    setFailRegistrationPopupOpen(!isFailRegistrationPopupOpen)
  }

  const closeAllPopups = () => {
    setEditAvatar(false);
    setEditProfile(false);
    setAddPlace(false);
    onGalleryPopup(false);
    setConfirmDeletePopupOpen(false);
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
  const [cardForDelete, setCardForDelete] = React.useState({});
  function saveCardForDelete(card) {
    setCardForDelete(card);
  }

  const handleDeleteConfirm = () => {
    api
      .deleteCard(cardForDelete._id)
      .then(() =>
        setPlaceCards(cards.filter((item) => item._id !== cardForDelete._id))
      )
      .then(() => setCardForDelete({}))
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Упс, ошибка ${err}`);
      });
  };

  function handleUpdateUser(userValueForm) {
    api
      .changeUserInfo(userValueForm)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Упс, ошибка ${err}`);
      });
  }
  function handleUpdateAvatar(avatarValueForm) {
    api
      .changeAvatar(avatarValueForm)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Упс, ошибка ${err}`);
      });
  }

  function handleAddPlace(newCard) {
    api
      .handlerAddCard(newCard)
      .then((res) => {
        setPlaceCards([res, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Упс, ошибка ${err}`);
      });
  }

  function handlerSubmitRegister(registerValue) {
    console.log(registerValue);
  }

  return (
    <div className="page">
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>
          <Switch>
            <Route exact path="/">
              <Main
                onEditAvatar={handleClickAvatar}
                onEditProfile={() => handleClickProfile()}
                onAddPlace={handleClickPlace}
                clickOnCard={handleClickOnCard}
                handleCardLike={(card) => handleCardLike(card)}
                handleDeleteClick={saveCardForDelete}
                onConfirmDelete={handleFirstDelete}
              />
            </Route>
            <Route path="/sign-up">
              <Register onUpdater={handlerSubmitRegister} />
            </Route>
            <Route path="/sign-in">
              <Login 
              />
            </Route>
          </Switch>
        </CardsContext.Provider>

        <SuccessRegistrationPopup
        isOpen={isSuccessRegistrationPopupOpen}/>

        <FailRegistrationPopup
        isOpen={isFailRegistrationPopupOpen}/>

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

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={() => handleDeleteConfirm()}
        />
      </CurrentUserContext.Provider>
      <Footer />
    </div>
  );
};

export default App;
