<template>
    <sideNav></sideNav>
    <router-view />
</template>
<script>
import sideNav from './components/navigation.vue'
export default {
    components: {
        sideNav
    }
}
</script>