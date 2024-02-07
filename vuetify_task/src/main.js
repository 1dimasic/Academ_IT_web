// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from "vue";
import { createPinia } from "pinia";
import {useFavoritesFilmsStore} from "@/store/app";


const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
export const store = useFavoritesFilmsStore();

registerPlugins(app)

app.mount('#app')
