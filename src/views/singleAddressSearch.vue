<template>
  <div id="addressResolverPage">

    <searchBar
    :getAddressData="getAddressData"
    :loading="loading"
    :isDisabled="isDisabled"
    :submit="submit"
    />
    <div id="imagesContainer">
      <div class="gallery">
        <vueper-slides :lazy="true" v-if="dataAPI !== false && !loading">
          <vueper-slide
            v-for="(slide, i) in dataAPI.listingExtended.photos"
            :key="i"
            :image="slide.href"
          >
          </vueper-slide>
        </vueper-slides>
        <div id="maps" :class="{ noDis: typeof dataAPI == Boolean }"></div>

      </div>
    </div>
    <div id="dataPanel">
      <div class="searchContainer">
        <div id="headerTitle">
        <div id="qualifier">
          <span
            >Qualifies:
            <span
              id="status"
              :class="[{ good: qualifies }, { bad: !qualifies }]"
              v-if="dataAPI !== false && !loading"
              >{{ qualifies }}</span
            ></span
          >
        </div>

          <!-- {{errors}} -->
        </div>
        <div id="containRES">
          <form id="formWrap">
            <div id="inputWrap">
              <div id="streetInput">
                <!-- <label for="Street">Street: </label> -->
                <input
                  v-model="street"
                 
                  name="Street"
                  type="text"
                  placeholder="Street e.x. 123 main st"
                  required
                />
              </div>
              <div id="zipInput">
                <!-- <label for="Zip">Zip Code: </label> -->
                <input
                  v-model="zip"
 
                  name="Zip"
                  type="text"
                  placeholder="Zip Code"
                  required
                />
              </div>
            </div>
            <div id="buttonWrap">

            </div>
          </form>
          <div
            :class="{
              dataColumns: !loading && dataAPI !== false,
              dataColumnsAlt: loading || dataAPI == false,
            }"
          >
            <ul id="dataList" v-if="dataAPI !== false && !loading">
              <li
                class="listItem"
                :class="[
                  propertyName.replaceAll(' ', '-'),
                  {
                    good:
                      propertyName === 'Distance To Coast' &&
                      parseInt(dat) >= 4,
                  },
                  {
                    bad:
                      propertyName === 'Distance To Coast' &&
                      parseInt(dat) <= 4,
                  },
                  {
                    good:
                      propertyName === 'Year Built' && parseInt(dat) >= 2006,
                  },
                  {
                    bad: propertyName === 'Year Built' && parseInt(dat) <= 2006,
                  },
                ]"
                :key="propertyName"
                v-for="(dat, propertyName) in dataAPIToShow"
              >
                <span class="Label">{{ propertyName }}</span
                >: {{ dat }}
              </li>
            </ul>
            <span id="dataListAlt" v-else-if="!loading"
              >Please Enter An Address</span
            >
            <div id="loadingSign" class="center" v-else-if="loading">
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- <span :key="data" v-for="data in dataAPI">
      <h2>{{data}}</h2>
    </span> -->

  </div>
</template>
<script>
// var map;

import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios";
import { VueperSlides, VueperSlide } from "vueperslides";
import searchBar from '../components/single-property-search/searchBar.vue'
import "vueperslides/dist/vueperslides.css";
const loader = new Loader({
  apiKey: "AIzaSyB2blQxoDxnSYS2AB80m1k8nfLjeS0jtnU",
  version: "weekly",
  // ...additionalOptions,
});
export default {
  components: { VueperSlides, VueperSlide, searchBar  },
  data() {
    return {
      address: "",
      selection: '',
      street: "",
      zip: "",
      dataAPI: false,
      loading: false,
      qualifies: "-",
      isDisabled: true,
    };
  },
  watch: {
    "errors.items"() {
      if (this.$validator.errors.items.length == 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
  },
  methods: {
    getAddressData: function (addressData, placeResultData, id) {
        this.address = addressData;
    },
    selectItem(item) {
      this.selection = item;
    },
    addNewSuggestions(suggestedAddresses) {
      this.addresses = suggestedAddresses;
    },
    ready(map) {
      this.map = map
      this.$GMaps().then((maps) => {
        this.places = new maps.places.PlacesService(map)     
        this.autocomplete = new maps.places.Autocomplete(this.$refs.autocomplete)
      })
    },
    submit() {
      (this.dataAPI = false), (this.loading = true);

      axios
        .post("http://24.199.66.121:3000/search/single/v2", {
          address: `${this.address.street_number} ${this.address.route}`,
          zip: this.address.postal_code,
        })
        .then((resp) => {
          if (resp.data.err) {
            alert(resp.data.err);
          } else {
            this.dataAPI = resp.data;
            this.dataAPIToShow = {
              "Distance To Coast": resp.data.distanceToCoast,
              "Year Built": resp.data.listingExtended.prop_common.year_built,
              "Dwelling Type": resp.data.listingExtended.display_property_type,
              //
            };
            let map;
            
            
              var myLatLng = {
                lat: resp.data.listingBasic.centroid.lat,
                lng: resp.data.listingBasic.centroid.lon,
              };
              map = new google.maps.Map(document.getElementById("maps"), {
                center: {
                  lat: resp.data.listingBasic.centroid.lat,
                  lng: resp.data.listingBasic.centroid.lon,
                },
                zoomControl: false,
                mapTypeControl: false,
                zoom: 10,
              });
              console.log("HI")
              var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
              });
        

      
          }

          this.loading = false;
          if (
            parseInt(this.dataAPI["Year Built"]) >= 2006 &&
            parseInt(this.dataAPI["Distance To Coast"]) >= 4
          ) {
            this.qualifies = true;
          } else {
            this.qualifies = false;
          }
        });
    },
  },
  mounted() {
    this.$validator.validate();
    // this.$refs.address.focus();

  },
  beforeMount(){

  }
};
</script>
<style>

.vueperslides:not(.no-shadow):not(.vueperslides--3d) .vueperslides__parallax-wrapper:after, .vueperslides:not(.no-shadow):not(.vueperslides--3d) .vueperslides__parallax-wrapper:before {
  display:none;
}
.searchContainer{
  display:none;
}
#searchBar {
    color: #e1e1e1;
    grid-area: search;
    background: #3a3f44;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
}
#imagesContainer{
  grid-area: images
}
#dataPanel{
  grid-area: data
}
.vueperslides:not(.no-shadow):not(.vueperslides--3d) .vueperslides__parallax-wrapper:after {
    top: 100%;
    bottom: auto;
    display:none;
}
.vueperslides__bullets:not(.vueperslides__bullets--outside) {
    color: #fff;
    display: none;
}
.vueperslides__inner {
    min-height: 100%;
}
.vueperslides__parallax-wrapper{
    position: unset;
}
.gallery {
    display: grid;
    grid-template-rows: 1fr 1fr;
}
#addressResolverPage {
    display: grid;
    overflow: hidden;
    grid-template-areas:
        "search search"
        "data images";
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 10fr;
}
#imagesContainer {
  display: grid;
  /* border: 1px solid black; */
}
.button-27:disabled {
  pointer-events: none;
  background-color: #898989;
}
.good {
  color: #42b983;
}
.bad {
  color: #be0000;
}
.noDis {
  display: none;
}
.dataColumns {
  display: grid;
  /* grid-template-columns: 1fr 1fr; */
  grid-column-gap: 1rem;
  border-left: 2px dashed #a7a7a7;
}
input:-webkit-autofill,
input:-webkit-autofill:focus {
  background-color: transparent !important
  ;
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
#dataList {
}
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
  color:whitesmoke;
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
  display: none;
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
</style>