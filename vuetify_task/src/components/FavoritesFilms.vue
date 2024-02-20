<template>
    <v-app-bar color="deep-purple-lighten-3">
        <v-toolbar-title class="text-h5 v-col-4">Избранное</v-toolbar-title>
    </v-app-bar>
    <v-container>
        <v-row align="center" justify="center">
            <v-col v-for="film in store.items" :key="film.id"
                   xl="2"
                   lg="3"
                   md="4"
                   sm="6"
                   xs="12">
                <v-card
                    class="mx-auto"
                    max-width="350px">
                    <v-card-item>
                        <div>
                            <div class="mb-1 text-xl-h6 font-weight-bold">{{ film.title }}</div>
                            <div>
                                <v-img :src="`https://image.tmdb.org/t/p/w500${film.poster_path}`" cover></v-img>
                            </div>
                        </div>
                    </v-card-item>
                    <v-card-actions>
                        <v-btn size="small"
                               color="green"
                               prepend-icon="mdi-movie"
                               class="text-xl-h6"
                               @click="showFilmDetails(film.id)">
                            Подробнее
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn size="small"
                               color="red-accent-4"
                               append-icon="mdi-heart"
                               class="text-xl-h6"
                               @click="removeFilmFromFavorites(film.id)">
                            Удалить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {useFavoritesFilmsStore} from "@/store/FavoritesFilmsStore";

export default {
    name: "FavoritesFilms",

    data() {
        return {
            store: useFavoritesFilmsStore()
        };
    },

    methods: {
        removeFilmFromFavorites(filmId) {
            this.store.removeFilmFromFavorites(filmId);
        },

        showFilmDetails(filmId) {
            this.$router.push({path: `/film/${filmId}`});
        }
    }
};
</script>
