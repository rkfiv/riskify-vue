<template>
  <div class="about">
    <div id="topInput">
      <div id="searchWrapper">
        <vue-google-autocomplete id="autoComplete" country="us" classname="form-control" placeholder="Type an address..."
          v-on:placechanged="getAddressData">
        </vue-google-autocomplete>
        <!-- <div id="addressSearch"></div> -->
        <button @click="getRealestateData" class="searchButton">
          Go
        </button>
      </div>
    </div>
    <div v-if="getPropertyData && !getNoListingBoolean" class="card">
      <div id="topImages" class="card-body">
        <property-images v-if="getPropertyData" :propImages="getPropertyData.propertyData.property_detail.photos" />
        <div id="map"></div>
        <div id="satMap"></div>
      </div>
    </div>
    <div v-if="getPropertyData && !getNoListingBoolean" id="detailsContainer">
      <div id="detailsContent" v-if="getPropertyData">

        <div class="card">
          <div class="card-body">
            <ul class="nav nav-tabs">
  <li @click="activeTab = 'propertyDetails'" class="nav-item">
    <a class="nav-link " :class="{'active': activeTab == 'propertyDetails'}" aria-current="page" href="#">Property Details</a>
  </li>
  <li @click="activeTab = 'propertyPublicRecords'"  class="nav-item">
    <a class="nav-link" :class="{'active': activeTab == 'propertyPublicRecords'}" href="#">Public Records</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#">Permit Search</a>
  </li>
 
</ul>
        <transition   name="fade" mode="out-in"> 
          <div key="propertyDetails" v-if="activeTab == 'propertyDetails'" id="propertyDetails">
              <div id="leftPropertyDetails">
                <span class="detailItem card-text">
                  <span class="card-subtitle fw-semibold">Market Value Estimate:</span>
                $ {{ propCommon.price }}
                </span>
                <span class="detailItem card-text">
                  <span class="card-subtitle fw-semibold">Market Status:</span>
                 {{ propCommon.status }}
                </span>
                <span class="detailItem card-text">
                  <span class="card-subtitle fw-semibold">Neighborhood:</span>
               {{ propDetails.neighborhood }}
                </span>
                <span class="detailItem card-text">
                  <span class="card-subtitle fw-semibold">Flood Zone:</span>
                 {{ propDetails.flood.fema_zone }}
                </span>
              </div>
              <div id="rightPropertyDetail">
                <span class="detailItem card-text">
                  <span class="card-subtitle fw-semibold">Year Built:</span> {{ propCommon.year_built }}
                </span>
                <span class="detailItem card-text">
                  <span class="card-subtitle fw-semibold">Square Feet:</span> {{ propCommon.sqft }}
                </span>

                <span class="detailItem card-text">
                  <span class="card-subtitle fw-semibold">Beds:</span> {{ propCommon.bed }}
                </span>
                <span class="detailItem card-text">
                  <span class="card-subtitle fw-semibold">Baths:</span> {{ propCommon.baths_full_calc }}
                </span>

              </div>




            </div>
            <div key="propertyPublicRecords" v-else-if="activeTab == 'propertyPublicRecords'" id="propertyDetails">
              <div id="leftPropertyDetails">

                <span class="detailItem card-text">
                  <div v-for="publicRecord, key in propDetails.public_records[0]" class="card-subtitle fw-semibold">{{`${key}: ${publicRecord}`}}<div></div></div>
                    
                </span>
              </div>
         




            </div>

        </transition>

          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">About Property:</h5>
            <div id="propertyDetails2">
        
              <span class="detailItem card-text">
      
                  <div v-html="propDetails.property_overview"> </div>
                </span>



            </div>

          </div>
        </div>
      </div>

    </div>
    <div v-if="!getPropertyData && getLoadingBoolean" id="loadingAnimation" class="container">

      <div class="h1Container">

        <div class="cube h1 w1 l1">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h1 w1 l2">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h1 w1 l3">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h1 w2 l1">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h1 w2 l2">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h1 w2 l3">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h1 w3 l1">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h1 w3 l2">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h1 w3 l3">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>
      </div>

      <div class="h2Container">

        <div class="cube h2 w1 l1">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h2 w1 l2">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h2 w1 l3">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h2 w2 l1">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h2 w2 l2">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h2 w2 l3">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h2 w3 l1">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h2 w3 l2">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h2 w3 l3">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>
      </div>

      <div class="h3Container">

        <div class="cube h3 w1 l1">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h3 w1 l2">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h3 w1 l3">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h3 w2 l1">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h3 w2 l2">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h3 w2 l3">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h3 w3 l1">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h3 w3 l2">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>

        <div class="cube h3 w3 l3">
          <div class="face top"></div>
          <div class="face left"></div>
          <div class="face right"></div>
        </div>
      </div>

    </div>

    <div v-if="getNoListingBoolean" id="noListingFound">
      Uh Oh, It looks like this may not be a residential address -or- riskify has yet to index that property, check back later!
    </div>




  </div>
