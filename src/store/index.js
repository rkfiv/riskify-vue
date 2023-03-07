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
      zip: ''
    },
    realestateData: false,
  },
  getters: {
    getAuthStatus(state){
      return state.authStatus
    },
    getPropertyData(state){
      return state.realestateData
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
    }
  },
  actions: {
    getRealestateDataFromAddress ({state, commit}) {
      console.log(auth)
      axios
        .post(`${baseAPI}/search/single/v2`, {
          addressData: {
            ...state.addressToSearch
          },
          requestedBy: auth.currentUser.uid
        })
        .then((resp) => {
          if (resp.data.err) {
            alert(resp.data.err);
          } else {
          console.log(resp.data)
          commit('setRealestateData', resp.data)
       

          //   loader.load().then(() => {
          //     var myLatLng = { lat: this.dataAPI.lat, lng: this.dataAPI.lon };
          //     const map = new google.maps.Map(document.getElementById("map"), {
          //       center: { lat: this.dataAPI.lat, lng: this.dataAPI.lon },
          //       zoomControl: false,
          //       mapTypeControl: false,
          //       zoom: 10,
          //     });
          //     var marker = new google.maps.Marker({
          //       position: myLatLng,
          //       map: map,
          //     });
          //   });
          }

          // this.loading = false;
          // if (
          //   parseInt(this.dataAPI["Year Built"]) >= 2006 &&
          //   parseInt(this.dataAPI["Distance To Coast"]) >= 4
          // ) {
          //   this.qualifies = true;
          // } else {
          //   this.qualifies = false;
          // }
        });
    },
    signoutUser({state}){
      signOut(auth);
      router.push('/login')
      console.log(router)
    }
  },
  modules: {},
});
