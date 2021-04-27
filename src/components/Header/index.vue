<template>
  <header
      id="header"
      :style="{
            appRegion: isMaxWindow?'no-drag':'drag'
          }"
  >
    <div id="user" @click="login">
    </div>
    <div id="Search_box">
      <SearchInput :prompt-arr="tipsArr" activeWidth="100%" @_tips="getTipsArr" @_getSearch="search"/>
    </div>

    <div id="ControlButton_box">
      <ControlButton/>
    </div>
  </header>
</template>

<script>
const {ipcRenderer} = window.require('electron')
import ControlButton from "@/components/ControlButton";
import SearchInput from '../SearchInput'
import {computed, defineComponent, ref} from 'vue'
import {useStore} from "vuex";

export default defineComponent({
  name: 'Header',
  components: {
    ControlButton,
    SearchInput
  },
  setup() {
    const store = useStore()
    let isMaxWindow = computed(() => store.getters.isMaxWindow)
    let tipsArr = computed(() => store.getters['search/getSearchTipsArr'])
    let inputVal = ref('')
    const login = () => {
      ipcRenderer.send('createWindow', {
        parentName: 'mainWindow',
        width: 400,
        height: 500,
        routePath: 'logInRegisterWindow',
        resizable: false,
        movable: false,
        minimizable: false
      })
    }
    const search = (item) => {
      store.commit('search/setSearchKey', item)
    }
    const getTipsArr = (value) => {
      store.dispatch('search/searchSuggestions', {
        keywords: value,
        type: 'mobile'
      })
    }
    return {
      inputVal,
      isMaxWindow,
      tipsArr,
      login,
      search,
      getTipsArr,
    }
  }
})
</script>

<style scoped>
#header {
  /*backdrop-filter: var(--webkit_backdrop_filter_1);*/
  height: 50px;
  user-select: none;
  display: flex;
  flex-shrink: 0;
}

#user {
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 15px;
  position: relative;
}

#Search_box {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding:0 20%;
  box-sizing: border-box;
}

#ControlButton_box {
  padding-right: 20px;
  app-region: no-drag;
}
</style>
