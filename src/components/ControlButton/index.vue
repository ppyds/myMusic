<template>
  <div id="ControlButton">
    <div class="btn iconfont" @click="minSizeWindow">&#xe624;</div>
    <div class="btn iconfont" @click="max_min_Window">&#xe746;</div>
    <div class="btn iconfont" @click="closeWindow">&#xe66c;</div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'ControlButton',
  setup() {
    const store = useStore()
    let max = false
    const minSizeWindow = () => store._actions.minWindow[0]()
    const closeWindow = () => store._actions.closeWindow[0]()
    const max_min_Window = () => {
      switch (max) {
        case false:
          store._actions.maxWindow[0]()
          max = true
          break
        case true:
          store._actions.activeWindow[0]()
          max = false
      }
    }
    return {
      minSizeWindow,
      closeWindow,
      max_min_Window
    }
  }
})
</script>

<style scoped>
#ControlButton {
  height: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
}

.btn {
  height: 30px;
  width: 30px;
  text-align: center;
  line-height: 33px;
  font-size: 20px;
  -webkit-app-region: no-drag;
  color: var(--color_1);
  transition: .5s;
  border-radius: var(--border-radius_1);
}

.btn:hover {
  color: var(--color_2);
  background: var(--color_1);
}

.btn:active {
  transform: scale(.9);
  box-shadow: var(--color_2) 0 0 5PX 0;
}

.btn:nth-last-of-type(1):hover {
  color: var(--color_1);
  background: var(--color_3);
}
</style>