<template>
    <div class="lightening-bolt">
        <div class="glow" :style="glowStyle"><img id="img" width="96" height="96" src="/icons8-lightning-bolt-96.png" alt="lightning-bolt"></img> </div>
        
    </div>
</template>
  
  <script>
  export default {
    props: {
      brightness: {
        type: Number,
        default: 50,
        validator: value => value >= 0 && value <= 100
      }
    },
    computed: {
      glowStyle() {
        const glowIntensity = this.brightness; // Full range from 0 to 100
        return {
            // offset offset blur spread
          boxShadow: `0 0 ${glowIntensity/2}px ${glowIntensity/4}px yellow` // Stronger glow
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .lightening-bolt{
    margin:10%;
  }
  .glow {
    background-color: #f2e9e3;
    position: relative; /* This establishes a positioning context */
    width: 1px; /* Width of the div */
    height: 1px; /* Height of the div */
    overflow: visible; /* Allow overflow to be visible */
    z-index: 1;

  }
  img{
    position: absolute; /* Position the image absolutely within the container */
    top: -20px; /* Adjust the top position to bring it up */
    left: -25px; /* Adjust the left position to bring it left */
    z-index: 2;
    height:50px;
    width:50px;
  }
  </style>
  