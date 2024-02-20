<template>
    <v-card class="mx-auto" max-width="350px" hover>
        <router-link :to="`/film/${film.id}`" style="text-decoration: none; color: #7E57C2;">
            <v-card-item>
                <div>
                    <div class="mb-1 text-xl-h6 font-weight-bold">{{ film.title }}</div>
                    <div>
                        <v-img :src="`https://image.tmdb.org/t/p/w500${film.poster_path}`" cover></v-img>
                    </div>
                    <div class="font-weight-bold">{{ getGenresNames }}</div>
                </div>
            </v-card-item>
        </router-link>
        <v-card-actions>
            <v-btn size="small"
                   color="green"
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
                Добавить
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {useFavoritesFilmsStore} from "@/store/FavoritesFilmsStore";

export default {
    name: "Film",

    data() {
        return {
            store: useFavoritesFilmsStore()
        };
    },

    props: {
        film: Object,
        genres: Array
    },

    computed: {
        getGenresNames() {
            return this.genres
                .filter(g => this.film.genre_ids.includes(g.id))
                .map(g => g.name)
                .slice(0, 2)
                .join(", ");
        },

        favoriteFilmButtonColor() {
            return this.store.containsFilmInFavorites(this.film.id)? "red-accent-4": "grey-darken-1";
        }
    },

    methods: {
        showFilmDetails() {
            this.$router.push({path: `/film/${this.film.id}`});
        },

        setFavoriteMode() {
            if (!this.store.containsFilmInFavorites(this.film.id)) {
                this.store.addFilmToFavorites(this.film);
            } else {
                this.store.removeFilmFromFavorites(this.film.id);
            }
        }
    }
};
</script>
