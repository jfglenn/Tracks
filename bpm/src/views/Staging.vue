// SpotifyPlaylistGenerator.vue
<template>
  <div>
    <SoundBoard @retrieveTracks="updateTracks"></SoundBoard>
    <table v-if="trackResults.length">
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
          <input type="checkbox" v-model="stagingPlaylist" :value="track">
          <!-- <td>{{ index + 1 }}</td> -->
          <td>{{ track.name }}</td>
          <td>{{ track.artists[0].name }}</td>
          <td>{{ track.tempo }}</td>
          <td>{{ genre }}</td>
          <td>{{ track.energy }}</td>
          <td>{{ track.valence }}</td>
          <td>{{ track.danceability }}</td>
          <td>{{ track.duration_ms/60000 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SoundBoard from '@/components/SoundBoard.vue';

export default {
  components:{
    SoundBoard
  },
  data() {
    return {
      trackResults: [],
      stagingPlaylist: []
    }
  },
  methods: {
    updateTracks(tracks){
      this.trackResults = tracks;
    }

  }
}
</script>