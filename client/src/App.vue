<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <nav-bar />
    <router-view class="container" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import store from "@/store";

export default {
  components: {
    "nav-bar": Navbar
  },
  beforeCreate: () => {
    if (localStorage["feathers-jwt"]) {
      store.dispatch("auth/authenticate").catch(() => {});
    }
  }
};
</script>

<style lang="scss">
@import "~bootswatch/dist/superhero/variables";
@import "~bootstrap/scss/bootstrap";
@import "~bootswatch/dist/superhero/bootswatch";
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
