<template>
  <div>

  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {useRoute,onBeforeRouteUpdate} from 'vue-router'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'Single',
  setup() {
    let store = useStore()
    let keywords = useRoute().params.value
    let getSearch = (data) =>{
      if (keywords === 'null') return
      store.dispatch('search/search', data)
    }
    getSearch({
      keywords,
      offset:0,
      type:1
    })
    onBeforeRouteUpdate((e)=>{
      getSearch({
        keywords:e.params.value,
        offset:0,
        type:1
      })
    })
  }
})
</script>

<style scoped>

</style>
