<template>
    <div class="grouped-sliders">
      <h2>Metrics</h2>
        <div class="wrapper">
                <Slider v-for="control in controls" 
                    :ref="control.name"
                    :sliderName="control.name" 
                    :sliderDescription="control.description"
                    @setMusicMetric="setMetric" 
                   ></Slider>
        </div>
    </div>
</template>
<script>

import Slider from './Slider.vue';

  export default {
    props:{
    
    },
    components:{
        Slider
    },
    data() {
      return {
        controls:{
            energy: {
                name: "Energy",
                description: "measures how 'pumped up' a track is",
                value: 50
            },
            danceability: {
                name: "Danceability",
                description: "measures how easy it is to 'cut a rug'",
                value: 50
            },
            valence: {
                name: "Valence",
                description: "determines whether its time to party or to pout.",
                value: 50
            }
        },
        dragging: false,
      };
    },
    computed: {

    },
    methods:{
      setMetric(metric){
        switch (metric.metric){
          case this.controls.energy.name:
            this.controls.energy.value = metric.val;
          case this.controls.danceability.name:
            this.controls.danceability.valu = metric.val;
          case this.controls.valence.name:
            this.controls.danceability.value = metric.val;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* dark green: #035941*/ 
/* lime green: #BEF067 */
    .grouped-sliders{
      background-color: #035941;
      border-radius: 15px;
    }
    .wrapper{
        display: flex;
        justify-content: center;
        width: 300px;
    }

    h2{
      color:#BEF067
    }
  </style>