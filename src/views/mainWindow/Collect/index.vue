<template>
  <div>
    <div id="collect">
      <ul class="tab">
        <li
            v-for="item in collectObj.names"
            :key="item" :class="{active:activeName === item}"
            class="item"
            @click="setActiveName(item)"
        >
          {{ item }}
        </li>
      </ul>
      <ul class="content">
        <li
            v-for="(item,index) in collectObjToArr(collectObj.list)"
            v-show="String(item.names).indexOf(activeName) !== -1"
            :key="item.id" class="item"
        >
          <div
              :class="{active:item.id === activeId}"
              class="box"
          >
            <div class="inner">
              <div class="image_box">
                <Image
                    :_url="item.songDetail?item.songDetail['al']['picUrl']:''"
                />
              </div>
              <p class="name">
                {{ item.name }}
              </p>
              <p
                  v-if="item.ar" class="singer"
              >
                歌手：{{ item.ar.map(item => item.name).join(' / ') }}
              </p>
              <p
                  v-if="item.duration" class="duration"
              >
                时长：{{ item.duration }}
              </p>
            </div>
            <div class="dask">
              <i
                  :bool="item.id === activeId"
                  class="iconfont"
                  @click="playSong([collectObjToArr(collectObj['list']),item.id],item.id === activeId)"
              >
                {{ item.id === activeId && !pause ? '&#xe714;' : '&#xe70e;' }}
              </i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {computed, defineComponent, ref} from "vue"
import {useStore} from 'vuex'
import Image from '@/components/Image/Image'

export default defineComponent({
  name: 'Collect',
  components: {
    Image
  },
  setup(props, context) {
    const STORE = new useStore()
    let collectObj = ref(computed(() => STORE.getters['collect/getCollectObj']))
    let activeName = ref('我喜欢')
    let pause = ref(computed(() => STORE.getters['player/getPause']))
    let playSong = (data, bool) => {
      console.log(bool)
      if (bool) {
        STORE.dispatch('player/songStopTab')
        return
      }
      let Arr = data[0].filter((item, index) => String(item.names).indexOf(activeName.value) !== -1)
      let index = 0
      for (let i = 0; i < Arr.length; i++) {
        if (Arr[i].id === data[1]) {
          index = i
        }
      }
      data = [Arr, index]
      STORE.dispatch('player/getSongUrl', data)
    }
    let activeId = ref(computed(() => STORE.getters['player/getActiveId']))

    const setActiveName = (data) => {
      activeName.value = data
    }
    const collectObjToArr = data => Object.values(data)


    return {
      collectObj,
      activeName,
      activeId,
      pause,
      setActiveName,
      playSong,
      collectObjToArr
    }
  }
})
</script>

<style scoped>
#collect {
  flex: 1;
  overflow: hidden;
  user-select: none;
}

.tab {
  width: 100px;
  float: left;
  padding-top: 5px;
  padding-left: 5px;
  box-sizing: border-box;
}

.tab .item {
  font-size: var(--font_smale);
  background-color: var(--color_1);
  text-indent: 1em;
  height: 20px;
  line-height: 20px;
  color: var(--color_2);
  border-radius: var(--border-radius_1);
  margin-bottom: 5px;
  cursor: pointer;
}

.tab .active {
  box-shadow: var(--color_2) 0 0 5px 0;
}

.content {
  width: calc(100% - 100px);
  float: left;
  flex: 1;
  overflow-y: auto;
  height: 100%;
}

.content .item {
  float: left;
  padding: 10px;
  --height: 220px;
  --width: 150px;
  height: var(--height);
  width: var(--width);
}

.item .inner {
  border-radius: var(--border-radius_2);
  overflow: hidden;
  background-color: var(--color_1);
  text-indent: 2em;
  height: var(--height);
  width: var(--width);
}

.image_box {
  text-indent: 0;
}

.image_box img {
  width: 100%;
}

.name {
  color: var(--color_2);
  line-height: 30px;
}

.item .dask {
  --transition: .5s;
  transform: translateY(-100%);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--height);
  width: var(--width);
  opacity: 0;
  backdrop-filter: var(--webkit_backdrop_filter_1);
  border-radius: var(--border-radius_2);
  transition: var(--transition);
}

.dask i {
  font-size: 100px;
  color: var(--color_2);
  transition: var(--transition);
  cursor: pointer;
}

.dask i:hover {
  font-size: 110px;
}

.box:hover .dask,
.box.active .dask {
  opacity: 1;
}
</style>
