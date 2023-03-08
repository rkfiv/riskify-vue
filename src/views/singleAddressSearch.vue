<template>
  <div class="about">
    <div id="topInput">
      <div id="searchWrapper">
      <vue-google-autocomplete id="map" country="us" classname="form-control" placeholder="Type an address..."
        v-on:placechanged="getAddressData">
      </vue-google-autocomplete>
      <button @click="getRealestateDataFromAddress" class="searchButton">
        Go
      </button>
    </div>
    </div>
    <div id="topImages">
      <property-images v-if="getPropertyData" :propImages="getPropertyData.propertyData.property_detail.photos"/>
      <property-images v-if="getPropertyData" :propImages="getPropertyData.propertyData.property_detail.photos"/>
      <property-images v-if="getPropertyData" :propImages="getPropertyData.propertyData.property_detail.photos"/>
    </div>
    <div id="detailsContainer">
      <div id="detailsContent" v-if="getPropertyData">
      <span class="detailItem"  v-for="dataPoint, key  in getPropertyData.propertyData.property_detail.prop_common">{{ `${key}: ${dataPoint}` }}</span>
      </div>
    </div>
      




  </div>
</template>
<script>
// var map;
import VueGoogleAutocomplete from "vue-google-autocomplete";
import propertyImages from '@/components/propertyImages.vue'
// import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios";
import { mapActions,mapGetters,mapMutations } from "vuex";
// const loader = new Loader({
//   apiKey: "AIzaSyB2blQxoDxnSYS2AB80m1k8nfLjeS0jtnU",
//   version: "weekly",
//   // ...additionalOptions,
// });
export default {
  components: {
    VueGoogleAutocomplete,
    propertyImages
  },
  data() {
    return {
      street: "",
      zip: "",
      dataAPI: false,
      loading: false,
      qualifies: "-",
      isDisabled: true,
      address: ""
    };
  },
  computed:{
    ...mapGetters([
      'getPropertyData'
    ])
  },
  watch: {
    'errors.items'() {

      if (this.$validator.errors.items.length == 0) {
        this.isDisabled = false
      }
      else {
        this.isDisabled = true
      }
    }
  },
  methods: {
    ...mapActions([
      'getRealestateDataFromAddress'
    ]),
    ...mapMutations([
      'setAddressToSearch'
    ]),
    getAddressData: function (addressData, placeResultData, id) {
      this.setAddressToSearch(addressData);
    },

    submit() {
    
    },
  },
  mounted() {
    this.$validator.validate();
    console.log()
  }
};
</script>
<style>
.about{
  display: grid;
  grid-template-areas: "search search"
                       "images propdetails";
  grid-template-rows: 65px 13fr;
  grid-template-columns: 1fr 1fr;
}
div#topInput{
  grid-area: search;
}
div#detailsContainer {
  grid-area: propdetails;
}
div#topImages {
    display: grid;
    grid-template-rows: 33% 33% 33%;
    grid-area: images;
    max-height: calc(100vh - 65px);
}


img#activePropertyImage {
    width: 100%;
}
input#map {
    color: #262626;
    background: #ffffff;
    padding: 3px;
    width: 300px;
    border-radius: 2px 0px 0px 2px;
    font-weight: bold;
    padding-left: 10px!important;
    border-bottom: none;
}

.searchButton:hover{
  background-color: #30561e;
}

div#searchWrapper {
    display: flex;
    border: none;
    outline: none;
    flex-direction: row;
    /* row-gap: 18px; */

}
 .searchButton {
    border: none;
    background: #4D8B31;
    color: white;
    text-transform: uppercase;
    font-weight: bolder;
    width: 90px;
    border-radius: 0px 2px 2px 0px;
}
div#topInput {
  display: flex;
  background: #2a2a2a;
  min-height: 50px;
  padding: 5px 60px;
  align-items: center;
}
div#searchWrapper > * {
    padding: 10px;
}
.button-27:disabled {
  pointer-events: none;
  background-color: #898989;
}

.good {
  color: #42b983
}

.bad {
  color: #be0000
}

.noDis {
  display: none;
}

.dataColumns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  border-left: 2px dashed #a7a7a7;
}

input:-webkit-autofill,
input:-webkit-autofill:focus {
  background-color: transparent !important;
}

.dataColumnsAlt {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

form#formWrap {
  display: grid;
  align-items: center;
  grid-row-gap: 2em;
}

.disabled {
  background-color: #d8d8d8 !important;
  cursor: not-allowed;
}

bodY {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

span#status {
  text-transform: capitalize;
  font-weight: 700;
}

.center {
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #000; */

}

.wave {
  width: 5px;
  height: 100px;
  background: linear-gradient(45deg, #42b983, #fff);
  margin: 10px;
  animation: wave 1s linear infinite;
  border-radius: 20px;
}

.wave:nth-child(2) {
  animation-delay: 0.1s;
}

.wave:nth-child(3) {
  animation-delay: 0.2s;
}

.wave:nth-child(4) {
  animation-delay: 0.3s;
}

.wave:nth-child(5) {
  animation-delay: 0.4s;
}

.wave:nth-child(6) {
  animation-delay: 0.5s;
}

.wave:nth-child(7) {
  animation-delay: 0.6s;
}

.wave:nth-child(8) {
  animation-delay: 0.7s;
}

.wave:nth-child(9) {
  animation-delay: 0.8s;
}

.wave:nth-child(10) {
  animation-delay: 0.9s;
}

div#headerTitle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: baseline;
}

@keyframes wave {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

#dataListAlt {
  display: grid;
  align-items: center;

}

#dataList {}

#inputWrap {
  display: grid;
  grid-template-rows: 1fr 1fr;
  text-align: left;
  width: 70%;
  grid-row-gap: 1.4rem;
  margin: 0 auto;
}

input[type="text"] {
  justify-self: center;
  padding: 10px;
  padding-left: 0;
  width: 80%;
  position: relative;
  justify-content: center;
  display: grid;
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  margin: 0 auto;
  justify-items: center;
}

div#containRES {
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 0 auto;
  width: 80%;
  padding: 20px;
  background: #dbdbdb;
  border-radius: 10px;
}

label {
  align-items: end;
  display: flex;
  font-size: smaller;
  /* font-stretch: ultra-condensed; */
  letter-spacing: 2px;
  font-weight: 700;
}

button:hover {
  cursor: pointer;
}

div#formWrap[data-v-4f039e6c] {
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
}

#inputWrap {
  display: grid;
  grid-template-rows: 1fr 1fr;

  text-align: left;
}

span.Label {
  font-weight: 700;
  text-transform: capitalize;
}

ul#dataList {
  display: table-row;
  /* grid-auto-columns: auto; */
  list-style: none;
  list-style-position: unset;
  align-items: flex-start;
  display: grid;
  text-align: initial;

}

/* CSS */
.button-27 {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #2c3f51;
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 40px;
  min-width: 0;
  outline: none;
  /* padding: 1px 4px; */
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  -moz-user-select: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 50%;
  margin: 0 auto;
  will-change: transform;
}

.button-27:disabled {
  pointer-events: none;
}

.button-27:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);

  background-color: #42b983;
}

.button-27:active {
  box-shadow: none;
  transform: translateY(0);
}</style>