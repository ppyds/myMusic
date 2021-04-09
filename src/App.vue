<template>
  <div id="window" :style="{
    borderRadius:isMaxWindow?'0px':''
  }">
    <div id="window_background">
      <img alt="" src="https://uploadfile.bizhizu.cn/2014/0124/20140124114300563.jpg">
    </div>
    <div id="view">
      <Header/>
      <Index/>
    </div>
  </div>
</template>
<script>
const {remote} = window.require('electron')
import Index from '@/components'
import Header from '@/components/Header'
import {computed, defineComponent} from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    Index,
    Header
  },
  setup() {
    const store = useStore()
    let isMaxWindow = computed(() => store.getters.isMaxWindow)
    return {
      isMaxWindow
    }
  }
})
</script>
<style>
#window {
  position: relative;
  height: 100%;
  border-radius: var(--border-radius_2);
  overflow: hidden;
  box-shadow: #42b983 0 0 5px 0;
}

#window #window_background {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

#window img {
  min-width: 100vw;
  min-height: 100vh;
}

#view {
  backdrop-filter: var(--webkit_backdrop_filter_1);
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
