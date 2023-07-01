export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization;
    this._headers = options.headers;
    this._contentType = options.headers['Content-Type'];
  }

  _getCheck(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(this._baseUrl + 'cards', {
      headers: {
        authorization: this._token
      }
    }).then(res => this._getCheck(res));
  }

  addNewCard({ name, link }) {
    return fetch(this._baseUrl + 'cards', {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(res => this._getCheck(res));
  }

  getProfileContent() {
    return fetch(this._baseUrl + 'users/me', {
      headers: {
        authorization: this._token
      }
    }).then(res => this._getCheck(res));
  }

  submitProfileData({ name, about }) {
    return fetch(this._baseUrl + 'users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => this._getCheck(res));
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + `cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._getCheck(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(this._baseUrl + `cards/${cardId}/likes`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers
    }).then(res => this._getCheck(res));
  }

  submitEditAvatar({ avatar }) {
    return fetch(this._baseUrl + 'users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: avatar
      })
    }).then(res => this._getCheck(res));
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65/',
  headers: {
    authorization: '3f6b2ef5-b9e5-4ebd-9f38-797a06c223a7',
    'Content-Type': 'application/json'
  }
});
