export default class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }
//получить инфо пользователя с сервера
  getUserData() {
    return fetch(`${this._address}/v1/cohort-22/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }
//получить карточки с сервера
  getInitialCards() {
    return fetch(`${this._address}/v1/cohort-22/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  setUserData(data) {
    return fetch(`${this._address}/v1/cohort-22/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  addNewCard (data) {
    return fetch(`${this._address}/v1/cohort-22/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }
}
