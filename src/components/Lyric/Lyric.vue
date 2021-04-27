<template>
  <div id="lyric" ref="lyric">
    <ul :style="{
      transform:`translateY(${-lyricActiveIndex * 40 + centerPositionY}px)`
    }" class="lyric-content-box">
      <li
          v-for="(item,index) in lyricArr"
          :class="{active:index === lyricActiveIndex}"
          :key="item"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
import {computed, defineComponent, onMounted, ref, watch} from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'Lyric',
  setup(props, context) {
    const store = useStore()
    let lyricActiveIndex = ref(computed(() => store.getters['player/getLyricActiveIndex']))
    let lyricArr = ref(computed(() => store.getters['player/getLyricArr']))
    let lyric = ref(null)
    let songItem = ref([])
    let centerPositionY = ref(0)
    onMounted(() => {
      centerPositionY.value = lyric.value.clientHeight / 2 - 20
    })
    watch(lyricArr, () => {
      songItem.value = lyric.value.getElementsByTagName('li')
    })
    window.onresize = () => {
      centerPositionY.value = lyric.value.clientHeight / 2 - 20
    }

    return {
      lyricArr,
      lyricActiveIndex,
      lyric,
      centerPositionY
    }
  }
})
</script>

<style scoped>
#lyric {
  height: 100%;
  overflow: hidden;
}

.lyric-content-box {
  transition: .5s;
}

.lyric-content-box li {
  line-height: 40px;
  font-size: var(--font_smale);
  color: var(--color_1);
  transition: .5s;
}

.lyric-content-box li.active {
  color: var(--color_2);
  transform: scale(1.2);
}
</style>
