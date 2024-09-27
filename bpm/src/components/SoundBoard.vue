<template>
  <div>
    <form @submit.prevent="generatePlaylist">
      <!-- <input v-model="bpm" type="number" placeholder="Desired BPM">
      <input v-model="energy" type="number" min="0" max="1" step="0.1" placeholder="Energy (0-1)">
      <input v-model="danceability" type="number" min="0" max="1" step="0.1" placeholder="Danceability (0-1)">
      <input v-model="valence" type="number" min="0" max="1" step="0.1" placeholder="Mood/Valence (0-1)">
      <select v-model="genre">
        <option disabled value="">Select a genre</option>
        <option v-for="genre in genreSeeds" :key="genre" :value="genre">{{ genre }}</option>
      </select>
       <input v-model="genre" type="text" placeholder="Genre">
      <input v-model="duration" type="number" placeholder="Playlist duration (minutes)"> -->
      <button id="generate" type="submit">Generate Playlist</button>
    </form>
    <Metronome ref="metronome"></Metronome>
  </div>
</template>

<script>
import Metronome from './Metronome.vue';
export default {
  components:{
    Metronome
  },
  data() {
    return {
      bpm: null,
      energy: null,
      danceability: null,
      valence: null,
      genre: '',
      duration: null,
      genreSeeds: [],
      trackResults: [],
    }
  },
  methods: {
    async generatePlaylist() {
      this.trackResults = await this.fetchRecommendations()
      this.$emit('retrieveTracks', this.trackResults);
    },
    async fetchRecommendations() {
      let debug = true; 
      const params = new URLSearchParams({
        min_tempo: debug == true ? 95 : (this.$refs.metronome.minTempo),
        max_tempo: debug == true ? 105 : (this.$refs.metronome.maxTempo),
        target_tempo: debug == true ? 100 : this.$refs.metronome.tempo,
        target_energy: debug == true ? 1 : this.energy,
        target_danceability: debug == true ? 1 : this.danceability,
        target_valence: debug == true ? 1 : this.valence,
        seed_genres: debug == true ? "folk" : this.genre,
        limit: debug == true ? 30 : Math.ceil(this.duration/3)
      });
      const url = `https://api.spotify.com/v1/recommendations?${params.toString()}`; //'https://api.spotify.com/v1/recommendations?limit=5&seed_genres=pop&target_danceability=0.9&target_energy=0.9&target_valence=0'
      console.log(url)
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const tracks = data.tracks;

        // Fetch audio features for all tracks
        const tracksWithFeatures = await this.fetchAudioFeatures(tracks);
        
        return tracksWithFeatures;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
      }
    },
    async fetchAudioFeatures(tracks) {
      const ids = tracks.map(track => track.id).join(',');
      const url = `https://api.spotify.com/v1/audio-features?ids=${ids}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const audioFeatures = data.audio_features;
        console.log('# of songs', audioFeatures.length)
        // Combine track info with audio features
        return tracks.map((track, index) => ({
          ...track,
          ...audioFeatures[index]
        }));
      } catch (error) {
        console.error('Error fetching audio features:', error);
        return tracks; // Return original tracks if fetching features fails
      }
    },
    async fetchGenreSeeds() {
      try {
        const response = await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch genres');
        }

        const data = await response.json();
        this.genreSeeds = data.genres; // Spotify returns genres as an array in "genres" key
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted(){
    this.fetchGenreSeeds();
  }
}
</script>

<style>

#generate{
  
}

</style>