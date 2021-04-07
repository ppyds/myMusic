<template>
  <div id="box">
    <div id="top">
      <div id="nav_box">
        <SearchInput
            :prompt-arr="promptArr"
            active-width="400px"
            @_tips="prompt"
            @_get="_get"
        />
        <div id="nav">
          <router-link to="/">首页</router-link>
          <router-link to="/player">播放</router-link>
          <router-link to="/search">搜索</router-link>
          <router-link to="/Collect">收藏</router-link>
        </div>
      </div>
      <router-view style="flex: 1"/>

    </div>
    <PlayerBar/>
  </div>
</template>
<script>
import PlayerBar from '@/components/PlayerBar'
import SearchInput from '@/components/SearchInput'

import {computed, defineComponent, ref} from "vue"
import {useStore} from 'vuex'

export default defineComponent({
  name: "App",
  components: {
    PlayerBar,
    SearchInput
  },
  setup(props, context) {
    let store = useStore()
    let promptArr = computed(() => store.getters["search/getPromptArr"])
    let prompt = store._actions['search/prompt'][0]
    let search = store._actions['search/search'][0]
    const _get = (key) =>{
      console.log(key)
      search({key})
    }
    return {
      promptArr,
      prompt,
      _get
    }
  }
})
</script>
<style>
#box {
  display: flex;
  flex-direction: column;
  height: 100vh;

}

#top {
  display: flex;
  flex: 1;
}

#nav_box {
  width: 198px;
  border-right: 1px solid var(--border_color1);
  padding: var(--padding_12);
  text-indent: var(--px8);
  box-sizing: border-box;
  flex-shrink: 0;
}

#nav {
  padding-top: 20px;
}

#nav_box #nav a {
  display: block;
  height: 36px;
  font-size: var(--font_smale);
  line-height: 36px;
  border-radius: var(--border-radius_1);
  margin: 6px 0;
}

#nav_box #nav a.router-link-exact-active {
  color: var(--color_2);
  background: var(--color_1);
  font-weight: var(--active_font_style);
  box-shadow: var(--color_2) 0 0 5px 0;
  font-size: var(--font_big);
}
</style>
