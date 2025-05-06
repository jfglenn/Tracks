<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/dashboard">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view/>
  </div>
</template>

<style>
html, body {
  height: 100%;
  width: 100%;
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
  background-color: #f2e9e3;
}

#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
/* body{
  background-color: #f2e9e3; //#ece2c2;
  padding: 2%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
