// main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";

// ✅ Bootstrap CSS 먼저 로드
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Bootstrap Icons (필요하면 유지)
import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App).use(router).mount("#app");
import "bootstrap/dist/js/bootstrap.js";
