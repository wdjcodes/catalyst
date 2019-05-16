<template>
  <div>
    <h1>Login</h1>
    <!-- <loading v-if="waiting"></loading> -->
    <div v-if="errorMessage" class="alert alert-dismissible alert-danger">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>Oh snap!</strong>
      {{ errorMessage }}
    </div>
    <form v-if="!waiting" @submit.prevent="login">
      <div class="form-row">
        <div class="form-group col-md-5">
          <label for="email">email</label>
          <input
            v-model="cred.email"
            class="form-control"
            id="email"
            aria-describedby="email"
            placeholder="Enter a valid email"
            type="text"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-5">
          <label for="password">Password</label>
          <input
            v-model="cred.password"
            class="form-control"
            id="password"
            aria-describedby="passwordHelp"
            placeholder="Password"
            type="password"
            required
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    cred: {
      email: "",
      password: ""
    },
    waiting: false,
    errorMessage: ""
  }),
  watch: {
    cred: {
      handler() {
        this.errorMessage = "";
      },
      deep: true
    }
  },
  computed: {
    ...mapState("auth", ["isAuthenticatePending"])
  },
  components: {
    // Loading,
  },
  methods: {
    ...mapActions("auth", { authenticate: "authenticate" }),
    login() {
      this.errorMessage = "";
      this.waiting = true;
      this.authenticate({ strategy: "local", ...this.cred })
        .then(() => {
          this.$router.push("/dashboard");
        })
        .catch(error => {
          this.waiting = false;
          this.errorMessage = error.message;
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.waiting = false;
    this.errorMessage = "A critical client error has ocurred!";
    next();
  }
};
</script>

<style></style>
