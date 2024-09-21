// SpotifyPlaylistGenerator.vue
<template>
  <div class="staging-view">
    <Swiper :items="[1, 2, 3]" autoplay>
      <template v-slot="{ index, active }">
        <div class="custom-slide" :class="{ 'active-slide': active }">
          <!-- First Slide -->
          <div v-if="index === 0">
            <div class="scrollable-content">
            <table class="track-results" v-if="trackResults.length">
              <thead>
                <tr>
                  <th>Stage</th>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>BPM</th>
                  <th>Genre</th>
                  <th>Energy</th>
                  <th>Mood</th>
                  <th>Dance</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(track, index) in trackResults" :key="track.id">
                  <td><input type="checkbox" v-model="stagingPlaylist" :value="track"></td>
                  <td>{{ track.name }}</td>
                  <td>{{ track.artists[0].name }}</td>
                  <td>{{ track.tempo }}</td>
                  <td>{{ 'genre' }}</td>
                  <td>{{ track.energy }}</td>
                  <td>{{ track.valence }}</td>
                  <td>{{ track.danceability }}</td>
                  <td>{{ track.duration_ms/60000 }}</td>
                  <td>
                    <iframe
                      :src="`https://open.spotify.com/embed/track/${track.id}`"
                      width="300"
                      height="80"
                      frameborder="0"
                      allowtransparency="true"
                      allow="encrypted-media"
                    ></iframe>
                  </td>
                </tr>
              </tbody>
            </table> 
            </div>
          </div>

          <!-- Second Slide -->
          <div v-else-if="index === 1">
            <div class="scrollable-content">
            <table class="staging-playlist" v-if="stagingPlaylist.length">
              <thead>
                <tr>
                  <th>Stage</th>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>BPM</th>
                  <th>Genre</th>
                  <th>Energy</th>
                  <th>Mood</th>
                  <th>Dance</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(track, index) in stagingPlaylist" :key="track.id">
                  <td><input type="checkbox" v-model="stagingPlaylist" :value="track"></td>
                  <td>{{ track.name }}</td>
                  <td>{{ track.artists[0].name }}</td>
                  <td>{{ track.tempo }}</td>
                  <td>{{ 'genre' }}</td>
                  <td>{{ track.energy }}</td>
                  <td>{{ track.valence }}</td>
                  <td>{{ track.danceability }}</td>
                  <td>{{ track.duration_ms/60000 }}</td>
                  <td>
                    <iframe
                      :src="`https://open.spotify.com/embed/track/${track.id}`"
                      width="300"
                      height="80"
                      frameborder="0"
                      allowtransparency="true"
                      allow="encrypted-media"
                    ></iframe>
                  </td>
                </tr>
              </tbody>
            </table> 
            </div>
          </div>
        </div>
      </template>
    </Swiper>
       

  <SoundBoard @retrieveTracks="updateTracks"></SoundBoard>

  </div>
</template>

<script>
import SoundBoard from '@/components/SoundBoard.vue';
import SpotifyPreviewPlayer from '@/components/SpotifyPreviewPlayer.vue';
import Swiper from '@/components/Swiper.vue';
export default {
  components:{
    SoundBoard,
    SpotifyPreviewPlayer,
    Swiper
  },
  data() {
    return {
      trackResults: [],
      stagingPlaylist: [],
      swiperOptions: {
        effect: 'creative',
        creativeEffect: {
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        },
        slidesPerView: 1,
        loop: true
      }
    }
  },
  created() {
    // Define onSpotifyWebPlaybackSDKReady globally
    window.onSpotifyWebPlaybackSDKReady = this.initializePlayer;
  },
  methods: {
    updateTracks(tracks){
      this.trackResults = tracks;
    },
    initializePlayer() {
      window.onSpotifyWebPlaybackSDKReady = () => {
        this.player = new Spotify.Player({
          name: 'Spotify Playlist Generator',
          getOAuthToken: cb => { cb(localStorage.getItem('spotify_access_token')); }
        });

        // Error handling
        this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
        this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
        this.player.addListener('account_error', ({ message }) => { console.error(message); });
        this.player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        this.player.addListener('player_state_changed', state => { console.log(state); });

        // Ready
        this.player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });

        // Connect to the player!
        this.player.connect();
      };
    },
  },
  async mounted() {

    // Load the Spotify Web Playback SDK
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize the player once the script is loaded
    script.onload = () => {
      this.initializePlayer();
    };
  },
  beforeDestroy() {
    // Disconnect the player when the component is destroyed
    if (this.player) {
      this.player.disconnect();
    }

    // Clean up the global function
    window.onSpotifyWebPlaybackSDKReady = null;
  }
}
</script>
<style lang="scss">

body{
  background-color: #ece2c2;
  //color: #e6e8e5;

  .scrollable-content {
    height: 400px; /* Set this to whatever height is needed */
   // height: 100%; // Fills the height of the slide container
    overflow-y: auto; // Enables vertical scrolling within the slide
    padding: 20px;
    box-sizing: border-box;
    padding: 5%;

    // Optional: Customize scrollbar (Webkit browsers)
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: #f0f0f0;
    }
}


.swiper-pagination {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);

  .swiper-dot {
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background-color: #ccc;
    border-radius: 50%;
    cursor: pointer;
    transition: width 0.3s, height 0.3s, background-color 0.3s;

    &.is-active-dot {
      width: 12px;
      height: 12px;
      background-color: #333;
    }
  }
}

  
}

</style>