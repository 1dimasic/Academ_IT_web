<template>
    <v-card
        class="mx-auto"
        max-width="350px">
        <v-card-item>
            <div>
                <div class="mb-1 text-lg-h6 font-weight-bold">{{ currentFilm.title }}</div>
                <div>
                    <v-img :src="`https://image.tmdb.org/t/p/w500${currentFilm.poster_path}`"
                           width="230px"></v-img>
                </div>
                <div class="font-weight-bold">{{ getGenresNames() }}</div>
            </div>
        </v-card-item>
        <v-card-actions>
            <v-btn size="medium" color="green-lighten-1" icon="mdi-movie"
                   @click="showFilmDetails"></v-btn>
            <v-spacer></v-spacer>
            <v-btn size="medium" :color="isFavoriteFilmButtonColor" icon="mdi-heart"
                   @click="addFilmToFavorite"></v-btn>
        </v-card-actions>
    </v-card>
    <film-details ref="filmDetailsModalDialog"
                  :isFavoriteFilm="isFavoriteFilm"
                  :film="currentFilm"
                  @add="addFilmToFavorite"></film-details>
</template>

<script>
import FilmDetails from "@/components/FilmDetails.vue";
import {useFavoritesFilmsStore} from "@/store/app";
import FavoriteFilms from "@/components/FavoriteFilms.vue";

export default {
    name: "Film",

    data() {
        return {
            currentFilm: this.film,
            isFavoriteFilm: false,
            store: useFavoritesFilmsStore()
        }
    },

    components: {
        FilmDetails,
        FavoriteFilms
    },

    props: {
        film: Object,
        genres: Array
    },

    computed: {
        isFavoriteFilmButtonColor() {
            return this.isFavoriteFilm ? "red" : "grey"
        }
    },

    methods: {
        showFilmDetails() {
            this.$refs.filmDetailsModalDialog.show();
        },

        getGenresNames() {
            return this.genres
                .filter(g => this.currentFilm.genre_ids.includes(g.id))
                .map(g => g.name)
                .slice(0, 2)
                .join(", ");
        },

        addFilmToFavorite() {
            // успешное добавление в store
            if (!this.isFavoriteFilm) {
                this.store.add(this.currentFilm);
                //console.log(this.store.items);
            } else {
                // успешное удаление из store
                this.store.remove(this.currentFilm);
                //console.log(this.store.items);
            }
            this.isFavoriteFilm = !this.isFavoriteFilm;
        }
    }
}
</script>
