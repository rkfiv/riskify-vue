import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import {signOut} from 'firebase/auth'
import {auth}from '@/helpers/firebaseInit'

Vue.use(Vuex);
const baseAPI = process.env.VUE_APP_ROOT_API
export default new Vuex.Store({
  state: {
    authStatus: '',
    addressToSearch: {
      street: '',
      zip: ''
    },
    realestateData: {

    },
  },
  getters: {
    getAuthStatus(state){
      return state.authStatus
    }
  },
  mutations: {
    setRealestateData(state, realestateData){
      state.realestateData = realestateData
    },
    setAddressToSearch(state, address){
      state.addressToSearch.street =  `${address.street_number} ${address.route}`
      state.addressToSearch.zip = `${address.postal_code}`
    },
    setAuthStatus(state, status){
      state.authStatus = status
    }
  },
  actions: {
    getRealestateDataFromAddress ({state, commit}) {
      axios
        .post(`${baseAPI}/search/single/v2`, {
          address: state.addressToSearch.street,
          zip: state.addressToSearch.zip,
        })
        .then((resp) => {
          if (resp.data.err) {
            alert(resp.data.err);
          } else {
          
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
      signOut(auth)
    }
  },
  modules: {},
});
