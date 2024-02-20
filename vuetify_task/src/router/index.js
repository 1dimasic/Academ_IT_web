import {createRouter, createWebHistory} from "vue-router";
import FavoritesFilms from "@/components/FavoritesFilms";
import Index from "@/components";
import FilmDetails from "@/components/FilmDetails";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),

    routes: [
        {
            path: "/",
            name: "indexPage",
            component: Index
        },
        {
            path: "/favorites",
            name: "favoritesPage",
            component: FavoritesFilms
        },
        {
            path: "/film/:id",
            name: "filmDetailsPage",
            component: FilmDetails
        }
    ]
});

export default router;
