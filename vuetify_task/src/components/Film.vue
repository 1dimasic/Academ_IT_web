<template>
    <v-card
        class="mx-auto"
        max-width="350px"
        hover>
        <router-link :to="`/film/${film.id}`" style="text-decoration: none;">
            <v-card-item>
                <div>
                    <div class="mb-1 text-h7 font-weight-bold">{{ film.title }}</div>
                    <div>
                        <v-img :src="`https://image.tmdb.org/t/p/w500${film.poster_path}`"
                               width="230px"></v-img>
                    </div>
                    <div class="font-weight-bold">{{ getGenresNames }}</div>
                </div>
            </v-card-item>
        </router-link>
        <v-card-actions>
            <v-btn size="medium" color="green-lighten-1" icon="mdi-movie"
                   @click="showFilmDetails"></v-btn>
            <v-spacer></v-spacer>
            <v-btn size="medium" :color="favoriteFilmButtonColor" icon="mdi-heart"
                   @click="setFavoriteMode"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {useFavoritesFilmsStore} from "@/store/FavoritesFilmsStore"

export default {
    name: "Film",

    data() {
        return {
            store: useFavoritesFilmsStore(),
            favoriteFilmButtonColor: null
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
        }
    },

    methods: {
        showFilmDetails() {
            this.$router.push({path: `/film/${this.film.id}`})
        },

        setFavoriteMode() {
            if (!this.store.contains(this.film.id)) {
                this.store.add(this.film)
                this.favoriteFilmButtonColor = "red";
            } else {
                this.store.remove(this.film.id);
                this.favoriteFilmButtonColor = "grey";
            }
        }
    }
}
</script>
