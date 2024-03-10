import {defineStore} from "pinia";


export const useGenresStore = defineStore("genres", {
    state() {
        return {
            genres: []
        };
    }
});
