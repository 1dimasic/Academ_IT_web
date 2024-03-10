<template>
    <v-app-bar color="indigo-accent-2">
        <v-toolbar-title class="text-h5 v-col-4">Избранное</v-toolbar-title>
        <router-link to="/">
            <v-btn prepend-icon="mdi mdi-movie-roll" color="white" class="text-xl-h4 text-md-h6">
                Кинотеатр
            </v-btn>
        </router-link>
    </v-app-bar>
    <v-container>
        <v-row align="center" justify="center">
            <v-col v-for="film in store.films" :key="film.id"
                   xl="2"
                   lg="3"
                   md="4"
                   sm="6"
                   xs="12">
                <film :film="film"></film>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {useFavoritesFilmsStore} from "@/store/FavoritesFilmsStore";
import Film from "@/components/Film.vue";

export default {
    name: "FavoritesFilms",

    components: {
        Film
    },

    data() {
        return {
            store: useFavoritesFilmsStore()
        };
    }
};
</script>
