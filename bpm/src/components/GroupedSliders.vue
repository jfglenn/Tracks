<template>
    <div>
        <div class="wrapper">
                <Slider v-for="control in controls" 
                    :ref="control.name"
                    :sliderLabel="control.name" 
                    :sliderDescription="control.description" 
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
    }
  }
  </script>
  
  <style scoped>
    .wrapper{
        display: flex;
        justify-content: center;
    }
  </style>