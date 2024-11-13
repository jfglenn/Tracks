<template>
    <div class="danceability">
        <h2>Danceability</h2>
        <div
            class="slider"
            @mousedown="startDrag"
            @touchstart="startDrag"
            @mousemove="drag"
            @touchmove="drag"
            @mouseup="stopDrag"
            @mouseleave="stopDrag"
            @touchend="stopDrag"
        >
        
            <div class="slider-fill" :style="{ height: fillPercentage + '%' }"></div>
            <div class="value-display">{{ value }}</div>
        </div>
    
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        value: 0,
        dragging: false,
      };
    },
    computed: {
      fillPercentage() {
        return this.value;
      },
    },
    methods: {
      startDrag(event) {
        this.dragging = true;
        this.updateValue(event);
      },
      drag(event) {
        if (this.dragging) {
          this.updateValue(event);
        }
      },
      stopDrag() {
        this.dragging = false;
      },
      updateValue(event) {
        // Get the correct clientY position for touch and mouse events
        const clientY = event.clientY || (event.touches && event.touches[0].clientY);
        if (!clientY) return;
  
        const rect = this.$el.getBoundingClientRect();
        const relativeY = Math.max(0, Math.min(rect.bottom - clientY, rect.height));
        this.value = Math.round((relativeY / rect.height) * 100);
      },
    },
  };
  </script>
  
  <style scoped>
  .slider {
    border-radius: 15px;
    width: 100px;
    height: 300px;
    border: 2px solid #333;
    position: relative;
    cursor: pointer;
    user-select: none;
    touch-action: none; /* Prevents scrolling while dragging on touch screens */
    overflow: hidden;
  }
  .slider-fill {
   
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #4caf50;
    transition: height 0.1s;
  }
  .value-display {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    color: #333;
  }
  </style>
  
  
<!-- <template>
    <div class="energy solid">
        <div class="header">
            <h2>Danceability</h2>

        </div>
    <round-slider
        v-model="danceability"
        width="15"
        circle-shape="full"
        pathColor="#005840"
        rangeColor="#bef067"
        tooltipColor="#005840"
        borderColor="#005840"
        lineCap="round"
        radius="70"
    />
   

    </div>
</template>

<script>
import RoundSlider from 'vue-round-slider';
import LighteningBolt from './LighteningBolt.vue';
export default{
    components:{
        RoundSlider,
        LighteningBolt
    },
    data(){
        return{
            danceability: 50,
        }
    }
}
</script>

<style scoped>
/*
main color: #005840; // dark green
accent color: #bef067; // neon green
*/
.header{
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    color: #005840;
}
h2{
    margin:2%;
}
.solid{
    color: #005840;
    border: 1.5px solid #005840;

}
.energy{
    padding: 3%;
    border-radius: 15px;
    height: fit-content;
    color: #55170a;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.glowing-slider {
    filter: drop-shadow(0 0 10px #fed22a);
    /* Alternatively, use box-shadow for a more customizable glow */
    /* box-shadow: 0 0 20px 5px #fed22a; */
}
</style> -->