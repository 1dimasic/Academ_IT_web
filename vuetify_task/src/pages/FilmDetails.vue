<template>
    <v-app-bar color="light-blue-darken-2">
        <v-toolbar-title class="text-h5 v-col-5">{{ filmDetails.title }}</v-toolbar-title>
        <router-link to="/">
            <v-btn prepend-icon="mdi mdi-movie-roll" color="white" class="text-xl-h4 text-md-h6">
                Кинотеатр
            </v-btn>
        </router-link>
    </v-app-bar>
    <v-container>
        <v-row no-gutters>
            <v-col class="v-col-12 v-col-sm-8 v-col-md-6">
                <v-sheet class="pa-2 ma-2">
                    <v-img :src="`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`"
                           cover
                           style="height: 50rem">
                    </v-img>
                    <v-btn flat size="large"
                           :color="favoriteFilmButtonColor"
                           append-icon="mdi-heart"
                           class="float-end mt-3"
                           @click="setFavoriteMode">
                        {{ favoriteFilmButtonText }}
                    </v-btn>
                </v-sheet>
            </v-col>
            <v-col class="v-col-12 v-col-sm-4 v-col-md-6">
                <v-sheet class="pa-2 ma-2">
                    <div class="text-h6 text-justify">{{ filmDetails.overview }}</div>
                    <v-spacer class="mb-3"></v-spacer>
                    <span class="font-weight-bold">Дата выхода в прокат: </span>
                    <span>{{ filmDetails.release_date }}</span>
                    <v-spacer class="mb-3"></v-spacer>
                    <span class="font-weight-bold">Продолжительность: </span>
                    <span>{{ filmDetails.runtime }} минут</span>
                    <v-spacer class="mb-3"></v-spacer>
                    <span class="font-weight-bold">Рейтинг: </span>
                    <span>{{ filmDetails.vote_average }}</span>
                    <v-spacer class="mb-3"></v-spacer>
                    <template v-if="hasRecommendation">
                        <span class="font-weight-bold">Рекомендации</span>
                        <v-container class="pa-0">
                            <v-row>
                                <v-col v-for="recommendedFilm in recommendedFilms"
                                       :key="recommendedFilm.id"
                                       lg="2"
                                       md="3"
                                       sm="4"
                                       xs="12">
                                    <router-link :to="`/film/${recommendedFilm.id}`">
                                        <v-img :src="`https://image.tmdb.org/t/p/w500${recommendedFilm.poster_path}`"
                                               width="180px"
                                               class="ma-1">
                                        </v-img>
                                    </router-link>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
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
import {useFavoritesFilmsStore} from "@/store/FavoritesFilmsStore";

export default {
    name: "FilmDetails",

    data() {
        return {
            filmDetails: [],
            recommendedFilms: [],
            service: new CinemaService(),
            id: this.$route.params.id,
            store: useFavoritesFilmsStore(),
            errorDialog: false,
            errorDialogMessage: ""
        };
    },

    created() {
        this.loadFilmDetails();
        this.loadRecommendedFilms();
    },

    watch: {
        $route() {
            this.id = this.$route.params.id;
            this.loadFilmDetails();
            this.loadRecommendedFilms();
        }
    },

    computed: {
        hasRecommendation() {
            return this.recommendedFilms ? this.recommendedFilms.length !== 0 : false;
        },

        favoriteFilmButtonColor() {
            return this.store.containsFilmInFavorites(this.filmDetails.id) ? "red-accent-4" : "grey-darken-1";
        },

        favoriteFilmButtonText() {
            return this.store.containsFilmInFavorites(this.filmDetails.id) ? "Избранное" : "Добавить";
        }
    },

    methods: {
        loadFilmDetails() {
            this.service.loadFilmDetails(this.id).then(response => {
                this.filmDetails = response.data;
            }).catch(() => this.showErrorDialog("Не удалось загрузить подробности фильма"));
        },

        loadRecommendedFilms() {
            this.service.loadRecommendedFilms(this.id).then(response => {
                this.recommendedFilms = response.data.results;
            }).catch(() => this.showErrorDialog("Не удалось загрузить рекомендации"));
        },

        setFavoriteMode() {
            if (!this.store.containsFilmInFavorites(this.filmDetails.id)) {
                this.store.addFilmToFavorites(this.filmDetails);
            } else {
                this.store.removeFilmFromFavorites(this.filmDetails.id);
            }
        },

        showErrorDialog(errorDialogMessage) {
            this.errorDialogMessage = errorDialogMessage;
            this.errorDialog = true;
        }
    }
};
</script>
