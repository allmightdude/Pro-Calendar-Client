import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseDialog from "./components/ui/BaseDialog.vue";

// import fontawsome
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far, fab);
dom.watch();

const app = createApp(App);
app.component("base-card", BaseCard);
app.component("base-dialog", BaseDialog);
app
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount("#app");
