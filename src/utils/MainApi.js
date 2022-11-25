class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json()
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res}`);
    }

    _getHeaders() {
        const jwt = localStorage.getItem("jwt");
        return {
            "Authorization": `Bearer ${jwt}`,
            ...this._headers
        }
    }

    // Метод получения информации о профиле пользователя
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._getHeaders(),
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    // Метод обновления информации о профиле пользователя
    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            credentials: 'include',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                email: data.email
            }),
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    // Метод удаления фильма
    deleteMovie(cardId) {
        return fetch(`${this._baseUrl}/movies/${cardId}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
            credentials: 'include'
        })
            .then((res) => this._getResponseData(res));
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: this._getHeaders(),
            credentials: 'include',
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    saveMovie(data) {
        const movieURL = 'https://api.nomoreparties.co';
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: this._getHeaders(),
            credentials: 'include',
            body: JSON.stringify({
                country: data.country || ' ',
                director: data.director || ' ',
                duration: data.duration || ' ',
                year: data.year || ' ',
                description: data.description || ' ',
                image: `${movieURL}${data.image.url}` || ' ',
                trailerLink: data.trailerLink || ' ',
                thumbnail: `${movieURL}${data.image.formats.thumbnail.url}` || ' ',
                movieId: data.id || ' ',
                nameRU: data.nameRU || ' ',
                nameEN: data.nameEN || ' ',
            }),
        })
            .then((res) => this._getResponseData(res));
    }
}

const mainApi = new MainApi({
    //baseUrl: 'https://api.movie-exp.prokofyev.nomoredomains.icu/api',
    baseUrl: 'http://localhost:3005/api',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
})

export default mainApi;