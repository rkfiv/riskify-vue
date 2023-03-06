<template>
    <div id="appContainer">
        <sideNav></sideNav>
        <router-view />
    </div>
</template>
<script>
import sideNav from '@/components/navigation.vue'
export default {
    components: {
        sideNav
    }
}
</script>