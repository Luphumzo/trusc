import { createApp } from "vue";
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import vSelect from "vue-select";

import "bootstrap/dist/css/bootstrap.min.css";
import "vue-select/dist/vue-select.css";
import "vue3-snackbar/dist/style.css";
import "bootstrap";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(SnackbarService);
app.component("v-select", vSelect);
app.component("vue3-snackbar", Vue3Snackbar);

app.mount("#app");
