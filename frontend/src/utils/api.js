class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  
  _checkResponse(res) {
    if (res.ok) return res.json();
    else return Promise.reject(res.statusText);
  }
  
  _request(url, headers) {
    return fetch(url, headers).then(this._checkResponse);
  }
  
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
  }
  
  getInitialCards(token) {
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
  }


  setUserInfo({ name, about }, token) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId, token) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: "DELETE",
    });
  }

  toggleLike(cardId, isLiked, token) {
    let method;
    isLiked ? (method = "DELETE") : (method = "PUT");
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: method,
    });
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
