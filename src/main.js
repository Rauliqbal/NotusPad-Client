import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(VueToast);
app.mount("#app");
