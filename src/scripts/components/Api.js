export default class Api {
  constructor({ address, token}) {
    this._address = address;
    this._token = token;
  }

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


  /*
  addNewCard() {
    return fetch(`${this._address}/v1/cohort-22/cards`, {
      method: 'POST',
      headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({data})
      }
    )
    .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка ${response.status}`)
  });
  }

  removeCard(id) {
    return fetch(`${this._address}/v1/cohort-22/cards${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) =>
      res.ok
        ? Promise.resolve("success")
        : Promise.reject(`Ошибка ${res.status}`)
    );
  }
  */
}
