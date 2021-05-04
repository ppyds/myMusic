<template>
  <div v-if="list" class="banner-box">
    <div v-for="(item,index) in list" :class="{
      active:index===activeIndex,
      prev:index ===(activeIndex === 0?list.length - 1:activeIndex - 1),
      next:index === (activeIndex === list.length - 1?0:activeIndex + 1)
    }"
         class="item"
    >
      <img :src="item.imageUrl" alt="" :key="item.imageUrl">
    </div>
  </div>
</template>
<script>
import {computed, defineComponent, onUnmounted, ref} from "vue";
import {onBeforeRouteLeave} from 'vue-router'

export default defineComponent({
  name: 'Banner',
  props: {
    list: {
      type: Array
    }
  },
  setup(props, context) {
    let timer
    let activeIndex = ref(1)
    let list = ref(computed(() => props.list))
    timer = setInterval(function () {
      activeIndex.value = activeIndex.value + 1
      if (activeIndex.value > list.value.length -1) activeIndex.value = 0
    }, 4000)
    onBeforeRouteLeave(() => {
      clearInterval(timer)
    })
    onUnmounted(() => {
      clearInterval(timer)
    })
    return {
      activeIndex
    }
  }
})
</script>
<style scoped>
.banner-box {
  width: 100%;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1400px;
}


.item {
  width: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  border-radius: var(--border-radius_2);
  overflow: hidden;
  opacity: 0;
  transition: .5s;
  transform: translateX(-100%);
}

.item img {
  width: 100%
}

.item.prev {
  transform: translateX(-100%);
  opacity: .5;
}

.item.next {
  transform: translateX(0);
  opacity: .5;

}

.item.active {
  opacity: 1;
  transform: translateX(-50%) scale(1.3);
  transform-origin: center;
  z-index: 99;
}
</style>
