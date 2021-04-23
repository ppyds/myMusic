<template>
  <div id="player_bar">
    <div id="content">
      <div class="left" @click="showPlayerInfo">
        <!--      <img v-if="songInfo['al']" :src="songInfo['al']['picUrl']" alt="">-->
        <Image :_url="songInfo['al']?songInfo['al']['picUrl']:''"/>
      </div>
      <div class="center">
        <div class="center_top">
          <p class="lyric">
            {{ lyricArr[lyricActiveIndex] }}
          </p>
        </div>
        <div id="Slider_box">
          <Slider :max="Number(duration)" :position="Number(currentTime)" :tips="lyricArr[tipsIndex]"
                  @input="input" @mouseUp="mouseUp"></Slider>
        </div>
        <div class="center_bottom">
          <p class="time">
            {{ timeStr }}
          </p>
          <p class="name">{{ name }}</p>
        </div>
      </div>
      <div class="right">
        <div class="prev">
          <i class="el-icon-caret-left" @click="prevClick"></i>
        </div>
        <div class="play">
          <i @click="playClick" v-show="!pause" class="el-icon-video-pause"></i>
          <i @click="playClick" v-show="pause" class="el-icon-video-play"></i>
        </div>
        <div class="next">
          <i class="el-icon-caret-right" @click="nextClick"></i>
        </div>
      </div>
    </div>
      <transition name="fade">
        <playerInfo v-show="playerInfoShow"/>
      </transition>
  </div>
</template>

<script>
import {computed, defineComponent, ref, watch} from "vue"
import {useStore} from 'vuex'
import Slider from '@/components/Slider'
import Image from "@/components/Image/Image";
import PlayerInfo from "@/views/mainWindow/Player/PlayerInfo/PlayerInfo";
import {millisecondsToMinutes} from '@/tools'

export default defineComponent({
  name: 'PlayerBar',
  //接收父组件的数据
  props: {},
  //定义子组件
  components: {
    Slider,
    Image,
    PlayerInfo
  },
  setup(props, context) {
    const store = useStore()
    let lyricActiveIndex = ref(computed(() => store.getters['player/getLyricActiveIndex']))
    let lyricArr = ref(computed(() => store.getters['player/getLyricArr']))
    let currentTime = ref(computed(() => store.getters['player/getCurrentTime']))
    let duration = ref(computed(() => store.getters['player/getDuration']))
    let songInfo = ref(computed(() => store.getters['player/getSongInfo']))
    let tipsIndex = ref(computed(() => store.getters['player/getTipsIndex']))
    let pause = ref(computed(() => store.getters['player/getPause']))
    let timeStr = ref('')
    let name = ref(computed(() => store.getters['player/getName']))

    let playerInfoShow = ref(false)
    watch(currentTime, () =>
      timeStr.value = millisecondsToMinutes(currentTime.value * 1000) + ' / ' + millisecondsToMinutes(duration.value * 1000)
    )
    const mouseUp = (currentTime) =>
        store.commit('player/setCurrentTime', {
          currentTime: currentTime * duration.value / 100,
          set: true
        })

    const input = e => store.dispatch('player/timeIndex', ['setTipsIndex', e / 100 * duration.value])

    const playClick = () =>store.dispatch('player/songStopTab')
    const nextClick = () => store.dispatch('player/playRules',1)
    const prevClick = () => store.dispatch('player/playRules',2)
    const showPlayerInfo = () => playerInfoShow.value = !playerInfoShow.value

    return {
      currentTime,
      duration,
      global,
      lyricActiveIndex,
      lyricArr,
      songInfo,
      tipsIndex,
      timeStr,
      pause,
      name,
      playerInfoShow,
      mouseUp,
      input,
      playClick,
      nextClick,
      prevClick,
      showPlayerInfo
    }
  }
})
</script>

<style scoped>
#player_bar {
  backdrop-filter: var(--webkit_backdrop_filter_1);
  height: 100%;
  flex-shrink: 0;
  position: relative;
  z-index: 3;
}
#player_bar #content{
  box-sizing: border-box;
  padding: 0 30px 0;
  display: flex;
  position: relative;
  z-index: 1;
}
#player_info_box{

}
.fade-enter-active, .fade-leave-active {
  transition: 1s;
  opacity: 1;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.center {
  flex: 1;
  padding: 5px 20px;
  --height: 30px;
}

.center .center_top,
.center .center_bottom {
  display: flex;

}

.center .center_bottom {
  padding-top: 10px;
}

.center .center_bottom .name {
  margin-right: 20px;
  font-size: var(--font_smale);
  /*-webkit-text-stroke: 1px var(--color_2);*/
  /*color:transparent;*/
  color: var(--color_2)

}

.center .time {
  font-size: var(--font_smale);
  color: var(--color_1);
  margin-right: 20px;
  width: 200px;
}

.center .lyric {
  text-align: left;
  flex: 1;
  color: var(--color_2);
  font-size: var(--font_big);
  line-height: var(--height);
  height: var(--height);
}

.left {
  width: 66px;
}

.left {
  display: flex;
  align-items: center;
}

.left img {
  height: 60px;
  width: 60px;
  border-radius: var(--border-radius_2);
}


.right {
  width: 150px;
  display: flex;
  align-items: center;
}

.right div {
  flex: 1;
  text-align: center;
  font-size: 30px;
  color: var(--color_2);
}

.right .play {
  font-size: 45px;
}
</style>
