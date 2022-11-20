class MoviesApi {
    constructor(options) {
        this._moviesUrl = options.moviesUrl;
        this._headers = options.headers;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json()
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res}`);
    }

    getMovies() {
        return fetch(`${this._moviesUrl}`, {
            method: "GET",
            headers: this._headers,
        })
            .then(res => {
                return this._getResponseData(res);
            })
            .then(data => data);
    };
};

const moviesApi = new MoviesApi({
    moviesUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default moviesApi;