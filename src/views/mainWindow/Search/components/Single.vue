<template>
  <div>
    <dl @scroll="scroll">
      <dt>
        <div class="index">{{ singleArr.songCount }}条</div>
        <div class="name">歌曲名</div>
        <div class="singer">歌手</div>
        <div class="album">专辑</div>
        <div class="songLong">时长</div>
        <div class="btn">操作</div>
      </dt>
      <dd @dblclick="getSongUrl([singleArr.songList,index])" v-for="(item,index) in singleArr.songList">
        <div class="index">{{index + 1}}</div>
        <div class="name">{{item.name}}</div>
        <div class="singer">{{ item.artists.map(item =>item.name).join(' / ') }}</div>
        <div class="album">{{item.album.name}}</div>
        <div class="songLong">{{ item.duration }}</div>
        <div @click="getSongUrl(item)" class="btn el-icon-video-play"></div>
      </dd>
    </dl>
  </div>
</template>

<script>
import {computed, defineComponent,onMounted} from 'vue'
import {onBeforeRouteUpdate, useRoute} from 'vue-router'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'Single',
  setup() {
    let store = useStore()
    let keywords = useRoute().params.value
    let searchKey = computed(() => store.getters['search/getSearchKey'])
    let singleArr = computed(() => store.getters['search/getSingleArr'])
    let getSearch = (data) => {
      if (keywords === 'null') return
      store.dispatch('search/search', data)
    }
    onMounted(() =>{
      getSearch({
        type: 1
      })
    })

    onBeforeRouteUpdate((e) => {
      getSearch({
        type: 1
      })
    })
    let getSongUrl = (data) =>store.dispatch('player/getSongUrl',data)
    let scroll = (e) => {
      let targetEle = e.target
      if(targetEle.scrollTop + targetEle.clientHeight >targetEle.scrollHeight - 30)
        getSearch({
          type: 1
        })
    }
    return {
      searchKey,
      singleArr,
      getSongUrl,
      scroll
    }
  }
})
</script>

<style scoped>
dl {
  user-select: none;
  position: relative;
  padding-top: 60px;
  text-align: center;
  height:100%;
  box-sizing: border-box;
  overflow:hidden auto;
}

dl dt {
  position: absolute;
  top: 0;
  display: flex;
  line-height: 30px;
  font-size: var(--font_smale);
  width: 100%
}

dl dd {
  display: flex;
  line-height: 30px;
  transition: .2s;
}
dl dd:hover{
  background: var(--color_1);
  color: var(--color_2);
}
dl div{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
dl .index {
  width: 60px;
  text-align: center;
}

dl .name,
dl .album,
dl .singer {
  flex: 2;
}

dl .songLong,
dl .btn{
  flex:1;
}
dl dd .btn{
  font-size: var(--font_big);
  line-height: 30px;
}
dl dd .btn:hover{
  transform: scale(1.2);
}
</style>
