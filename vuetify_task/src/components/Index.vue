<template>
    <v-app-bar color="deep-purple-lighten-3">
        <v-toolbar-title class="text-h5 v-col-4">Кинотеатр</v-toolbar-title>
        <v-text-field class="v-col-4 mt-5"
                      variant="outlined"
                      v-model.trim="term"
                      placeholder="Найти"
                      clearable></v-text-field>
        <a :href="'/favorites'" class="v-col-2">
            <v-btn class="float-end" icon="mdi-movie-open-star"></v-btn>
        </a>
    </v-app-bar>
    <v-infinite-scroll :onLoad="getFilms">
        <v-container>
            <v-row align="center" justify="cent er">
                <v-col xl="2"
                       lg="3"
                       md="4"
                       sm="6"
                       xs="12"
                       v-for="film in filmsList"
                       :key="film.id">
                    <film :film="film" :genres="genres"></film>
                </v-col>
            </v-row>
        </v-container>
    </v-infinite-scroll>
</template>

<script>
import axios from "axios";
import Film from "@/components/Film.vue";
import _ from "lodash";

export default {
    name: "Index",

    components: {
        Film,
    },

    data() {
        return {
            filmsList: [],
            page: 0,
            genres: [],
            term: ""
        }
    },

    watch: {
        term(newTerm) {
            this.loadFilms(newTerm);
        }
    },

    methods: {
        loadFilms: _.debounce(function () {
            this.getFilms();
            this.filmsList = [];
            this.page = 0;
        }, 500),


        getFilms() {
            if (!this.term) {
                axios.get("https://api.themoviedb.org/3/movie/popular", {
                    params: {
                        api_key: "e54fe9c197f033da85a056da00280567",
                        language: "ru",
                        page: ++this.page
                    }
                }).then(response => {
                    this.filmsList = this.filmsList.concat(response.data.results);
                }).catch(() => alert("Не удалось загрузить фильмы"));
            } else {
                axios.get(`https://api.themoviedb.org/3/search/movie?query=${this.term}`, {
                    params: {
                        api_key: "e54fe9c197f033da85a056da00280567",
                        language: "ru",
                        include_adult: "false",
                        page: ++this.page
                    }
                }).then(response => {
                    this.filmsList = this.filmsList.concat(response.data.results);
                }).catch(() => alert("Не удалось загрузить фильмы ПОИСК"));
            }
        },

        getGenres() {
            axios.get("https://api.themoviedb.org/3/genre/movie/list", {
                params: {
                    api_key: "e54fe9c197f033da85a056da00280567",
                    language: "ru"
                }
            }).then(response => {
                this.genres = response.data.genres;
            }).catch(() => alert("Не удалось загрузить наименования жанров"));
        },
    },

    mounted() {
        this.getFilms();
        this.getGenres();
    }
}
</script>
<style scoped>
</style>
