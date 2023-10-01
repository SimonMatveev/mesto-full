class CardApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _testData(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: {
                ...this._headers
            }
        })
            .then(res => this._testData(res));
    }

    setUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                ...this._headers
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => this._testData(res));
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
            headers: {
                ...this._headers
            }
        })
            .then(res => this._testData(res));
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                ...this._headers
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => this._testData(res));
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                ...this._headers
            }
        })
            .then(res => this._testData(res));
    }

    like(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                ...this._headers
            }
        })
            .then(res => this._testData(res));
    }

    dislike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                ...this._headers
            }
        })
            .then(res => this._testData(res));
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this.dislike(id);
        } else {
            return this.like(id);
        }
    }

    updateAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                ...this._headers
            },
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(res => this._testData(res));
    }
}

export const cardApi = new CardApi({
    baseUrl: 'https://api.simonmatveev.nomoredomainsrocks.ru',
    headers: {
        'Content-Type': 'application/json',
    }
});