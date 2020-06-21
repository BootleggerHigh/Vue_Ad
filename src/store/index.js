import Vue from 'vue'
import Vuex from 'vuex'
import ads_store from "./StoreAds";
import user_store from "./StoreUser";
import comma_store from "./StoreCurrentOperationStatus";
import api_firebase from "../API/APIFirebase";
import orders from "./StoreOrders";
Vue.use(Vuex);
/**
 * status показывает уведомление об успешной какой-либо операции;
 */
export default new Vuex.Store({
  state: {
    status_action:{
      status:false,
      message:'',
    }
  },
  mutations: {
    status(state,{...parameters})
    {
      state.status_action = parameters
    },
  },
  actions: {
    status_action({commit},parameters)
    {
      commit('status',parameters);
    },
  },
  getters:{
    status(state)
    {
      return state.status_action;
    },
  },
  modules: {
    ads_store,
    user_store,
    comma_store,
    api_firebase,
    orders,
  }
})
