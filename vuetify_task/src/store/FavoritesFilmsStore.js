import {defineStore} from "pinia";

export const useFavoritesFilmsStore = defineStore("favoritesFilms", {
    state() {
        return {
            items: []
        };
    },

    actions: {
        addFilmToFavorites(film) {
            this.items.push(film);
        },

        removeFilmFromFavorites(filmId) {
            this.items = this.items.filter(item => item.id !== filmId);
        },

        containsFilmInFavorites(filmId) {
            return Boolean(this.items.find(item => item.id === filmId));
        }
    }
});
