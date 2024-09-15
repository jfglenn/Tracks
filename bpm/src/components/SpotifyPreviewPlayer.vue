<template>
    <div class="spotify-player">
      <iframe
        v-if="spotifyTrackUrl"
        :src="spotifyTrackUrl"
        width="300"
        height="100"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      trackId: {
        type: String,
        required: true
      }
    },
    computed: {
      spotifyTrackUrl() {
        return `https://open.spotify.com/embed/track/${this.trackId}?autoplay=false`;
      }
    }
  };
  </script>
  
  <style scoped>
  .spotify-player {
    margin: 20px;
  }
  </style>