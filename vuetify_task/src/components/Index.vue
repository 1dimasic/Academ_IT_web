<template>
    <v-app-bar color="deep-purple-lighten-3">
        <v-toolbar-title class="text-h5 v-col-4">Кинотеатр</v-toolbar-title>
        <v-text-field class="v-col-4 mt-5"
                      variant="outlined"
                      v-model.trim="term"
                      placeholder="Найти"
                      clearable></v-text-field>
        <router-link to="/favorites" class="v-col-2">
            <v-btn class="float-end" icon="mdi-movie-open-star"></v-btn>
        </router-link>
    </v-app-bar>
    <v-infinite-scroll :onLoad="loadFilms">
        <v-container>
            <v-row align="center" justify="center">
                <v-col v-for="film in films"
                       :key="film.id"
                       xl="2"
                       lg="3"
                       md="4"
                       sm="6"
                       xs="12">
                    <film :film="film" :genres="genres"></film>
                </v-col>
            </v-row>
        </v-container>
    </v-infinite-scroll>
</template>

<script>
import CinemaService from "@/components/CinemaService";
import _ from "lodash";
import Film from "@/components/Film.vue";
import {useFavoritesFilmsStore} from "@/store/FavoritesFilmsStore";

export default {
    name: "Index",

    data() {
        return {
            films: [],
            genres: [],
            term: "",
            page: 0,
            store: useFavoritesFilmsStore(),
            service: new CinemaService()
        };
    },

    components: {
        Film
    },

    mounted() {
        this.loadGenres();
    },

    watch: {
        term(newValue) {
            this.setFilter(newValue);
        }
    },

    methods: {
        async loadFilms({done}) {
            this.page += 1;

            if (!this.term) {
                this.service.loadPopularsFilms(this.page).then(response => {
                    this.films = this.films.concat(response.data.results);
                    done("ok");
                }).catch(() => alert("Не удалось загрузить фильмы"));
            } else {
                this.service.loadSearchingFilms(this.term, this.page).then(response => {
                    this.films = this.films.concat(response.data.results);
                    done("ok");
                }).catch(() => alert("Не удалось загрузить фильмы"));
            }
        },

        // TODO
        setFilter: _.debounce(function () {
            this.films = [];
            this.page = 0;
        }, 500),

        loadGenres() {
            this.service.loadGenres().then(response => {
                this.genres = response.data.genres;
            }).catch(() => alert("Не удалось загрузить наименования жанров"));
        }
    }
}
</script>
