<template>
    <v-card class="mx-auto" min-width="275px" max-width="350px" hover>
        <router-link :to="`/film/${film.id}`" style="text-decoration: none; color: #01579B;">
            <v-card-item>
                <div>
                    <div class="font-weight-bold" style="height:3em;">{{ film.title }}</div>
                    <div>
                        <v-img :src="`https://image.tmdb.org/t/p/w500${film.poster_path}`"
                               cover
                               style="height: 22rem"></v-img>
                    </div>
                    <div class="font-weight-medium">{{ getGenresNames }}</div>
                </div>
            </v-card-item>
        </router-link>
        <v-card-actions>
            <v-btn size="small"
                   color="green-accent-4"
                   prepend-icon="mdi-movie"
                   class="text-xl-h6"
                   @click="showFilmDetails">
                Подробнее
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn size="small"
                   :color="favoriteFilmButtonColor"
                   append-icon="mdi-heart"
                   class="text-xl-h6"
                   @click="setFavoriteMode">
                {{ favoriteFilmButtonText }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {useFavoritesFilmsStore} from "@/store/FavoritesFilmsStore";
import {useGenresStore} from "@/store/GenresStore";

export default {
    name: "Film",

    data() {
        return {
            favoritesFilmsStore: useFavoritesFilmsStore(),
            genresStore: useGenresStore()
        };
    },

    props: {
        film: Object,
        genres: Array
    },

    computed: {
        getGenresNames() {
            return this.genresStore.genres
                .filter(g => this.film.genre_ids.includes(g.id))
                .map(g => g.name)
                .slice(0, 2)
                .join(", ");
        },

        favoriteFilmButtonColor() {
            return this.favoritesFilmsStore.containsFilmInFavorites(this.film.id) ? "red-accent-4" : "grey-darken-1";
        },

        favoriteFilmButtonText() {
            return this.favoritesFilmsStore.containsFilmInFavorites(this.film.id) ? "Избранное" : "Добавить";
        }
    },

    methods: {
        showFilmDetails() {
            this.$router.push({path: `/film/${this.film.id}`});
        },

        setFavoriteMode() {
            if (!this.favoritesFilmsStore.containsFilmInFavorites(this.film.id)) {
                this.favoritesFilmsStore.addFilmToFavorites(this.film);
            } else {
                this.favoritesFilmsStore.removeFilmFromFavorites(this.film.id);
            }
        }
    }
};
</script>
