export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._header = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, { headers: this._header }).then((res) =>
      this._checkResponse(res)
    );
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._header }).then(
      (res) => this._checkResponse(res)
    );
  }

  updateUserProfile({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      }),
    }).then((res) => this._checkResponse(res));
  }

  updateAvatar({ link }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        avatar: `${link}`,
      }),
    }).then((res) => this._checkResponse(res));
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._header,
    }).then((res) => this._checkResponse(res));
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._header,
    }).then((res) => this._checkResponse(res));
  }

  dislikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._header,
    }).then((res) => this._checkResponse(res));
  }
}
