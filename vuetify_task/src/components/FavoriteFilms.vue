<template>
    <v-app-bar color="deep-purple-lighten-3">
        <v-toolbar-title class="text-h5 v-col-4">Избранное</v-toolbar-title>
    </v-app-bar>
    <v-container>
        <button @click="abc">Кнопка</button>
        <v-row align="center" justify="center">
            <v-col xl="2"
                   lg="3"
                   md="4"
                   sm="6"
                   xs="12"
                   v-for="film in store.favoritesFilmsItems"
                   :key="film.id">
                <v-card
                    class="mx-auto"
                    max-width="350px">
                    <v-card-item>
                        <div>
                            <div class="mb-1 text-lg-h6 font-weight-bold">{{ film.title }}</div>
                            <div>
                                <v-img :src="`https://image.tmdb.org/t/p/w500${film.poster_path}`"
                                       width="230px"></v-img>
                            </div>
                            <div class="font-weight-bold">{{ }}</div>
                        </div>
                    </v-card-item>
                    <v-card-actions>
                        <v-btn size="medium" color="green-lighten-1" icon="mdi-movie"
                               @click=""></v-btn>
                        <v-spacer></v-spacer>
                        <v-btn size="medium"  icon="mdi-heart"
                               @click=""></v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
import {store} from "@/main";

export default {
    name: "FavoriteFilms",

    data() {
        return {
            store: store
        }
    },

    methods: {
        abc() {
            console.log(this.store.favoritesFilmsItems);
        }
    }

}
</script>
