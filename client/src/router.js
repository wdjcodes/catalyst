import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import store from "./store";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter(to, from, next) {
        if (localStorage["feathers-jwt"]) {
          store
            .dispatch("auth/authenticate")
            .then(() => {
              next("/about");
            })
            .catch(() => {
              next();
            });
        } else {
          next();
        }
      }
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      beforeEnter(to, from, next) {
        if (localStorage["feathers-jwt"]) {
          store
            .dispatch("auth/authenticate")
            .then(() => {
              next();
            })
            .catch(() => {
              next("/");
            });
        } else {
          next("/");
        }
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
