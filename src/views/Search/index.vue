<template>
  <div>
    <div class="search">
      <SearchInput
          :prompt-arr="promptArr"
          @_tips="prompt"
          @_get="_get"
          active-width="100%"/>
    </div>
    <mBtn value="按钮"/>
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput'
import mBtn from '@/components/mBtn'
import {computed, defineComponent} from "vue"
import {useStore} from "vuex";

export default defineComponent({
  name: "Search",
  components: {
    SearchInput,
    mBtn
  },
  setup(props, context) {
    let store = useStore()
    let promptArr = computed(() => store.getters["search/getPromptArr"])
    let prompt = store._actions['search/prompt'][0]
    let search = store._actions['search/search'][0]
    const _get = (key) => {
      console.log(key)
      search({key})
    }
    return {
      promptArr,
      prompt,
      _get
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