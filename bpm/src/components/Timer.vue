<template>
    <div class="timer outline">
        <h2>Duration</h2>
      <div class="picker-container">
        <div v-for="type in ['hours', 'minutes']" :key="type" class="picker outline"
             @wheel="handleWheel(type, $event)"
             @mousedown="startDrag(type, $event)"
             @touchstart="startDrag(type, $event)">
          <div v-for="value in getValues(type)" :key="value" 
               :class="{ 'selected': selectedTime[type] === value }"
               :style="{ transform: `translateY(${getTranslateY(type, value)}px)` }">
            {{ padZero(value) }}
          </div>
        </div>
      </div>
      <div class="selected-time">
      {{ formattedTime }}
      </div>
    </div>
  </template>
  
  <script>

  const LIMITS = { hours: 24, minutes: 60 /*, seconds: 60*/ };
  const ITEM_HEIGHT = 40;
  
  export default {
    name: 'TimePicker',
    data() {
      return {
        selectedTime: { hours: 0, minutes: 0, seconds: 0 },
        isDragging: false,
        startY: 0, 
        currentType: null, 
        offset: { hours: 0, minutes: 0, seconds: 0 }, 
      }
    },
    computed: {
      // Format the selected time as HH:MM:SS
      formattedTime() {
        return Object.values(this.selectedTime)
          .map(this.padZero)
          .join(':');
      },
    },
    mounted() {
      // event listeners to capture mouse and touch events globally (for dragging outside the component bounds)
      window.addEventListener('mousemove', this.onDrag);
      window.addEventListener('touchmove', this.onDrag);
      window.addEventListener('mouseup', this.stopDrag);
      window.addEventListener('touchend', this.stopDrag);
    },
    beforeDestroy() {
      window.removeEventListener('mousemove', this.onDrag);
      window.removeEventListener('touchmove', this.onDrag);
      window.removeEventListener('mouseup', this.stopDrag);
      window.removeEventListener('touchend', this.stopDrag);
    },
    methods: {
      calculatePlaylistSongCount(){
        let calcMinutes = (this.selectedTime.hours * 60) + this.selectedTime.minutes;

        if(calcMinutes == 0){
            return 30; // if they don't specify, add 30 songs to playlist
        }

        let numOfSongsOnPlaylist = Math.ceil(calcMinutes / 3); // estimate each song is about 3 minutes
        return numOfSongsOnPlaylist;

      },
      // pad single digit numbers with a leading zero
      padZero(num) {
        return num.toString().padStart(2, '0');
      },
      // generate an array of values for each time unit
      getValues(type) {
        // time type (h,m,s) -> max amount of time for type -> int array from 0 - (array length - 1)
        // [0, 1, 2, ..., 23] for hours
        let arrayLength = type;
        return Array.from({ length: LIMITS[arrayLength] }, (_, i) => i);
      },
      // Handle mouse wheel events
      handleWheel(type, event) {
        event.preventDefault(); // prevent default scrolling of page
        this.updateValue(type, event.deltaY > 0 ? 1 : -1);
      },
      // Start drag operation
      startDrag(type, event) {
        event.preventDefault(); // prevent default dragging, especially if touch screen
        this.isDragging = true;
        this.currentType = type;
        this.startY = event.type.includes('mouse') ? event.clientY : event.touches[0].clientY;
      },
      // Handle drag operation
      onDrag(event) {
        if (!this.isDragging) return;
        event.preventDefault();
        const currentY = event.type.includes('mouse') ? event.clientY : event.touches[0].clientY;
        const diff = this.startY - currentY;
        this.offset[this.currentType] = diff % ITEM_HEIGHT;
        
        if (Math.abs(diff) >= ITEM_HEIGHT) {
          const direction = diff > 0 ? 1 : -1;
          this.updateValue(this.currentType, direction);
          this.startY = currentY;
        }
      },
      // Stop drag operation
      stopDrag() {
        this.isDragging = false;
        this.offset[this.currentType] = 0;
      },
  
      updateValue(type, direction) {
        const limit = LIMITS[type]; // get limit for current time type (24 for hours, 60 for minutes)
        this.selectedTime[type] = (this.selectedTime[type] + direction + limit) % limit; // modulo ensuring it wraps around (e.g., 23 -> 0 for hours)
      },
      // Calculate the vertical translation for each time value
      getTranslateY(type, value) {
        const selected = this.selectedTime[type];
        const limit = LIMITS[type];
        let diff = value - selected;
        if (diff > limit / 2) diff -= limit;
        if (diff < -limit / 2) diff += limit;
        return diff * ITEM_HEIGHT - this.offset[type];
      },
    },
  }
  </script>
  
  <style scoped>
/*
main color: #d3d9f1
accent color: #dc561f
*/ 

  .solid {
    background-color: #d3d9f1;
    color: #dc561f;
    border: 1px solid #dc561f;
  }
  
  .outline {
    background-color: #d3d9f1;
    color: #dc561f;
    border: 1px solid #dc561f;
  }
  
  .outline-without-border {
    background-color: #d3d9f1;
    color: #55170a;
    border: none;
  } 

  /* Styles for solid button */
  /* .solid {
    background-color: #fed22a;
    color: #55170a;
    border: none;
    border-color: #55170a;
  }
  
  .outline {
    background-color: #fed22a;
    color: #55170a;
    border: 1px solid #55170a;
  }
  
  .outline-without-border {
    background-color: #fed22a;
    color: #55170a;
    border: none;
  } */
  
  /* Main timer container */
  .timer {
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 320px;
    padding: 1%;
  }
  
  /* Container for the picker wheels */
  .picker-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    height:85%;
  }
  
  /* Individual picker wheel */
  .picker {
    width: 60px;
    height: 100%;
    overflow: hidden;
    text-align: center;
    border-radius: 15px;
    cursor: grab;
    user-select: none;
    position: relative;
    /*box-shadow: inset 0 0 10px #7b89c4;*/
    box-shadow: inset 0 10px 20px #c1caea, /* Top shadow */
    inset 0 -10px 20px #c1caea; /* Bottom shadow */
  }

  
  /* Individual time value within the picker */
  .picker div {
    height: 40px;
    line-height: 40px;
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    transition: transform 0.1s;
  }
  
  /* Highlight the selected time value */
  .picker .selected {
    background-color: #e0e0e0;
    font-weight: bold;
  }
  
  /* Display of the selected time */
  .selected-time {
    margin-top: 20px;
    font-size: 18px;
  }
  </style>