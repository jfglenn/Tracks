<template>
    <div class="metronome">
        <button @click="tapTempo" id="bpm-control-tap">Tap Tempo</button>
        <div class="bpm-wrapper">
            <input type="number" id="bpm" v-model="tempo" @input="onTempoInput" />
            <div class="bpm-controls">
                <button class="bpm-control" id="bpm-increase" @click="tempo--">-</button>
                <button class="bpm-control" id="bpm-decrease" @click="temp++">+</button>
            </div>
        </div>
    </div>
</template>
  
<script>
    export default {
    data() {
        return {
        tempo: 120,
        taps: [],
        };
    },
    methods: {
        tapTempo() {
        // TLDR: measure intervals between successive taps to get bpm
        
        const now = Date.now(); // milliseconds
        this.taps.push(now);

        // Keep only the last 5 taps
        if (this.taps.length > 5) {
            this.taps.shift(); // sliding window (removes oldest tap time)
        }

        if (this.taps.length >= 2) {
            const timeIntervals = this.taps
            .slice(1) // start from the second element bc we need the intervals between each tap
            .map((time, index) => time - this.taps[index]); // subtract each tap time from previous one

            // Calculate average time difference between taps
            const avgTimeInterval =
            timeIntervals.reduce((a, b) => a + b, 0) / timeIntervals.length;

            // Convert the average time interval (in milliseconds) to beats per minute (BPM)
            // Formula: BPM = (60s * 1000ms) / avgTimeInterval
            this.tempo = Math.round((60 * 1000) / avgTimeInterval);
        }
        },
        onTempoInput(event) {
        const inputTempo = parseInt(event.target.value, 10);
        if (!isNaN(inputTempo)) {
            this.tempo = inputTempo;
        }
        },
    },
};
</script>
  
<style scoped>
  .metronome {
    display: flex;
    width: 200px;
    height: 70px;
  }
  #bpm-control-tap {
    width: 50%;
  }
  .bpm-wrapper{
    width: 50%;
    display:flex;
    flex-direction: column;
  }
  .bpm-controls {
    height: 50%;
  }
  .bpm-control{
    height:100%;
    width: 50%;
  }
  #bpm {
    height: 50%;
    text-align: center;
    font-size: 20px;
  }
</style>
  