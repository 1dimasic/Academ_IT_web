import {createRouter, createWebHistory} from "vue-router";
import FavoritesFilms from "@/pages/FavoritesFilms";
import Index from "@/pages/Index";
import FilmDetails from "@/pages/FilmDetails";

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
