import {defineStore} from "pinia";

export const useFavoritesFilmsStore = defineStore("favoritesFilms", {
    state() {
        return {
            items: []
        };
    },

    actions: {
        add(film) {
            this.items.push(film);
        },

        remove(filmId) {
            this.items = this.items.filter(item => item.id !== filmId);
        },

        contains(filmId) {
            return Boolean(this.items.find(item => item.id === filmId));
        }
    }
});
