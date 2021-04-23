<template>
  <img :src="url" alt="">
</template>

<script>
import {computed, defineComponent, ref,watch} from 'vue'
import loadingImage from '@/assets/images/loading.gif'
export default defineComponent({
  name: 'Image',
  props: {
    _url: {
      type: String
    }
  },
  setup(props, context) {
    let _url = ref(computed(() => props._url))
    let url = ref(loadingImage)
    watch(_url, () => {
      createImage()
    })
    createImage()
    function createImage() {
      url.value = loadingImage
      let img = new Image()
      img.src = _url.value
      img.onload = () => {
        url.value = _url.value
      }
    }

    return {
      url
    }
  }
})
</script>

<style scoped>
img {
  width: 100%;
  height: 100%
}
</style>
