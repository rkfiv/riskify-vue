<template>
    <nav id="nav">
        <div id="titles">
            <img class="navLogo" @click="$router.push('/')" src="./../assets/Asset 1.svg" alt="">
        </div>
        <div id="navMenu">
            <!-- <router-link to="/search/bulk">Spreadsheet Resolver</router-link> -->
       
               
            <router-link class="navMenuItem" to="/search/address"> 
                <div class="navMenuItemInner">
                <i class="fa-solid fa-map-location-dot"></i> 
                <span>Address Search</span> 
            </div>
            </router-link>
            <router-link class="navMenuItem" to="/um">
                <div class="navMenuItemInner">
                    <i class="fa-solid fa-chart-gantt"></i>
                <span>UM Tracker</span>
            </div>
            </router-link>
            <router-link class="navMenuItem" to="/policy/cancellation">
                <div class="navMenuItemInner">
                    <i class="fa-solid fa-house-flood-water-circle-arrow-right"></i>
                <span>Prior Insurance Tracker</span>
            </div>
            </router-link>
            <router-link class="navMenuItem" to="/policy/sales">
                <div class="navMenuItemInner">
                    <i class="fa-solid fa-money-bill-trend-up"></i>
                <span>Sales Board</span>
            </div>
            </router-link>
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
.navMenuItemInner {
    display: grid;
    grid-template-columns: 1fr 4fr;
    /* justify-content: center; */
    align-items: center;
    /* justify-items: center; */
    /* margin: 0 auto; */
}
.navMenuItem > div >  span {
    text-align: left;
}
.signoutButton {
    color: white;
    cursor: pointer;
}

nav a {
    display: grid;
    font-weight: bold;
    height: 100%;
    /* padding-left: 20px; */
    grid-template-columns: 1fr;
    font-size: .8em;
    font-weight: bold;
    color: gainsboro;
    -webkit-text-decoration: auto;
    text-decoration: auto;
    -moz-column-gap: 1rem;
    column-gap: 1rem;
    max-height: 50px;
    justify-content: center;
    align-items: center;

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