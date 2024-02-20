<template>
    <v-app-bar color="deep-purple-lighten-3">
        <v-toolbar-title class="text-h5 v-col-4">{{ filmDetails.title }}</v-toolbar-title>
    </v-app-bar>
    <v-container>
        <v-row no-gutters>
            <v-col class="v-col-3">
                <v-sheet class="pa-2 ma-2">
                    <v-img :src="`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`"></v-img>
                    <v-btn flat size="large"
                           :color="favoriteFilmButtonColor"
                           class="float-end mt-3"
                           @click="setFavoriteMode">{{ favoriteFilmButtonText }}
                    </v-btn>
                </v-sheet>
            </v-col>
            <v-col class="v-col-9 text-h6">
                <v-sheet class="pa-2 ma-2">
                    {{ filmDetails.overview }}
                    <v-spacer class="mb-3"></v-spacer>
                    Дата выхода в прокат: {{ filmDetails.release_date }}
                    <v-spacer class="mb-3"></v-spacer>
                    Продолжительность: {{ filmDetails.runtime }} минут
                    <v-spacer class="mb-3"></v-spacer>
                    Рейтинг: {{ filmDetails.vote_average }}
                    <v-spacer class="mb-3"></v-spacer>
                    <template v-if="hasRecommendation">
                        Рекомендации
                        <v-container>
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
            <v-toolbar color="deep-purple-lighten-1" title="Ошибка загрузки"></v-toolbar>
            <v-card-text style="color: #7E57C2" class="text-h5 pa-8">{{ errorDialogMessage }}</v-card-text>
            <v-card-actions class="justify-end">
                <v-btn
                    variant="text"
                    class="text-h5 ma-3"
                    color="deep-purple-lighten-1"
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
            return this.store.containsFilmInFavorites(this.filmDetails.id) ? "red-accent-4" : "deep-purple-lighten-1";
        },

        favoriteFilmButtonText() {
            return this.store.containsFilmInFavorites(this.filmDetails.id) ? "Удалить" : "Добавить";
        }
    },

    methods: {
        loadFilmDetails() {
            this.service.loadFilmDetails(this.id).then(response => {
                this.filmDetails = response.data;
            }).catch(() => {
                this.errorDialog = true;
                this.errorDialogMessage = "Не удалось загрузить подробности фильма";
            });
        },

        loadRecommendedFilms() {
            this.service.loadRecommendedFilms(this.id).then(response => {
                this.recommendedFilms = response.data.results;
            }).catch(() => {
                this.errorDialog = true;
                this.errorDialogMessage = "Не удалось загрузить рекомендации";
            });
        },

        setFavoriteMode() {
            if (!this.store.containsFilmInFavorites(this.filmDetails.id)) {
                this.store.addFilmToFavorites(this.filmDetails);
            } else {
                this.store.removeFilmFromFavorites(this.filmDetails.id);
            }
        }
    }
};
</script>
