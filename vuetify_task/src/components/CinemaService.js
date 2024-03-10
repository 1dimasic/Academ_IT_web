import axios from "axios";

export default class CinemaService {
    constructor() {
        this.baseUrl = "https://api.themoviedb.org/3";
        this.apiKey = "e54fe9c197f033da85a056da00280567";
        this.language = "ru";
        this.isAdult = false;
    }

    loadPopularsFilms(page) {
        return axios.get(`${this.baseUrl}/movie/popular`, {
            params: {
                api_key: this.apiKey,
                language: this.language,
                page: page
            }
        });
    }

    loadSearchingFilms(term, page) {
        return axios.get(`${this.baseUrl}/search/movie?query=${term}`, {
            params: {
                api_key: this.apiKey,
                language: this.language,
                include_adult: this.isAdult,
                page: page
            }
        });
    }

    loadGenres() {
        return axios.get(`${this.baseUrl}/genre/movie/list`, {
            params: {
                api_key: this.apiKey,
                language: this.language
            }
        });
    }

    loadFilmDetails(id) {
        return axios.get(`${this.baseUrl}/movie/${id}`, {
            params: {
                api_key: this.apiKey,
                language: this.language
            }
        });
    }

    loadRecommendedFilms(id) {
        return axios.get(`${this.baseUrl}/movie/${id}/recommendations`, {
            params: {
                api_key: this.apiKey,
                language: this.language
            }
        });
    }
}
