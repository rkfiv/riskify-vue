import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import VeeValidate from "vee-validate";

import "@/helpers/firebaseInit";
import { auth } from "@/helpers/firebaseInit";
import { onAuthStateChanged } from "firebase/auth";
Vue.use(VeeValidate);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

onAuthStateChanged(auth, (user) => {
  // SET DEFAULT PAGE HERE


    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
 

  
});
