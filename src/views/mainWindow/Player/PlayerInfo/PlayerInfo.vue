<template>
  <div id="playerInfo">
    <div id="mask">
      <image :_url="maskUrl"/>
    </div>
    <div id="content">

    </div>
  </div>
</template>

<script>
import loadingImage from '@/assets/images/loading.gif'
import {computed, defineComponent, ref} from "vue"
import Image from "@/components/Image/Image";
export default defineComponent({
  name: "PlayerInfo",
  props: {
    mask: {
      type: String
    }
  },
  components:{
    Image
  },
  setup(props, context) {
    let maskUrl = ref(computed(() => props.mask))
    return {
      loadingImage,
      maskUrl
    }
  }
})
</script>

<style scoped>
#playerInfo{
  position: fixed;
  height:calc(100vh - 10px);
  width:calc(100vw - 10px);
  bottom:0;
}
#playerInfo>div{
  --px:100% ;
  position: absolute;
  height:var(--px);
  width:var(--px);
}
#playerInfo>#mask{
  z-index: -1;
  background: red;
}
</style>
