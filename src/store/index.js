import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import {signOut} from 'firebase/auth'
import {auth}from '@/helpers/firebaseInit'
import router from '@/router'

Vue.use(Vuex);
const baseAPI = process.env.VUE_APP_ROOT_API
export default new Vuex.Store({
  state: {
    authStatus: '',
    addressToSearch: {
      street: '',
      zip: '',

    },
    realestateData: false,
    noListingTrigger: false,
    showLoading: false
  },
  getters: {
    getAuthStatus(state){
      return state.authStatus
    },
    getPropertyData(state){
      return state.realestateData
    }, 
    getAddressToSearch(state){
      return state.addressToSearch
    },
    getNoListingBoolean(state){
      return state.noListingTrigger
    },
    getLoadingBoolean(state){
      return state.showLoading
    }
  },
  mutations: {
    setRealestateData(state, realestateData){
      state.realestateData = realestateData
    },
    setAddressToSearch(state, address){
      state.addressToSearch = address
    },
    setAuthStatus(state, status){
      state.authStatus = status
    },
    setNoListingTrigger(state, triggerBoolean){
      state.noListingTrigger = triggerBoolean
    },
    setShowLoading(state, loadingBoolean){
      state.showLoading = loadingBoolean
    }
  },
  actions: {
    getRealestateDataFromAddress ({state, commit}) {
      commit("setNoListingTrigger", false)
      commit("setRealestateData", false)
      commit("setShowLoading", true)
      return new Promise((resolve, reject)=>{
        axios
        .post(`${baseAPI}/search/single/v2`, {
          addressData: {
            ...state.addressToSearch
          },
          requestedBy: auth.currentUser.uid
        })
        .then((resp) => {
          if (resp.data.error) {
           commit("setNoListingTrigger", true)
           commit('setRealestateData', false)
          commit("setShowLoading", false)
            
          } else {
      
          console.log(resp.data)
          commit('setRealestateData', resp.data)
          commit("setShowLoading", false)
          commit("setNoListingTrigger", false)
          resolve()
          }
        });
      })

    },
    signoutUser({state}){
      signOut(auth);
      router.push('/login')
      console.log(router)
    }
  },
  modules: {},
});
