<template>
  <div id="login">
    <h1>TRACKS: MUSIC TO MOVE YOU</h1>
    <button class="btn" @click="login">Login with Spotify</button>
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

<style scoped>
#login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #AED0CF;
  background-color: #016d69;
  height: 100%;
  width:100%;
}

.btn{
  width: 250px;
  height: 60px;
  border-radius: 30px;
  border: 1px solid #AED0CF;
  background-color: #016d69;
}
</style>