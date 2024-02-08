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

        remove(film) {
            this.items = this.items.filter(item => item.id !== film.id);
        }
    }
});
