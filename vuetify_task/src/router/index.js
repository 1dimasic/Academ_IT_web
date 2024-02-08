import {createRouter, createWebHistory} from "vue-router"
import FavoriteFilms from "@/components/FavoriteFilms";
import Index from "@/components";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoriteFilms
    }
  ]
});

export default router
