<template>
  <div id="playerInfo" :style="{
  width:isMaxWindow?'100vw':null,
  height:isMaxWindow?'100vh':null,
  // appRegion: isMaxWindow?'no-drag':'drag'
  }">
    <div id="mask">
      <Image :_url="maskUrl" class="img"/>
    </div>
    <div id="appRegion" :style="{
      width:`calc(100vw - ${window.document.getElementById('ControlButton_box').offsetWidth}px)`,
      height:'60px',
      appRegion: isMaxWindow?'no-drag':'drag'
    }"></div>
    <div id="content">
      <div class="left">
          <h4 class="song_name">{{ songInfo.name }}</h4>
          <h4 class="singer-name">{{ singerName }}</h4>
          <div class="img_box">
            <Image :_url="maskUrl" class="img"/>
          </div>
      </div>
      <div class="right">
        <div class="lyric_box">
          <Lyric v-if="lyricArr.length" :lyric-arr="lyricArr"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loadingImage from '@/assets/images/loading.gif'
import {computed, defineComponent, ref} from "vue"
import Image from "@/components/Image/Image";
import Lyric from "@/components/Lyric/Lyric";
import {useStore} from "vuex";

export default defineComponent({
  name: "PlayerInfo",
  props: {
    mask: {
      type: String
    },
    songInfo: {
      type: Object
    },
    singerName: {
      type: String
    },
    lyricArr: {
      type:Array
    }
  },
  components: {
    Image,
    Lyric
  },
  setup(props, context) {
    const store = useStore()
    let isMaxWindow = computed(() => store.getters.isMaxWindow)
    let maskUrl = ref(computed(() => props.mask))
    let lyricArr = ref(computed(() => props.lyricArr))
    return {
      loadingImage,
      maskUrl,
      isMaxWindow,
      window,
      lyricArr
    }
  }
})
</script>

<style scoped>
#playerInfo {
  position: fixed;
  height: calc(100vh - 10px);
  width: calc(100vw - 10px);
  bottom: 0;
  user-select: none;
}

#playerInfo > div {
  --px: 100%;
  position: absolute;
  height: var(--px);
  width: var(--px);
}

#playerInfo > #mask {
  z-index: -1;
  overflow: hidden;
}
#appRegion{
  width:
}
.img {
  width: 100%;
  min-height: 100%;
}

#content {
  backdrop-filter: blur(20px);
  display: flex;
  background-color: rgba(0, 0, 0, .55);
  overflow: hidden;
}

#content > div {
  flex: 1;
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;
}
#content .left{
  margin-top: -60px;
}
#content .left .song_name {
  font-size: 25px;
  color: transparent;
  -webkit-text-stroke: 1px var(--color_2);
  line-height: 1.5;
}

#content .left .singer-name {
  font-size: var(--font_smale);
  line-height: 1.5;
  color: var(--color_1)
}

#content .left .img_box {
  width: 340px;
  border-radius: var(--border-radius_2);
  overflow: hidden;
  box-shadow: var(--color_2) 0 0 5px 0;
}

#content .right .lyric_box {
  height: 60%;
  width: 100%;
  text-align: center;
}
</style>