</template>
<script>
// var map;
import VueGoogleAutocomplete from "vue-google-autocomplete";
import propertyImages from '@/components/propertyImages.vue'

import axios from "axios";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Loader } from "@googlemaps/js-api-loader";
const loader = new Loader({
  apiKey: "AIzaSyB2blQxoDxnSYS2AB80m1k8nfLjeS0jtnU",
  version: "weekly",
  // ...additionalOptions,
});
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
      address: "",
      activeTab: "propertyDetails"
    };
  },
  computed: {
    ...mapGetters([
      'getPropertyData',
      'getAddressToSearch',
      'getNoListingBoolean',
      'getLoadingBoolean'
    ]),
    propCommon() {
      return this.getPropertyData.propertyData.property_detail.prop_common
    },
    propDetails() {
      return this.getPropertyData.propertyData.property_detail
    }
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
    getRealestateData() {

      this.getRealestateDataFromAddress().then((res)=>{
      
        if(this.getPropertyData){
          
        var myLatLng = { lat: Number(this.getAddressToSearch.latitude), lng: Number(this.getAddressToSearch.longitude) };
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: Number(this.getAddressToSearch.latitude), lng: Number(this.getAddressToSearch.longitude) },
        zoomControl: false,
        mapTypeControl: false,
        zoom: 10,
      });
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
      });
      var myLatLng = { lat: Number(this.getAddressToSearch.latitude), lng: Number(this.getAddressToSearch.longitude) };
      const satMap = new google.maps.Map(document.getElementById("satMap"), {
        center: { lat: Number(this.getAddressToSearch.latitude), lng: Number(this.getAddressToSearch.longitude) },
        zoomControl: false,
        mapTypeControl: false,
        zoom: 20,
        mapTypeId: 'satellite'
      });
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: satMap,
      });
      }
      }).catch(err=>{
        console.log(err)

      })





    },
    ...mapMutations([
      'setAddressToSearch'
    ]),
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData
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
<style lang="scss">

div#propertyDetails {
    padding: 30px;
    margin: 0 auto;
    text-align: center;
}
div#leftPropertyDetails {
    text-align: left;
}

div#noListingFound {
    display: grid;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    color: white;
}
div#propertyDetails>*{
  display: grid;
  row-gap: 10px;
}
.about {
  /* display: grid; */
  background: #323233;
}

$background: #222;
$leftFace: #D53A33;
$rightFace: #E79C10;
$topFace: #1d9099;
$scale: 1;
$duration: 3s;
$timingFunction: ease;

#loadingAnimation {
  display: flex;
  min-height: 100%;
  min-width: 100%;
  align-items: center;
  justify-content: center;
}

