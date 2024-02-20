<template>
    <v-card
        class="mx-auto"
        max-width="350px"
        hover>
        <router-link :to="`/film/${film.id}`" style="text-decoration: none;">
            <v-card-item>
                <div>
                    <div class="mb-1 text-h7 text-md-h6 font-weight-bold">{{ film.title }}</div>
                    <div>
                        <v-img :src="`https://image.tmdb.org/t/p/w500${film.poster_path}`"
                               cover></v-img>
                    </div>
                    <div class="font-weight-bold">{{ getGenresNames }}</div>
                </div>
            </v-card-item>
        </router-link>
        <v-card-actions>
            <v-btn size="medium"
                   color="green-lighten-1"
                   prepend-icon="mdi-movie"
                   class="text-h6"
                   @click="showFilmDetails">
                Подробнее
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn size="medium"
                   :color="favoriteFilmButtonColor"
                   append-icon="mdi-heart"
                   class="text-h6"
                   @click="setFavoriteMode">
                Добавить
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {useFavoritesFilmsStore} from "@/store/FavoritesFilmsStore"

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
            return this.store.contains(this.film.id)? "red": "grey"
        }
    },

    methods: {
        showFilmDetails() {
            this.$router.push({path: `/film/${this.film.id}`})
        },

        setFavoriteMode() {
            if (!this.store.contains(this.film.id)) {
                this.store.add(this.film)
            } else {
                this.store.remove(this.film.id);
            }
        }
    }
}
</script>
