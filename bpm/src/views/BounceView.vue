<template>
  <div class="callback">
    <p>Hang in there, redirecting...</p>
  </div>
</template>

<script>
import authInfo from '../../auth_config.json';
export default {
  async mounted() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      await this.exchangeCodeForToken(code);
      await this.getUserProfile();
    }
  },
  methods: {
    async getUserProfile() {
      try {
        const response = await fetch(`https://api.spotify.com/v1/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`,
          },
        });

        const data = await response.json();
        sessionStorage.setItem('spotify_user_info', JSON.stringify(data));
        console.log("User profile:", data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },
    async exchangeCodeForToken(code) {
      const redirectUri = 'http://localhost:8080/bounce'; // e.g. 'http://localhost:8080/callback'
      const codeVerifier = localStorage.getItem('code_verifier');
      console.log('client id', authInfo.clientId)
      console.log(codeVerifier)
      // Step 1: Exchange the code for an access token
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: authInfo.clientId,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        // Successfully logged in, save the token
        localStorage.setItem('spotify_access_token', data.access_token);
        this.$router.push({name: 'staging'}); // Redirect to home page or another page
      } else {
        console.error('Failed to exchange code for token', data);
      }
    },
  },
};
</script>

<style scoped>
.callback {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
}
</style>
