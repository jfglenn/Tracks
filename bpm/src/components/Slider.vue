<template>
    <div class="slider">
        <div class="slider-value"><h2>{{ sliderValue }}</h2></div>
        <div
            class="slider-box"
            @mousedown="startDrag"
            @touchstart="startDrag"
            @mousemove="drag"
            @touchmove="drag"
            @mouseup="stopDrag"
            @mouseleave="stopDrag"
            @touchend="stopDrag"
        >       
            <div class="slider-fill" :style="{ height: fillPercentage + '%' }"></div>
        </div>
        <div class="slider-text">
                <h2>{{sliderLabel}}</h2>
                <p v-if="sliderDescription">{{ sliderDescription }}</p>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    props:{
        sliderLabel: {
            type: String,
            Required: true
        },
        sliderDescription:{
            type: String,
            Required: false
        },
    },
    data() {
      return {
        sliderValue: 50,
        dragging: false,
      };
    },
    computed: {
      fillPercentage() {
        return this.sliderValue
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
        this.sliderValue = Math.round((relativeY / rect.height) * 100);
      },
    },
  };
  </script>
  
  <style scoped>
    .slider{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:100px;
        height:500px;
    }
   .slider-box{
    border-radius: 15px;
    height:100%;
    width:100%;
    border: 2px solid #333;
    position: relative;
    cursor: pointer;
    user-select: none;
    touch-action: none; 
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

    transform: translateX(-50%);
    font-weight: bold;
    color: #333;
  }
  </style>