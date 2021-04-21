<template>
  <div class="swiper-container" v-if="list">
    <div class="swiper-wrapper">
      <div v-for="item in list" class="swiper-slide">
        <img :src="item.imageUrl" alt="">
      </div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import {defineComponent, onMounted, watch} from "vue";
export default defineComponent({
  name: 'Banner',
  props: {
    list: {
      type: Array
    }
  },
  setup(props, context) {
    onMounted(() => {

    })
    watch(props, () => {
      setTimeout(() => {
        var swiper = new Swiper('.swiper-container', {
          effect: 'coverflow',
          grabCursor: true,
          loop: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          autoplay: {
            disableOnInteraction: false,   // 手动滑动后继续自动播放
          },
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          },
          pagination: {
            el: '.swiper-pagination',
          },
        });
      })
    })
    return {}
  }
})
</script>
<style>
/*.el-carousel__container{*/
/*  height: auto;*/
/*}*/
.swiper-container {
  width: 70vw;
  border-radius: var(--border-radius_2);
}

img {
  width: 100%
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 50vw;
  /*height: 300px;*/
  overflow: hidden;
  border-radius: var(--border-radius_2);
}

.swiper-pagination-bullet-active {
  background: var(--color_2);
}
</style>
