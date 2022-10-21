class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    else return Promise.reject(res.statusText);
  }

  _request(url, headers) {
    return fetch(url, headers).then(this._checkResponse);
  }

  getInitialCards(token) {
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
    });
  }

  getUserInfo(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
    });
  }

  setUserInfo({ name, about }, token) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  setUserAvatar(avatar, token) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  createCard(data, token) {
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId, token) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      method: "DELETE",
    });
  }

  toggleLike(cardId, isLiked, token) {
    let method;
    isLiked ? (method = "DELETE") : (method = "PUT");
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      method: method,
    });
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
});

export default api;
