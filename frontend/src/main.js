import { createApp } from "vue";


import store from './store/index.js';

import App from "./App.vue";
import router from "./router";

import "./assets/css/tailwind.css";



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.getItem("isLoggedIn") == "false" || localStorage.getItem("isLoggedIn") == null ) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires guests,
    // if not, redirect to dashboard page.
    if (store.getters.getIsLoggedIn) {
      next({
        path: '/dashboard',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }else {
    next() // make sure to always call next()!
  }
});




createApp(App)
  .use(router)
  .use(store)
  .mount("#app");

 
 