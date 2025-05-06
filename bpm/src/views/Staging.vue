// SpotifyPlaylistGenerator.vue
<template>
  <div class="staging">
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
            <button @click="createSuperCoolPlaylist"></button>
            </div>
          </div>
        </div>
      </template>
    </Swiper>
       

  <SoundBoard class="soundboard" @retrieveTracks="updateTracks" ref="soundboard"></SoundBoard>

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
      playlistId: null,
      playlistLink: null,
      playlistNames: ["BPM Bangers"
        , "Tempo Tantrum"
        , "Step in Time (Or Else)"
        , "One BPM to Rule Them All"
        , "Tempo-Saur: Big Beats, Tiny Arms"
        , "Pace Makers, Not Heartbreakers"
      ]
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
    async createSuperCoolPlaylist(){
      if(this.stagingPlaylist.length <= 0)
        return

      const rndInt = Math.floor(Math.random() * this.playlistNames.length)
      const playlistData = {
        name: `${this.playlistNames[rndInt]} | Tracks ${this.$refs.soundboard.bpm}`,
        description: "Thanks for using Tracks!",
        public: true, // Change to false if you want the playlist to be private
      };

      try {
        let userData = JSON.parse(sessionStorage.getItem('spotify_user_info'));
        const response = await fetch(`https://api.spotify.com/v1/users/${userData.id}/playlists`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playlistData),
        });

        const data = await response.json();
        this.playlistID = data.id;
        this.playlistLink = data.external_urls.spotify;

        await this.addTracksToPlaylist();
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } 
    },
    async addTracksToPlaylist() {

      let trackUris = this.stagingPlaylist.map(track => track.uri); //.replace("spotify:track:", "")

      if(trackUris.length <= 0)
        return;

      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${this.playlistID}/tracks`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uris: trackUris,
          }),
        });

        if (response.ok) {
          console.log("Tracks added to playlist successfully.");
        } else {
          const errorData = await response.json();
          console.error("Error adding tracks:", errorData);
        }
      } catch (error) {
        console.error("Error adding tracks:", error);
      }
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
<style scoped>
.soundboard{
  margin: 2%;
}
.scrollable-content {
  height: 400px; /* Set this to whatever height is needed */
  /* height: 100%; Fills the height of the slide container */
  overflow-y: auto; /* Enables vertical scrolling within the slide */
  
  padding: 20px;
  box-sizing: border-box;
  padding-top: 5%;
  padding-bottom: 3%;
  color: #aed0cf;

}

/* Optional: Customize scrollbar (Webkit browsers) */
.scrollable-content::-webkit-scrollbar {
  width: 8px;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.scrollable-content::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}

</style>