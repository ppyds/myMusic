<template>
  <header
      id="header"
      :style="{
            appRegion: isMaxWindow?'no-drag':'drag'
          }"
  >
    <div id="user" @click="login">
      <el-avatar class="userIcon" icon="el-icon-user-solid"
                 src="http://p1.music.126.net/BSntLesLXduQc1Gqmkqd0A==/109951165873226696.jpg"></el-avatar>
      <strong class="userName">444444</strong>
    </div>
    <div id="Search_box">
      <el-autocomplete
          v-model="inputVal"
          :fetch-suggestions="querySearchAsync"
          placeholder="搜你所搜"
          @change="search"
      >

      </el-autocomplete>
    </div>

    <div id="ControlButton_box">
      <ControlButton/>
    </div>
  </header>
</template>

<script>
const {ipcRenderer} = window.require('electron')
import ControlButton from "@/components/ControlButton";
import Login from '@/views/loginRegisterWindow/Login'
import {computed, defineComponent, ref} from 'vue'
import {useStore} from "vuex";

export default defineComponent({
  name: 'Header',
  components: {
    ControlButton,
    Login
  },
  setup() {
    const store = useStore()
    let isMaxWindow = computed(() => store.getters.isMaxWindow)

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
      store.commit('search/setSearchKey',item)
    }
    const querySearchAsync = (queryString, callback) => {
      store.dispatch('search/searchSuggestions', {
        keywords: inputVal.value,
        type: 'mobile',
        callback
      })
    }
    return {
      inputVal,
      isMaxWindow,

      login,
      search,
      querySearchAsync,
    }
  }
})
</script>

<style scoped>
#header {
  /*backdrop-filter: var(--webkit_backdrop_filter_1);*/
  height: 50px;
  /*-webkit-app-region: drag !important;*/
  user-select: none;
  display: flex;
}

#user {
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 15px;
  position: relative;
}

#user .userName {
  padding-left: 6px;
  font-size: var(--font_big);
  color: var(--color_2);
  -webkit-app-region: no-drag;
}

#user .userIcon {
  box-shadow: var(--color_2) 0 0 10px 0;
  -webkit-app-region: no-drag;
}

#Search_box {
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100%;
  -webkit-app-region: no-drag;
}

#ControlButton_box {
  padding-right: 20px;
  -webkit-app-region: no-drag;
}
</style>
