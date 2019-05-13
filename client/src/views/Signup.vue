<template>
  <div>
    <h1>Sign Up</h1>
    <!-- <loading v-if="waiting"></loading> -->
    <div v-if="errorMessage" class="alert alert-dismissible alert-danger">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>Oh snap!</strong>
      {{ errorMessage }}
    </div>
    <form v-if="!waiting" @submit.prevent="signup">
      <div class="form-row">
        <div class="form-group col-md-5">
          <label for="email">email</label>
          <input
            v-model="newUser.email"
            class="form-control"
            id="email"
            aria-describedby="email"
            placeholder="Enter a valid email"
            type="text"
            required
          />
          <small id="emailHelp" class="form-text text-muted">
            Enter a valid email address e.g user@example.com
          </small>
        </div>
        <div class="form-group col-md-1"/>
        <div class="form-group col-md-5">
          <label for="confirmEmail">Confirm email</label>
          <input
            v-model="newUser.confirmEmail"
            class="form-control"
            id="confirmEmail"
            aria-describedby="confirmEmail"
            placeholder="Confirm email"
            type="text"
            required
          />
          <small id="confirmEmailHelp" class="form-text text-muted">
            Re-enter your email address
          </small>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-5">
          <label for="password">Password</label>
          <input
            v-model="newUser.password"
            class="form-control"
            id="password"
            aria-describedby="passwordHelp"
            placeholder="Password"
            type="password"
            required
          />
          <small id="passwordHelp" class="form-text text-muted">
            Passwords must be at least 8 characters long <br />
            Passwords must include upper and lowercase letters, numbers, and
            special characters. <br />
            Valid special characters: !#@$%&?*</small
          >
        </div>
        <div class="form-group col-md-1"/>
        <div class="form-group col-md-5">
          <label for="confirmPassword">Confirm Password</label>
          <input
            v-model="newUser.confirmPassword"
            class="form-control"
            id="confirmPassword"
            aria-describedby="confirmPasswordHelp"
            placeholder="Password"
            type="password"
            required
          />
          <small id="confirmPasswordHelp" class="form-text text-muted">
            Please re-enter your password</small
          >
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Signup</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Joi from "joi";
// import Loading from '@/components/Loading.vue';

const schema = Joi.object().keys({
  email: Joi.string().email(),
  confirmEmail: Joi.string().email(),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#@$%&?*])[a-zA-Z0-9!#@$%&?*]{8,30}$/
    )
    .required(),
  confirmPassword: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#@$%&?*])[a-zA-Z0-9!#@$%&?*]{8,30}$/
    )
    .required()
});
const JoiOptions = {
  abortEarly: false
};

export default {
  data: () => ({
    newUser: {
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: ""
    },
    waiting: false,
    errorMessage: ""
  }),
  watch: {
    newUser: {
      handler() {
        this.errorMessage = "";
      },
      deep: true
    }
  },
  components: {
    // Loading,
  },
  computed: {
    ...mapState('users', {loading: 'isCreatePending'})
  },
  methods: {
    signup() {
      this.errorMessage = "";
      this.waiting = true;
      if (this.validUser()) {
        const user = new this.$FeathersVuex.User({email: this.newUser.email, password: this.newUser.password});
        // this.signUp(this.newUser.email, this.newUser.password)
        user.create()
          .then((response) => {
            setTimeout(() => {
              console.log(response);
              this.$router.push("/");
            }, 1000);
          })
          .catch(error => {
            setTimeout(() => {
              this.waiting = false;
              this.errorMessage = error.message;
            }, 1000);
          });
      }
      this.waiting = false;
    },
    validUser() {
      if (this.newUser.email !== this.newUser.confirmEmail){
        this.errorMessage = "Email and confirm email must match 🙈";
        return false;
      }
      if (this.newUser.password !== this.newUser.confirmPassword) {
        this.errorMessage = "Passwords must match 🙈";
        return false;
      }
      const result = Joi.validate(this.newUser, schema, JoiOptions);
      if (result.error === null) {
        return true;
      }
      result.error.details.forEach(element => {
        const key = element.path[0];
        if (key === "email") {
          this.errorMessage +=
            "🙊 You must enter a valid email adress e.g user@example.com 🙊 ";
        }
        if (key === "password") {
          this.errorMessage += "🙈 Invalid Password 🙈 ";
        }
      });
      return false;
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
