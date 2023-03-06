<template>
    <nav id="nav">
        <div id="titles">
            <img class="navLogo" @click="$router.push('/')" src="./../assets/Asset 1.svg" alt="">
        </div>
        <div id="navMenu">
            <!-- <router-link to="/search/bulk">Spreadsheet Resolver</router-link> -->
            <router-link class="navMenuItem" to="/search/address">Address Search</router-link>
            <router-link class="navMenuItem" to="/um">UM Tracker</router-link>
            <router-link class="navMenuItem" to="/policy/cancellation">Prior Insurance Tracker</router-link>
            <router-link class="navMenuItem" to="/policy/sales">Sales Board</router-link>
        </div>
        <div id="auth">
            <span @click="signoutUser" class="signoutButton">Sign Out</span>
        </div>
    </nav>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions([
            'signoutUser'
        ]),
    }
}
</script>
<style>
.signoutButton {
    color: white;
    cursor: pointer;
}

nav a {
    display: flex;
    font-weight: bold;
    height: 100%;
    align-items: center;
    font-size: .8em;
    padding-left: 50px;
    font-weight: bold;
    color: gainsboro;
    text-decoration: auto;
    max-height: 50px;

}

.router-link-active {
    background: #4a4a4a;
}

#titles>img {
    width: 75%
}

#titles {
    justify-items: center;
    background: #000000a6;
}

div#navMenu {
    display: flex;
    background: #111111;
    flex-direction: column;
    max-width: 215px;
}

.navLogo {
    cursor: pointer;
}

#nav {
    max-width: 215px;
}</style>