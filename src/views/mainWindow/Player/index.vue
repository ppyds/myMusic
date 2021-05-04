<template>
  <div id="player_bar">
    <div v-if="name" id="content">
      <div class="left" @click="showPlayerInfo">
        <Image :_url="playQueueItem.songDetail?playQueueItem.songDetail['al']['picUrl']:''"/>
      </div>
      <div class="center">
        <div class="center_top">
          <p class="lyric">
            <span
                v-if="!playerInfoShow"
            >
              {{ playQueueItem.lyricArr ? playQueueItem.lyricArr[lyricActiveIndex] : '暂无歌词' }}
            </span>
          </p>
          <div class="collect">
            <ul class="collect_list">
              <li
                  v-for="item in collectObj.names"
                  :class="{active:String(playQueueItem['names']).indexOf(item) !== -1}"
                  @click="collect(playQueueItem,item)"
              >
                {{ item}}
              </li>
              <li class="input">
                <input
                    v-model="collectName"
                    placeholder="新建歌单"
                    type="text"
                    @keydown.enter="addCollectList"/>
              </li>
            </ul>
            <i class="iconfont active">&#xe6c2;</i>
          </div>
          <div class="volume">
            <Slider
                :max="Number(1)"
                :position="Number(volume)"
                :tips="parseInt(volume * 100)"
                @input="volumeInput"/>
          </div>
        </div>
        <div id="Slider_box">
          <Slider
              :max="Number(duration)"
              :position="Number(currentTime)"
              :tips="playQueueItem.lyricArr?playQueueItem.lyricArr[tipsIndex]:'暂无歌词'"
              @input="input"
              @mouseUp="mouseUp"
          />
        </div>
        <div class="center_bottom">
          <p class="time">
            {{ timeStr }}
          </p>
          <p
              v-show="!playerInfoShow"
              class="name"
          >
            {{ name + ' : ' + singerName }}
          </p>
        </div>
      </div>
      <div class="right">
        <div class="prev">
          <i class="iconfont"
             @click="prevClick"
          >
            &#xe6dc;
          </i>
        </div>
        <div class="play">
          <i class="iconfont"
             @click="playClick"
          >
            {{ !pause ? '&#xe714;' : '&#xe70e;' }}
          </i>
        </div>
        <div class="next">
          <i class="iconfont"
             @click="nextClick"
          >
            &#xe6dd;
          </i>
        </div>
      </div>
    </div>
    <transition v-if="name" name="fade">
      <playerInfo
          v-if="playerInfoShow"
          :lyric-arr="playQueueItem.lyricArr"
          :mask="playQueueItem.songDetail?playQueueItem.songDetail['al']['picUrl']:''"
          :singer-name="singerName"
          :song-info="playQueueItem.songDetail"/>
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
    const STORE = useStore()
    let lyricActiveIndex = ref(computed(() => STORE.getters['player/getLyricActiveIndex']))
    let currentTime = ref(computed(() => STORE.getters['player/getCurrentTime']))
    let duration = ref(computed(() => STORE.getters['player/getDuration']))
    let playQueueItem = ref(computed(() => STORE.getters['player/getPlayQueue'][STORE.getters['player/getPlayIndex']]))
    let tipsIndex = ref(computed(() => STORE.getters['player/getTipsIndex']))
    let pause = ref(computed(() => STORE.getters['player/getPause']))
    let timeStr = ref('')
    let name = ref(computed(() => STORE.getters['player/getName']))
    let singerName = ref(computed(() => STORE.getters['player/getSingerName']))
    let volume = ref(computed(() => STORE.getters['player/getVolume']))
    let playerInfoShow = ref(0)
    let collectName = ref('')
    let collectObj = ref(computed(() => STORE.getters['collect/getCollectObj']))
    watch(currentTime, () => {
          timeStr.value = millisecondsToMinutes(currentTime.value * 1000)
              + ' / ' +
              millisecondsToMinutes(duration.value * 1000)
        }
    )
    const mouseUp = (currentTime) =>
        STORE.commit('player/setCurrentTime', {
          currentTime: currentTime * duration.value / 100,
          set: true
        })

    const input = e =>
        STORE.dispatch('player/timeIndex', ['setTipsIndex', e / 100 * duration.value])
    const volumeInput = e =>
        STORE.commit('player/setVolume', e / 100)

    const collect = (item, name) =>
        STORE.dispatch('collect/addCollectObj', {
          name,
          item
        })


    const addCollectList = () =>
        STORE.dispatch('collect/addCollectList', collectName.value)

    const playClick = () => STORE.dispatch('player/songStopTab')
    const nextClick = () => STORE.dispatch('player/playRules', 1)
    const prevClick = () => STORE.dispatch('player/playRules', 2)
    const showPlayerInfo = () => playerInfoShow.value = !playerInfoShow.value

    return {
      currentTime,
      duration,
      global,
      lyricActiveIndex,
      playQueueItem,
      tipsIndex,
      timeStr,
      pause,
      name,
      playerInfoShow,
      singerName,
      volume,
      collectName,
      collectObj,
      mouseUp,
      input,
      playClick,
      nextClick,
      prevClick,
      showPlayerInfo,
      volumeInput,
      collect,
      addCollectList
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

#player_bar #content {
  box-sizing: border-box;
  padding: 0 30px 0;
  display: flex;
  position: relative;
  z-index: 1;
  height: 100%
}

#player_info_box {

}

.fade-enter-active, .fade-leave-active {
  transition: 1s;
  opacity: 1;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
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

.center_top .collect {
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: relative;
}



.collect .collect_list {
  transition: .3s;
  position: absolute;
  bottom: 40px;
  background-color: var(--color_1);
  padding:20px;
  transform-origin: bottom;
  transform: scaleY(0);
  width: 150px;
  max-height:200px;
  border-radius: var(--border-radius_2);
  color: var(--color_2);
  font-size: var(--font_smale);
  overflow: auto;
}

.collect:hover .collect_list,
.collect .collect_list:hover{
  transform:scaleY(1)
}

.collect_list li {
  height: 25px;
  line-height: 25px;
  border-radius: var(--border-radius_2);
  text-indent: 2em;
  margin-top: 10px;
  background-color: var(--color_1);
  overflow: hidden;
  box-shadow: var(--color_1) 0 0 5px 0;
}

.collect_list li:hover,
.collect_list .active {
  box-shadow: var(--color_2) 0 0 5px 0;
}

.collect_list .input {
  text-indent: 0;
}

.input input {
  display: block;
  height: 100%;
  width: 100%
}

.collect .iconfont {
  font-size: 20px;
  color: var(--color_1)

}

.collect .active {
  color: var(--colorRed)
}

.center_top .volume {
  width: 60px;
  align-items: center;
  display: flex;
}

.center .center_bottom {
  padding-top: 10px;
}

.center .center_bottom .name {
  margin-right: 20px;
  font-size: var(--font_smale);
  flex: 1;
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

.right div .iconfont {
  font-size: 30px;
}

.right .play .iconfont {
  font-size: 45px;
  transition: .5s;
}
</style>
