class Api {
  constructor({ domain, token }) {
    this._domain = domain;
    this._headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Origin: "http://localhost:3001", // формируется автоматически браузером
      Host: "http://localhost:3000", //
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status} - ${res.statusText}`);
  }

  makeRequest(url, method = "GET", body) {
    const requestUrl = this._domain + url;
    return fetch(requestUrl, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  getUserValue() {
    const infoUsersDefault = "/users/me";
    return this.makeRequest(infoUsersDefault);
  }

  getCardsFromServer() {
    const cardsFromServer = "/cards";
    return this.makeRequest(cardsFromServer);
  }

  changeUserInfo(userValue) {
    const requestUrl = "/users/me";
    const userData = userValue;

    //передать объект на сервер
    return this.makeRequest(requestUrl, "PATCH", userData);
  }

  changeAvatar(avatarUrl) {
    const requestUrl = "/users/me/avatar";
    return this.makeRequest(requestUrl, "PATCH", avatarUrl);
  }

  handlerAddCard(cardsData) {
    const requestUrl = "/cards";
    return this.makeRequest(requestUrl, "POST", cardsData);
  }

  changeLikeCardStatus(cardId, islikedState) {
    const requestUrl = `/cards/${cardId}/likes`;
    return this.makeRequest(requestUrl, `${islikedState ? "PUT" : "DELETE"}`);
  }

  deleteLikeOnCard(cardId) {
    const requestUrl = `/cards/${cardId}/likes`;
    return this.makeRequest(requestUrl, "DELETE");
  }

  addLikeOnCard(cardId) {
    const requestUrl = `/cards/${cardId}/likes`;
    return this.makeRequest(requestUrl, "PUT");
  }

  deleteCard(cardId) {
    const requestUrl = `/cards/${cardId}`;
    return this.makeRequest(requestUrl, "DELETE");
  }
}

const jwt = localStorage.getItem("jwt");

export const api = new Api({
  domain: "http://localhost:3000", // "https://mesto.nomoreparties.co/v1/cohort-42",
  token: jwt,
});

// export const api = new Api({
//   domain: "https://mesto.nomoreparties.co/v1/cohort-42",
//   token: "96627758-08f0-44b6-bee2-1f817be1a78f",
// });
