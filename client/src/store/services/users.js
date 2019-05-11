/* eslint-disable no-unused-vars */

import feathersVuex from "feathers-vuex";
import feathersClient from "@/store/feathers-client.js";

const { service } = feathersVuex(feathersClient, { idField: "_id" });

const servicePath = "users";
const servicePlugin = service(servicePath, {
  instanceDefaults(data, { store, Model, Models }) {
    return {};
  }
});

feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
});

export default servicePlugin;
