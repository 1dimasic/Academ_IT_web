<template>
    <v-app-bar color="deep-purple-lighten-3">
        <v-toolbar-title class="text-h4 v-col-2">Кинотеатр</v-toolbar-title>
        <router-link to="/favorites" class="v-col-2">
            <v-btn prepend-icon="mdi-movie-open-star" color="white" class="text-h5">
                Избранное
            </v-btn>
        </router-link>
        <v-text-field class="v-col-2 mt-5"
                      variant="outlined"
                      v-model.trim="term"
                      placeholder="Найти"
                      clearable>
        </v-text-field>
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
    <v-dialog v-model="errorDialog" transition="dialog-bottom-transition" width="auto">
        <v-card>
            <v-toolbar color="deep-purple-lighten-1" title="Ошибка загрузки"></v-toolbar>
            <v-card-text class="text-h5 pa-8">{{ errorDialogMessage }}</v-card-text>
            <v-card-actions class="justify-end">
                <v-btn
                    variant="tonal"
                    class="text-h5"
                    @click="errorDialog=false">
                    Закрыть
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
            service: new CinemaService(),
            errorDialog: false,
            errorDialogMessage: ""
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
                }).catch(() => {
                    this.errorDialog = true;
                    this.errorDialogMessage = "Не удалось загрузить фильмы";
                });
            } else {
                this.service.loadSearchingFilms(this.term, this.page).then(response => {
                    this.films = this.films.concat(response.data.results);
                    done("ok");
                }).catch(() => {
                    this.errorDialog = true;
                    this.errorDialogMessage = "Не удалось загрузить фильмы";
                });
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
            }).catch(() => {
                this.errorDialog = true;
                this.errorDialogMessage = "Не удалось загрузить наименования жанров";
            });
        }
    }
}
</script>
