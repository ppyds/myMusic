<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div v-if="list.length === 0" class="swiper-slide"></div>
      <div v-for="item in list" v-else class="swiper-slide">
        <img :src="item.imageUrl" alt="">
      </div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import {defineComponent, onMounted, watch} from "vue";
// import Swiper from "swiper"
// import 'swiper/swiper-bundle.css'
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
          // observer: true,//修改swiper自己或子元素时，自动初始化swiper
          // observeParents: true,//修改swiper的父元素时，自动初始化swiper
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
