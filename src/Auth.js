export const BASE_URL = "http://api.vmesto.insta.nomoredomains.sbs"; // https://auth.nomoreparties.co "http://vmesto.insta.nomoredomains.sbs" "http://localhost:3000"

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => data);
};

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(`Упс, ошибка ${err}`);
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => data);
};

//вставить проверку на ответ от сервера
// .then((res) => {
//   if (res.ok) {
//     return res.json()
//   }
//   return Promise.reject(res.status);
