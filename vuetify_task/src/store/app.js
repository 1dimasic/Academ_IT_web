import {defineStore} from "pinia";

export const useFavoritesFilmsStore = defineStore("favoritesFilms", {
    state() {
        return {
            favoritesFilmsItems: []
        };
    },

    actions: {
        add(film) {
            this.favoritesFilmsItems.push(film);
        }
    }
});
