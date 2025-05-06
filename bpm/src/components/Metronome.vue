<template>
    <div class="metronome outline-without-border" :class="{ 'advSettingsExpanded': expandAdvancedSettings }">
      <div class="main-settings" :class="{ 'advSettingsExpanded': expandAdvancedSettings }">
        <button @click="tapTempo" class="solid" id="bpm-control-tap">Tap Tempo</button>
        <div class="main-control-wrapper">
            <input type="number" class="outline" id="bpm" v-model="tempo" @input="onTempoInput" />
            <div class="main-leveler-controls">
                <button class="main-leveler outline" @click="tempo--">-</button>
                <button class="main-leveler outline" @click="tempo++">+</button>
            </div>
        </div>
      </div>
      <div class="advanced-settings outline" :class="{ 'advSettingsExpanded': expandAdvancedSettings }">
          <p @click="configureAdvancedSettings" id="advanced-settings-label">Advanced Settings</p>
          <div class="advanced-control-wrapper" v-if="expandAdvancedSettings">
           
            <div class="tool">
              <p class="advanced-bpm-label">Minimum BPM</p>
              <div class="advanced-controls outline">
                <button class="advanced-leveler-left solid" @click="minTempo--">-</button>
                <input class="advanced-bpm outline-without-border" type="number"  v-model="minTempo" @input="onTempoInput"></input>
                <button class="advanced-leveler-right solid" @click="minTempo++">+</button>
              </div>
            </div>
            
            <div class="tool">
              <p class="advanced-bpm-label">Maximum BPM</p>
              <div class="advanced-controls outline">
                <button class="advanced-leveler-left solid" @click="maxTempo--">-</button>
                <input class="advanced-bpm outline-without-border" type="number" v-model="maxTempo" @input="onTempoInput"></input>
                <button class="advanced-leveler-right solid" @click="maxTempo++">+</button>
              </div>
            </div>
          </div> 
      </div>
    </div>
</template>
  
<script>

    export default {
    data() {
        return {
        tempo: 120,
        minTempo: null,
        maxTempo: null,
        taps: [],
        expandAdvancedSettings: false
        };
    },
    computed:{
      
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
        configureAdvancedSettings(){
          this.expandAdvancedSettings = !this.expandAdvancedSettings

          if(this.expandAdvancedSettings){
            if(this.minTempo == null)
              this.minTempo = this.tempo - 5;

            if(this.maxTempo == null)
              this.maxTempo = this.tempo + 5;

          }
        }
    },
};
</script>
  
<style scoped>

/*
main color: #630a14; // burgandy
accent color: #EB93BD; // pink
*/ 
  .metronome {
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 125px;
    padding: 1%;
    border-radius: 15px;
    transition: height 0.3s;
  }
  .metronome.advSettingsExpanded{
    height: 300px;
    transition: height 0.3s;
  }

  .solid{
    background-color: #EB93BD;
    color: #630a14;
    border:none;
  }

  .outline{
    background-color: #630a14;
    color: #EB93BD;
    border-color: #EB93BD;
    border: 1.5px solid #EB93BD;
  }

  .outline-without-border{
    background-color: #630a14;
    color: #EB93BD;
    border:none;
  }
  .main-settings{
    height: 70%;
    display: flex;
    justify-content: space-around;
    border-radius:15px;
    margin-bottom: 5px;
  }
  .main-settings.advSettingsExpanded{
    height:30%;
    transition: height 0.3s;
  }

  #bpm-control-tap {
    width: 48%;
    border-radius: 10px;
  }
  .main-control-wrapper{
    width: 48%;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .main-leveler-controls {
    height: 42%;
    display: flex;
    justify-content: space-between;
  }
  .main-leveler{
    height:100%;
    width: 48%;
    border-radius: 10px;
  }
  #bpm {
    height: 42%;
    text-align: center;
    font-size: 20px;
    border-radius: 12px;
    padding-left: 15%;
  }


  .advanced-settings{
    padding: 3%;
    height: 25%;
    border-radius: 15px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  #advanced-settings-label{
    margin: 2%;
    font-weight: bold;
  }
  .advanced-settings.advSettingsExpanded {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 65%;
    padding: 5%;
    transition: height 0.3s;
    overflow-y: hidden;
  } 
  
 .advanced-control-wrapper{
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 3%;
  }

  .advanced-bpm-label{
    margin: 0px;
    margin-left:3%;
  }

  .tool{
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 3%;
    height:45%;
  }

  .advanced-controls{
    display:flex;
    border-radius: 20px;
    height: 46%;
    margin: 3%;
    justify-content: space-between;
    align-items: center;
  }

  .advanced-leveler-left, .advanced-leveler-right{
    height: 100%;
    width: 20%
  }

  .advanced-leveler-left{
    border-radius: 15px 0px 0px 15px;
  }
  .advanced-leveler-right{
    border-radius: 0px 15px 15px 0px;
  }
  .advanced-bpm{
    width:25%;
    margin-left: 10%;
  }  
</style>
  