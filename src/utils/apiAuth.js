export default class ApiAuth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getCheck(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  register(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      })
    }).then(res => this._getCheck(res));
  }

  authorization(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      })
    }).then(res => this._getCheck(res));
  }

  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    }).then(res => this._getCheck(res));
  }

}

export const apiAuth = new ApiAuth('https://auth.nomoreparties.co');