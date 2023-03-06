<template>
  <div id="app" v-cloak>
    <div>
      <!-- <authContainer v-cloak v-if="$route.meta.layout == 'authLayout'" />
      <appContainer v-cloak  v-else-if="$route.meta.layout !== 'authLayout'" /> -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import sideNav from './components/navigation.vue'
import authContainer from '@/layouts/auth.vue'
import appContainer from '@/layouts/app.vue'
export default {
  components: {
    sideNav,
    appContainer,
    authContainer
  },
  mounted(){
    console.log(this.$router)
  }
}

</script>

<style>
/* #4a4238, #4d5359, #508484, #79c99e, #97db4f */
body {
  margin: 0px;
}

[v-cloak] {
  display: none !important;
}

#appContainer {
  background-color: #f2f2f2;
}

#titles {
  color: #508484;
  display: grid;
  align-items: center;
  font-size: 1.3em;
  font-weight: inherit;
  letter-spacing: 4px;
  text-transform: uppercase;
}


nav {

  background: #4d5359;
  display: grid;
  grid-template-rows: 1fr 10fr;
}

#appContainer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 215px 1fr;
  min-height: 100vh;
}
</style>
