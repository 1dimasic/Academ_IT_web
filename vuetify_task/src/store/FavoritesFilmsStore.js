import {defineStore} from "pinia";


export const useFavoritesFilmsStore = defineStore("favoritesFilms", {
    state() {
        return {
            films: JSON.parse(localStorage.getItem("favoritesFilms"))
        };
    },

    actions: {
        addFilmToFavorites(film) {
            this.films.push(film);
            localStorage.setItem("favoritesFilms", JSON.stringify(this.films))
        },

        removeFilmFromFavorites(filmId) {
            this.films = this.films.filter(film => film.id !== filmId);
            localStorage.setItem("favoritesFilms", JSON.stringify(this.films))
        },

        containsFilmInFavorites(filmId) {
            return this.films.some(film => film.id === filmId);
        }
    }
});
