import React from "react";

import { CurrentUserContext } from "./../contexts/CurrentUserContext";
import { CardsContext } from "./../contexts/CardsContext";
//import ReactDOM from "react-dom/client";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import "./../index.css";

import { api } from "../utils/Api";
import * as auth from "../Auth.js";

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
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  //открытие-закрытие окон
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
  const closeAllPopups = () => {
    setEditAvatar(false);
    setEditProfile(false);
    setAddPlace(false);
    onGalleryPopup(false);
    setConfirmDeletePopupOpen(false);
    setFailRegistrationPopupOpen(false);
    setSuccessRegistrationPopupOpen(false);
    setSelectedCard({});
  };

  //popup уведомление о регистрации
  const [isSuccessRegistrationPopupOpen, setSuccessRegistrationPopupOpen] =
    React.useState(false);
  const pushSuccessRegistration = () => {
    setSuccessRegistrationPopupOpen(!isSuccessRegistrationPopupOpen);
  };
  const [isFailRegistrationPopupOpen, setFailRegistrationPopupOpen] =
    React.useState(false);
  const pushFailRegistration = () => {
    setFailRegistrationPopupOpen(!isFailRegistrationPopupOpen);
  };
  const [isPopupErrorMessage, setPopupErrorMessage] = React.useState("");

  //регистрация пользователя
  function handlerSubmitRegister(registerValue) {
    auth
      .register(registerValue)
      .then((data) => {
        if (data.message) {
          setPopupErrorMessage(data.message);
          pushFailRegistration();
        }
        return data;
      })
      .then((data) => {
        if (data._id) {
          pushSuccessRegistration();
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(`Упс, ошибка ${err}`);
      });
  }

  //авторизация пользователя, стейт атворизации для защищенного роута
  const [loggedIn, setLoggedIn] = React.useState(false);
  function handlerSubmitLogin(registerValue) {
    auth
      .authorize(registerValue)
      .then((data) => {
        if (data.message) {
          setPopupErrorMessage(data.message);
          pushFailRegistration();
        }
        return data;
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      })
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
        }
      })
      .then(() => history.push("/"))
      .catch((err) => {
        console.log(`Упс, ошибка ${err}`);
      });
  }

  //получение текущего Email после авторизации и рендеринг в Header
  const [currenUserEmail, setCurrenUserEmail] = React.useState("");
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .getUserValue()
        .then((data) => {
          setCurrenUserEmail(data.user.email);
        })
        .catch((err) => {
          console.log(`Упс, ошибка ${err}`);
        });
    }
  }, [loggedIn]);

  //выход из личного кабинета
  function handleLogOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  //получаем глобальный стейт информации пользователя и рендерим КОГДА АВТОРИЗОВАН!
  const [currentUser, setCurrentUser] = React.useState([]);
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserValue()
        .then((res) => {
          setCurrentUser(res.user);
        })
        .catch((err) => {
          console.log(`Упс, ошибка ${err}`);
        });
    }
  }, [loggedIn]);
  //получаем массив начальных карточек и рендерим
  const [cards, setPlaceCards] = React.useState([]);
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getCardsFromServer()
        .then((res) => {
          //console.log(res.cards);
          setPlaceCards(res.cards);
        })
        .catch((err) => {
          console.log(`Упс, ошибка ${err}`);
        });
    }
  }, [loggedIn]);
  // постановка-снятие лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setPlaceCards((state) =>
          state.map((item) => (item._id === card._id ? newCard.likes : item))
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
      .then(() => {
        setPlaceCards(cards.filter((item) => item._id !== cardForDelete._id));
        setCardForDelete({});
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Упс, ошибка ${err}`);
      });
  };

  //открытие ZOOM галлереи
  const [isGalleryPopupOpen, onGalleryPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const handleClickOnCard = (card) => {
    onGalleryPopup(!isGalleryPopupOpen);
    setSelectedCard(card);
  };
  //работа с данными пользователя: описание, аватарка, загрузка фото-карточки
  function handleUpdateUser(userValueForm) {
    api
      .changeUserInfo(userValueForm)
      .then((res) => {
        setCurrentUser(res.user);
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
        setCurrentUser(res.avatar);
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
        setPlaceCards([res.cards, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Упс, ошибка ${err}`);
      });
  }

  const history = useHistory();

  return (
    <div className="page">
      <Header onLogOut={handleLogOut} emailRender={currenUserEmail} />
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleClickAvatar}
              onEditProfile={() => handleClickProfile()}
              onAddPlace={handleClickPlace}
              clickOnCard={handleClickOnCard}
              handleCardLike={(card) => handleCardLike(card)}
              handleDeleteClick={saveCardForDelete}
              onConfirmDelete={handleFirstDelete}
            />
            <Route path="/sign-up">
              <Register onUpdater={handlerSubmitRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onUpdater={handlerSubmitLogin} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
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

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={() => handleDeleteConfirm()}
        />

        <SuccessRegistrationPopup
          isOpen={isSuccessRegistrationPopupOpen}
          onClose={closeAllPopups}
        />

        <FailRegistrationPopup
          isOpen={isFailRegistrationPopupOpen}
          onClose={closeAllPopups}
          errorMessage={isPopupErrorMessage}
        />
      </CurrentUserContext.Provider>
      <Footer />
    </div>
  );
};

export default App;
