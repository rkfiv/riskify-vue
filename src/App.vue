<template>
  <div id="app">
    <nav>
      <div id="titles">
        UW Tools
      </div>
      <div id="navMenu">
        <router-link to="/search/bulk">Spreadsheet Resolver</router-link>
      <router-link to="/search/address">Address Resolver</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>
/* #4a4238, #4d5359, #508484, #79c99e, #97db4f */
body{
  margin:0px;
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
div#navMenu {
    display: grid;
    background: #3a3f44;
    grid-auto-flow: row;
    grid-auto-rows: 4em;
    align-items: center;
}
nav a {
    display: grid;
    font-weight: bold;
    height: 100%;
    align-items: center;
    font-size: .8em;
    color: #2c3e50;
}
nav {
  
    background: #4d5359;
    display: grid;
    grid-template-rows: 1fr 10fr;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: grid;
    grid-template-columns: 1fr 4fr;
    min-height: 100vh;
}



nav a {
  font-weight: bold;
  color: #508484;
}

nav a.router-link-exact-active {
    color: #79C99E;
}
</style>
