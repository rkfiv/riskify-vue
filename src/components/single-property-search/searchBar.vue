<template>
  <div id="searchBar">
    <vue-google-autocomplete
      id="map"
      ref="address"
      classname="form-control"
      placeholder="Please type your address"
      v-on:placechanged="getAddressData"
    />
    <button
      :class="{ disabled: loading }"
      :disabled="loading || isDisabled"
      @click="submit"
      class="button-27"
      role="button"
    >
      GO
    </button>
  </div>
</template>
<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default{
    components: {
        VueGoogleAutocomplete
    },
    props: ['getAddressData', 'loading', 'isDisabled', 'submit']
}

</script>