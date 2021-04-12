<template>
  <div>
    <mBtn @click="click"  value="按钮"/>
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput'
import mBtn from '@/components/mBtn'
import {computed, defineComponent} from "vue"
import {useStore} from "vuex";
import antiShake from "@/tools/antiShake";
export default defineComponent({
  name: "Search",
  components: {
    SearchInput,
    mBtn
  },
  setup(props, context) {
    let store = useStore()
    const click = antiShake(() =>{
      console.log(props)
    })
    return {
      click
    }
  }
})
</script>

<style scoped>
.search {
  width: 500px;
  margin: auto;
}
</style>