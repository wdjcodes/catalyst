import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import feathersVuex from "feathers-vuex";
import feathersClient from "./feathers-client";

const { auth, FeathersVuex } = feathersVuex(feathersClient, { idField: "_id" });

Vue.use(FeathersVuex);


const requireModule = require.context("./services", false, /.js$/);
const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default);

export default new Vuex.Store({
  plugins: [auth({ userService: "users" }), ...servicePlugins],
  state: {},
  mutations: {},
  actions: {}
});
