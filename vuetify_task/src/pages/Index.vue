<template>
    <v-app-bar color="light-blue-darken-2">
        <v-toolbar-title class="text-xl-h4 text-md-h5 v-col-4">Кинотеатр</v-toolbar-title>
        <router-link to="/favorites">
            <v-btn prepend-icon="mdi-movie-open-star" color="white" class="text-xl-h4 text-md-h6">
                Избранное
            </v-btn>
        </router-link>
        <v-text-field class="v-col-3 mt-5"
                      variant="outlined"
                      v-model.trim="term"
                      placeholder="Найти"
                      clearable>
        </v-text-field>
    </v-app-bar>

    <v-infinite-scroll :onLoad="loadFilms" :films="films" color="light-blue-darken-2" width="100%">
        <v-container>
            <v-row align="center" justify="center">
                <v-col v-for="film in films"
                       :key="film.id"
                       xl="2"
                       lg="3"
                       md="4"
                       sm="6"
                       xs="12">
                    <film :film="film"></film>
                </v-col>
            </v-row>
        </v-container>
    </v-infinite-scroll>

    <v-dialog v-model="errorDialog" transition="dialog-bottom-transition" width="auto">
        <v-card>
            <v-toolbar color="light-blue-darken-4" title="Ошибка загрузки"></v-toolbar>
            <v-card-text style="color: #01579B" class="text-h5 pa-8">{{ errorDialogMessage }}</v-card-text>
            <v-card-actions class="justify-end">
                <v-btn
                    variant="text"
                    class="text-h5 ma-3"
                    color="light-blue-darken-4"
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
import {useGenresStore} from "@/store/GenresStore";

export default {
    name: "Index",

    data() {
        return {
            films: [],
            term: "",
            page: 0,
            service: new CinemaService(),
            errorDialog: false,
            errorDialogMessage: "",
            genresStore: useGenresStore()
        };
    },

    components: {
        Film
    },

    mounted() {
        this.loadGenres();
    },

    watch: {
        term: _.debounce(async function () {
            this.films = [];
            this.page = 0;
            await this.loadFilms(() => {
            });
        }, 500)
    },

    methods: {
        async api() {
            return new Promise(resolve => {
                this.page++;

                if (!this.term) {
                    this.service.loadPopularsFilms(this.page).then(response => {
                        resolve(response.data.results);
                    }).catch(() => this.showErrorDialog("Не удалось загрузить фильмы"));
                } else {
                    this.service.loadSearchingFilms(this.term, this.page).then(response => {
                        resolve(response.data.results);
                    }).catch(() => this.showErrorDialog("Не удалось загрузить фильмы"));
                }
            });
        },

        async loadFilms({done}) {
            const onOnePageFilms = await this.api();

            if (onOnePageFilms.length === 0) {
                done("empty");
            } else {
                this.films.push(...onOnePageFilms);
                this.films = Array.from(new Set(this.films));
                done("ok");
            }
        },

        loadGenres() {
            this.service.loadGenres().then(response => {
                this.genresStore.genres = response.data.genres;
            }).catch(() => this.showErrorDialog("Не удалось загрузить наименования жанров"));
        },

        showErrorDialog(errorDialogMessage) {
            this.errorDialogMessage = errorDialogMessage;
            this.errorDialog = true;
        }
    }
};
</script>
