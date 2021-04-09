<template>
  <div id="player_bar">
    555555555
  </div>
</template>

<script>
import {defineComponent} from "vue"
export default defineComponent({
  name:'PlayerBar',
  //接收父组件的数据
  props:{

  },
  //定义子组件
  components:{

  },
  setup(props, context) {
    return {

    }
  }
})
</script>

<style scoped>
#player_bar {
  backdrop-filter: var(--webkit_backdrop_filter_1);
  height: 72px;
  border: 1px solid var(--border_color1);
  flex-shrink: 0;
}
</style>