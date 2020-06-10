import Vue from 'vue'
import Vuex from 'vuex'
import ads_store from "./ads_store";
import user_store from "./user_store";
import comma from "./comma";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ads_store,
    user_store,
    comma,
  }
})
