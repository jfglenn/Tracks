<template>
  <div id="app">
    <h1>Spotify Login Example</h1>
    <button @click="login">Login with Spotify</button>
  </div>
</template>

<script>
import authInfo from '../../auth_config.json';
import PkceHelper from '../helpers/pkceHelper.js';
export default {
  name: 'LoginView',
  methods: {
    async login() {
      // const clientId = authInfo.clientId;
      const redirectUri = 'http://localhost:8080/bounce';
      const scopes = authInfo.scopes.join(' ');
      
      // const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
      
      // window.location.href = spotifyAuthUrl;





debugger;
      // Step 1: Generate Code Verifier and Code Challenge
      let codeVerifier = PkceHelper.generateCodeVerifier();
      localStorage.setItem('code_verifier', codeVerifier);
      const codeChallenger = await PkceHelper.generateCodeChallenge(codeVerifier);

      // Step 2: Build Spotify authorization URL
      const spotifyAuthUrl = `https://accounts.spotify.com/authorize?` +
        `client_id=${authInfo.clientId}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&code_challenge_method=S256` +
        `&code_challenge=${codeChallenger}` +
        `&scope=${scopes}`;

      // Step 3: Redirect user to Spotify login page
      window.location = spotifyAuthUrl;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>