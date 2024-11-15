<template>
  <div class="slider">
    <div class="slider-percentage">{{ progress }}%</div>
    <div
      class="slider-bar"
      @mousedown="startDrag"
      @touchstart="startDrag"
      @touchmove.prevent="onDrag"
    >
      <div class="slider-fill" :style="{ height: progress + '%' }"></div>
    </div>
    <div class="slider-text">
      <h5>{{ sliderName }}</h5>
      <div class="slider-description">{{ sliderDescription }}</div>
    </div>
   
  </div>
</template>

<script>
export default {
  props:{
    sliderName:{
        type: String,
        Required: true
    },
    sliderDescription:{
        type: String,
        Required: true
    }
  },
  data() {
    return {
      progress: 0, // Initial progress value
      description: 'This represents the current progress.', // Description of the progress bar
      isDragging: false, // Track if the user is currently dragging
    };
  },
  methods: {
    startDrag(event) {
      this.isDragging = true;
      this.onDrag(event); // Initial drag to set value on click
      document.addEventListener("mousemove", this.onDrag);
      document.addEventListener("mouseup", this.stopDrag);
      document.addEventListener("touchmove", this.onDrag);
      document.addEventListener("touchend", this.stopDrag);
    },
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener("mousemove", this.onDrag);
      document.removeEventListener("mouseup", this.stopDrag);
      document.removeEventListener("touchmove", this.onDrag);
      document.removeEventListener("touchend", this.stopDrag);
    },
    onDrag(event) {
      if (!this.isDragging) return;
      const progressBar = this.$el.querySelector(".slider-bar");
      const rect = progressBar.getBoundingClientRect();
      const y = event.touches ? event.touches[0].clientY : event.clientY;
      const percentage = Math.max(
        0,
        Math.min(100, ((rect.bottom - y) / rect.height) * 100)
      );
      this.progress = Math.round(percentage);
    },
  },
};
</script>

<style scoped>
.slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  user-select: none;
  margin:10px;
}
.slider-percentage {
  font-size: 1.2em;
  margin-bottom: 10px;
}
.slider-bar {
  position: relative;
  width: 75px;
  height: 150px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
}
.slider-fill {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #007bff;
  transition: height 0.1s;
}

.slider-text{
  display:flex;
  flex-direction: column;
  align-items: center;
}
h5{
  margin:10px;
}
.slider-description {
  text-align: center;
  font-size: 0.7em;
  text-align: left;
  color: #666;
}
</style>
