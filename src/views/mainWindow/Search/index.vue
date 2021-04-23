<template>
  <!--    搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合-->

  <div id="search_link_box_tab">
    <div id="search_link">
      <router-link :to="'/mainWindow/search/single/'+searchKey" tag="li">单曲</router-link>
      <router-link :to="'/mainWindow/search/album/'+searchKey" tag="li">专辑</router-link>
      <div class="line"/>
    </div>
    <transition>
      <keep-alive>
        <router-view id="router_box"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import {computed, defineComponent, watch} from "vue"
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default defineComponent({
  name: "Search",
  setup() {

    let route = useRoute()
    let router = useRouter()
    let store = useStore()
    let searchKey = computed(() => store.getters['search/getSearchKey'])
    let path = route.path.slice(0, route.path.lastIndexOf('/') + 1);
    router.replace(path + searchKey.value)
    watch(searchKey, () => {
      let path = route.path.slice(0, route.path.lastIndexOf('/') + 1);
      router.replace(path + searchKey.value)
    })
    return {
      searchKey
    }
  }
})
</script>

<style scoped>

#search_link {
  display: flex;
  padding: 0 20px;
  margin-left: 1px;

  box-sizing: border-box;
}

div#search_link a {
  display: block;
  line-height: 30px;
  padding: 0 15px;
  font-size: var(--font_smale);
  border: 1px solid var(--color_2);
  margin-left: -1px;
  background: var(--color_1);
}

#search_link a.router-link-active {
  border-bottom-color: transparent;
  color: var(--color_2);
  background: transparent;
}

#search_link .line {
  flex: 1;
  border-bottom: 1px solid var(--color_2);
}

#router_box {
  margin: 0 20px;
  border: 1px solid var(--color_2);
  border-top: none;
  flex: 1;
  overflow: hidden;
}
</style>
