<template>
    <div
      class="swiper-container"
      @mousedown="startDrag"
      @mousemove="dragging"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @touchstart="startDrag"
      @touchmove="dragging"
      @touchend="endDrag"
    >
      <div
        class="swiper-wrapper"
        :style="wrapperStyle"
      >
        <div v-for="(_, index) in items" :key="index" class="swiper-slide">
            <!-- <div class="scrollable-content"> -->
                <slot :index="index" :active="index === currentIndex"></slot>
            <!-- </div> -->
        </div>
      </div>
      <div class="swiper-pagination">
        <span
          v-for="(_, index) in items.length"
          :key="index"
          class="swiper-dot"
          :class="{ 'is-active-dot': index === currentIndex }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Swiper",
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        currentIndex: 0,
        translateX: 0,
        startX: 0,
        isDragging: false
      };
    },
    computed: {
      wrapperStyle() {
        return {
          transform: `translateX(${this.translateX}px)`,
          transition: this.isDragging ? 'none' : 'transform 0.3s ease-in-out'
        };
      }
    },
    methods: {
      goToSlide(index) {
        this.currentIndex = index;
        this.updateTranslate();
      },
      updateTranslate() {
        this.translateX = -this.currentIndex * this.$el.clientWidth;
      },
      startDrag(e) {
        this.isDragging = true;
        this.startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      },
      dragging(e) {
        if (!this.isDragging) return;
        const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        this.translateX += currentX - this.startX;
        this.startX = currentX;
      },
      endDrag() {
        if (!this.isDragging) return;
        this.isDragging = false;
        const movedBy = this.translateX + this.currentIndex * this.$el.clientWidth;
  
        if (movedBy < -50 && this.currentIndex < this.items.length - 1) {
          this.currentIndex++;
        } else if (movedBy > 50 && this.currentIndex > 0) {
          this.currentIndex--;
        }
  
        this.updateTranslate();
      }
    },
    mounted() {
      this.updateTranslate();
      window.addEventListener('resize', this.updateTranslate);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.updateTranslate);
    }
  };
  </script>
  
  <style scoped>

.custom-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 300px;
  /* background-color: #f0f0f0; */
}

/* .custom-slide.active-slide {
  background-color: #ddd;
} */

.custom-slide img,
.custom-slide video {
  max-width: 100%;
  height: auto;
}

.swiper-container {
  position: relative;
  overflow: hidden;
  cursor: grab;
  background-color: #014e4b;
  padding: 2%;
  border-radius: 15px;
}

.swiper-container:active {
  cursor: grabbing;
}

.swiper-wrapper {
  display: flex;
}

.swiper-slide {
  min-width: 100%;
}

.swiper-pagination {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.swiper-dot {
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background-color: #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: width 0.3s, height 0.3s, background-color 0.3s;
}

.swiper-dot.is-active-dot {
  width: 12px;
  height: 12px;
  background-color: #333;
}

</style>
