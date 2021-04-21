<template>
  <div id="player_bar">
    <!--    <el-image-->
    <!--        style="width: 100px; height: 100px"-->
    <!--        :src="url"-->
    <!--        :fit="fit"/>-->
    <div>
<!--      <img :src="url" alt="">-->
    </div>
    <div class="center">
      <div class="lyric">
        {{ lyricArr[lyricActiveIndex] }}
      </div>
      <div id="Slider_box">
        <Slider :max="Number(duration)" :position="Number(currentTime)" :tips="'666666666666666'"
                @mouseUp="mouseUp"></Slider>
      </div>
    </div>
    <div class="left">
ssssssssssssss
    </div>

  </div>
</template>

<script>
import {computed, defineComponent, ref} from "vue"
import {useStore} from 'vuex'
import Slider from '@/components/Slider'

export default defineComponent({
  name: 'PlayerBar',
  //接收父组件的数据
  props: {},
  //定义子组件
  components: {
    Slider
  },
  setup(props, context) {
    let store = useStore()

    let lyricActiveIndex = ref(computed(() => store.getters['player/getLyricActiveIndex']))
    let lyricArr = ref(computed(() => store.getters['player/getLyricArr']))
    let currentTime = ref(computed(() => store.getters['player/getCurrentTime']))
    let duration = ref(computed(() => store.getters['player/getDuration']))
    const mouseUp = (currentTime) => {
      store.commit('player/setCurrentTime', {
        currentTime: currentTime * duration.value / 100,
        set: true
      })
    }
    return {
      currentTime,
      duration,
      global,
      lyricActiveIndex,
      lyricArr,
      mouseUp
    }
  }
})
</script>

<style scoped>
#player_bar {
  backdrop-filter: var(--webkit_backdrop_filter_1);
  height: 72px;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 0 30px 0;
  display: flex;
}
.center{
  flex:1
}
#Slider_box {
  padding: 5px 0;
}
.lyric{
  text-align: center;
  width:100%;
  color: var(--color_2);
  font-size: var(--font_big);
  line-height: 30px;
}
</style>
