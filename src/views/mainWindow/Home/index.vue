<template>
  <div id="home">
    <div class="banner_box">
      <Banner class="banner" :list="list"></Banner>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, onBeforeMount, onMounted, ref} from "vue";
import Banner from '@/components/Banner'

import {useStore} from 'vuex'
export default defineComponent({
  name:'Home',
  components:{
    Banner
  },
  setup(){
    const store = useStore()
    let list = computed(()=> store.getters["home/getBannerList"])
    onMounted(() =>{
      store.dispatch('home/request_bannerList')
    })
    return {
      list
    }
  }
})
</script>

<style scoped>
#home{
  flex: 1;
  text-align: right;
}
.banner_box{
  width:80%;
  margin:0 auto;
  padding-top: 40px;
}
</style>
