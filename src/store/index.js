import Vue from 'vue'
import Vuex from 'vuex'

import currentUser from "./modules/currentUser"
import routines from "./modules/routines"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    currentUser,
    routines
  }
})