.container {
  position: relative;
  height: 100px;
  width: 86px;
  transform:scale(#{$scale * .5});
}

.cube {
  position: absolute;
  width: 86px;
  height: 100px;
}

.right {
  background: $rightFace;
  transform: rotate(-30deg) skewX(-30deg) translate(49px, 65px) scaleY(0.86);
}

.left {
  background: $leftFace;
  transform: rotate(90deg) skewX(-30deg) scaleY(0.86) translate(25px, -50px);
}
.span.detailItem {
    display: block;
}
.top {
  background: $topFace;
  transform: rotate(210deg) skew(-30deg) translate(-75px, -22px) scaleY(0.86);
  z-index: 2;
}

.face {
  height: 50px;
  width: 50px;
  position: absolute;
  transform-origin: 0 0;
}

@mixin slice($h, $w, $l) {
  .h#{$h}.w#{$w}.l#{$l} {
    z-index: (-#{$h});
    animation-name: h#{$h}w#{$w}l#{$l};
    animation-timing-function: $timingFunction;
    animation-duration: $duration;
    animation-iteration-count: infinite;
  }

  @keyframes h#{$h}w#{$w}l#{$l} {
    0% {
      transform: translate(($w * -50% - 50%) + ($l * 50% + 50%), ($h * 50 - 200%) + ($w * 25% - 25%) + ($l * 25 + 25%));
    }

    14% {
      transform: translate(($w * -50% - 50%) + ($l * 100% - 50%), ($h * 50 - 200%) + ($w * 25% - 25%) + ($l * 50 - 25%));
    }

    28% {
      transform: translate(($w * -100% + 50%) + ($l * 100% - 50%), ($h * 50 - 200%) + ($w * 50% - 75%) + ($l * 50 - 25%));
    }

    43% {
      transform: translate(($w * -100% - 100%) + ($l * 100% + 100%), ($h * 100 - 400%) + ($w * 50% - 50%) + ($l * 50 + 50%));
    }

    57% {
      transform: translate(($w * -100% - 100%) + ($l * 50% + 200%), ($h * 100 - 400%) + ($w * 50% - 50%) + ($l * 25 + 100%));
    }

    71% {
      transform: translate(($w * -50% - 200%) + ($l * 50% + 200%), ($h * 100 - 375%) + ($w * 25% - 25%) + ($l * 25 + 100%));
    }

    85% {
      transform: translate(($w * -50% - 50%) + ($l * 50% + 50%), ($h * 50 - 200%) + ($w * 25% - 25%) + ($l * 25 + 25%));
    }

    100% {
      transform: translate(($w * -50% - 50%) + ($l * 50% + 50%), ($h * 50 - 200%) + ($w * 25% - 25%) + ($l * 25 + 25%));
    }
  }
}

@mixin generateSlice() {
  @for $i from 1 to 4 {
    @for $j from 1 to 4 {
      @for $k from 1 to 4 {
        @include slice($i, $j, $k);
      }
    }
  }
}

@include generateSlice()
</style>
<style>
div#propertyDetails {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

div#detailsContent {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.about {
  /* display: grid; */
  /* grid-template-areas: "search search"
                       "images propdetails";
  grid-template-rows: 65px 13fr;
  grid-template-columns: 1fr 1fr; */
}

div#topInput {
  grid-area: search;
}

div#detailsContainer {
  grid-area: propdetails;
}

div#topImages:first-child>*>* {
  min-height: 275px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}


div#topImages:last-child>* {
  min-height: 275px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}

div#topImages {
  padding: 0px;
  display: grid;
  border-radius: 5px;

  grid-template-columns: 1fr 1fr 1fr;
  grid-area: images;
  min-height: 275px;
  /* max-height: calc(100vh - 65px); */
}

.card {
  margin: 30px;
}

img#activePropertyImage {
  width: 100%;
}

img#activePropertyImage {
  min-height: 275px;
}

input#autoComplete {
  color: #262626;
  background: #ffffff;
  padding: 3px;
  width: 300px;
  border-radius: 2px 0px 0px 2px;
  font-weight: bold;
  padding-left: 10px !important;
  border-bottom: none;
}

.searchButton:hover {
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

div#searchWrapper>* {
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
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>