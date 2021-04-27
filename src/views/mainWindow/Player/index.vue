<template>
  <div id="player_bar">
    <div id="content" v-if="name">
      <div class="left" @click="showPlayerInfo">
        <Image :_url="songInfo['al']?songInfo['al']['picUrl']:''"/>
      </div>
      <div class="center">
        <div class="center_top">
          <p class="lyric">
            {{ lyricArr[lyricActiveIndex] }}
          </p>
        </div>
        <div id="Slider_box" @mousedown.stop="()=>{}">
          <Slider :max="Number(duration)" :position="Number(currentTime)" :tips="lyricArr[tipsIndex]"
                  @input="input" @mouseUp="mouseUp"></Slider>
        </div>
        <div class="center_bottom">
          <p class="time">
            {{ timeStr }}
          </p>
          <p class="name">{{ name +' : ' + singerName }}</p>
        </div>
      </div>
      <div class="right">
        <div class="prev">
          <i class="iconfont" @click="prevClick">&#xe6dc;</i>
        </div>
        <div class="play">
          <i @click="playClick" v-show="!pause" class="iconfont">&#xe714;</i>
          <i @click="playClick" v-show="pause" class="iconfont">&#xe70e;</i>
        </div>
        <div class="next">
          <i class="iconfont" @click="nextClick">&#xe6dd;</i>
        </div>
      </div>
    </div>
      <transition name="fade" v-if="name">
        <playerInfo v-show="playerInfoShow" :singer-name="singerName" :song-info="songInfo" :mask="songInfo['al']?songInfo['al']['picUrl']:''"/>
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
    let singerName = ref(computed(() => store.getters['player/getSingerName']))
    let playerInfoShow = ref(false)
    watch(currentTime, () =>{
          timeStr.value = millisecondsToMinutes(currentTime.value * 1000) + ' / ' + millisecondsToMinutes(duration.value * 1000)
        }
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
      singerName,
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
  user-select: none;

}
#player_bar #content{
  box-sizing: border-box;
  padding: 0 30px 0;
  display: flex;
  position: relative;
  z-index: 1;
  height:100%
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
  color: var(--color_2);
}
.right div .iconfont{
  font-size: 30px;
}

.right .play .iconfont{
  font-size: 45px;
}
</style>
