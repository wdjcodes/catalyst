<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="collapse navbar-collapse" id="navbarColor01">
        <div class="navbar-nav mr-auto">
          <router-link to="/" class="navbar-brand">
            Catalyst
          </router-link>
          <router-link class="nav-item active nav-link my-auto" to="/">
            Home
          </router-link>
        </div>
        <div class="navbar-nav">
          <router-link v-if="user" to="/dashboard" class="navbar-brand">
            <div class="d-flex flex-row align-items-center">
              <i class="material-icons mr-1">face</i>{{ user.email }}
            </div>
          </router-link>
          <router-link
            v-if="!user && !isAuthenticatePending"
            to="/login"
            class="btn btn-secondary"
          >
            Login
          </router-link>
          <button
            v-if="user"
            @click="logOutAndRedirect"
            class="btn btn-secondary"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "nav-bar",
  data: () => ({
    luser: false
  }),
  computed: {
    ...mapGetters("users", { user: "current" }),
    ...mapState("auth", ["isAuthenticatePending"])
  },
  methods: {
    ...mapActions("auth", {
      logout: "logout"
    }),
    ...mapMutations(["reset"]),
    logOutAndRedirect() {
      this.logout().then(() => {
        //Refresh to force vuex store to clear
        this.$router.go();
      });
    }
  }
};
</script>

<style></style>
